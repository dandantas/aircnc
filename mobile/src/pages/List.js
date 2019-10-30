import React, { useState, useEffect } from 'react';
import { SafeAreaView, Image, AsyncStorage, StyleSheet, ScrollView } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';


import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';


export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storageTechs => {
      const techsArray = storageTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []
  );


  return (
    <SafeAreaView style={styles.container}>

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