import React, { useState } from "react";
import { deleteUserProvider } from "../../providers/usuario/providerUsuario";
import { AlertMessage, CustomModal } from "../../ui";
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
      <CustomModal open={open} onClose={onClose}>
        <Box sx={{ padding: "16px" }}>
          <Typography
            sx={{ fontWeight: "bold", textAlign: "center" }}
            variant="subtitle1"
          >
            ¿DESEA ELIMINAR EL USUARIO {user?.username} CON EL CORREO{" "}
            {user?.email}?
          </Typography>
          {error && (
            <Alert sx={{ mt: 2, mb: 2 }} severity="error">
              {message}
            </Alert>
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
              onClick={deleteUserHandle}
              variant="contained"
            >
              Sí, deseo eliminarlo
            </Button>
          </Box>
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
