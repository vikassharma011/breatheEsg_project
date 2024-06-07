import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Category as CategoryIcon,
  Person as PersonIcon,
  PowerSettingsNew as PowerSettingsNewIcon,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

const Dashboard = (props) => {
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Hi BreatheESG
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/employee">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="entity manager" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/member">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="data manager" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/membership">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="reporting" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/profile">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button >
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            hi breatheESG
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
