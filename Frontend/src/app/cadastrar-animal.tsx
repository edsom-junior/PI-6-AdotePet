import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';

export default function CadastrarAnimalScreen() {

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [porte, setPorte] = useState('');
  const [cidade, setCidade] = useState('');
  const [descricao, setDescricao] = useState('');

  function cadastrarAnimal() {

    if (
      !nome ||
      !tipo ||
      !idade ||
      !sexo ||
      !porte ||
      !cidade ||
      !descricao
    ) {
      Alert.alert(
        'Atenção',
        'Preencha todos os campos para cadastrar o animal.'
      );

      return;
    }

    Alert.alert(
      'Animal cadastrado! 🐾',
      `${nome} foi cadastrado com sucesso.`,
      [
        {
          text: 'OK',
          onPress: () => router.replace('/home'),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>

      {/* CABEÇALHO */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Cadastrar animal
        </Text>

      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={styles.logo}></Text>

        <Text style={styles.title}>
          Novo animal
        </Text>

        <Text style={styles.subtitle}>
          Preencha as informações do animal que está procurando um novo lar.
        </Text>

        {/* NOME */}
        <Text style={styles.label}>
          Nome do animal
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Thor"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />

        {/* TIPO */}
        <Text style={styles.label}>
          Tipo
        </Text>

        <View style={styles.options}>

          <TouchableOpacity
            style={[
              styles.optionButton,
              tipo === 'Cachorro' && styles.optionSelected,
            ]}
            onPress={() => setTipo('Cachorro')}
          >
            <Text
              style={[
                styles.optionText,
                tipo === 'Cachorro' && styles.optionTextSelected,
              ]}
            >
               Cachorro
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              tipo === 'Gato' && styles.optionSelected,
            ]}
            onPress={() => setTipo('Gato')}
          >
            <Text
              style={[
                styles.optionText,
                tipo === 'Gato' && styles.optionTextSelected,
              ]}
            >
               Gato
            </Text>
          </TouchableOpacity>

        </View>

        {/* IDADE */}
        <Text style={styles.label}>
          Idade
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: 2 anos"
          placeholderTextColor="#999"
          value={idade}
          onChangeText={setIdade}
        />

        {/* SEXO */}
        <Text style={styles.label}>
          Sexo
        </Text>

        <View style={styles.options}>

          <TouchableOpacity
            style={[
              styles.optionButton,
              sexo === 'Macho' && styles.optionSelected,
            ]}
            onPress={() => setSexo('Macho')}
          >
            <Text
              style={[
                styles.optionText,
                sexo === 'Macho' && styles.optionTextSelected,
              ]}
            >
              ♂ Macho
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              sexo === 'Fêmea' && styles.optionSelected,
            ]}
            onPress={() => setSexo('Fêmea')}
          >
            <Text
              style={[
                styles.optionText,
                sexo === 'Fêmea' && styles.optionTextSelected,
              ]}
            >
              ♀ Fêmea
            </Text>
          </TouchableOpacity>

        </View>

        {/* PORTE */}
        <Text style={styles.label}>
          Porte
        </Text>

        <View style={styles.porteOptions}>

          <TouchableOpacity
            style={[
              styles.porteButton,
              porte === 'Pequeno' && styles.optionSelected,
            ]}
            onPress={() => setPorte('Pequeno')}
          >
            <Text
              style={[
                styles.porteText,
                porte === 'Pequeno' && styles.optionTextSelected,
              ]}
            >
              Pequeno
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.porteButton,
              porte === 'Médio' && styles.optionSelected,
            ]}
            onPress={() => setPorte('Médio')}
          >
            <Text
              style={[
                styles.porteText,
                porte === 'Médio' && styles.optionTextSelected,
              ]}
            >
              Médio
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.porteButton,
              porte === 'Grande' && styles.optionSelected,
            ]}
            onPress={() => setPorte('Grande')}
          >
            <Text
              style={[
                styles.porteText,
                porte === 'Grande' && styles.optionTextSelected,
              ]}
            >
              Grande
            </Text>
          </TouchableOpacity>

        </View>

        {/* CIDADE */}
        <Text style={styles.label}>
          Cidade
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ex: Erechim - RS"
          placeholderTextColor="#999"
          value={cidade}
          onChangeText={setCidade}
        />

        {/* DESCRIÇÃO */}
        <Text style={styles.label}>
          Descrição
        </Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Conte um pouco sobre o animal..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          value={descricao}
          onChangeText={setDescricao}
        />

        {/* BOTÃO */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={cadastrarAnimal}
        >
          <Text style={styles.registerButtonText}>
            CADASTRAR ANIMAL
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
    paddingTop: 25,
    paddingBottom: 50,
  },

  logo: {
    fontSize: 45,
    textAlign: 'center',
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginTop: 5,
  },

  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },

  options: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  optionButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },

  optionSelected: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },

  optionText: {
    fontSize: 15,
    color: '#555555',
    fontWeight: 'bold',
  },

  optionTextSelected: {
    color: '#FFFFFF',
  },

  porteOptions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },

  porteButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },

  porteText: {
    fontSize: 13,
    color: '#555555',
    fontWeight: 'bold',
  },

  textArea: {
    height: 120,
  },

  registerButton: {
    backgroundColor: '#2E7D32',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});