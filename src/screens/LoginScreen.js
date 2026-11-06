import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, common } from '../theme';
import AppButton from '../components/AppButton';

/** Presentation-friendly entry page; chef credentials are local DEMO credentials, not production security. */
export default function LoginScreen({ onChefLogin, onGuestEnter }) {
  const [selected, setSelected] = useState('chef');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function changeRole(role) { setSelected(role); setError(''); }
  function signIn() {
    if (!username.trim() || !password) {
      setError('Enter your chef username and password.');
      return;
    }
    if (!onChefLogin(username, password)) {
      setError('Incorrect demo login. Use the details shown below.');
      setPassword('');
      return;
    }
    setError('');
  }

  return (
    <KeyboardAvoidingView style={common.page} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.monogram}><Text style={styles.monogramText}>C</Text></View>
        <Text style={styles.eyebrow}>PRIVATE CULINARY EXPERIENCE</Text>
        <Text style={styles.title}>Chef Christoffel</Text>
        <Text style={styles.description}>Welcome to Christoffel's. Choose how you would like to enter.</Text>
        <View style={styles.rule} />

        <View style={styles.roleRow}>
          <Pressable accessibilityRole="button" accessibilityLabel="Select chef login" accessibilityState={{ selected: selected === 'chef' }} onPress={() => changeRole('chef')} style={[styles.roleCard, selected === 'chef' && styles.selected]}>
            <Text style={styles.roleIcon}>♨</Text>
            <Text style={styles.roleTitle}>I'm the chef</Text>
            <Text style={styles.roleCaption}>Manage dishes & statistics</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel="Select guest access" accessibilityState={{ selected: selected === 'guest' }} onPress={() => changeRole('guest')} style={[styles.roleCard, selected === 'guest' && styles.selected]}>
            <Text style={styles.roleIcon}>✦</Text>
            <Text style={styles.roleTitle}>I'm a guest</Text>
            <Text style={styles.roleCaption}>Browse the dining menu</Text>
          </Pressable>
        </View>

        {selected === 'chef' ? (
          <View style={[common.card, styles.form]}>
            <Text style={styles.formTitle}>Chef sign in</Text>
            <Text style={styles.helper}>Access the menu management dashboard.</Text>
            <Text style={common.label}>Username</Text>
            <TextInput accessibilityLabel="Chef username" autoCapitalize="none" autoCorrect={false} value={username} onChangeText={(value) => { setUsername(value); setError(''); }} placeholder="Enter username" placeholderTextColor={colors.subtle} style={common.input} />
            <Text style={[common.label, styles.field]}>Password</Text>
            <TextInput accessibilityLabel="Chef password" value={password} onChangeText={(value) => { setPassword(value); setError(''); }} secureTextEntry placeholder="Enter password" placeholderTextColor={colors.subtle} style={common.input} onSubmitEditing={signIn} />
            {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
            <AppButton title="Sign In as Chef" onPress={signIn} style={styles.submit} />
            <View style={styles.demoBox}>
              <Text style={styles.demoHeading}>CLASSROOM DEMO LOGIN</Text>
              <Text style={styles.demoText}>Username: chef     Password: Chef2026</Text>
              <Text style={styles.demoInfo}>This is a local demonstration, not a secure online account.</Text>
            </View>
          </View>
        ) : (
          <View style={[common.card, styles.form]}>
            <Text style={styles.formTitle}>Welcome, Guest!</Text>
            <Text style={styles.helper}>Discover delicious starters, mains, desserts and drinks. You can search and filter dishes, but only the chef can change the menu.</Text>
            <AppButton title="Continue as Guest" onPress={onGuestEnter} style={styles.submit} />
            <Text style={styles.guestNote}>No username or password needed.</Text>
          </View>
        )}
        <Text style={styles.footer}>CHRISTOFFEL'S  •  GOOD FOOD, BEAUTIFULLY PRESENTED</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', maxWidth: 580, alignSelf: 'center', paddingHorizontal: 20, paddingTop: 25, paddingBottom: 38, alignItems: 'stretch' },
  monogram: { width: 72, height: 72, borderRadius: 21, backgroundColor: colors.blue, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  monogramText: { color: '#031924', fontWeight: '900', fontSize: 44 },
  eyebrow: { color: colors.blue, fontSize: 11, letterSpacing: 1.7, textAlign: 'center', fontWeight: '800', marginTop: 24 },
  title: { color: colors.text, fontSize: 31, fontWeight: '900', textAlign: 'center', marginTop: 6 },
  description: { color: colors.muted, fontSize: 14, textAlign: 'center', marginTop: 9, lineHeight: 22 },
  rule: { height: 3, width: 64, borderRadius: 2, backgroundColor: colors.blue, alignSelf: 'center', marginTop: 22, marginBottom: 25 },
  roleRow: { flexDirection: 'row', gap: 12, marginBottom: 18 },
  roleCard: { flex: 1, backgroundColor: colors.panel, borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 17, alignItems: 'center', minHeight: 133 },
  selected: { borderColor: colors.blue, backgroundColor: colors.blueSoft, borderWidth: 2 },
  roleIcon: { color: colors.blue, fontSize: 29, marginBottom: 7 },
  roleTitle: { color: colors.text, fontSize: 15, fontWeight: '800', textAlign: 'center' },
  roleCaption: { color: colors.muted, fontSize: 11, textAlign: 'center', marginTop: 7, lineHeight: 16 },
  form: { padding: 20, marginBottom: 20 },
  formTitle: { color: colors.text, fontSize: 20, fontWeight: '800', marginBottom: 7 },
  helper: { color: colors.muted, fontSize: 13, lineHeight: 20, marginBottom: 21 },
  field: { marginTop: 18 },
  submit: { marginTop: 24 },
  error: { color: colors.red, fontSize: 13, lineHeight: 19, marginTop: 10 },
  demoBox: { backgroundColor: colors.elevated, borderRadius: 12, padding: 13, marginTop: 20 },
  demoHeading: { color: colors.gold, fontWeight: '800', fontSize: 10, letterSpacing: 1 },
  demoText: { color: colors.text, fontWeight: '700', marginTop: 5, fontSize: 12 },
  demoInfo: { color: colors.muted, fontSize: 11, marginTop: 5, lineHeight: 17 },
  guestNote: { color: colors.muted, fontSize: 12, marginTop: 15, textAlign: 'center' },
  footer: { textAlign: 'center', color: colors.subtle, fontSize: 10, letterSpacing: 1, lineHeight: 19 }
});
