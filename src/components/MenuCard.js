import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, common } from '../theme';
import AppButton from './AppButton';
const { formatPrice } = require('../utils/menu');

export default function MenuCard({ item, onEdit, onDelete, readOnly = false }) {
  return (
    <View style={[common.card, styles.card]}>
      <View style={styles.row}>
        <View style={styles.badge}><Text style={styles.icon}>✦</Text></View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
          <Text style={styles.course}>{item.course}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
      {!readOnly && (
        <View style={styles.actions}>
          <AppButton title="Edit" compact kind="secondary" onPress={() => onEdit(item)} style={styles.actionButton} />
          <AppButton title="Delete" compact kind="danger" onPress={() => onDelete(item)} style={styles.actionButton} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, gap: 14 },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  badge: { width: 48, height: 48, borderRadius: 12, backgroundColor: colors.blueSoft, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  icon: { color: colors.blue, fontSize: 24 },
  content: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 },
  name: { flex: 1, color: colors.text, fontSize: 16, fontWeight: '800' },
  price: { color: '#61C8FF', fontWeight: '800', fontSize: 14 },
  course: { color: colors.blue, marginTop: 5, fontSize: 12, fontWeight: '700' },
  description: { color: colors.muted, marginTop: 8, fontSize: 13, lineHeight: 19 },
  actions: { flexDirection: 'row', gap: 10 },
  actionButton: { flex: 1 }
});
