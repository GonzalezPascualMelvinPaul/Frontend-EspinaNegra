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
  total: Yup.number()
    .required("El total es requerido")
    .min(0, "El total no puede ser negativo"),
  observaciones: Yup.string().required("Las observaciones son requeridas"),
  recibo: Yup.string(),
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
  total: 0,
  observaciones: "",
  recibo: "",
  productos: [],
};

const calculateTotal = (productos) => {
  return productos.reduce(
    (total, producto) => total + producto.cantidad * producto.precio_compra,
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
      (p) => p.producto === producto.id
    );
    if (index !== -1) {
      arrayHelpers.form.setFieldValue(
        `productos.${index}.cantidad`,
        arrayHelpers.form.values.productos[index].cantidad + 1
      );
    } else {
      const cantidad = 1;
      if (cantidad > 0) {
        // Validación de cantidad mayor a cero
        arrayHelpers.push({
          producto: producto.id,
          cantidad: cantidad,
          precio_compra: producto.precio_compra,
        });
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
                  const total = calculateTotal(formik.values.productos);
                  formik.setFieldValue("total", total);
                }, [formik.values.productos]);

                return (
                  <Form>
                    <Field
                      as={TextField}
                      label="Observaciones"
                      name="observaciones"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.observaciones &&
                        formik.errors.observaciones
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="observaciones" />}
                    />
                    <Field
                      as={TextField}
                      label="Recibo"
                      name="recibo"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.recibo && formik.errors.recibo
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="recibo" />}
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
                                    <TableRow key={producto.id}>
                                      <TableCell>{producto.nombre}</TableCell>
                                      <TableCell>
                                        {producto.precio_compra}
                                      </TableCell>
                                      <TableCell>
                                        {formik.values.productos.reduce(
                                          (total, p) => {
                                            if (p.producto === producto.id) {
                                              return total + p.cantidad;
                                            } else {
                                              return total;
                                            }
                                          },
                                          0
                                        )}
                                      </TableCell>
                                      <TableCell>
                                        <Button
                                          onClick={() =>
                                            agregarProducto(
                                              producto,
                                              arrayHelpers
                                            )
                                          }
                                        >
                                          +
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            quitarProducto(
                                              producto.id,
                                              arrayHelpers
                                            )
                                          }
                                          disabled={
                                            !formik.values.productos.some(
                                              (p) => p.producto === producto.id
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
                      name="total"
                      variant="outlined"
                      fullWidth
                      disabled
                      margin="normal"
                      error={
                        formik.touched.total && formik.errors.total
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="total" />}
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
