
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert(
        'Atenção',
        'Preencha seu e-mail e sua senha para continuar.'
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

    // Login demonstrativo.
    // A autenticação real será implementada com o backend.
    router.replace('/home');
  }

  function recuperarSenha() {
    Alert.alert(
      'Recuperar senha',
      'Essa funcionalidade será implementada quando conectarmos o sistema de autenticação.'
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
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* IDENTIDADE DO APLICATIVO */}
          <View style={styles.brandSection}>
            <View style={styles.logoContainer}>
              <Ionicons
                name="paw"
                size={48}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.brandName}>
              AdotePet
            </Text>

            <Text style={styles.brandSubtitle}>
              Amor que transforma vidas
            </Text>
          </View>

          {/* BOAS-VINDAS */}
          <View style={styles.welcomeSection}>
            <Text style={styles.title}>
              Bem-vindo de volta!
            </Text>

            <Text style={styles.subtitle}>
              Entre na sua conta e encontre um novo
              amigo para fazer parte da sua família.
            </Text>
          </View>

          {/* FORMULÁRIO */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>
              Acesse sua conta
            </Text>

            {/* E-MAIL */}
            <Text style={styles.label}>
              E-mail
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={21}
                color={COLORS.textSecondary}
              />

              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor={COLORS.placeholder}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* SENHA */}
            <Text style={styles.label}>
              Senha
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={21}
                color={COLORS.textSecondary}
              />

              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!mostrarSenha}
                autoCapitalize="none"
                value={senha}
                onChangeText={setSenha}
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
                  size={22}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* ESQUECEU A SENHA */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={recuperarSenha}
            >
              <Text style={styles.forgotPasswordText}>
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>

            {/* BOTÃO ENTRAR */}
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.85}
              onPress={entrar}
            >
              <Text style={styles.loginButtonText}>
                Entrar
              </Text>

              <Ionicons
                name="arrow-forward"
                size={21}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>

          {/* CADASTRO */}
          <View style={styles.registerSection}>
            <Text style={styles.registerText}>
              Ainda não possui uma conta?
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/cadastro')}
            >
              <Text style={styles.registerLink}>
                Criar conta
              </Text>
            </TouchableOpacity>
          </View>

          {/* RODAPÉ */}
          <View style={styles.footer}>
            <Ionicons
              name="heart-outline"
              size={17}
              color={COLORS.primary}
            />

            <Text style={styles.footerText}>
              Um lar para cada patinha
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
    paddingTop: 65,
    paddingBottom: 35,
    justifyContent: 'center',
  },

  brandSection: {
    alignItems: 'center',
    marginBottom: 38,
  },

  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: COLORS.white,
  },

  brandName: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 7,
  },

  brandSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },

  welcomeSection: {
    marginBottom: 25,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.extraLarge,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 22,
  },

  formTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    height: 55,
    paddingHorizontal: 14,
    marginBottom: 21,
  },

  input: {
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 11,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 26,
    marginTop: -4,
  },

  forgotPasswordText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  loginButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 28,
  },

  registerText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },

  registerLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 42,
  },

  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
