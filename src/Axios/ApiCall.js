/* eslint-disable */
import axios from 'axios';

const Baseurl = process.env.REACT_APP_BASE_URL;

// admin login
export const loginAuth = async (body) => {
  try {
    const res = await axios.post(`${Baseurl}/admin/login`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// admin Logout
export const authLogOut = async () => {
  try {
    const res = await axios.post(
      `${Baseurl}/admin/logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getDashbordData = async () => {
  try {
    const res = await axios.get(
      `${Baseurl}/admin/totalCount`,

      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// expertList
export const getExpertList = async () => {
  try {
    const res = await axios.get(
      `${Baseurl}/admin/viewUsers`,

      {
        params: { type: 'expert' },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// parentList

export const getParentList = async () => {
  try {
    const res = await axios.get(
      `${Baseurl}/admin/viewUsers`,

      {
        params: { type: 'parent' },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

// studentList
export const getStudentList = async () => {
  try {
    const res = await axios.get(
      `${Baseurl}/admin/viewUsers`,

      {
        params: { type: 'student' },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('user_token')}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

/* eslint-enable */
