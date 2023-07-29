import React, { useEffect, useState,useRef } from "react";
import SmallSquare from "./SmallSquare";
import DropSquare from "./dropSquare";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,StatusBar
} from "react-native";
import Header from '../../component/Header';
// import { NavLink } from 'react-router-dom';
import { Link } from '@react-navigation/native';
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}


function BigSquare(props) {
    // console.log(props)
  const [randomSquares, setRandmoSquares] = useState([]);
  const [randomSquares1, setRandmoSquares1] = useState([]);
  const squares = Array.from({ length: props.route.params.gameAttr[0].game_attr.length }, (_, i) => i);
  const [qindex, setQIndex]=useState(-1);
  const [aindex, setAIndex]=useState(-1);
  const previousQuestValue = useRef(-1);
  const previousAnsValue = useRef(-1);
  const [attempt,setAttempt]=useState(0);
  const correct=useRef(0);
  const [unAttempt,setunAttempt]=useState(props.route.params.gameAttr[0].game_attr.length);
  const [greenLight,setGreenLight]=useState(false);
  const [redLight,setRedLight]=useState(false);
  const [correctIndex,setCorrectIndex]=useState([]);
  useEffect(() => {
    setRandmoSquares(() => shuffle(squares))
    setRandmoSquares1(() => shuffle(squares))
  }, []);

  async function moveSquare(state,val) {
    // alert(val)
  if(state=="qindex")
  { 
    setQIndex(val);
    setGreenLight(false);
    setRedLight(false);
    previousQuestValue.current=val;
  }
  else 
  {
    setAIndex(val);
    setGreenLight(false);
    setRedLight(false);
    previousAnsValue.current=val;
  }
  if(previousAnsValue.current!=-1 && previousQuestValue.current!=-1 && (previousAnsValue.current===aindex || previousQuestValue.current===qindex))
  {
     if(previousAnsValue.current==previousQuestValue.current)
      {
        // console.log(correctIndex.includes(parseInt(previousAnsValue.current)))
        if(correctIndex.includes(parseInt(previousAnsValue.current)))
        {

        }
        else{
          // correct.current=correct.current+1;
          setunAttempt(unAttempt-1)
          correctIndex.push(parseInt(previousAnsValue.current));
        }
        // correct.current=correct.current+1;
        // setunAttempt(unAttempt-1)
        setGreenLight(true);
        // alert("correct");

      }
    else if(previousAnsValue.current!=previousQuestValue.current)
    {
      setRedLight(true);
      // alert("wrong");
    }
      
    previousQuestValue.current=-1;
    previousAnsValue.current=-1;
    setAttempt(attempt+1);
    // console.log(correctIndex);
  }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8E7D3',
      alignItems: "center",
      padding: 20,
    },
    map: {
      height: 410,
      paddingVertical: 5,
       backgroundColor: '#FFFFCC'
      // alignSelf: "stretch",
      // marginVertical: 20,
    },
  });

  return (
    <>
    <Header />
    <SafeAreaView style={styles.container}>
    {/* <View style={{width: "100%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center", marginBottom: 10,}}>
          <View style={{width: "50%", borderRadius: 8, flexDirection:"row",borderColor:"rgba(87, 51, 41,1)",borderWidth:1,}}>
                    <Text style={{textAlign: "center", width: "60%",lineHeight: 28,fontSize: 11,}}>Selected Language:</Text>
                    <Text style={{lineHeight: 28,fontSize: 12,width: "40%", backgroundColor: "rgba(87, 51, 41,1)", borderTopRightRadius: 7, borderBottomRightRadius: 7, color: "rgba(255, 255, 255,1)", textAlign: "center",
                     }}>{props.route.params.gameData[props.route.params.id].lang.lang_desc}</Text>
          </View>          
    </View>
     */}
     <View>
      <Text style={{fontSize:30, color: "#7E5534", textAlign: "center", marginBottom: 20, fontWeight: '500'}}>Electro</Text>
     </View>
    <View style={{ display:"flex",justifyContent: "space-evenly",alignItems: "center",width: "100%",flexDirection:"row"}}>

        <View style={{borderColor:"rgba(87, 51, 41,0.8)",borderRadius: 11, borderWidth:1, borderStyle:"solid",width:80}}>
            <Text style={{fontSize:12,paddingVertical:4,backgroundColor: "#7E5534",borderTopRightRadius:9,borderTopLeftRadius:9,borderBottomLeftRadius:0,borderBottomRightRadius:0 , color: "rgb(255, 255, 255)", textAlign: "center",}}>Attempt</Text>
            <Text style={{fontSize:18,padding:2,textAlign:'center',color: '#7E5534'}}>{attempt}</Text>
        </View>

         <View style={{borderColor:"rgba(87, 51, 41,0.8)",borderRadius: 11, borderWidth:1, borderStyle:"solid",width:80}}>
            <Text style={{fontSize:12,paddingVertical:4,backgroundColor: "#7E5534",borderTopRightRadius:9,borderTopLeftRadius:9,borderBottomLeftRadius:0,borderBottomRightRadius:0 , color: "rgb(255, 255, 255)", textAlign: "center",}}>Unsolved</Text>
            <Text style={{fontSize:18,padding:2,textAlign:"center",color: '#7E5534'}}>{unAttempt}</Text>
        </View>
      
         <View style={{borderColor:"rgba(87, 51, 41,0.8)",borderRadius: 11, borderWidth:1, borderStyle:"solid",width:80}}>
            <Text style={{fontSize:12,paddingVertical:4,backgroundColor: "#7E5534",borderTopRightRadius:9,borderTopLeftRadius:9,borderBottomLeftRadius:0,borderBottomRightRadius:0 , color: "rgb(255, 255, 255)", textAlign: "center",}}>Output</Text>
            <View style={{justifyContent: "space-evenly",display: "flex",height: 30,alignItems: "center",flexDirection:"row"}}>
            {
              greenLight ?
                <View style={{width: 17, height: 17,  borderColor:"rgba(0,0,0,0.4)",borderRadius: 10, borderWidth:1, borderStyle:"solid" ,backgroundColor: "linear-gradient(0deg, rgba(32,149,14,1) 0%, rgba(61,218,42,1) 71%, rgba(4,255,0,1) 100%)"}}></View>
              :   
                <View style={{width: 17, height: 17,  borderColor:"rgba(0,0,0,0.4)",borderRadius: 10, borderWidth:1, borderStyle:"solid" ,backgroundColor: "rgba(152, 251, 152,.3)"}}></View>
            }
            {
              redLight ?
                <View style={{width: 17, height: 17,  borderColor:"rgba(0,0,0,0.4)",borderRadius: 10, borderWidth:1, borderStyle:"solid" ,backgroundColor: "linear-gradient(0deg, rgba(152,14,14,1) 0%, rgba(218,42,42,1) 71%, rgba(255,0,0,1) 100%)"}}></View>  
              :
                <View style={{width: 17, height: 17,  borderColor:"rgba(0,0,0,0.4)",borderRadius: 10, borderWidth:1, borderStyle:"solid" ,backgroundColor: "rgba(255, 0, 0,.2)"}}></View>
            }      
      </View>
      </View>
    </View>
    
    <View style={{alignItems:"center",display:'flex',flexDirection:"row",justifyContent:'center',width:"100%" ,backgroundColor: "rgb(85 50 40)",marginVertical: 20}}>
    <ScrollView style={[styles.map,{width:'50%',margin:2,backgroundColor:'white'}]}>
      <View style={{display:'flex',flexDirection:"row",flexWrap:'wrap',justifyContent:"center",}}>
      {randomSquares.map((e, i) => {
        return (
          // <View key={e} style={{padding:5}}>
            <SmallSquare value={e} imgUrl={props.route.params.gameAttr[0].game_attr[e]} clickHandler={moveSquare}/>
          // </View>
        );
      })}
      </View>
    </ScrollView>
    
    <ScrollView style={[styles.map,{width:'50%',margin:1,backgroundColor:'white'}]}>
    <View style={{display:'flex',flexDirection:"row",flexWrap:'wrap',justifyContent:"center",}}>
      {randomSquares1.map((e, i) => {
        return (
          // <View key={e} style={{padding:5}}>
            <DropSquare value={e} imgUrl={props.route.params.gameAttr[0].game_attr[e]} clickHandler={moveSquare}/>
            // </View>
        );
      })}
      </View>
      </ScrollView>
    
    </View>
    <View>
        {/* <Link to={{screen:"LandingScreen"}}> */}
          <Button onPress={()=>props.navigation.goBack()} style={{backgroundColor: '#7E5534', }}><Text style={{color: '#fff'}}>Finish</Text></Button>
        {/* </Link> */}
    </View>
    </SafeAreaView>
    </>
  );
}


export default BigSquare;
