
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
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

type Animal = {
  id: number;
  nome: string;
  tipo: 'Cachorro' | 'Gato';
  idade: string;
  sexo: string;
  cidade: string;
  emoji: string;
  foto: string;
};

const animais: Animal[] = [
  {
    id: 1,
    nome: 'Thor',
    tipo: 'Cachorro',
    idade: '2 anos',
    sexo: 'Macho',
    cidade: 'Erechim - RS',
    emoji: '🐶',
    foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600',
  },
  {
    id: 2,
    nome: 'Luna',
    tipo: 'Gato',
    idade: '1 ano',
    sexo: 'Fêmea',
    cidade: 'Erechim - RS',
    emoji: '🐱',
    foto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
  },
  {
    id: 3,
    nome: 'Bob',
    tipo: 'Cachorro',
    idade: '3 anos',
    sexo: 'Macho',
    cidade: 'Erechim - RS',
    emoji: '🐕',
    foto: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
  },
  {
    id: 4,
    nome: 'Mel',
    tipo: 'Gato',
    idade: '8 meses',
    sexo: 'Fêmea',
    cidade: 'Erechim - RS',
    emoji: '🐈',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
  },
];

export default function AnimaisScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const animaisFiltrados = animais.filter((animal) => {
    const termo = pesquisa.trim().toLowerCase();

    const correspondePesquisa =
      animal.nome.toLowerCase().includes(termo) ||
      animal.tipo.toLowerCase().includes(termo) ||
      animal.cidade.toLowerCase().includes(termo);

    const correspondeCategoria =
      categoria === 'Todos' || animal.tipo === categoria;

    return correspondePesquisa && correspondeCategoria;
  });

  function abrirDetalhes(animal: Animal) {
    router.push({
      pathname: '/detalhes',
      params: {
        nome: animal.nome,
        tipo: animal.tipo,
        idade: animal.idade,
        sexo: animal.sexo,
        cidade: animal.cidade,
        emoji: animal.emoji,
        foto: animal.foto,
      },
    });
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

        <View style={styles.headerText}>
          <Text style={styles.headerLabel}>ADOTEPET</Text>
          <Text style={styles.title}>Encontre seu amigo</Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push('/perfil')}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* INTRODUÇÃO */}
        <Text style={styles.subtitle}>
          Conheça os animais que estão esperando por
          uma família e muito carinho.
        </Text>

        {/* PESQUISA */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={21}
            color={COLORS.textSecondary}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar animal ou cidade..."
            placeholderTextColor={COLORS.placeholder}
            value={pesquisa}
            onChangeText={setPesquisa}
          />

          {pesquisa.length > 0 && (
            <TouchableOpacity onPress={() => setPesquisa('')}>
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* FILTROS */}
        <View style={styles.categories}>
          {['Todos', 'Cachorro', 'Gato'].map((item) => {
            const selecionado = categoria === item;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.categoryButton,
                  selecionado && styles.categorySelected,
                ]}
                onPress={() => setCategoria(item)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selecionado && styles.categoryTextSelected,
                  ]}
                >
                  {item === 'Cachorro'
                    ? 'Cães'
                    : item === 'Gato'
                    ? 'Gatos'
                    : 'Todos'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* QUANTIDADE */}
        <View style={styles.resultHeader}>
          <Text style={styles.sectionTitle}>
            Animais disponíveis
          </Text>

          <Text style={styles.resultCount}>
            {animaisFiltrados.length} encontrados
          </Text>
        </View>

        {/* LISTA DE ANIMAIS */}
        {animaisFiltrados.map((animal) => (
          <TouchableOpacity
            key={animal.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => abrirDetalhes(animal)}
          >
            <Image
              source={{ uri: animal.foto }}
              style={styles.animalImage}
              resizeMode="cover"
            />

            <View style={styles.information}>
              <View style={styles.nameRow}>
                <Text style={styles.animalName}>
                  {animal.nome}
                </Text>

                <Ionicons
                  name={
                    animal.sexo === 'Macho'
                      ? 'male-outline'
                      : 'female-outline'
                  }
                  size={19}
                  color={COLORS.primary}
                />
              </View>

              <Text style={styles.description}>
                {animal.tipo} • {animal.idade}
              </Text>

              <Text style={styles.description}>
                {animal.sexo}
              </Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={COLORS.textSecondary}
                />

                <Text
                  style={styles.location}
                  numberOfLines={1}
                >
                  {animal.cidade}
                </Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsText}>
                  Ver detalhes
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={COLORS.primary}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* NENHUM RESULTADO */}
        {animaisFiltrados.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={40}
              color={COLORS.textSecondary}
            />

            <Text style={styles.emptyTitle}>
              Nenhum animal encontrado
            </Text>

            <Text style={styles.emptyDescription}>
              Tente outro nome, cidade ou categoria.
            </Text>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => {
                setPesquisa('');
                setCategoria('Todos');
              }}
            >
              <Text style={styles.clearButtonText}>
                Limpar filtros
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: COLORS.background,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  headerText: {
    flex: 1,
  },

  headerLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: COLORS.primary,
    marginBottom: 4,
  },

  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  profileButton: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 10,
    paddingBottom: 45,
  },

  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginBottom: 23,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 54,
    paddingHorizontal: 15,
    marginBottom: 17,
  },

  searchInput: {
    flex: 1,
    fontSize: FONTS.regular,
    color: COLORS.text,
    marginLeft: 10,
  },

  categories: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28,
  },

  categoryButton: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  categorySelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  categoryText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  categoryTextSelected: {
    color: COLORS.white,
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 17,
  },

  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  resultCount: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  animalImage: {
    width: 115,
    height: 150,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.primaryLight,
    marginRight: 13,
  },

  information: {
    flex: 1,
    justifyContent: 'center',
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  animalName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  description: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    gap: 3,
  },

  location: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 13,
  },

  detailsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 35,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 12,
  },

  emptyDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 7,
    textAlign: 'center',
  },

  clearButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
  },

  clearButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
