import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { common, colors } from '../theme';
import AppButton from '../components/AppButton';
const { COURSES, validateMenu } = require('../utils/menu');

export default function EditorScreen({ item, onSave, onCancel }) {
  const isEditing = !!item;
  const [form, setForm] = useState({
    name: item?.name || '',
    description: item?.description || '',
    course: item?.course || 'Starter',
    price: item ? String(item.price) : ''
  });
  const [errors, setErrors] = useState({});

  function setField(field, value) {
    setForm((old) => ({ ...old, [field]: value }));
    setErrors((old) => ({ ...old, [field]: undefined }));
  }

  function submit() {
    const result = validateMenu(form);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    onSave(result.data);
  }

  function fieldError(field) {
    return errors[field] ? <Text style={styles.error}>{errors[field]}</Text> : null;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={common.page}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={common.heading}>{isEditing ? 'Edit Menu Item' : 'Add Menu Item'}</Text>
        <Text style={common.subtitle}>{isEditing ? 'Update the dish details and save your changes.' : 'Enter a new dish to add it to your culinary menu.'}</Text>
        <View style={[common.card, styles.formCard]}>
          <Text style={styles.formHeading}>Dish information</Text>
          <Text style={common.label}>Dish name *</Text>
          <TextInput accessibilityLabel="Dish name" value={form.name} onChangeText={(value) => setField('name', value)} placeholder="e.g. Traditional Bobotie" placeholderTextColor={colors.subtle} maxLength={80} style={[common.input, errors.name && styles.invalid]} />
          {fieldError('name')}

          <Text style={[common.label, styles.field]}>Description *</Text>
          <TextInput accessibilityLabel="Dish description" value={form.description} onChangeText={(value) => setField('description', value)} placeholder="Briefly describe the dish..." placeholderTextColor={colors.subtle} multiline textAlignVertical="top" maxLength={320} style={[common.input, styles.multiline, errors.description && styles.invalid]} />
          {fieldError('description')}

          <Text style={[common.label, styles.field]}>Course *</Text>
          <View style={[styles.pickerShell, errors.course && styles.invalid]}>
            <Picker selectedValue={form.course} onValueChange={(value) => setField('course', value)} dropdownIconColor={colors.text} style={styles.picker} itemStyle={styles.pickerItem}>
              {COURSES.map((course) => <Picker.Item key={course} label={course} value={course} color={Platform.OS === 'ios' ? colors.text : undefined} />)}
            </Picker>
          </View>
          {fieldError('course')}

          <Text style={[common.label, styles.field]}>Price (ZAR) *</Text>
          <TextInput accessibilityLabel="Dish price in rands" value={form.price} onChangeText={(value) => setField('price', value)} placeholder="e.g. 145.00" placeholderTextColor={colors.subtle} keyboardType="decimal-pad" style={[common.input, errors.price && styles.invalid]} />
          {fieldError('price')}

          <AppButton title={isEditing ? 'Save Changes' : 'Save Menu Item'} onPress={submit} style={styles.save} />
          <AppButton title="Cancel / Back" kind="secondary" onPress={onCancel} style={styles.cancel} />
        </View>
        <Text style={styles.footnote}>* Required fields. Prices must be greater than zero and use up to two decimal places.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 24, paddingBottom: 40 },
  formCard: { marginTop: 22, padding: 18 },
  formHeading: { color: colors.text, fontSize: 17, fontWeight: '800', marginBottom: 21 },
  field: { marginTop: 20 },
  multiline: { minHeight: 105 },
  pickerShell: { backgroundColor: colors.elevated, borderWidth: 1, borderColor: colors.border, borderRadius: 13, overflow: 'hidden' },
  picker: { color: colors.text, width: '100%', height: 55 },
  pickerItem: { color: colors.text },
  invalid: { borderColor: colors.red },
  error: { color: colors.red, fontSize: 12, marginTop: 7 },
  save: { marginTop: 24 },
  cancel: { marginTop: 11 },
  footnote: { color: colors.subtle, fontSize: 12, marginTop: 16, lineHeight: 19 }
});
