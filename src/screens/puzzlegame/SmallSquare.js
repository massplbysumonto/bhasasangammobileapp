import React from 'react';
import style from './SmallSquare.module.css';
import { View,StyleSheet, TouchableOpacity,ImageBackground, Image} from 'react-native'
import imgUrl from './u1.jpg'

function SmallSquare(props) {
    // console.log(console.log(props.clickHandler))
    const tempimgUrl=imgUrl;
    const styles = StyleSheet.create({
        tileStyle : {
            width: 100,
            height: 100,
            // transiion:'2s ease',
            // backgroundImage: `url("${imgUrl}")`,
            backgroundSize: `${360 * 1.25}`,//x and y are nedded to the background  image size 
            backgroundPosition: `${(100 / 4) * (parseInt(props.value) % 4)}% ${(100 / 4) * (Math.floor(parseInt(props.value) / 4))}%`,
          }
        })
    // const tileStyle = {
    //     width: '100%',
    //     height: '100%',
    //     transiion:'2s ease',
    //     backgroundImage: `url("${imgUrl}")`,
    //     backgroundSize: `${360 * 1.25}`,//x and y are nedded to the background  image size 
    //     backgroundPosition: `${(100 / 4) * (parseInt(props.value) % 4)}% ${(100 / 4) * (Math.floor(parseInt(props.value) / 4))}%`,
    
    //   };
    // cropData = {
    //     offset: {x: 100, y: 100},
    //     size: {width: 25, height: 25},
    //     // displaySize: {width: number, height: number},
    //     // resizeMode: 'contain' | 'cover' | 'stretch',
    //   };
    // ImageEditor.cropImage(uri, cropData).then(url => {
    //     console.log("Cropped image uri", url);
    //   })
    // console.log(document.getElementById('id'+props.value))

    return (
       
       
             <TouchableOpacity onPress={(e) => {props.clickHandler(parseInt(props.value))}} >
                 <View nativeID={'id'+props.value} style={(parseInt(props.value) === 0 ? style.EmptySquare : style.FillSquare)} on>
                    {/* <Image source={imgUrl} style={styles.tileStyle}  ></Image>
                 <ImageBackground source={imgUrl}  style={styles.tileStyle} b>
                </ImageBackground> */}
            </View>
            </TouchableOpacity>
       
       
    )
}

export default SmallSquare;