// play audio
 export const play = async (playbackObj, uri) => {
    try {
        return await playbackObj.loadAsync(
            {uri}, 
            {shouldPlay:true}
        );
    } catch (error) {
        console.log('error in play method', error.messaage)
    }
}

//pause audio
export const pause = async (playbackObj) => {
    try {
        return await playbackObj.setStatusAsync( 
            {shouldPlay:false}
        );
    } catch (error) {
        console.log('error in pause method', error.messaage)
    }
}
//resume audio
export const resume = async (playbackObj) => {
    try {
        return await playbackObj.playAsync()
    } catch (error) {
        console.log('error in resume method', error.messaage)
    }
}

//play another audio