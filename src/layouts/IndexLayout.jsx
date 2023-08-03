import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";

export const IndexLayout = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <title> {title} </title>
      </Helmet>
      <Box width="100%" pt={3}>
        {title && (
          <>
            <Box width="100%" justifyContent="center" display={"flex"}>
              <Box
                width="100%"
                flexWrap={"wrap"}
                justifyContent="center"
                display={"flex"}
                sx={{ height: "50px" }}
              >
                <Typography
                  textAlign={"center"}
                  variant="h4"
                  sx={{ fontWeight: "bold" }}
                >
                  {title}
                </Typography>
              </Box>
            </Box>
          </>
        )}

        <Box sx={{ pl: 2, pr: 2 }} height={"400px"}>
          {children}
        </Box>
      </Box>
    </>
  );
};
