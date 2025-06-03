import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { styles } from '../styles/styles';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-300))[0];
  const fadeAnim = useState(new Animated.Value(1))[0];

  const toggleMenu = () => {
    const toValue = menuVisible ? -300 : 0;
    const fadeValue = menuVisible ? 1 : 0;
    
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: fadeValue,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
    
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    toggleMenu();
  };

  return (
    <>
      <Animated.View style={[styles.menuButton, { opacity: fadeAnim }]}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View 
        style={[
          styles.menu,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>MENU</Text>
          <TouchableOpacity onPress={toggleMenu}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.menuContent}>
          <TouchableOpacity 
            style={styles.menuSection}
            onPress={() => navigateTo('home')}
          >
            <Text style={styles.menuSectionTitle}>ACCUEIL</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuSection}
            onPress={() => navigateTo('sons')}
          >
            <Text style={styles.menuSectionTitle}>SONS</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuSection}
            onPress={() => navigateTo('sorties')}
          >
            <Text style={styles.menuSectionTitle}>SORTIES</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </>
  );
};

export default Navigation; 