import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { styles as globalStyles } from '../styles/styles';
import * as storage from '../utils/storage';
import { SOUNDS } from '../constants/sounds';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await storage.getFavorites();
      setFavorites(savedFavorites);
    } catch (error) {
      console.error('Erreur lors du chargement des favoris:', error);
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
          setCurrentSound(newSound);
          setCurrentPlaying(sound.id);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du son:', error);
      Alert.alert('Erreur', 'Impossible de jouer le son.');
    }
  };

  const toggleFavorite = async (sound) => {
    try {
      const newFavorites = favorites.filter(f => f.id !== sound.id);
      await storage.saveFavorites(newFavorites);
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris:', error);
      Alert.alert('Erreur', 'Impossible de gérer les favoris.');
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Text style={styles.mainTitle}>MES FAVORIS</Text>
          <View style={styles.separator} />

          {favorites.length === 0 ? (
            <Text style={styles.emptyText}>Aucun favori pour le moment</Text>
          ) : (
            favorites.map(fav => {
              const sound = SOUNDS.find(s => s.id === fav.id);
              if (!sound) return null;
              return (
                <TouchableOpacity 
                  key={fav.id}
                  style={[
                    styles.soundButton,
                    currentPlaying === sound.id && styles.playingButton
                  ]}
                  onPress={() => handlePlaySound(sound)}
                >
                  <Text style={styles.soundText}>{fav.title}</Text>
                  <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(sound)}
                  >
                    <Text style={styles.favoriteIcon}>★</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })
          )}
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
  emptyText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    textAlign: 'center',
    marginTop: 20,
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
});

export default FavoritesScreen; 