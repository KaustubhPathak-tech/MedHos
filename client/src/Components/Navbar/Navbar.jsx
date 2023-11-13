import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
//drawer imports
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import "./Navbar.css";
import decode from "jwt-decode";
import { setCurrentUser } from "../../actions/currentUser";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import HomeIcon from "@mui/icons-material/Home";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../Assets/Logo.png";
//badges
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

// import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/auth";

const StyledHeader = styled(AppBar)`
  background-color: #f0f2f1 !important;
  flex-direction: row;
  flex-grow: 1;
`;

const links = styled(Typography)`
  color: black;
  font-weight: 600;
`;

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function ResponsiveAppBar({ change }) {
  var User = useSelector((state) => state.fetch_current_userReducer);

  //drawer settings

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {User?.user?.userType === "user" && (
        <>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={`/${User?.user?.userType}/dash`} id="drawerLinks">
                  <HomeIcon />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={`/user/doctor`} id="drawerLinks">
                  Find Doctors
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={`/user/doctor-consult`} id="drawerLinks">
                  Video Consult
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to="/medicines" id="drawerLinks">
                  Medicines
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
      {User?.user?.userType === "doctor" && (
        <>
          <List>
            {/* <ListItem disablePadding>
              <ListItemButton>Patients</ListItemButton>
            </ListItem> */}
             <ListItem disablePadding>
              <ListItemButton>
                <Link to={`/${User?.user?.userType}/dash`} id="drawerLinks">
                  <HomeIcon />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={`/consultation-Room/${User?.user?._id}`} id="drawerLinks">
                  Video Consult
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <Link to={`/doctor/appointments`} id="drawerLinks">
                  Appointments
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  //backdrop settings
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // const { user } = useAuth0();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);
  React.useEffect(() => {
    const existingtoken = User?.token;
    if (existingtoken) {
      const decodedToken = decode(existingtoken);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(setCurrentUser(null));
      }
    }
  }, [dispatch, User]);

  var isTrueSet = localStorage.getItem("theme") === "true";
  if (isTrueSet) {
    var theme = darkTheme;
  } else {
    theme = lightTheme;
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    handleOpen();
    setTimeout(() => {
      handleClose();
    }, 1000);
    handleCloseUserMenu();
    dispatch(logout());
  };

  const handleGotoConsult = () => {
    // handleCloseNavMenu();
    window.location.href = `/consult-room/${User?.user?.email}`;
  };

  var redirect = "";
  if (User) {
    redirect = `/${User?.user?.userType}/dash`;
  } else {
    redirect = "/";
  }
  const notification = JSON.parse(localStorage.getItem("Notification"));
  var cart = JSON.parse(localStorage.getItem("cart"));
  React.useEffect(() => {
    cart = JSON.parse(localStorage.getItem("cart"));
  }, []);

  const [noticlicked, setNoticlicked] = React.useState(false);
  return (
    <StyledHeader position="fixed" id="navBar" sx={{ color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={redirect} id="logo" className="drawerLinks">
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <img src={logo} height="40px" alt="logo" />
            </Typography>
          </Link>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {User && (
            <React.Fragment>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={toggleDrawer("left", true)}
                color="inherit"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="left"
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                id="drawer"
              >
                {list("left")}
              </Drawer>
            </React.Fragment>
          )}
          {!User && (
            <Link to={redirect}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                id="mobileLogo"
              >
                <img src={logo} height="50px" alt="logo" />
              </Typography>
            </Link>
          )}
          {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} id="items">
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}

          <Typography
            variant="h5"
            noWrap
            component="a"
            to={redirect}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            id="logo"
          >
            <img src={logo} height="50px" alt="logo" />
          </Typography>
          {User?.user?.userType === "user" && (
            <Box className="navBox">
              {/* <Button
              onClick={() => {
                handleCloseNavMenu();
              }}
              sx={{
                my: 1,
                color: "#03618a",
                display: "block",
                fontStyle: "inherit",
                textTransform: "none",
              }}
            >
              <NavLink to={`/consult-room/${User?.user?.email}`}>
                Video Consult
              </NavLink>
            </Button> */}

              <Link to="/user/doctor" className="navlinks drawerLinks">
                Find Doctors
              </Link>

              <Link
                to={`/user/doctor-consult`}
                className="navlinks drawerLinks"
              >
                Video Consult
              </Link>
              <Link to={`/medicines`} className="navlinks drawerLinks">
                Medicines
              </Link>
            </Box>
          )}

          {/* <Typography>{User?.user?.name || user?.name}</Typography> */}
          <div className="toolbox">
            {User?.user?.userType === "user" && (
              <Stack spacing={2} direction="row">
                <IconButton>
                  <Badge badgeContent={cart?.length} color="primary">
                    <Link to={`/user/cart`} id="drawerLinks">
                      <ShoppingCartIcon />
                    </Link>
                  </Badge>
                </IconButton>

                <IconButton
                  size="large"
                  onClick={() => {
                    setNoticlicked(true);
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  }}
                >
                  <Badge
                    badgeContent={notification?.notification?.length}
                    color="primary"
                  >
                    <Link
                      to={`${User?.user?.userType}/notifications`}
                      id="drawerLinks"
                    >
                      <NotificationsActiveIcon />
                    </Link>
                  </Badge>
                </IconButton>
              </Stack>
            )}

            {/* <IconButton sx={{ ml: 1 }} onClick={() => change()} color="inherit">
            {theme.palette.mode === "dark" ? (
              <>
                <Brightness7Icon />
              </>
            ) : (
              <>
                <Brightness4Icon />
              </>
            )}
          </IconButton> */}

            {User === null ? (
              <></>
            ) : (
              <>
                {User?.user?.userType === "doctor" ? (
                  <Box
                    sx={{
                      flexGrow: 1,
                      textAlign: "right",
                      marginRight: "0px",
                    }}
                  >
                    <Tooltip>
                      <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                        <Avatar
                          alt={`${User?.user?.name}`}
                          src={`${User?.user?.avatar}`}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <Link
                            to={`/${User?.user?.userType}/appointments`}
                            className="navlinks drawerLinks"
                          >
                            My Appointments
                          </Link>
                        </Typography>
                      </MenuItem>

                      {/* <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          View/Update Profile
                        </Typography>
                      </MenuItem> */}

                      <MenuItem onClick={handleLogout}>
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{
                        flexGrow: 0,
                        marginLeft: "10px",
                        position: "sticky",
                        marginRight: "0px",
                      }}
                    >
                      <Tooltip>
                        <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                          <Avatar
                            alt={`${User?.user?.name}`}
                            src={`${User?.user?.avatar}`}
                          />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">
                            <Link
                              to={`/${User?.user?.userType}/appointments`}
                              className="toollinks drawerLinks"
                            >
                              My Appointments
                            </Link>
                          </Typography>
                        </MenuItem>

                        <MenuItem
                          onClick={() => {
                            handleCloseUserMenu();
                          }}
                        >
                          <Typography textAlign="center">
                            <Link
                              to={`/${User?.user?.userType}/orders`}
                              className="toollinks drawerLinks"
                            >
                              Your Orders
                            </Link>
                          </Typography>
                        </MenuItem>

                        <MenuItem onClick={handleCloseUserMenu}>
                          <Typography textAlign="center" className="toollinks">
                          <Link
                              to="/user/profile"
                              className="toollinks drawerLinks"
                            >
                              View/Update Profile
                            </Link>
                          </Typography>
                        </MenuItem>

                        <MenuItem onClick={handleLogout}>
                          <Typography textAlign="center" className="toollinks">
                            Logout
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                  </>
                )}
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </StyledHeader>
  );
}
export default ResponsiveAppBar;
