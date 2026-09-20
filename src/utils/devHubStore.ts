import { DevHubItem } from '../types/devHub';
import { INITIAL_DEV_HUB_ITEMS } from '../data/devHubData';

const DEV_HUB_STORAGE_KEY = 'algorudix_dev_hub_items_v1';

export function getDevHubItems(): DevHubItem[] {
  try {
    const raw = localStorage.getItem(DEV_HUB_STORAGE_KEY);
    if (raw === null) {
      localStorage.setItem(DEV_HUB_STORAGE_KEY, JSON.stringify(INITIAL_DEV_HUB_ITEMS));
      return INITIAL_DEV_HUB_ITEMS;
    }
    const items: DevHubItem[] = JSON.parse(raw);
    if (!Array.isArray(items)) {
      localStorage.setItem(DEV_HUB_STORAGE_KEY, JSON.stringify(INITIAL_DEV_HUB_ITEMS));
      return INITIAL_DEV_HUB_ITEMS;
    }
    return items.sort((a, b) => a.orderIndex - b.orderIndex);
  } catch (err) {
    console.error('Failed to load Development Hub items from storage:', err);
    return INITIAL_DEV_HUB_ITEMS;
  }
}

export function saveDevHubItems(items: DevHubItem[]): void {
  try {
    localStorage.setItem(DEV_HUB_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save Development Hub items to storage:', err);
  }
}

export function addDevHubItem(itemData: Omit<DevHubItem, 'id' | 'orderIndex' | 'createdAt' | 'updatedAt'>): DevHubItem[] {
  const current = getDevHubItems();
  const newItem: DevHubItem = {
    ...itemData,
    id: `dev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    orderIndex: current.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updated = [...current, newItem];
  saveDevHubItems(updated);
  return updated;
}

export function updateDevHubItem(item: DevHubItem): DevHubItem[] {
  const current = getDevHubItems();
  const updated = current.map((p) => (p.id === item.id ? { ...item, updatedAt: new Date().toISOString() } : p));
  saveDevHubItems(updated);
  return updated;
}

export function deleteDevHubItem(id: string): DevHubItem[] {
  const current = getDevHubItems();
  const filtered = current.filter((p) => p.id !== id);
  // Re-index remaining items
  const reindexed = filtered.map((item, idx) => ({ ...item, orderIndex: idx }));
  saveDevHubItems(reindexed);
  return reindexed;
}

export function moveDevHubItem(id: string, direction: 'up' | 'down'): DevHubItem[] {
  const current = getDevHubItems();
  const index = current.findIndex((item) => item.id === id);
  if (index === -1) return current;

  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= current.length) return current;

  const updated = [...current];
  const [movedItem] = updated.splice(index, 1);
  updated.splice(targetIndex, 0, movedItem);

  const reindexed = updated.map((item, idx) => ({ ...item, orderIndex: idx }));
  saveDevHubItems(reindexed);
  return reindexed;
}
