import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import Video from 'react-native-video'

export default class VideoComponent extends Component {
constructor(props){
  super(props);
  console.log(props);
}
  renderVideo () {
    // console.log("renderVideo")
      return(
        <Video
        // source={{uri: 'https://www.youtube.com/watch?v=du09DGSdYBE'}}
        source={require('../assets/videos.mp4')}
          style={{ width: '100%', height: '100%' }}
          // fullscreen={true}
          // fullscreenOrientation={"landscape"}
          controls={true}
          poster='https://www.cdc.gov/healthypets/images/pets/farm-animals-cow.jpg?_=25374'
          paused={this.props.paused}
          // muted={true}
          // repeat={true}
          resizeMode={"contain"}
          volume={1.0}
          rate={1.0}
          ignoreSilentSwitch={"obey"}
          onError={(error)=>{console.log(error)}} 

        />
      )
  }

  render () {
    return (
      <View>
        {this.renderVideo()}
      </View>
    )
  }
}

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});