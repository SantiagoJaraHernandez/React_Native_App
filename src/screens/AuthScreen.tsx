import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, StatusBar, useColorScheme, TouchableOpacity, Alert } from 'react-native';
import Button from '../components/Button';

const Authscreen = ({ navigation }: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1c1c1e' : '#f5f5f5',
  };

  const textColor = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.20.21:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contrasena: password,
        }),
      });
      const data = await response.json();

      if (response.status === 200) {
        // Guardar el token de acceso y redirigir
        Alert.alert('Inicio de sesión exitoso', 'Bienvenido', [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]);
      } else {
        Alert.alert('Error', data.message || 'Algo salió mal');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#1c1c1e' : '#f5f5f5'} />
      <View style={styles.content}>
        <Text style={[styles.title, textColor]}>Iniciar sesión</Text>
        <TextInput
          style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }]}
          placeholder="Correo electrónico"
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }]}
            placeholder="Contraseña"
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <Text style={{ fontSize: 18 }}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <Button title="Iniciar sesión" onPress={handleLogin} style={styles.lightButton} />
        <Text style={[styles.link, textColor]} onPress={() => navigation.navigate('Register')}>¿No tienes cuenta? Regístrate</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Mismos estilos que ya has definido
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#444444',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    fontFamily: 'Roboto',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeButton: {
    position: 'absolute',
    top: 12,
    right: 20,
  },
  lightButton: {
    backgroundColor: '#007BFF',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%',
    marginBottom: 20,
    elevation: 5,
    fontFamily: 'Roboto',
  },
  link: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginTop: 20,
    fontFamily: 'Roboto',
  },
});

export default Authscreen;
