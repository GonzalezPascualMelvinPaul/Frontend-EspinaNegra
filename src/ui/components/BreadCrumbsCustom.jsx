import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";

import React from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  hr: {
    backgroundColor: "#F7F6F6",

    width: "50%",
  },
});
const StyledLink = styled(Link)({
  "&:visited": {
    color: "inherit" /* Cambia esto al color que quieras */,
  },
});
export const BreadCrumbsCustom = ({ routes = [] }) => {
  const classes = useStyles();
  /* const breadcrumbs = routes.map((route) => (
    <Link key={route.name} color="inherit" underline="hover" to={route.url}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ fontSize: { md: "15px", xs: "10px" } }}>
          {route.name}
        </Typography>
      </Box>
    </Link>
  )); */

  const breadcrumbs = routes.map((route, index) => {
    if (index !== routes.length - 1) {
      // Si no es el último breadcrumb, lo renderizamos como un Link
      return (
        <StyledLink
          style={{
            textDecoration: "none",
          }}
          to={route.url}
          color="inherit"
          key={route.name}
        >
          {route.name}
        </StyledLink>
      );
    } else {
      // Si es el último breadcrumb, lo renderizamos como un Typography
      return (
        <Typography key={route.url} color="text.primary">
          {route.name}
        </Typography>
      );
    }
  });
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pl: 1,
        width: "100%",
        mb: 2,
        mt: { xl: 2, md: 0, xs: 0 },
      }}
    >
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};
