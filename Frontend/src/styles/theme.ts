
import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#315C43',
  primaryDark: '#243D2D',
  primaryLight: '#DDEADC',

  background: '#F6F7F3',
  white: '#FFFFFF',

  text: '#263D2E',
  textSecondary: '#78867B',
  placeholder: '#929B94',

  border: '#E8EEE8',
  card: '#FFFFFF',

  success: '#4F8A5B',
  danger: '#C65D5D',
};

export const FONTS = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 20,
  title: 28,
};

export const SPACING = {
  xs: 5,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 30,
};

export const RADIUS = {
  small: 8,
  medium: 12,
  large: 17,
  extraLarge: 22,
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: SPACING.lg,
    paddingTop: 50,
    paddingBottom: 100,
  },

  title: {
    fontSize: FONTS.title,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.large,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.medium,
    padding: SPACING.md,
    fontSize: FONTS.regular,
    color: COLORS.text,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.medium,
    fontWeight: 'bold',
  },

  secondaryButton: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: RADIUS.medium,
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: FONTS.medium,
    fontWeight: 'bold',
  },
});
