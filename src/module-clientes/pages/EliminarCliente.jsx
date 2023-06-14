import React, { useState } from "react";
import { deleteClienteProvider } from "../../providers/cliente/providerCliente";
import { AlertMessage, ModalDelete } from "../../ui";
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

    const { ok, data, message } = await deleteClienteProvider(cliente.id);
    if (ok) {
      updateClientes();
      setMessage(message);
      setOpenAlert(true);
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
      <ModalDelete open={open} onClose={onClose}>
        <Typography
          sx={{ fontWeight: "bold" }}
          variant="h7"
          textAlign={"center"}
        >
          ¿DESEA ELIMINAR EL CLIENTE {cliente?.nombre} CON EL CORREO{" "}
          {cliente?.email}?
        </Typography>
        {error ? (
          <Alert sx={{ mt: 0, mb: 0 }} severity="error">
            {message}
          </Alert>
        ) : (
          ""
        )}
        <Box
          sx={{ mt: 3 }}
          display="flex"
          width={"100%"}
          justifyContent="space-around"
        >
          <Button variant="contained" onClick={onClose} color="error">
            Cancelar
          </Button>
          <Button
            onClick={deleteClienteHandle}
            type="submit"
            variant="contained"
          >
            Sí, deseo eliminarlo
          </Button>
        </Box>
      </ModalDelete>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={openAlert}
        severity="error"
      />
    </>
  );
};
