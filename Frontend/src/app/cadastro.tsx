
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  globalStyles,
} from '../styles/theme';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  function criarConta() {
    if (
      !nome.trim() ||
      !email.trim() ||
      !telefone.trim() ||
      !senha ||
      !confirmarSenha
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos para continuar.'
      );
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email.trim()
    );

    if (!emailValido) {
      Alert.alert(
        'E-mail inválido',
        'Digite um endereço de e-mail válido.'
      );
      return;
    }

    if (telefone.replace(/\D/g, '').length < 10) {
      Alert.alert(
        'Telefone inválido',
        'Digite um telefone com DDD.'
      );
      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        'Senha muito curta',
        'A senha deve conter pelo menos 6 caracteres.'
      );
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        'Senhas diferentes',
        'A senha e a confirmação precisam ser iguais.'
      );
      return;
    }

    Alert.alert(
      'Cadastro demonstrativo',
      'Seus dados foram validados! O cadastro real será ativado quando conectarmos o aplicativo ao backend.',
      [
        {
          text: 'Voltar ao login',
          onPress: () => router.replace('/'),
        },
      ]
    );
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* VOLTAR */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color={COLORS.primary}
            />
          </TouchableOpacity>

          {/* LOGO */}
          <View style={styles.logoArea}>
            <View style={styles.logoIcon}>
              <Ionicons
                name="paw"
                size={35}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.brandName}>
              AdotePet
            </Text>
          </View>

          {/* TÍTULO */}
          <Text style={styles.title}>
            Crie sua conta
          </Text>

          <Text style={styles.subtitle}>
            Faça parte da nossa comunidade e ajude
            animais a encontrarem um novo lar.
          </Text>

          {/* FORMULÁRIO */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              Seus dados
            </Text>

            {/* NOME */}
            <Text style={styles.label}>
              Nome completo
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.textSecondary}
              />

              <TextInput
                style={styles.input}
                placeholder="Digite seu nome"
                placeholderTextColor={COLORS.placeholder}
                value={nome}
                onChangeText={setNome}
                autoCapitalize="words"
              />
            </View>

            {/* EMAIL */}
            <Text style={styles.label}>
              E-mail
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.textSecondary}
              />

              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* TELEFONE */}
            <Text style={styles.label}>
              Telefone
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="call-outline"
                size={20}
                color={COLORS.textSecondary}
              />

              <TextInput
                style={styles.input}
                placeholder="(54) 99999-9999"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={setTelefone}
              />
            </View>

            {/* SENHA */}
            <Text style={styles.label}>
              Senha
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.textSecondary}
              />

              <TextInput
                style={styles.input}
                placeholder="Mínimo de 6 caracteres"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={setSenha}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
              >
                <Ionicons
                  name={
                    mostrarSenha
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={21}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* CONFIRMAR SENHA */}
            <Text style={styles.label}>
              Confirmar senha
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={COLORS.textSecondary}
              />

              <TextInput
                style={styles.input}
                placeholder="Digite a senha novamente"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!mostrarConfirmacao}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() =>
                  setMostrarConfirmacao(!mostrarConfirmacao)
                }
              >
                <Ionicons
                  name={
                    mostrarConfirmacao
                      ? 'eye-off-outline'
                      : 'eye-outline'
                  }
                  size={21}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* BOTÃO */}
            <TouchableOpacity
              style={styles.button}
              onPress={criarConta}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>
                Criar conta
              </Text>

              <Ionicons
                name="arrow-forward"
                size={20}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>

          {/* LOGIN */}
          <View style={styles.loginArea}>
            <Text style={styles.loginText}>
              Já possui uma conta?
            </Text>

            <TouchableOpacity
              onPress={() => router.replace('/')}
            >
              <Text style={styles.loginButton}>
                Entrar
              </Text>
            </TouchableOpacity>
          </View>

          {/* RODAPÉ */}
          <View style={styles.footer}>
            <Ionicons
              name="heart-outline"
              size={16}
              color={COLORS.primary}
            />

            <Text style={styles.footerText}>
              AdotePet • Amor que transforma vidas
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 55,
    paddingBottom: 35,
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },

  logoArea: {
    alignItems: 'center',
    marginBottom: 25,
  },

  logoIcon: {
    width: 75,
    height: 75,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  brandName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 27,
    paddingHorizontal: 8,
  },

  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.extraLarge,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 20,
  },

  formTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 22,
  },

  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 9,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    paddingHorizontal: 13,
    marginBottom: 20,
    height: 54,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 10,
    minWidth: 0,
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: 17,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  loginArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 28,
  },

  loginText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  loginButton: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 32,
  },

  footerText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});
