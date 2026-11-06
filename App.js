import '@expo/metro-runtime';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from './src/theme';
import { useMenuStore } from './src/hooks/useMenuStore';
import LoginScreen from './src/screens/LoginScreen';
import GuestHomeScreen from './src/screens/GuestHomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import EditorScreen from './src/screens/EditorScreen';
import StatsScreen from './src/screens/StatsScreen';
const { menuStatistics } = require('./src/utils/menu');
const { validateDemoChef } = require('./src/utils/auth');

const CHEF_NAV = [
  { key: 'home', label: 'Home', glyph: '⌂' },
  { key: 'menu', label: 'Manage Menu', glyph: '▤' },
  { key: 'stats', label: 'Statistics', glyph: '▥' }
];
const GUEST_NAV = [
  { key: 'discover', label: 'Discover', glyph: '✦' },
  { key: 'menu', label: 'Browse Menu', glyph: '▤' }
];

function AppContent() {
  const insets = useSafeAreaInsets();
  const { items, loaded, storageError, addItem, updateItem, deleteItem } = useMenuStore();
  const [role, setRole] = useState(null); // null -> login; 'chef' -> full management; 'guest' -> read only
  const [tab, setTab] = useState('home');
  const [editor, setEditor] = useState(null);
  const [notice, setNotice] = useState('');
  const stats = useMemo(() => menuStatistics(items), [items]);
  const isChef = role === 'chef';
  const nav = isChef ? CHEF_NAV : GUEST_NAV;

  function loginChef(username, password) {
    if (!validateDemoChef(username, password)) return false;
    setRole('chef');
    setEditor(null);
    setTab('home');
    setNotice('Welcome back, Chef!');
    return true;
  }
  function enterGuest() {
    setRole('guest');
    setEditor(null);
    setTab('discover');
    setNotice('Welcome! Browse our menu below.');
  }
  function logout() {
    setRole(null);
    setEditor(null);
    setTab('home');
    setNotice('');
  }
  function openAdd() { if (isChef) setEditor({ mode: 'add' }); }
  function openEdit(item) { if (isChef) setEditor({ mode: 'edit', itemId: item.id }); }
  function save(data) {
    if (!isChef || !editor) return;
    if (editor.mode === 'edit') {
      updateItem(editor.itemId, data);
      setNotice('Menu item updated successfully.');
    } else {
      addItem(data);
      setNotice('New dish added successfully.');
    }
    setEditor(null);
    setTab('menu');
  }
  function remove(item) {
    if (!isChef) return;
    const confirmDelete = () => {
      deleteItem(item.id);
      setNotice(`“${item.name}” was deleted.`);
    };
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm(`Delete "${item.name}" from the menu?`)) confirmDelete();
    } else {
      Alert.alert('Delete menu item?', `Remove "${item.name}"? This cannot be undone.`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: confirmDelete }
      ]);
    }
  }

  const editingItem = editor?.mode === 'edit' ? items.find((item) => item.id === editor.itemId) : null;
  return (
    <View style={styles.background}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.frame, { paddingTop: Platform.OS === 'web' ? 0 : insets.top }]}>
        {!role ? (
          <LoginScreen onChefLogin={loginChef} onGuestEnter={enterGuest} />
        ) : (
          <>
            <View style={styles.topBar}>
              <View style={styles.logo}><Text style={styles.logoText}>C</Text></View>
              <View style={styles.topHeading}>
                <Text style={styles.appName}>CHRISTOFFEL'S</Text>
                <Text style={styles.tag}>{isChef ? 'CHEF MANAGEMENT' : 'GUEST DINING EXPERIENCE'}</Text>
              </View>
              <View style={styles.roleBadge}><Text style={styles.roleBadgeText}>{isChef ? 'CHEF' : 'GUEST'}</Text></View>
              <Pressable accessibilityRole="button" accessibilityLabel="Sign out and change role" onPress={logout} style={styles.logout}>
                <Text style={styles.logoutText}>Sign out</Text>
              </Pressable>
            </View>
            {!loaded ? (
              <View style={styles.loading}><ActivityIndicator color={colors.blue} size="large" /><Text style={styles.loadingLabel}>Loading the menu...</Text></View>
            ) : (
              <>
                {!!storageError && <View style={styles.warning}><Text style={styles.warningText}>{storageError}</Text></View>}
                {!!notice && (
                  <Pressable onPress={() => setNotice('')} accessibilityRole="button" accessibilityLabel="Dismiss confirmation message" style={styles.notice}>
                    <Text style={styles.noticeText}>✓ {notice}</Text><Text style={styles.noticeText}>×</Text>
                  </Pressable>
                )}
                <View style={styles.screen}>
                  {isChef && editor ? (
                    editingItem || editor.mode === 'add' ?
                      <EditorScreen key={editor.itemId || 'new'} item={editingItem} onCancel={() => setEditor(null)} onSave={save} /> :
                      <View style={styles.loading}><Text style={styles.loadingLabel}>This dish no longer exists.</Text><Pressable onPress={() => setEditor(null)}><Text style={styles.link}>Back to menu</Text></Pressable></View>
                  ) : isChef ? (
                    tab === 'home' ? <HomeScreen items={items} stats={stats} openAdd={openAdd} openMenu={() => setTab('menu')} openStats={() => setTab('stats')} /> :
                    tab === 'menu' ? <MenuScreen items={items} openAdd={openAdd} openEdit={openEdit} onDelete={remove} /> :
                    <StatsScreen stats={stats} />
                  ) : (
                    tab === 'discover' ? <GuestHomeScreen items={items} openMenu={() => setTab('menu')} /> :
                    <MenuScreen key="guest-menu" readOnly items={items} />
                  )}
                </View>
                <View style={[styles.bottomNav, { paddingBottom: Platform.OS === 'web' ? 8 : Math.max(8, insets.bottom) }]}>
                  {nav.map((entry) => (
                    <Pressable accessibilityRole="tab" accessibilityLabel={`${entry.label} screen`} accessibilityState={{ selected: tab === entry.key && !editor }} key={entry.key} style={styles.navEntry} onPress={() => { setEditor(null); setTab(entry.key); }}>
                      <Text style={[styles.navGlyph, tab === entry.key && !editor && styles.navActive]}>{entry.glyph}</Text>
                      <Text style={[styles.navLabel, tab === entry.key && !editor && styles.navActive]}>{entry.label}</Text>
                    </Pressable>
                  ))}
                </View>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
}

export default function App() {
  return <SafeAreaProvider><AppContent /></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: colors.background },
  frame: { flex: 1, alignSelf: 'center', width: '100%', maxWidth: 880, backgroundColor: colors.background, borderLeftWidth: Platform.OS === 'web' ? 1 : 0, borderRightWidth: Platform.OS === 'web' ? 1 : 0, borderColor: colors.border },
  topBar: { minHeight: 66, paddingHorizontal: 13, borderBottomWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', gap: 9 },
  logo: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.blue },
  logoText: { color: '#031924', fontWeight: '900', fontSize: 22 },
  topHeading: { flex: 1, minWidth: 0 },
  appName: { color: colors.text, fontWeight: '800', fontSize: 12, letterSpacing: 1.2 },
  tag: { color: colors.muted, fontSize: 9, letterSpacing: 0.7, marginTop: 3 },
  roleBadge: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.elevated, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 },
  roleBadgeText: { color: colors.green, fontWeight: '800', letterSpacing: 0.8, fontSize: 9 },
  logout: { borderWidth: 1, borderColor: colors.border, borderRadius: 9, paddingVertical: 9, paddingHorizontal: 8 },
  logoutText: { color: colors.text, fontSize: 11, fontWeight: '700' },
  screen: { flex: 1 },
  bottomNav: { flexDirection: 'row', borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.panel, paddingTop: 8 },
  navEntry: { flex: 1, alignItems: 'center', gap: 3, minHeight: 48 },
  navGlyph: { fontSize: 22, color: colors.subtle, height: 25 },
  navLabel: { color: colors.muted, fontWeight: '700', fontSize: 11 },
  navActive: { color: colors.blue },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 15 },
  loadingLabel: { color: colors.muted, textAlign: 'center' },
  link: { color: colors.blue, fontWeight: '700' },
  warning: { padding: 9, backgroundColor: '#4A3227' },
  warningText: { color: '#FFE4C0', textAlign: 'center', fontSize: 12 },
  notice: { backgroundColor: '#163D32', paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  noticeText: { color: '#AAFFE0', fontSize: 12, fontWeight: '700', flexShrink: 1 }
});
