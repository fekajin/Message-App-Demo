/* eslint-disable arrow-body-style */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
          <Text style={styles.textStyle}>
          {children}
          </Text>
        </TouchableOpacity>       
    );
};

const styles = {
    textStyle: {
      alignSelf: 'center',
      color: '#007aff',
      fontSize: 18,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10    
    },
    buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#007aff',
      marginLeft: 10,
      marginRight: 10
 }
};

export { Button };
