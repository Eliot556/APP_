import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useFonts, Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import { styles } from './src/styles/styles';
import HomeScreen from './src/screens/HomeScreen';
import SonsScreen from './src/screens/SonsScreen';
import SortiesScreen from './src/screens/SortiesScreen';
import Navigation from './src/components/Navigation';
import { initializeAudio } from './src/utils/audioUtils';
import ApiScreen from './src/screens/ApiScreen';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  useEffect(() => {
    initializeAudio();
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'sons':
        return <SonsScreen setCurrentPage={setCurrentPage} />;
      case 'sorties':
        return <SortiesScreen setCurrentPage={setCurrentPage} />;
      case 'api':
        return <ApiScreen />;
      default:
        return <HomeScreen setCurrentPage={setCurrentPage} />;
    }
  };

  if (!fontsLoaded) {
    return <View style={styles.container}><Text style={{color: '#fff'}}>Chargement...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderContent()}
      <StatusBar style="light" />
    </View>
  );
}
