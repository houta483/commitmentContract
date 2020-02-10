import React from 'react';
import { Text, TouchableOpacity, View, } from 'react-native';

function IncrementValueBar (props) {
  return (
    <View style={{ flexDirection: "row", height: 25, justifyContent: "space-around", }}>
      <TouchableOpacity 
        style={{borderColor: "#FAB913", borderWidth: 1.5, width: 30, height: 30, borderRadius: 10, backgroundColor: `${props.backgroundColorOne}`}}
        onPress={props.functionOne}
      >
        <Text style={{padding: 5}}> 1 </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{borderColor: "#FAB913", borderWidth: 1.5, width: 30, height: 30, borderRadius: 10, backgroundColor: `${props.backgroundColorFive}`}}
        onPress={props.functionFive}
      >
        <Text style={{padding: 5}}> 5 </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{borderColor: "#FAB913", borderWidth: 1.5, width: 30, height: 30, borderRadius: 10, backgroundColor: `${props.backgroundColorTen}`}}
        onPress={props.functionTen}
      >
        <Text style={{paddingLeft: 2, paddingTop: 5}}> 10 </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{borderColor: "#FAB913", borderWidth: 1.5, width: 30, height: 30, borderRadius: 10, backgroundColor: `${props.backgroundColorTwenty}`}}
        onPress={props.functionTwenty}
      >
        <Text style={{paddingLeft: 2, paddingTop: 5}}> 20 </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={{borderColor: "#FAB913", borderWidth: 1.5, width: 30, height: 30, borderRadius: 10, backgroundColor: `${props.backgroundColorOneHundred}`}}
        onPress={props.functionOneHundred}
      >
        <Text style={{marginLeft: -2, paddingTop: 5}}> 100 </Text>
      </TouchableOpacity>
    </View>
  )
}

export default IncrementValueBar