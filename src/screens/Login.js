import { AsyncStorage,View, Text , StyleSheet,SafeAreaView,TextInput,Button, TouchableOpacity,Alert, ScrollView,Image, Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Link } from "@react-navigation/native";
import Header from '../component/Header';
import UserService from '../services/UserService';
import logo from '../assets/logo.png';

const Login = (props) => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
   
    const handleSubmit= async (e) => {
    e.preventDefault();
        if(username==="" || password==="") 
        {
            if(username=="" && password=="")
                alert("Please enter the credentials");
            else if(username=="")
                alert("please enter the username");
            else if(password=="")
                alert("please enter the password");
        }
        else
        {
          var data={user_email:username,user_pass:password,userType:3};
            // await UserService.getInstance().loginService(data).then((res)=>{
            //   let result=JSON.stringify(res);
            //   let obj= JSON.parse(result);
            //   // console.log(obj)
            //   if(obj.code==='200')
            //     {
            //       AsyncStorage.setItem('userID', JSON.stringify(obj.data));
            //       alert(obj.message);
                  props.navigation.navigate('Home')
            //     }
            //     else if(obj.code==='404')
            //     {
            //       Alert.alert(obj.message);
            //       props.navigation.navigate('Register')
            //     }
            //     else if(obj.code==='401')
            //     {
            //       alert(obj.message);
            //     }

            // });
          }
    }
    
  return (
    <>
    <ScrollView style={{paddingHorizontal: 15,paddingVertical: 15, backgroundColor: '#F8E7D3'}}>
    <SafeAreaView style={{flexDirection: 'column', justifyContent: 'space-evenly',height: Dimensions.get('window').height-30}}>
      <View style={styles.container}>
    <View style={styles.logoContainers}>
    <Image source={logo} style={styles.image}></Image>
   </View>

        <Text style={styles.text}>Welcome</Text>
        <Text style={{color:'black',fontSize:16}}>Email Address</Text>
      <TextInput 
        style={styles.input}
        onChangeText={(e)=> setUsername(e)}
        // value={username}
        placeholder="Email Address"
        keyboardType='email-address'
      />
      <Text style={{color:'black',fontSize:16}}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(e) =>setPassword(e)}
        // value={password}
        placeholder="Password"
        keyboardType="password"
      />
      <View style={{flexDirection: 'row', justifyContent: "space-between", marginVertical: 40,alignContent: 'center', alignItems: 'center'
    }}>
      
      <View>
      <TouchableOpacity onPress={()=>props.navigation.navigate('Register')}>
        <Text style={{color:"rgba(126,85,52,1)",fontWeight: "500"}}>
          Create Account
        </Text>
      </TouchableOpacity>
      </View>

      <View style={{width: "30%",justifyContent: 'center', flexDirection: "row"}}>
       <TouchableOpacity
        onPress={handleSubmit}
        style={styles.btn}
      >
       <Text style={{color:"#fff",fontWeight: "500",textAlign: 'center'}}>
          Login
        </Text>
        </TouchableOpacity>
      </View>
      </View>
        </View>
        <View style={{justifyContent: 'center', flexDirection: "row", }}>
        <Link to={{screen:"LandingScreen"}} style={{backgroundColor: 'rgba(126,85,52,1)', borderRadius: 10, padding: 12,}}>
          <Text style={{color:"#fff",fontWeight: "500",textAlign: 'center',}}>
          Go Back to Home
          </Text>
        </Link>   
        </View>
    </SafeAreaView>
    
      </ScrollView>
    </>
  )
}
const styles = StyleSheet.create({
    container: {
      width: '100%',
      borderColor: 'rgba(126,85,52,0.8)',
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
      backgroundColor: '#fff'
      // overflow:"auto"
    },
    logoContainers:{
      width: '100%',
      flexDirection:'row',
      justifyContent:'center',
      height:"auto",
    },
    image: {
      width:'60%',
      resizeMode:'contain',
      flexWrap: "wrap",
      display:"flex",
      height: 160
    },

    text: {
      color: "rgba(126,85,52,1)",
      fontSize: 30,
      lineHeight: 44,
      marginBottom: 34,
      fontWeight: "bold",
      textAlign: "center",
    },
    input: {
        color: "black",
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
      },
      btn: {
        backgroundColor: 'rgba(126,85,52,1)',
        width: "100%",
        borderRadius: 10,
        height: 'auto',
        paddingVertical: 12,
        marginVertical: 0
        
      }
  });

export default Login