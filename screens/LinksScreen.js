import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ImageBackground } from 'react-native';
import firebase from '../firebaseConfig';

import * as Contacts from 'expo-contacts';
import UserInputs from '../components/UserInputs';
import CountDown from 'react-native-countdown-component';


/*
Next Steps:
̶3) use regex to allow dropdown to work with similair names with different capitalization
6) Finish time commitment section
̶  6d) if you did not complete the task, then send your partner the amount promised
7) update the timers every second
̶̶*/


class LinksScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      commitment: '',
      commitmentPartner: '',
      contacts: {},
      numberOfLettersInCommitmentPartnerTextBox: 0,
      previousNumberOfLettersInCommitmentPartnerTextBox: 0,
      chosenPartner: '',
      chosenPartnerNumber: null,
      matchingNames: [],
      matchingNumbers: [],
      bet: 0,
      incrementAmount: 1,
      buttonOneBackgroundColor: '#2f95dc',
      buttonFiveBackgroundColor: " ",
      buttonTenBackgroundColor: " ",
      buttonTwentyBackgroundColor: " ",
      buttonOneHundredBackgroundColor: " ",
      title: "",
      lastIndex: null,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      running: false,
    }
    this.makeCommitment = this.makeCommitment.bind(this);
    this.checkIfNameExists = this.checkIfNameExists.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.calculateTotalSeconds = this.calculateTotalSeconds.bind(this);
    this.incrementDays = this.incrementDays.bind(this);
    this.incrementHours = this.incrementHours.bind(this);
    this.incrementMinutes = this.incrementMinutes.bind(this);
    this.incrementSeconds = this.incrementSeconds.bind(this);
  }

  componentDidMount = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name],
      });

      if (data.length > 0) {
        this.state.populated = true

        for (let i = 0; i < data.length; i++) {
          const contact = await Contacts.getContactByIdAsync(`${data[i].id}`);

          if (contact['phoneNumbers'][0]["number"]) {
            this.state.contacts[data[i].name] = contact['phoneNumbers'][0]["number"]
          }
          
          else {
            this.state.contacts[data[i].name] = "No Phone Number Listed"
          }
        }
      }
      else {
        console.log('Contacts are already populated')
      }
    }
    // console.log(this.state.contacts)
    firebase.database().ref('commitments').once('value', (data) => {
      let myKeys = Object.keys(data.toJSON());
      myKeys = myKeys.map(el => { return parseInt(el)});
      let myValues = Object.values(data.toJSON());
      // console.log("mykeys", myKeys[myKeys.length - 1])
      this.setState(() => ({
        lastIndex: myKeys[myKeys.length - 1]
      }))
      // console.log(myValues)

    })
  }

  makeCommitment = async () => {
    if (this.state.title !== "" && this.state.commitment !== "" && this.state.chosenPartner !== "" && this.state.chosenPartnerNumber !== "" && this.state.bet !== "") {
      firebase.database().ref(`commitments/${this.state.lastIndex + 1}`).set({
          commitmentTitle: `${this.state.title}`,
          commitmentDescription: `${this.state.commitment}`,
          commitmentPartnerName: `${this.state.chosenPartner}`,
          commitmentPartnerNum: `${this.state.chosenPartnerNumber}`,
          time: this.calculateTotalSeconds(),
          bet: `${this.state.bet}`,
        })
        .then(() => {
        console.log('Inserted!');
        alert('Commitment Made')
      })
      .catch((error) => {
        console.log(error)
      })
    }
    else {
      alert('Please complete all sections')
    }
  }

  checkIfNameExists = (text) => {
    let names = Object.keys(this.state.contacts)
    let { numberOfLettersInCommitmentPartnerTextBox, previousNumberOfLettersInCommitmentPartnerTextBox } = this.state
    let current = numberOfLettersInCommitmentPartnerTextBox;
    let previous = previousNumberOfLettersInCommitmentPartnerTextBox;

    console.log("current ", current, "previous ", previous)

    for (let i = 0; i < names.length; i++) {
      let specificName = names[i]
      let portionOfName = specificName.slice(0, text.length)

      if (portionOfName === text && text.length !== 0) {
        let { matchingNames, matchingNumbers } = this.state
        let indexedPhoneNumbers = Object.values(this.state.contacts);
        let applicablePhoneNumber = indexedPhoneNumbers[i];
        
        if (!matchingNames.includes(specificName) && !matchingNumbers.includes(applicablePhoneNumber && matchingNames.length > 3)) {
          this.setState((state) => ({
            matchingNames: state.matchingNames.slice(0,3)
          }))
          matchingNames.push(specificName);
          matchingNumbers.push(applicablePhoneNumber);
        }
      }
      
      if (current === 1 && previous === 2) {
        this.setState(() => ({
          matchingNames: [],
          matchingNumbers: []
        }))
      }
    }
  }

  increment = () => {
    this.setState((state) => ({
      bet: state.bet + state.incrementAmount
    }))
  }

  decrement = () => {
    if (this.state.bet - this.state.incrementAmount <= 0) {
      this.setState(() => ({
        bet: 0
      }))
    }
    else {
      this.setState((state) => ({
        bet: state.bet - state.incrementAmount
      }))
    }
  }

  getTitle = () => {
    if (this.state.chosenPartner !== "") {
      return this.state.chosenPartner
    }
  }

  calculateTotalSeconds = () => {
    let totalSeconds = 0;

    totalSeconds += (this.state.days * 86400)
    totalSeconds += (this.state.hours * 3600)
    totalSeconds += (this.state.minutes * 60)
    totalSeconds += (this.state.seconds)

    return totalSeconds
  }

  incrementDays = () => {
    this.setState((state) => ({
      days: state.days + 1
    }))
  }

  incrementHours = () => {
    this.setState((state) => ({
      hours: state.hours + 1
    }))
  }

  incrementMinutes = () => {
    this.setState((state) => ({
      minutes: state.minutes + 1
    }))
  }

  incrementSeconds= () => {
    this.setState((state) => ({
      seconds: state.seconds + 1
    }))
  }

  render() {
    let { matchingNames, } = this.state

    return (
      <View style={styles.container}>
        
        <TextInput
          style={{ paddingLeft: 10, height: 40, borderColor: '#2f95dc', borderWidth: 1.5, marginBottom: 20}}
          onChangeText={async (text) => { await this.setState({ title: text }) }}
          placeholder={"Commitment Title "}
        />
        
        <TextInput
          multiline={ true }
          numberOfLines={6}
          style={styles.commitment}
          onChangeText={text => this.setState({
            commitment: text,
            commitmentPartner: this.state.commitmentPartner
          })}
          placeholder={'Please describe your commitment'}
        />

        <View style={{paddingTop: 20, height: 550,}}>
          <TextInput
            style={{ paddingLeft: 10, height: 40, borderColor: '#2f95dc', borderWidth: 1.5, }}
            onChangeText={ async (text) => { this.setState((state) => ({ 
              previousNumberOfLettersInCommitmentPartnerTextBox: state.numberOfLettersInCommitmentPartnerTextBox, 
              numberOfLettersInCommitmentPartnerTextBox: text.length })), 
              await this.checkIfNameExists(text)
            }}
            onKeyPress={({ nativeEvent }) => {if (nativeEvent.key === 'Backspace') {this.setState(() => ({chosenPartner: ""}))}}}
            placeholder={"Please select a commitment partner"}
            value={this.getTitle()}
          />

          <View style={{ width: 255, height: 'auto', backgroundColor: 'rgb(255,255,255)', position: 'absolute', zIndex: 1, marginTop: 60 }} >
            {matchingNames.map((el, index) => (
              <TouchableOpacity
                onPress={
                  async () => await this.setState((state) => ({ 
                    chosenPartner: el, 
                    chosenPartnerNumber: state.matchingNumbers[index],
                    matchingNames: [],
                    matchingNumbers: [],
                  }), console.log(this.state.chosenPartner, this.state.chosenPartnerNumber))}
                  style={{height: 16}}
                  key={index}
              >
                <Text>
                  {el}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{marginTop: 15, marginLeft: 25, }} >
            <Text>
              Commitment Partner: {this.state.chosenPartner}
            </Text>
          </View>

          <View style={{ paddingTop: 20}}>
            <CountDown
              until={this.calculateTotalSeconds()}
              onFinish={() => console.log('hello')}
              size={20}
              running={this.state.running}
              digitStyle={{backgroundColor: '#2f95dc'}}
            />

            <View style={{ flexDirection: "row", height: "auto", justifyContent: "space-around", marginTop: 15 }}>
              <TouchableOpacity 
                style={{borderColor: '#2f95dc', borderWidth: 1.5, width: "auto", height: 30, borderRadius: 10, }}
                onPress={() => this.setState((state) => ({ days: state.days + 1, running: false}))}
              >
                <Text style={{paddingTop: 5}} > Days </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{borderColor: '#2f95dc', borderWidth: 1.5, width: "auto", height: 30, borderRadius: 10, }}
                onPress={() => this.setState((state) => ({ hours: state.hours + 1, running: false}))}
              >
                <Text style={{paddingTop: 5}}> Hours </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{borderColor: '#2f95dc', borderWidth: 1.5, width: "auto", height: 30, borderRadius: 10, }}
                onPress={() => this.setState((state) => ({ minutes: state.minutes + 1, running: false}))}
              >
                <Text style={{paddingTop: 5}}> Minutes </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={{borderColor: '#2f95dc', borderWidth: 1.5, width: "auto", height: 30, borderRadius: 10, }}
                onPress={() => this.setState((state) => ({ seconds: state.seconds + 1, running: false}))}
              >
                <Text style={{paddingTop: 5}}> Seconds </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={{borderColor: '#2f95dc', borderWidth: 1.5, width: "auto", height: 30, borderRadius: 10, marginTop: 10 , backgroundColor: '#2f95dc',}}
                onPress={() => {this.setState((state) => ({ days: 0, hours: 0, minutes: 0, seconds: 0, running: false}))}}
              >
                <Text style={{paddingTop: 5, alignSelf: "center"}}> Reset Time </Text>
              </TouchableOpacity>
            </View>

          <UserInputs 
            CommitmentLevel={this.state.bet}
            Decrement={this.decrement}
            Increment={this.increment}
            BCOne={this.state.buttonOneBackgroundColor}
            BCFive={this.state.buttonFiveBackgroundColor}
            BCTen={this.state.buttonTenBackgroundColor}
            BCTwenty={this.state.buttonTwentyBackgroundColor}
            BCOneHundred={this.state.buttonOneHundredBackgroundColor}
            FunctionOne={() => this.setState(() => ({incrementAmount: 1, buttonOneBackgroundColor: '#2f95dc', buttonFiveBackgroundColor: "white", buttonTenBackgroundColor: "white", buttonTwentyBackgroundColor: "white", buttonOneHundredBackgroundColor: "white"}))}
            FunctionFive={() => this.setState(() => ({incrementAmount: 5, buttonOneBackgroundColor: "white", buttonFiveBackgroundColor: '#2f95dc', buttonTenBackgroundColor: "white", buttonTwentyBackgroundColor: "white", buttonOneHundredBackgroundColor: "white"}))}
            FunctionTen={() => this.setState(() => ({incrementAmount: 10, buttonOneBackgroundColor: "white", buttonFiveBackgroundColor: "white", buttonTenBackgroundColor: '#2f95dc', buttonTwentyBackgroundColor: "white", buttonOneHundredBackgroundColor: "white"}))}
            FunctionTwenty={() => this.setState(() => ({incrementAmount: 20, buttonOneBackgroundColor: "white", buttonFiveBackgroundColor: "white", buttonTenBackgroundColor: "white", buttonTwentyBackgroundColor: '#2f95dc', buttonOneHundredBackgroundColor: "white"}))}
            FunctionOneHundred={() => this.setState(() => ({incrementAmount: 100, buttonOneBackgroundColor: "white", buttonFiveBackgroundColor: "white", buttonTenBackgroundColor: "white", buttonTwentyBackgroundColor: "white", buttonOneHundredBackgroundColor: '#2f95dc'}))}
          />
        
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity 
            style={styles.button}
            onPress={this.makeCommitment}
          >
            <Text>Make Commitment</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

LinksScreen.navigationOptions = {
  title: 'Make a Commitment',
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    backgroundColor: '#fff',
    height: 710
  },
  commitment: {
    height: 85, 
    borderColor: '#2f95dc', 
    borderWidth: 1.5,
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 15,
    height: 50,
    justifyContent: 'center',
    borderColor: '#2f95dc', 
    borderWidth: 1.5, 
    width: "auto", 
    borderRadius: 10,
    backgroundColor: '#2f95dc',
    marginTop: 10 
  },
  input: { maxHeight: 40 },
});

export default LinksScreen