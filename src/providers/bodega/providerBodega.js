import { espinaNegraApi } from "../../api";

export const getBodegasProvider = async () => {
  return espinaNegraApi
    .get(`bodega/`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const updateBodegaProvider = async (bodega, id) => {
  console.log(bodega);
  return espinaNegraApi
    .put(`bodega/${id}`, bodega)
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

export const addBodegaProvider = async (newBodega) => {
  return espinaNegraApi
    .post(`bodega/`, newBodega)
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

export const deleteBodegaProvider = async (id) => {
  return espinaNegraApi
    .delete(`bodega/${id}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const getBodegaProvider = async (id) => {
  return espinaNegraApi
    .get(`bodega/${id}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};
