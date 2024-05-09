import httpClient from '@/api/HttpClient.js';

export default class ApiEndpoint {
  static async makeRequest(method, url, data = null, params = null, options = {}) {
    const response = await httpClient({
      method,
      url,
      data,
      params,
      ...options
    });

    return response.data;
  }
}
