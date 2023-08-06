import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
// utils
import { bgBlur } from "../../../utils/cssStyles";
// components
import Iconify from "../../../components/iconify";

import AccountPopover from "./AccountPopover";
import { Menu } from "@mui/icons-material";
import Logo from "../../../components/logo/Logo";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: "#0f4016" }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "#FFF",
            display: { lg: "none" },
          }}
        >
          <Menu />
        </IconButton>

        <Avatar sx={{ width: { md: 56, xs: 35 }, height: { md: 56, xs: 35 } }}>
          <Logo />
        </Avatar>
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
            direction: "column",
            width: "100%",
          }}
        >
          {" "}
          <Typography variant="h4" sx={{ color: "#FFF" }}>
            Mezcal Espina Negra
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
