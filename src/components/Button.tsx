import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  GestureResponderEvent,
  Animated,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Necesitas instalar 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa FontAwesome para iconos

interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle; // Permitir estilos personalizados
  icon?: JSX.Element; // Propiedad para el icono
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style, icon }) => {
  const [scaleAnim] = useState(new Animated.Value(1)); // Inicializamos la animación de escala

  // Función para manejar la animación cuando el botón es presionado
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Efecto de escala cuando el botón es presionado
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Vuelve a la escala original cuando se suelta el botón
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.buttonWrapper,
          { transform: [{ scale: scaleAnim }] }, // Aplica la animación de escala
        ]}>
        <LinearGradient
          colors={['#FF7E5F', '#FD3A69']} // Gradiente llamativo
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, style]}>
          <View style={styles.iconTextWrapper}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={styles.text}>{title}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    borderRadius: 25, // Bordes redondeados para todo el botón
    overflow: 'hidden', // Asegura que el contenido no se desborde
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, // Bordes redondeados
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8, // Sombra para Android
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center', // Asegura que el icono y el texto estén alineados
  },
  icon: {
    marginRight: 10, // Espacio entre el icono y el texto
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase', // Texto en mayúsculas
  },
});

export default Button;
