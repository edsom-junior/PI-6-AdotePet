
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  globalStyles,
} from '../styles/theme';

export default function CadastrarAnimalScreen() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [porte, setPorte] = useState('');
  const [cidade, setCidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState<string | null>(null);

  async function selecionarFoto() {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          'Permissão necessária',
          'Permita o acesso às fotos para selecionar uma imagem do animal.'
        );
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets.length > 0) {
        setFoto(resultado.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        'Erro',
        'Não foi possível selecionar a imagem. Tente novamente.'
      );
    }
  }

  function cadastrarAnimal() {
    if (
      !nome.trim() ||
      !tipo ||
      !idade.trim() ||
      !sexo ||
      !porte ||
      !cidade.trim() ||
      !descricao.trim()
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos para cadastrar o animal.'
      );
      return;
    }

    Alert.alert(
      'Cadastro demonstrativo',
      `Os dados de ${nome.trim()} foram preenchidos com sucesso! O salvamento definitivo será implementado quando conectarmos o aplicativo ao banco de dados.`,
      [
        {
          text: 'OK',
          onPress: () => router.replace('/home'),
        },
      ]
    );
  }

  function renderizarOpcoes(
    opcoes: string[],
    selecionado: string,
    selecionar: (valor: string) => void
  ) {
    return (
      <View style={styles.options}>
        {opcoes.map((opcao) => {
          const ativo = selecionado === opcao;

          return (
            <TouchableOpacity
              key={opcao}
              style={[
                styles.optionButton,
                ativo && styles.optionSelected,
              ]}
              onPress={() => selecionar(opcao)}
            >
              <Text
                style={[
                  styles.optionText,
                  ativo && styles.optionTextSelected,
                ]}
              >
                {opcao}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
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
          Cadastrar animal
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* INTRODUÇÃO */}
          <View style={styles.introduction}>
            <View style={styles.introIcon}>
              <Ionicons
                name="paw"
                size={27}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.title}>
              Um novo amigo
            </Text>

            <Text style={styles.subtitle}>
              Compartilhe as informações do animal
              e ajude-o a encontrar um lar cheio de amor.
            </Text>
          </View>

          {/* FOTO */}
          <Text style={styles.sectionTitle}>
            Foto do animal
          </Text>

          <TouchableOpacity
            style={styles.photoArea}
            onPress={selecionarFoto}
            activeOpacity={0.8}
          >
            {foto ? (
              <Image
                source={{ uri: foto }}
                style={styles.photoPreview}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <View style={styles.photoIcon}>
                  <Ionicons
                    name="camera-outline"
                    size={31}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.photoTitle}>
                  Adicionar foto
                </Text>

                <Text style={styles.photoDescription}>
                  Toque aqui para escolher uma imagem
                  da galeria
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {foto && (
            <TouchableOpacity
              style={styles.changePhoto}
              onPress={selecionarFoto}
            >
              <Ionicons
                name="images-outline"
                size={17}
                color={COLORS.primary}
              />
              <Text style={styles.changePhotoText}>
                Alterar foto
              </Text>
            </TouchableOpacity>
          )}

          {/* DADOS BÁSICOS */}
          <Text style={styles.sectionTitle}>
            Informações básicas
          </Text>

          <Text style={styles.label}>
            Nome do animal
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: Thor"
            placeholderTextColor={COLORS.placeholder}
            value={nome}
            onChangeText={setNome}
          />

          <Text style={styles.label}>
            Espécie
          </Text>

          {renderizarOpcoes(
            ['Cachorro', 'Gato'],
            tipo,
            setTipo
          )}

          <Text style={styles.label}>
            Idade
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Ex: 2 anos"
            placeholderTextColor={COLORS.placeholder}
            value={idade}
            onChangeText={setIdade}
          />

          <Text style={styles.label}>
            Sexo
          </Text>

          {renderizarOpcoes(
            ['Macho', 'Fêmea'],
            sexo,
            setSexo
          )}

          <Text style={styles.label}>
            Porte
          </Text>

          {renderizarOpcoes(
            ['Pequeno', 'Médio', 'Grande'],
            porte,
            setPorte
          )}

          {/* LOCALIZAÇÃO */}
          <Text style={styles.sectionTitle}>
            Localização
          </Text>

          <Text style={styles.label}>
            Cidade e estado
          </Text>

          <View style={styles.locationInput}>
            <Ionicons
              name="location-outline"
              size={21}
              color={COLORS.primary}
            />

            <TextInput
              style={styles.locationTextInput}
              placeholder="Ex: Erechim - RS"
              placeholderTextColor={COLORS.placeholder}
              value={cidade}
              onChangeText={setCidade}
            />
          </View>

          {/* DESCRIÇÃO */}
          <Text style={styles.sectionTitle}>
            Sobre o animal
          </Text>

          <Text style={styles.label}>
            Descrição
          </Text>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Conte sobre a personalidade, os hábitos e os cuidados necessários..."
            placeholderTextColor={COLORS.placeholder}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={descricao}
            onChangeText={setDescricao}
          />

          {/* AVISO */}
          <View style={styles.notice}>
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={COLORS.primary}
            />

            <Text style={styles.noticeText}>
              Informe dados verdadeiros e escolha
              uma foto que represente o animal.
            </Text>
          </View>

          {/* BOTÃO */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={cadastrarAnimal}
            activeOpacity={0.85}
          >
            <Ionicons
              name="paw"
              size={20}
              color={COLORS.white}
            />

            <Text style={styles.registerButtonText}>
              Cadastrar animal
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },

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
    paddingBottom: 55,
  },

  introduction: {
    alignItems: 'center',
    marginBottom: 28,
  },

  introIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 9,
    paddingHorizontal: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 17,
    marginTop: 7,
  },

  photoArea: {
    height: 190,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 17,
  },

  photoPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  photoIcon: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  photoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 6,
  },

  photoDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },

  photoPreview: {
    width: '100%',
    height: '100%',
  },

  changePhoto: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginBottom: 25,
  },

  changePhotoText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 9,
  },

  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 22,
  },

  options: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 23,
  },

  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  optionText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.textSecondary,
  },

  optionTextSelected: {
    color: COLORS.white,
  },

  locationInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    paddingHorizontal: 15,
    marginBottom: 25,
    height: 53,
  },

  locationTextInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    marginLeft: 10,
  },

  textArea: {
    height: 130,
    paddingTop: 15,
  },

  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.medium,
    padding: 15,
    gap: 10,
    marginBottom: 24,
  },

  noticeText: {
    flex: 1,
    fontSize: 12,
    color: COLORS.primaryDark,
    lineHeight: 19,
  },

  registerButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
  },

  registerButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
