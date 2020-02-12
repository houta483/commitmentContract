import React from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import * as SMS from 'expo-sms';
import firebase from '../firebaseConfig';
import { TouchableOpacity } from 'react-native-gesture-handler';

class SummaryCard extends React.Component {
  /**
 ̶ ̶ ̶*̶ ̶L̶i̶s̶t̶ ̶a̶l̶l̶ ̶c̶u̶r̶r̶e̶n̶t̶ ̶c̶o̶m̶m̶i̶t̶m̶e̶t̶n̶s̶ ̶h̶e̶r̶e̶ ̶w̶i̶t̶h̶ ̶t̶h̶e̶ ̶t̶i̶m̶e̶r̶,̶ ̶d̶o̶l̶l̶a̶r̶ ̶v̶a̶l̶u̶e̶,̶ ̶p̶a̶r̶t̶n̶e̶r̶,̶ ̶a̶n̶d̶ ̶s̶o̶ ̶f̶o̶r̶t̶h̶ ̶n̶e̶x̶t̶ ̶t̶o̶ ̶i̶t̶
̶ ̶ ̶ ̶*̶ ̶F̶i̶x̶ ̶f̶o̶r̶m̶a̶t̶ ̶s̶o̶ ̶t̶h̶e̶ ̶t̶i̶m̶e̶r̶ ̶d̶o̶e̶s̶n̶ ̶m̶o̶v̶e̶ ̶t̶h̶e̶n̶ ̶p̶a̶r̶t̶n̶e̶r̶ ̶a̶n̶d̶ ̶c̶o̶m̶m̶i̶t̶m̶e̶n̶t̶ ̶a̶r̶e̶ ̶a̶d̶d̶e̶d̶
 ̶ ̶ ̶*̶ ̶a̶l̶l̶o̶w̶ ̶f̶o̶r̶ ̶c̶o̶n̶t̶i̶n̶u̶a̶l̶ ̶c̶o̶u̶n̶t̶d̶o̶w̶n̶ ̶(̶e̶a̶c̶h̶ ̶s̶e̶c̶o̶n̶d̶ ̶u̶p̶d̶a̶t̶e̶ ̶t̶h̶e̶ ̶s̶t̶a̶t̶e̶ ̶d̶a̶t̶a̶b̶a̶s̶e̶)̶
 ̶ ̶ ̶*̶ ̶m̶a̶k̶e̶ ̶c̶a̶l̶l̶ ̶t̶o̶ ̶d̶a̶t̶a̶b̶a̶s̶e̶ ̶e̶v̶e̶r̶y̶ ̶t̶i̶m̶e̶ ̶t̶h̶e̶ ̶p̶a̶g̶e̶ ̶i̶s̶ ̶l̶o̶a̶d̶e̶d̶ ̶s̶o̶ ̶c̶o̶m̶m̶i̶t̶m̶e̶n̶t̶s̶ ̶m̶a̶d̶e̶ ̶w̶i̶l̶l̶ ̶a̶u̶t̶o̶m̶a̶t̶i̶c̶a̶l̶l̶y̶ ̶s̶h̶o̶w̶ ̶u̶p̶ ̶o̶n̶ ̶t̶h̶e̶ ̶n̶e̶x̶t̶ ̶p̶a̶g̶e̶
 ̶ ̶ ̶*̶ ̶g̶e̶t̶ ̶t̶h̶e̶ ̶t̶i̶m̶e̶s̶ ̶t̶o̶ ̶w̶r̶k̶
 ̶ ̶ ̶*̶ ̶n̶e̶e̶d̶ ̶t̶o̶ ̶u̶p̶d̶a̶t̶e̶ ̶t̶h̶e̶ ̶t̶i̶m̶e̶ ̶f̶o̶r̶ ̶o̶n̶e̶ ̶e̶l̶e̶m̶e̶n̶t̶ ̶o̶f̶ ̶t̶h̶e̶ ̶s̶t̶a̶t̶e̶ ̶e̶a̶c̶h̶ ̶t̶i̶m̶e̶ ̶t̶h̶a̶t̶ ̶o̶n̶C̶h̶a̶n̶g̶e̶ ̶r̶u̶n̶s̶ ̶i̶n̶ ̶t̶h̶e̶ ̶c̶o̶u̶n̶t̶d̶o̶w̶n̶ ̶t̶i̶m̶e̶r̶
   * get the text message to send. currently, it says that my number is not avaliable
̶   */

