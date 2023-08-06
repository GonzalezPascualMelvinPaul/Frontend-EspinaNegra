import React, { useState } from "react";
import { deleteEnvasadoProvider } from "../../providers/envasado/providerEnvasado";
import { AlertMessage, CustomModal } from "../../ui";
import { Alert, Box, Button, Typography } from "@mui/material";

export const EliminarEnvasado = ({
  open = false,
  onClose = () => {},
  updateEnvasados = () => {},
  envasado = {},
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const deleteEnvasadoHandle = async () => {
    try {
      const { ok, message } = await deleteEnvasadoProvider(
        envasado.id_envasado
      );

      if (ok) {
        updateEnvasados();
        setMessage(message);
        setOpenAlert(true);
        setError(false);
        onClose();
      } else {
        setError(true);
        setMessage(message);
      }
    } catch (error) {
      setError(true);
      setMessage("Ocurrió un error al eliminar el envasado.");
    }
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
          ¿DESEA ELIMINAR LA PRODUCCION con ID: {envasado?.id_envasado} con
          fecha {envasado?.fecha_inicio_envasado} al{" "}
          {envasado?.fecha_final_envasado} ?
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
            onClick={deleteEnvasadoHandle}
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
