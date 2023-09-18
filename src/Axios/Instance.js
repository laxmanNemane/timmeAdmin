// @ts-nocheck
import axios from 'axios';

export const inializeAxios = () => {
  const showLoaderEvent = new Event('showLoader', { bubbles: true });
  const hideLoaderEvent = new Event('hideLoader', { bubbles: true });
  let numberOfApiCallsPending = 0;
  const headersCommonOptions = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  axios.defaults.headers.common = headersCommonOptions;
  axios.interceptors.request.use((req) => {
    numberOfApiCallsPending += 1;

    if (req.loader !== false) {
      document.dispatchEvent(showLoaderEvent);
    }

    const token = localStorage.getItem('access_token');
    // console.log(new URL(req.url).host.split(':')[0]);
    // console.log(window.location.host.split('.'));
    // console.log(token);
    if (token && API_ENDPOINTS.HOSTS_NEEDS_TOKEN.includes(new URL(req.url).host.split(':')[0])) {
      req.headers.authorization = `JWT ${token}`;
    }
    if (API_ENDPOINTS.HOSTS_NEEDS_TOKEN.includes(new URL(req.url).host.split(':')[0])) {
      [req.headers.org] = window.location.host.split('.');
    }
    return req;
  });

  axios.interceptors.response.use(
    (response) => {
      numberOfApiCallsPending -= 1;
      if (numberOfApiCallsPending === 0) {
        setTimeout(() => {
          document.dispatchEvent(hideLoaderEvent);
        }, 400);
      }
      return response;
    },
    async (error) => {
      numberOfApiCallsPending -= 1;
      if (numberOfApiCallsPending === 0) {
        setTimeout(() => {
          document.dispatchEvent(hideLoaderEvent);
        }, 400);
      }
      if (error.response?.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};
export default inializeAxios;
