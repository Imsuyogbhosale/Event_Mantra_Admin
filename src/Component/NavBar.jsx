import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Icons
import { IoMdMenu, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import {
  MdSpaceDashboard,
  MdPanorama,
  MdSell,
  MdAppShortcut,
} from "react-icons/md";
import { IoIosList, IoMdContact } from "react-icons/io";
import { IoReceiptOutline, IoCalendarClear } from "react-icons/io5";
import { FaUsers, FaRegCircle } from "react-icons/fa6";
import { FcInvite } from "react-icons/fc";
import { FiTrendingUp } from "react-icons/fi";

import emlogo from "../../public/img/emlogo.jpeg";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: "#605ca8",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// ...imports remain the same...

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [feature, setFeature] = React.useState("dashboard");
  const [expanded, setExpanded] = React.useState({});
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [mouseY, setMouseY] = React.useState(100);
  const toggleDrawer = () => {
    if (open) setExpanded({});
    setOpen(!open);
  };

  const toggleAccordion = (link) => {
    setExpanded((prev) => ({
      [link]: !prev[link],
    }));
  };

  const handleSidebarClick = (item) => {
    if (item.subType) {
      open && toggleAccordion(item.link);
    } else {
      navigate(`/${item.link}`);
    }
  };

  const handleSubItemClick = (parentLink, subItem) => {
    navigate(`/${subItem.link}`);
    setHoveredItem(null);
    if (!open) setExpanded({ [parentLink]: false });
  };

  const isActive = (item) =>
    location.pathname?.slice(1) === item.link ||
    (item.subType &&
      item.subItems.some((s) => `${s.link}` === location.pathname?.slice(1)));

  const sidebarData = [
    {
      label: "Dashboard",
      icon: <MdSpaceDashboard />,
      link: "dashboard",
      subType: false,
    },
    {
      label: "Categories",
      icon: <IoIosList />,
      link: "categories",
      subType: false,
    },
    {
      label: "Category Form",
      icon: <MdPanorama />,
      link: "categoryForm",
      subType: false,
    },
    {
      label: "Subscription Plan",
      icon: <IoReceiptOutline />,
      link: "subscriptionPlan",
      subType: false,
    },
    {
      label: "Terms & Condition",
      icon: <IoCalendarClear />,
      link: "termsCondition",
      subType: true,
      subItems: [
        { label: "Terms", link: "terms" },
        { label: "Condition", link: "condition" },
      ],
    },
    { label: "Vendors", icon: <FaUsers />, link: "vendors", subType: false },
    {
      label: "E Invite",
      icon: <FcInvite />,
      link: "eInvite",
      subType: true,
      subItems: [
        { label: "Wedding Cards", link: "weddingCards" },
        { label: "Video Invites", link: "videoInvites" },
        { label: "Requests", link: "videoRequests" },
      ],
    },
    {
      label: "Top Trending",
      icon: <FiTrendingUp />,
      link: "topTrending",
      subType: false,
    },
    {
      label: "Top Selling",
      icon: <MdSell />,
      link: "topSelling",
      subType: false,
    },
    {
      label: "About App",
      icon: <MdAppShortcut />,
      link: "aboutApp",
      subType: true,
      subItems: [
        { label: "Story", link: "story" },
        { label: "Intro Screen", link: "introScreen" },
        { label: "Carousel", link: "carousel" },
        { label: "Rating", link: "rating" },
      ],
    },
    {
      label: "Contact Us",
      icon: <IoMdContact />,
      link: "contactUs",
      subType: false,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img src={emlogo} alt="Logo" style={{ width: 40, height: 40 }} />
            {open && (
              <Typography variant="h6" noWrap>
                Events Mantra
              </Typography>
            )}
            <IconButton color="inherit" onClick={toggleDrawer}>
              <IoMdMenu />
            </IconButton>
          </Box>
          <IconButton color="inherit">
            <IoLogOutOutline />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", flexGrow: 1, marginTop: 8 }}>
        <Drawer variant="permanent" open={open}>
          <Toolbar />
          <List>
            {sidebarData.map((item) => (
              <React.Fragment key={item.label}>
                <ListItem
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => handleSidebarClick(item)}
                  onMouseEnter={(e) => {
                    if (!open) {
                      setHoveredItem(item);
                      setMouseY(e.clientY);
                    }
                  }}
                  onMouseLeave={() => !open && setHoveredItem(null)}
                >
                  <ListItemButton
                    selected={isActive(item)}
                    sx={{
                      minHeight: 0,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      bgcolor: isActive(item) ? "#e0e0e0" : "transparent",
                      "&:hover": {
                        bgcolor: "#f0f0f0",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color: isActive(item) ? "#605ca8" : "inherit",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: isActive(item) ? "#605ca8" : "inherit",
                      }}
                    />
                    {item.subType &&
                      open &&
                      (expanded[item.link] ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowForward />
                      ))}
                  </ListItemButton>
                </ListItem>

                {item.subType && item.subItems && (
                  <Collapse
                    in={expanded[item.link] || false}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => {
                        const subFeature = `${item.link}-${subItem.link}`;
                        const subActive = feature === subFeature;
                        return (
                          <ListItem
                            key={subItem.label}
                            disablePadding
                            sx={{ pl: open ? 1 : 2, cursor: "pointer" }}
                            onClick={() =>
                              handleSubItemClick(item.link, subItem)
                            }
                          >
                            <ListItemButton
                              selected={subActive}
                              sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                                bgcolor: subActive ? "#e0e0e0" : "transparent",
                                "&:hover": {
                                  bgcolor: "#f0f0f0",
                                },
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: open ? 3 : "auto",
                                  justifyContent: "center",
                                  color: subActive ? "#605ca8" : "inherit",
                                }}
                              >
                                <FaRegCircle style={{ fontSize: 12 }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={subItem.label}
                                sx={{
                                  opacity: open ? 1 : 0,
                                  color: subActive ? "#605ca8" : "inherit",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Drawer>
        {/* Hover Tooltip for Collapsed Sidebar */}
        {!open && hoveredItem && (
          <Box
            sx={{
              position: "fixed",
              top: mouseY,
              left: `calc(${theme.spacing(8)} + 0px)`,
              backgroundColor: "#605ca8",
              minHeight: "50px",
              color: "#fff",
              px: 2,
              py: 1,
              borderRadius: 1,
              boxShadow: 3,
              zIndex: 1300,
              minWidth: 150,
            }}
            onMouseEnter={() => setHoveredItem(hoveredItem)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                if (!hoveredItem.subType) setFeature(hoveredItem.link);
              }}
            >
              {hoveredItem.label}
            </Typography>
            {hoveredItem.subType && (
              <List dense>
                {hoveredItem.subItems.map((subItem) => (
                  <ListItem
                    key={subItem.label}
                    disablePadding
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      handleSubItemClick(hoveredItem.link, subItem)
                    }
                  >
                    <ListItemText primary={subItem.label} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "#f9f9f9",
          }}
          onMouseLeave={() => !open && setHoveredItem(null)}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
