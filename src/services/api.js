// API service layer for handling external API calls
// This provides a centralized place for all API-related functionality

import { API_BASE_URL } from '../config/environment';
import errorHandler from '../utils/errorHandler';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      errorHandler.handleApiError(error, endpoint);
      throw error;
    }
  }

  // Example API methods
  async getProjects() {
    return this.request('/projects');
  }

  async getProject(id) {
    return this.request(`/projects/${id}`);
  }

  async getPosts() {
    return this.request('/posts');
  }

  async getPost(id) {
    return this.request(`/posts/${id}`);
  }

  async getBooks() {
    return this.request('/books');
  }

  async getIdeas() {
    return this.request('/ideas');
  }
}

export const apiService = new ApiService();
export default apiService;
