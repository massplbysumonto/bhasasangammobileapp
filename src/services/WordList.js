import axios from "react-native-axios";
import React, { Component } from "react";
class WordList extends Component {
  static myInstance = null;

  static getInstance() {
    return new WordList();
  }
  getWordList(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/getWordInfoByLengthAttr',data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
}
export default WordList