import { Image, ImageBackground, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../../design-system/components/Button';
import { useAuth } from '../../hooks/useAuth';
import { aboutStyles as styles } from '../../styles/screens/aboutStyles';

export default function About() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleHome = () => {
    router.push('/chat/select');
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        resizeMode="cover"
        style={styles.background}
      />

      <Image
        source={require('../../assets/logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Sobre o App</Text>
        <Text style={styles.subtitle}>Conexoes por interesses, sem complicacao.</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Image
            source={require('../../assets/about.png')}
            resizeMode="contain"
            style={styles.aboutImage}
          />
          <Text style={styles.cardTitle}>MeetStrangers</Text>
          <Text style={styles.cardDescription}>
            O Meet Strangers e um aplicativo criado para conversar com pessoas sobre seus interesses de forma rapida, privada e segura, sem salvar dados ou conversas.
          </Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <Button
          title="Voltar ao chat"
          onPress={handleHome}
          style={styles.button}
          variant="secondary"
        />
        <Button
          title="Sair"
          onPress={handleLogout}
          style={styles.button}
          variant="danger"
        />
      </View>
    </View>
  );
}
