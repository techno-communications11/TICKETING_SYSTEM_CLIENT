import React, { use, useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import { createTheme } from '@mui/material/styles';
import { Account, AccountPopoverFooter, AccountPreview, SignOutButton } from '@toolpad/core';
import { Avatar, CircularProgress, Divider, IconButton, Menu, Stack, ThemeProvider, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { NAVIGATION } from '../Constant/Navigate';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Notifications from '../PublicPages/Notifications';
import { OverlayTrigger } from 'react-bootstrap';
import Navbar from '../Components/Navbar/Navbar';
import GlobalInstallBar from '../Components/GlobalInstallBar/GlobalInstallBar';
const demoTheme = createTheme({
  palette: {
    primary: {
      main: '#6F2DA8', // Purple
      light: '#9C27B0',
      dark: '#3F0A78',
    },
    secondary: {
      main: '#E01B24', // Red
    },
    background: {
      default: '#F5F5F5', // Light gray
      paper: '#FFFFFF', // White
    },
    text: {
      //   primary: '#000000', // Black
      //   secondary: '#616161', // Dark gray
      primary: '#000000', // Black
      secondary: '#000000', // Dark gray
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 400,
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: (theme) =>
            `0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'}`,
        },
      },
    },
  },
});

function SidebarFooterAccountPreview(props) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0}>
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}
SidebarFooterAccountPreview.propTypes = {
  handleClick: PropTypes.func,
  mini: PropTypes.bool.isRequired,
  open: PropTypes.bool,
};

const accounts = [
];

function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      {accounts && accounts.length > 0 &&
        <div>
          <Typography variant="body2" mx={2} mt={1}>
            Accounts
          </Typography>
          <MenuList>
            {accounts?.map((account) => (
              <MenuItem
                key={account.id}
                component="button"
                sx={{
                  justifyContent: 'flex-start',
                  width: '100%',
                  columnGap: 2,
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#F0F4F8',
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <ListItemIcon>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      fontSize: '1.2rem',
                      bgcolor: account.color,
                    }}
                    src={account.image ?? ''}
                    alt={account.name ?? ''}
                  >
                    {account.name[0]}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                  }}
                  primary={account.name}
                  secondary={account.email}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </MenuItem>
            ))}
          </MenuList>
        </div>
      }
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

const createPreviewComponent = (mini) => {
  function PreviewComponent(props) {
    return <SidebarFooterAccountPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Box
      sx={{
        borderTop: '2px solid #ff099b',
        pt: 2,
      }}
    >
      <Account
        slots={{
          preview: PreviewComponent,
          popoverContent: SidebarFooterAccountPopover,
        }}
        slotProps={{
          popover: {

            transformOrigin: { horizontal: 'left', vertical: 'bottom' },
            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            disableAutoFocus: true,
            slotProps: {
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: (theme) =>
                    `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.10)'
                      : 'rgba(0,0,0,0.32)'
                    })`,
                  mt: 1,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            },
          },
        }}
      />
    </Box>
  );
}

function ToolbarActionsSearch() {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={2}>
      <div className="rounded-circle"  >
        <IconButton onClick={() => { navigate('/public-support') }}>
          <SupportAgentIcon sx={{ color: '#616161' }} />
        </IconButton>
      </div>
      <div className="rounded-circle" >

        <IconButton onClick={() => { navigate('/chat-system') }}>
          {/* <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="tooltip-disabled">Working on it! Please stay tuned.</Tooltip>}
          >
          </OverlayTrigger> */}
          <ChatBubbleOutlineIcon sx={{ color: '#616161' }} />
        </IconButton>
      </div>
      <div className="rounded-circle" >
        {/* <IconButton>
          <NotificationsIcon sx={{ color: '#616161' }} />
        </IconButton> */}
        <Notifications />
      </div>
      <ThemeSwitcher />

    </Stack>
  );
}

CustomAppTitle.propTypes = {
  mini: PropTypes.bool.isRequired,
};

function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
      {/* <Typography variant="h6" sx={{ fontWeight: 600 }}>
        TECHNO COMMUNICATIONS LLC
      </Typography> */}
      <Navbar />
    </Stack>
  );
}

export default function DashboardLayouts({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.currentUser);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [session, setSession] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchUser = useCallback(async () => {
    const currentDatauser = await user;
    // console.log("currentDatauser", currentDatauser)
    setCurrentUserData(currentDatauser);
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  useEffect(() => {
    if (currentUserData) {
      const demoSession = {
        user: {
          name: currentUserData?.name || "Unknown User",
          email: currentUserData?.email || 'Unknown@email.com',
          image: currentUserData?.profile_image || currentUserData?.name[0] || 'https://avatars.githubusercontent.com/u/1',
          // role: currentUserData?.subDepartment ? currentUserData?.subDepartment.toLowerCase() : currentUserData?.department.toLowerCase(),
          // role: currentUserData?.department ? currentUserData?.department.toLowerCase() : currentUserData?.subDepartment.toLowerCase(),
          role: ["Senior Manager", "District Manager", "Market Manager", "SuperAdmin"].includes(currentUserData?.department)
            ? currentUserData?.department.toLowerCase()
            : currentUserData?.subDepartment.toLowerCase(),

        },
      };
      setSession(demoSession);
    }
  }, [currentUserData]);
  // console.log(["Senior Manager", "District Manager", "Market Manager","SuperAdmin"].includes(currentUserData?.department))
  // console.log(currentUserData)

  const authentication = {
    signIn: () => setSession(session),
    signOut: () => {
      setSession(null);
      Cookies.remove('id', { path: '/' });
      Cookies.remove('token', { path: '/' });
      navigate('/');
    },

  };

  const userRole = session?.user?.role || 'guest';
  // console.log('userRole', userRole);
  // const allowedNavigation =
  //   userRole === 'superadmin' department

  //     ? NAVIGATION
  //     : NAVIGATION.filter((item) => item.roles.includes(userRole));
  const allowedNavigation =
    NAVIGATION.filter((item) => item.roles.includes(userRole));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!session) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <CircularProgress size={50} />
      </div>
    );
  }


  return (
    <ThemeProvider theme={demoTheme}>
      <AppProvider
        navigation={allowedNavigation}
        router={{ pathname: location.pathname, navigate }}
        theme={demoTheme}
        authentication={authentication}
        session={session} // 🛠️ Now it is properly set
      >
        <DashboardLayout
          slots={{
            appTitle: CustomAppTitle,
            toolbarAccount: () => null,
            toolbarActions: ToolbarActionsSearch,
            sidebarFooter: SidebarFooterAccount,
          }}
          sidebarContent={
            <Box>
              <MenuList>
                {allowedNavigation.map((item) => {
                  if (item.type === 'dropdown') {
                    return (
                      <MenuItem key={item.title} onClick={() => navigate(`/${item.segment}`)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                        <ListItemIcon>
                          <ExpandMoreIcon />
                        </ListItemIcon>
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem
                        key={item.segment}
                        onClick={() => navigate(`/${item.segment}`)}
                        selected={location.pathname === `/${item.segment}`}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </MenuItem>
                    );
                  }
                })}
              </MenuList>
            </Box>
          }
        >
          <Box sx={{ p: 3 }}>{children}</Box>
        </DashboardLayout>
      </AppProvider>
    </ThemeProvider>
  );
}


DashboardLayouts.propTypes = {
  window: PropTypes.func,
};