import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  add: {
    textAlign: 'end',
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: '#3f51b5',
  },
  list: {
    marginTop: theme.spacing(2),
  },
}));

const Dashboard = ({ history }) => {
  const classes = useStyles();

  const navigateToPage = () => {
    history.push('add-dish');
  };
  return (
    <div>
      <div className={classes.add}>
        <Tooltip title="Add Recipes" aria-label="Add Recipes">
          {/* eslint-disable-next-line no-alert */}
          <Button variant="contained" color="primary" onClick={navigateToPage}>
            Add Recipes
          </Button>
        </Tooltip>
      </div>
      <div className={classes.list}>list of recepies</div>
    </div>
  );
};

export default Dashboard;
