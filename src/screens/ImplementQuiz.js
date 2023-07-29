  import Quiz from "./Quiz";
  import { AsyncStorage,View, Text , StyleSheet,SafeAreaView,TextInput,TouchableOpacity,Alert,StatusBar,ScrollView } from 'react-native'
  import Header from '../component/Header';
    function ImplementQuiz(props) {
    //   console.log(props.route.params.gameData)
      return (
        <>
        <Header/>
        <Quiz
        eventID={props.route.params.eventID}
        eventType={props.route.params.eventType}
        gameAttr={props.route.params.gameAttr}
        gameData={props.route.params.gameData}
        id={props.route.params.id}
        />
        </>
      );
      
    }
  
     export default ImplementQuiz;