import ApiEndpoint from "@/api/ApiEndpoint.js";

export default class UserModel {
  /**
   * @param email {string}
   * @param password {string}
   * @returns {Promise<any>}
   */
  static login({ email, password }) {
    const data = { email, password };
    return ApiEndpoint.makeRequest('POST', '/auth/login', data);
  }

  /**
   * @param name {string}
   * @param email {string}
   * @param password {string}
   * @param password_confirmation {string}
   * @returns {Promise<any>}
   */
  static register({ name, email, password, password_confirmation, phone }) {
    const data = { name, email, password, password_confirmation, phone };

    return ApiEndpoint.makeRequest('POST', '/auth/register', data);
  }

  static logout() {
    return ApiEndpoint.makeRequest('POST', '/auth/logout');
  }

  static emailVerify() {
    return ApiEndpoint.makeRequest('POST', '/auth/email/verify/send');
  }

  /**
   * @param password {string}
   * @param password_confirmation {string}
   * @returns {Promise<any>}
   */
  static sendEmailVerification({ password, password_confirmation }) {
    const data = { password, password_confirmation };

    return ApiEndpoint.makeRequest('POST', '/auth/email/verify/send', data);
  }

  /**
   * @param email {string}
   * @returns {Promise<any>}
   */
  static resetPassword({ email }) {
    return ApiEndpoint.makeRequest('POST', '/profiles/settings/password/email', { email });
  }

  static getProfileInfo() {
    return ApiEndpoint.makeRequest('GET', '/profiles/settings/info');
  }

  static updateProfileInfo(data) {
    return ApiEndpoint.makeRequest('PUT', '/profiles/settings/info', data);
  }

  static getProducts() {
    return ApiEndpoint.makeRequest('GET', '/profiles/products');
  }

  static getProductById(productId) {
    return ApiEndpoint.makeRequest('GET', `/profiles/products/${productId}`);
  }
}
