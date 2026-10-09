
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert, ActivityIndicator,
  KeyboardAvoidingView, Platform
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, globalStyles } from '../styles/theme';
import { cadastrarUsuario, Role } from '../services/api';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [perfil, setPerfil] = useState<Role>('ADOPTER');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function criarConta() {
    if (!nome.trim() || !email.trim() || !senha || !confirmar) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Atenção', 'Digite um e-mail válido.');
      return;
    }

    if (senha.length < 6 || senha !== confirmar) {
      Alert.alert(
        'Atenção',
        senha.length < 6
          ? 'A senha deve ter pelo menos 6 caracteres.'
          : 'As senhas não são iguais.'
      );
      return;
    }

    setCarregando(true);

    try {
      await cadastrarUsuario({
        name: nome.trim(),
        email: email.trim().toLowerCase(),
        password: senha,
        role: perfil
      });

      Alert.alert(
        'Cadastro realizado!',
        'Sua conta foi criada. Faça login para continuar.',
        [{ text: 'Entrar', onPress: () => router.replace('/') }]
      );
    } catch (erro) {
      Alert.alert(
        'Erro no cadastro',
        erro instanceof Error ? erro.message : 'Tente novamente.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.logo}>
          <Ionicons name="paw" size={45} color={COLORS.primary} />
          <Text style={styles.marca}>AdotePet</Text>
        </View>

        <Text style={styles.titulo}>Crie sua conta</Text>
        <Text style={styles.subtitulo}>
          Faça parte da nossa comunidade e ajude
          animais a encontrarem um novo lar.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Seus dados</Text>

          <Text style={styles.label}>Nome completo</Text>
          <View style={styles.campo}>
            <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor={COLORS.placeholder}
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>E-mail</Text>
          <View style={styles.campo}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
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
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Mínimo de 6 caracteres"
              placeholderTextColor={COLORS.placeholder}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
              <Ionicons
                name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                size={21}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Confirmar senha</Text>
          <View style={styles.campo}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Digite a senha novamente"
              placeholderTextColor={COLORS.placeholder}
              value={confirmar}
              onChangeText={setConfirmar}
              secureTextEntry={!mostrarSenha}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.label}>Tipo de conta</Text>
          <View style={styles.opcoes}>
            {([
              { valor: 'ADOPTER', texto: 'Adotante', icone: 'heart-outline' },
              { valor: 'SHELTER', texto: 'Abrigo', icone: 'home-outline' }
            ] as const).map(opcao => (
              <TouchableOpacity
                key={opcao.valor}
                style={[
                  styles.opcao,
                  perfil === opcao.valor && styles.selecionado
                ]}
                onPress={() => setPerfil(opcao.valor)}
              >
                <Ionicons
                  name={opcao.icone}
                  size={20}
                  color={COLORS.primary}
                />
                <Text style={styles.opcaoTexto}>{opcao.texto}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.botao, carregando && { opacity: 0.6 }]}
            onPress={criarConta}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <>
                <Text style={styles.botaoTexto}>Criar conta</Text>
                <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.login}>
          <Text style={{ color: COLORS.textSecondary }}>
            Já possui uma conta?
          </Text>
          <TouchableOpacity onPress={() => router.replace('/')}>
            <Text style={styles.link}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rodape}>
          <Ionicons name="heart-outline" size={16} color={COLORS.primary} />
          <Text style={{ color: COLORS.textSecondary, fontSize: 11 }}>
            AdotePet • Amor que transforma vidas
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 55,
    paddingBottom: 35
  },
  logo: {
    alignItems: 'center',
    marginVertical: 20
  },
  marca: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 8
  },
  titulo: {
    fontSize: 29,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center'
  },
  subtitulo: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginVertical: 15
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.extraLarge,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20
  },
  cardTitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 22
  },
  label: {
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 9
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    height: 54,
    paddingHorizontal: 13,
    marginBottom: 20
  },
  input: {
    flex: 1,
    minWidth: 0,
    color: COLORS.text,
    marginLeft: 10
  },
  opcoes: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22
  },
  opcao: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 15,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  selecionado: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight
  },
  opcaoTexto: {
    color: COLORS.text,
    fontWeight: 'bold'
  },
  botao: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: 17,
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
  login: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 28
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
    marginTop: 32
  }
});
