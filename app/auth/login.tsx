import { Text, View, Alert, KeyboardAvoidingView, Platform, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../design-system/components/Input';
import AnimatedView from '../../design-system/animations/AnimatedView';
import { Button } from '../../design-system/components/Button';
import { loginStyles as styles } from '../../styles/screens/loginStyles';
import { useRouter } from 'expo-router';

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido.');
            return;
        }

        setLoading(true);
        try {
            const success = await login(email, password);
            if (success) {
                router.replace('/chat/select');
            } else {
                Alert.alert('Erro', 'Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView

            style={styles.container}

            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'android' ? -85 : 0}
        >
                    <ImageBackground
                        source={require('../../assets/background.png')} // ajuste caminho se necessário
                        style={styles.background}
                        resizeMode="cover"
                    />
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }} keyboardShouldPersistTaps='handled'>
                        <View style={styles.content}>
                            <AnimatedView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} duration={500} style={styles.panel}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode='contain' />
                        <Text style={styles.title}>Bem-vindo ao APP Meetstranger!</Text>
                        <Text style={styles.subtitle}>Faça login para continuar.</Text>
                        <View style={styles.inputContainer}>
                            <Input
                                label='Email'
                                value={email}
                                onChangeText={setEmail}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                placeholder='seu@gmail.com'
                            />
                            <Input
                                label='Senha'
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholder='********'
                            />
                        </View>
                        <Button 
                            title={loading ? 'Entrando...' : 'Entrar'} 
                            onPress={handleLogin} 
                            disabled={loading}
                            style={styles.loginButton}
                        />
                        <Button
                            title='Criar conta'
                            onPress={() => router.push('/auth/register')}
                            variant='secondary'
                        />
                                        </AnimatedView>
                                    </View>
                                </ScrollView>
        </KeyboardAvoidingView>

    );
}

