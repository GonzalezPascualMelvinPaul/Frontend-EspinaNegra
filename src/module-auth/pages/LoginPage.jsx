import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
//import { Grid, TextField, Typography, Button, Link } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Grid,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { store } from "../../store/store";
// components
import Iconify from "../../components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { startLoginWithEmailPassword } from "../../store/auth/authThunks";
import { Formik } from "formik";
import { object, string } from "yup";
import { getEnvVariables } from "../../helpers/getEnvVariables";
const { VITE_ESPINA_NEGRA_API_URL } = getEnvVariables();
const validationSchema = object({
  email_usuario: string("Ingese su correo electronico")
    .email()
    .required("Este campo es obligatorio"),
  password: string("Ingrese su contraseña").required("Este campo es requerido"),
});

const formData = {
  email_usuario: "",
  password: "",
};

export const LoginPage = () => {
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData);

  const isAutehnticating = useMemo(() => status === "checking", [status]);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate("/auth/register", { replace: true });
  };

  const onSubmit = (values) => {
    console.log(values);

    dispatch(
      startLoginWithEmailPassword(values, () => {
        navigate("/dashboard/inicio");
      })
    );
  };

  return (
    <>
      <AuthLayout title="Iniciar Sesion">
        <Formik
          initialValues={{
            email_usuario: "18161127@itoaxaca.edu.mx",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Formulario", values);
            onSubmit(values);
          }}
        >
          {({ handleChange, values, errors, touched, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  name="email_usuario"
                  label="Email address"
                  id="email_usuario"
                  type="email"
                  placeholder="Correo@gmail.com"
                  onChange={handleChange}
                  value={values.email_usuario}
                  error={touched.email_usuario && Boolean(errors.email_usuario)}
                  helperText={touched.email_usuario && errors.email_usuario}
                />

                <TextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
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
              </Stack>
              <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                <div>
                  {store.getState().auth.status === "error" ? (
                    <Alert sx={{ mt: 3, mb: 3 }} severity="error">
                      {store.getState().auth.errorMessage}
                    </Alert>
                  ) : (
                    ""
                  )}
                </div>
              </Grid>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                //disabled={isAutehnticating}
              >
                Login
              </LoadingButton>
            </form>
          )}
        </Formik>
      </AuthLayout>
    </>
  );
};
{
  /* <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type={"email"}
              placeholder="Correo@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type={"password"}
              placeholder="Contraseña"
              name="password"
              fullWidth
              value={password}
              onChange={onInputChange}
            ></TextField>
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button onClick={onGoogleSignIn} variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction={"row"} justifyContent="end">
          <Link component={RouterLink} color="inherit" to="/auth/register">
            Crear una cuenta
          </Link>
        </Grid>
      </form>
    </AuthLayout> */
}
