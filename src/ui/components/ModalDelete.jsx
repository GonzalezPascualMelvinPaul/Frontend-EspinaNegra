import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Modal } from "@mui/material";

const useStyles = makeStyles({
  textField: {
    width: "100%",
    p: 2,
  },
});

export const ModalDelete = ({ open = false, onClose = () => {}, children }) => {
  const styles = useStyles();
  const closeModal = () => {
    onClose();
  };

  useEffect(() => {}, [open]);

  const body = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "fixed",
        width: "auto",
        backgroundColor: "white",
        border: "1px solid rgba(0,0,0,0.0)",
        borderRadius: "20px",
        top: "50%",
        left: "50%",
        transform: "translate(-47%,-50%)",
        pl: "3rem",
        pr: "3rem",
        pt: "3rem",
        height: "200px",

        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
        className={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          justifyItems: "center",
          alignContent: "center",
        }}
      >
        {children}
      </Box>
      <br />
    </Box>
  );

  return (
    <>
      <div
        className={{
          borderRadius: "20px",
          backgroundColor: "black",
        }}
      >
        <Modal open={open} onClose={closeModal}>
          {body}
        </Modal>
      </div>
    </>
  );
};
