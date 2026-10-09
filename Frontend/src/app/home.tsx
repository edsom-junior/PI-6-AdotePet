
import React, { useCallback, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Image, Alert,
  ActivityIndicator, RefreshControl
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, globalStyles } from '../styles/theme';
import { listarAnimais, Pet, obterUsuario, Role } from '../services/api';

export default function HomeScreen() {
  const [animais, setAnimais] = useState<Pet[]>([]);
  const [pesquisa, setPesquisa] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [perfil, setPerfil] = useState<Role | null>(null);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const [lista, usuario] = await Promise.all([
        listarAnimais(),
        obterUsuario()
      ]);
      setAnimais(lista);
      setPerfil(usuario?.role ?? null);
    } catch (erro) {
      Alert.alert(
        'Erro',
        erro instanceof Error ? erro.message : 'Não foi possível carregar os animais.'
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    carregar();
  }, [carregar]));

  const filtrados = animais.filter(animal => {
    const busca = pesquisa.toLowerCase().trim();
    const especie = animal.species.toLowerCase();
    const tipo = especie === 'dog' ? 'cachorro' : especie === 'cat' ? 'gato' : especie;

    return (
      (animal.name.toLowerCase().includes(busca) ||
       animal.city.toLowerCase().includes(busca) ||
       tipo.includes(busca)) &&
      (categoria === 'Todos' || especie === categoria)
    );
  });

  const abrirDetalhes = (id: string) =>
    router.push({ pathname: '/detalhes', params: { id } });

  return (
    <View style={globalStyles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={carregar} />
        }
      >
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.marca}>ADOTEPET</Text>
            <Text style={styles.titulo}>Encontre seu novo melhor amigo.</Text>
            <Text style={styles.subtitulo}>
              Uma nova história pode começar com um encontro.
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/perfil')}>
            <Ionicons name="person-circle-outline" size={42} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.busca}>
          <Ionicons name="search-outline" size={21} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Buscar por nome, espécie ou cidade"
            placeholderTextColor={COLORS.placeholder}
            value={pesquisa}
            onChangeText={setPesquisa}
          />
          {pesquisa.length > 0 && (
            <TouchableOpacity onPress={() => setPesquisa('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>ADOÇÃO RESPONSÁVEL</Text>
          <Text style={styles.bannerTitulo}>
            Todo animal merece um lar cheio de carinho.
          </Text>
          <Text style={styles.subtitulo}>
            Conheça os animais disponíveis e encontre seu novo companheiro.
          </Text>
          <TouchableOpacity
            style={styles.bannerBotao}
            onPress={() => router.push('/animais')}
          >
            <Text style={styles.link}>Explorar animais →</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.secao}>O que você procura?</Text>
        <View style={styles.categorias}>
          {[
            { nome: 'Todos', valor: 'Todos' },
            { nome: 'Cães', valor: 'dog' },
            { nome: 'Gatos', valor: 'cat' }
          ].map(item => (
            <TouchableOpacity
              key={item.valor}
              style={[
                styles.categoria,
                categoria === item.valor && styles.ativo
              ]}
              onPress={() => setCategoria(item.valor)}
            >
              <Text style={{
                color: categoria === item.valor ? COLORS.white : COLORS.primary,
                fontWeight: 'bold'
              }}>
                {item.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.linha}>
          <View>
            <Text style={styles.secao}>À espera de um lar</Text>
            <Text style={styles.subtitulo}>
              {filtrados.length} animais encontrados
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/animais')}>
            <Text style={styles.link}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {carregando && animais.length === 0 ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View style={styles.grade}>
            {filtrados.map(animal => (
              <TouchableOpacity
                key={animal.id}
                style={styles.card}
                onPress={() => abrirDetalhes(animal.id)}
              >
                {animal.photoUrl ? (
                  <Image
                    source={{ uri: animal.photoUrl }}
                    style={styles.foto}
                  />
                ) : (
                  <View style={[styles.foto, styles.semFoto]}>
                    <Ionicons name="paw" size={42} color={COLORS.primary} />
                  </View>
                )}

                <View style={styles.cardConteudo}>
                  <Text style={styles.nome}>{animal.name}</Text>
                  <Text style={styles.info}>
                    {animal.species === 'dog' ? 'Cachorro' :
                     animal.species === 'cat' ? 'Gato' : animal.species}
                  </Text>
                  <Text style={styles.info} numberOfLines={1}>
                    📍 {animal.city}
                  </Text>
                  <View style={styles.linha}>
                    <Text style={styles.link}>Conhecer</Text>
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
        )}

        {!carregando && filtrados.length === 0 && (
          <Text style={styles.vazio}>
            Nenhum animal encontrado.
          </Text>
        )}

        <Text style={styles.rodape}>
          Adote com responsabilidade. Transforme uma vida.
        </Text>
      </ScrollView>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="home" size={24} color={COLORS.primary} />
          <Text style={styles.link}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/animais')}
        >
          <Ionicons name="paw-outline" size={24} color={COLORS.textSecondary} />
          <Text style={styles.info}>Animais</Text>
        </TouchableOpacity>

        {perfil === 'SHELTER' && (
          <TouchableOpacity
            style={styles.adicionar}
            onPress={() => router.push('/cadastrar-animal')}
          >
            <Ionicons name="add" size={28} color={COLORS.white} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/perfil')}
        >
          <Ionicons name="person-outline" size={24} color={COLORS.textSecondary} />
          <Text style={styles.info}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
    paddingTop: 55,
    paddingBottom: 120
  },
  header: {
    flexDirection: 'row',
    marginBottom: 25,
    gap: 10
  },
  marca: {
    color: COLORS.primary,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.text
  },
  subtitulo: {
    color: COLORS.textSecondary,
    lineHeight: 21,
    marginTop: 8
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 25
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text
  },
  banner: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.extraLarge,
    padding: 23,
    marginBottom: 30
  },
  bannerLabel: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 11,
    marginBottom: 12
  },
  bannerTitulo: {
    color: COLORS.primaryDark,
    fontSize: 23,
    fontWeight: 'bold'
  },
  bannerBotao: {
    backgroundColor: COLORS.white,
    alignSelf: 'flex-start',
    padding: 14,
    borderRadius: RADIUS.medium,
    marginTop: 20
  },
  secao: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10
  },
  categorias: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30
  },
  categoria: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  ativo: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    marginBottom: 15
  },
  foto: {
    width: '100%',
    height: 150
  },
  semFoto: {
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardConteudo: {
    padding: 12
  },
  nome: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text
  },
  info: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 5
  },
  vazio: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginVertical: 30
  },
  rodape: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 25
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 18,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuItem: {
    alignItems: 'center',
    gap: 4
  },
  adicionar: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -25
  }
});
