//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

// create a component
const MySound = () => {

     const _playSound = async () => {
        await Audio.Sound.createAsync(require('../assets/sound/click-sound.mp3'), {shouldPlay: true})
    }

    return (
        <View style={styles.container}>
            <Button
                title="Play Sound"
                color="#3cbbb1"
                onPress={() => _playSound()}
            />
        </View>
    );
}


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default MySound;
