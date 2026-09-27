import React from 'react';
import { router } from 'expo-router';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>

      <Text style={styles.logo}>🐾</Text>

      <Text style={styles.title}>AdotePet</Text>

      <Text style={styles.subtitle}>
        Encontre um novo amigo para sua família
      </Text>

      <Text style={styles.label}>E-mail</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#999"
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/home')}
      >
        <Text style={styles.buttonText}>
          ENTRAR
        </Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Ainda não possui uma conta?
      </Text>

      <TouchableOpacity
        onPress={() => router.push('/cadastro')}
      >
        <Text style={styles.registerButton}>
          Criar conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  logo: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },

  label: {
    fontSize: 16,
    color: '#222222',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },

  button: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#666666',
  },

  registerButton: {
    textAlign: 'center',
    marginTop: 8,
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 16,
  },

});