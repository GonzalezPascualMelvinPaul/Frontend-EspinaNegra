import { espinaNegraApi } from "../../api";

export const getCategoriasProvider = async () => {
  return espinaNegraApi
    .get(`categoria`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const updateCategoriaProvider = async (categoria, id) => {
  console.log(categoria);
  return espinaNegraApi
    .put(`categoria/${id}`, categoria)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const addCategoriaProvider = async (newCategoria) => {
  return espinaNegraApi
    .post(`categoria`, newCategoria)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      console.log(error.response);
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const deleteCategoriaProvider = async (categoriaId) => {
  return espinaNegraApi
    .delete(`categoria/${categoriaId}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const getCategoriaProvider = async (categoriaId) => {
  return espinaNegraApi
    .get(`categoria/${categoriaId}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};
