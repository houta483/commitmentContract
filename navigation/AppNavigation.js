import { createStackNavigator } from 'react-navigation-stack'
import SafeAreaView from 'react-native-safe-area-view';
import Home from '../screens/HomeScreen.js'

const AppNavigation = createStackNavigator(
  {
    Home: { screen: Home }
  },
  {
    initialRouteName: 'Home'
  }
)

export default AppNavigation