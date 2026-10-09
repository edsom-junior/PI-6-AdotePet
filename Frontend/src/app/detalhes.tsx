
import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, globalStyles } from '../styles/theme';
import { buscarAnimal, Pet } from '../services/api';

export default function DetalhesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [animal, setAnimal] = useState<Pet | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setErro('');
      setAnimal(null);

      try {
        if (!id) throw new Error('Animal não identificado.');
        const dados = await buscarAnimal(id);
        if (ativo) setAnimal(dados);
      } catch (e) {
        if (ativo) {
          setErro(e instanceof Error ? e.message : 'Erro ao buscar animal.');
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => { ativo = false; };
  }, [id]);

  const tipo = animal?.species === 'dog' ? 'Cachorro' :
               animal?.species === 'cat' ? 'Gato' : animal?.species;

  return (
    <View style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.cabecalho}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={25} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.titulo}>Detalhes do animal</Text>
          <View style={{ width: 25 }} />
        </View>

        {carregando ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : erro ? (
          <View style={styles.centro}>
            <Text style={styles.texto}>{erro}</Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.link}>Voltar à lista</Text>
            </TouchableOpacity>
          </View>
        ) : animal && (
          <>
            <View style={styles.fotoArea}>
              {animal.photoUrl ? (
                <Image
                  source={{ uri: animal.photoUrl }}
                  style={styles.foto}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="paw" size={85} color={COLORS.primary} />
              )}
            </View>

            <View style={styles.linha}>
              <Text style={styles.nome}>{animal.name}</Text>
              <View style={styles.etiqueta}>
                <Text style={styles.link}>{tipo}</Text>
              </View>
            </View>

            <Text style={styles.texto}>
              Conheça um pouco mais sobre {animal.name} e descubra
              se vocês podem formar uma nova amizade.
            </Text>

            <View style={styles.local}>
              <Ionicons name="location-outline" size={25} color={COLORS.primary} />
              <View>
                <Text style={styles.texto}>Localização</Text>
                <Text style={styles.localTexto}>{animal.city}</Text>
              </View>
            </View>

            <Text style={styles.secao}>Sobre {animal.name}</Text>
            <Text style={styles.descricao}>
              {animal.description || 'Descrição ainda não cadastrada.'}
            </Text>

            <View style={styles.aviso}>
              <View style={styles.avisoTitulo}>
                <Ionicons name="heart-outline" size={21} color={COLORS.primary} />
                <Text style={styles.secao}>Adoção responsável</Text>
              </View>
              <Text style={styles.texto}>
                Adotar é assumir um compromisso de cuidado,
                respeito e carinho durante toda a vida do animal.
                Considere sua rotina, seu espaço e as necessidades
                do novo companheiro.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.botao}
              onPress={() => Alert.alert(
                'Solicitação de adoção',
                'Essa funcionalidade estará disponível quando o backend de solicitações estiver pronto.'
              )}
            >
              <Ionicons name="heart" size={21} color={COLORS.white} />
              <Text style={styles.botaoTexto}>Tenho interesse em adotar</Text>
              <Ionicons name="arrow-forward" size={19} color={COLORS.white} />
            </TouchableOpacity>

            <Text style={styles.rodape}>
              Um novo começo pode transformar duas vidas.
            </Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conteudo: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 55,
    paddingBottom: 50
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22
  },
  titulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text
  },
  centro: {
    alignItems: 'center',
    gap: 15,
    marginTop: 40
  },
  fotoArea: {
    height: 285,
    borderRadius: RADIUS.extraLarge,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 23
  },
  foto: {
    width: '100%',
    height: '100%'
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  nome: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text
  },
  etiqueta: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8
  },
  link: {
    color: COLORS.primary,
    fontWeight: 'bold'
  },
  texto: {
    color: COLORS.textSecondary,
    lineHeight: 22
  },
  local: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 17,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 25
  },
  localTexto: {
    fontWeight: 'bold',
    color: COLORS.text,
    fontSize: 15
  },
  secao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10
  },
  descricao: {
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 28
  },
  aviso: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.large,
    padding: 18,
    marginBottom: 25
  },
  avisoTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9
  },
  botao: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  botaoTexto: {
    color: COLORS.white,
    fontWeight: 'bold',
    flexShrink: 1
  },
  rodape: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: 20
  }
});
