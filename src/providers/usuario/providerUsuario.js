import { espinaNegraApi } from "../../api";

export const getUsersProvider = async () => {
  return espinaNegraApi
    .get(`user`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const updateUserProvider = async (user, id) => {
  console.log(user);
  return espinaNegraApi
    .put(`user/${id}`, user)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const addUserProvider = async (newUser) => {
  return espinaNegraApi
    .post(`user`, newUser, {
      headers: { "content-type": "multipart/form-data" },
    })
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      let response = error.response.data;

      let errorMessage = response.message + "\n";

      for (let key in response.errors) {
        errorMessage += response.errors[key].join("\n") + "\n";
      }
      return { ok: false, data: "", message: errorMessage };
    });
};

export const deleteUserProvider = async (userId) => {
  return espinaNegraApi
    .delete(`user/${userId}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const getUserProvider = async (userId) => {
  return espinaNegraApi
    .get(`user/${userId}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};
