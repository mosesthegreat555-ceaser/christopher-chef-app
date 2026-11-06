import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, common } from '../theme';

export default function StatTile({ label, value, caption }) {
  return (
    <View style={[common.card, styles.container]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {!!caption && <Text style={styles.caption}>{caption}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexGrow: 1, flexBasis: '44%', minWidth: 130, gap: 6 },
  label: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  value: { color: colors.text, fontSize: 25, fontWeight: '800' },
  caption: { color: colors.subtle, fontSize: 11 }
});
