import { ImageBackground, StyleSheet, Text, View,TouchableOpacity, ScrollView,Animated,Easing } from "react-native";
import { Image } from "react-native";
import React,{useState,useEffect} from 'react'
import logo from '../assets/logo.png';
import hamburgerImage from '../assets/assets/icons/hamburger.png';
import hamburgerImage1 from '../assets/assets/icons/hamburger1.png';
import { Link } from "@react-navigation/native";

import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from './Color';




const Header = () => {
  const [openSlider,setSlider] = useState(true);

  const [lengthValueHolder,setlengthValueHolder] =useState(new Animated.Value(openSlider ? 0 :1 ));
  const [crossopacity,setCrossopacity] =useState(new Animated.Value(openSlider ? 0 :1 ));

    useEffect(()=>{

      if(!openSlider)
      {
        increaseLengthFunction();
        showCrossFunction();
      }
      else
      {
        stopincreaseLengthFunction();
        hideCrossFunction();
      }

    },[openSlider]);
    
    const stopincreaseLengthFunction = () =>{
    Animated.AnimatedInterpolation
    Animated.timing(lengthValueHolder,{
    toValue: 0,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: false
    }).start();
    }
    
    const increaseLengthFunction = () =>{
    Animated.AnimatedInterpolation
    Animated.timing(lengthValueHolder,{
    toValue: 1,
    duration: 300,
    easing: Easing.linear,
    useNativeDriver: false
    }).start();
    }

    const showCrossFunction = () =>{
      Animated.AnimatedInterpolation
      Animated.timing(crossopacity,{
      toValue: 1,
      duration: 50,
      easing: Easing.linear,
      useNativeDriver: false
      }).start();
      }

      const hideCrossFunction = () =>{
        Animated.AnimatedInterpolation
        Animated.timing(crossopacity,{
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: false
        }).start();
        }
    
    const lengthData = lengthValueHolder.interpolate({
    inputRange: [0,1],
    outputRange: ['-80%','0%']
    });
    
    const viewLengthStyle={
    width: lengthData
    }
    const openSliderFunction = () =>{
      if(openSlider==true)
      {
        setSlider(false);
      }
      else
      {
        setSlider(true);
      }

      
    }
    return (
    <>
    <TouchableOpacity style={{ left: '0%',height: '100%', position: 'absolute', zIndex: 2, backgroundColor: 'white',shadowColor: '#000', elevation: 10,borderRightColor: 'rgba(0,0,0,0.2)',borderRightWidth: 1}} onPress={()=>openSliderFunction()} ></TouchableOpacity>
    {openSlider!=true ? 
    <View style={{width: '100%', height: '100%',backgroundColor: 'rgba(0,0,0,0.4)', position: 'absolute', zIndex: 1}}>
      <TouchableOpacity style={{width: '100%', height: '100%',}} onPress={()=>openSliderFunction()}></TouchableOpacity>
    </View>
  :
  <></>}
    <Animated.View style={ {width:'80%',left: lengthData,height: '100%', position: 'absolute', zIndex: 2, backgroundColor: '#fff',shadowColor: '#000', elevation: 10,borderRightColor: 'rgba(0,0,0,0.2)',borderRightWidth: 1}} >
    
    <ScrollView>
      <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', padding: 28,borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.2)',}}>
        <View style={[styles.profileimgDiv,{width: 80, height: 80, justifyContent: "center", overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', borderRadius: 80/2,}]} >
        <Image source={logo} style={[styles.menuProfileImage,{width: '100%', height: 80}]} ></Image>
        </View>

        <View>
        <Text style={styles.menuProfileText}>    Profile</Text>
        <TouchableOpacity style={{justifyContent: 'center'}}>
        <Text style={{fontSize: 15, width: '100%', lineHeight: 20, color: colors.btnColor}}>      Manage Profile</Text>
        </TouchableOpacity>
        </View>

      </View>
    <View style={styles.sidebarMenus}>
      <View style={styles.menudivs}>
        <TouchableOpacity style={{justifyContent: 'center'}} >
        <Link to={{screen:"LandingScreen"}}>
        <Text style={styles.menutext}><Icon name="home" color={colors.btnColor} size={25} />     Home</Text>
        </Link>
        </TouchableOpacity>
      </View>
    
      <View style={styles.menudivs}>
        <TouchableOpacity style={{justifyContent: 'center'}}>
        
        <Text style={styles.menutext}><Icon name="ticket" color={colors.btnColor} size={25} />     About</Text>
        </TouchableOpacity>
      </View>
    
     
    </View>


    </ScrollView>
    <View style={[styles.menudivs,{ alignItems: 'center', position: 'absolute', bottom: 70}]}>
        <TouchableOpacity style={{width: '60%', borderRadius: 20, shadowColor: 'rgba(0,0,0,0.8)',  
     borderWidth: 1, borderColor: 'rgba(148,94,38,0.8)'}}>
        <Text style={[styles.menutext,{ textAlign: 'center'}]}><Icon name="sign-out" color={colors.btnColor} size={25} />     Log Out</Text>
        </TouchableOpacity>
      </View>
      
    </Animated.View>

    <View style={styles.container}>
    <View>
    <TouchableOpacity onPress={()=>openSliderFunction()}>
      {/* <Icon name="align-left" size={28} color={colors.btnColor}  /> */}
      <Image source={hamburgerImage} style={{width: 40, height: 40}} ></Image>
      </TouchableOpacity>
      
    </View>

    <View style={styles.imgDivs}>
    <Image source={logo} style={styles.image}></Image>
    </View>

    {/* <View style={styles.profile}>
    <Image source={logo} style={styles.profileimg}></Image>
    </View> */}

<TouchableOpacity onPress={()=>openSliderFunction()}>
      <Animated.View style={{opacity:0}} > 
      <Icon name="close" size={28} color={colors.btnColor}  />     
      </Animated.View>

      </TouchableOpacity>
  
   </View>
   
   </>

  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor: '#F8E7D3',
    height:"auto",
    // marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
    // overflow:"auto"
  },
  imgDivs: {
  width: '50%',
  height: 'auto',

  },
  image: {
    width:'100%',
    resizeMode:'contain',
    // flexWrap: "wrap",
    display:"flex",
    height: 80
  },
  profile: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    borderRadius: 40/2,
    // backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',

  },
  profileimg: {
    width: '100%',
    height: 40,
  },
  menuProfileText: {
    fontSize: 25,
    lineHeight: 40,
    color: '#945E26',
    width: '100%',
    fontWeight: 'bold',
    flexDirection: 'column',

  },
  sidebarMenus: {
    width: '100%',
    padding: 20,
  },
  menudivs: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  menutext: {
      fontSize: 18,
      lineHeight: 50,
      fontWeight: '500',
      color: '#945E26',
     

  },
});
export default Header

