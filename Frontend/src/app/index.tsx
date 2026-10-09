
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, globalStyles } from '../styles/theme';
import { fazerLogin } from '../services/api';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert('Atenção', 'Preencha o e-mail e a senha.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Atenção', 'Digite um e-mail válido.');
      return;
    }

    setCarregando(true);

    try {
      await fazerLogin(email.trim(), senha);
      router.replace('/home');
    } catch (erro) {
      Alert.alert(
        'Erro no login',
        erro instanceof Error ? erro.message : 'Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      style={globalStyles.container}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.logo}>
        <Ionicons name="paw" size={48} color={COLORS.primary} />
        <Text style={styles.nome}>AdotePet</Text>
        <Text style={styles.subtitulo}>Amor que transforma vidas</Text>
      </View>

      <Text style={styles.titulo}>Bem-vindo de volta!</Text>
      <Text style={styles.descricao}>
        Entre na sua conta e encontre um novo amigo
        para fazer parte da sua família.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Acesse sua conta</Text>

        <Text style={styles.label}>E-mail</Text>
        <View style={styles.campo}>
          <Ionicons name="mail-outline" size={21} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor={COLORS.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.campo}>
          <Ionicons name="lock-closed-outline" size={21} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor={COLORS.placeholder}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <Ionicons
              name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.esqueci}
          onPress={() => Alert.alert(
            'Recuperar senha',
            'Funcionalidade ainda não disponível.'
          )}
        >
          <Text style={styles.link}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, carregando && { opacity: 0.6 }]}
          onPress={entrar}
          disabled={carregando}
        >
          {carregando ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Text style={styles.botaoTexto}>Entrar</Text>
              <Ionicons name="arrow-forward" size={21} color={COLORS.white} />
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.cadastro}>
        <Text style={{ color: COLORS.textSecondary }}>
          Ainda não possui uma conta?
        </Text>
        <TouchableOpacity onPress={() => router.push('/cadastro')}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rodape}>
        <Ionicons name="heart-outline" size={17} color={COLORS.primary} />
        <Text style={{ color: COLORS.textSecondary }}>
          Um lar para cada patinha
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 65,
    paddingBottom: 35,
    justifyContent: 'center'
  },
  logo: {
    alignItems: 'center',
    marginBottom: 38
  },
  nome: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 15
  },
  subtitulo: {
    color: COLORS.textSecondary,
    marginTop: 7
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10
  },
  descricao: {
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 25
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.extraLarge,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22
  },
  cardTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 24
  },
  label: {
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    height: 55,
    paddingHorizontal: 14,
    marginBottom: 21
  },
  input: {
    flex: 1,
    color: COLORS.text,
    marginLeft: 11
  },
  esqueci: {
    alignSelf: 'flex-end',
    marginBottom: 26
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  botao: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12
  },
  botaoTexto: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  cadastro: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 28
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 42
  }
});
