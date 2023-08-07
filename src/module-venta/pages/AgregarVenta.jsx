import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import {
  Button,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Skeleton,
  Grid,
} from "@mui/material";
import { getClientesProvider } from "../../providers/cliente/providerCliente";
import {
  getProductosMezcalesProvider,
  getProductosProvider,
} from "../../providers/producto/providerProducto";
import { get } from "lodash";
import { addVentaProvider } from "../../providers/venta/providerVenta";

// Asegúrate de ajustar este esquema de validación para que se ajuste a los campos de tu modelo de venta
const validationSchema = Yup.object({
  id_cliente: Yup.number().required("El cliente es requerido"),
  total_venta: Yup.number()
    .required("El total es requerido")
    .min(0, "El total no puede ser negativo"),
  observaciones_venta: Yup.string().required(
    "Las observaciones son requeridas"
  ),
  numero_factura_venta: Yup.string(),
  producto: Yup.array()
    .of(
      Yup.object().shape({
        producto: Yup.number().required("El producto es requerido"),
        cantidad: Yup.number()
          .required("La cantidad es requerida")
          .min(1, "La cantidad debe ser al menos 1"),
      })
    )
    .required("Debe agregar al menos un producto"),
});

const initialValues = {
  id_cliente: "",
  total_venta: 0,
  observaciones_venta: "",
  numero_factura_venta: "",
  producto: [],
};

const calculateTotal = (productos) => {
  return productos.reduce(
    (total_venta, producto) =>
      total_venta + producto.cantidad * producto.precio_venta,
    0
  );
};

