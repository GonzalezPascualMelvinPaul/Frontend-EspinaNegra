import { espinaNegraApi } from "../../api";
export const getEnvasadosProvider = async () => {
  return espinaNegraApi
    .get(`envasado`)
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

export const updateEnvasadoProvider = async (envasado, id_envasado) => {
  console.log(envasado);
  return espinaNegraApi
    .put(`envasado/${id_envasado}`, envasado)
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

export const addEnvasadoProvider = async (newEnvasado) => {
  return espinaNegraApi
    .post(`envasado`, newEnvasado)
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

export const deleteEnvasadoProvider = async (id_envasado) => {
  return espinaNegraApi
    .delete(`envasado/${id_envasado}`)
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

export const getEnvasadoProvider = async (id_envasado) => {
  return espinaNegraApi
    .get(`envasado/${id_envasado}`)
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
