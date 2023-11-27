/* eslint-disable */
import axios from 'axios';
const inializeAxios = () => {
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

    console.log(req, 'login');

    if (
      req.loader !== false &&
      req.url !== `${process.env.REACT_APP_BASE_URL}/admin/login` &&
      req.url === `${process.env.REACT_APP_BASE_URL}/admin/logout`
    ) {
      document.dispatchEvent(showLoaderEvent);
    }

    const token = localStorage.getItem('user_token');

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

/* eslint-enable */
