import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { styles as globalStyles } from '../styles/styles';
import * as storage from '../utils/storage';
import { SOUNDS } from '../constants/sounds';

const SonsScreen = () => {
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [volume, setVolume] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, []);

  const loadData = async () => {
    try {
      // Charger les favoris
      const savedFavorites = await storage.getFavorites();
      setFavorites(savedFavorites);

      // Charger le volume
      const savedVolume = await storage.getVolume();
      setVolume(savedVolume);
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaySound = async (sound) => {
    try {
      if (currentPlaying === sound.id) {
        if (currentSound) {
          await currentSound.pauseAsync();
          setCurrentPlaying(null);
          setCurrentSound(null);
        }
      } else {
        if (currentSound) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
        }
        
        const newSound = await sound.play();
        if (newSound) {
          await newSound.setVolumeAsync(volume);
          setCurrentSound(newSound);
          setCurrentPlaying(sound.id);
          
          // Sauvegarder comme dernier son joué
          const soundInfo = {
            id: sound.id,
            title: sound.title,
            timestamp: new Date().toISOString()
          };
          await storage.saveLastPlayed(soundInfo);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du son:', error);
      Alert.alert('Erreur', 'Impossible de jouer le son.');
    }
  };

  const toggleFavorite = async (sound) => {
    try {
      const newFavorites = favorites.some(f => f.id === sound.id)
        ? favorites.filter(f => f.id !== sound.id)
        : [...favorites, { id: sound.id, title: sound.title }];
      
      await storage.saveFavorites(newFavorites);
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris:', error);
      Alert.alert('Erreur', 'Impossible de gérer les favoris.');
    }
  };

  const handleVolumeChange = async (newVolume) => {
    try {
      await storage.saveVolume(newVolume);
      setVolume(newVolume);

      if (currentSound) {
        await currentSound.setVolumeAsync(newVolume);
      }
    } catch (error) {
      console.error('Erreur lors du changement de volume:', error);
      Alert.alert('Erreur', 'Impossible de sauvegarder le volume.');
    }
  };

  if (isLoading) {
    return (
      <View style={[globalStyles.container, styles.centerContent]}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Image 
        source={require('../../assets/MEAT SHITTTTTTTTTTT.png')}
        style={globalStyles.backgroundImage}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.mainTitle}>SONS</Text>
          <View style={styles.separator} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>TOUS LES SONS</Text>
            {SOUNDS.map(sound => (
              <TouchableOpacity 
                key={sound.id}
                style={[
                  styles.soundButton,
                  currentPlaying === sound.id && styles.playingButton
                ]}
                onPress={() => handlePlaySound(sound)}
              >
                <Text style={styles.soundText}>{sound.title}</Text>
                <TouchableOpacity 
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(sound)}
                >
                  <Text style={styles.favoriteIcon}>
                    {favorites.some(f => f.id === sound.id) ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>VOLUME</Text>
            <View style={styles.volumeControl}>
              <TouchableOpacity 
                style={styles.volumeButton}
                onPress={() => handleVolumeChange(Math.max(0, volume - 0.1))}
              >
                <Text style={styles.volumeButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.volumeText}>{Math.round(volume * 100)}%</Text>
              <TouchableOpacity 
                style={styles.volumeButton}
                onPress={() => handleVolumeChange(Math.min(1, volume + 0.1))}
              >
                <Text style={styles.volumeButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    padding: 20,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Orbitron_400Regular',
  },
  mainTitle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Orbitron_700Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#333',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Orbitron_700Bold',
    marginBottom: 15,
  },
  soundButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  playingButton: {
    backgroundColor: '#4A90E2',
  },
  soundText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
  },
  favoriteButton: {
    padding: 5,
  },
  favoriteIcon: {
    color: '#FFD700',
    fontSize: 24,
  },
  volumeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  volumeButton: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Orbitron_700Bold',
  },
  volumeText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    minWidth: 60,
    textAlign: 'center',
  },
});

export default SonsScreen; 