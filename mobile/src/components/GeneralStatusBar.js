import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';

export default function GeneralStatusBarColor() {
    return (
        <View>
            <StatusBar translucent backgroundColor="#a4ffffff" barStyle={"light-content"} />
        </View>
    );
}

const styles = StyleSheet.create({
    statusBar: {
        backgroundColor: "#a4ffffff"
    }
});