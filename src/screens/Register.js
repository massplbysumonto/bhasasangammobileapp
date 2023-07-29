import { AsyncStorage,View, Text , StyleSheet,SafeAreaView,TextInput,Button, ScrollView,TouchableOpacity,Image, Dimensions} from 'react-native'
import React,{useState,useEffect} from 'react'
import Header from '../component/Header';
import { Link } from "@react-navigation/native";

import { Dropdown } from 'react-native-element-dropdown';
import UserService from '../services/UserService';
import logo from '../assets/logo.png';

const Register = (props) => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [language,setLanguage]=useState("");
  const [contact,setContact]=useState("");
  const [fname,setFname]=useState("");
  const [lname,setLname]=useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [languageData,setLanguageData]=useState([]);
  
  // useEffect(() => {
  //   if (languageData.length === 0) getlanguageData();
  // },[]);
  const handleChange = (event) => {
    setPrimarydata(event.target.value);
  };

  async function getlanguageData() {
    
    var data={lang_status:0};
    await UserService.getInstance().getAllLanguage(data).then((res) => {
      var result = JSON.parse(JSON.stringify(res));
      // console.log("heedas2121asdasdsa");
      for(var i= 0; i<result.data.length;i++)
      {
        var langdata={
          label: result.data[i].lang_desc,
          value: result.data[i].lang_id
        }
        languageData.push(langdata);
      }
    });
  }

  const handleSubmit= async (e) => {
    e.preventDefault();
    if(username==="" || password==="" || language=="" ||fname=="" ) 
    {
      if(fname=="")
          alert("Please enter the First Name");
      else if(language=="")
          alert("please select a language");
      else if(username=="")
          alert("please enter the username");
      else if(password=="")
         alert("please enter the password");
    }
    else
    {
      const registerCred={user_firstname:fname,user_lastname: lname,user_username:username,user_email:username ,lang_id:language,user_pass:password,userType:3};
      getSignUpCred(registerCred);
    };
  }
  async function getSignUpCred(data){
    await UserService.getInstance().registerService(data).then((res)=>{
      let result=JSON.stringify(res);
      let obj= JSON.parse(result);
      console.log(obj.code);
      if(obj.code === 200){
        alert(obj.message)
        props.navigation.navigate('Login')
      }
      else{
      alert(obj.message);
      props.navigation.navigate('Register')
      }
    })
  }
  return (
    <>
   
    <SafeAreaView style={{paddingVertical: 15,paddingHorizontal: 15, backgroundColor: '#F8E7D3'}}>
    <ScrollView style={{height: Dimensions.get('window').height-30}}>
      <View style={styles.container}>
    <View style={styles.logoContainers}>
    <Image source={logo} style={styles.image}></Image>
   </View>

   
        <Text style={styles.text}>Sign UP</Text>
        <View>
          <Text style={{color:'black',fontSize:16}}>First Name</Text>
          <TextInput 
          label ="asdasd"
          style={styles.input}
          onChangeText={(e)=> setFname(e)}
          placeholder="First Name"
          keyboardType='name-phone-pad'
        />
        </View>
        <View>
          <Text style={{color:'black',fontSize:16}}>Last Name</Text>
          <TextInput 
          style={styles.input}
          onChangeText={(e)=> setLname(e)}
          placeholder="Last Name"
          keyboardType='name-phone-pad'
        />
        </View>
        <View style={{padding: 7, borderRadius: 15,color:'red'}}> 
          <Text style={{color:'black',fontSize:16}}>Language</Text>
          <Dropdown 
          style={[styles.dropdown, isFocus && {borderColor: 'black'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          // showsVerticalScrollIndicator="yes"
          iconStyle={styles.iconStyle}
          placeholder={!isFocus ? language===""?'Select language':language : '...'}
          searchPlaceholder="Search..."
          itemContainerStyle="black"
          itemTextStyle="black"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          data={languageData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          onChange={item => {
            setLanguage(item.value);
            setIsFocus(false);
          }}
          />
        </View>
        <View>
          <Text style={{color:'black',fontSize:16}}>Contact Number</Text>
          <TextInput 
          style={styles.input}
          onChangeText={(e)=> setContact(e)}
          placeholder="Contact Number"
          keyboardType='number-pad'
        />
        </View>
        <View>
        <Text style={{color:'black',fontSize:16}}>Email Address</Text>
      <TextInput 
        style={styles.input}
        onChangeText={(e)=> setUsername(e)}
        placeholder="Email Address"
        keyboardType='email-address'
      />
      </View>
      <View>
      <Text style={{color:'black',fontSize:16}}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(e) =>setPassword(e)}
        placeholder="Password"
        keyboardType="password"
      />
      </View>
      <View style={{flexDirection: 'row', justifyContent: "space-between", marginVertical: 40,alignContent: 'center', alignItems: 'center'
    }}>
      <View>
      <TouchableOpacity onPress={()=>props.navigation.navigate('Login')}>
        <Text style={{color:"rgba(126,85,52,1)",fontWeight: "500"}}>
          Sign In Instead
        </Text>
      </TouchableOpacity>
      </View>
      <View style={{width: "30%",justifyContent: 'center', flexDirection: "row"}}>
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.btn}
      >
       <Text style={{color:"#fff",fontWeight: "500",textAlign: 'center'}}>
         Register
        </Text>
        </TouchableOpacity>
      </View>
      
      </View>
      </View>
      <View style={{justifyContent: 'center', flexDirection: "row"}}>
        <Link to={{screen:"LandingScreen"}} style={{backgroundColor: 'rgba(126,85,52,1)', borderRadius: 10, padding: 12,}}>
          <Text style={{color:"#fff",fontWeight: "500",textAlign: 'center',}}>
          Go Back to Home
          </Text>
        </Link>   
        </View>

        </ScrollView>
    </SafeAreaView>

    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderColor: 'rgba(126,85,52,0.8)',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20
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
    dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginVertical: 12,
      color:'black',
      padding: 10,

    },
    input: {
      color: "black",
      height: 40,
      marginVertical: 12,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      borderRadius: 10
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      color:'black',
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    input: {
      color: "black",
      height: 40,
      marginVertical: 12,
      borderColor: 'gray',
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

export default Register