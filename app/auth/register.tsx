import { Text, View, Alert, KeyboardAvoidingView, Platform, Image, ImageBackground, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../design-system/components/Input';
import AnimatedView from '../../design-system/animations/AnimatedView';
import { Button } from '../../design-system/components/Button';
import { registerStyles as styles} from '../../styles/screens/registerStyle';
import { useRouter } from 'expo-router';

export default function Register() {
    const router = useRouter();
    const { register } = useAuth();
    const [name, setName] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Erro', 'Por favor, insira um email válido.');
            return;
        }
        if (password.length < 8) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
        
        setLoading(true);
        try {
            const success = await register(name, email, password);
            if (success) {
                router.replace('/chat/select');
            } else {
                Alert.alert('Erro', 'Não foi possível registrar. Tente novamente.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar registrar. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
        >
            {/* background is absolute in styles, keep it outside layout stack */}
            <ImageBackground
                source={require('../../assets/background.png')}
                style={styles.background}
                resizeMode="cover"
            />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <AnimatedView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} duration={500} style={styles.panel}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
                        <Text style={styles.title}>Crie sua conta</Text>
                        <Text style={styles.subtitle}>Junte-se ao MeetStranger</Text>

                        <View style={styles.inputContainer}>
                            <Input label="Nome" value={name} onChangeText={setName} placeholder="Seu nome de usuário" />
                            <Input label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholder="seu@gmail.com" />
                            <Input label="Senha" value={password} onChangeText={setPassword} secureTextEntry placeholder="********" />
                            <Input label="Confirmar Senha" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholder="********" />
                        </View>

                        <Button title={loading ? 'Registrando...' : 'Registrar'} onPress={handleRegister} disabled={loading} style={styles.registerButton} />

                        <Button title="Já tem uma conta? Faça login" onPress={() => router.push('/auth/login')} variant="secondary" />
                    </AnimatedView>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
        
}
