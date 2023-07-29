import React,{useState} from "react";
import { Text, View, Dimensions, StyleSheet, SafeAreaView,Image, TextInput, TouchableOpacity } from "react-native";
import VideoComponent from "../component/Video";
import { Link } from "@react-navigation/native";
function LandingScreen(){

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [getGame,setGetGame]=useState([]);

    // React.useEffect(() => {
    //     if (getGame.length == 0) { getTileData() };
    
    //   },[]);

    //   async function getTileData() {
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

        const playGame=()=>{

        }
        const [paused,setPaused]=useState(true);
        const playVideo=()=>{
            setPaused(!paused);
            // alert("playVideo");
        }
    //   }
    const Styles=StyleSheet.create({
        container:{
            width:windowWidth,height:windowHeight
        },
        firstSection:{
            flex:1.5
        },
        firstSectionFirst:{
           flexDirection:'row', justifyContent: 'center',alignItems:'center'
        },
        firstSectionSecond:{
            flex:1,flexDirection:'row'
        },
        secondSection:{
            backgroundColor:'white',flex:2,width:'100%'

        },
        thirdSection:{
            backgroundColor:'orange',flex:1,flexDirection:'row'

        },
        headerlogoStyle:{
            width:250,
            height: 100,
        },
        logoStyle:{
            width:90,height:90
        },
        logoContainer:{
            margin:5,marginVertical:5,flexDirection:'column',alignItems:'center',justifyContent:"center",borderWidth:2,
            borderColor:'black'
        },
        logoContainerText:{
            textAlign:'center',
            fontSize:15,alignItems:'center',textTransform:'uppercase'
        }
        ,thirdSectionlogoContainer:{
            margin:5,marginVertical:5,flexDirection:'column',alignItems:"flex-start",borderWidth:2,borderColor:'black',width:'25%',justifyContent:"center"
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          },
    });
    const [text, onChangeText] = React.useState('Useless Text');
    return(
        <SafeAreaView>
        <View style={Styles.container}>
        <View style={Styles.firstSection}>
            <View style={Styles.firstSectionFirst}>
                    <Image source={require('../assets/logo.png')} style={Styles.headerlogoStyle} resizeMode="contain"></Image>
            </View>
            <View style={Styles.firstSectionSecond}>
                <TouchableOpacity onPress={()=>playVideo()}>
                <View style={Styles.logoContainer}>
                    <Image source={require('../assets/assets/playbutton.png')} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>Play</Text>
                </View>
                </TouchableOpacity>
                <Link to={{screen:"electro", params:{gameAttr:gameList}}}>
                <View style={Styles.logoContainer}>
                    <Image source={require('../assets/assets/quiz1.png')} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>Quiz</Text>
                </View>
                </Link>
                <View style={Styles.logoContainer}>
                    <Image source={require('../assets/assets/score.png')} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>Score</Text>
                </View>
                <View style={Styles.logoContainer}>
                    <Image source={require('../assets/assets/loginkey.png')} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>log in</Text>
                </View>
            </View>
        </View>
        <TouchableOpacity onPress={()=>playVideo()}>
        <View style={Styles.secondSection}>
        <VideoComponent paused={paused}/>
        </View>
        </TouchableOpacity>
        <View style={Styles.thirdSection}>
            <View style={Styles.thirdSectionlogoContainer}>
                    <Image source={require('../assets/assets/searchoutline.png')} style={Styles.logoStyle} resizeMode="contain"></Image>
                    <Text style={Styles.logoContainerText}>Search</Text>
                </View>
                <View>
                <TextInput
                    style={Styles.input}
                    onChangeText={onChangeText}
                    value="Useless Text"
                />
                </View>
        </View>
        </View>
        </SafeAreaView>
    );

}
export default LandingScreen;