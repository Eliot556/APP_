import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { styles } from '../styles/styles';

const SortiesScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/MEAT SHITTTTTTTTTTT.png')}
        style={styles.backgroundImage}
      />
      <ScrollView style={styles.pageContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.mainTitle}>SORTIES</Text>
          <View style={styles.separator} />
          <Text style={styles.pageText}>
            Déjà sorties :
          </Text>
          <View style={styles.centeredContainer}>
            <Text style={styles.releaseTitle}>MAI 2024 - EP "BSOD"</Text>
            <Image source={require('../../assets/bsod.png')} style={styles.centeredImage} />
            <Text style={styles.releaseText}>
              EP de 7 titres produit et mixés par R4IDEN.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SortiesScreen; 