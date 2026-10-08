
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
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

export default function PerfilScreen() {

  // Dados demonstrativos do usuário
  const usuario = {
    nome: 'Renan',
    email: 'renan@email.com',
    telefone: '(54) 99999-9999',
    cidade: 'Erechim - RS',
  };

  function editarPerfil() {
    Alert.alert(
      'Editar perfil',
      'Em breve você poderá alterar seus dados pessoais.'
    );
  }

  function meusAnimais() {
    Alert.alert(
      'Meus animais cadastrados',
      'Essa função estará disponível quando conectarmos os cadastros ao banco de dados.'
    );
  }

  function minhasAdocoes() {
    Alert.alert(
      'Minhas solicitações',
      'Em breve você poderá acompanhar suas solicitações de adoção.'
    );
  }

  function configuracoes() {
    Alert.alert(
      'Configurações',
      'Essa funcionalidade será implementada futuramente.'
    );
  }

  function sair() {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair do AdotePet?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
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

      {/* CABEÇALHO */}
      <View style={styles.header}>
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

        <Text style={styles.headerTitle}>
          Meu perfil
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* PERFIL DO USUÁRIO */}
        <View style={styles.profileSection}>

          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={51}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.name}>
            {usuario.nome}
          </Text>

          <View style={styles.memberBadge}>
            <Ionicons
              name="paw"
              size={14}
              color={COLORS.primary}
            />

            <Text style={styles.memberText}>
              Membro AdotePet
            </Text>
          </View>

          <Text style={styles.profileDescription}>
            Juntos podemos transformar a vida
            de muitos animais.
          </Text>

        </View>

        {/* DADOS PESSOAIS */}
        <Text style={styles.sectionTitle}>
          Informações pessoais
        </Text>

        <View style={styles.infoBox}>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nome</Text>
              <Text style={styles.infoValue}>
                {usuario.nome}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>
                {usuario.email}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="call-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>
                {usuario.telefone}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="location-outline"
                size={20}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Cidade</Text>
              <Text style={styles.infoValue}>
                {usuario.cidade}
              </Text>
            </View>
          </View>

        </View>

        {/* GERENCIAMENTO */}
        <Text style={styles.sectionTitle}>
          Minha conta
        </Text>

        <View style={styles.menuBox}>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={editarPerfil}
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="create-outline"
                size={21}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.menuText}>
              Editar perfil
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={meusAnimais}
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="paw-outline"
                size={21}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.menuText}>
              Meus animais cadastrados
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={minhasAdocoes}
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="heart-outline"
                size={21}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.menuText}>
              Minhas solicitações
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={configuracoes}
          >
            <View style={styles.menuIcon}>
              <Ionicons
                name="settings-outline"
                size={21}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.menuText}>
              Configurações
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

        </View>

        {/* SAIR DA CONTA */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={sair}
        >
          <Ionicons
            name="log-out-outline"
            size={21}
            color={COLORS.danger}
          />

          <Text style={styles.logoutText}>
            Sair da conta
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Ionicons
            name="paw"
            size={17}
            color={COLORS.primary}
          />

          <Text style={styles.footerText}>
            AdotePet • Amor que transforma vidas
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  header: {
    paddingTop: 55,
    paddingHorizontal: SPACING.lg,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  headerSpacer: {
    width: 43,
  },

  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 10,
    paddingBottom: 45,
  },

  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderWidth: 4,
    borderColor: COLORS.white,
  },

  name: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },

  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 7,
    gap: 6,
  },

  memberText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  profileDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 15,
  },

  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },

  infoBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    marginBottom: 28,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 15,
  },

  menuBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    marginBottom: 25,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },

  menuDivider: {
    height: 1,
    backgroundColor: COLORS.border,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: RADIUS.medium,
    paddingVertical: 16,
    gap: 10,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.danger,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 7,
  },

  footerText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },

});
