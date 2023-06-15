import { espinaNegraApi } from "../../api";

export const getComprasProvider = async () => {
  return espinaNegraApi
    .get(`compra`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const updateCompraProvider = async (compra, id) => {
  console.log(compra);
  return espinaNegraApi
    .put(`compra/${id}`, compra)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const addCompraProvider = async (newcompra) => {
  return espinaNegraApi
    .post(`compra`, newcompra, {
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

export const deleteCompraProvider = async (compraId) => {
  return espinaNegraApi
    .delete(`compra/${compraId}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const getCompraProvider = async (compraId) => {
  return espinaNegraApi
    .get(`compra/${compraId}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};
