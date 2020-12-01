import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

export default function Home ({ navigation }) {

    return (
        <View style={styles.homeContainer}>
            <Text style={styles.gameTitle}>Sugoku</Text>
            <View style={styles.buttons}>
                <Button title="PLAY" onPress={() => navigation.navigate('Game')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gameTitle: {
        fontSize: 50,
        marginBottom: 50
    },
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        transform: [
            {
                translateY: 50
            }
        ]
    },
    buttons: {
        width: '50%'
    }
})