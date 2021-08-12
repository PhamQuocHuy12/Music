import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { AudioContext } from '../context/AudioProvider'
import {LayoutProvider, RecyclerListView} from 'recyclerlistview'
import AudioListItem from '../component/AudioListItem';
import Screen from '../component/Screen';
import OptionModal from '../component/OptionModal';
import { Audio } from 'expo-av';
import { play, pause, resume, playAnother } from '../misc/audioController'


class AudioList extends Component {
  static contextType = AudioContext;

  layoutProvider = new LayoutProvider(i => 'audio', (type, dim) => {
    switch(type){
      case 'audio':
        dim.width = Dimensions.get('window').width;
        dim.height = 70;
        break;
      default:
        dim.width=0;
        dim.height=0;
    }
    
  })

  

  handleAudioPress = async audio => {
    const {soundObj, playbackObj, currentAudio, updateState} = this.context;

    //play
    if(soundObj === null){
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, audio.uri);

      return updateState(this.context, {
        playbackObj: playbackObj, 
        soundObj: status,
        currentAudio: audio
      })
    }

    //pause
    if(soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id){
      const status = await pause(playbackObj);
      return updateState(this.context, {
        soundObj: status,
      })
    }

    //resume
    if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id){
      const status = await resume(playbackObj);
      return updateState(this.context, {
        soundObj: status,
      })
    }

    //playAnother
    if (soundObj.isLoaded && currentAudio.id !== audio.id ){
      const status = await  playAnother(playbackObj, audio.uri);
      return updateState(this.context, {
        soundObj: status,
        currentAudio: audio
      });
    }
  }

  rowRenderer = (type, item) => {
    return <AudioListItem 
      onAudioPress={ () => this.handleAudioPress(item)}
      title={item.filename} 
      duration={item.duration} 
      onOptionPress={() => {
          this.currentItem = item;
          this.setState({...this.state, optionModalVisibility: true});
        }}
        />
  }

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisibility: false,
    };
    
    this.currentItem = {};
  }

  render() {
    return (
        <AudioContext.Consumer>
          {({dataProvider}) => {
              return (
              <Screen>
                <RecyclerListView   dataProvider={dataProvider} 
                                    layoutProvider={this.layoutProvider}
                                    rowRenderer={this.rowRenderer}>
                </RecyclerListView>
                <OptionModal 
                    onPlayPress={() => console.log('Playing')}
                    onAddPress={() => console.log('Added')}
                    currentItem ={this.currentItem}
                    visible={this.state.optionModalVisibility}
                    onClose={() => this.setState({...this.state, optionModalVisibility:false})}
                  />
              </Screen>
              )
          }}
        </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
container:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
}
})

export default AudioList;
