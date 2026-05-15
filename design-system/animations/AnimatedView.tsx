import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';

type Props = {
  children: React.ReactNode;
  from?: { opacity?: number; translateY?: number; scale?: number };
  animate?: { opacity?: number; translateY?: number; scale?: number };
  duration?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

export default function AnimatedView({ children, from, animate, duration = 500, delay = 0, style }: Props) {
  const opacity = useRef(new Animated.Value(from?.opacity ?? 0)).current;
  const translateY = useRef(new Animated.Value(from?.translateY ?? 20)).current;
  const scale = useRef(new Animated.Value(from?.scale ?? 1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: animate?.opacity ?? 1, duration, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: animate?.translateY ?? 0, duration, delay, useNativeDriver: true }),
      Animated.timing(scale, { toValue: animate?.scale ?? 1, duration, delay, useNativeDriver: true }),
    ]).start();
  }, [opacity, translateY, scale, animate, duration, delay]);

  return (
    <Animated.View
      style={[style, { opacity, transform: [{ translateY }, { scale }] }]}
    >
      {children}
    </Animated.View>
  );
}
