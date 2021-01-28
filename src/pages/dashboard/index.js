import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Tooltip, GridList } from '@material-ui/core';
import { getRecepiesList } from '../../store/recepies/selector';

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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
  },
  gridList: {
    width: '90%',
    height: '100vh',
  },
  card: {
    // backgroundColor: 'red',
    marginRight: '8px',
    borderWidth: '2px',
    borderColor: '#3f51b5',
    borderRadius: '5px',
    borderStyle: 'solid',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },
}));

const Dashboard = ({ history }) => {
  const classes = useStyles();
  const recepiesList = useSelector(getRecepiesList);

  const navigateToPage = () => {
    history.push('/');
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
      <div className={classes.root}>
        <GridList cellHeight={50} className={classes.gridList} cols={4}>
          {recepiesList.map(list => (
            <div className={classes.card}>{list.dishName}</div>
          ))}
        </GridList>
      </div>
      <div className={classes.list}>list of recepies</div>
    </div>
  );
};

export default Dashboard;
