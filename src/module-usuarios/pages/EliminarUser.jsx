import React, { useState } from "react";
import { deleteUserProvider } from "../../providers/usuario/providerUsuario";
import { AlertMessage, ModalDelete } from "../../ui";
import { Alert, Box, Button, Typography } from "@mui/material";

export const EliminarUser = ({
  open = false,
  onClose = () => {},
  updateUsers = () => {},
  user = {},
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const deleteUserHandle = async () => {
    setMessage("");

    const { ok, data, message } = await deleteUserProvider(user.id);
    if (ok) {
      updateUsers();
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
          ¿DESEA ELIMINAR EL USUARIO {user?.username} CON EL CORREO{" "}
          {user?.email}?
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
          <Button onClick={deleteUserHandle} type="submit" variant="contained">
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
