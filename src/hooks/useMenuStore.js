import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@chef_christoffel/menu_items_v1';
const SEED = [
  { id: 'sample-1', name: 'Truffle Arancini', description: 'Crispy risotto bites with parmesan and truffle.', course: 'Starter', price: 95, createdAt: 1 },
  { id: 'sample-2', name: 'Beef Burger', description: 'Grilled beef patty with cheddar and house sauce.', course: 'Main Course', price: 75, createdAt: 2 },
  { id: 'sample-3', name: 'Cheesecake', description: 'Creamy vanilla cheesecake with berry topping.', course: 'Dessert', price: 50, createdAt: 3 }
];

function newId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export function useMenuStore() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState('');

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed = saved === null ? SEED : JSON.parse(saved);
        if (!Array.isArray(parsed)) throw new Error('Saved data is not a list.');
        if (active) setItems(parsed);
      } catch (_) {
        if (active) {
          setItems(SEED);
          setStorageError('Saved menu could not be loaded. Sample dishes are shown.');
        }
      } finally {
        if (active) setLoaded(true);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch(() => {
      setStorageError('Changes are visible, but could not be saved to this device.');
    });
  }, [items, loaded]);

  const addItem = useCallback((data) => {
    const item = { ...data, id: newId(), createdAt: Date.now() };
    setItems((previous) => [item, ...previous]);
    return item;
  }, []);

  const updateItem = useCallback((id, data) => {
    setItems((previous) => previous.map((item) => item.id === id ? { ...item, ...data, updatedAt: Date.now() } : item));
  }, []);

  const deleteItem = useCallback((id) => {
    setItems((previous) => previous.filter((item) => item.id !== id));
  }, []);

  return { items, loaded, storageError, addItem, updateItem, deleteItem };
}
