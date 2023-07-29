import React from 'react';
import style from './SmallSquare.module.css';
import imgUrlimg from './u1.jpg'
import { View, Text, Image, ImageBackground } from "react-native";
import { TouchableWithoutFeedback } from 'react-native';
function SmallSquare(props) {
    const [imgUrl, setImgUrl] = React.useState( (props.imgUrl===undefined || props.imgUrl.qimg===undefined)?imgUrlimg:'https://backend.bhashasangam.in/getImage/?imgName='+props.imgUrl.qimg)
    const tileStyle = {
        width: '100%',
        height: '100%',
        transiion:'2s ease',
        backgroundImage: imgUrlimg,
        backgroundSize:'cover',
      };
    return (
        <TouchableWithoutFeedback onPress={(e)=>{props.clickHandler("qindex",props.value)}}>
            <Image  source={{uri:imgUrl}} resizeMode='cover' style={{width:70,height:70,margin:5, borderColor: 'rgba(0,0,0,0.5)', borderWidth: 1}}></Image>
        </TouchableWithoutFeedback>
    )
}

export default SmallSquare;