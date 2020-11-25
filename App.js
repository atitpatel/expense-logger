/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import {ExpenseLogger} from './src/Components/ExpenseLogger';
import {History} from './src/Components/History';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {
          !showHistory ? 
            (
              <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                  <ExpenseLogger />
                <View style={styles.footer}>
                  <Button
                    onPress={() => setShowHistory(!showHistory)}
                    title= 'View History'
                  />
                </View>
              </ScrollView>
            ) : 
            (
              <View style={styles.scrollView}>
                <History />
                <View style={styles.footer}>
                  <Button
                    onPress={() => setShowHistory(!showHistory)}
                    title= 'Add Expense'
                  />
                </View>
              </View>

            )
        }
        
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%'
  },
  footer: {
    marginTop: 20
  }
});

export default App;
