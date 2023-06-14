import React, { useState } from "react";
import { deleteEmpleadoProvider } from "../../providers/empleado/providerEmpleado";
import { AlertMessage, ModalDelete } from "../../ui";
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
    const { ok, data, message } = await deleteEmpleadoProvider(empleado.id);
    if (ok) {
      updateEmpleados();
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
          ¿DESEA ELIMINAR EL EMPLEADO {empleado?.nombre}{" "}
          {empleado?.apellido_paterno} {empleado?.apellido_materno}?
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
            onClick={deleteEmpleadoHandle}
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
