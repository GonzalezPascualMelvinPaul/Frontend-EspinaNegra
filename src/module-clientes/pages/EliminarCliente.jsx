import React, { useState } from "react";
import { deleteClienteProvider } from "../../providers/cliente/providerCliente";
import { AlertMessage, CustomModal } from "../../ui";
import { Alert, Box, Button, Typography } from "@mui/material";

export const EliminarCliente = ({
  open = false,
  onClose = () => {},
  updateClientes = () => {},
  cliente = {},
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const deleteClienteHandle = async () => {
    setMessage("");

    const { ok, data, message } = await deleteClienteProvider(
      cliente.id_cliente
    );
    if (ok) {
      updateClientes();
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
          ¿DESEA ELIMINAR EL CLIENTE {cliente?.nombre_persona_fisica} CON EL
          CORREO {cliente?.email_cliente}?
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
            onClick={deleteClienteHandle}
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
