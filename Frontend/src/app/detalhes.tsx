import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

export default function DetalhesScreen() {
  const params = useLocalSearchParams();

  const nome = String(params.nome || 'Thor');
  const tipo = String(params.tipo || 'Cachorro');
  const idade = String(params.idade || '2 anos');
  const sexo = String(params.sexo || 'Macho');
  const cidade = String(params.cidade || 'Erechim - RS');
  const emoji = String(params.emoji || '🐶');

  const porte =
    tipo === 'Gato'
      ? 'Pequeno'
      : nome === 'Bob'
      ? 'Grande'
      : 'Médio';

  const descricao =
    nome === 'Thor'
      ? 'Thor é um cachorro carinhoso, brincalhão e cheio de energia. Ele procura uma família que possa oferecer muito amor e cuidado.'
      : nome === 'Luna'
      ? 'Luna é uma gatinha tranquila, carinhosa e muito companheira. Ela gosta de ambientes calmos e de receber carinho.'
      : nome === 'Bob'
      ? 'Bob é um cachorro muito amigável e protetor. Adora passeios e está procurando uma família para compartilhar muitos momentos.'
      : nome === 'Mel'
      ? 'Mel é uma gatinha jovem, curiosa e brincalhona. Ela é muito dócil e está pronta para encontrar um novo lar.'
      : 'Este animal está procurando uma nova família cheia de amor e carinho.';

  function queroAdotar() {
    Alert.alert(
      'Solicitação enviada 🐾',
      `Seu interesse em adotar ${nome} foi registrado!`
    );
  }

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.imageArea}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>

        <Text style={styles.name}>{nome}</Text>

        <Text style={styles.type}>
          {tipo} • {idade}
        </Text>

        <View style={styles.infoContainer}>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>🎂</Text>
            <Text style={styles.infoTitle}>Idade</Text>
            <Text style={styles.infoValue}>{idade}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>
              {sexo === 'Fêmea' ? '♀️' : '♂️'}
            </Text>
            <Text style={styles.infoTitle}>Sexo</Text>
            <Text style={styles.infoValue}>{sexo}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoIcon}>📏</Text>
            <Text style={styles.infoTitle}>Porte</Text>
            <Text style={styles.infoValue}>{porte}</Text>
          </View>

        </View>

        <View style={styles.locationBox}>
          <Text style={styles.location}>
            📍 {cidade}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Sobre {nome}
        </Text>

        <Text style={styles.description}>
          {descricao}
        </Text>

        <Text style={styles.sectionTitle}>
          Informações importantes
        </Text>

        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            🐾 A adoção responsável exige compromisso, cuidado e carinho com o animal.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.adoptButton}
          onPress={queroAdotar}
        >
          <Text style={styles.adoptButtonText}>
            QUERO ADOTAR
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

  content: {
    paddingHorizontal: 22,
    paddingTop: 50,
    paddingBottom: 50,
  },

  backButton: {
    marginBottom: 20,
  },

  backText: {
    fontSize: 17,
    color: '#2E7D32',
    fontWeight: 'bold',
  },

  imageArea: {
    height: 230,
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  emoji: {
    fontSize: 110,
  },

  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222222',
  },

  type: {
    fontSize: 16,
    color: '#666666',
    marginTop: 5,
    marginBottom: 25,
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  infoCard: {
    width: '31%',
    backgroundColor: '#E8F5E9',
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
  },

  infoIcon: {
    fontSize: 25,
    marginBottom: 5,
  },

  infoTitle: {
    fontSize: 12,
    color: '#666666',
  },

  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginTop: 3,
  },

  locationBox: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
  },

  location: {
    fontSize: 15,
    color: '#555555',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 25,
  },

  notice: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },

  noticeText: {
    color: '#2E7D32',
    lineHeight: 21,
  },

  adoptButton: {
    backgroundColor: '#2E7D32',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
  },

  adoptButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});