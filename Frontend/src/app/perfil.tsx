
import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Alert, ActivityIndicator
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, globalStyles } from '../styles/theme';
import { obterUsuario, sairDaConta, Usuario } from '../services/api';

type Icone = React.ComponentProps<typeof Ionicons>['name'];

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(useCallback(() => {
    let ativo = true;

    async function carregar() {
      setCarregando(true);

      try {
        const dados = await obterUsuario();
        if (ativo) setUsuario(dados);
      } catch {
        if (ativo) {
          Alert.alert('Erro', 'Não foi possível carregar o perfil.');
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => { ativo = false; };
  }, []));

  function recursoFuturo(titulo: string) {
    Alert.alert(
      titulo,
      'Essa funcionalidade estará disponível em uma próxima versão.'
    );
  }

  function confirmarSaida() {
    Alert.alert(
      'Sair da conta',
      'Deseja realmente sair do AdotePet?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await sairDaConta();
              router.replace('/');
            } catch {
              Alert.alert('Erro', 'Não foi possível sair da conta.');
            }
          }
        }
      ]
    );
  }

  function linhaInformacao(icone: Icone, titulo: string, valor: string) {
    return (
      <View style={styles.linha}>
        <View style={styles.icone}>
          <Ionicons name={icone} size={20} color={COLORS.primary} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.rotulo}>{titulo}</Text>
          <Text style={styles.valor}>{valor}</Text>
        </View>
      </View>
    );
  }

  function opcaoMenu(icone: Icone, titulo: string) {
    return (
      <TouchableOpacity
        style={styles.linha}
        onPress={() => recursoFuturo(titulo)}
      >
        <View style={styles.icone}>
          <Ionicons name={icone} size={21} color={COLORS.primary} />
        </View>

        <Text style={styles.menuTexto}>{titulo}</Text>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={COLORS.textSecondary}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.cabecalhoTitulo}>Meu perfil</Text>
        <View style={{ width: 25 }} />
      </View>

      {carregando ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 40 }}
        />
      ) : !usuario ? (
        <View style={styles.semUsuario}>
          <Ionicons
            name="person-circle-outline"
            size={60}
            color={COLORS.primary}
          />

          <Text style={styles.secao}>Você não está conectado.</Text>

          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={() => router.replace('/')}
          >
            <Text style={styles.botaoEntrarTexto}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.conteudo}>
          <View style={styles.perfil}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={51} color={COLORS.primary} />
            </View>

            <Text style={styles.nome}>{usuario.name}</Text>

            <View style={styles.etiqueta}>
              <Ionicons name="paw" size={14} color={COLORS.primary} />
              <Text style={styles.etiquetaTexto}>
                {usuario.role === 'SHELTER' ? 'Abrigo AdotePet' : 'Adotante AdotePet'}
              </Text>
            </View>

            <Text style={styles.subtitulo}>
              Juntos podemos transformar a vida de muitos animais.
            </Text>
          </View>

          <Text style={styles.secao}>Informações pessoais</Text>

          <View style={styles.caixa}>
            {linhaInformacao('person-outline', 'Nome', usuario.name)}
            <View style={styles.divisor} />
            {linhaInformacao('mail-outline', 'E-mail', usuario.email)}
            <View style={styles.divisor} />
            {linhaInformacao(
              'people-outline',
              'Tipo de conta',
              usuario.role === 'SHELTER' ? 'Abrigo' : 'Adotante'
            )}
          </View>

          <Text style={styles.secao}>Minha conta</Text>

          <View style={styles.caixa}>
            {opcaoMenu('create-outline', 'Editar perfil')}

            {usuario.role === 'SHELTER' ? (
              <>
                <View style={styles.divisor} />
                {opcaoMenu('paw-outline', 'Meus animais cadastrados')}
                <View style={styles.divisor} />
                {opcaoMenu('heart-outline', 'Solicitações recebidas')}
              </>
            ) : (
              <>
                <View style={styles.divisor} />
                {opcaoMenu('heart-outline', 'Minhas solicitações')}
              </>
            )}

            <View style={styles.divisor} />
            {opcaoMenu('settings-outline', 'Configurações')}
          </View>

          <TouchableOpacity
            style={styles.sair}
            onPress={confirmarSaida}
          >
            <Ionicons
              name="log-out-outline"
              size={21}
              color={COLORS.danger}
            />
            <Text style={styles.sairTexto}>Sair da conta</Text>
          </TouchableOpacity>

          <View style={styles.rodape}>
            <Ionicons name="paw" size={17} color={COLORS.primary} />
            <Text style={styles.rodapeTexto}>
              AdotePet • Amor que transforma vidas
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cabecalho: {
    paddingTop: 55,
    paddingHorizontal: SPACING.lg,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cabecalhoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text
  },
  conteudo: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 10,
    paddingBottom: 45
  },
  perfil: {
    alignItems: 'center',
    marginBottom: 32
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
    borderColor: COLORS.white
  },
  nome: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10
  },
  etiqueta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight
  },
  etiquetaTexto: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  subtitulo: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 15
  },
  secao: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15
  },
  caixa: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 18,
    marginBottom: 28
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  icone: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13
  },
  rotulo: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4
  },
  valor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text
  },
  divisor: {
    height: 1,
    backgroundColor: COLORS.border
  },
  menuTexto: {
    flex: 1,
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500'
  },
  sair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.danger,
    borderRadius: RADIUS.medium
  },
  sairTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.danger
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 30
  },
  rodapeTexto: {
    color: COLORS.textSecondary,
    fontSize: 11
  },
  semUsuario: {
    alignItems: 'center',
    padding: 30,
    gap: 20
  },
  botaoEntrar: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingHorizontal: 30,
    paddingVertical: 15
  },
  botaoEntrarTexto: {
    color: COLORS.white,
    fontWeight: 'bold'
  }
});