export const AgregarVenta = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isLoadingProductos, setIsLoadingProductos] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getClientes = async () => {
    const { data } = await getClientesProvider();
    setClientes(data?.clientes);
  };

  const getProductos = async () => {
    const { ok, data } = await getProductosMezcalesProvider();
    if (ok) {
      setProductos(data?.productos);
      setIsLoadingProductos(true);
    }
  };

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { data, ok, message } = await addVentaProvider(values);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/venta/inicio");
      }, 2000);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProductos();
    getClientes();
  }, []);

  const agregarProducto = (producto, arrayHelpers) => {
    const index = arrayHelpers.form.values.producto.findIndex(
      (p) => p.producto === producto.id_producto
    );
    if (index !== -1) {
      arrayHelpers.form.setFieldValue(
        `producto.${index}.cantidad`,
        arrayHelpers.form.values.producto[index].cantidad + 1
      );
    } else {
      const cantidad = 1;
      if (cantidad > 0) {
        // Obtener el stock del producto
        const stock = productos.find(
          (p) => p.id_producto === producto.id_producto
        )?.cantidad_stock;

        // Validar que la cantidad no exceda el stock
        const cantidadInicial = Math.min(cantidad, stock);

        // Crear el nuevo producto con la cantidad inicial
        const nuevoProducto = {
          producto: producto.id_producto,
          cantidad: cantidadInicial,
          precio_venta: producto.precio_venta_producto,
        };

        // Agregar el nuevo producto al array de productos
        arrayHelpers.push(nuevoProducto);
      }
    }
  };

  const quitarProducto = (productoId, arrayHelpers) => {
    const index = arrayHelpers.form.values.producto.findIndex(
      (p) => p.producto === productoId
    );
    if (index !== -1) {
      arrayHelpers.form.setFieldValue(
        `producto.${index}.cantidad`,
        arrayHelpers.form.values.producto[index].cantidad - 1
      );
      if (arrayHelpers.form.values.producto[index].cantidad === 0) {
        arrayHelpers.remove(index);
      }
    }
  };
  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="success"
      />
      <IndexLayout title={"Venta"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Ventas",
              url: "/venta/inicio",
            },
            {
              name: "Venta",
              url: "",
            },
          ]}
        />
        {!isLoadingProductos ? (
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        ) : (
          <>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                useEffect(() => {
                  const total_venta = calculateTotal(formik.values.producto);
                  formik.setFieldValue("total_venta", total_venta);
                }, [formik.values.producto]);

                return (
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          label="Cliente"
                          name="id_cliente"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          select
                          error={
                            formik.touched.id_cliente &&
                            formik.errors.id_cliente
                              ? true
                              : false
                          }
                          helperText={<ErrorMessage name="id_cliente" />}
                        >
                          {clientes.map((option) => (
                            <MenuItem
                              key={option.id_cliente}
                              value={option.id_cliente}
                            >
                              {option.nombre_persona_fisica}
                            </MenuItem>
                          ))}
                        </Field>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          label="Observaciones"
                          name="observaciones_venta"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          error={
                            formik.touched.observaciones_venta &&
                            formik.errors.observaciones_venta
                              ? true
                              : false
                          }
                          helperText={
                            <ErrorMessage name="observaciones_venta" />
                          }
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          label="N. Factura / Nota"
                          name="numero_factura_venta"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          error={
                            formik.touched.numero_factura_venta &&
                            formik.errors.numero_factura_venta
                              ? true
                              : false
                          }
                          helperText={
                            <ErrorMessage name="numero_factura_venta" />
                          }
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          as={TextField}
                          label="Total"
                          name="total_venta"
                          variant="outlined"
                          fullWidth
                          disabled
                          margin="normal"
                          error={
                            formik.touched.total_venta &&
                            formik.errors.total_venta
                              ? true
                              : false
                          }
                          helperText={<ErrorMessage name="total_venta" />}
                          InputProps={{
                            inputProps: {
                              maxLength: 5,
                            },
                          }}
                          inputMode="numeric"
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <FieldArray
                          name="producto"
                          render={(arrayHelpers) => {
                            // Obtener el último producto en el array
                            const lastProduct = get(
                              formik.values,
                              `producto.${formik.values.producto.length - 1}`,
                              {}
                            );

                            // Chequear si el último producto tiene un producto y una cantidad
                            const isLastProductValid =
                              formik.values.producto.length === 0 ||
                              (lastProduct.producto && lastProduct.cantidad);

                            return (
                              <div>
                                <TableContainer>
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Producto</TableCell>
                                        <TableCell>Precio</TableCell>
                                        <TableCell>Cantidad</TableCell>
                                        <TableCell>Acciones</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {productos.map((producto) => (
                                        <TableRow key={producto.id_producto}>
                                          <TableCell>
                                            {producto.nombre_producto}
                                          </TableCell>
                                          <TableCell>
                                            {producto.precio_venta_producto}
                                          </TableCell>
                                          <TableCell>
                                            {/* Mostrar input para la cantidad */}
                                            <Field
                                              as={TextField}
                                              name={`producto.${formik.values.producto.findIndex(
                                                (p) =>
                                                  p.producto ===
                                                  producto.id_producto
                                              )}.cantidad`}
                                              type="number"
                                              InputProps={{
                                                inputProps: {
                                                  min: 0, // No permitir números negativos
                                                  max: producto.cantidad_stock, // Establecer la cantidad máxima según la cantidad en stock
                                                },
                                              }}
                                            />
                                          </TableCell>
                                          <TableCell>
                                            {/* Botones de agregar y quitar */}
                                            <Button
                                              onClick={() =>
                                                agregarProducto(
                                                  producto,
                                                  arrayHelpers
                                                )
                                              }
                                              disabled={
                                                formik.values.producto.reduce(
                                                  (total_venta, p) => {
                                                    if (
                                                      p.producto ===
                                                      producto.id_producto
                                                    ) {
                                                      return (
                                                        total_venta + p.cantidad
                                                      );
                                                    } else {
                                                      return total_venta;
                                                    }
                                                  },
                                                  0
                                                ) >= producto.cantidad_stock // Deshabilitar el botón "+" cuando la cantidad es igual a la cantidad en stock
                                              }
                                            >
                                              +
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                quitarProducto(
                                                  producto.id_producto,
                                                  arrayHelpers
                                                )
                                              }
                                              disabled={
                                                !formik.values.producto.some(
                                                  (p) =>
                                                    p.producto ===
                                                    producto.id_producto
                                                )
                                              }
                                            >
                                              -
                                            </Button>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </div>
                            );
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        {error ? (
                          <Alert sx={{ mt: 0, mb: 0 }} severity="error">
                            {message}
                          </Alert>
                        ) : (
                          ""
                        )}
                        {isLoading && !error ? (
                          <Alert sx={{ mt: 0, mb: 0 }} severity="success">
                            Enviando datos...
                          </Alert>
                        ) : (
                          ""
                        )}
                      </Grid>
                      <Grid
                        display={"flex"}
                        justifyContent={"end"}
                        item
                        xs={12}
                        md={12}
                        sx={{ mb: "2rem" }}
                      >
                        <Button type="submit" variant="contained">
                          Crear
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </IndexLayout>
    </>
  );
};
