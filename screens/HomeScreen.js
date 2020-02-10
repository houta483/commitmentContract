import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import config from '../config';

import { PaymentsStripe } from 'expo-payments-stripe';

/*
Next Steps:
1) Login using face ID
2) come up with a better name
3) add a login button
̶*/

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  // componentDidMount = () => {
  //   console.log(config.publishableKey)
  // }

  render() {
    return (
      <View style={styles.parentContainer}>
        <Text style={{fontSize: 30, fontWeight: "bold"}}> Commitment Tracker </Text>
        <Image 
          style={{width: 80, height: 80, marginTop: 30}}
          source={require('../assets/images/lock.png')}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen