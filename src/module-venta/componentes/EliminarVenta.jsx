import React, { useState } from "react";

import { AlertMessage, CustomModal } from "../../ui";
import { Alert, Box, Button, Typography } from "@mui/material";
import { deleteVentaProvider } from "../../providers/venta/providerVenta";

export const EliminarVenta = ({
  open = false,
  onClose = () => {},
  updateventas = () => {},
  venta = {},
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const deleteVentaHandle = async () => {
    setMessage("");

    const { ok, data, message } = await deleteVentaProvider(venta.id_venta);
    if (ok) {
      updateventas();
      setMessage(message);
      setOpenAlert(true);
      setMessage("");
      setError(false);
      onClose();
    } else {
      setError(true);
      setMessage(message);
    }
    setMessage(message);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };
  return (
    <>
      <CustomModal open={open} onClose={onClose}>
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="h7"
          textAlign={"center"}
        >
          ¿DESEA ELIMINAR LA VENTA con ID: {venta?.id_venta} VENDIDO A{" "}
          {venta?.cliente?.nombre_persona_fisica} ?
        </Typography>
        {error ? (
          <Alert sx={{ mt: 0, mb: 0 }} severity="error">
            {message}
          </Alert>
        ) : (
          ""
        )}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: { md: "row", xs: "column-reverse" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ mb: 1 }}
            variant="contained"
            onClick={onClose}
            color="error"
          >
            Cancelar
          </Button>
          <Button
            sx={{ mb: 1 }}
            onClick={deleteVentaHandle}
            type="submit"
            variant="contained"
          >
            Sí, deseo eliminarlo
          </Button>
        </Box>
      </CustomModal>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={openAlert}
        severity="error"
      />
    </>
  );
};
