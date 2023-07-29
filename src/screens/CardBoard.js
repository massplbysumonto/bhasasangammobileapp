import React, { Component } from 'react';
import { AsyncStorage,View, Text , StyleSheet,SafeAreaView,StatusBar ,TextInput,TouchableOpacity,Alert,ScrollView } from 'react-native'
// import Card from "../components/Card";
// import stylesCardBoard from "../components/CardBoard.module.css";
import MultiLingual from './Multilingual';
// import GameStatus from '../screens/gameStatus';
class CardBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storageData: [],
            eventID: -1,
            total:0,
            gameAttr:[],
            activeID:-1,
            status:false
        }
        console.log(props);
    }

    componentDidMount() {
       if(this.state.storageData.length==0) this.getData();
    }
    async getData() {
        
        var eventID = this.props.gameData;
        var gameData1 = await AsyncStorage.getItem('events');
        var gameData=JSON.parse(gameData1);
        this.setState({ storageData: gameData[eventID], eventID: eventID })
        if(this.state.storageData[0].event_type_id==1)
        {
        this.state.storageData[0].tile_game_info.map((e) => {
            this.setState({
                total :this.state.total+ e.game_status})
        })
        if (this.state.total == this.state.storageData[0].tile_game_info.length) {
        var currentArtifacts=AsyncStorage.getItem('artifactList');
        if(!this.state.storageData[0].hasOwnProperty('tile_artifact_info'))
        {

        }
        else{
        var date = new Date();
        var artifact_url = this.state.storageData[0].tile_artifact_info.artifact_prev;
        var artifact_name=this.state.storageData[0].tile_artifact_info.artifact_name
        var artifactInfo={artifact_type:1,artifact_url:artifact_url,artifact_name:artifact_name,eventName:this.state.storageData[0].tile_desc,date:date}
        if(currentArtifacts==null)
        {
            currentArtifacts=[];
            currentArtifacts.push(artifactInfo);
            await AsyncStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
        }
        else
        {
            currentArtifacts=JSON.parse(currentArtifacts);
            for(let i=0;i<currentArtifacts.length;i++)
            {
                if(currentArtifacts[i].eventName ===this.state.storageData[0].tile_desc && currentArtifacts[i].artifact_type==1) return this.state.storageData[0]
            }
            currentArtifacts.push(artifactInfo);
            await AsyncStorage.setItem("artifactList",JSON.stringify(currentArtifacts));
        }
        }
    }
    }
     else if(this.state.storageData[0].event_type_id==2)
    {
       
        let date= new Date();
            
     for(let i=0;i<this.state.storageData[0].tile_game_info.length;i++)
    {
        
        var getDate=new Date(this.state.storageData[0].tile_game_info[i].forDate);
        //check for date and the status of the activity on the day--> 0=active, 1=inactive
        if(getDate.getDate()==date.getDate() && this.state.storageData[0].tile_game_info[i].game_status==0)
        {
            this.setState({
                activeID: i,
                });
            this.setState({
                gameAttr: this.state.storageData[0].tile_game_info[i].multiGameData,
                });

            break;
        }
        else if(getDate.getDate()==date.getDate() && this.state.storageData[0].tile_game_info[i].game_status==1){
            this.setState({
                status :true})
        }
        
    }
    }

    }
    render() {
        // console.log(this.state)
        return (
                    (this.state.gameAttr.length > 0 && this.state.storageData[0].event_type_id==2) &&
                    <MultiLingual gameAttr={this.state.gameAttr} activeID={this.state.activeID} eventID={this.state.eventID} eventType={this.state.storageData[0].event_type_id}/>
                   
                    // this.state.status==true &&
                    // <GameStatus/>
                //  }
            // </div>
        )
    }
}

export default CardBoard;