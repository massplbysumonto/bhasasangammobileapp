import React, { useEffect, useState } from "react";
import SmallSquare from "./SmallSquare";
import { View, Text} from 'react-native'
import style from "./BigSquare.module.css";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
  // return array;
}

// const squares = Array.from({ length: 16 }, (_, i) => i);


function BigSquare() {
  const squares=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  // console.log(typeof(squares))
  squares.map((e)=>console.log(e));
  const [randomSquares, setRandmoSquares] = useState([]);
  console.log(typeof(randomSquares))
  useEffect(() => {
    setRandmoSquares(() => shuffle(squares))
  }, []);

  function moveSquare(val) {
    // console.log(typeof(val))
    let zeroIndex = parseInt(randomSquares.indexOf(0));
    let valIndex = parseInt(randomSquares.indexOf(val));
    // console.log(zeroIndex, valIndex);

    if (valIndex + 4 === zeroIndex || valIndex - 4 === zeroIndex) {
        swap(valIndex, zeroIndex);
    } else if (valIndex + 1 === zeroIndex && zeroIndex % 4 !== 0 ) {
        swap(valIndex, zeroIndex);
    } else if (valIndex - 1 === zeroIndex && (zeroIndex + 1) % 4 !== 0) {
        swap(valIndex, zeroIndex)
    }
  }

  function swap(valIndex, zeroIndex) {
    // console.log(zeroIndex, valIndex);
    let temArray = [...randomSquares]
    console.log(typeof(temArray));
    temArray[zeroIndex] = randomSquares[valIndex];
    temArray[valIndex] = 0;
    setRandmoSquares(() => [...temArray])
  }
//  function isSolved(tiles) {
//     for (let i = 0, l = tiles.length; i < l; i++) {
//       if (tiles[i] !== i) {
//         return false;
//       }
//     }
//     return true;
//   }
  // randomSquares.map((e, i) => 
  //   {
      // console.log(typeof(randomSquares))
  //   })
  // const hasWon =isSolved(randomSquares)
  return (
    <>
     <View style={[style.Container,{flexDirection:"row",flexWrap:"wrap"}]}>
      {randomSquares.map((e, i) => (
          <View key={i} style={[style.ContainerSub,]} >
            <SmallSquare value={e}  clickHandler={(val)=>moveSquare(val)}/>
          </View>
          // <Text key={i}>{e}</Text>
        )
      )}
      
    </View>
    {/* {hasWon && <View> */}
      {/* <Text>Puzzle solved 🧠 🎉</Text> */}
      {/* </View>} */}
    </>
  );
}

export default BigSquare;
