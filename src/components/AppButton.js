import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';

export default function AppButton({ title, onPress, kind = 'primary', disabled = false, compact = false, style }) {
  const isPrimary = kind === 'primary';
  const isDanger = kind === 'danger';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        compact && styles.compact,
        isPrimary ? styles.primary : isDanger ? styles.danger : styles.secondary,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style
      ]}
    >
      <Text style={[styles.label, (isPrimary || isDanger) ? styles.darkLabel : styles.blueLabel]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingVertical: 15, paddingHorizontal: 16, borderRadius: 12, justifyContent: 'center', alignItems: 'center', minHeight: 48, borderWidth: 1 },
  compact: { minHeight: 38, paddingVertical: 8, paddingHorizontal: 12 },
  primary: { backgroundColor: colors.blue, borderColor: colors.blue },
  secondary: { backgroundColor: colors.panel, borderColor: colors.blue },
  danger: { backgroundColor: colors.red, borderColor: colors.red },
  label: { fontWeight: '800', fontSize: 14 },
  darkLabel: { color: '#09141A' },
  blueLabel: { color: '#63CAFF' },
  pressed: { opacity: 0.82 },
  disabled: { opacity: 0.48 }
});
