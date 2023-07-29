//import "./HomePage.css";
import React,{ useState,useEffect,useRef } from "react";
//import Slider from "react-slick";
//import { Button } from 'react-bootstrap'
//import { Card } from "react-bootstrap";
//import { Link } from 'react-router-dom';
//import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { AsyncStorage,View, Text , StyleSheet,SafeAreaView,StatusBar ,TextInput,TouchableOpacity,Alert,ScrollView, Dimensions,Animated } from 'react-native'
import { Link } from '@react-navigation/native';
// import { SliderBox } from "react-native-image-slider-box";
  // import useInterval from "./useInterval";



const HomePage = (props)=> {
// console.log(props.value);
  const [gameAttr, setgameAttr] = useState([]);
  const[gameData,setgameData]=useState([]);
  const [eventID,seteventID]=useState(-1);
  const [activeID,setactiveID]=useState(-1);
  const [gameType,setgameType]=useState(-1);
  const [eventType,seteventType]=useState(-1);
  const [id,setID]=useState(-1);
  const [imageIndex, setImageIndex] = useState(0);

  const maxWidth = Dimensions.get('screen').width;
  
  // indicators
  // automatic shuffling of images

    
      const animation = useRef(new Animated.Value(0));
      const [currentImage, setCurrentImage] = useState(0);
      // useInterval(() => handleAnimation(), 45000);
    
      const handleAnimation = () => {
        let newCurrentImage = currentImage + 1;
    
        if (newCurrentImage >= props.value.length) {
          newCurrentImage = props.value.length-1;
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
  })
    const getEventData= async ()=>{
      console.log(props.value[imageIndex]);
    if(props.value[imageIndex]!=undefined)
    {
      if(props.value[imageIndex][0].event_type_id==2)
      {
          for(let i=0;i<props.value[imageIndex].length;i++)
          {
            for(let j=0;j<props.value[imageIndex][i].tile_game_info.length;j++)
            {
              let date= new Date();
              var getDate=new Date(props.value[imageIndex][i].tile_game_info[j].forDate);
              if(getDate.getDate()==date.getDate())
              {
                setactiveID(j);
                console.log(props.value[imageIndex][i].tile_game_info[j].game_status);
                if(props.value[imageIndex][i].tile_game_info[j].game_status==1)
                {
                  setgameType(-1);
                }
                else
                {
                  var userid1= await (AsyncStorage.getItem('userID'));
                  var userid=JSON.parse(userid1);
                  
                  var userLang=userid.lang_id;
                  for(let k=0;k<props.value[imageIndex][0].tile_game_info[j].multiGameData.length;k++)
                  {
                    if(props.value[imageIndex][0].tile_game_info[j].multiGameData[k].lang.lang_id==userLang &&props.value[imageIndex][0].tile_game_info[j].multiGameData[k].selected!=true )
                    {

                      if(Object.keys(props.value[imageIndex][0].tile_game_info[j].multiGameData[k].game).length !=0)
                      {
                      setgameType(props.value[imageIndex][0].tile_game_info[j].multiGameData[k].game.game_type_id);
                      setgameAttr(props.value[imageIndex][0].tile_game_info[j].multiGameData[k].game);
                      setID(k);
                      seteventID(imageIndex);
                      seteventType(2);
                      setgameData(props.value[imageIndex][0].tile_game_info[j].multiGameData);
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
   var gameData1 = await AsyncStorage.getItem('events');
   var gameData=JSON.parse(gameData1);
   gameData[eventID][0].tile_game_info[activeID].multiGameData[id].selected=true;
   await AsyncStorage.setItem("events",JSON.stringify(gameData));
   console.log("eventID")
   }
 }

//  const width = Dimensions.get('window');
//  const height = width * 0.6;
 const stylesparents = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});


  return (
    <>
    <SafeAreaView style={stylesparents.container}>
    
      <ScrollView>
      <React.Fragment>
        <View>
          <Animated.View
            style={[
              styles.container,
              {
                transform: [{translateX: animation.current}],
              },
            ]}>
          

      { props.value.map((img, idx) => (
        
          <Card key={img} style={styles.image}>
            <Card.Title title={img[0].tile_desc}/>
            <Card.Content>
              <Title> Start Date: </Title>
              <Paragraph>{img[0].tile_start_date}</Paragraph>
              <Title> End Date: </Title>
              <Paragraph>{img[0].tile_end_date}</Paragraph>
            </Card.Content>
            <Card.Actions>
            {img[0].event_type_id==1 &&
            <Link to={{ screen: 'activityBoard', params: { eventIndex: idx } }}  onPress={(e)=>checkSessiosStatus(e)}>
                 <Button id="111"> Play</Button>
             </Link>
                }
                {img[0].event_type_id==2 && gameType==-1 &&
                 <Link to={{ screen: 'activityBoard', params: { eventIndex: idx } }} onPress={(e)=>checkSessiosStatus(e)}>
                 <Button id="111"> Play</Button>
               </Link>
                }
                {img[0].event_type_id==2 && gameType==3 &&
                  <Link to={{screen:'quiz',params:{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}}  onPress={(e)=>checkSessiosStatus(e)}>
                  <Button id="111"> Play</Button>
                  </Link>
                }
                {img[0].event_type_id==2 && gameType==2 &&
                  <Link to={{screen:'wordgame',params:{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}}  onPress={(e)=>checkSessiosStatus(e)}>
                  <Button id="111" value={idx}> Play</Button>
                  </Link>
                }
                {img[0].event_type_id==2 && gameType==1 &&
                  <Link to={{screen:'picturePuzzle',params:{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}}  onPress={(e)=>checkSessiosStatus(e)}>
                  <Button id="111"> Play</Button>
                   </Link>
                }
                {img[0].event_type_id==2 && gameType==4 &&
                  <Link to={{screen:'hangman',params:{gameAttr:gameAttr,gameData:gameData,eventID:eventID,eventType:eventType,id:id}}}  onPress={(e)=>checkSessiosStatus(e)}>
                  <Button id="111"> Play</Button>
                   </Link>
                }
             </Card.Actions>
          </Card>
        ))
      }
      </Animated.View>
      <View style={styles.indicatorContainer}>
            {props.value.map((image, index) => (
              <View
                key={`${image}_${index}`}
                style={[
                  styles.indicator,
                  index === currentImage ? styles.activeIndicator : undefined,
                ]}
              />
            ))}
          </View>
     
        <View>
            <Text onPress={handleAnimation}>next</Text>
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
  image: {
    resizeMode: 'cover',
    height: 500,
    width: Dimensions.get('screen').width,
  },
  container: {
    flexDirection: 'row',
  },
  indicatorContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    bottom: 10,
    zIndex: 2,
  },
  indicator: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderColor: 'white',
    borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  activeIndicator: {
    backgroundColor: 'white',
  },
});

export default HomePage;




// //import "./HomePage.css";
// import React,{ useState,useEffect,useRef } from "react";
// //import Slider from "react-slick";
// //import { Button } from 'react-bootstrap'
// //import { Card } from "react-bootstrap";
// //import { Link } from 'react-router-dom';
// //import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
// import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
// import { AsyncStorage,View, Text , StyleSheet,SafeAreaView,StatusBar ,TextInput,TouchableOpacity,Alert,ScrollView, Dimensions,Animated,Image } from 'react-native'
// import { Link } from '@react-navigation/native';
// // import { SliderBox } from "react-native-image-slider-box";
//   import useInterval from "./useInterval";



// const HomePage = (props)=> {


//   const s = Dimensions.get('screen').width;
  


    
//       const animation = useRef(new Animated.Value(0));
//       const [currentImage, setCurrentImage] = useState(0);
//       // useInterval(() => handleAnimation(), 45000);
    
//       const handleAnimation = () => {
//         let newCurrentImage = currentImage + 1;
    
//         if (newCurrentImage >= props.value.length) {
//           newCurrentImage = props.value.length-1;
//         }
    
//         Animated.spring(animation.current, {
//           toValue: -(s * newCurrentImage),
//           useNativeDriver: true,
//         }).start();
    
//         setCurrentImage(newCurrentImage);
//       };
  



//   return (
//     <>

    
//       <ScrollView>
//       <React.Fragment>
//         <View>
//           <Animated.View
//             style={[
//               styles.container,
//               {
//                 transform: [{translateX: animation.current}],
//               },
//             ]}>
          

//       { props.value.map((img, idx) => (
//         <Image key={img} source={{uri: img}} style={styles.image} />
        
//         ))
//       }
//       </Animated.View>
//       <View style={styles.indicatorContainer}>
//             {props.value.map((image, index) => (
//               <View
//                 key={`${image}_${index}`}
//                 style={[
//                   styles.indicator,
//                   index === currentImage ? styles.activeIndicator : undefined,
//                 ]}
//               />
//             ))}
//           </View>
     
//         <View>
//             <Text onPress={handleAnimation}>next</Text>
//           </View>
//       </View>
//     </React.Fragment>
//     {/* </View> */}
//     </ScrollView>
//     {/* </SafeAreaView> */}
//     </>
    
//   );
  
// }

// const styles = StyleSheet.create({
//   image: {
//     resizeMode: 'cover',
//     height: 500,
//     width: Dimensions.get('screen').width,
//   },
//   container: {
//     flexDirection: 'row',
//   },
//   indicatorContainer: {
//     position: 'absolute',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: Dimensions.get('screen').width,
//     bottom: 10,
//     zIndex: 2,
//   },
//   indicator: {
//     width: 15,
//     height: 15,
//     borderRadius: 7.5,
//     borderColor: 'white',
//     borderWidth: 1,
//     marginHorizontal: 10,
//     marginBottom: 10,
//   },
//   activeIndicator: {
//     backgroundColor: 'white',
//   },
// });

// export default HomePage;