import React,{useEffect, useState,useRef} from "react";
import { Text, View, Dimensions, StyleSheet, SafeAreaView,Image, TextInput, Touchable, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";
import VideoComponent from "../component/Video";
import Header from "../component/Header";
import playImage from '../assets/assets/icons/play.png';
import playImage1 from '../assets/assets/icons/play.png';
import quizImage from '../assets/assets/icons/quiz.png';
import quizImage1 from '../assets/assets/icons/quiz1.png';
import scoreImage from '../assets/assets/icons/score.png';
import scoreImage1 from '../assets/assets/icons/score1.png';
import loginImage from '../assets/assets/icons/login.png';
import loginImage1 from '../assets/assets/icons/login1.png';
import searchImage from '../assets/assets/icons/search.png';
import searchImage1 from '../assets/assets/icons/search1.png';
import closeImage from '../assets/assets/icons/close.png';

function LandingScreen(){

   
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    
    const[status, setStatus]=useState(false);
    const [paused,setPaused]=useState(true);
    const playVideo=()=>{
        setPaused(!paused);
        // alert("playVideo");
    }
    var gameList=[
        {
            "_id": "63fde81c2f5b261591caf721",
            "game_type_id": 8,
            "game_attr": [
                {
                    "qimg": "upload/1.jpg",
                    "aimg": "upload/1b.jpg"
                },
                {
                    "qimg": "upload/3.jpg",
                    "aimg": "upload/3b.jpg"
                },
                {
                    "qimg": "upload/4.jpg",
                    "aimg": "upload/4b.jpg"
                },
                // {
                //     "qimg": "upload/6.jpg",
                //     "aimg": "upload/6b.jpg"
                // },
                {
                    "qimg": "upload/7.jpg",
                    "aimg": "upload/7b.jpg"
                },
                {
                    "qimg": "upload/8.jpg",
                    "aimg": "upload/8b.jpg"
                },
                {
                    "qimg": "upload/10.jpg",
                    "aimg": "upload/10b.jpg"
                },
                {
                    "qimg": "upload/13.jpg",
                    "aimg": "upload/13b.jpg"
                },
                {
                    "qimg": "upload/14.jpg",
                    "aimg": "upload/14b.jpg"
                },
                {
                    "qimg": "upload/16.jpg",
                    "aimg": "upload/16b.jpg"
                },
                {
                    "qimg": "upload/17.jpg",
                    "aimg": "upload/17b.jpg"
                }
            ],
            "game_desc": "ElectroHindiImage",
            "master_game_type_id": 2,
            "status_id": 0,
            "game_info_id": 44,
            "game_code": "Electro-8-44",
        }
    ]
    const Styles=StyleSheet.create({
        container:{
            width:windowWidth,height:windowHeight,
             backgroundColor: '#FFFFF5'
        },
        firstSection:{
            // flex:1
        },
        // firstSectionFirst:{
        //    flexDirection:'row', justifyContent: 'center',alignItems:'center'
        // },
        firstSectionSecond:{
            // flex:1,
             flexDirection:'row', 
             justifyContent: 'space-between',
              padding: 5,
               backgroundColor: '#FFFFCC'
        },
        secondSection:{
            backgroundColor:'#F8E7D3',
            flex:2,
            width:'100%'

        },
        secondSectionFirst :{
            backgroundColor: 'white',
            position: 'absolute',
            zIndex: 1,
            width: '100%',
            margin: 5
           
        },
        thirdSection:{
            // flex:0,
            padding: 5,
            flexDirection:'row',
            backgroundColor: '#FFFFCC',

            //  backgroundColor: 'orange'

        },
        headerlogoStyle:{
            width:250,
            height: 100,
        },
        logoStyle:{
            width:(windowWidth/4)-28,
            height:80
        },
        logoContainer:{
            margin:0,
            // backgroundColor: 'red',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:"space-evenly",
            // borderWidth:1,
            // borderColor:'black',
            padding: 10,
            // backgroundColor: '#F8E7D3'
            backgroundColor: '#F8E7D3'
            
        },
        logoContainerText:{
            textAlign:'center',
            fontSize:15,
            alignItems:'center',
            textTransform:'uppercase',
            color: '#945E26',
            fontWeight: '700'
            
            // backgroundColor: 'green' 
        },
        // ,thirdSectionlogoContainer:{
        //     margin:5,marginVertical:5,flexDirection:'column',alignItems:"flex-start",borderWidth:2,borderColor:'black',width:'25%',justifyContent:"center"
        // },
        input: {
            height: 50,
            margin: 12,
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.4)',
            fontSize: 18,
            padding: 10,
            width: '100%',
            borderRadius: 10,
            color: 'rgba(148,48,34,0.4)',
            backgroundColor: 'rgba(255,255,255,0.8)'
          },
          searchBox: {
            backgroundColor: '#F8E7D3',
            flex: 1,
            marginLeft: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            // width: "100%",
            // borderLeftColor: 'rgba(0,0,0,0.28)',
            // borderLeftWidth: 2,
            padding: 10

          }
    });
    const [text, onChangeText] = React.useState('Useless Text');
    // const pause = useRef(true);
    const handleClick= (e) => {
        if(e=='search'){
            if(status==false)
            setStatus(true)
            else{
                setStatus(false)
            }
        }
        // console.log(e);
        // alert("hello");
    }

    return(
        <SafeAreaView>
        <View style={Styles.container}>
        <Header />

        <View style={Styles.firstSection}>
            {/* <View style={Styles.firstSectionFirst}>
                    <Image source={require('../assets/logo.png')} style={Styles.headerlogoStyle} resizeMode="contain"></Image>
            </View> */}
            <View style={Styles.firstSectionSecond}>
            <TouchableOpacity onPress={()=>playVideo()}>

                <View style={Styles.logoContainer}>
                    <Image source={playImage} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>Play</Text>
                </View>
                </TouchableOpacity>
                <Link to={{screen:"electro", params:{gameAttr:gameList}}}>
                <View style={Styles.logoContainer}>
                    <Image source={quizImage} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>Quiz</Text>
                </View>
                </Link>
                <View style={Styles.logoContainer}>
                    <Image source={scoreImage} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>Score</Text>
                </View>
                <Link to={{screen:"Login"}}>
                <View style={Styles.logoContainer}>
                    <Image source={loginImage} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>log in</Text>
                </View>
                </Link>
            </View>
        </View>
        <View style={Styles.secondSection}>
           
             <TouchableOpacity onPress={()=>playVideo()}>
                <View style={{padding: 5}}>
                <View style={Styles.secondSectionFirst}>
                <Text style={{fontSize: 20, lineHeight: 90, textAlign: 'center', color:'#945E26'}}>Domestic Animal & Their Uses</Text>
            </View>
                    <VideoComponent paused={paused} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={Styles.thirdSection}>
        <TouchableWithoutFeedback onPress={() => handleClick("search")}>
            <View style={Styles.logoContainer}>
                
                    <Image source={status?closeImage:searchImage} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>{status?"Close":"Search"}</Text>
                </View>
                </TouchableWithoutFeedback>
                <View style={Styles.searchBox}>
                    {status?
                <TextInput
                    style={Styles.input}
                    // placeholderTextColor={'red'}
                    onChangeText={onChangeText}
                    value="Useless Text"
                />
                :<></>}
                </View>
                
        </View>
       
        </View>
        </SafeAreaView>
    );

}
export default LandingScreen;