import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../design-system/tokens/spacing';
import { TextStyles } from '../../design-system/tokens/typography';

export const aboutStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  background: {
    bottom: 0,
    flex: 1,
    height: '100%',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
  },
  logo: {
    height: 210,
    marginBottom: Spacing.sm,
    marginTop: Spacing.xl,
    shadowColor: colors.shadow,
    width: 210,
    ...Shadows.lg,
  },
  header: {
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  title: {
    ...TextStyles.title,
    color: colors.surface,
    fontFamily: 'LuckiestGuy_400Regular',
    fontSize: 30,
    lineHeight: 34,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...TextStyles.body,
    color: colors.surfaceElevated,
    fontFamily: 'LuckiestGuy_400Regular',
    lineHeight: 22,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    padding: Spacing.xl,
    width: '100%',
    ...Shadows.md,
  },
  aboutImage: {
    height: 130,
    marginBottom: Spacing.lg,
    width: 130,
  },
  cardTitle: {
    ...TextStyles.title,
    color: colors.surfaceElevated,
    fontFamily: 'TitanOne_400Regular',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  cardDescription: {
    ...TextStyles.caption,
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
  },
  buttons: {
    paddingBottom: Spacing['4xl'],
    width: '100%',
  },
  button: {
    marginBottom: Spacing.sm,
  },
});
