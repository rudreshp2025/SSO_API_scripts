const { request } = require('@playwright/test');
const { baseURL } = require('../config/UDH_env');


class APIClient {

 // subscription_key = "d0ce34d339424e339f447e4689695f23";
  
  async get(endpoint, options = {}) {
    const apiContext = await request.newContext();
    const response = await apiContext.get(baseURL + endpoint,{
      params: options.params || {},
      headers: {
        //Accept: 'application/json',
        //'subscription-key' : this.subscription_key,
        ...(options.headers || {})
  }});
    return response;
  }

  async post(endpoint, body, options = {}) {
  const apiContext = await request.newContext();

  const response = await apiContext.post(baseURL + endpoint, {
    data: body,
    params: options.params || {},
    headers: {
     // "Content-Type": "application/json",
     //'subscription-key' : this.subscription_key,
      ...(options.headers || {})
    }
  });

  return response;
  }
}
module.exports = new APIClient();