import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '../tokens/colors';
import { TextStyles } from '../tokens/typography';
import { BorderRadius, Layout, Spacing } from '../tokens/spacing';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}: ButtonProps) {
  const handlePress = () => {
    if (!disabled && !loading) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      <Text
        style={[
          styles.text,
          styles[`${variant}Text`],
          styles[`${size}Text`],
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {loading ? 'Carregando...' : title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderColor: Colors.textPrimary,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 3,
    elevation: 7,
    justifyContent: 'center',
    minHeight: Layout.minTouchTarget,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  primary: {
    backgroundColor: Colors.surfaceElevated,
  },
  secondary: {
    backgroundColor: Colors.surface,
  },
  ghost: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  danger: {
    backgroundColor: Colors.error,
  },
  sm: {
    minHeight: 44,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  md: {
    minHeight: 52,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  lg: {
    minHeight: 56,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
  },
  disabled: {
    backgroundColor: Colors.border,
    elevation: 2,
    opacity: 1,
    shadowOffset: { width: 0, height: 2 },
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    ...TextStyles.button,
    fontFamily: 'TitanOne_400Regular',
    includeFontPadding: false,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  primaryText: {
    color: Colors.textPrimary,
  },
  secondaryText: {
    color: '#ffffff',
  },
  ghostText: {
    color: Colors.textButton,
  },
  dangerText: {
    color: Colors.background,
  },
  disabledText: {
    color: Colors.textTertiary,
  },
  smText: {
    fontSize: 13,
    lineHeight: 16,
  },
  mdText: {
    fontSize: 15,
    lineHeight: 18,
  },
  lgText: {
    fontSize: 17,
    lineHeight: 20,
  },
});
