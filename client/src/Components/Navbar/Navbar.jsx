import * as React from "react";
import { Link, NavLink } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
//drawer imports
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
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

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/auth";
//speech recognition
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useState } from "react";
import StopIcon from "@mui/icons-material/Stop";
import Popup from "../Popup/Popup";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "1px solid #e0e0e0",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  minWidth: "200px",
  width: "auto",
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
    display: "none",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const VoiceIconWrapper = styled("div")(({ theme }) => ({
  border: "1px solid #eb4034",
  padding: theme.spacing(0, 2),
  height: "50px",
  position: "relative",
  pointerEvents: "none",
  display: "flex",
  alignItems: "start",
  justifyContent: "end",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "auto",
    [theme.breakpoints.up("md")]: {
      border: "1px solid transparent",
      width: "auto",
    },
  },
}));
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
  //backdrop settings

  var User = useSelector((state) => state.fetch_current_userReducer);

  //speech recognition
  const [searchKeyword, setSearchKeyword] = useState("");
  var [listen, setListen] = React.useState(false);
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  var { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
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

            <ListItem disablePadding>
              <ListItemButton>
                <Link
                  to="/healthnews"
                  id="drawerLinks"
                  onClick={() => {
                    handleOpen();
                    setTimeout(() => {
                      handleClose();
                    }, 5000);
                  }}
                >
                  Lifestyle News
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </>
      )}
      {User?.user?.userType === "doctor" && (
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
                <Link
                  to={`/consultation-Room/${User?.user?._id}`}
                  id="drawerLinks"
                >
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
            <ListItem disablePadding>
              <form style={{ display: "flex" }} onSubmit={handleBingSearch}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>

                  <StyledInputBase
                    name="searchKeyword"
                    value={searchKeyword || transcript}
                    onChange={(e) => {
                      setSearchKeyword(e.target.value);
                      if (e.target.value.length === 0) {
                        resetTranscript();
                      }
                    }}
                    onSubmit={(e) => {
                      console.log(e.target.value);
                    }}
                    autoComplete="off"
                    placeholder="Bing Powered Search…"
                    inputProps={{ "aria-label": "search" }}
                  />

                  <span
                    style={{ border: "1px solid transparent", padding: "0px" }}
                  >
                    {listen ? (
                      <>
                        <Button
                          style={{
                            marginLeft: "0px",
                            border: "1px solid transparent",
                            marginTop: "-2px",
                          }}
                          onClick={() => {
                            SpeechRecognition.stopListening();
                            setListen(false);
                          }}
                          data-toggle="tooltip"
                          title="Stop Listening"
                          className="voiceBtn"
                        >
                          <StopIcon />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          style={{
                            marginLeft: "0px",
                            border: "1px solid transparent",
                            marginTop: "-2px",
                          }}
                          onClick={() => {
                            startListening();
                            setListen(true);
                          }}
                          data-toggle="tooltip"
                          title="Search by voice"
                          className="voiceBtn"
                        >
                          <KeyboardVoiceIcon />
                        </Button>
                      </>
                    )}
                  </span>
                </Search>
              </form>
            </ListItem>
          </List>
        </>
      )}
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
  var cart = useSelector((state) => state.cartReducer);
  const [noticlicked, setNoticlicked] = React.useState(false);

  const handleBingSearch = async (e) => {
    e.preventDefault();
    handleOpen();
    setTimeout(() => {
      handleClose();
    }, 5000);
    if (searchKeyword.length === 0 && !transcript) {
      return;
    }
    const searchresponse = await axios.post("https://med-hos-server.vercel.app/search", {
      params: { searchKeyword: searchKeyword || transcript },
    });

    const newTab = window.open(
      `${searchresponse?.data?.webPages?.webSearchUrl}`,
      "_blank"
    );
    if (newTab) {
      newTab.focus();
    }
  };

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
              <Link
                to={`/healthnews`}
                className="navlinks drawerLinks"
                onClick={() => {
                  handleOpen();
                  setTimeout(() => {
                    handleClose();
                  }, 5000);
                }}
              >
                LifeStyle News
              </Link>
            </Box>
          )}

          <div className="toolbox">
            <form style={{ display: "flex" }} onSubmit={handleBingSearch}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>

                <StyledInputBase
                  name="searchKeyword"
                  value={searchKeyword || transcript}
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                    if (e.target.value.length === 0) {
                      resetTranscript();
                    }
                  }}
                  onSubmit={(e) => {
                    console.log(e.target.value);
                  }}
                  autoComplete="off"
                  placeholder="Bing Powered Search…"
                  inputProps={{ "aria-label": "search" }}
                />

                <span
                  style={{ border: "1px solid transparent", padding: "0px" }}
                >
                  {listen ? (
                    <>
                      <Button
                        style={{
                          marginLeft: "0px",
                          border: "1px solid transparent",
                          marginTop: "-2px",
                        }}
                        onClick={() => {
                          SpeechRecognition.stopListening();
                          setListen(false);
                        }}
                        data-toggle="tooltip"
                        title="Stop Listening"
                        className="voiceBtn"
                      >
                        <StopIcon />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        style={{
                          marginLeft: "0px",
                          border: "1px solid transparent",
                          marginTop: "-2px",
                        }}
                        onClick={() => {
                          startListening();
                          setListen(true);
                        }}
                        data-toggle="tooltip"
                        title="Search by voice"
                        className="voiceBtn"
                      >
                        <KeyboardVoiceIcon />
                      </Button>
                    </>
                  )}
                </span>
              </Search>
            </form>
            <div>
              <Popup
                trigger={listen}
                setTrigger={setListen}
                onClose={listen}
              ></Popup>
            </div>

            {User?.user?.userType === "user" && (
              <Stack spacing={2} direction="row">
                <IconButton>
                  <Badge badgeContent={cart?.data?.length} color="primary">
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
