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
  email: Yup.string().required("El email es requerido"),
  username: Yup.string().required("El username es requerido"),
  rol_id: Yup.number().required("El rol es requerido"),
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
    console.log(data?.empleados);
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
    const { ok, data, message } = await updateUserProvider(values, id);
    if (ok) {
      setOpen(true);
      setError(false);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
    setTimeout(() => {
      navigate("/usuario/inicio");
    }, 5000);
  };
  const initialValues = {
    email: user?.email,
    username: user?.username,
    rol_id: user?.rol_id,
    empleado_id: user?.empleado_id,
  };
  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="info"
      />
      <IndexLayout title={"Empleado"}>
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
                    label="Rol"
                    name="rol_id"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    select
                    error={
                      formik.touched.rol_id && formik.errors.rol_id
                        ? true
                        : false
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
                    disabled={true}
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
                            maxHeight: 48 * 8 + 8, // donde '48' es la altura de cada elemento del menú y '5' es el número de elementos visibles
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
