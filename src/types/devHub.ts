export type DevHubCategory = 'All' | 'Websites' | 'Projects' | 'Tools' | 'Resources';

export interface DevHubItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  category: 'Websites' | 'Projects' | 'Tools' | 'Resources';
  badge?: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}
