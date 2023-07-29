import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import Video from 'react-native-video'

export default class VideoComponent extends Component {
  constructor(props){
    super(props);
  }
  renderVideo () {
      return(
        <Video
        // source={{uri: 'https://www.youtube.com/watch?v=du09DGSdYBE'}}
        source={require('../assets/480.mp4')}
          style={{ width: '100%', height: '100%' }}
          fullscreen={true}
          fullscreenOrientation={"landscape"}
          controls={true}
          resizeMode={"cover"}
          paused={this.props.paused}
          poster=''
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