import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors, common } from '../theme';
import StatTile from '../components/StatTile';
const { COURSES, formatPrice } = require('../utils/menu');

export default function StatsScreen({ stats }) {
  return (
    <ScrollView style={common.page} contentContainerStyle={common.body}>
      <Text style={common.heading}>Menu Statistics</Text>
      <Text style={common.subtitle}>A useful summary of the dishes currently saved in your menu.</Text>
      <View style={styles.grid}>
        <StatTile label="Total dishes" value={String(stats.totalItems)} caption="All courses combined" />
        <StatTile label="Average price" value={formatPrice(stats.averagePrice)} caption="Mean dish price" />
        <StatTile label="Sum of prices" value={formatPrice(stats.totalMenuValue)} caption="Not restaurant sales" />
        <StatTile label="Active courses" value={String(COURSES.filter((c) => stats.counts[c] > 0).length)} caption="Courses with dishes" />
      </View>
      <Text style={[common.sectionHeading, styles.section]}>Dishes per course</Text>
      <View style={common.card}>
        {COURSES.map((course) => {
          const count = stats.counts[course];
          const percent = stats.totalItems ? count / stats.totalItems * 100 : 0;
          return (
            <View key={course} style={styles.chartRow}>
              <View style={styles.chartLabelRow}>
                <Text style={styles.chartLabel}>{course}</Text>
                <Text style={styles.chartValue}>{count} ({Math.round(percent)}%)</Text>
              </View>
              <View style={styles.track}><View style={[styles.fill, { width: `${percent}%` }]} /></View>
            </View>
          );
        })}
      </View>
      <Text style={[common.sectionHeading, styles.section]}>Price insights</Text>
      <View style={common.card}>
        <View style={styles.insight}>
          <Text style={styles.insightLabel}>Most affordable dish</Text>
          <Text style={styles.insightValue}>{stats.cheapest ? `${stats.cheapest.name} · ${formatPrice(stats.cheapest.price)}` : 'No dishes yet'}</Text>
        </View>
        <View style={common.divider} />
        <View style={styles.insight}>
          <Text style={styles.insightLabel}>Highest-priced dish</Text>
          <Text style={styles.insightValue}>{stats.mostExpensive ? `${stats.mostExpensive.name} · ${formatPrice(stats.mostExpensive.price)}` : 'No dishes yet'}</Text>
        </View>
      </View>
      <Text style={styles.note}>Statistics update automatically when a dish is added, edited or deleted.</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  grid: { marginTop: 22, flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  section: { marginTop: 28 },
  chartRow: { marginBottom: 19 },
  chartLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  chartLabel: { color: colors.text, fontSize: 13, fontWeight: '700' },
  chartValue: { color: colors.muted, fontSize: 12 },
  track: { height: 9, borderRadius: 8, backgroundColor: colors.elevated, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: colors.blue, borderRadius: 8 },
  insight: { paddingVertical: 15, gap: 8 },
  insightLabel: { color: colors.muted, fontSize: 12 },
  insightValue: { color: colors.text, fontSize: 15, fontWeight: '800' },
  note: { color: colors.subtle, fontSize: 12, lineHeight: 18, marginTop: 18, marginBottom: 25 }
});
