import axios from 'axios';

// admin login
export const loginAuth = async (params) => {
  try {
    let Response = await axios.post(`users`, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return Response;
  } catch (error) {
    return toast.error(`${error?.response?.data?.message}`, {
      autoClose: 1000,
    });
  }
};

// admin Logout
export const authLogOut = async () => {
  try {
    let res = await axios.put(`/users/logout`);
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error;
  }
};

export const getDashbordData = async () => {
  try {
    let res = await axios.get(`/getDashbordData`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    return error;
  }
};

// expertList
export const getExpertList = async () => {
  try {
    let res = await axios.get(`/getDashbordData`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    return error;
  }
};

// parentList

export const getParentList = async () => {
  try {
    let res = await axios.get(`/parnetList`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    return error;
  }
};

// studentList
export const getStudentList = async () => {
  try {
    let res = await axios.get(`/studentList`);
    if (res.status === 200) {
      return res.data.data;
    }
  } catch (error) {
    return error;
  }
};
