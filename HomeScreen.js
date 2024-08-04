import React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Bem-vindo ao Aprenda Digital!</Text>
      <Button title="Iniciar Aula" onPress={() => navigation.navigate('Lesson')} />
    </View>
  );
}

export default HomeScreen;
