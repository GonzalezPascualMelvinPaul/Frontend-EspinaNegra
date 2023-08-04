import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";

import GoogleMaps from "../../ui/components/GoogleMaps";
import { IndexLayout } from "../../layouts";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

export const IndexGrafico = () => {
  return (
    <>
      <Box>
        <IndexLayout title={""}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Compras del Mes
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: 100, label: "Corchos" },
                          { id: 1, value: 20, label: "Botellas" },
                          { id: 2, value: 20, label: "Etiquetas" },
                          { id: 3, value: 100, label: "Marbetes" },
                        ],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 180,
                        cx: 100,
                        cy: 100,
                      },
                    ]}
                    width={350}
                    height={250}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Producciones
                  </Typography>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    width={500}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 600 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Sueldos
                  </Typography>
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: ["group A", "group B", "group C"],
                      },
                    ]}
                    series={[
                      { data: [4, 3, 5] },
                      { data: [1, 6, 3] },
                      { data: [2, 5, 6] },
                    ]}
                    width={500}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </IndexLayout>
      </Box>
    </>
  );
};
