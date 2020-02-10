import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import CountDown from 'react-native-countdown-component';
import firebase from '../firebaseConfig';

class SummaryCard extends React.Component {
  /**
 ̶ ̶ ̶*̶ ̶L̶i̶s̶t̶ ̶a̶l̶l̶ ̶c̶u̶r̶r̶e̶n̶t̶ ̶c̶o̶m̶m̶i̶t̶m̶e̶t̶n̶s̶ ̶h̶e̶r̶e̶ ̶w̶i̶t̶h̶ ̶t̶h̶e̶ ̶t̶i̶m̶e̶r̶,̶ ̶d̶o̶l̶l̶a̶r̶ ̶v̶a̶l̶u̶e̶,̶ ̶p̶a̶r̶t̶n̶e̶r̶,̶ ̶a̶n̶d̶ ̶s̶o̶ ̶f̶o̶r̶t̶h̶ ̶n̶e̶x̶t̶ ̶t̶o̶ ̶i̶t̶
̶ ̶ ̶ ̶*̶ ̶F̶i̶x̶ ̶f̶o̶r̶m̶a̶t̶ ̶s̶o̶ ̶t̶h̶e̶ ̶t̶i̶m̶e̶r̶ ̶d̶o̶e̶s̶n̶ ̶m̶o̶v̶e̶ ̶t̶h̶e̶n̶ ̶p̶a̶r̶t̶n̶e̶r̶ ̶a̶n̶d̶ ̶c̶o̶m̶m̶i̶t̶m̶e̶n̶t̶ ̶a̶r̶e̶ ̶a̶d̶d̶e̶d̶
   * allow for continual countdown (each second update the state database)
   * make call to database every time the page is loaded so commitments made will automatically show up on the next page
   */

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
  }

  componentDidMount = () => {
    let { bet, desc, partnerName, partnerNum, title, time, index } = this.state;

    firebase.database().ref('commitments').once('value', (data) => {
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
  
  
  render() {
    let { bet, desc, partnerName, partnerNum, title, time, indexTop } = this.state;
    
    return (
      <View>
        {this.state.index.map((el, index) => (
            <View key={el} style={{position: 'relative', flexDirection: 'row', borderColor: "#FAB913", borderWidth: 1.5, width: 400, marginTop: 2, marginBottom: 8, marginLeft: 8, paddingLeft: 6, height: 80, borderRadius: 10, }}>
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
                  onFinish={() => console.log('The timer finished')}
                  size={13}
                  running={false}
                />
              </View>
            </View>
        ))}
      </View>
    )
  }
}

export default SummaryCard