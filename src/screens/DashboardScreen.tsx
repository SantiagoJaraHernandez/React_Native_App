import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, StyleSheet, Alert, useColorScheme } from 'react-native';
import Button from '../components/Button';  // Importamos tu componente Button

const DashboardScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const isDarkMode = useColorScheme() === 'dark';

  const handleSubmit = () => {
    // Aquí puedes realizar las operaciones CRUD
    console.log('Datos enviados:', { name, email });
    Alert.alert('Formulario enviado', `Nombre: ${name}, Email: ${email}`);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1c1c1e' : '#f5f5f5',
  };

  const textColor = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const inputStyle = {
    backgroundColor: isDarkMode ? '#333333' : '#ffffff',
    borderColor: isDarkMode ? '#555555' : '#ccc',
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <Text style={[styles.welcomeText, textColor]}>Formulario Dashboard</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder="Nombre"
        placeholderTextColor={isDarkMode ? '#aaaaaa' : '#888888'}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder="Email"
        placeholderTextColor={isDarkMode ? '#aaaaaa' : '#888888'}
        value={email}
        onChangeText={setEmail}
      />
      {/* Aquí usamos el botón personalizado */}
      <Button title="Enviar" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default DashboardScreen;
