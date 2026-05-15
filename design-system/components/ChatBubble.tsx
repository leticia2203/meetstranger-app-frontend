import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../tokens/colors';
import { BorderRadius, Spacing } from '../tokens/spacing';

export type ChatBubblePosition = 'left' | 'right';

interface ChatBubbleProps {
  message: string;
  position: ChatBubblePosition;
  timestamp?: string;
  username?: string;
  showUsername?: boolean;
}

export function ChatBubble({
  message,
  position,
  timestamp,
  username,
  showUsername = false,
}: ChatBubbleProps) {
  const isUser = position === 'right';

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.otherContainer]}>
      {showUsername && username && !isUser && (
        <Text style={styles.username}>{username}</Text>
      )}

      <View style={[styles.bubble, isUser ? styles.userBubble : styles.otherBubble]}>
        <Text style={[styles.message, isUser ? styles.userMessage : styles.otherMessage]}>
          {message}
        </Text>

        {timestamp && (
          <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.otherTimestamp]}>
            {timestamp}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  otherContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    borderColor: Colors.textPrimary,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 3,
    elevation: 4,
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  userBubble: {
    backgroundColor: Colors.chat.userBubble,
    borderBottomRightRadius: Spacing.xs,
  },
  otherBubble: {
    backgroundColor: Colors.chat.otherBubble,
    borderBottomLeftRadius: Spacing.xs,
  },
  username: {
    color: Colors.textSecondary,
    fontFamily: 'TitanOne_400Regular',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  message: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  userMessage: {
    color: Colors.chat.userText,
  },
  otherMessage: {
    color: Colors.chat.otherText,
  },
  timestamp: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: Spacing.xs,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'right',
  },
  otherTimestamp: {
    color: Colors.textTertiary,
    textAlign: 'left',
  },
});
