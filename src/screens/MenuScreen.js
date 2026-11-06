import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { common, colors } from '../theme';
import AppButton from '../components/AppButton';
import CourseFilters from '../components/CourseFilters';
import MenuCard from '../components/MenuCard';
const { searchAndFilter } = require('../utils/menu');

export default function MenuScreen({ items, readOnly = false, openAdd, openEdit, onDelete }) {
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState('All');
  const displayed = useMemo(() => searchAndFilter(items, query, course), [items, query, course]);
  const filtered = !!query.trim() || course !== 'All';

  const heading = (
    <View>
      <Text style={common.heading}>{readOnly ? 'Browse Our Menu' : 'Menu Items'}</Text>
      <Text style={common.subtitle}>{readOnly ? 'Explore our dishes, search for your favourites and filter by course.' : 'Find, update or remove a dish from your menu.'}</Text>
      {!readOnly && <AppButton title="+ Add New Dish" onPress={openAdd} style={styles.add} />}
      <TextInput
        accessibilityLabel="Search menu items"
        placeholder="Search name or description..."
        placeholderTextColor={colors.subtle}
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
        style={[common.input, styles.search]}
      />
      <CourseFilters value={course} onChange={setCourse} />
      <View style={styles.resultLine}>
        <Text style={styles.count}>{displayed.length} {displayed.length === 1 ? 'dish' : 'dishes'} {filtered ? 'found' : 'in menu'}</Text>
        {filtered && <AppButton title="Clear filters" kind="secondary" compact onPress={() => { setQuery(''); setCourse('All'); }} />}
      </View>
    </View>
  );

  return (
    <FlatList
      style={common.page}
      contentContainerStyle={styles.list}
      keyboardShouldPersistTaps="handled"
      data={displayed}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={heading}
      renderItem={({ item }) => <MenuCard item={item} readOnly={readOnly} onEdit={openEdit} onDelete={onDelete} />}
      ListEmptyComponent={
        <View style={[common.card, styles.empty]}>
          <Text style={styles.emptyIcon}>⌕</Text>
          <Text style={styles.emptyTitle}>{filtered ? 'No matching dishes' : readOnly ? 'Our menu is being prepared' : 'Your menu is empty'}</Text>
          <Text style={styles.emptyCopy}>{filtered ? 'Try another keyword or clear the course filter.' : readOnly ? 'Please check back again soon.' : 'Add a menu item to start building your collection.'}</Text>
          {!readOnly && !filtered && <AppButton title="Add First Dish" onPress={openAdd} style={styles.emptyButton} />}
        </View>
      }
    />
  );
}
const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingTop: 23, paddingBottom: 30, flexGrow: 1 },
  add: { marginTop: 20, marginBottom: 20 },
  search: { marginTop: 21, marginBottom: 13 },
  resultLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 18, minHeight: 38 },
  count: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  empty: { alignItems: 'center', padding: 30, marginTop: 8 },
  emptyIcon: { fontSize: 38, color: colors.blue },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 7 },
  emptyCopy: { color: colors.muted, marginTop: 10, fontSize: 13, lineHeight: 20, textAlign: 'center' },
  emptyButton: { marginTop: 22, width: '100%' }
});
