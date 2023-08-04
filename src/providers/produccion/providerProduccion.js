import { espinaNegraApi } from "../../api";
export const getProduccionesProvider = async () => {
  return espinaNegraApi
    .get(`produccion`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      let response = error.response.data;

      let errorMessage = response.message + "\n";

      for (let key in response.errors) {
        errorMessage += response.errors[key].join("\n") + "\n";
      }
      return { ok: false, data: "", errorMessage };
    });
};

export const updateProduccionProvider = async (produccion, id_produccion) => {
  console.log(produccion);
  return espinaNegraApi
    .put(`produccion/${id_produccion}`, produccion)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      let response = error.response.data;

      let errorMessage = response.message + "\n";

      for (let key in response.errors) {
        errorMessage += response.errors[key].join("\n") + "\n";
      }
      return { ok: false, data: "", errorMessage };
    });
};

export const addProduccionProvider = async (newProduccion) => {
  return espinaNegraApi
    .post(`produccion`, newProduccion)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      let response = error.response.data;

      let errorMessage = response.message + "\n";

      for (let key in response.errors) {
        errorMessage += response.errors[key].join("\n") + "\n";
      }

      console.log(errorMessage);
      return { ok: false, data: "", message: errorMessage };
    });
};

export const deleteProduccionProvider = async (id_produccion) => {
  return espinaNegraApi
    .delete(`produccion/${id_produccion}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      let response = error.response.data;

      let errorMessage = response.message + "\n";

      for (let key in response.errors) {
        errorMessage += response.errors[key].join("\n") + "\n";
      }
      return { ok: false, data: "", errorMessage };
    });
};

export const getProduccionProvider = async (id_produccion) => {
  return espinaNegraApi
    .get(`produccion/${id_produccion}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      let response = error.response.data;

      let errorMessage = response.message + "\n";

      for (let key in response.errors) {
        errorMessage += response.errors[key].join("\n") + "\n";
      }
      return { ok: false, data: "", errorMessage };
    });
};
