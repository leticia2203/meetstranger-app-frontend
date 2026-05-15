import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { chatSelectStyles as styles } from '../../styles/screens/chatSelectStyles';

const categories = [
  {
    id: 'filmes',
    name: 'Filmes',
    image: require('../../assets/filmes.png'),
    description: 'Converse sobre filmes e novidades do cinema.',
  },
  {
    id: 'series',
    name: 'Series',
    image: require('../../assets/series.png'),
    description: 'Debates sobre series, episodios e teorias.',
  },
  {
    id: 'jogos',
    name: 'Jogos',
    image: require('../../assets/jogos.png'),
    description: 'Fale sobre jogos, lancamentos e estrategias.',
  },
];

export default function ChatSelect() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (id: string) => {
    setSelectedId(id);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace({ pathname: '/chat/room', params: { category: id } });
    }, 250);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      />

      <Image
        source={require('../../assets/logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />

      <View style={styles.header}>
        <Text style={styles.title}>Escolha um topico</Text>
        <Text style={styles.subtitle}>Encontre pessoas para conversar sobre seus interesses</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selectedId === item.id ? styles.selectedCard : undefined,
            ]}
            onPress={() => handleSelect(item.id)}
            disabled={loading}
          >
            <Image source={item.image} style={styles.categoryImage} resizeMode="contain" />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.description}</Text>
            </View>
            {selectedId === item.id && loading ? (
              <ActivityIndicator color="#fff" />
            ) : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
