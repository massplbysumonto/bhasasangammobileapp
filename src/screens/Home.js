import React, { useEffect, useState } from "react";
import GetEventRecords from "../services/getEventRecords";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../component/Header';
import HomePage from "./HomePage";

const Home = (props) => {
  const [gameData, setGameData] = useState([]);
  const [userType,setUserType] =useState(-1);

  useEffect(() => {
    if (gameData.length == 0) { getTileData() };
    // if(userType==-1) getLoginStatus();

  },[]);

  async function checkLoginStatus()
  {
    const ciphertext = await AsyncStorage.getItem('userID');
    return ciphertext;
  }

  async function getLoginStatus(){
  var userData= await checkLoginStatus();
  if(userData == null)
  {
      props.navigation.navigate('Login')
  }
  else
  {
    userData=JSON.parse(userData);
    setUserType(userData.lang_id);
  }
}

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  function eventStatusArray(data) {
    // console.log(data);
    const statusData = [];
    for (let i = 0; i < data.length; i++) {
      var gameData = [];
      if(data[i].event_type_id==1){
      for (let j = 0; j < data[i].tile_game_info.length; j++) {
        gameData.push({ game_name: data[i].tile_game_info[j].game_name, game_artifact: data[i].tile_game_info[j].game_artifact, game_type: data[i].tile_game_info[j].game_type, game_type_id: data[i].tile_game_info[j].game_type_id, game_attr: data[i].tile_game_info[j].game_attr, game_answer_status: data[i].tile_game_info[j].game_answer_status, game_status: 0 });
      }
      statusData.push([{ tile_desc: data[i].tile_desc, tile_end_date: convert(data[i].tile_end_date), tile_artifact_info: data[i].tile_artifact_info, tile_start_date: convert(data[i].tile_start_date), tile_type: data[i].tile_type, tile_id: data[i].tile_id,event_type_id: data[i].event_type_id,tile_game_info: gameData }])
      }
      else if(data[i].event_type_id==2){
        var newGameData={};
        for (let j = 0; j < data[i].tile_gameData.length; j++) {
          var arr=[];
          for(let k=0;k<data[i].tile_gameData[j].multiGameData.length;k++)
        {
          newGameData={lang:data[i].tile_gameData[j].multiGameData[k][0],game:data[i].tile_gameData[j].multiGameData[k][1],selected:false};
          arr.push(newGameData);
        }
          gameData.push({forDate:data[i].tile_gameData[j].forDate, multiGameData:arr,game_status:0});
        }
        statusData.push([{ tile_desc: data[i].tile_desc, tile_end_date: convert(data[i].tile_end_date), tile_artifact_info: data[i].tile_artifact_info, tile_start_date: convert(data[i].tile_start_date), tile_id: data[i].tile_id,event_type_id: data[i].event_type_id,tile_game_info: gameData }])
      }
    }
    return statusData;
  }
  async function getTileData() {
    // console.log('getTileData');
    const eventData = await AsyncStorage.getItem('events');
    const recordedEvent1 = await AsyncStorage.getItem('eventsUpdatedRecord');
    const recordedEvent=JSON.parse(recordedEvent1);
    const recordedDate=new Date(recordedEvent);
    const todayDate=new Date();
    var dateDiff;
    if(recordedEvent!= null){
      dateDiff=Math.abs(todayDate.getDate()-recordedDate.getDate());
    }
    // if (eventData != null && dateDiff <= 0 && eventData.length !=0) {
    //       setGameData(JSON.parse(eventData));
    // }
    // else {

      try {
        await fetch("https://backend.bhashasangam.in/game/getCurrentTiles", {
        method: "GET",
        // headers:{
        //   'Content-Type':'application/json'
        // }
        }).then(async (response) => await response.json())
        .then(async (responseData) => {
            if(responseData.code===200)
            {
                var resultData = eventStatusArray(responseData.data[0]);
                setGameData(resultData);
                await  AsyncStorage.setItem("events", JSON.stringify(resultData));
                await AsyncStorage.setItem("eventsUpdatedRecord", JSON.stringify(todayDate));
            }
        });
    } 
    catch (error) {
    console.error(error);
    }
  }


  return (
   <>
   <Header />
      <HomePage value={gameData}/>
    </>
)
}

export default Home;