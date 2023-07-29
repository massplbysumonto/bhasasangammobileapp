  import CardBoard from "./CardBoard";
  import { AsyncStorage,View, Text , StyleSheet,SafeAreaView,TextInput,TouchableOpacity,Alert,StatusBar,ScrollView } from 'react-native'
import Header from '../component/Header';
// import { View } from "react-native";
    function ImplementCardBoard(props) {
    //   const props.route.paramsLocation();
    //   console.log(props);
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
      },
      scrollView: {
        // backgroundColor: 'pink',
        // marginHorizontal: 20,
      },
      text: {
        fontSize: 42,
      },
    });
      return (
            // <Text>adad</Text>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Header/>
          <CardBoard
              gameData={props.route.params.eventIndex}
              selectedID={props.route.params.id}
          />
        </ScrollView>
        </SafeAreaView>
      );
    }
  
     export default ImplementCardBoard;