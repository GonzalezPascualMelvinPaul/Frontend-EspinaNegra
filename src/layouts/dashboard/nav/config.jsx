// component
import SvgColor from "../../../components/svg-color";
import {
  AccountBoxOutlined,
  CropRotateOutlined,
  DashboardOutlined,
  GroupOutlined,
  Inventory2Outlined,
  LocalMallOutlined,
  LocalShippingOutlined,
  MapsHomeWorkOutlined,
  PermContactCalendarOutlined,
  ScienceOutlined,
  ShoppingCartOutlined,
  ShowChartOutlined,
  WarehouseOutlined,
} from "@mui/icons-material";
// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlined />,
  },
  {
    title: "Usuarios",
    path: "/usuario",
    icon: <AccountBoxOutlined />,
  },
  {
    title: "Empleados",
    path: "/empleado",
    icon: <GroupOutlined />,
  },
  {
    title: "Proveedor",
    path: "/proveedor",
    icon: <MapsHomeWorkOutlined />,
  },
  {
    title: "Clientes",
    path: "/cliente",
    icon: <PermContactCalendarOutlined />,
  },
  {
    title: "Productos",
    path: "/producto",
    icon: <WarehouseOutlined />,
  },
  {
    title: "Bodegas",
    path: "/bodega",
    icon: <Inventory2Outlined />,
  },

  {
    title: "Venta",
    path: "/venta",
    icon: <LocalShippingOutlined />,
  },
  {
    title: "Compra",
    path: "/compra",
    icon: <LocalMallOutlined />,
  },
  {
    title: "Gastos",
    path: "/gasto",
    icon: <ShowChartOutlined />,
  },
  {
    title: "Produccion",
    path: "/produccion",
    icon: <CropRotateOutlined />,
  },
  {
    title: "Envasado",
    path: "/envasado",
    icon: <ScienceOutlined />,
  },
];

export default navConfig;
