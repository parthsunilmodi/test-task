import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  Icon,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  main: {
    padding: theme.spacing(2),
  },
}));

const Header = ({ children, history }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(!open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            EasierChef
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.main}>{children}</div>
      <Drawer anchor="left" open={open} onClose={() => setOpen(!open)}>
        <div
          className={classes.list}
          role="presentation"
          onClick={() => setOpen(!open)}
          onKeyDown={() => setOpen(!open)}
        >
          <List>
            <ListItem button key="list" onClick={() => history.push('/list')}>
              <ListItemIcon>
                <Icon color="primary">home</Icon>
              </ListItemIcon>
              <ListItemText primary="List of Recipes" />
            </ListItem>
            <Divider />
            <ListItem button key="add" onClick={() => history.push('/')}>
              <ListItemIcon>
                <Icon color="primary">add_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="Add new Recipe" />
            </ListItem>
            <Divider />
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
