import { Audio } from 'expo-av';

export const initializeAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    console.log('Audio initialized successfully');
  } catch (error) {
    console.error('Error initializing audio:', error);
  }
};

export const playSound = async () => {
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../assets/n! (mixé).mp3'),
      { 
        shouldPlay: true,
        isLooping: true,
        volume: 1.0
      }
    );
    
    await newSound.playAsync();
    return newSound;
  } catch (error) {
    console.error('Erreur lors de la lecture du son:', error);
    return null;
  }
};

export const playSound2 = async () => {
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../assets/VE1KA - DYNASTIE_MIX-St_Master.wav'),
      { 
        shouldPlay: true,
        isLooping: true,
        volume: 1.0
      }
    );
    
    await newSound.playAsync();
    return newSound;
  } catch (error) {
    console.error('Erreur lors de la lecture du son:', error);
    return null;
  }
};

export const playSound3 = async () => {
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../assets/VE1KA - SCHIZOPHRENIC SLUTS_MIX  MASTERED(V2)_Master.wav'),
      { 
        shouldPlay: true,
        isLooping: true,
        volume: 1.0
      }
    );
    
    await newSound.playAsync();
    return newSound;
  } catch (error) {
    console.error('Erreur lors de la lecture du son:', error);
    return null;
  }
};

export const playSound4 = async () => {
  try {
    const { sound: newSound } = await Audio.Sound.createAsync(
      require('../../assets/balenciaga v2.wav'),
      { 
        shouldPlay: true,
        isLooping: true,
        volume: 1.0
      }
    );
    
    await newSound.playAsync();
    return newSound;
  } catch (error) {
    console.error('Erreur lors de la lecture du son:', error);
    return null;
  }
}; 