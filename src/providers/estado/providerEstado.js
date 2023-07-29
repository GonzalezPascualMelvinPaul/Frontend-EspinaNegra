import { espinaNegraApi } from "../../api";

export const getEstadosProvider = async () => {
  return espinaNegraApi
    .get(`estado`)
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

export const updateEmpleadoProvider = async (empleado, id) => {
  console.log(empleado);
  return espinaNegraApi
    .put(`empleado/${id}`, empleado)
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

export const addEmpleadoProvider = async (newEmpleado) => {
  return espinaNegraApi
    .post(`empleado`, newEmpleado)
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

export const deleteEmpleadoProvider = async (empleadoId) => {
  return espinaNegraApi
    .delete(`empleado/${empleadoId}`)
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

export const getEmpleadoProvider = async (empleadoId) => {
  return espinaNegraApi
    .get(`empleado/${empleadoId}`)
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
