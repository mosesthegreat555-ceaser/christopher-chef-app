import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { common, colors } from '../theme';
import AppButton from '../components/AppButton';
import MenuCard from '../components/MenuCard';
import StatTile from '../components/StatTile';
const { formatPrice } = require('../utils/menu');

export default function HomeScreen({ items, stats, openAdd, openMenu, openStats }) {
  const latestItems = [...items].sort((a, b) => b.createdAt - a.createdAt).slice(0, 2);
  return (
    <ScrollView style={common.page} contentContainerStyle={common.body} keyboardShouldPersistTaps="handled">
      <Text style={styles.eyebrow}>PRIVATE CULINARY MANAGEMENT</Text>
      <Text style={styles.brand}>Chef Christoffel</Text>
      <View style={styles.rule} />
      <View style={[common.card, styles.hero]}>
        <Text style={styles.heroTitle}>Welcome, Chef!</Text>
        <Text style={styles.heroText}>Create your menu, manage your dishes and keep everything organised for your culinary events.</Text>
        <AppButton title="+ Add Menu Item" onPress={openAdd} style={styles.heroButton} />
        <AppButton title="View Menu Items" kind="secondary" onPress={openMenu} />
      </View>

      <Text style={[common.sectionHeading, styles.section]}>Menu at a glance</Text>
      <View style={styles.stats}>
        <StatTile label="Total dishes" value={String(stats.totalItems)} caption="Available on your menu" />
        <StatTile label="Average price" value={formatPrice(stats.averagePrice)} caption="Across all dishes" />
      </View>
      <AppButton title="Open Menu Statistics" kind="secondary" onPress={openStats} style={styles.fullButton} />

      <Text style={[common.sectionHeading, styles.section]}>Recently added</Text>
      {latestItems.length ? latestItems.map((item) => <MenuCard key={item.id} item={item} readOnly />) : (
        <View style={common.card}><Text style={styles.empty}>No dishes yet. Add your first menu item to get started.</Text></View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  eyebrow: { color: colors.blue, letterSpacing: 2, fontSize: 10, fontWeight: '800', textAlign: 'center', marginTop: 16 },
  brand: { color: colors.text, fontWeight: '800', fontSize: 31, letterSpacing: -0.6, textAlign: 'center', marginTop: 10 },
  rule: { width: 72, height: 3, backgroundColor: colors.blue, borderRadius: 3, alignSelf: 'center', marginTop: 17, marginBottom: 25 },
  hero: { padding: 22, alignItems: 'stretch' },
  heroTitle: { color: colors.text, fontSize: 21, fontWeight: '800', textAlign: 'center' },
  heroText: { color: colors.muted, fontSize: 14, lineHeight: 22, textAlign: 'center', marginTop: 12, marginBottom: 22 },
  heroButton: { marginBottom: 11 },
  section: { marginTop: 28 },
  stats: { flexDirection: 'row', gap: 12 },
  fullButton: { marginTop: 13 },
  empty: { color: colors.muted, lineHeight: 21 }
});
