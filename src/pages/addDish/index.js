import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  add: {
    textAlign: 'end',
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: '#3f51b5',
  },
}));

const AddDish = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.add}>
        <Tooltip title="Add Recipes" aria-label="Add Recipes">
          <Fab color="secondary" aria-label="add" className={classes.margin} onClick={() => alert('ljoj')}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </div>
  );
};

export default AddDish;
