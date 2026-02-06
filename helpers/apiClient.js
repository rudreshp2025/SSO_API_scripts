const { request } = require('@playwright/test');
const { baseURL } = require('../config/env');


class APIClient {
  async get(endpoint, options = {}) {
    const apiContext = await request.newContext();
    const response = await apiContext.get(baseURL + endpoint,{
      params: options.params || {},
      headers: {
        Accept: 'application/json',
        ...(options.headers || {})
  }});
    return response;
  }

  async post(endpoint, body, options = {}) {
  const apiContext = await request.newContext();

  const response = await apiContext.post(baseURL + endpoint, {
    data: body,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  return response;

  }

  async delete(endpoint) {
    const apiContext = await request.newContext();
    const response = await apiContext.delete(baseURL + endpoint);
    return response;
  }
}

module.exports = new APIClient();