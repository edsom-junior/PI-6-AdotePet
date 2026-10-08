
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  StatusBar,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  FONTS,
  SPACING,
  RADIUS,
  globalStyles,
} from '../styles/theme';

export default function DetalhesScreen() {
  const params = useLocalSearchParams();

  const nome = String(params.nome || 'Thor');
  const tipo = String(params.tipo || 'Cachorro');
  const idade = String(params.idade || '2 anos');
  const sexo = String(params.sexo || 'Macho');
  const cidade = String(params.cidade || 'Erechim - RS');
  const emoji = String(params.emoji || '🐶');

  const fotos: Record<string, string> = {
    Thor: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=900',
    Luna: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=900',
    Bob: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900',
    Mel: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=900',
  };

  const foto = String(params.foto || fotos[nome] || '');

  const porte =
    tipo === 'Gato'
      ? 'Pequeno'
      : nome === 'Bob'
      ? 'Grande'
      : 'Médio';

  const descricao =
    nome === 'Thor'
      ? 'Thor é um cachorro carinhoso, brincalhão e cheio de energia. Ele adora passeios e procura uma família que possa oferecer atenção, cuidado e muito carinho.'
      : nome === 'Luna'
      ? 'Luna é uma gatinha tranquila e muito companheira. Gosta de ambientes calmos, de receber carinho e de descansar em lugares aconchegantes.'
      : nome === 'Bob'
      ? 'Bob é um cachorro amigável, esperto e cheio de personalidade. Adora passeios e momentos ao ar livre. Está esperando uma família para compartilhar novas aventuras.'
      : nome === 'Mel'
      ? 'Mel é uma gatinha jovem, curiosa e brincalhona. Muito dócil, gosta de explorar os ambientes e está pronta para conhecer seu novo lar.'
      : 'Este animal está esperando uma família que possa oferecer carinho, atenção e os cuidados necessários para uma vida feliz.';

  function queroAdotar() {
    Alert.alert(
      'Interesse na adoção',
      `Você demonstrou interesse em adotar ${nome}. Em breve, esta funcionalidade permitirá entrar em contato com o responsável pelo animal.`,
      [{ text: 'Entendi', style: 'default' }]
    );
  }

  return (
    <View style={globalStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
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
            Detalhes do animal
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* FOTO */}
        <View style={styles.imageContainer}>
          {foto ? (
            <Image
              source={{ uri: foto }}
              style={styles.animalImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.emoji}>{emoji}</Text>
          )}

          <View style={styles.imageBadge}>
            <Ionicons
              name="paw"
              size={13}
              color={COLORS.primary}
            />
            <Text style={styles.imageBadgeText}>
              Disponível para adoção
            </Text>
          </View>
        </View>

        {/* IDENTIFICAÇÃO */}
        <View style={styles.nameSection}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{nome}</Text>

            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>
                {tipo}
              </Text>
            </View>
          </View>

          <Text style={styles.introduction}>
            Conheça um pouco mais sobre {nome} e descubra
            se vocês podem formar uma nova amizade.
          </Text>
        </View>

        {/* INFORMAÇÕES */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <View style={styles.infoIconBox}>
              <Ionicons
                name="calendar-outline"
                size={22}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.infoTitle}>Idade</Text>
            <Text style={styles.infoValue}>{idade}</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIconBox}>
              <Ionicons
                name={
                  sexo === 'Fêmea'
                    ? 'female-outline'
                    : 'male-outline'
                }
                size={22}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.infoTitle}>Sexo</Text>
            <Text style={styles.infoValue}>{sexo}</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIconBox}>
              <Ionicons
                name="resize-outline"
                size={22}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.infoTitle}>Porte</Text>
            <Text style={styles.infoValue}>{porte}</Text>
          </View>
        </View>

        {/* LOCALIZAÇÃO */}
        <View style={styles.locationBox}>
          <View style={styles.locationIcon}>
            <Ionicons
              name="location-outline"
              size={22}
              color={COLORS.primary}
            />
          </View>

          <View>
            <Text style={styles.locationLabel}>
              Localização
            </Text>
            <Text style={styles.locationText}>
              {cidade}
            </Text>
          </View>
        </View>

        {/* SOBRE O ANIMAL */}
        <Text style={styles.sectionTitle}>
          Sobre {nome}
        </Text>

        <Text style={styles.description}>
          {descricao}
        </Text>

        {/* ADOÇÃO RESPONSÁVEL */}
        <View style={styles.notice}>
          <View style={styles.noticeHeader}>
            <Ionicons
              name="heart-outline"
              size={21}
              color={COLORS.primary}
            />

            <Text style={styles.noticeTitle}>
              Adoção responsável
            </Text>
          </View>

          <Text style={styles.noticeText}>
            Adotar é assumir um compromisso de cuidado,
            respeito e carinho durante toda a vida do animal.
            Antes de adotar, considere sua rotina, seu espaço
            e as necessidades do novo companheiro.
          </Text>
        </View>

        {/* BOTÃO DE ADOÇÃO */}
        <TouchableOpacity
          style={styles.adoptButton}
          activeOpacity={0.85}
          onPress={queroAdotar}
        >
          <Ionicons
            name="heart"
            size={21}
            color={COLORS.white}
          />

          <Text style={styles.adoptButtonText}>
            Tenho interesse em adotar
          </Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Um novo começo pode transformar duas vidas.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 55,
    paddingBottom: 50,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
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
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  headerSpacer: {
    width: 43,
  },

  imageContainer: {
    height: 285,
    borderRadius: RADIUS.extraLarge,
    overflow: 'hidden',
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 23,
  },

  animalImage: {
    width: '100%',
    height: '100%',
  },

  emoji: {
    fontSize: 100,
  },

  imageBadge: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  imageBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  nameSection: {
    marginBottom: 25,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },

  typeBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
  },

  typeBadgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },

  introduction: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    lineHeight: 21,
  },

  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 20,
  },

  infoCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 15,
    paddingHorizontal: 5,
    alignItems: 'center',
  },

  infoIconBox: {
    width: 43,
    height: 43,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  infoTitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },

  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
    marginBottom: 30,
  },

  locationIcon: {
    width: 45,
    height: 45,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  locationLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  locationText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: 28,
  },

  notice: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.large,
    padding: 18,
    marginBottom: 25,
  },

  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 10,
  },

  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },

  noticeText: {
    fontSize: 13,
    color: COLORS.primary,
    lineHeight: 21,
  },

  adoptButton: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.medium,
    paddingVertical: 18,
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  adoptButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    flexShrink: 1,
  },

  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
});
