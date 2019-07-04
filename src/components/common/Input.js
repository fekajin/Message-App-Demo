import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
         keyboardType={keyboardType}
         secureTextEntry={secureTextEntry}
         placeholder={placeholder}
         autoCorrect={false}
         style={inputStyle} 
         value={value}
         onChangeText={onChangeText}
        />
    </View>
  );
};

const styles = {
  inputStyle: {
      color: '#000',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 15,
      lineHeight: 23,
      flex: 2
  },
  labelStyle: {
      fontSize: 18,
      paddingLeft: 5,
      flex: 1
  },
  containerStyle: {
      height: 40,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center'
  }
};

export { Input }; 
