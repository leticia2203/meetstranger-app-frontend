import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { BorderRadius,Shadows, Spacing} from "../../design-system/tokens/spacing";
import { TextStyles } from "../../design-system/tokens/typography";
export const welcomeStyles = StyleSheet.create({

  
    logo:{
      height: 260,
      width:260,
      marginLeft: 50,
      marginBottom: Spacing['2xl'],
      marginTop: Spacing.xl,
  },

  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: colors.background, // Cor de fundo padrão
  },
 
  // Área central de conteúdo
  content: {
    flex: 1, // Ocupa o espaço disponível
    paddingHorizontal: Spacing.xl, //padding lateral
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
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
  // Container dos inputs
  inputContainer: {
    width: '100%', // Ocupa toda a largura disponível
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
    color: colors.primary, // Cor secundária
    marginBottom: Spacing['4xl'], // espaçamento maior
    lineHeight: 22, // Ajuste de leitura
    textAlign: 'center', // Centraliza
    fontFamily: 'LuckiestGuy_400Regular'

  },
optionText:{...TextStyles.body, // Texto padrão
    color: colors.primary, // Cor secundária
    marginTop: Spacing['xl'],
    marginBottom: Spacing['xl'],  // espaçamento maior
    lineHeight: 18, // Ajuste de leitura
    textAlign: 'center', // Centralizar'
},
});