const Axios = require('axios');
import nuxtConfig from '@/nuxt.config'
const isDev = !!nuxtConfig?.dev

export default ({ store }, inject) => {
  inject('get', async (apiPath, params) => {
    let response = await Axios.get(`api/${apiPath}`, {
      params,
    });
    return response.data;
  })
}
