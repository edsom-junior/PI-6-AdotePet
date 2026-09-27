import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';

export default function PerfilScreen() {

  function editarPerfil() {
    Alert.alert(
      'Editar perfil',
      'Essa função será implementada futuramente.'
    );
  }

  function meusAnimais() {
    router.push('/animais');
  }

  function sair() {
    Alert.alert(
      'Sair',
      'Deseja realmente sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => router.replace('/'),
        },
      ]
    );
  }

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

        <Text style={styles.headerTitle}>
          Meu perfil
        </Text>

      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        {/* FOTO DO PERFIL */}
        <View style={styles.profileImage}>
          <Text style={styles.profileEmoji}>
            👤
          </Text>
        </View>

        {/* NOME */}
        <Text style={styles.name}>
          Renan
        </Text>

        <Text style={styles.member}>
          Usuário AdotePet 🐾
        </Text>

        {/* INFORMAÇÕES */}
        <View style={styles.infoBox}>

          <Text style={styles.infoLabel}>
            Nome
          </Text>

          <Text style={styles.infoValue}>
            Renan
          </Text>

          <View style={styles.divider} />

          <Text style={styles.infoLabel}>
            E-mail
          </Text>

          <Text style={styles.infoValue}>
            renan@email.com
          </Text>

          <View style={styles.divider} />

          <Text style={styles.infoLabel}>
            Telefone
          </Text>

          <Text style={styles.infoValue}>
            (54) 99999-9999
          </Text>

          <View style={styles.divider} />

          <Text style={styles.infoLabel}>
            Cidade
          </Text>

          <Text style={styles.infoValue}>
            Erechim - RS
          </Text>

        </View>

        {/* EDITAR PERFIL */}
        <TouchableOpacity
          style={styles.mainButton}
          onPress={editarPerfil}
        >
          <Text style={styles.mainButtonText}>
            ✏️ Editar perfil
          </Text>
        </TouchableOpacity>

        {/* MEUS ANIMAIS */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={meusAnimais}
        >
          <Text style={styles.secondaryButtonText}>
            🐾 Meus animais cadastrados
          </Text>
        </TouchableOpacity>

        {/* SAIR */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={sair}
        >
          <Text style={styles.logoutText}>
            Sair da conta
          </Text>
        </TouchableOpacity>

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
    paddingBottom: 18,
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

  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  content: {
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 50,
  },

  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  profileEmoji: {
    fontSize: 60,
  },

  name: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
    marginTop: 15,
  },

  member: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 30,
  },

  infoBox: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
  },

  infoLabel: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 15,
  },

  mainButton: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },

  mainButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
  },

  secondaryButtonText: {
    color: '#2E7D32',
    fontSize: 16,
    fontWeight: 'bold',
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: '#D32F2F',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  logoutText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: 'bold',
  },

});