  constructor(props) {
    super(props)

    this.state = {
      index: [],
      bet: [],
      desc: [],
      partnerName: [],
      partnerNum: [],
      title: [],
      time: [],
    }
    this.updateTime = this.updateTime.bind(this);
    this.timesUp = this.timesUp.bind(this);
  }

  componentDidMount = async () => {
    let { bet, desc, partnerName, partnerNum, title, time, index } = this.state;
    
    await firebase.database().ref('commitments').once('value', (data) => {
      let myKeys = Object.keys(data.toJSON());
      myKeys = myKeys.map(el => { return parseInt(el)});
      let myValues = Object.values(data.toJSON());
      
      for (let i = 0; i < myKeys.length; i++ ) {
        if (myKeys[i] && !index.includes(parseInt(myKeys[i]))) {
          this.setState(() => ({
            index: [...this.state.index, myKeys[i]],
            bet: [...this.state.bet, myValues[i].bet],
            desc: [...this.state.desc, myValues[i].commitmentDescription],
            partnerName: [...this.state.partnerName, myValues[i].commitmentPartnerName],
            partnerNum: [...this.state.partnerNum, myValues[i].commitmentPartnerNum],
            title: [...this.state.title, myValues[i].commitmentTitle],
            time: [...this.state.time, myValues[i].time],
          }))
        }
      }
    })
  }

  updateTime = async (index) => {
    let copyOfArray = this.state.time.slice()
    let anotherCopyOfArray = this.state.time.slice();
    
    if (copyOfArray[index] > 0) {
      copyOfArray[index] = anotherCopyOfArray[index] - 1;
    }
    else {
      return
    }
    
    this.setState(() => ({
      time: copyOfArray
    }))

    await firebase.database().ref(`commitments/${this.state.index[index]}`).update({
      'time': this.state.time[index]
    })
  }

  timesUp = async (yesOrNo, number) => {
    number = String(number);
    number = number.replace(/[-\/\\^$*+?.()|[\]{}]/gi, "")
    number = number.replace(/\s/gi, "")

    const isAvailable = await SMS.isAvailableAsync(number);
    console.log(number)
    console.log("is the device avaliable?", isAvailable)

    const { result } = await SMS.sendSMSAsync(
      ['2147973534'],
      'My sample HelloWorld message'
    );

    console.log('result', result)

    if (isAvailable && yesOrNo === 1) {
      console.log('success')

      SMS.sendSMSAsync(
        String(number),
        "Your partner has successfully completed their commitment"
      )
    } 
    else if (isAvailable && yesOrNo === 0) {
      console.log('failure')
      SMS.sendSMSAsync(
        String(number),
        "Your partner did not successfully completed their commitment"
      )
    }
    else {
      return("This number is not avaliable")
    }
  }
  
  render() {
    let { bet, desc, partnerName, partnerNum, title, time, indexTop } = this.state;
    
    return (
      <View>
        {this.state.index.map((el, index) => (
            <View key={el} style={{position: 'relative', flexDirection: 'row', borderColor: '#2f95dc', borderWidth: 1.5, width: 400, marginTop: 2, marginBottom: 8, marginLeft: 8, paddingLeft: 6, height: 80, borderRadius: 10, }}>
              <View key={el} style={{ justifyContent: 'space-evenly', flexDirection: "column"}}>
                <Text>
                  Commitment: {title[index]}
                </Text>
                <Text>
                  Partner: {partnerName[index]}
                </Text>
                <Text>
                  Bet: ${bet[index]}
                </Text>
              </View>

              <View style={{ width: 380, height: 80, alignItems: 'flex-end', justifyContent: 'center', position: 'absolute' }}>
                <CountDown
                  until={time[index]}
                  digitStyle={{backgroundColor: '#2f95dc'}}
                  onFinish={
                      () => Alert.alert(
                        'Your time is up!',
                        `Did you keep your commitment, "${title[index]}" for $${bet[index]}?`,
                        [
                          { 
                            text: 'Yes', 
                            onPress: () => this.timesUp(1, partnerNum) 
                          },
                          {
                            text: 'No',
                            onPress: () => this.timesUp(0, partnerNum) 
                          },
                        ],
                        { cancelable: false }
                      )
                  }
                  size={13}
                  running={true}
                  onChange={() => this.updateTime(index)}
                />
              </View>
            </View>
        ))}
      </View>
    )
  }
}

export default SummaryCard