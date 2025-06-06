import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { styles as globalStyles } from '../styles/styles';
import * as storage from '../utils/storage';
import { SOUNDS } from '../constants/sounds';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const [currentSound, setCurrentSound] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHistory();
    return () => {
      if (currentSound) {
        currentSound.unloadAsync();
      }
    };
  }, []);

  const loadHistory = async () => {
    try {
      const lastPlayed = await storage.getLastPlayed();
      if (lastPlayed) {
        setHistory([lastPlayed]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'historique:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaySound = async (soundId) => {
    try {
      const sound = SOUNDS.find(s => s.id === soundId);
      if (!sound) return;

      if (currentPlaying === soundId) {
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
          setCurrentPlaying(soundId);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la lecture du son:', error);
      Alert.alert('Erreur', 'Impossible de jouer le son.');
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
          <Text style={styles.mainTitle}>HISTORIQUE</Text>
          <View style={styles.separator} />

          {history.length === 0 ? (
            <Text style={styles.emptyText}>Aucun son dans l'historique</Text>
          ) : (
            history.map(item => (
              <TouchableOpacity 
                key={item.timestamp}
                style={[
                  styles.soundButton,
                  currentPlaying === item.id && styles.playingButton
                ]}
                onPress={() => handlePlaySound(item.id)}
              >
                <View>
                  <Text style={styles.soundText}>{item.title}</Text>
                  <Text style={styles.timestampText}>
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
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
  timestampText: {
    color: '#999',
    fontSize: 12,
    fontFamily: 'Orbitron_400Regular',
    marginTop: 5,
  },
});

export default HistoryScreen; 