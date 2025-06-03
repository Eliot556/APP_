import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { styles } from '../styles/styles';
import CustomButton from './CustomButton';

const instagramLinks = [
  {
    title: "4NTHR0PO.PH4GII13E._",
    link: "https://www.instagram.com/4nthr0po.ph4gii13e._/",
    image: require('../../assets/BALENCIAGA STP DONNE LES BOTTES.png')
  },
  {
    title: "R4IDEN",
    link: "https://www.instagram.com/s4d_r4iden/",
    image: require('../../assets/pp R4IDEN.png')
  },
  {
    title: "LEYZE",
    link: "https://www.instagram.com/s4d_leyze/",
    image: require('../../assets/pp leyze.png')
  },
  {
    title: "Terrien",
    link: "https://www.instagram.com/terriennnnn/",
    image: require('../../assets/Terrien.....png')
  },
  {
    title: "33s0t3rror11smee",
    link: "https://www.instagram.com/33s0t3rror11smee/",
    image: require('../../assets/pp.png')
  }
];

const InstagramModal = ({ visible, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Mes Comptes Instagram</Text>
        <ScrollView>
          {instagramLinks.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.instagramCard}
              onPress={() => Linking.openURL(item.link)}
            >
              <Image source={item.image} style={styles.instagramImage} />
              <Text style={styles.instagramTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <CustomButton
          title="Fermer"
          onPress={onClose}
        />
      </View>
    </View>
  </Modal>
);

export default InstagramModal; 