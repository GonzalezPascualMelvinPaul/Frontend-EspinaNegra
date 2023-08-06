import React, { useState } from "react";
import { deleteProduccionProvider } from "../../providers/produccion/providerProduccion";
import { AlertMessage, CustomModal } from "../../ui";
import { Alert, Box, Button, Typography } from "@mui/material";

export const EliminarProduccion = ({
  open = false,
  onClose = () => {},
  updateProducciones = () => {},
  produccion = {},
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const deleteProduccionHandle = async () => {
    try {
      const { ok, message } = await deleteProduccionProvider(
        produccion.id_produccion
      );

      if (ok) {
        updateProducciones();
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
      setMessage("Ocurrió un error al eliminar la producción.");
      console.error("Error al eliminar la producción:", error);
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
          ¿DESEA ELIMINAR LA PRODUCCION con ID: {produccion?.id_produccion} con
          fecha {produccion?.fecha_inicio_produccion} al{" "}
          {produccion?.fecha_final_produccion} ?
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
            onClick={deleteProduccionHandle}
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
