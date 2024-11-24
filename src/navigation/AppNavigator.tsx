// src/navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AuthScreen from '../screens/AuthScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { LoaderProvider } from '../context/LoaderContex'; // Importamos el proveedor del loader
import TareasScreen from '../screens/TareasScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    // Aquí envolvemos toda la navegación con LoaderProvider
    <LoaderProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: isDarkMode ? '#1c1c1e' : '#f5f5f5', // Fondo oscuro para el modo oscuro
            },
            headerTintColor: isDarkMode ? '#ffffff' : '#000000', // Color del texto en la barra
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={TareasScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoaderProvider>
  );
};

export default AppNavigator;
