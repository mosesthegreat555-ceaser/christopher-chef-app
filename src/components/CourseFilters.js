import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors } from '../theme';
const { COURSES } = require('../utils/menu');

export default function CourseFilters({ value, onChange }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
      {['All', ...COURSES].map((course) => (
        <Pressable
          key={course}
          accessibilityRole="button"
          accessibilityState={{ selected: value === course }}
          onPress={() => onChange(course)}
          style={[styles.chip, value === course && styles.active]}
        >
          <Text style={[styles.text, value === course && styles.activeText]}>{course}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8, paddingVertical: 5, paddingRight: 20 },
  chip: { backgroundColor: colors.panel, borderRadius: 20, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 10 },
  active: { backgroundColor: colors.blue, borderColor: colors.blue },
  text: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  activeText: { color: '#061A26' }
});
