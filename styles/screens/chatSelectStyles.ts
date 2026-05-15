import { StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';
import { BorderRadius, Shadows, Spacing } from '../../design-system/tokens/spacing';
import { TextStyles } from '../../design-system/tokens/typography';

export const chatSelectStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
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
    marginBottom: Spacing.lg,
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
  list: {
    paddingBottom: Spacing['4xl'],
    paddingTop: Spacing.md,
  },
  listContainer: {
    width: '100%',
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    marginBottom: Spacing.md,
    padding: Spacing.lg,
    width: '100%',
    ...Shadows.md,
  },
  selectedCard: {
    opacity: 0.9,
    transform: [{ scale: 0.995 }],
  },
  categoryImage: {
    height: 62,
    marginRight: Spacing.lg,
    width: 62,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    ...TextStyles.title,
    color: colors.surfaceElevated,
    fontFamily: 'TitanOne_400Regular',
    marginBottom: Spacing.xs,
    textAlign: 'left',
  },
  cardSubtitle: {
    ...TextStyles.caption,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
