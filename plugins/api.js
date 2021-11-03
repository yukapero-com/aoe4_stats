const Axios = require('axios');
import nuxtConfig from '@/nuxt.config'
const isDev = !!nuxtConfig?.dev

export default ({ store }, inject) => {
  inject('get', async (apiPath, params) => {
    let url = isDev ? `http://localhost:5000/api/${apiPath}` : `https://www.aoe4stats.net:5000/api/${apiPath}`;
    let response = await Axios.get(url, {
      params,
    });
    return response.data;
  })
}
