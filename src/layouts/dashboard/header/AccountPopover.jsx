import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
// mocks_
import account from "../../../_mock/account";
import { deleteToken } from "../../../providers/auth/configAuth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/auth/authSlice";
import { getEnvVariables } from "../../../helpers/getEnvVariables";
import {
  DashboardOutlined,
  Logout,
  Person2,
  Settings,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/dashboard/inicio",
  },
  {
    label: "Perfil",
    icon: <Person2 />,
    path: "/usuario/perfil",
  },
  {
    label: "Configuracion",
    icon: <Settings />,
    path: "/usuario/configuracion",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(null);
  const { VITE_API_URL_IMAGE } = getEnvVariables();
  const navigate = useNavigate();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleNavigate = (path) => {
    setOpen(null);
    navigate(path);
  };

  const onLogout = () => {
    deleteToken();
    dispatch(logout());
  };
  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar
          //src={`http://localhost:8000/storage/imagenes/${user?.imagen}`}

          src={
            user?.imagen == undefined
              ? "/public/avatar_1.jpg"
              : `${VITE_API_URL_IMAGE}${user?.imagen}`
          }
          alt="photoURL"
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleNavigate(option.path)}
            >
              {option.icon} {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={onLogout} sx={{ m: 1 }}>
          <Logout /> Logout
        </MenuItem>
      </Popover>
    </>
  );
}
