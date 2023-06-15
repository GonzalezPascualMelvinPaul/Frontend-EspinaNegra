import { espinaNegraApi } from "../../api";

export const getClientesProvider = async () => {
  return espinaNegraApi
    .get(`cliente`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const updateClienteProvider = async (cliente, id) => {
  console.log(cliente);
  return espinaNegraApi
    .put(`cliente/${id}`, cliente)
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

export const addClienteProvider = async (newCliente) => {
  return espinaNegraApi
    .post(`cliente`, newCliente)
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

export const deleteClienteProvider = async (id) => {
  return espinaNegraApi
    .delete(`cliente/${id}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const getClienteProvider = async (id) => {
  return espinaNegraApi
    .get(`cliente/${id}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};
