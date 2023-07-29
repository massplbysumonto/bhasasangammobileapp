import React,{ useState,useEffect,useRef } from "react";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { AsyncStorage,View, Text , StyleSheet,SafeAreaView,StatusBar ,TextInput,TouchableOpacity,Alert,ScrollView, Dimensions,Animated } from 'react-native'
import { Link } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../component/Color';


const HomePage = (props)=> {
  console.log("props");
  console.log(props.value)
  props.value.map((img, idx) => {
    console.log(img)
  })
  const echo = AsyncStorage.getItem('events');
  console.log(echo);
  AsyncStorage.getAllKeys((err, keys) => {
  // console.log("hello1");

    // AsyncStorage.multiGet(keys, (error, stores) => {
    //   stores.map((result, i, store) => {
    //     console.log({ [store[i][0]]: store[i][1] });
    //     return true;
    //   });
    // });
  });
// console.log(props.value);
  const [gameAttr, setgameAttr] = useState([]);
  const[gameData,setgameData]=useState([]);
  const [eventID,seteventID]=useState(-1);
  const [activeID,setactiveID]=useState(-1);
  const [gameType,setgameType]=useState(-1);
  const [eventType,seteventType]=useState(-1);
  const [id,setID]=useState(-1);
  // const [currentImage, setcurrentImage] = useState(0);

  const maxWidth = Dimensions.get('screen').width;


  
  
  // indicators
  // automatic shuffling of images
  // const animation = 1;

    
      const animation = useRef(new Animated.Value(0));
      const [currentImage, setCurrentImage] = useState(0);
      // useInterval(() => handleAnimation(), 45000);
    
      const handleAnimationnext = () => {
        // console.log(currentImage)
        let newCurrentImage = currentImage + 1;
    
        if (newCurrentImage >= props.value.length) {
          newCurrentImage = 0;
        }
    
        Animated.spring(animation.current, {
          toValue: -(maxWidth * newCurrentImage),
          useNativeDriver: true,
        }).start();
        // console.log(maxWidth * newCurrentImage);
    
        setCurrentImage(newCurrentImage);
      };

      const handleAnimationprev = () => {
        // console.log(currentImage)
        let newCurrentImage = currentImage - 1;
    
        if (newCurrentImage < 0) {
          newCurrentImage = props.value.length - 1;
        }
    
        Animated.spring(animation.current, {
          toValue: -(maxWidth * newCurrentImage),
          useNativeDriver: true,
        }).start();
    
        setCurrentImage(newCurrentImage);
      };
  
  useEffect(()=>{
    if(props.value.length > 0){
      getEventData();
    }
  },[currentImage])
    const getEventData= async ()=>{
      // console.log(props.value[currentImage]);
    if(props.value[currentImage]!=undefined)
    {
      if(props.value[currentImage][0].event_type_id==2)
      {
          for(let i=0;i<props.value[currentImage].length;i++)
          {
            for(let j=0;j<props.value[currentImage][i].tile_game_info.length;j++)
            {
              let date= new Date();
              var getDate=new Date(props.value[currentImage][i].tile_game_info[j].forDate);
              if(getDate.getDate()==date.getDate())
              {
                setactiveID(j);
                // console.log(props.value[currentImage][i].tile_game_info[j].game_status);
                if(props.value[currentImage][i].tile_game_info[j].game_status==1)
                {
                  setgameType(-1);
                }
                else
                {
                  var userid1= await (AsyncStorage.getItem('userID'));
                  var userid=JSON.parse(userid1);
                  // var userLang=userid.lang_id;
                  var userLang=1;
                  for(let k=0;k<props.value[currentImage][0].tile_game_info[j].multiGameData.length;k++)
                  {
                    if(props.value[currentImage][0].tile_game_info[j].multiGameData[k].lang.lang_id==userLang &&props.value[currentImage][0].tile_game_info[j].multiGameData[k].selected!=true )
                    {

                      if(Object.keys(props.value[currentImage][0].tile_game_info[j].multiGameData[k].game).length !=0)
                      {
                      setgameType(props.value[currentImage][0].tile_game_info[j].multiGameData[k].game.game_type_id);
                      setgameAttr(props.value[currentImage][0].tile_game_info[j].multiGameData[k].game);
                      setID(k);
                      seteventID(currentImage);
                      seteventType(2);
                      setgameData(props.value[currentImage][0].tile_game_info[j].multiGameData);
                      break;
                      }
                      else{
                        setgameType(-1);
                      }
                    }
                    else{
                      setgameType(-1);
                    }
                  }
                  
                  
                }
                
                
              }
              
            }
            
          }
    }
    }
    }
  
 const checkSessiosStatus=async (e)=>{
   
   if(eventID!=-1)
   {
    alert("asdadas")
   var gameData1 = await AsyncStorage.getItem('events');
   var gameData=JSON.parse(gameData1);
   gameData[eventID][0].tile_game_info[activeID].multiGameData[id].selected=true;
   await AsyncStorage.setItem("events",JSON.stringify(gameData));
   console.log("eventID")
   }

 }

//  const width = Dimensions.get('window');
//  const height = width * 0.6;



  return (
    <>
    <SafeAreaView style={styles.maincontainer}>
    
      <ScrollView >
      <React.Fragment>
        <View style={styles.sections}>
          <Animated.View
            style={[
              styles.container,
              {
                transform: [{translateX: animation.current}],
              },
            ]}>
          

      { props.value.map((img, idx) => (
        
            <View key={idx} style={styles.cardDiv}>

        
          <Card key={img} style={styles.card}>
           
            <Card.Content>
            <View style={{textAlign: 'center',alignItems: "center",height: 50, justifyContent: "center", marginVertical: 15}}>
            <Text style={{fontSize: 30,fontWeight: 'bold', color:'rgba(126,85,52,1)'}}>{img[0].tile_desc}</Text>
              </View>
              <View style={styles.cardContent}>
              <View style={styles.datecontentrs}>
              <Text style={styles.dateHeadings}> Start Date: </Text>
              <Text style={styles.datepara}>{img[0].tile_start_date}</Text>
              </View>
              <View style={styles.datecontentrs}>
              <Text style={styles.dateHeadings}> End Date: </Text>
              <Text style={styles.datepara}>{img[0].tile_end_date}</Text>
              </View>
              </View>
            </Card.Content>
            <Card.Actions>
            {/* {img[0].event_type_id==1 &&
            <View style={styles.playBtnDiv}><Link
             to={{ screen: 'activityBoard', params: { eventIndex: idx } }}  onPress={(e)=>checkSessiosStatus(e)}>
                 
                 <Button style={styles.playBtn}>
                  <Icon name="play" size={28} color='#fff' />
                  </Button>
                  
             </Link>
             </View>
                } */}
                {img[0].event_type_id==2 && gameType==-1 &&
                 <View style={styles.playBtnDiv}>
                 <Link to={{ screen: 'activityBoard', params: { eventIndex: idx } }} onPress={(e)=>checkSessiosStatus(e)}>
                 
                 <View style={styles.playBtn}>
                  <Icon name="play" size={28} color='#fff' />
                  </View>   
                  </Link>
                  </View>
                }
                 {img[0].event_type_id==2 && gameType==1 &&
                  <View style={styles.playBtnDiv}>
                  <Link to={{screen:'picturePuzzle',params:{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}}  onPress={(e)=>checkSessiosStatus(e)}>
                  
                  <View style={styles.playBtn}>
                    <Icon name="play" size={28} color='#fff' />
                    </View>
                    
                   </Link>
                   </View>
                }
                 {img[0].event_type_id==2 && gameType==2 &&
                  <View style={styles.playBtnDiv}>
                  <Link to={{screen:'wordgame',params:{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}}  onPress={(e)=>checkSessiosStatus(e)}>
                  
                  <View style={styles.playBtn} value={idx}>
                    <Icon name="play" size={28} color='#fff' />
                    </View>
                    
                  </Link>
                  </View>
                }
                {img[0].event_type_id==2 && gameType==3 &&
                  <View style={styles.playBtnDiv}>
                  <Link to={{screen:'quiz',params:{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}}  onPress={(e)=>checkSessiosStatus(e)}>
                  
                  <View style={styles.playBtn}>
                    <Icon name="play" size={28} color='#fff' />
                    </View>
                    
                  </Link>
                  </View>
                }
               
               
                {img[0].event_type_id==2 && gameType==4 &&
                  <View style={styles.playBtnDiv}>

                  <Link to={{screen:'hangman',params:{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}}  onPress={(e)=>checkSessiosStatus(e)}>
                  <View style={styles.playBtn}>
                    <Icon name="play" size={28} color='#fff' />
                    </View>
                   </Link>
                   </View>
                }
                {img[0].event_type_id==2 && gameType==8 &&
                  <View style={styles.playBtnDiv}>

                  <Link to={{screen:'electro',params:{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}}  onPress={(e)=>checkSessiosStatus(e)}>
                  <View style={styles.playBtn}>
                    <Icon name="play" size={28} color='#fff' />
                    </View>
                   </Link>
                   </View>
                }
             </Card.Actions>

          </Card>
          </View>


        ))
      }
      </Animated.View>
      <View style={styles.bottomSliders}>
      <View>
        <TouchableOpacity onPress={handleAnimationprev} style={styles.prevBtn}>

            <Icon name="chevron-left" size={20} color="#fff" />

            
          </TouchableOpacity>
      </View>
      {/* <View style={styles.indicatorContainer}>
            {props.value.map((image, index) => (
              <View
                key={`${image}_${index}`}
                style={[
                  styles.indicator,
                  index === currentImage ? styles.activeIndicator : undefined,
                ]}
              />
            ))}


          </View> */}
          <Text style={styles.indicators}>
            <Text style={{color: 'rgba(126,85,52,1)'}}>{currentImage + 1}</Text> / {props.value.length}

          </Text>
      <View>
        <TouchableOpacity onPress={handleAnimationnext} style={styles.nextBtn}>

            <Icon name="chevron-right" size={20} color="#fff" />

            
          </TouchableOpacity>
      </View>
      </View>


      </View>
    </React.Fragment>
    {/* </View> */}
    </ScrollView>
    </SafeAreaView>
    </>
    
  );
  
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  cardDiv: {
    width: Dimensions.get('screen').width,
    paddingHorizontal: 20,
    paddingVertical: 0,
  
  },
  card: {
    // backgroundColor: colors.boxesColor,
    borderRadius: 15,
    shadowColor: "#000",
    height: 400,
borderWidth: 1,
borderColor: "rgba(0,0,0,0.01)",
// alignItems: 'center',
// alignContent: 'space-between',
    // justifyContent: "space-between",
    // flexDirection: 'row',
  

  },
  sections: {
    width: "100%",
    height: "auto",

  },
  container: {
    flexDirection: 'row',

  },

  cardContent: {
    flexDirection: 'row', 
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  datecontentrs: {
    padding: 0,
    borderWidth: 1,
    borderColor: 'rgba(126,85,52,0.4)',
    borderRadius: 10,
    alignItems: 'center',
    width: '40%',
    
    

  },
  dateHeadings: {
    padding: 6.5,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(126,85,52,1)',
    color: 'white',
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    textAlign: "center"
  },

  datepara: {
    width: '100%',
    textAlign: 'center',
    // alignItems: "center",
    // justifyContent: "center",
    lineHeight: 40,
    // height: 40,
    // flexDirection: 'row',
  },

  playBtnDiv: {
    marginTop: 28,
    width: '100%',
    padding: 10,
    textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'},

  playBtn: {
    backgroundColor: 'rgba(126,85,52,1)',
    // borderWidth: 1,
    // borderColor: 'rgba(126,85,52,1)',
    width:55,
    textAlign: "center",
    height:55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
 
  nextBtn: {
    backgroundColor: 'rgba(126,85,52,1)',
    right: 0,
    width:50,
    textAlign: "center",
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50/2,

  },
  prevBtn:{
    backgroundColor: 'rgba(126,85,52,1)',
    left: 0,
    width:50,
    textAlign: "center",
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50/2,
  },
  indicators: {
    color: 'rgba(0,0,0,0.28)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  bottomSliders: {
     paddingHorizontal: 24,
      paddingVertical: 0,
      width:"100%",
      height: 100,
      position: 'relative',
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: 'center', 
  },

});

export default HomePage;