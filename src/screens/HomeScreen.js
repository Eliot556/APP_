import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { styles } from '../styles/styles';
import CustomButton from '../components/CustomButton';
import { playSound } from '../utils/audioUtils';
import InstagramModal from '../components/InstagramModal';

const HomeScreen = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePlaySound = async () => {
    if (isPlaying && sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    } else {
      const newSound = await playSound();
      if (newSound) {
        setSound(newSound);
        setIsPlaying(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/MEAT SHITTTTTTTTTTT.png')}
        style={styles.backgroundImage}
      />
      <Text style={styles.mainTitle}>S4D 3ND C0M3</Text>
      <View style={styles.separator} />
      <Image
        source={require('../../assets/cbb.png')}
        style={styles.mainImage}
      />

      <View style={styles.buttonContainer}>
        <CustomButton 
          title="𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃" 
          onPress={handlePlaySound}
          isPlaying={isPlaying}
        />

        <CustomButton
          title="SPOTIFY"
          onPress={() => Linking.openURL('https://open.spotify.com/artist/6Y1CPUyXzjahC5Q0Pj68Un')}
        />

        <CustomButton
          title="SOUNDCLOUD"
          onPress={() => Linking.openURL('https://soundcloud.com/s4d3ndc0m3-420308036')}
        />

        <CustomButton
          title="INSTAGRAM"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <InstagramModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default HomeScreen; 