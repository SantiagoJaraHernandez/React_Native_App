// src/components/Loader.tsx
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { useLoader } from '../context/LoaderContex'; // Usamos el contexto

const Loader = () => {
  const { isLoading } = useLoader(); // Accedemos al estado de carga

  if (!isLoading) {
    return null; // No mostrar el loader si no está activado
  }

  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#FF7E5F" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
});

export default Loader;
