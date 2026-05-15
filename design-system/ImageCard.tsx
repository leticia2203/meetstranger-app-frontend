import React from 'react';
import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
  containerStyle?: object;
  titleStyle?: object;
  descriptionStyle?: object;
};

export default function AboutCard({
  title = 'Sobre',
  description = '',
  image,
  containerStyle,
  titleStyle,
  descriptionStyle,
}: Props) {
  const img = image ?? require('../../assets/images/about.png');

  return (
    <View style={[styles.card, containerStyle]}>
      <Image source={img} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={[styles.title, titleStyle]} numberOfLines={2}>
          {title}
        </Text>
        {description ? (
          <Text style={[styles.description, descriptionStyle]} numberOfLines={3}>
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    // Se estiver usando tokens de fonte, descomente e ajuste:
    // fontFamily: fontes.scienceGrotesqueRegular
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    color: '#444',
  },
});