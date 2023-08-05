import { AddCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  useMediaQuery,
} from "@mui/material";

import { useEffect, useState } from "react";

import { getRolesProvider } from "../../providers/role/providerRole";
import { IndexLayout } from "../../layouts";
import { CustomTable } from "../../ui/components/CustomTable";
import { getEmpleadosProvider } from "../../providers/empleado/providerEmpleado";

import { Buscador } from "../../ui/components/Buscador";
import { useNavigate } from "react-router-dom";
import { EliminarEmpleado } from "./EliminarEmpleado";
import { useSelector } from "react-redux";
import { TableResponsiveCustom } from "../../ui/components/TableResponsiveCustom";
import { useTheme } from "@mui/material/styles";

export const EmployeePage = () => {
  const { user } = useSelector((state) => state.auth);
  const [empleados, setEmpleados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [empleadosBuscador, setEmpleadosBuscador] = useState([]);
  const [empleado, setEmpleado] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [permisos, setPermisos] = useState("Usuario");
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));

  const navigate = useNavigate();

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(empleados, event.target.value);
  };

  useEffect(() => {
    const { nombre_rol } = user;
    if (nombre_rol === "Usuario") {
      setPermisos("Usuario");
    }
    if (nombre_rol === "Gerente") {
      setPermisos("Gerente");
    }
    if (nombre_rol === "Administrador") {
      setPermisos("Administrador");
    }
  }, [user]);

  const searching = (empleados, buscador) => {
    const newEmpleados = empleados.filter((empleado) => {
      if (empleado.nombre.toUpperCase().includes(buscador.toUpperCase()))
        return empleado;
    });

    setEmpleadosBuscador(newEmpleados);
  };

  const handleDelete = (row) => {
    setEmpleado(row);
    setModalDelete(!modalDelete);
  };

  const columns = [
    {
      field: "nombre_empleado",
      headerName: "Nombre",
      flex: 2,
      sortable: true,
    },
    {
      field: "apellido_paterno_empleado",
      headerName: "Apellido Paterno",
      flex: 2,
      sortable: true,
    },
    {
      field: "apellido_materno_empleado",
      headerName: "Apellido Materno",
      flex: 2,
      sortable: true,
    },
    {
      field: "fecha_ingreso_empleado",
      headerName: "Fecha de Ingreso",
      flex: 2,
      sortable: true,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 3,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (
          <Stack spacing={2} direction="row">
            <Button onClick={() => {}} variant="contained" color="info">
              Ver
            </Button>
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Button
                onClick={() => {
                  navigate(`/empleado/editar/${row.id_empleado}`);
                }}
                variant="contained"
                color="secondary"
              >
                Editar
              </Button>
            )}
            {permisos === "Administrador" && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(row)}
              >
                Eliminar
              </Button>
            )}
          </Stack>
        );
      },
    },
  ];

  const getEmpleados = async () => {
    const { data } = await getEmpleadosProvider();
    setEmpleados(data.empleados);
    setEmpleadosBuscador(data.empleados);
    setIsLoading(false);
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <>
      <Box>
        <IndexLayout title={"Empleado"}>
          <Grid
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            display={"flex"}
          >
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Grid item xs={12} md={4}>
                <Button
                  onClick={() => navigate("/empleado/agregar")}
                  variant="contained"
                  endIcon={<AddCircleOutline />}
                >
                  Agregar
                </Button>
              </Grid>
            )}

            <Grid item xs={12} md={8}>
              <Buscador buscador={buscador} handleSearch={handleSearch} />
            </Grid>
          </Grid>
          {isLoading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"80%"} />
          ) : (
            <>
              {xssize ? (
                <TableResponsiveCustom
                  isLoading={isLoading}
                  data={empleadosBuscador}
                  columns={columns}
                  idData={"id_empleado"}
                />
              ) : (
                <CustomTable
                  isLoading={isLoading}
                  data={empleadosBuscador}
                  columns={columns}
                  idData={"id_empleado"}
                />
              )}
            </>
          )}
        </IndexLayout>
        <EliminarEmpleado
          open={modalDelete}
          onClose={handleDelete}
          empleado={empleado}
          updateEmpleados={getEmpleados}
        />
      </Box>
    </>
  );
};
