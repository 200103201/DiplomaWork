import ApiEndpoint from '@/api/ApiEndpoint.js';

export default class AttributesModel {
  static getCategories() {
    return ApiEndpoint.makeRequest('GET', '/categories');
  }

  static getManufacturers() {
    return ApiEndpoint.makeRequest('GET', '/manufacturers');
  }

  static getCities() {
    return ApiEndpoint.makeRequest('GET', '/cities');
  }

  static getModels() {
    return ApiEndpoint.makeRequest('GET', '/models');
  }
}
