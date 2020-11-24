import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { getExpenses } from '../../firebase/api';
import { getMonthName } from '../../utils';
import styles from './styles';


export const History = () => {

    const [masterList, setMasterList] = useState([]);
    const [list, setList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [categories, setCategories] = useState([]);
    const [isFilterOn, setIsFilterOn] = useState(false);

    prepareDataSource = (result) => {
        const dataSource = result.reduce( (sections, item) => {
                
            const itemMonth = getMonthName(item.date);
            const itemTitle = `${itemMonth} - ${new Date(item.date.toDate()).getFullYear()}`;
            let section =  sections.find(section => {
                return section && section.type === itemTitle;
            });
        
            if(!section) {
                section = { type : itemTitle, data : [], sum: 0 };
                sections.push(section);
            }
            section.sum += parseFloat(item.amount);
            section.data.push(item);
        
            return sections;
        }, []);
        return dataSource;
    }

    useEffect( () => {
        setLoading(true);
        getExpenses().then((result) => {
            setMasterList(result);
            let categorySet = new Set();
            result.forEach(ele => categorySet.add(ele.category));
            setCategories(Array.from(categorySet));
            const dataSource = result.length ? prepareDataSource(result) : [];
            setList(dataSource);
            setLoading(false);
        }).catch((e) => {
            // Log error here
            Alert.alert("Something went wrong");
            setLoading(false);
        });
         
    }, []);

    searchAndFilter = (text, filterTxt) => {
        setLoading(true);
        setSearchText(text || '');
        if(text || filterText) {
            const resultList = masterList.filter( expense => {
                return text ? expense.description.includes(text) : expense;
            }).filter(expense => {
                return filterTxt ? expense.category === filterText : expense;
            })
            const dataSource = resultList && resultList.length ? prepareDataSource(resultList) : [];
            setList(dataSource);
        } else{
            setList(prepareDataSource(masterList.length ? masterList : []))
        }
        setLoading(false);
    }

    renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",
                    opacity: 0.1
                }}  
            />  
        );  
    };
    
    const Expense = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
        </View>
    );

    return(
        <View style={styles.mainContainer}>
            <Text style = {styles.mainTitle}>Expense History</Text>
            <View style = {styles.searchContainer}>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => searchAndFilter(text)}
                    value = {searchText}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                />
                <TouchableOpacity
                    onPress={() => setIsFilterOn(!isFilterOn)}
                    style = {styles.filterContainer}
                >
                    <Text style={styles.filterText}>filter</Text>
                </TouchableOpacity>
            </View>
            {
                loading ? (<View style = {styles.loaderContainer}>
                    <ActivityIndicator size="small" color="#0000ff" />  
                </View>) : null
            }
            <View style={styles.sectionContainer}>
                {
                    list.length ? (
                        <SectionList  
                            sections={list}
                            renderSectionHeader={({ section: { type } }) => (
                            <Text style={styles.header}>{type}</Text>
                              )}
                            renderItem={({ item }) => <Expense title={item.description} />}
                            ItemSeparatorComponent={renderSeparator}
                            keyExtractor = {item => item.id}  
                        />
                    ) : null
                }
            </View>
            {
                isFilterOn && categories ? (
                    <Picker
                        selectedValue={filterText}
                        style={{height: 50, width: 100}}
                        onValueChange={itemValue => {
                            setFilterText(itemValue); setIsFilterOn(false); searchAndFilter(searchText, itemValue);
                        }}
                    >
                        {
                            categories.map( category => <Picker.Item key={category} label={category} value={category} />)
                        }
                </Picker>
                ) : null
            }
            
        </View>
    )
} 