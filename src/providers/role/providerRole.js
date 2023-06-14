import { espinaNegraApi } from "../../api";

export const getRolesProvider = async () => {
  try {
    const { data } = await espinaNegraApi.get("role/");
    return { ok: true, data: data, message: "" };
  } catch (error) {
    return { ok: false, data: "", message: error.response.data.msg };
  }
};

export const updateRoleProvider = async (Role, id) => {
  return espinaNegraApi
    .patch(`role/${id}`, Role)
    .then((response) => {
      return { ok: true, data: response.data, message: "" };
    })
    .catch((error) => {
      return { ok: false, data: "", message: message };
    });
};

export const addRoleProvider = async (newRole) => {
  return espinaNegraApi
    .post(`role/`, newRole)
    .then((response) => {
      return { ok: true, data: response.data, message: "" };
    })
    .catch((error) => {
      return { ok: false, data: "", message: message };
    });
};

export const deleteRoleProvider = async (roleId) => {
  return espinaNegraApi
    .delete(`role/${roleId}`)
    .then((response) => {
      return { ok: true, data: response.data, message: response.data.msg };
    })
    .catch((error) => {
      return { ok: false, data: "", message: message };
    });
};
