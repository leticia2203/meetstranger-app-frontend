import { Platform } from 'react-native';
import React from 'react';



// Escala de tamanhos de fonte (define hierarquia visual)
export const FontSizes = {
  xs: 12,     // Texto muito pequeno (detalhes, labels)
  sm: 14,     // Texto pequeno (caption)
  md: 16,     // Texto padrão (body)
  lg: 18,     // Títulos leves
  xl: 20,     // Subtítulos
  '2xl': 24,  // Títulos maiores
  '3xl': 30,  // Heading principal
} as const; // Mantém os valores fixos e tipados

// Pesos de fonte (font-weight)
export const FontWeights = {
  regular: '400' as const,   // Peso normal
  medium: '500' as const,    // Médio (levemente destacado)
  semibold: '600' as const,  // Semi-negrito
  bold: '700' as const,      // Negrito
};

// Multiplicadores de line-height (usados para cálculo)
export const LineHeights = {
  tight: 1.2,    // Linha mais compacta (headings)
  normal: 1.4,   // Padrão
  relaxed: 1.6,  // Mais espaçada (melhor leitura)
} as const;

// Mapeamento de nomes de família de fonte para Web vs Expo (React Native)
// No Expo você deve registrar os nomes (ex: ScienceGrotesque_400Regular) usando useFonts
// no App.tsx; aqui mapeamos para o nome que você usará nos estilos.
export const FontFamilies = {
  // use 'ScienceGrotesque_400Regular' ao registrar com useFonts
  scienceGrotesqueRegular:
    Platform.OS === 'web' ? 'Science Grotesque, sans-serif' : 'ScienceGrotesque_400Regular',
  // se você registrar a versão bold (700), use 'ScienceGrotesque_700Bold'
  scienceGrotesqueBold:
    Platform.OS === 'web' ? 'Science Grotesque, sans-serif' : 'ScienceGrotesque_700Bold',
  secondary:
    Platform.OS === 'web' ? 'Titan One, sans-serif' : 'TitanOne_400Regular',
} as const;

export type FontFamilyKey = keyof typeof FontFamilies;

// Função auxiliar para calcular lineHeight absoluto
// Recebe o tamanho da fonte e o multiplicador
// Math.round evita valores quebrados (ex: 22.4 → 22)
const lh = (size: number, ratio: number) => Math.round(size * ratio);

// Estilos tipográficos prontos (reutilizáveis no app)
export const TextStyles = {

  // Heading principal
  h1: {
    fontSize: FontSizes['3xl'], // 30px
    fontWeight: FontWeights.bold, // Negrito
    lineHeight: lh(FontSizes['3xl'], LineHeights.tight), // 30 * 1.2 = 36
  },

  // Heading secundário
  h2: {
    fontSize: FontSizes['2xl'], // 24px
    fontWeight: FontWeights.bold,
    lineHeight: lh(FontSizes['2xl'], LineHeights.tight), // 24 * 1.2 = 29
  },

  // Heading terciário
  h3: {
    fontSize: FontSizes.xl, // 20px
    fontWeight: FontWeights.semibold,
    lineHeight: lh(FontSizes.xl, LineHeights.normal), // 20 * 1.4 = 28
  },

  // Títulos de seção
  title: {
    fontSize: FontSizes.lg, // 18px
    fontWeight: FontWeights.semibold,
    lineHeight: lh(FontSizes.lg, LineHeights.normal), // 18 * 1.4 = 25
  },

  // Texto padrão do app
  body: {
    fontSize: FontSizes.md, // 16px
    fontWeight: FontWeights.semibold,
    lineHeight: lh(FontSizes.md, LineHeights.relaxed), // 16 * 1.6 = 26
  },

  // Legendas e textos auxiliares
  caption: {
    fontSize: FontSizes.sm, // 14px
    fontWeight: FontWeights.regular,
    lineHeight: lh(FontSizes.sm, LineHeights.normal), // 14 * 1.4 = 20
  },

  // Texto muito pequeno
  small: {
    fontSize: FontSizes.xs, // 12px
    fontWeight: FontWeights.regular,
    lineHeight: lh(FontSizes.xs, LineHeights.normal), // 12 * 1.4 = 17
  },

  // Texto de botões
  button: {
    fontSize: FontSizes.md, // 16px
    fontWeight: FontWeights.medium, // Destaque leve
    lineHeight: lh(FontSizes.md, LineHeights.normal), // 16 * 1.4 = 22
  },
} as const;
