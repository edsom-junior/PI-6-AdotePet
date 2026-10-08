
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
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
  foto: string;
  emoji: string;
};

const animais: Animal[] = [
  {
    id: 1,
    nome: 'Thor',
    tipo: 'Cachorro',
    idade: '2 anos',
    sexo: 'Macho',
    cidade: 'Erechim - RS',
    foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600',
    emoji: '🐶',
  },
  {
    id: 2,
    nome: 'Luna',
    tipo: 'Gato',
    idade: '1 ano',
    sexo: 'Fêmea',
    cidade: 'Erechim - RS',
    foto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
    emoji: '🐱',
  },
  {
    id: 3,
    nome: 'Bob',
    tipo: 'Cachorro',
    idade: '3 anos',
    sexo: 'Macho',
    cidade: 'Erechim - RS',
    foto: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
    emoji: '🐕',
  },
  {
    id: 4,
    nome: 'Mel',
    tipo: 'Gato',
    idade: '8 meses',
    sexo: 'Fêmea',
    cidade: 'Erechim - RS',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
    emoji: '🐈',
  },
];

export default function HomeScreen() {
  const [pesquisa, setPesquisa] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const animaisFiltrados = animais.filter((animal) => {
    const busca = pesquisa.trim().toLowerCase();

    const correspondeBusca =
      animal.nome.toLowerCase().includes(busca) ||
      animal.tipo.toLowerCase().includes(busca) ||
      animal.cidade.toLowerCase().includes(busca);

    const correspondeCategoria =
      categoria === 'Todos' || animal.tipo === categoria;

    return correspondeBusca && correspondeCategoria;
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
        foto: animal.foto,
        emoji: animal.emoji,
      },
    });
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.brand}>ADOTEPET</Text>

            <Text style={styles.title}>
              Encontre seu novo melhor amigo.
            </Text>

            <Text style={styles.subtitle}>
              Uma nova história pode começar com um encontro.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/perfil')}
          >
            <Ionicons
              name="person-outline"
              size={23}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        {/* PESQUISA */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={21}
            color={COLORS.textSecondary}
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, espécie ou cidade"
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

        {/* BANNER */}
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>
            ADOÇÃO RESPONSÁVEL
          </Text>

          <Text style={styles.bannerTitle}>
            Todo animal merece um lar cheio de carinho.
          </Text>

          <Text style={styles.bannerDescription}>
            Conheça os animais disponíveis e encontre
            seu novo companheiro.
          </Text>

          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => router.push('/animais')}
          >
            <Text style={styles.bannerButtonText}>
              Explorar animais
            </Text>

            <Ionicons
              name="arrow-forward"
              size={17}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

        {/* CATEGORIAS */}
        <Text style={styles.sectionTitle}>
          O que você procura?
        </Text>

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
                <Ionicons
                  name={
                    item === 'Todos'
                      ? 'apps-outline'
                      : item === 'Cachorro'
                      ? 'paw-outline'
                      : 'heart-outline'
                  }
                  size={17}
                  color={
                    selecionado
                      ? COLORS.white
                      : COLORS.primary
                  }
                />

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

        {/* ANIMAIS */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              À espera de um lar
            </Text>

            <Text style={styles.sectionSubtitle}>
              {animaisFiltrados.length} animais encontrados
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => router.push('/animais')}
          >
            <Text style={styles.seeAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.animalsGrid}>
          {animaisFiltrados.map((animal) => (
            <TouchableOpacity
              key={animal.id}
              style={styles.animalCard}
              activeOpacity={0.85}
              onPress={() => abrirDetalhes(animal)}
            >
              <Image
                source={{ uri: animal.foto }}
                style={styles.animalImage}
                resizeMode="cover"
              />

              <View style={styles.cardContent}>
                <Text style={styles.animalName}>
                  {animal.nome}
                </Text>

                <Text style={styles.animalDescription}>
                  {animal.tipo} • {animal.idade}
                </Text>

                <View style={styles.locationRow}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color={COLORS.textSecondary}
                  />

                  <Text
                    style={styles.location}
                    numberOfLines={1}
                  >
                    {animal.cidade}
                  </Text>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.detailsText}>
                    Conhecer
                  </Text>

                  <Ionicons
                    name="arrow-forward-circle"
                    size={24}
                    color={COLORS.primary}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {animaisFiltrados.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="search-outline"
              size={35}
              color={COLORS.textSecondary}
            />

            <Text style={styles.emptyTitle}>
              Nenhum animal encontrado
            </Text>

            <Text style={styles.emptyDescription}>
              Tente pesquisar outro nome ou categoria.
            </Text>
          </View>
        )}

        <Text style={styles.footerMessage}>
          Adote com responsabilidade. Transforme uma vida.
        </Text>
      </ScrollView>

      {/* MENU INFERIOR */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="home"
            size={23}
            color={COLORS.primary}
          />
          <Text style={styles.menuActive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/animais')}
        >
          <Ionicons
            name="paw-outline"
            size={23}
            color={COLORS.textSecondary}
          />
          <Text style={styles.menuText}>Animais</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/cadastrar-animal')}
        >
          <Ionicons
            name="add"
            size={28}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/perfil')}
        >
          <Ionicons
            name="person-outline"
            size={23}
            color={COLORS.textSecondary}
          />
          <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 55,
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },

  headerText: {
    flex: 1,
  },

  brand: {
    fontSize: FONTS.small,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: COLORS.primary,
    marginBottom: 10,
  },

  title: {
    fontSize: FONTS.title,
    fontWeight: 'bold',
    color: COLORS.text,
    lineHeight: 35,
  },

  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: 10,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: FONTS.regular,
    color: COLORS.text,
  },

  banner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.extraLarge,
    padding: 23,
    marginBottom: 30,
  },

  bannerLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: COLORS.primary,
    marginBottom: 12,
  },

  bannerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    lineHeight: 30,
  },

  bannerDescription: {
    fontSize: 13,
    color: COLORS.primary,
    lineHeight: 20,
    marginTop: 10,
  },

  bannerButton: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 10,
    marginTop: 20,
  },

  bannerButtonText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },

  categories: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },

  categoryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 14,
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
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },

  categoryTextSelected: {
    color: COLORS.white,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  sectionSubtitle: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: -7,
    marginBottom: 12,
  },

  seeAll: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  animalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  animalCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 15,
  },

  animalImage: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.primaryLight,
  },

  cardContent: {
    padding: 12,
  },

  animalName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  animalDescription: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 5,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 9,
  },

  location: {
    flex: 1,
    fontSize: 11,
    color: COLORS.textSecondary,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
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
    marginTop: 5,
    textAlign: 'center',
  },

  footerMessage: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 25,
  },

  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 14,
    paddingBottom: 22,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  menuItem: {
    alignItems: 'center',
    gap: 5,
    minWidth: 50,
  },

  menuActive: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: 'bold',
  },

  menuText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },

  addButton: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25,
  },
});
