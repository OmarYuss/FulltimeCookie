export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthService {
  // Authentication methods
  login(credentials: LoginCredentials): Promise<User>;
  signup(credentials: SignupCredentials): Promise<User>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  
  // State management
  getCurrentUser(): User | null;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
  
  // User management
  updateProfile(updates: Partial<User>): Promise<void>;
  deleteAccount(): Promise<void>;
}

// Default implementation - replace with your actual auth provider
export class DefaultAuthService implements AuthService {
  private currentUser: User | null = null;
  private authStateListeners: ((user: User | null) => void)[] = [];

  async login(credentials: LoginCredentials): Promise<User> {
    // TODO: Implement actual authentication logic
    const user: User = {
      id: '1',
      email: credentials.email,
      name: 'Test User',
      role: 'user',
      createdAt: new Date(),
    };
    
    this.currentUser = user;
    this.notifyListeners(user);
    return user;
  }

  async signup(credentials: SignupCredentials): Promise<User> {
    // TODO: Implement actual signup logic
    const user: User = {
      id: '1',
      email: credentials.email,
      name: credentials.name,
      role: 'user',
      createdAt: new Date(),
    };
    
    this.currentUser = user;
    this.notifyListeners(user);
    return user;
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.notifyListeners(null);
  }

  async resetPassword(email: string): Promise<void> {
    // TODO: Implement password reset logic
    console.log('Password reset requested for:', email);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.authStateListeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  async updateProfile(updates: Partial<User>): Promise<void> {
    if (this.currentUser) {
      this.currentUser = { ...this.currentUser, ...updates };
      this.notifyListeners(this.currentUser);
    }
  }

  async deleteAccount(): Promise<void> {
    this.currentUser = null;
    this.notifyListeners(null);
  }

  private notifyListeners(user: User | null) {
    this.authStateListeners.forEach(listener => listener(user));
  }
}

// Export a singleton instance
export const authService = new DefaultAuthService(); 