import { StyleSheet } from 'react-native';

export const colors = {
  background: '#111115',
  panel: '#1D1E24',
  elevated: '#262730',
  border: '#343641',
  blue: '#0796D2',
  blueSoft: '#112C3A',
  text: '#F5F6FB',
  muted: '#A5A8B3',
  subtle: '#737783',
  green: '#55D5A2',
  red: '#F47C80',
  gold: '#E8B66B'
};

export const common = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.background },
  body: { padding: 20, paddingBottom: 30 },
  heading: { color: colors.text, fontSize: 26, fontWeight: '800', letterSpacing: -0.6 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 5, lineHeight: 21 },
  sectionHeading: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: 12 },
  label: { color: colors.text, fontSize: 13, fontWeight: '700', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: colors.border, backgroundColor: colors.panel,
    color: colors.text, borderRadius: 13, paddingHorizontal: 14, paddingVertical: 13, fontSize: 16 },
  card: { backgroundColor: colors.panel, borderRadius: 18, borderWidth: 1,
    borderColor: colors.border, padding: 16 },
  divider: { height: 1, backgroundColor: colors.border },
  row: { flexDirection: 'row', alignItems: 'center' }
});
