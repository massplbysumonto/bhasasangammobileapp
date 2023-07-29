import React, { Component } from "react";
import {View, Text, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link } from '@react-navigation/native';

class MultiLingual extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    state={
        status:0,
        artifact:"",
        artifact_status:false,
        langData:[]
 //pluck a random color
    }
  
  async handleClick(e) {
    console.log(1212)
    var gameData1 = await AsyncStorage.getItem('events');
    var gameData= JSON.parse(gameData1);
    // console.log(gameData[this.props.eventID][0].tile_game_info[this.props.activeID])
    gameData[this.props.eventID][0].tile_game_info[this.props.activeID].multiGameData[e].selected=true;
    await AsyncStorage.setItem("events",JSON.stringify(gameData));
}
async exitHandler(){
  var gameData1 = await (AsyncStorage.getItem('events'));
  var gameData= JSON.parse(gameData1);
  var currentArtifacts1= await AsyncStorage.getItem('artifactList');
  var currentArtifacts= JSON.parse(currentArtifacts1);
  var date = new Date();
  gameData[this.props.eventID][0].tile_game_info[this.props.activeID].game_status=1;
  AsyncStorage.setItem("events",JSON.stringify(gameData));
  if(gameData[this.props.eventID][0].hasOwnProperty('tile_artifact_info'))
  {
  var artifact_url = gameData[this.props.eventID][0].tile_artifact_info.artifact_prev;
  var artifact_name=gameData[this.props.eventID][0].tile_artifact_info.artifact_name;
  var artifactInfo={artifact_type:1,artifact_url:artifact_url,artifact_name:artifact_name,eventName:gameData[this.props.eventID][0].tile_desc,date:date}
  if(currentArtifacts==null)
  {
      var setArtifact=[];
      setArtifact.push(artifactInfo);
      AsyncStorage.setItem("artifactList",JSON.stringify(setArtifact));
  }
    else 
    {
      currentArtifacts=JSON.parse(currentArtifacts);
      currentArtifacts.push(artifactInfo);
      AsyncStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
    }
  this.setState(({
    artifact:artifact_url,
    artifact_status:true
  }));
  
}
else{
console.log("reload")
}

}

changeHandler2 = () => {
  this.setState(({
    artifact_status:false
  }));
}

  render() {
    // console.log(this.props.gameAttr)
  return (
    <>
   {
    
    
    <View style={{paddingHorizontal:40}}> 
     <View style={{width: '100%',flexDirection: "row", justifyContent: "flex-end",alignItems: 'center',marginVertical: 40}}>
          <TouchableOpacity><Text style={{color: 'rgba(126,85,52,1)',lineheight: 40,fontWeight: '500', textAlign: 'center', fontSize: 15}}>{'<<  '}Go to Homepage</Text></TouchableOpacity>
        </View>
    <Text style={{fontSize:20,fontWeight:"bold",marginBottom:"4%"}}>Select a language:</Text>
     <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent: "space-between" }}>
     {
            this.props.gameAttr.map((data,i) =>

            data.game.game_type_id=== 4 ? data.selected !== true ?
            
            <View  key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
              <Link onPress={(e)=>this.handleClick(i)} key={i} to={{screen:"hangman", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
              <Text>{data.lang.lang_desc} </Text>
              </Link>
            </View>
            // </Link>
            :
            // (<Link to={{screen:"hangman", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
             <View key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
              <Text>{data.lang.lang_desc} </Text>
            </View>
            // </Link>)
            :
            data.game.game_type_id=== 8 ? data.selected !== true ?
            
            <View  key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
              <Link onPress={(e)=>this.handleClick(i)} key={i} to={{screen:"electro", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
              <Text>{data.lang.lang_desc} </Text>
              </Link>
            </View>
            // </Link>
            
            :
            // (<Link to={{screen:"hangman", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
             <View key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
              <Text>{data.lang.lang_desc} </Text>
            </View>
            // </Link>)
            :
            data.game.game_type_id=== 3 ? data.selected !== true ?
            
            <View  key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
               <Link onPress={(e)=>this.handleClick(i)} key={i} to={{screen:"quiz", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
              <Text>{data.lang.lang_desc} </Text>
              </Link>
            </View>
            
            :
            // (<Link to={{screen:"hangman", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
             <View key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
              
              <Text>{data.lang.lang_desc} </Text>
            </View>
            // </Link>)
            :
            data.game.game_type_id=== 2 ? data.selected !== true ?
            
            <View  key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
              <Link  onPress={(e)=>this.handleClick(i)} key={i} to={{screen:"wordgame", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
              <Text>{data.lang.lang_desc} </Text>
              </Link>
            </View>
            
            :
            // (<Link to={{screen:"hangman", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
             <View key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
              <Text>{data.lang.lang_desc} </Text>
            </View>
            :
            data.game.game_type_id=== 1 ? data.selected !== true ?
            
            <View  key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
               <Link onPress={(e)=>this.handleClick(i)} key={i} to={{screen:"picturePuzzle", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
              <Text>{data.lang.lang_desc} </Text>
              </Link>
            </View>
            
            :
            // (<Link to={{screen:"hangman", params:{gameAttr:data.game,gameData:this.props.gameAttr,eventID:this.props.eventID,eventType:this.props.eventType,id:i}}}>
             <View key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'rgba(217, 217, 217, 1)': data.lang.lang_color}}>
              <Text>{data.lang.lang_desc} </Text>
            </View>
            :
            <View key={i} style={{flexBasis:'48%',marginVertical:"2%",alignItems:"center",borderRadius:9,alignContent:'center',height:100,width:100,justifyContent:"center",backgroundColor: data.selected == true  ?'background: rgba(217, 217, 217, 1)': data.lang.lang_color}}>
            <Text>{data.lang.lang_desc} </Text>
            </View>
              
            )
          }
          
        </View>

        <View style={{width: '100%',flexDirection: "row", justifyContent: "center",alignItems: 'center',marginVertical: 40}}>
          <TouchableOpacity style={{backgroundColor: 'rgba(126,85,52,1)' ,width: "30%",
        borderRadius: 10,
        height: 'auto',
        paddingVertical: 12,
        marginVertical: 0}}><Text style={{color: '#fff',lineheight: 40,fontWeight: '500', textAlign: 'center'}}>Exit</Text></TouchableOpacity>
        </View>

        </View>
         
    
        
   }
    </>
  )
  }
}
export default MultiLingual;
