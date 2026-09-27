import React from 'react';
import { router } from 'expo-router';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function CadastroScreen() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >

      <Text style={styles.logo}></Text>

      <Text style={styles.title}>Criar conta</Text>

      <Text style={styles.subtitle}>
        Cadastre-se para fazer parte do AdotePet
      </Text>

      {/* NOME */}
      <Text style={styles.label}>Nome completo</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#999"
      />

      {/* EMAIL */}
      <Text style={styles.label}>E-mail</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* TELEFONE */}
      <Text style={styles.label}>Telefone</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu telefone"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      {/* SENHA */}
      <Text style={styles.label}>Senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#999"
        secureTextEntry
      />

      {/* CONFIRMAR SENHA */}
      <Text style={styles.label}>Confirmar senha</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua senha novamente"
        placeholderTextColor="#999"
        secureTextEntry
      />

      {/* BOTÃO CRIAR CONTA */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          CRIAR CONTA
        </Text>
      </TouchableOpacity>

      {/* VOLTAR PARA LOGIN */}
      <Text style={styles.loginText}>
        Já possui uma conta?
      </Text>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.loginButton}>
          Entrar
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 40,
    justifyContent: 'center',
  },

  logo: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 5,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    color: '#222222',
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 14,
    marginBottom: 17,
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

  loginText: {
    marginTop: 25,
    textAlign: 'center',
    color: '#666666',
  },

  loginButton: {
    textAlign: 'center',
    marginTop: 7,
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 16,
  },

});