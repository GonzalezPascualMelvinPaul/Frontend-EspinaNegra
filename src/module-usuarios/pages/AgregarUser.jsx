import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Button,
  Grid,
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
  email_usuario: Yup.string().required("El email es requerido"),
  username_usuario: Yup.string().required("El username es requerido"),
  id_rol: Yup.number().required("El rol es requerido"),
  id_empleado: Yup.number().required("El empleado es requerido"),
});

const initialValues = {
  email_usuario: "",
  username_usuario: "",
  id_rol: "",
  id_empleado: "",
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
    setRol(data?.roles);
  };

  const getEmpleados = async () => {
    const { data } = await getEmpleadosProvider();
    console.log(data);
    setEmpleados(data?.empleados);
  };

  const onSubmit = async (values, e) => {
    const formData = new FormData();
    formData.append("imagen_usuario", picture);
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} sm={6}>
                  <Field
                    as={TextField}
                    label="Email"
                    name="email_usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.email_usuario &&
                      formik.errors.email_usuario
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="email_usuario" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                  <Field
                    as={TextField}
                    label="Username"
                    name="username_usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.username_usuario &&
                      formik.errors.username_usuario
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="username_usuario" />}
                  />
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
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
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                  <Field
                    as={TextField}
                    label="Rol"
                    name="id_rol"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    select
                    error={
                      formik.touched.id_rol && formik.errors.id_rol
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="id_rol" />}
                  >
                    {rol.map((option) => (
                      <MenuItem key={option.id_rol} value={option.id_rol}>
                        {option.nombre_rol}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                  <Field
                    name="id_empleado"
                    label="Empleado"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    select
                    margin="normal"
                    error={
                      formik.touched.id_empleado && formik.errors.id_empleado
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="id_empleado" />}
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
                      <MenuItem
                        key={option.id_empleado}
                        value={option.id_empleado}
                      >
                        {option.nombre_empleado}{" "}
                        {option.apellido_paterno_empleado}{" "}
                        {option.apellido_materno_empleado}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
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
                </Grid>

                <Grid
                  display={"flex"}
                  justifyContent={"end"}
                  item
                  xs={12}
                  md={12}
                  sx={{ mb: "2rem" }}
                >
                  <Button type="submit" variant="contained">
                    Crear
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </IndexLayout>
    </>
  );
};
