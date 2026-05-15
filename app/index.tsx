import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { welcomeStyles as styles } from '../styles/screens/welcomeStyles';

import { useFonts, LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';
import AnimatedView from '../design-system/animations/AnimatedView';

export default function Welcome() {
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        LuckiestGuy_400Regular,
    });

    if (!fontsLoaded) return null;

    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => router.push('/auth/login')}>
            <ImageBackground
                      source={require('../assets/background.png')} // ajuste caminho se necessário
                      style={styles.background}
                      resizeMode="cover"
                    />
                <AnimatedView from={{ opacity: 0, translateY: -10, scale: 0.9 }} animate={{ opacity: 1, translateY: 0, scale: 1 }} duration={600} style={{ alignItems: 'center' }}>
                  <Image source={require('../assets/logo.png')} resizeMode='contain' style={styles.logo} />
                </AnimatedView>
                <AnimatedView from={{ opacity: 0, translateY: 30 }} animate={{ opacity: 1, translateY: 0 }} duration={700} delay={150} style={styles.content}>
                    <Text style={styles.title}> Bem-vindo ao MeetStrangers</Text>
                    <Text style={styles.subtitle}>
                        Conecte-se com pessoas do mundo todo e converse sobre seus interesses
                    </Text>
                </AnimatedView>
        </TouchableOpacity>
    );
}
