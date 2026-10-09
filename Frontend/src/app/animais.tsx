
import React, { useCallback, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, Image, ActivityIndicator, RefreshControl
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, globalStyles } from '../styles/theme';
import { listarAnimais, Pet } from '../services/api';

export default function AnimaisScreen() {
  const [animais, setAnimais] = useState<Pet[]>([]);
  const [pesquisa, setPesquisa] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro('');

    try {
      setAnimais(await listarAnimais());
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro ao carregar animais.');
    } finally {
      setCarregando(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    carregar();
  }, [carregar]));

  const filtrados = animais.filter(animal => {
    const termo = pesquisa.trim().toLowerCase();
    const especie = animal.species.toLowerCase();
    const tipo = especie === 'dog' ? 'cachorro' :
                 especie === 'cat' ? 'gato' : especie;

    return (
      (animal.name.toLowerCase().includes(termo) ||
       animal.city.toLowerCase().includes(termo) ||
       tipo.includes(termo)) &&
      (categoria === 'Todos' || especie === categoria)
    );
  });

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.marca}>ADOTEPET</Text>
          <Text style={styles.titulo}>Encontre seu amigo</Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/perfil')}>
          <Ionicons name="person-circle-outline" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={carregando} onRefresh={carregar} />
        }
      >
        <Text style={styles.subtitulo}>
          Conheça os animais que estão esperando por uma família e muito carinho.
        </Text>

        <View style={styles.busca}>
          <Ionicons name="search-outline" size={21} color={COLORS.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Buscar animal ou cidade..."
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

        <View style={styles.categorias}>
          {[
            { texto: 'Todos', valor: 'Todos' },
            { texto: 'Cães', valor: 'dog' },
            { texto: 'Gatos', valor: 'cat' }
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
                {item.texto}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.linha}>
          <Text style={styles.secao}>Animais disponíveis</Text>
          <Text style={styles.subtitulo}>{filtrados.length} encontrados</Text>
        </View>

        {carregando && animais.length === 0 && (
          <ActivityIndicator size="large" color={COLORS.primary} />
        )}

        {erro !== '' && (
          <View style={styles.aviso}>
            <Text style={styles.subtitulo}>{erro}</Text>
            <TouchableOpacity onPress={carregar}>
              <Text style={styles.link}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {!erro && filtrados.map(animal => (
          <TouchableOpacity
            key={animal.id}
            style={styles.card}
            onPress={() => router.push({
              pathname: '/detalhes',
              params: { id: animal.id }
            })}
          >
            {animal.photoUrl ? (
              <Image source={{ uri: animal.photoUrl }} style={styles.foto} />
            ) : (
              <View style={[styles.foto, styles.semFoto]}>
                <Ionicons name="paw" size={38} color={COLORS.primary} />
              </View>
            )}

            <View style={styles.informacoes}>
              <Text style={styles.nome}>{animal.name}</Text>
              <Text style={styles.subtitulo}>
                {animal.species === 'dog' ? 'Cachorro' :
                 animal.species === 'cat' ? 'Gato' : animal.species}
              </Text>

              <View style={styles.local}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.subtitulo} numberOfLines={1}>
                  {animal.city}
                </Text>
              </View>

              <View style={styles.local}>
                <Text style={styles.link}>Ver detalhes</Text>
                <Ionicons
                  name="arrow-forward"
                  size={17}
                  color={COLORS.primary}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {!carregando && !erro && filtrados.length === 0 && (
          <View style={styles.aviso}>
            <Ionicons name="search-outline" size={38} color={COLORS.textSecondary} />
            <Text style={styles.secao}>Nenhum animal encontrado</Text>
            <TouchableOpacity onPress={() => {
              setPesquisa('');
              setCategoria('Todos');
            }}>
              <Text style={styles.link}>Limpar filtros</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: 55,
    paddingBottom: 18
  },
  marca: {
    color: COLORS.primary,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    fontSize: 10
  },
  titulo: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.text
  },
  conteudo: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 45
  },
  subtitulo: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 21
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    height: 54,
    marginVertical: 22
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text
  },
  categorias: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 28
  },
  categoria: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 13,
    borderRadius: RADIUS.medium,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white
  },
  ativo: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17
  },
  secao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 15,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  foto: {
    width: 115,
    height: 150,
    borderRadius: RADIUS.medium
  },
  semFoto: {
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  informacoes: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 13
  },
  nome: {
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.text
  },
  local: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12
  },
  aviso: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 35
  }
});
