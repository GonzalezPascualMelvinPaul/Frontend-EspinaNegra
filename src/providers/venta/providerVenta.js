import { espinaNegraApi } from "../../api";

export const getVentasProvider = async () => {
  return espinaNegraApi
    .get(`venta`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const updateVentaProvider = async (venta, id) => {
  console.log(venta);
  return espinaNegraApi
    .put(`venta/${id}`, venta)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const addVentaProvider = async (newventa) => {
  return espinaNegraApi
    .post(`venta`, newventa)
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

export const deleteVentaProvider = async (ventaId) => {
  return espinaNegraApi
    .delete(`venta/${ventaId}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const getVentaProvider = async (ventaId) => {
  return espinaNegraApi
    .get(`venta/${ventaId}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};

export const getVentasconProductoProvider = async () => {
  return espinaNegraApi
    .get(`venta_producto`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data?.message };
    })
    .catch((error) => {
      return { ok: false, data: "", message: error?.response?.data?.message };
    });
};
