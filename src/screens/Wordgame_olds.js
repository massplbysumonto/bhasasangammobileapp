import { useState, useEffect, useRef} from 'react';
import { Keyboard,View, Text , StyleSheet,SafeAreaView,TextInput,TouchableOpacity,Alert,StatusBar,ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import WordListInfo from '../services/WordList';
import Header from '../component/Header';

import Icon from 'react-native-vector-icons/AntDesign';

import style from '../screens/WordGame.module.css';
// import WordleSolution from '../components/WorldeSolution'
export default function WordGame(props) {
    // console.log(props.route.params.gameAttr.game_attr[0])
  let [currentWord, setCurrentWord] = useState(props.route.params.gameAttr.game_attr[0])
  let [bestColors, setBestColors] = useState(() => new Map())
  let [currentAttempt, setCurrentAttempt] = useState('')
  let [WordList,setWordList] =useState([]);
  let [countRow,setCountRow] = useState(0);
  const [active, setActive] = useState(false);
  const [finish,setFinish]=useState("");
  const [classname , setClassName]= useState("keyboard");
  let [history, setHistory] = usePersistedHistory(h => {
    waitForAnimation(h)
  })
  // const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  // useEffect(() => {
  //   console.log("121asdsa");
  //   const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
  //     console.log(121);
  //     setKeyboardStatus("Keyboard Shown");
  //   });
  //   const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
  //     setKeyboardStatus("Keyboard Hidden");
  //   });

  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, []);
  useEffect(()=>{
    // console.log("hello");
    if(WordList.length <= 0)
    {
      var data={word_length:currentWord.length}
      getWordList(data);
    }
  });
  async function getWordList(data){
      await WordListInfo.getInstance().getWordList(data).then((res)=>{
        let result = JSON.parse(JSON.stringify(res));
        if(result.code==200){
          var word=[];
          for(let i=0;i<result.data.length;i++)
          word.push(result.data[i].word_attr.toString());
        }
        setWordList(word)
      })
  }
  
  useEffect(() => {
    Keyboard.addListener('keyboardDidChangeFrame', (e)=>handleKeyDown(e))
    return () => Keyboard.removeAllListeners('keyboardWillShow', handleKeyDown)
  })

  function handleKeyDown(e) {
    console.log(e)
    if (e.ctrlKey || e.metaKey || e.altKey) {
      return
    }
    handleKey(e.key)
  }
 
  function handleKey(key) {
    console.log(key)
    if (history.length === 6) {
      return
    }
    if (animatingRef.current) {
      return
    }
    let letter = key.toLowerCase()
    if (letter === 'enter') {
      if (currentAttempt.length < currentWord.length) {
        return
      }
      else{
        setCountRow(countRow+1)
      }
      if (!WordList.includes(currentAttempt)) {
        alert('Not in my thesaurus')
        return
      }
      if (
        countRow ==5 &&
        currentAttempt !== secret
      ) {
       setFinish("lost")
      }
      if (
        countRow <=5 &&
        currentAttempt == secret
      ) {
        setTimeout(() => {
          setFinish("won")
        }, 200)

        // setActive(true);
      }
      // if()
      let newHistory = [
        ...history,
        currentAttempt
      ]
      setHistory(newHistory)
      setCurrentAttempt('')
      waitForAnimation(newHistory)
    } else if (letter === 'backspace') {
      setCurrentAttempt(
        currentAttempt.slice(0, currentAttempt.length - 1)
      )
    } else if (/^[a-z]$/.test(letter)) {
      if (currentAttempt.length < currentWord.length) {
        setCurrentAttempt(currentAttempt + letter)
      }
    }
  }

  let animatingRef = useRef(false)
  function waitForAnimation(nextHistory) {
    if (animatingRef.current) {
      throw Error('should never happen')
    }
    animatingRef.current = true
    setTimeout(() => {
      animatingRef.current = false
      setBestColors(calculateBestColors(nextHistory))
    }, 200)
  }
  let secret = (currentWord).toLowerCase();

  function Grid({
    history,
    currentAttempt
  }) {
    let rows = []
    for (let i = 0; i < 6; i++) {
      if (i < history.length) {
        rows.push(
          <Attempt
            key={i}
            attempt={history[i]}
            solved={true}
          />
        )
      } else if (i === history.length) {
        rows.push(
          <Attempt
            key={i}
            attempt={currentAttempt}
            solved={false}
          />
        )
      } else {
        rows.push(
          <Attempt
            key={i}
            attempt=""
            solved={false}
          />
        )
      }
    }
    return (
      <View style={styles.grid}>
        {rows}
      </View>
    );
  }

  function Attempt({
    attempt,
    solved,
  }) {
    let cells = []
    for (let i = 0; i < currentWord.length; i++) {
      cells.push(
        <Cell
          key={i}
          index={i}
          attempt={attempt}
          solved={solved}
        />
      )
    }
    return <View>{cells}</View>
  }

  function Cell({
    index,
    attempt,
    solved,
  }) {
    let content
    let hasLetter = attempt[index] !== undefined
    let color = getBgColor(attempt, index)
    if (hasLetter) {
      content = attempt[index]
    } else {
      // lol
      content = <View style={{ opacity:0 }}><Text>X</Text></View>
    }
    return (
      <View
        style={(solved ? ' cellsolved' : 'cell')
            
        //   + (hasLetter ? ' filled' : '')
        }
      >
        {/* <View style={styles.surface,transitionDelay: (index * 300) + 'ms'} style={{
          
        }}> */}
        <View style={styles.surface}>
          <View
            className="front"
            style={{
              backgroundColor: NONE,
              borderColor: hasLetter ? BORDER : ''
            }}
          >
            {content}
          </View>
          <View
            className="back"
            style={{
              backgroundColor: color,
              borderColor: color
            }}
          >
            {content}
          </View>
        </View>
      </View>
    )
  }
  
  function KeyboardComponent({ bestColors, onKey }) {
    if(finish==="won"|| finish === "lost"){
      setClassName("keyboarda")
      
    }
    console.log(finish)
    return (
      <View style={[finish==="won"|| finish === "lost"? style.keyboarda :style.keyboard,{padding: 0, margin: 0}]}>

        <KeyboardRow
          bestColors={bestColors}
          letters="qwertyuiop"
          onKey={onKey}
          isLast={false}
        />
        <KeyboardRow
          bestColors={bestColors}
          letters="asdfghjkl"
          onKey={onKey}
          isLast={false}
        />
        <KeyboardRow
          bestColors={bestColors}
          letters="zxcvbnm"
          onKey={onKey}
          isLast={true}
        />
      </View>
    )
  }

  function KeyboardRow({
    bestColors,
    letters,
    isLast,
    onKey
  }) {
    let buttons = []
    if (isLast) {
      buttons.push(
        <Buttons
          onKey={onKey}
          key="enter"
          buttonKey="Enter"
        ><Text style={{marginHorizontal:0,marginVertical:0,fontSize: 18, textTransform: 'uppercase',
         textAlign: 'center'}}><Icon name='enter' size={20} color="" /></Text></Buttons>
      )
    }
    for (let letter of letters) {
      buttons.push(
        <Buttons
          onKey={onKey}
          color={bestColors.get(letter)}
          key={letter}
          buttonKey={letter}
        >
          <Text style={{marginHorizontal:0,marginVertical:0,fontSize: 18, textTransform: 'uppercase',
          textAlign: 'center'}}>{letter}</Text>
        </Buttons>
      )
    }
    if (isLast) {
      buttons.push(
        <Buttons
          onKey={onKey}
          key="backspace"
          buttonKey="Backspace"
        >
           <Text style={{textAlign: 'center'}}><Icon name='arrowleft' size={20} color="" /></Text>
        </Buttons>
      )
    }
    return (
      <View style={{flexDirection:'row',flexWrap:'wrap',}}>
        {buttons}
      </View>
    )
  }
  // buttonKey=='Backspace' ? {width: 50,} : {width: 'auto'}, {
  function Buttons({
    buttonKey,
    children,
    color = LIGHTGREY,
    onKey,
  }) {
    return (
      <View style={{width: 100,flex: 1,alignItem:"center",
      justifyContent:"center",backgroundColor:color,borderColor:color,textTransform:"uppercase",
      padding: 1,margin: 3,borderRadius: 5,height: 50,border: "none",color: "white",}}>
      <TouchableOpacity 
        onClick={() => {
          onKey(buttonKey)
        }}
       
      >
        {children}
      </TouchableOpacity>
      </View>
    )
  }

  function usePersistedHistory(onLoad) {
    let [history, setHistory] = useState([])
    let loadedRef = useRef(false)
    // useEffect(() => {
    //   if (loadedRef.current) {
    //     return
    //   }
    //   loadedRef.current = true
    //   let savedHistory = loadHistory()
    //   if (savedHistory) {
    //     setHistory(savedHistory)
    //     onLoad(savedHistory)
    //   }
    // })
    // useEffect(() => {
    //   saveHistory(history)
    // }, [history])
    return [history, setHistory]
  }

  function getBgColor(attempt, i) {
    let correctLetter = secret[i]
    let attemptLetter = attempt[i]
    if (
      attemptLetter === undefined ||
      secret.indexOf(attemptLetter) === -1
    ) {
      return GREY
    }
    if (correctLetter === attemptLetter) {
      return GREEN
    }
    return YELLOW
  }

  function calculateBestColors(history) {
    let map = new Map()
    for (let attempt of history) {
      for (let i = 0; i < attempt.length; i++) {
        let color = getBgColor(attempt, i)
        let key = attempt[i]
        let bestColor = map.get(key)
        map.set(key, getBetterColor(color, bestColor))
      }
    }
    return map
  }

  function getBetterColor(a, b) {
    if (a === GREEN || b === GREEN) {
      return GREEN
    }
    if (a === YELLOW || b === YELLOW) {
      return YELLOW
    }
    return GREY
  }

//   function loadHistory() {
//     let data
//     try {
//       data = JSON.parse(localStorage.getItem('data'))
//     } catch { }
//     if (data != null) {
//       if (data.secret === secret) {
//         return data.history
//       }
//     }
//   }

//   function saveHistory(history) {
//     let data = JSON.stringify({
//       secret,
//       history
//     })
//     try {
//       localStorage.setItem('data', data)
//     } catch { }
//   }

  let GREY = '#212121'
  let LIGHTGREY = '#888'
  let GREEN = '#538d4e'
  let YELLOW = '#b59f3b'
  let BORDER = '#d3d6da'
  let NONE = 'rgba(0,0,0,0)'
  
//   const finishHandler=()=>{
//       setActive(true)
//   }
  const styles = StyleSheet.create({
//     body:{
//   /* background: #111; */
//   color: "white",
//   fontFamily: "sans-serif",
//   textAlign: "center",
//   textTransform: "uppercase"
// },
// bodyscreen :{
//   height: "auto",
//   width: "100%"
// },
screen :{
//   display: "flex",
  flexDirection: "column",
//   height: "auto",
  width: "100%",
//   backgroundColor:"black"

}
,// h1 {
//   font-size: 42px;
//   flex: none;
// }
grid: {
  flex: 1
},
// button:{
//   textTransform: "uppercase",
//   padding: 15,
//   margin: 3,
//   borderRadius: 5,
//   height: 60,
//   border: "none",
//   fontSize: 16,
//   color: "white",
// //   cursor: pointer;
// },
keyboard :{
//   flex: "none",
  padding: 0,
//   transition: "20s",
//   display: "block",
//   -webkit-animation-duration: 10s;
//   animationDuration: "10s"
//   wid
},
keyboarda :{
  // flex: "none",
  padding: 0,
  // display: "none",
  // transition: "20s"
  /* animation-name: fadeOut;
  -webkit-animation-name: fadeOut; */
},
// /* @keyframes fadeOut{
//  0% {opacity: 1;}
//  100% {opacity: 0;}
// }
// @-webkit-keyframes fadeOut{
//   0% {opacity: 1;}
//   100% {opacity: 0;}
// } */
cell :{
  width: 65,
  height: 65,
  lineHeight: 55,
  /* box-sizing: initial !important; */
  display: "inline-block",
  margin: "0 4",
  /* padding: 6px; */
  fontSize: 40,
  fontWeight: 'bold',
  perspective: 1000
},
// cell .front,
// .cell .back {
//   border: 2px solid #573329;
//   backface-visibility: hidden;
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
// }
cellsolved:{
    transform: "rotateX(180deg)"
  },
surface :{
  transform: "rotateX(180deg)"
}
// .cell .surface {
//   transition-duration: 800ms;
//   transform-style: preserve-3d;
//   position: relative;
//   width: 100%;
//   height: 100%;
// }
// .cell .front {
//   z-index: 2;
//   color: #000;
// }
// .cell .back{
//   color: #fff;
//   z-index: 1;
//   transform: rotateX(180deg);
// }
// @keyframes press :{
//   from {
//     opacity: 0.5;
//     transform: scale(0.95);
//   }
//   50% {
//     opacity: 0.85;
//     transform: scale(1.1);
//   }
//   to {
//     opacity: 1;
//     transform: scale(1);
//   }
// }
  });

  return (
    <>
    <Header />
    
  
    <View style={{paddingHorizontal: 20,}}>
      {/* <div style={{ width: "50%", textAlign: "right"}}>
      <div style={{ width: "40%", border: "1px solid rgb(87 51 41)", borderRadius: "10px", lineHeight: "28px"}}>
      <label style={{textAlign: "center", width: "60%"}}><Text>Selected language: </Text> </label>
        <span style={{width: "40%", background: "rgb(87 51 41)", borderRadius: "0 9px 9px 0", color: "rgb(255 255 255)", textAlign: "center", boxShadow: "-2px 0px 4px rgb(0 0 0 / 20%)"}}></span>
        </div>
        </div> */}
         <View style={{width: "100%", flexDirection: 'row', justifyContent: 'flex-end',}}>
          <View style={{width: "65%", borderRadius: 8, flexDirection:"row",borderColor:"rgba(87, 51, 41,1)",borderWidth:1,}}>
                    <Text style={{textAlign: "center", width: "60%",lineHeight: 28,}}>Selected Language:</Text>
                    <Text style={{lineHeight: 28,width: "40%", backgroundColor: "rgba(87, 51, 41,1)", borderTopRightRadius: 7, borderBottomRightRadius: 7, color: "rgba(255, 255, 255,1)", textAlign: "center",
                     }}>Bengali</Text>
                    {/* <Text>{this.props.gameData[this.props.id].lang.lang_desc}</Text>  */}
                    </View>
                    
                    </View>
        {
        !active &&
        <>
        <View >
        <Text style={{fontSize: 25, fontWeight: '500'}}>Word Game</Text>
        </View>
        {/* <Grid
          history={history}
          currentAttempt={currentAttempt} /> */}
          {
            // !finish &&
          <KeyboardComponent 
            bestColors={bestColors}
            onKey={handleKey} />
          }
          </>
    }
      
    </View>
    </>
  )
}

