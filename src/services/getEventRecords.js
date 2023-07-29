import axios from "react-native-axios";
import React, { Component } from "react";
class GetEventRecords extends Component {
  static myInstance = null;

  static getInstance() {
    return new GetEventRecords();
  }
  getRecords(data) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/game/getCurrentTiles')
        .then(function (response) {
          resolve(response.data.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
  
}
export default GetEventRecords