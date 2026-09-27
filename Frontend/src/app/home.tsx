import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}></Text>

          <View>
            <Text style={styles.title}>AdotePet</Text>
            <Text style={styles.subtitle}>
              Encontre um novo amigo para sua família
            </Text>
          </View>
        </View>

        <TextInput
          style={styles.search}
          placeholder="Buscar animal..."
          placeholderTextColor="#999"
        />

        <Text style={styles.sectionTitle}>
          Categorias
        </Text>

        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryEmoji}></Text>
            <Text style={styles.categoryText}>Cachorros</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryEmoji}></Text>
            <Text style={styles.categoryText}>Gatos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Animais disponíveis
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/animais')}
          >
            <Text style={styles.seeAll}>
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.animalCard}>
          <Text style={styles.animalEmoji}>🐶</Text>

          <View style={styles.animalInfo}>
            <Text style={styles.animalName}>
              Thor
            </Text>

            <Text style={styles.animalDescription}>
              Cachorro • 2 anos
            </Text>

            <Text style={styles.location}>
              📍 Erechim - RS
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => router.push('/detalhes')}
            >
              <Text style={styles.detailsButtonText}>
                Ver detalhes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.animalCard}>
          <Text style={styles.animalEmoji}>🐱</Text>

          <View style={styles.animalInfo}>
            <Text style={styles.animalName}>
              Luna
            </Text>

            <Text style={styles.animalDescription}>
              Gato • 1 ano
            </Text>

            <Text style={styles.location}>
              📍 Erechim - RS
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => router.push('/detalhes')}
            >
              <Text style={styles.detailsButtonText}>
                Ver detalhes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomMenu}>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>🏠</Text>
          <Text style={styles.menuActive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/cadastrar-animal')}
        >
          <Text style={styles.menuIcon}>➕</Text>
          <Text style={styles.menuText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/perfil')}
        >
          <Text style={styles.menuIcon}>👤</Text>
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 50,
    paddingBottom: 110,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    fontSize: 45,
    marginRight: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 3,
  },

  search: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 15,
  },

  categories: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },

  categoryCard: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
  },

  categoryEmoji: {
    fontSize: 35,
    marginBottom: 8,
  },

  categoryText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 15,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  seeAll: {
    color: '#2E7D32',
    fontWeight: 'bold',
    marginBottom: 15,
  },

  animalCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },

  animalEmoji: {
    fontSize: 65,
    marginRight: 15,
  },

  animalInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  animalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
  },

  animalDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 3,
  },

  location: {
    fontSize: 13,
    color: '#666666',
    marginTop: 5,
  },

  detailsButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'flex-start',
  },

  detailsButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  menuItem: {
    alignItems: 'center',
  },

  menuIcon: {
    fontSize: 25,
    marginBottom: 4,
  },

  menuActive: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 12,
  },

  menuText: {
    color: '#666666',
    fontSize: 12,
  },

});