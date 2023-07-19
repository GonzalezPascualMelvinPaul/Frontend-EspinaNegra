import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { Box, Container, Divider, Typography } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import Logo from "../../components/logo";
const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export const AuthLayout = ({ children, title = "" }) => {
  const mdUp = useResponsive("up", "md");
  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: "fixed",
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 20, mb: 5 }}>
              Hola, Bienvenido de Nuevo!
            </Typography>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <img
                style={{ width: "80%", height: "70%" }}
                src={"./espinaNegra.jpg"}
                alt="login"
              />
            </Box>
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              {title} en EspinaNegraAPP
            </Typography>
            <Divider sx={{ my: 3 }}>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              ></Typography>
            </Divider>
            {children}
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

{
  /* <Grid
container
spacing={0}
direction={"column"}
alignItems="center"
justifyContent={"center"}
sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
>
<Grid
  item
  className="box-shadow"
  xs={3}
  sx={{
    width: { md: 450 },
    backgroundColor: "white",
    padding: 3,
    borderRadius: 2,
  }}
>
  <Typography variant="h5" sx={{ mb: 1 }}>
    {title}
  </Typography>
  {children}
</Grid>
</Grid> */
}
