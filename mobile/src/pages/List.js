import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, Image, AsyncStorage, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import socketio from 'socket.io-client';

import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.0.13:3000', {
        query: { user_id }
      })
      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} no dia ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
      });
    });
  });

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []
  );


  return (

    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'transparent'} translucent />

      <Image source={logo} style={styles.logo} />
      <ScrollView bounces={false}>
        {techs.map(tech => <SpotList key={tech} tech={tech} />)}
      </ScrollView>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: getStatusBarHeight() + 10,
  }
});