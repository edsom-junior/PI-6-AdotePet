
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SPACING, globalStyles } from '../styles/theme';
import { cadastrarAnimal, obterUsuario } from '../services/api';

type Especie = 'dog' | 'cat';

export default function CadastrarAnimalScreen() {
  const [nome, setNome] = useState('');
  const [especie, setEspecie] = useState<Especie | ''>('');
  const [cidade, setCidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificarPerfil() {
      try {
        const usuario = await obterUsuario();
        if (ativo) setAutorizado(usuario?.role === 'SHELTER');
      } catch {
        if (ativo) setAutorizado(false);
      } finally {
        if (ativo) setVerificando(false);
      }
    }

    verificarPerfil();
    return () => { ativo = false; };
  }, []);

  async function salvarAnimal() {
    if (carregando) return;

    if (!nome.trim() || !especie || !cidade.trim()) {
      Alert.alert('Atenção', 'Preencha nome, espécie e cidade.');
      return;
    }

    setCarregando(true);

    try {
      await cadastrarAnimal({
        name: nome.trim(),
        species: especie,
        city: cidade.trim(),
        description: descricao.trim()
      });

      Alert.alert(
        'Animal cadastrado!',
        `${nome.trim()} foi cadastrado com sucesso.`,
        [{
          text: 'OK',
          onPress: () => router.replace('/home')
        }]
      );
    } catch (erro) {
      Alert.alert(
        'Erro no cadastro',
        erro instanceof Error
          ? erro.message
          : 'Não foi possível cadastrar o animal.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.cabecalho}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={25}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <Text style={styles.cabecalhoTitulo}>Cadastrar animal</Text>
        <View style={{ width: 25 }} />
      </View>

      {verificando ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 40 }}
        />
      ) : !autorizado ? (
        <View style={styles.bloqueio}>
          <Ionicons
            name="lock-closed-outline"
            size={45}
            color={COLORS.primary}
          />

          <Text style={styles.titulo}>Acesso restrito</Text>

          <Text style={styles.subtitulo}>
            Apenas contas cadastradas como Abrigo
            podem cadastrar animais para adoção.
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.replace('/home')}
          >
            <Text style={styles.botaoTexto}>Voltar ao início</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.conteudo}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.introducao}>
              <View style={styles.icone}>
                <Ionicons
                  name="paw"
                  size={30}
                  color={COLORS.primary}
                />
              </View>

              <Text style={styles.titulo}>Um novo amigo</Text>

              <Text style={styles.subtitulo}>
                Compartilhe as informações do animal
                e ajude-o a encontrar um lar cheio de amor.
              </Text>
            </View>

            <Text style={styles.secao}>Informações básicas</Text>

            <Text style={styles.label}>Nome do animal</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Thor"
              placeholderTextColor={COLORS.placeholder}
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

            <Text style={styles.label}>Espécie</Text>

            <View style={styles.opcoes}>
              {([
                { valor: 'dog', texto: 'Cachorro' },
                { valor: 'cat', texto: 'Gato' }
              ] as const).map(item => (
                <TouchableOpacity
                  key={item.valor}
                  style={[
                    styles.opcao,
                    especie === item.valor && styles.selecionada
                  ]}
                  onPress={() => setEspecie(item.valor)}
                >
                  <Text style={[
                    styles.opcaoTexto,
                    especie === item.valor && styles.textoSelecionado
                  ]}>
                    {item.texto}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.secao}>Localização</Text>

            <Text style={styles.label}>Cidade</Text>
            <View style={styles.campoLocal}>
              <Ionicons
                name="location-outline"
                size={21}
                color={COLORS.primary}
              />
              <TextInput
                style={styles.inputLocal}
                placeholder="Ex: Erechim"
                placeholderTextColor={COLORS.placeholder}
                value={cidade}
                onChangeText={setCidade}
              />
            </View>

            <Text style={styles.secao}>Sobre o animal</Text>

            <Text style={styles.label}>Descrição (opcional)</Text>
            <TextInput
              style={[styles.input, styles.areaTexto]}
              placeholder="Conte sobre a personalidade, os hábitos e os cuidados necessários..."
              placeholderTextColor={COLORS.placeholder}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={descricao}
              onChangeText={setDescricao}
            />

            <View style={styles.aviso}>
              <Ionicons
                name="information-circle-outline"
                size={23}
                color={COLORS.primary}
              />

              <Text style={styles.avisoTexto}>
                Informe dados verdadeiros sobre o animal.
                O envio de fotos será disponibilizado futuramente.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.botao, carregando && { opacity: 0.6 }]}
              onPress={salvarAnimal}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <>
                  <Ionicons
                    name="paw"
                    size={20}
                    color={COLORS.white}
                  />
                  <Text style={styles.botaoTexto}>Cadastrar animal</Text>
                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color={COLORS.white}
                  />
                </>
              )}
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingBottom: 55
  },
  introducao: {
    alignItems: 'center',
    marginBottom: 28
  },
  icone: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14
  },
  titulo: {
    fontSize: 27,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center'
  },
  subtitulo: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 10
  },
  secao: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 17,
    marginTop: 7
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 9
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
    marginBottom: 22
  },
  opcoes: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 23
  },
  opcao: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.white
  },
  selecionada: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  opcaoTexto: {
    color: COLORS.textSecondary,
    fontWeight: 'bold'
  },
  textoSelecionado: {
    color: COLORS.white
  },
  campoLocal: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    paddingHorizontal: 15,
    height: 53,
    marginBottom: 25
  },
  inputLocal: {
    flex: 1,
    color: COLORS.text,
    marginLeft: 10
  },
  areaTexto: {
    height: 130,
    paddingTop: 15
  },
  aviso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 15,
    marginBottom: 24,
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.medium
  },
  avisoTexto: {
    flex: 1,
    color: COLORS.primaryDark,
    lineHeight: 19,
    fontSize: 12
  },
  botao: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: 18,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 11
  },
  botaoTexto: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold'
  },
  bloqueio: {
    alignItems: 'center',
    padding: 30,
    marginTop: 60,
    gap: 15
  }
});
