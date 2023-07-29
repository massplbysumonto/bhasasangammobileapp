import axios from "react-native-axios";
import {Component} from "react";
class UserService extends Component {
    static myInstance = null;
    
    static getInstance() { 
      
        return new UserService();
            
    }
    
    registerService(data) {
        return new Promise((resolve,reject)=>{
            var newData =JSON.stringify(data);
          axios.post('http://localhost:8000/register',data)
          .then(function (response) {
            //   console.log(response.data);
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        })         
    }

    loginService(data){
        return new Promise((resolve,reject)=>{
            axios.post('http://localhost:8000/login',data)
            .then(function (response) {
                // console.log(response.data);
              resolve(response.data);
            })
            .catch(function (error) {
              console.log(error);
            //    reject(error)
            });
  
          })         
    }
    getAllLanguage(data) {
      return new Promise((resolve,reject)=>{
        axios.post('http://3.7.18.254:80/lang/getLang',data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      })         }
}
    export default UserService