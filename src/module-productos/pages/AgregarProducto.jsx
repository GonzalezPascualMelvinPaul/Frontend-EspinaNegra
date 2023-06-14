import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Alert, Button, MenuItem, TextField } from "@mui/material";
import { addProductoProvider } from "../../providers/producto/providerProducto";
import { getProveedoresProvider } from "../../providers/proveedor/providerProveedor";
import { getCategoriasProvider } from "../../providers/categoria/providerCategoria";

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
  precio_compra: Yup.number()
    .required("El precio de compra es requerido")
    .test(
      "is-greater",
      "El precio de compra no puede ser mayor al precio de venta",
      function (value) {
        return this.parent.precio_venta >= value;
      }
    ),
  precio_venta: Yup.number().required("El precio de venta es requerido"),
  unidad_medida: Yup.string().required("La unidad de medida es requerida"),
  proveedor_id: Yup.number().required("El proveedor es requerido"),
  categoria_id: Yup.number().required("La categoría es requerida"),
  cantidad: Yup.number().required("La cantidad es requerida"),
  cantidad_minima: Yup.number().required("La cantidad mínima es requerida"),
});

const initialValues = {
  nombre: "",
  descripcion: "",
  precio_compra: "",
  precio_venta: "",
  unidad_medida: "",
  proveedor_id: "",
  categoria_id: "",
  cantidad: "",
  cantidad_minima: "",
};

export const AgregarProducto = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const getProveedores = async () => {
    const { data } = await getProveedoresProvider();
    setProveedores(data?.proveedores);
  };

  const getCategorias = async () => {
    const { data } = await getCategoriasProvider();
    setCategorias(data?.categorias);
  };

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { data, ok, message } = await addProductoProvider(values);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/producto/inicio");
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
    getProveedores();
    getCategorias();
  }, []);

  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="success"
      />
      <IndexLayout title={"Producto"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Productos",
              url: "/producto/inicio",
            },
            {
              name: "Agregar producto",
              url: "",
            },
          ]}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <Field
                as={TextField}
                label="Nombre"
                name="nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.nombre && formik.errors.nombre ? true : false
                }
                helperText={<ErrorMessage name="nombre" />}
              />
              <Field
                as={TextField}
                label="Descripción"
                name="descripcion"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.descripcion && formik.errors.descripcion
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="descripcion" />}
              />
              <Field
                as={TextField}
                label="Precio de compra"
                name="precio_compra"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.precio_compra && formik.errors.precio_compra
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="precio_compra" />}
              />
              <Field
                as={TextField}
                label="Precio de venta"
                name="precio_venta"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.precio_venta && formik.errors.precio_venta
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="precio_venta" />}
              />
              <Field
                as={TextField}
                label="Unidad de medida"
                name="unidad_medida"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                error={
                  formik.touched.unidad_medida && formik.errors.unidad_medida
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="unidad_medida" />}
              >
                <MenuItem value="litro">Litro</MenuItem>
                <MenuItem value="pieza">Pieza</MenuItem>
                <MenuItem value="kg">Kg</MenuItem>
              </Field>
              <Field
                as={TextField}
                label="Proveedor"
                name="proveedor_id"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                error={
                  formik.touched.proveedor_id && formik.errors.proveedor_id
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="proveedor_id" />}
              >
                {proveedores.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </Field>
              <Field
                as={TextField}
                label="Categoría"
                name="categoria_id"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                error={
                  formik.touched.categoria_id && formik.errors.categoria_id
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="categoria_id" />}
              >
                {categorias.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.nombre}
                  </MenuItem>
                ))}
              </Field>
              <Field
                as={TextField}
                label="Cantidad"
                name="cantidad"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.cantidad && formik.errors.cantidad
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="cantidad" />}
              />
              <Field
                as={TextField}
                label="Cantidad mínima"
                name="cantidad_minima"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.cantidad_minima &&
                  formik.errors.cantidad_minima
                    ? true
                    : false
                }
                helperText={<ErrorMessage name="cantidad_minima" />}
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
          )}
        </Formik>
      </IndexLayout>
    </>
  );
};
