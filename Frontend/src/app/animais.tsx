import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

export default function AnimaisScreen() {

  const animais = [
    {
      id: 1,
      nome: 'Thor',
      tipo: 'Cachorro',
      idade: '2 anos',
      sexo: 'Macho',
      cidade: 'Erechim - RS',
      emoji: '🐶',
    },
    {
      id: 2,
      nome: 'Luna',
      tipo: 'Gato',
      idade: '1 ano',
      sexo: 'Fêmea',
      cidade: 'Erechim - RS',
      emoji: '🐱',
    },
    {
      id: 3,
      nome: 'Bob',
      tipo: 'Cachorro',
      idade: '3 anos',
      sexo: 'Macho',
      cidade: 'Erechim - RS',
      emoji: '🐕',
    },
    {
      id: 4,
      nome: 'Mel',
      tipo: 'Gato',
      idade: '8 meses',
      sexo: 'Fêmea',
      cidade: 'Erechim - RS',
      emoji: '🐈',
    },
  ];

  return (
    <View style={styles.container}>

      {/* CABEÇALHO */}
      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={styles.back}>
            ←
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Animais disponíveis
        </Text>

      </View>

      {/* LISTA DE ANIMAIS */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.subtitle}>
          Encontre seu novo melhor amigo 🐾
        </Text>

        {animais.map((animal) => (

          <View
            key={animal.id}
            style={styles.card}
          >

            {/* FOTO / EMOJI */}
            <View style={styles.imageArea}>
              <Text style={styles.animalEmoji}>
                {animal.emoji}
              </Text>
            </View>

            {/* INFORMAÇÕES */}
            <View style={styles.information}>

              <Text style={styles.animalName}>
                {animal.nome}
              </Text>

              <Text style={styles.description}>
                {animal.tipo} • {animal.idade}
              </Text>

              <Text style={styles.description}>
                {animal.sexo}
              </Text>

              <Text style={styles.location}>
                📍 {animal.cidade}
              </Text>

              {/* BOTÃO DETALHES */}
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  router.push({
                    pathname: '/detalhes',
                    params: {
                      nome: animal.nome,
                      tipo: animal.tipo,
                      idade: animal.idade,
                      sexo: animal.sexo,
                      cidade: animal.cidade,
                      emoji: animal.emoji,
                    },
                  })
                }
              >

                <Text style={styles.buttonText}>
                  Ver detalhes
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        ))}

      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  back: {
    fontSize: 32,
    color: '#2E7D32',
    marginRight: 15,
  },

  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },

  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },

  imageArea: {
    width: 100,
    height: 120,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  animalEmoji: {
    fontSize: 55,
  },

  information: {
    flex: 1,
  },

  animalName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 4,
  },

  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 3,
  },

  location: {
    fontSize: 13,
    color: '#666666',
    marginTop: 3,
  },

  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

});