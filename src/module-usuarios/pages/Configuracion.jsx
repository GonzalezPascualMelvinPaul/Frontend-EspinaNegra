import React, { useState } from "react";
import * as Yup from "yup";
import {
  updateImageUserProvider,
  updatePasswordUserProvider,
} from "../../providers/usuario/providerUsuario";
import { AlertMessage } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Iconify from "../../components/iconify/Iconify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout, updateImage } from "../../store/auth/authSlice";
import { getEnvVariables } from "../../helpers/getEnvVariables";
import { useNavigate } from "react-router-dom";
const validationSchema = Yup.object({
  current_password: Yup.string().required("La contraseña actual es requerida"),
  new_password: Yup.string().required("La nueva contraseña es requerida"),
  new_password_confirmation: Yup.string().required(
    "La confirmacion de la nueva contraseña es requerida"
  ),
});

const initialValues = {
  current_password: "",
  new_password: "",
  new_password_confirmation: "",
};

export const Configuracion = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [picture, setPicture] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] =
    useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { VITE_API_URL_IMAGE } = getEnvVariables();

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { data, ok, message } = await updatePasswordUserProvider(values);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        dispatch(logout());
      }, 1000);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };

  const onSubmitImage = async (values, e) => {
    const formData = new FormData();

    formData.append("imagen_usuario", picture);
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { data, ok, message } = await updateImageUserProvider(formData);
    if (ok) {
      setOpen(true);
      setError(false);
      dispatch(updateImage(data.user.imagen_usuario));
      setTimeout(() => {
        navigate("/dashboard/inicio");
      }, 3000);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    setPicture(file);
  };
  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="success"
      />
      <IndexLayout title={"Configuración"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Formik initialValues={{ image: "" }} onSubmit={onSubmitImage}>
            {({ setFieldValue, values }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src={
                    picture
                      ? URL.createObjectURL(picture)
                      : `${VITE_API_URL_IMAGE}${user?.imagen_usuario}`
                  }
                  alt="User"
                  sx={{ width: 80, height: 80, marginBottom: 5 }}
                />
                <Field name="image">
                  {({ field, form }) => (
                    <div>
                      <input
                        style={{ marginBottom: 10 }}
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleImageChange}
                      />
                    </div>
                  )}
                </Field>
                <Button type="submit" variant="contained">
                  Cambiar foto
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    name="current_password"
                    label="Contraseña actual"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type={showPassword ? "text" : "password"}
                    error={
                      formik.touched.current_password &&
                      formik.errors.current_password
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="current_password" />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    name="new_password_confirmation"
                    label="Nueva contraseña"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type={showNewPassword ? "text" : "password"}
                    error={
                      formik.touched.new_password_confirmation &&
                      formik.errors.new_password_confirmation
                        ? true
                        : false
                    }
                    helperText={
                      <ErrorMessage name="new_password_confirmation" />
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    name="new_password"
                    label="Confirmar contraseña"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type={showNewPasswordConfirmation ? "text" : "password"}
                    error={
                      formik.touched.new_password && formik.errors.new_password
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="new_password" />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowNewPasswordConfirmation(
                                !showNewPasswordConfirmation
                              )
                            }
                            edge="end"
                          >
                            {showNewPasswordConfirmation ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
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
                    Cambiar contraseña
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
