import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Link,
  Button,
  Drawer,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
// mock
import account from "../../../_mock/account";
// hooks
import useResponsive from "../../../hooks/useResponsive";
// components
import Logo from "../../../components/logo";
import Scrollbar from "../../../components/scrollbar";
import NavSection from "../../../components/nav-section";
//

import { useSelector } from "react-redux";
import { getEnvVariables } from "../../../helpers/getEnvVariables";
import { navConfig, navConfigEmpleado, navConfigGerente } from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { VITE_API_URL_IMAGE } = getEnvVariables();
  const isDesktop = useResponsive("up", "lg");
  const [permisos, setPermisos] = useState(navConfigEmpleado);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const { nombre_rol } = user;
    if (nombre_rol === "Usuario") {
      setPermisos(navConfigEmpleado);
    }
    if (nombre_rol === "Gerente") {
      setPermisos(navConfigGerente);
    }
    if (nombre_rol === "Administrador") {
      setPermisos(navConfig);
    }
  }, [user]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
        backgroundColor: "#0f4016",
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex" }}></Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar
              src={
                user?.imagen_usuario == undefined
                  ? "./avatar_1.jpg"
                  : `${VITE_API_URL_IMAGE}${user?.imagen_usuario}`
              }
              alt="photoURL"
            />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "#FFF" }}>
                {user?.nombre_empleado}
              </Typography>

              <Typography variant="body2" sx={{ color: "#FFF" }}>
                {user?.nombre_rol}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      <NavSection data={permisos} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              /*  borderRightStyle: "dashed", */
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
