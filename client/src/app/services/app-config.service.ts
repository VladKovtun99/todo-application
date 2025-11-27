import { Injectable } from '@angular/core';

interface GoogleApiConfig {
  clientId: string;
  apiKey: string;
  discoveryDoc: string;
  scopes: string;
}

interface AppConfig {
  production: boolean;
  googleApi: GoogleApiConfig;
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private config: AppConfig | null = null;

  async load(): Promise<void> {
    try {
      const response = await fetch('/config.json');
      this.config = await response.json();
    } catch (error) {
      console.error('Failed to load configuration:', error);
      throw error;
    }
  }

  get apiUrl(): string {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config.apiUrl;
  }

  get googleApi(): GoogleApiConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config.googleApi;
  }

  get production(): boolean {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config.production;
  }

  getConfig(): AppConfig {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config;
  }
}

