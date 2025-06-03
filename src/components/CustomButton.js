import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, isPlaying }) => (
  <TouchableOpacity 
    onPress={onPress}
    style={[
      styles.button,
      isPlaying && styles.playingButton
    ]}
    activeOpacity={0.8}
  >
    <Text style={[
      styles.buttonText,
      isPlaying && styles.playingText
    ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  playingButton: {
    backgroundColor: '#357ABD',
  },
  playingText: {
    color: '#FFFFFF',
  }
});

export default CustomButton; 