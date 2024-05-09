import ApiEndpoint from '@/api/ApiEndpoint.js';

export default class ProductsModel {
  static getProducts(params) {
    return ApiEndpoint.makeRequest('GET', '/dashboard/products', null, params);
  }

  static getProductResources() {
    return ApiEndpoint.makeRequest('GET', '/dashboard/products/resources');
  }

  static getProductById(productId) {
    return ApiEndpoint.makeRequest('GET', `/dashboard/products/${productId}`);
  }

  /**
   * @param category_id {number}
   * @param product_name {string}
   * @param description {string}
   * @param photo {string}
   * @param price  {number}
   * @param count {number}
   * @param is_used {boolean}
   * @returns {Promise<*>}
   */
  static createProduct({
    category_id,
    product_name,
    description,
    photo,
    price,
    count,
    is_used,
    model_id,
    manufacturer_id
  }) {
    const data = {
      category_id,
      product_name,
      description,
      photo,
      price,
      count,
      is_used,
      model_id,
      manufacturer_id
    };

    return ApiEndpoint.makeRequest('POST', `/profiles/products`, data);
  }

  static editProduct({
    product_id,
    category_id,
    product_name,
    description,
    photo,
    price,
    count,
    is_used,
    model_id,
    manufacturer_id
  }) {
    const data = {
      product_id,
      category_id,
      product_name,
      description,
      photo,
      price,
      count,
      is_used,
      model_id,
      manufacturer_id
    };

    return ApiEndpoint.makeRequest('PUT', `/profiles/products/${product_id}`, data);
  }
  static deleteProduct(productId) {
    return ApiEndpoint.makeRequest('DELETE', `/profiles/products/${productId}`);
  }

  static getFeedbacks(productId) {
    return ApiEndpoint.makeRequest('GET', `/feedbacks/${productId}`);
  }

  /**
   * @param product_id  {number}
   * @param service_id {number}
   * @param content {string}
   * @param score {number}
   * @returns {Promise<*>}
   */
  static sendFeedback({ product_id, content, score, name }) {
    const data = { product_id, content, score, name };
    return ApiEndpoint.makeRequest('POST', `/feedbacks`, data);
  }
}
