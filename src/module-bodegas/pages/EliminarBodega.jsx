import React, { useState } from "react";
import { deleteBodegaProvider } from "../../providers/bodega/providerBodega";
import { AlertMessage, ModalDelete } from "../../ui";
import { Alert, Box, Button, Typography } from "@mui/material";

export const EliminarBodega = ({
  open = false,
  onClose = () => {},
  updateBodegas = () => {},
  bodega = {},
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const deleteBodegaHandle = async () => {
    setMessage("");

    const { ok, data, message } = await deleteBodegaProvider(bodega.id);
    if (ok) {
      updateBodegas();
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
          ¿DESEA ELIMINAR LA BODEGA {bodega?.nombre}?
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
            onClick={deleteBodegaHandle}
            type="submit"
            variant="contained"
          >
            Sí, deseo eliminarla
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
