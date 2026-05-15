import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChatMessage } from '../../design-system/components/ChatMessage';
import { useChat } from '../../hooks/useChat';
import { colors } from '../../constants/colors';
import { chatRoomStyles as styles } from '../../styles/screens/chatRoomStyles';

const categories = [
  { id: 'filmes', name: 'Filmes', image: require('../../assets/filmes.png') },
  { id: 'jogos', name: 'Jogos', image: require('../../assets/jogos.png') },
  { id: 'series', name: 'Series', image: require('../../assets/series.png') },
];

export default function ChatRoom() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const { messages, isConnected, isMatching, partnerName, sendMessage, findNewPartner } =
    useChat(category || 'filmes');

  const categoryInfo = categories.find((cat) => cat.id === category) || categories[0];

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 50);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    sendMessage(messageText.trim());
    setMessageText('');
  };

  const statusText = isConnected
    ? `Conversando com ${partnerName}`
    : isMatching
      ? 'Procurando nova pessoa...'
      : 'Procurando pessoa...';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? -85 : 0}
    >
      <ImageBackground
        source={require('../../assets/background.png')}
        resizeMode="cover"
        style={styles.background}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/chat/select')} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Sair</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image source={categoryInfo.image} resizeMode="contain" style={styles.headerImage} />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>{categoryInfo.name}</Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, isConnected ? styles.connectedDot : styles.matchingDot]} />
              <Text style={styles.connectionStatus}>{statusText}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={findNewPartner} style={styles.headerButton}>
          <Text style={styles.headerButtonText}>Proximo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage message={item} />}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor={colors.textSecondary}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !messageText.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSendMessage}
          disabled={!messageText.trim()}
        >
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
