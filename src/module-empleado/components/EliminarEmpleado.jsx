import React, { useState } from "react";
import { deleteEmpleadoProvider } from "../../providers/empleado/providerEmpleado";
import { AlertMessage, CustomModal } from "../../ui";
import { Alert, Box, Button, Typography } from "@mui/material";

export const EliminarEmpleado = ({
  open = false,
  onClose = () => {},
  updateEmpleados = () => {},
  empleado = {},
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const deleteEmpleadoHandle = async () => {
    setError(false);
    setOpenAlert(false);
    const { ok, data, message } = await deleteEmpleadoProvider(
      empleado.id_empleado
    );
    if (ok) {
      updateEmpleados();
      setMessage("");
      setError(false);
      setOpenAlert(true);
      onClose();
    } else {
      setError(true);
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
          ¿DESEA ELIMINAR EL EMPLEADO {empleado?.nombre_empleado}{" "}
          {empleado?.apellido_paterno_empleado}{" "}
          {empleado?.apellido_materno_empleado}?
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
            onClick={deleteEmpleadoHandle}
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
