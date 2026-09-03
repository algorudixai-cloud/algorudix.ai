import { IAIProvider, IImageProvider } from './aiTypes';
import { GeminiProvider } from './geminiProvider';

export class AIManager {
  private static instance: AIManager;
  private activeProvider: IAIProvider;
  private providers: Map<string, IAIProvider> = new Map();

  private constructor() {
    // Register Default Providers
    const gemini = new GeminiProvider();
    this.providers.set('gemini', gemini);
    
    // Default active provider
    this.activeProvider = gemini;
  }

  public static getInstance(): AIManager {
    if (!AIManager.instance) {
      AIManager.instance = new AIManager();
    }
    return AIManager.instance;
  }

  public getActiveProvider(): IAIProvider {
    return this.activeProvider;
  }

  public setProvider(providerKey: string): boolean {
    const found = this.providers.get(providerKey.toLowerCase());
    if (found) {
      this.activeProvider = found;
      return true;
    }
    return false;
  }

  public getAvailableProviders(): { id: string; name: string; model: string }[] {
    return Array.from(this.providers.entries()).map(([id, provider]) => ({
      id,
      name: provider.name,
      model: provider.model,
    }));
  }
}

export const aiManager = AIManager.getInstance();
