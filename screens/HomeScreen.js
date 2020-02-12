// import * as WebBrowser from 'expo-web-browser';
// import React from 'react';
// import { StyleSheet, Text, View, Image } from 'react-native';
// import config from '../config';

// import { PaymentsStripe } from 'expo-payments-stripe';

// /*
// Next Steps:
// 1) Login using face ID
// 2) come up with a better name
// 3) add a login button
// ̶*/

// class HomeScreen extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {

//     }
//   }

//   // componentDidMount = () => {
//   //   console.log(config.publishableKey)
//   // }

//   render() {
//     return (
//       <View style={styles.parentContainer}>
//         <Text style={{fontSize: 30, fontWeight: "bold"}}> Commitment Tracker </Text>
//         <Image 
//           style={{width: 80, height: 80, marginTop: 30}}
//           source={require('../assets/images/lock.png')}
//         />
//       </View>
//     );
//   }
// }

// HomeScreen.navigationOptions = {
//   header: null,
// };

// const styles = StyleSheet.create({
//   parentContainer: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginTop: 100,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default HomeScreen



import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

export default class LoginView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
    }
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="     Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="    Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFf',
  },
  inputContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center',
  },
  inputs:{
      height:45,
      borderColor: '#2f95dc',
      borderWidth: 1,
      borderRadius: 30,
      flex: 1,
  },
  inputIcon:{
  
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: '#2f95dc',
  },
  loginText: {
    color: 'white',
  }
});