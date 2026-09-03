import { BlogPost, BlogStatus, DashboardStats } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/blogData';

const BLOG_STORAGE_KEY = 'algorudix_blog_posts_v2';

/**
 * Normalizes legacy or seed posts to ensure all required fields are present.
 */
function normalizePost(raw: any): BlogPost {
  return {
    id: raw.id || `post-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    title: raw.title || 'Untitled Post',
    slug: raw.slug || (raw.title ? raw.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'untitled'),
    excerpt: raw.excerpt || '',
    content: raw.content || '',
    author: raw.author || {
      name: 'Algorudix Team',
      role: 'Enterprise Consultant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    },
    date: raw.date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    readTime: raw.readTime || '4 min read',
    category: raw.category || 'AI & LLMs',
    tags: Array.isArray(raw.tags) ? raw.tags : ['Enterprise', 'Tech'],
    image: raw.image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    createdType: raw.createdType || 'manual',
    creationMethod: raw.creationMethod || (raw.createdType === 'agent' ? 'ai' : 'manual'),
    status: raw.status || 'published',
    targetAudience: raw.targetAudience || 'Enterprise Decision Makers',
    tone: raw.tone || 'Professional',
    seo: raw.seo || {
      seoTitle: `${raw.title || 'Article'} | Algorudix.ai`,
      metaDescription: raw.excerpt || '',
      keywords: raw.tags || ['AI', 'Tech'],
      score: 90,
    },
    agentDetails: raw.agentDetails,
    aiHistory: raw.aiHistory,
    featured: Boolean(raw.featured),
  };
}

/**
 * Loads all posts from localStorage or returns seed data.
 */
export function getAllPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizePost);
      }
    }
  } catch (e) {
    console.error('Error loading posts from localStorage:', e);
  }

  // Fallback to initial seed posts mapped as Published
  const seedPosts = INITIAL_BLOG_POSTS.map((p) => normalizePost({ ...p, status: 'published' }));
  saveAllPosts(seedPosts);
  return seedPosts;
}

/**
 * Saves all posts to localStorage.
 */
export function saveAllPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving posts to localStorage:', e);
  }
}

/**
 * Returns only published posts for regular public visitors.
 */
export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((p) => p.status === 'published');
}

/**
 * Computes dashboard statistics for Admin.
 */
export function getDashboardStats(posts: BlogPost[]): DashboardStats {
  return {
    totalBlogs: posts.length,
    publishedBlogs: posts.filter((p) => p.status === 'published').length,
    draftBlogs: posts.filter((p) => p.status === 'draft').length,
    aiGeneratedBlogs: posts.filter((p) => p.creationMethod === 'ai' || p.createdType === 'agent').length,
    manualBlogs: posts.filter((p) => p.creationMethod === 'manual' || p.createdType === 'manual').length,
    scheduledBlogs: posts.filter((p) => p.status === 'scheduled').length,
  };
}

/**
 * Adds a new post to the store.
 */
export function addPostToStore(newPost: BlogPost): BlogPost[] {
  const current = getAllPosts();
  const normalized = normalizePost(newPost);
  const updated = [normalized, ...current];
  saveAllPosts(updated);
  return updated;
}

/**
 * Updates an existing post in the store.
 */
export function updatePostInStore(updatedPost: BlogPost): BlogPost[] {
  const current = getAllPosts();
  const normalized = normalizePost(updatedPost);
  const updated = current.map((p) => (p.id === normalized.id ? normalized : p));
  saveAllPosts(updated);
  return updated;
}

/**
 * Deletes a post by ID.
 */
export function deletePostFromStore(postId: string): BlogPost[] {
  const current = getAllPosts();
  const updated = current.filter((p) => p.id !== postId);
  saveAllPosts(updated);
  return updated;
}

/**
 * Duplicates an existing post.
 */
export function duplicatePostInStore(postId: string): BlogPost[] {
  const current = getAllPosts();
  const target = current.find((p) => p.id === postId);
  if (!target) return current;

  const duplicated: BlogPost = {
    ...target,
    id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    title: `${target.title} (Copy)`,
    slug: `${target.slug}-copy`,
    status: 'draft',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
  };

  const updated = [duplicated, ...current];
  saveAllPosts(updated);
  return updated;
}

/**
 * Toggles publish/unpublish status for a post.
 */
export function togglePublishStatusInStore(postId: string): BlogPost[] {
  const current = getAllPosts();
  const updated = current.map((p) => {
    if (p.id === postId) {
      const nextStatus: BlogStatus = p.status === 'published' ? 'draft' : 'published';
      return { ...p, status: nextStatus };
    }
    return p;
  });
  saveAllPosts(updated);
  return updated;
}
