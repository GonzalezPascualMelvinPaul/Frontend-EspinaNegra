import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  getUserProvider,
  updateUserProvider,
} from "../../providers/usuario/providerUsuario";
import { getRolesProvider } from "../../providers/role/providerRole";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { useNavigate, useParams } from "react-router-dom";
import { getEmpleadosProvider } from "../../providers/empleado/providerEmpleado";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { CameraAltOutlined } from "@mui/icons-material";
const validationSchema = Yup.object({
  email_usuario: Yup.string().required("El email es requerido"),
  username_usuario: Yup.string().required("El username es requerido"),
  id_rol: Yup.number().required("El rol es requerido"),
});

export const EditarUser = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [empleados, setEmpleados] = useState([]);
  const [open, setOpen] = useState(false);
  const [rol, setRol] = useState([]);
  const [user, setUser] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();
  const getEmpleados = async () => {
    const { data } = await getEmpleadosProvider();
    setEmpleados(data?.empleados);
  };
  const getRoles = async () => {
    const { data } = await getRolesProvider();
    setRol(data?.roles);
  };
  const getUser = async () => {
    const { ok, data } = await getUserProvider(id);
    if (ok) {
      setIsLoadingData(true);
    } else {
      setIsLoadingData(false);
    }
    setUser(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getRoles();
    getEmpleados();
    getUser();
  }, []);

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    console.log("value", values);
    const { ok, data, message } = await updateUserProvider(values, id);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/usuario/inicio");
      }, 5000);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };
  const initialValues = {
    email_usuario: user?.email,
    username_usuario: user?.username,
    id_rol: user?.id_rol,
    id_empleado: user?.id_empleado,
  };
  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="info"
      />
      <IndexLayout title={"Usuario"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Usuarios",
              url: "/usuario/inicio",
            },
            {
              name: "Editar usuario",
              url: "",
            },
          ]}
        />
        {isLoadingData == false ? (
          <>
            <Skeleton variant="rectangular" width={"100%"} height={"80%"} />
          </>
        ) : (
          <>
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
                  <Field
                    name="id_empleado"
                    label="Empleado"
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    disabled={true}
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
                            maxHeight: 48 * 8 + 8, // donde '48' es la altura de cada elemento del menú y '5' es el número de elementos visibles
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
                    Modificar
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </IndexLayout>
    </>
  );
};
