import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  Linking,
  Modal,
  ScrollView,
  Dimensions,
  Animated,
  Easing 
} from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  useFonts,
  Orbitron_400Regular,
  Orbitron_700Bold,
} from '@expo-google-fonts/orbitron';

export default function App() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const slideAnim = useState(new Animated.Value(-300))[0];
  const fadeAnim = useState(new Animated.Value(1))[0];

  let [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  const instagramLinks = [
    {
      title: "4NTHR0PO.PH4GII13E._",
      link: "https://www.instagram.com/4nthr0po.ph4gii13e._/",
      image: require('./assets/BALENCIAGA STP DONNE LES BOTTES.png')
    },
    {
      title: "R4IDEN",
      link: "https://www.instagram.com/s4d_r4iden/",
      image: require('./assets/pp R4IDEN.png')
    },
    {
      title: "LEYZE",
      link: "https://www.instagram.com/s4d_leyze/",
      image: require('./assets/pp leyze.png')
    },
    {
      title: "33s0t3rror11smee",
      link: "https://www.instagram.com/33s0t3rror11smee/",
      image: require('./assets/pp.png')
    }
  ];

  useEffect(() => {
    async function initializeAudio() {
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
    }
    
    initializeAudio();
  }, []);

  async function playSound() {
    try {
      console.log('Attempting to play sound...');
      
      if (isPlaying && sound) {
        console.log('Stopping current sound...');
        await sound.stopAsync();
        await sound.unloadAsync();
        setIsPlaying(false);
        setSound(null);
        return;
      }

      console.log('Loading new sound...');
      const { sound: newSound } = await Audio.Sound.createAsync(
        require('./assets/n! (mixé).mp3'),
        { 
          shouldPlay: true,
          isLooping: true,
          volume: 1.0
        }
      );
      
      console.log('Sound loaded successfully');
      await newSound.playAsync();
      console.log('Sound playing');
      
      setSound(newSound);
      setIsPlaying(true);

    } catch (error) {
      console.error('Erreur lors de la lecture du son:', error);
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    return () => {
      if (sound) {
        console.log('Cleaning up sound...');
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const CustomButton = ({ title, onPress }) => (
    <TouchableOpacity 
      onPress={onPress}
      style={styles.buttonContainer}
    >
      <LinearGradient
        colors={['#e6e6e6', '#ffffff', '#e6e6e6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.customButton,
          isPlaying && title === "𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃" && styles.playingButton
        ]}
      >
        <View style={styles.buttonNoiseOverlay} />
        <Text style={[
          styles.buttonText,
          isPlaying && title === "𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃" && styles.playingText
        ]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const toggleMenu = () => {
    const toValue = menuVisible ? -300 : 0;
    const fadeValue = menuVisible ? 1 : 0;
    
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration: 300,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
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

  const renderContent = () => {
    if (currentPage === 'biographie' || currentPage === 'sons' || currentPage === 'sorties') {
      return (
        <View style={styles.emptyPage}>
        </View>
      );
    }

    return (
      <>
        <Text style={styles.title}>S4D 3ND C0M3</Text>

        <Image
          source={require('./assets/cbb.png')}
          style={styles.image}
        />

        <CustomButton 
          title="𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃" 
          onPress={playSound} 
        />

        <CustomButton
          title="👁️‍🗨️ SPOTIFY"
          onPress={() => Linking.openURL('https://open.spotify.com/intl-fr/artist/6Y1CPUyXzjahC5Q0Pj68Un')}
        />

        <CustomButton
          title="☠ SOUNDCLOUD"
          onPress={() => Linking.openURL('https://soundcloud.com/s4d3ndc0m3-420308036?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing')}
        />

        <CustomButton
          title="☣ INSTAGRAM"
          onPress={() => setModalVisible(true)}
        />
      </>
    );
  };

  if (!fontsLoaded) {
    return <View style={styles.container}><Text style={{color: '#fff'}}>Chargement...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/MEAT SHITTTTTTTTTTT.png')}
        style={styles.backgroundImage}
      />

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
            onPress={() => navigateTo('biographie')}
          >
            <Text style={styles.menuSectionTitle}>BIOGRAPHIE</Text>
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

      {renderContent()}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
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
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    opacity: 0.7,
  },
  title: {
    fontFamily: 'Orbitron_700Bold',
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: '#ff0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  customButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    width: 280,
    alignItems: 'center',
    shadowColor: '#ff0000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ff0000',
    overflow: 'hidden',
  },
  buttonNoiseOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'rgba(255,0,0,0.1)',
  },
  buttonText: {
    color: '#1e1e1e',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderRadius: 15,
    padding: 20,
    width: Dimensions.get('window').width * 0.9,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#ff0000',
    shadowColor: '#ff0000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: 'Orbitron_700Bold',
    letterSpacing: 2,
    textShadowColor: '#ff0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  instagramCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ff0000',
    shadowColor: '#ff0000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  instagramImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  instagramTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'Orbitron_400Regular',
    letterSpacing: 2,
    textShadowColor: '#ff0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    marginVertical: 8,
  },
  playingButton: {
    borderColor: '#ff0000',
    borderWidth: 2,
    shadowColor: '#ff0000',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    transform: [{ scale: 1.05 }],
  },
  playingText: {
    color: '#ff0000',
    textShadowColor: '#ff0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 999,
    padding: 10,
  },
  menuButtonText: {
    color: '#ff0000',
    fontSize: 30,
    textShadowColor: '#ff0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    fontFamily: 'Orbitron_700Bold',
  },
  menu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    zIndex: 998,
    borderRightWidth: 1,
    borderRightColor: '#ff0000',
    shadowColor: '#ff0000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ff0000',
  },
  menuTitle: {
    color: '#ff0000',
    fontSize: 20,
    fontFamily: 'Orbitron_700Bold',
    textShadowColor: '#ff0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  closeButton: {
    color: '#ff0000',
    fontSize: 24,
    textShadowColor: '#ff0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  menuContent: {
    flex: 1,
  },
  menuSection: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 0, 0, 0.3)',
    paddingBottom: 20,
  },
  menuSectionTitle: {
    color: '#ff0000',
    fontSize: 18,
    fontFamily: 'Orbitron_700Bold',
    paddingHorizontal: 20,
    marginBottom: 10,
    textShadowColor: '#ff0000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  emptyPage: {
    flex: 1,
    width: '100%',
  },
});
