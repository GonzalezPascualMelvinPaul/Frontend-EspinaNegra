import { Box, Stack, Typography } from "@mui/material";
import React from "react";

export const CardRow = ({ columns = [], row }) => {
  const primaryColor = "#0f4016"; // Color principal

  return (
    <Box
      sx={{
        margin: "10px",
        padding: "15px",
        border: `1px solid ${primaryColor}`,
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {columns.map(({ field, headerName, renderCell }) => (
        <React.Fragment key={field}>
          {field !== "acciones" && (
            <>
              {renderCell ? (
                <Stack spacing={2} direction="row">
                  <Typography>
                    <strong>
                      {headerName}:{"    "}
                    </strong>
                    {"   "}
                  </Typography>

                  {renderCell({ value: row[field], row })}
                </Stack>
              ) : (
                <Typography>
                  <strong>{headerName}:</strong> {row[field]}
                </Typography>
              )}
            </>
          )}
          {field === "acciones" && (
            <Stack spacing={2} direction="row">
              {renderCell({ row })} {/* Renderizar el componente de acciones */}
            </Stack>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default CardRow;
