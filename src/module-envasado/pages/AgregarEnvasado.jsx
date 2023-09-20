import React, { useState } from "react";
import dayjs from "dayjs";
import es from "date-fns/locale/es";
import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { addEnvasadoProvider } from "../../providers/envasado/providerEnvasado";
import { Add, Remove } from "@mui/icons-material";
import { getProductosMezcalesProvider } from "../../providers/producto/providerProducto";
import { useEffect } from "react";
dayjs.locale("es");

const validationSchema = Yup.object({
  fecha_inicio_envasado: Yup.date().required("La fecha de inicio es requerida"),
  fecha_final_envasado: Yup.date().required("La fecha final es requerida"),
  descripcion_envasado: Yup.string().required("La descripción es requerida"),
  folios_envasado: Yup.array()
    .of(Yup.string().required("El folio es requerido"))
    .required("Al menos un folio es requerido"),
  cantidad: Yup.number().required("La cantidad es requerida"),
  cantidad_holograma: Yup.number().required(
    "La cantidad de hologramas es requerido"
  ),
  folios_hologramas: Yup.array()
    .of(Yup.string().required("El folio de holograma es requerido"))
    .required("Al menos un folio es requerido"),
  total_envasado: Yup.number().required("El total de envasado es requerido"),
  id_producto: Yup.number().required(
    "El tipo de mezcal a envasar es requerido"
  ),
  total_producto: Yup.number()
    .required("El total de envasado es requerido")
    .test(
      "cantidades-iguales",
      "Las cantidades deben ser iguales",
      function (value) {
        return (
          this.parent.cantidad === this.parent.cantidad_holograma &&
          this.parent.cantidad === value
        );
      }
    ),
});

