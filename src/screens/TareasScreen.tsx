import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, StatusBar, useColorScheme, FlatList, TouchableOpacity, Alert } from 'react-native';

const TareasScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [usuarioId, setUsuarioId] = useState(1); // Asumiendo que el usuario está logueado y tiene ID 1, cambia según tu lógica

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1c1c1e' : '#f5f5f5',
  };

  const textColor = {
    color: isDarkMode ? '#ffffff' : '#000000',
  };

  const obtenerTareas = async () => {
    try {
      const response = await fetch('http://http://192.168.20.21:3000/api/tareas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer <tu_token_aqui>', // Cambia el token según sea necesario
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTareas(data);
      } else {
        Alert.alert('Error', data.message || 'Algo salió mal');
      }
    } catch (error) {
      console.error('Error al obtener tareas', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  const crearTarea = async () => {
    if (!titulo || !descripcion || !fechaVencimiento) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    try {
      const nuevaTarea = {
        usuario_id: usuarioId,
        titulo,
        descripcion,
        fecha_vencimiento: fechaVencimiento,
        estado,
      };

      const response = await fetch('http://http://192.168.20.21:3000/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer <tu_token_aqui>', // Cambia el token según sea necesario
        },
        body: JSON.stringify(nuevaTarea),
      });

      const data = await response.json();
      if (response.ok) {
        setTitulo('');
        setDescripcion('');
        setFechaVencimiento('');
        setEstado('pendiente');
        obtenerTareas(); // Refrescar la lista de tareas
      } else {
        Alert.alert('Error', data.message || 'Algo salió mal');
      }
    } catch (error) {
      console.error('Error al crear tarea', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? '#1c1c1e' : '#f5f5f5'} />
      <View style={styles.content}>
        <Text style={[styles.title, textColor]}>Mis Tareas</Text>

        <FlatList
          data={tareas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tareaCard}>
              <Text style={styles.tareaTitle}>{item.titulo}</Text>
              <Text>{item.descripcion}</Text>
              <Text>Estado: {item.estado}</Text>
              <Text>Fecha de vencimiento: {item.fecha_vencimiento}</Text>
            </View>
          )}
        />

        <TextInput
          style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }]}
          placeholder="Título de la tarea"
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }]}
          placeholder="Descripción de la tarea"
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          value={descripcion}
          onChangeText={setDescripcion}
        />
        <TextInput
          style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }]}
          placeholder="Fecha de vencimiento (YYYY-MM-DD)"
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          value={fechaVencimiento}
          onChangeText={setFechaVencimiento}
        />
        <TouchableOpacity style={styles.button} onPress={crearTarea}>
          <Text style={[styles.buttonText, textColor]}>Crear Tarea</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  tareaCard: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  tareaTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TareasScreen;
