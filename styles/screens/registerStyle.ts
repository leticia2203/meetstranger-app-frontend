import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { BorderRadius,Shadows, Spacing} from "../../design-system/tokens/spacing";
import { TextStyles } from "../../design-system/tokens/typography";
export const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
  content: {
    flex: 1, // Ocupa o espaço disponível
    paddingHorizontal: Spacing.xl, //padding lateral
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  // Painel escuro/transparente para destacar o formulário
  panel: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
  },
  logo: {
    width: 240,  // Tamanho fixo da imagem (mantido)
    height: 240, // Mantém proporção quadrada
    marginBottom: Spacing.xl, //espaço abaixo
    ...Shadows.lg, // shadow manual → padronizado
    shadowColor: colors.shadow, // Garante cor correta da sombra
   },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
 // Título principal
  title: {
    ...TextStyles.title,
    fontSize:30, // Tipografia base // Destaque
    color: colors.primary, // Cor principal
    marginBottom: Spacing.sm, //  espaço abaixo
    letterSpacing: -0.2, // Ajuste fino
    lineHeight: 26, // Mantido para não quebrar layout
    textAlign: 'center', // Centraliza texto
    fontFamily: 'LuckiestGuy_400Regular', // família de fonte adicionada
  },
 
  // Subtítulo
  subtitle: {
    ...TextStyles.body, // Texto padrão
    color: colors.textSecondary, // Cor secundária
    marginBottom: Spacing['4xl'], // espaçamento maior
    lineHeight: 22, // Ajuste de leitura
    textAlign: 'center', // Centraliza
    fontFamily: 'LuckiestGuy_400Regular'
  },
inputContainer: {
    width: '100%'
},
registerButton: {
    marginBottom: Spacing.sm,
    marginTop: Spacing.xl,
    color: colors.surface
},
});
