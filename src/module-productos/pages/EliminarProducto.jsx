import React, { useState } from "react";
import { deleteProductoProvider } from "../../providers/producto/providerProducto";
import { AlertMessage, CustomModal } from "../../ui";
import { Alert, Box, Button, Typography } from "@mui/material";

export const EliminarProducto = ({
  open = false,
  onClose = () => {},
  updateProductos = () => {},
  producto = {},
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const deleteProductoHandle = async () => {
    const { ok, data, message } = await deleteProductoProvider(
      producto.id_producto
    );
    if (ok) {
      updateProductos();
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
          ¿DESEA ELIMINAR EL PRODUCTO {producto?.nombre_producto} DE LA
          CATEGORIA {producto?.nombre_categoria}?
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
            onClick={deleteProductoHandle}
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
