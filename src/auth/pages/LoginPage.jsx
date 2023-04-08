import { Google } from "@mui/icons-material";
//import { Grid, TextField, Typography, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Grid,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { store } from "../../store/store";
// components
import Iconify from "../../components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { startLoginWithEmailPassword } from "../../store/auth/authThunks";

const formData = {
  email: "",
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

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  return (
    <>
      <AuthLayout title="Iniciar Sesion">
        <form onSubmit={onSubmit}>
          <Stack spacing={3}>
            <TextField
              name="email"
              label="Email address"
              type="email"
              placeholder="Correo@gmail.com"
              value={email}
              onChange={onInputChange}
            />

            <TextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={onInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <Checkbox name="remember" label="Remember me" />
            <Link variant="subtitle2" underline="hover">
              Forgot password?
            </Link>
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            //disabled={isAutehnticating}
          >
            Login
          </LoadingButton>
          <div>
            {store.getState().auth.status === "error" ? (
              <Alert sx={{ mt: 3, mb: 3 }} severity="error">
                {store.getState().auth.errorMessage}
              </Alert>
            ) : (
              ""
            )}
          </div>
          <Grid container direction={"row"} justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </form>
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
