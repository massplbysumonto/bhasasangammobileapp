import { useEffect, useState } from "react";
import { Link } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,StatusBar
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { colors, CLEAR, ENTER, colorsToEmoji } from "./wordle/constants";
import Header from '../component/Header';
import Keyboard from "./wordle/components/Keyboard";
// import * as Clipboard from "expo-clipboard";



const NUMBER_OF_TRIES = 6;

const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

// export const maxwidth = this.props.boxMaxWidth;




export default function WordGame(props) {
  const [words,setWords] = useState(props.route.params.gameAttr.game_attr[0]);
  // console.log(words)
  const letters = words.split(""); // ['h', 'e', 'l', 'l', 'o']

const screenWidth = Dimensions.get("window").width;
const boxMaxWidth = (screenWidth - 130) / letters.length;

// const keyHeight = boxMaxWidth * 1.3;

  const [rows, setRows] = useState(
    new Array(NUMBER_OF_TRIES).fill(new Array(letters.length).fill(""))
  );
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState("playing"); // won, lost, playing

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  const checkGameState = () => {
    if (checkIfWon() && gameState !== "won") {
      Alert.alert("Huraaay", "You won!", [
        { text: "Ok"},
      ]);
      setGameState("won");
    } else if (checkIfLost() && gameState !== "lost") {
      Alert.alert("Meh", "Try again tomorrow!");
      setGameState("lost");
    }
  };

  // const shareScore = () => {
  //   const textMap = rows
  //     .map((row, i) =>
  //       row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join("")
  //     )
  //     .filter((row) => row)
  //     .join("\n");
  //   const textToShare = `Wordle \n${textMap}`;
  //   Clipboard.setString(textToShare);
  //   Alert.alert("Copied successfully", "Share your score on you social media");
  // };

  const checkIfWon = () => {
    const row = rows[curRow - 1];

    return row.every((letter, i) => letter === letters[i]);
  };

  const checkIfLost = () => {
    return !checkIfWon() && curRow === rows.length;
  };

  const onKeyPressed = (key) => {
    if (gameState !== "playing") {
      return;
    }

    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      const prevCol = curCol - 1;
      if (prevCol >= 0) {
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }

      return;
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol;
  };

  const getCellBGColor = (row, col) => {
    const letter = rows[row][col];

    if (row >= curRow) {
      return colors.white;
    }
    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  const getAllLettersWithColor = (color) => {
    return rows.flatMap((row, i) =>
      row.filter((cell, j) => getCellBGColor(i, j) === color)
    );
  };

  const greenCaps = getAllLettersWithColor(colors.primary);
  const yellowCaps = getAllLettersWithColor(colors.secondary);
  const greyCaps = getAllLettersWithColor(colors.darkgrey);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: "center",
      padding: 20,
    },
    title: {
      color: colors.btnColor,
      fontSize: 32,
      fontWeight: "bold",
      letterSpacing: 7,
    },
  
    map: {
      alignSelf: "stretch",
      marginVertical: 20,
    },
    row: {
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "center",
    },
    cell: {
      borderWidth: 1.2,
      borderColor: colors.lightgrey,
      flex: 1,
      maxWidth: boxMaxWidth,
      aspectRatio: 1,
      margin: 3,
      justifyContent: "center",
      alignItems: "center",
    },
    cellText: {
      color: colors.darkgrey,
      fontWeight: "bold",
      fontSize: 28,
    },
  });
  

  return (
    <>
    <Header />
    <SafeAreaView style={styles.container}>
    <View style={{width: "100%", flexDirection: 'row', justifyContent: 'flex-end', alignItems: "center", marginBottom: 10,}}>
    

          <View style={{width: "50%", borderRadius: 8, flexDirection:"row",borderColor:"rgba(87, 51, 41,1)",borderWidth:1,}}>
                    <Text style={{textAlign: "center", width: "60%",lineHeight: 28,fontSize: 11,}}>Selected Language:</Text>
                    <Text style={{lineHeight: 28,fontSize: 12,width: "40%", backgroundColor: "rgba(87, 51, 41,1)", borderTopRightRadius: 7, borderBottomRightRadius: 7, color: "rgba(255, 255, 255,1)", textAlign: "center",
                     }}>Bengali</Text>
                    {/* <Text>{this.props.gameData[this.props.id].lang.lang_desc}</Text>  */}
          </View>          
    </View>

      <StatusBar style="light" />

      <Text style={styles.title}>WORDLE</Text>
      <ScrollView style={styles.map}>
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((letter, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    borderColor: isCellActive(i, j)
                      ? colors.grey
                      : colors.darkgrey,
                    backgroundColor: getCellBGColor(i, j),
                  },
                ]}
              >
                <Text style={styles.cellText}>{letter.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
        {
          gameState !=="playing" &&
          <Link to={{screen:"activityBoard", params:{ eventIndex: props.eventID,id:props.id }}}>    
          <Button><Text>Finish</Text></Button>
       </Link>
        }
      </ScrollView>

      <Keyboard
        onKeyPressed={onKeyPressed}
        greenCaps={greenCaps} // ['a', 'b']
        yellowCaps={yellowCaps}
        greyCaps={greyCaps}
      />
    </SafeAreaView>
    </>
    
  );
  

}


