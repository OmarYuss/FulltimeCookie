export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiClient {
  // Generic CRUD operations
  get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>>;
  post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>>;
  delete<T>(endpoint: string): Promise<ApiResponse<T>>;
  
  // File upload
  uploadFile(file: File, endpoint: string): Promise<ApiResponse<{ url: string }>>;
  
  // Authentication
  setAuthToken(token: string): void;
  clearAuthToken(): void;
}

export class DefaultApiClient implements ApiClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url.toString(), config);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP ${response.status}`);
      }

      return {
        data: responseData,
        success: true,
      };
    } catch (error) {
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, undefined, params);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data);
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data);
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpoint, data);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }

  async uploadFile(file: File, endpoint: string): Promise<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);

    const headers: Record<string, string> = {};

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP ${response.status}`);
      }

      return {
        data: responseData,
        success: true,
      };
    } catch (error) {
      return {
        data: { url: '' },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  setAuthToken(token: string): void {
    this.authToken = token;
  }

  clearAuthToken(): void {
    this.authToken = null;
  }
}

// Export a singleton instance
export const apiClient = new DefaultApiClient(); 