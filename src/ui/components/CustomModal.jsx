import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Modal } from "@mui/material";

const useStyles = makeStyles({
  textField: {
    width: "100%",
    p: 2,
  },
});

export const CustomModal = ({ open = false, onClose = () => {}, children }) => {
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
        width: { xs: "80%", md: "40%" },
        backgroundColor: "white",
        border: "1px solid rgba(0,0,0,0.0)",
        borderRadius: "10px",
        top: "50%",
        left: "50%",
        transform: "translate(-47%,-50%)",
        pl: "1rem",
        pr: "1rem",
        pt: "1rem",
        pb: "1rem",
        height: "auto",
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
