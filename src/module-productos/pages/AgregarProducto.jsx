import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { addProductoProvider } from "../../providers/producto/providerProducto";
import { getProveedoresProvider } from "../../providers/proveedor/providerProveedor";
import { getCategoriasProvider } from "../../providers/categoria/providerCategoria";
import { getTipoProductoProvider } from "../../providers/tipo_producto/providerTipoProducto";
import { getUnidadMedidaProvider } from "../../providers/unidad_medida/providerUnidadMedida";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  nombre_producto: Yup.string().required("El nombre es requerido"),
  descripcion_producto: Yup.string().required("La descripción es requerida"),
  numero_folio_producto: Yup.string().required(
    "El numero de folio es requerida"
  ),
  precio_compra_producto: Yup.number()
    .required("El precio de compra es requerido")
    .test(
      "is-greater",
      "El precio de compra no puede ser mayor al precio de venta",
      function (value) {
        return this.parent.precio_venta_producto >= value;
      }
    ),
  precio_venta_producto: Yup.number().required(
    "El precio de venta es requerido"
  ),
  id_unidad_medida: Yup.number().required("La unidad de medida es requerida"),
  id_proveedor: Yup.number().required("El proveedor es requerido"),
  id_categoria: Yup.number().required("La categoría es requerida"),
  id_tipo_producto: Yup.number().required("El tipo de producto es requerido"),
  cantidad_stock: Yup.number().required("La cantidad es requerida"),
  cantidad_minima_stock: Yup.number()
    .required("La cantidad mínima es requerida")
    .test(
      "is-greater",
      "La cantidad minima de stock no puede ser mayor al stock maximo",
      function (value) {
        return this.parent.cantidad_maxima_stock >= value;
      }
    ),
  cantidad_maxima_stock: Yup.number().required(
    "La cantidad maxima es requerida"
  ),
});

const initialValues = {
  nombre_producto: "",
  descripcion_producto: "",
  numero_folio_producto: "",
  precio_compra_producto: "",
  precio_venta_producto: "",
  id_unidad_medida: "",
  id_proveedor: "",
  id_categoria: "",
  id_tipo_producto: "",
  cantidad_stock: "",
  cantidad_minima_stock: "",
  cantidad_maxima_stock: "",
};

export const AgregarProducto = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tipoProductos, setTipoProductos] = useState([]);
  const [unididadMedidas, setUnidadMedidas] = useState([]);
  const navigate = useNavigate();
  const getProveedores = async () => {
    const { data } = await getProveedoresProvider();
    setProveedores(data?.proveedores);
  };

  const getCategorias = async () => {
    const { data } = await getCategoriasProvider();
    setCategorias(data?.categorias);
  };

  const getTipoProducto = async () => {
    const { data } = await getTipoProductoProvider();
    setTipoProductos(data?.tipos);
  };

  const getUnidadMedidas = async () => {
    const { data } = await getUnidadMedidaProvider();
    setUnidadMedidas(data?.unidad_medidas);
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
    getTipoProducto();
    getUnidadMedidas();
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h6">Datos del Producto</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Nombre"
                    name="nombre_producto"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.nombre_producto &&
                      formik.errors.nombre_producto
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="nombre_producto" />}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Descripción"
                    name="descripcion_producto"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.descripcion_producto &&
                      formik.errors.descripcion_producto
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="descripcion_producto" />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Numero de folio"
                    name="numero_folio_producto"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.numero_folio_producto &&
                      formik.errors.numero_folio_producto
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="numero_folio_producto" />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Precio de compra"
                    name="precio_compra_producto"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.precio_compra_producto &&
                      formik.errors.precio_compra_producto
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="precio_compra_producto" />}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Precio de venta"
                    name="precio_venta_producto"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.precio_venta_producto &&
                      formik.errors.precio_venta_producto
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="precio_venta_producto" />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Unidad de medida"
                    name="id_unidad_medida"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    select
                    error={
                      formik.touched.id_unidad_medida &&
                      formik.errors.id_unidad_medida
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="id_unidad_medida" />}
                  >
                    {unididadMedidas.map((option) => (
                      <MenuItem
                        key={option.id_unidad_medida}
                        value={option.id_unidad_medida}
                      >
                        {option.nombre_unidad_medida}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Tipo Producto"
                    name="id_tipo_producto"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    select
                    error={
                      formik.touched.id_tipo_producto &&
                      formik.errors.id_tipo_producto
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="id_tipo_producto" />}
                  >
                    {tipoProductos.map((option) => (
                      <MenuItem
                        key={option.id_tipo_producto}
                        value={option.id_tipo_producto}
                      >
                        {option.nombre_tipo_producto}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Proveedor"
                    name="id_proveedor"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    select
                    error={
                      formik.touched.id_proveedor && formik.errors.id_proveedor
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="id_proveedor" />}
                  >
                    {proveedores.map((option) => (
                      <MenuItem
                        key={option.id_proveedor}
                        value={option.id_proveedor}
                      >
                        {option.nombre_persona_fisica}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Categoría"
                    name="id_categoria"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    select
                    error={
                      formik.touched.id_categoria && formik.errors.id_categoria
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="id_categoria" />}
                  >
                    {categorias.map((option) => (
                      <MenuItem
                        key={option.id_categoria}
                        value={option.id_categoria}
                      >
                        {option.nombre_categoria}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Cantidad"
                    name="cantidad_stock"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.cantidad_stock &&
                      formik.errors.cantidad_stock
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="cantidad_stock" />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Cantidad mínima"
                    name="cantidad_minima_stock"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.cantidad_minima_stock &&
                      formik.errors.cantidad_minima_stock
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="cantidad_minima_stock" />}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    label="Cantidad maxima"
                    name="cantidad_maxima_stock"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.cantidad_maxima_stock &&
                      formik.errors.cantidad_maxima_stock
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="cantidad_maxima_stock" />}
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
          )}
        </Formik>
      </IndexLayout>
    </>
  );
};