const initialValues = {
  fecha_inicio_envasado: new Date(),
  fecha_final_envasado: new Date(),
  descripcion_envasado: "",

  folios_envasado: [],
  cantidad: "",
  folios_hologramas: [],
  cantidad_holograma: "",
  total_envasado: "",
  id_producto: "",
  total_producto: "",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AgregarEnvasado = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [isLoadingProductos, setIsLoadingProductos] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const foliosOptionsMarbetes = Array.from({ length: 50 }, (_, index) => ({
    id: `Folio A${index + 1}`,
    numero_folio: `Folio A${index + 1}`,
  }));

  const foliosOptionsHologramas = Array.from({ length: 50 }, (_, index) => ({
    id: `Folio 2122${index + 1}`,
    numero_folio: `Folio 2122${index + 1}`,
  }));

  const getProductos = async () => {
    const { ok, data } = await getProductosMezcalesProvider();
    if (ok) {
      setProductos(data?.productos);
      setIsLoadingProductos(true);
    }
  };
  const handleCantidadChange = (value, formik) => {
    const cantidad = parseInt(value, 10) || 0;
    const selectedFolios = foliosOptionsMarbetes
      .slice(0, cantidad)
      .map((option) => option.id);
    formik.setFieldValue("cantidad", cantidad);
    formik.setFieldValue("folios_envasado", selectedFolios);
  };

  const handleCantidadHologramaChange = (value, formik) => {
    const cantidad = parseInt(value, 10) || 0;
    const selectedFolios = foliosOptionsHologramas
      .slice(0, cantidad)
      .map((option) => option.id);
    formik.setFieldValue("cantidad_holograma", cantidad);
    formik.setFieldValue("folios_hologramas", selectedFolios);
  };

  const onSubmit = async (values, e) => {
    values.fecha_inicio_envasado = dayjs(values.fecha_inicio_envasado).format(
      "YYYY-MM-DD"
    );
    values.fecha_final_envasado = dayjs(values.fecha_final_envasado).format(
      "YYYY-MM-DD"
    );
    setIsLoading(true);
    setError(false);
    setOpen(false);

    // Obtener el producto seleccionado
    const selectedProduct = productos.find(
      (product) => product.id_producto === values.id_producto
    );

    if (selectedProduct) {
      if (values.total_producto <= selectedProduct.cantidad_stock) {
        // Si la cantidad de envasado es menor o igual al stock, proceder con el envío

        const { data, ok, message } = await addEnvasadoProvider(values);
        if (ok) {
          setOpen(true);
          setError(false);
          setTimeout(() => {
            navigate("/envasado/inicio");
          }, 3000);
        } else {
          setError(true);
          setOpen(false);
        }
        console.log(message);
        setMessage(message);
        setIsLoading(false);
      } else {
        // Si la cantidad de envasado es mayor que el stock, mostrar mensaje de error
        setError(true);
        setMessage(
          "La cantidad de envasado es mayor que el stock disponible del producto seleccionado."
        );
        setIsLoading(false);
      }
    } else {
      setError(true);
      setMessage("No se pudo encontrar el producto seleccionado.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="success"
      />
      <IndexLayout title={"Envasado"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Envasados",
              url: "/envasado/inicio",
            },
            {
              name: "Agregar envasado",
              url: "",
            },
          ]}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h6">Datos del Envasado</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="fecha_inicio_envasado">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha de inicio"
                            name="fecha_inicio_envasado"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue("fecha_inicio_envasado", date)
                            }
                            error={
                              formik.touched.fecha_inicio_envasado &&
                              formik.errors.fecha_inicio_envasado
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_inicio_envasado" />
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="fecha_final_envasado">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha final"
                            name="fecha_final_envasado"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue("fecha_final_envasado", date)
                            }
                            error={
                              formik.touched.fecha_final_envasado &&
                              formik.errors.fecha_final_envasado
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_final_envasado" />
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                              />
                            )}
                          />
                        </LocalizationProvider>
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Mezcal a envasar"
                      name="id_producto"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      select
                      error={
                        formik.touched.id_producto && formik.errors.id_producto
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="id_producto" />}
                    >
                      {productos.map((option) => (
                        <MenuItem
                          key={option.id_producto}
                          value={option.id_producto}
                        >
                          {option.nombre_producto}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Descripcion"
                      name="descripcion_envasado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.descripcion_envasado &&
                        formik.errors.descripcion_envasado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="descripcion_envasado" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Costo de Envasado"
                      name="total_envasado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.total_envasado &&
                        formik.errors.total_envasado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="total_envasado" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Cantidad Marbetes"
                      name="cantidad"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      type="number"
                      onChange={(e) =>
                        handleCantidadChange(e.target.value, formik)
                      }
                      error={
                        formik.touched.cantidad && formik.errors.cantidad
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="cantidad" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Folios Marbetes
                    </InputLabel>
                    <FieldArray name="folios_envasado">
                      {(arrayHelpers) => (
                        <Select
                          sx={{ width: "100%" }}
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={formik.values.folios_envasado}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "folios_envasado",
                              e.target.value
                            );
                          }}
                          MenuProps={MenuProps}
                          input={<OutlinedInput label="Marbetes usados" />}
                          renderValue={(selected) =>
                            selected
                              .map(
                                (folioId) =>
                                  foliosOptionsMarbetes.find(
                                    (option) => option.id === folioId
                                  ).numero_folio
                              )
                              .join(", ")
                          }
                          style={{ maxWidth: "100%" }}
                        >
                          {foliosOptionsMarbetes.map((folioOption) => (
                            <MenuItem
                              key={folioOption.id}
                              value={folioOption.id}
                            >
                              <Checkbox
                                checked={formik.values.folios_envasado.includes(
                                  folioOption.id
                                )}
                              />
                              <ListItemText
                                primary={folioOption.numero_folio}
                              />
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </FieldArray>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Folios Marbetes usados"
                      name="folios_envasado"
                      variant="outlined"
                      fullWidth
                      disabled
                      margin="normal"
                      sx={{
                        marginTop: { xs: 2.4, md: 3 },
                      }}
                      error={
                        formik.touched.folios_envasado &&
                        formik.errors.folios_envasado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="folios_envasado" />}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Cantidad Hologramas"
                      name="cantidad_holograma"
                      variant="outlined"
                      fullWidth
                      sx={{
                        marginTop: { xs: 2.4, md: 3 },
                      }}
                      margin="normal"
                      type="number"
                      onChange={(e) =>
                        handleCantidadHologramaChange(e.target.value, formik)
                      }
                      error={
                        formik.touched.cantidad_holograma &&
                        formik.errors.cantidad_holograma
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="cantidad_holograma" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      Folios Hologramas
                    </InputLabel>
                    <FieldArray name="folios_hologramas">
                      {(arrayHelpers) => (
                        <Select
                          sx={{ width: "100%" }}
                          labelId="demo-multiple-checkbox-label"
                          id="demo-multiple-checkbox"
                          multiple
                          value={formik.values.folios_hologramas}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "folios_hologramas",
                              e.target.value
                            );
                          }}
                          MenuProps={MenuProps}
                          input={<OutlinedInput label="Hologramas usados" />}
                          renderValue={(selected) =>
                            selected
                              .map(
                                (folioId) =>
                                  foliosOptionsHologramas.find(
                                    (option) => option.id === folioId
                                  ).numero_folio
                              )
                              .join(", ")
                          }
                          style={{ maxWidth: "100%" }}
                        >
                          {foliosOptionsHologramas.map((folioOption) => (
                            <MenuItem
                              key={folioOption.id}
                              value={folioOption.id}
                            >
                              <Checkbox
                                checked={formik.values.folios_hologramas.includes(
                                  folioOption.id
                                )}
                              />
                              <ListItemText
                                primary={folioOption.numero_folio}
                              />
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    </FieldArray>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      sx={{
                        marginTop: { xs: 2.4, md: 3 },
                      }}
                      label="Folios Hologramas usados"
                      name="folios_hologramas"
                      variant="outlined"
                      fullWidth
                      disabled
                      margin="normal"
                      error={
                        formik.touched.folios_hologramas &&
                        formik.errors.folios_hologramas
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="folios_hologramas" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Cantidad a envasar"
                      name="total_producto"
                      variant="outlined"
                      fullWidth
                      sx={{
                        marginTop: { xs: 2.4, md: 3 },
                      }}
                      margin="normal"
                      error={
                        formik.touched.total_producto &&
                        formik.errors.total_producto
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="total_producto" />}
                    />
                  </Grid>
                  {/* <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Envase"
                      name="botellas"
                      variant="outlined"
                      fullWidth
                      select
                      margin="normal"
                      error={
                        formik.touched.botellas && formik.errors.botellas
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="botellas" />}
                    >
                      <MenuItem value="1">Botella</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Marbetes"
                      name="marbetes"
                      variant="outlined"
                      fullWidth
                      select
                      margin="normal"
                      error={
                        formik.touched.marbetes && formik.errors.marbetes
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="marbetes" />}
                    >
                      <MenuItem value="1">Marbete</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Holograma"
                      name="holograma"
                      variant="outlined"
                      fullWidth
                      select
                      margin="normal"
                      error={
                        formik.touched.holograma && formik.errors.holograma
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="holograma" />}
                    >
                      <MenuItem value="1">Holograma</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Mezcal"
                      name="mezcal"
                      variant="outlined"
                      fullWidth
                      select
                      margin="normal"
                      error={
                        formik.touched.mezcal && formik.errors.mezcal
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="mezcal" />}
                    >
                      <MenuItem value="1">Mezcal</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Biaticos"
                      name="biaticos"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.biaticos && formik.errors.biaticos
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="biaticos" />}
                    />
                  </Grid> */}

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
      </IndexLayout>
    </>
  );
};
