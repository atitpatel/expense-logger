import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, StyleSheet, TextInput } from 'react-native';
import { getExpenses } from '../../firebase/api';
import { getMonthName } from '../../utils';
import styles from './styles';


export const History = () => {

    const [masterList, setMasterList] = useState([]);
    const [list, setList] = useState([]);
    const [searchText, setSearchText] = useState('');

    prepareDataSource = (result) => {
        console.log(
            'paramsss', result
        )
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
            console.log("Amoutn....", section.sum, item)
            section.sum += parseFloat(item.amount);
            
        
            section.data.push(item);
        
            return sections;
        }, []);
        return dataSource;
    }

    useEffect( () => {
        getExpenses().then((result) => {

            setMasterList(result);
            
            const dataSource = result.length ? prepareDataSource(result) : [];
            console.log("Data Source", dataSource);
            setList(dataSource);
        });
         
    }, []);

    searchAndFilter = (text) => {
        setSearchText(text);
        if(text) {
            const resultList = masterList.filter( expense => expense.description.includes(text));
            const dataSource = resultList && resultList.length ? prepareDataSource(resultList) : [];
            setList(dataSource);
        }
    }

    renderSeparator = () => {  
        return (  
            <View  
                style={{  
                    height: 1,  
                    width: "100%",  
                    backgroundColor: "#000",  
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
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style = {styles.header}>Expense History</Text>
            <TextInput
                style={styles.textInputStyle}
                onChangeText={text => searchAndFilter(text)}
                value = {searchText}
                underlineColorAndroid="transparent"
                placeholder="Search Here"
            />
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
        </View>
    )
} 