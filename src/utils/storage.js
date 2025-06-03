import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  VOLUME: '@app_volume',
  LAST_PLAYED: '@last_played',
  FAVORITES: '@favorites'
};

// Sauvegarder le volume
export const saveVolume = async (volume) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.VOLUME, volume.toString());
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du volume:', error);
    return false;
  }
};

// Récupérer le volume
export const getVolume = async () => {
  try {
    const volume = await AsyncStorage.getItem(STORAGE_KEYS.VOLUME);
    return volume ? parseFloat(volume) : 1.0;
  } catch (error) {
    console.error('Erreur lors de la récupération du volume:', error);
    return 1.0;
  }
};

// Sauvegarder le dernier son joué
export const saveLastPlayed = async (soundInfo) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LAST_PLAYED, JSON.stringify(soundInfo));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du dernier son:', error);
    return false;
  }
};

// Récupérer le dernier son joué
export const getLastPlayed = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LAST_PLAYED);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération du dernier son:', error);
    return null;
  }
};

// Sauvegarder les favoris
export const saveFavorites = async (favorites) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des favoris:', error);
    return false;
  }
};

// Récupérer les favoris
export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    return [];
  }
}; 