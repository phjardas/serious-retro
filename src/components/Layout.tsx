import * as React from 'react';
import { Helmet } from 'react-helmet';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import Typography from 'material-ui/Typography/Typography';
import Hidden from 'material-ui/Hidden/Hidden';
import Drawer from 'material-ui/Drawer/Drawer';
import Divider from 'material-ui/Divider/Divider';
import IconButton from 'material-ui/IconButton/IconButton';
import { withStyles, WithStyles, StyleRulesCallback } from 'material-ui/styles';

import MenuIcon from 'material-ui-icons/Menu';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';

import withRoot from './withRoot';
import MainMenu from './MainMenu';

export interface Props {
  title?: string;
  children: React.ReactNode;
}

const drawerWidth = 240;

const styles: StyleRulesCallback = theme => ({
  appFrame: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth + 10,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

interface State {
  mobileOpen: boolean;
}

class Layout extends React.Component<Props & WithStyles, State> {
  state = { mobileOpen: false };

  render() {
    const { title, children, classes } = this.props;
    const theme = this.props.theme!;

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.toggleDrawer}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        </div>
        <Divider />
        <MainMenu />
      </div>
    );

    return (
      <div className={classes.appFrame}>
        <Helmet>
          <title>{title ? `${title} - ` : ''}Serious Retrospective</title>
        </Helmet>

        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" className={classes.menuButton} onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>{' '}
            <Typography variant="title" color="inherit" noWrap>
              {title || 'Serious Retrospective'}
            </Typography>
          </Toolbar>
        </AppBar>

        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            classes={{ paper: classes.drawerPaper }}
            onClose={this.toggleDrawer}
            ModalProps={{ keepMounted: true }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden smDown>
          <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper }}>
            {drawer}
          </Drawer>
        </Hidden>

        <main className={classes.content}>{children}</main>
      </div>
    );
  }

  toggleDrawer = () => this.setState({ mobileOpen: !this.state.mobileOpen });
}

export default withRoot(withStyles(styles, { withTheme: true })(Layout));
