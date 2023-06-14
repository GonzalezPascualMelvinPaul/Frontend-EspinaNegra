import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";

export const IndexGasto = () => {
  return (
    <>
      <Helmet>
        <title>Gasto</title>
      </Helmet>
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Gasto
          </Typography>
          <Button
            onClick={() => {}}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Gasto
          </Button>
        </Stack>
      </Container>
    </>
  );
};
