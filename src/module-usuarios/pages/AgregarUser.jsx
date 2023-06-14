import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CameraAltOutlined } from "@mui/icons-material";
import { addUserProvider } from "../../providers/usuario/providerUsuario";
import { getRolesProvider } from "../../providers/role/providerRole";

import { getEmpleadosProvider } from "../../providers/empleado/providerEmpleado";

const validationSchema = Yup.object({
  email: Yup.string().required("El email es requerido"),
  username: Yup.string().required("El username es requerido"),
  rol_id: Yup.number().required("El rol es requerido"),
  empleado_id: Yup.number().required("El empleado es requerido"),
});

const initialValues = {
  email: "",
  username: "",
  rol_id: "",
  empleado_id: "",
};

export const AgregarUser = () => {
  const [picture, setPicture] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rol, setRol] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const getRoles = async () => {
    const { data } = await getRolesProvider();
    console.log(data?.roles);
    setRol(data?.roles);
  };

  const getEmpleados = async () => {
    const { data } = await getEmpleadosProvider();
    setEmpleados(data?.empleados);
  };
  const onSubmit = async (values, e) => {
    const formData = new FormData();
    formData.append("imagen", picture);
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
    }
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { data, ok, message } = await addUserProvider(formData);
    if (ok) {
      setOpen(true);
      setError(false);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    setPicture(file);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getRoles();
    getEmpleados();
  }, []);

  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="success"
      />
      <IndexLayout title={"Usuario"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Usuarios",
              url: "/usuario/inicio",
            },
            {
              name: "Agregar usuario",
              url: "",
            },
          ]}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.username && formik.errors.username
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                label="Imagen"
                name="image"
                variant="outlined"
                fullWidth
                margin="normal"
                type="file"
                error={
                  formik.touched.image && formik.errors.image ? true : false
                }
                helperText={<ErrorMessage name="image" />}
                onChange={handleImageChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CameraAltOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                as={TextField}
                label="Rol"
                name="rol_id"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                error={
                  formik.touched.rol_id && formik.errors.rol_id ? true : false
                }
                helperText={<ErrorMessage name="rol_id" />}
              >
                {rol.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </Field>
              <Field
                name="empleado_id"
                label="Empleado"
                as={TextField}
                variant="outlined"
                fullWidth
                select
                margin="normal"
                error={
                  formik.touched.empleado_id && formik.errors.empleado_id
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="empleado_id" />}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 48 * 5 + 8, // donde '48' es la altura de cada elemento del menú y '5' es el número de elementos visibles
                        width: 250,
                      },
                    },
                  },
                }}
              >
                {empleados.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.nombre} {option.apellido_paterno}{" "}
                    {option.apellido_materno}
                  </MenuItem>
                ))}
              </Field>

              {error ? (
                <Alert sx={{ mt: 0, mb: 0 }} severity="error">
                  {message}
                </Alert>
              ) : (
                ""
              )}
              {isLoading && !error ? (
                <Alert sx={{ mt: 0, mb: 0 }} severity="success">
                  Enviando datos...
                </Alert>
              ) : (
                ""
              )}
              <Button type="submit" variant="contained">
                Crear
              </Button>
            </Form>
          )}
        </Formik>
      </IndexLayout>
    </>
  );
};
