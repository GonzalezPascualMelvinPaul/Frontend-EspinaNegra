import React, { useEffect, useState } from "react";
import { CardRow } from "./CardRow";
import { Box } from "@mui/material";

export const TableResponsiveCustom = ({ columns = [], data = [] }) => {
  const [dataLocal, setDataLocal] = useState(data);

  useEffect(() => {
    setDataLocal(data);
  }, [data]);

  return (
    <Box display="flex" flexDirection="column">
      {dataLocal.map((row, id) => (
        <CardRow key={id} row={row} columns={columns} />
      ))}
    </Box>
  );
};
