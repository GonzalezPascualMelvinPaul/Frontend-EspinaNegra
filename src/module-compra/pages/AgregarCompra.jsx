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
} from "@mui/material";
import { getClientesProvider } from "../../providers/cliente/providerCliente";
import { getProductosProvider } from "../../providers/producto/providerProducto";
import { get, set } from "lodash";
import { addCompraProvider } from "../../providers/compra/providerCompra";
import { is, tr } from "date-fns/locale";

const validationSchema = Yup.object({
  total_compra: Yup.number()
    .required("El total es requerido")
    .min(0, "El total no puede ser negativo"),
  observaciones_compra: Yup.string().required(
    "Las observaciones son requeridas"
  ),
  numero_factura_compra: Yup.string(),
  productos: Yup.array()
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
  total_compra: 0,
  observaciones_compra: "",
  numero_factura_compra: "",
  productos: [],
};

const calculateTotal = (productos) => {
  return productos.reduce(
    (total_compra, producto) =>
      total_compra + producto.cantidad * producto.precio_venta,
    0
  );
};

export const AgregarCompra = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [isLoadingProductos, setIsLoadingProductos] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getProductos = async () => {
    const { ok, data } = await getProductosProvider();
    if (ok) {
      setProductos(data?.productos);
      setIsLoadingProductos(true);
    }
  };

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { data, ok, message } = await addCompraProvider(values);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/compra/inicio");
      }, 3000);
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
  }, []);

  const agregarProducto = (producto, arrayHelpers) => {
    const index = arrayHelpers.form.values.productos.findIndex(
      (p) => p.producto === producto.id_producto
    );
    console.log(producto);
    console.log(index);
    if (index !== -1) {
      arrayHelpers.form.setFieldValue(
        `productos.${index}.cantidad`,
        arrayHelpers.form.values.productos[index].cantidad + 1
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
          precio_venta: producto.precio_compra_producto,
        };

        // Agregar el nuevo producto al array de productos
        arrayHelpers.push(nuevoProducto);
      }
    }
  };

  const quitarProducto = (productoId, arrayHelpers) => {
    const index = arrayHelpers.form.values.productos.findIndex(
      (p) => p.producto === productoId
    );
    if (index !== -1) {
      arrayHelpers.form.setFieldValue(
        `productos.${index}.cantidad`,
        arrayHelpers.form.values.productos[index].cantidad - 1
      );
      if (arrayHelpers.form.values.productos[index].cantidad === 0) {
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
      <IndexLayout title={"Compra"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Compras",
              url: "/compra/inicio",
            },
            {
              name: "Agregar compra",
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
                  const total_compra = calculateTotal(formik.values.productos);
                  formik.setFieldValue("total_compra", total_compra);
                }, [formik.values.productos]);

                return (
                  <Form>
                    <Field
                      as={TextField}
                      label="Observaciones"
                      name="observaciones_compra"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.observaciones_compra &&
                        formik.errors.observaciones_compra
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="observaciones_compra" />}
                    />
                    <Field
                      as={TextField}
                      label="Recibo"
                      name="numero_factura_compra"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.numero_factura_compra &&
                        formik.errors.numero_factura_compra
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="numero_factura_compra" />}
                    />

                    <FieldArray
                      name="productos"
                      render={(arrayHelpers) => {
                        // Obtener el último producto en el array
                        const lastProduct = get(
                          formik.values,
                          `productos.${formik.values.productos.length - 1}`,
                          {}
                        );

                        // Chequear si el último producto tiene un producto y una cantidad
                        const isLastProductValid =
                          formik.values.productos.length === 0 ||
                          (lastProduct.productos && lastProduct.cantidad);

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
                                        {producto.precio_compra_producto}
                                      </TableCell>
                                      <TableCell>
                                        {/* Mostrar input para la cantidad */}
                                        <Field
                                          as={TextField}
                                          name={`productos.${formik.values.productos.findIndex(
                                            (p) =>
                                              p.producto ===
                                              producto.id_producto
                                          )}.cantidad`}
                                          type="number"
                                          InputProps={{
                                            inputProps: {
                                              min: 0, // No permitir números negativos
                                              max: producto.cantidad_maxima_stock, // Establecer la cantidad máxima según la cantidad en stock
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
                                            formik.values.productos.reduce(
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
                                            ) >= producto.cantidad_maxima_stock // Deshabilitar el botón "+" cuando la cantidad es igual a la cantidad en stock
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
                                            !formik.values.productos.some(
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
                    <Field
                      as={TextField}
                      label="Total"
                      name="total_compra"
                      variant="outlined"
                      fullWidth
                      disabled
                      margin="normal"
                      error={
                        formik.touched.total_compra &&
                        formik.errors.total_compra
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="total_compra" />}
                      InputProps={{
                        inputProps: {
                          maxLength: 5,
                        },
                      }}
                      inputMode="numeric"
                    />
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
                    <Button type="submit" variant="contained">
                      Crear
                    </Button>
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
