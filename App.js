import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import MultiLingual from './src/screens/Multilingual';
import ImplementCardBoard from './src/screens/ImplementCardBoard';
import ImplementQuiz from './src/screens/ImplementQuiz';
import WordGame from './src/screens/Wordgame';
import PicturePuzzle  from './src/screens/puzzlegame/BigSquare';
import Electro from './src/screens/electro/BigSquare';
import LandingScreen from './src/screens/landingScreen';

// import ImplementHangman from './src/screens/hangman/ImplementHangman';
const Stack = createNativeStackNavigator();

function App() {
  return (
    
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MultiLingual" component={MultiLingual} />
        <Stack.Screen name="activityBoard" component={ImplementCardBoard} />
        <Stack.Screen name="quiz" component={ImplementQuiz} />
        <Stack.Screen name="wordgame" component={WordGame} />
        <Stack.Screen name="electro" component={Electro}/>
        {/* <Stack.Screen name="hangman" component={ImplementHangman} /> */}
        <Stack.Screen name="picturePuzzle" component={PicturePuzzle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;