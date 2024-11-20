import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Video } from 'expo-av';

export default function App() {
  const [showVideo, setShowVideo] = useState(false); // Controla se o vídeo será exibido
  const videoRef = useRef(null); // Referência ao componente de vídeo
  const [refreshing, setRefreshing] = useState(false); // Controla o estado de atualização

  // Função para voltar à imagem ao atualizar
  const onRefresh = () => {
    setRefreshing(true);
    setShowVideo(false); // Volta para a imagem
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {showVideo ? (
        <Video
          ref={videoRef}
          source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="contain"
          shouldPlay
          style={styles.video}
        />
      ) : (
        <TouchableOpacity style={styles.fullScreenImage} onPress={() => setShowVideo(true)}>
          <Image
            source={{ uri: 'https://via.placeholder.com/600x400.png' }} // Substitua pelo link da sua imagem
            style={styles.fullScreenImage}
          />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  video: {
    width: '100%',
    height: 300,
    backgroundColor: '#000',
  },
});
