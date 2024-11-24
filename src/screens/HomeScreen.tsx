// src/screens/HomeScreen.tsx
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, useColorScheme, Image } from 'react-native';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { useLoader } from '../context/LoaderContex'; // Importamos el hook del loader

const HomeScreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { setIsLoading } = useLoader(); // Accedemos a la función para cambiar el estado de carga

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1c1c1e' : '#f5f5f5',
  };

  const textColor = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  useEffect(() => {
    setIsLoading(true); // Activamos el loader
    const timeout = setTimeout(() => {
      setIsLoading(false); // Desactivamos el loader después de 2 segundos
    }, 2000);

    return () => clearTimeout(timeout);
  }, [setIsLoading]);

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#1c1c1e' : '#f5f5f5'}
      />
      <View style={styles.content}>
        {/* Imagen con efecto de sombra */}
        <Image
          source={require('../assets/welcome-image.png')}
          style={[styles.image, isDarkMode && styles.darkImage]} // Aplica estilo específico para modo oscuro
          resizeMode="contain"
        />
        
        <Text style={[styles.welcomeText, textColor]}>¡Bienvenido a nuestra aplicación!</Text>
        
        {/* Reemplazamos el TouchableOpacity con el componente Button */}
        <Button
          title="Comenzar"
          onPress={() => navigation.navigate('Auth')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 30,
  },
  darkImage: {
    // Se puede añadir un estilo específico si se requiere, pero por ahora lo dejamos vacío
  },
});



export default HomeScreen;
