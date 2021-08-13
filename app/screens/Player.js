import React , {useContext} from 'react';
import {View, StyleSheet, Text, Dimensions, ColorPropType} from 'react-native';
import Screen from '../component/Screen';
import color from '../misc/color';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider';
import PlayerButton from '../component/playerButton';
import { AudioContext } from '../context/AudioProvider';


const {width} = Dimensions.get('window');

const Player = () => {
    const context = useContext(AudioContext);
    const {playbackPosition, playbackDuration} = context;

    const calculateSeekbar = () => {
        if(playbackPosition !== null && playbackDuration !== null){
            return playbackPosition / playbackDuration;
        } 
        return 0;
    }
    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.audioCount}>{(context.currentAudioIndex+1) + ' / ' + context.totalAudioCount}</Text>
                <View style={styles.midBannerContainer}>
                    <MaterialCommunityIcons 
                        name="music-circle" 
                        size={250} 
                        color={context.isPlaying ? color.ACTIVE_BG: color.FONT_MEDIUM} />
                </View>
                <View style={styles.audioPlayerContainer}>
                    <Text numberOfLines={1} style={styles.audioTitle}>{context.currentAudio.filename}</Text>
                    <Slider
                        thumbTintColor={color.ACTIVE_BG}
                        style={{width: width - 50, height: 40, }}
                        minimumValue={0}
                        maximumValue={1}
                        value={calculateSeekbar()}
                        minimumTrackTintColor={color.ACTIVE_BG}
                        maximumTrackTintColor={color.FONT_MEDIUM}
                    />
                    <View style={styles.audioControllers}>
                        <PlayerButton  iconType='Prev'/>
                        <PlayerButton style={{ marginHorizontal: 25}} iconType={context.isPlaying? 'Play':'Pause'}/>
                        <PlayerButton  iconType='Next'/>
                    </View>
                </View>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    audioCount:{
        textAlign: 'right',
        padding: 15,
        color: color.FONT_LIGHT,
        fontSize: 14,
    },
    midBannerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',

    },
    audioPlayerContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    audioTitle:{
        fontSize: 16,
        color: color.FONT,
        padding: 15,
    },
    audioControllers: {
        width,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
})

export default Player;