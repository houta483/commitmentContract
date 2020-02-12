import * as React from 'react';
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from 'react-navigation';
const AuthContext = React.createContext();

export default function App({navigation}) {
  const [state, dispatch ] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN-IN':
          return {
            ...prevState,
            isSignout: true,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return{
            ...prevState,
            isSignout: true,
            userToken: undefined,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e){
        // restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // this will switch to the App screen or Auth screen and this loadin screen will be unmounted and thrown away
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // in production app, we need to send some data (username and password) to the server and get a token
        // we will also need to handle errors if sign in failed
        // after getting token, we need to persist the toekn using 'AsyncStorage'
        // in the example, we will use a dummy token'

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={/* loaidng */} />
        ) : state.userToken === null ? (
          // No token found, user isn't signed in
          <Stack.Screen
            name="SignIn"
            component={/* incorrect login page */}
            options={{
              title: 'Sign in',
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
          />
        ) : (
          // User is signed in
          <Stack.Screen name="Home" component={/* the app */} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}