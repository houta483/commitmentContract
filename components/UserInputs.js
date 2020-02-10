import React from 'react'
import IncrementValueBar from './IncrementValueBar';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

/** 
 ̶*̶ ̶F̶i̶x̶ ̶a̶l̶l̶ ̶b̶u̶t̶t̶o̶n̶s̶ ̶s̶o̶ ̶t̶h̶e̶ ̶h̶a̶v̶e̶ ̶f̶e̶e̶d̶b̶a̶c̶k̶
̶ * 
*/

function UserInputs (props) {
  return(
    <View >
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Text
          style={{ paddingLeft: 25, height: 40, marginBottom: 1, width: 240, paddingTop: 10, marginBottom: 20, marginTop: 20, }}
          >
        Commitment Level: {"$" + props.CommitmentLevel}
        </Text>

        <View style={styles.buttonParent}>
          <TouchableOpacity 
            style={styles.incrementButton}
            onPress={props.Decrement}
          >
            <Text style={styles.incrementButtonText}> - </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.incrementButton}
            onPress={props.Increment}
          >
            <Text style={{ fontSize: 30, paddingLeft: 6, marginTop: -5, paddingTop: 2, height: 40}}> + </Text>
          </TouchableOpacity>
        </View>
      </View>

      <IncrementValueBar
        backgroundColorOne={props.BCOne}
        backgroundColorFive={props.BCFive}
        backgroundColorTen={props.BCTen}
        backgroundColorTwenty={props.BCTwenty}
        backgroundColorOneHundred={props.BCOneHundred}
        functionOne={props.FunctionOne}
        functionFive={props.FunctionFive}
        functionTen={props.FunctionTen}
        functionTwenty={props.FunctionTwenty}
        functionOneHundred={props.FunctionOneHundred}
      />
    </View>
  )
}
 
const styles = StyleSheet.create({
  buttonParent: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: "center",
    width: 150,
  },
  incrementButtonText: {
    fontSize: 30,
    paddingLeft:8,
  }, 
  incrementButton: {
    borderColor: '#FAB913', 
    borderWidth: 1.5,
    width: 45,
    borderRadius: 10,
  },  
});

export default UserInputs;