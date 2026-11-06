import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, common } from '../theme';
import AppButton from '../components/AppButton';
import MenuCard from '../components/MenuCard';
const { COURSES } = require('../utils/menu');

/** Guest-facing landing screen. Never renders menu management controls. */
export default function GuestHomeScreen({ items, openMenu }) {
  return (
    <ScrollView style={common.page} contentContainerStyle={styles.body}>
      <Text style={styles.eyebrow}>CHRISTOFFEL'S PRIVATE DINING</Text>
      <Text style={styles.title}>Welcome, Guest!</Text>
      <Text style={styles.subtitle}>Discover our carefully prepared dishes and find something you'll love.</Text>
      <View style={styles.hero}>
        <View style={styles.heroDecoration}><Text style={styles.sparkle}>✦</Text></View>
        <Text style={styles.heroLabel}>TODAY'S MENU</Text>
        <Text style={styles.heroTitle}>A little something for every taste.</Text>
        <Text style={styles.heroDescription}>Explore starters, main courses, desserts and refreshing drinks.</Text>
        <AppButton title="Explore Full Menu" onPress={openMenu} style={styles.action} />
      </View>
      <View style={styles.sectionRow}>
        <Text style={common.sectionHeading}>Explore our courses</Text>
        <Text style={styles.count}>{items.length} dishes</Text>
      </View>
      <View style={styles.courseGrid}>
        {COURSES.map((name, index) => (
          <View key={name} style={styles.courseTile}>
            <Text style={styles.courseSymbol}>{['◈', '♨', '✧', '◉'][index]}</Text>
            <Text style={styles.courseName}>{name}</Text>
            <Text style={styles.courseCount}>{items.filter((item) => item.course === name).length} items</Text>
          </View>
        ))}
      </View>
      <Text style={[common.sectionHeading, styles.featured]}>Featured dishes</Text>
      {items.length === 0 ? (
        <View style={common.card}><Text style={styles.empty}>The menu is being prepared. Please visit again soon.</Text></View>
      ) : items.slice(0, 3).map((item) => <MenuCard key={item.id} item={item} readOnly />)}
      <AppButton title="View Every Dish" kind="secondary" onPress={openMenu} style={styles.action} />
      <Text style={styles.footer}>Guest view is read-only. Only the chef can edit menu information.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: 20, paddingTop: 27, paddingBottom: 45 },
  eyebrow: { color: colors.blue, fontSize: 11, fontWeight: '800', letterSpacing: 1.4 },
  title: { color: colors.text, fontSize: 32, fontWeight: '900', marginTop: 9 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 22, marginTop: 8, marginBottom: 24 },
  hero: { padding: 23, borderRadius: 21, borderWidth: 1, borderColor: colors.blue, backgroundColor: colors.blueSoft, overflow: 'hidden' },
  heroDecoration: { alignItems: 'flex-end' },
  sparkle: { color: '#5CC9F9', fontSize: 28 },
  heroLabel: { color: '#65CDFF', fontSize: 11, letterSpacing: 1.6, fontWeight: '800', marginTop: -17 },
  heroTitle: { color: colors.text, fontSize: 25, fontWeight: '900', maxWidth: 400, marginTop: 11, lineHeight: 31 },
  heroDescription: { color: colors.muted, fontSize: 13, lineHeight: 21, marginTop: 10 },
  action: { marginTop: 19 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28 },
  count: { color: colors.muted, fontSize: 12, marginBottom: 10 },
  courseGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  courseTile: { width: '48%', flexGrow: 1, backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, borderRadius: 15, padding: 14, minHeight: 105 },
  courseSymbol: { color: colors.blue, fontSize: 24 },
  courseName: { color: colors.text, marginTop: 7, fontWeight: '800', fontSize: 14 },
  courseCount: { color: colors.muted, marginTop: 3, fontSize: 12 },
  featured: { marginTop: 29 },
  empty: { color: colors.muted, lineHeight: 22 },
  footer: { color: colors.subtle, textAlign: 'center', marginTop: 24, fontSize: 12, lineHeight: 18 }
});
