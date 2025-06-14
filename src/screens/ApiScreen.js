import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { styles } from '../styles/styles';

const ApiScreen = () => {
  const [zekrom, setZekrom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchZekrom = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/zekrom');
        setZekrom(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des données de Zekrom");
      } finally {
        setLoading(false);
      }
    };
    fetchZekrom();
  }, []);

  const getAnimatedSpriteUrl = () => {
    if (!zekrom) return null;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${zekrom.id}.gif`;
  };

  return (
    <View style={[styles.container, {
      backgroundColor: 'rgba(10, 20, 40, 1)',
      flex: 1,
    }]}>
      {/* Effet électrique global */}
      <View style={{
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
        backgroundColor: 'transparent',
      }}>
        <View style={{
          flex: 1,
          backgroundColor: 'transparent',
          borderRadius: 0,
          shadowColor: '#00eaff',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 80,
          elevation: 40,
        }} />
        {/* Dégradé lumineux */}
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 300,
          backgroundColor: 'rgba(0,255,255,0.10)',
          opacity: 0.7,
        }} />
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          backgroundColor: 'rgba(0,100,255,0.18)',
          opacity: 0.6,
        }} />
      </View>
      <Text style={[styles.mainTitle, { fontSize: 22, marginTop: 20, marginBottom: 8, paddingHorizontal: 0 }]}></Text>
      <View style={[styles.separator, { marginVertical: 8, width: '40%' }]} />

      {loading && <ActivityIndicator size="large" color="#ff0000" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {!loading && !error && zekrom && (
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 30, zIndex: 1 }}>
          <View style={[styles.contentContainer, {
            shadowColor: '#00eaff',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 30,
            elevation: 20,
            borderColor: '#00eaff',
            borderWidth: 2,
            backgroundColor: 'rgba(10, 20, 40, 0.95)',
            overflow: 'visible',
          }]}>
            {/* Image de profil N en haut à droite */}
            <Image
              source={require('../../assets/N.png')}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 75,
                height: 75,
                borderRadius: 37.5,
                borderWidth: 2,
                borderColor: '#7DF9FF',
                backgroundColor: '#222',
                zIndex: 10,
              }}
              resizeMode="cover"
            />
            {/* Effet électrique en fond */}
            <View style={{
              position: 'absolute',
              top: -30,
              left: -30,
              right: -30,
              bottom: -30,
              zIndex: 0,
              borderRadius: 30,
              backgroundColor: 'transparent',
            }}>
              <View style={{
                flex: 1,
                borderRadius: 30,
                backgroundColor: 'rgba(0,255,255,0.08)',
                borderWidth: 2,
                borderColor: 'rgba(0,255,255,0.2)',
                shadowColor: '#00eaff',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 40,
                elevation: 15,
              }} />
            </View>
            <View
              style={{
                width: 250,
                height: 250,
                marginBottom: 20,
                alignSelf: 'center',
              }}
            >
              <WebView
                originWhitelist={['*']}
                source={{
                  html: `
                    <html>
                      <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                          body, html {
                            margin: 0; padding: 0;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background: transparent;
                          }
                          img {
                            width: 150%;
                            height: 100%;
                            object-fit: contain;
                          }
                        </style>
                      </head>
                      <body>
                        <img src="${getAnimatedSpriteUrl()}" />
                      </body>
                    </html>
                  `
                }}
                style={{ flex: 1, backgroundColor: 'transparent' }}
                scrollEnabled={false}
              />
            </View>

            <Text style={styles.pageText}>
              Nom : <Text style={{ color: '#ff0000' }}>{zekrom.name.charAt(0).toUpperCase() + zekrom.name.slice(1)}</Text>
            </Text>
            <Text style={styles.pageText}>Type : {zekrom.types.map(t => t.type.name).join(', ')}</Text>
            <Text style={styles.pageText}>Taille : {zekrom.height / 10} m</Text>
            <Text style={styles.pageText}>Poids : {zekrom.weight / 10} kg</Text>
            <Text style={styles.pageText}>Expérience de base : {zekrom.base_experience}</Text>
            <Text style={styles.pageText}>Capacités : {zekrom.abilities.map(a => a.ability.name).join(', ')}</Text>

            <Text style={[styles.pageText, { marginTop: 10, marginBottom: 5 }]}>Statistiques :</Text>
            {zekrom.stats.map(stat => (
              <Text key={stat.stat.name} style={styles.pageText}>
                {stat.stat.name.replace('-', ' ')} : <Text style={{ color: '#4A90E2' }}>{stat.base_stat}</Text>
              </Text>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ApiScreen;
