import { Stack } from 'expo-router';
import { useFonts, LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';
import { TitanOne_400Regular } from '@expo-google-fonts/titan-one';
import { AuthProvider } from '../hooks/useAuth';

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		LuckiestGuy_400Regular,
		TitanOne_400Regular,
	});

	if (!fontsLoaded) return null;

	return (
		<AuthProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</AuthProvider>
	);
}
