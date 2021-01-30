import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Tooltip,
  TextField,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  Paper,
  TableBody,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Row from './Row';
import { getRecepiesList } from '../../store/recepies/selector';

const useStyles = makeStyles(theme => ({
  add: {
    textAlign: 'end',
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    marginTop: theme.spacing(7),
  },
  gridList: {
    width: '90%',
  },
  card: {
    marginRight: '8px',
    borderWidth: '2px',
    borderColor: '#3f51b5',
    borderRadius: '5px',
    borderStyle: 'solid',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  autoComplete: {
    width: '30%',
    marginRight: theme.spacing(2),
  },
  text: {
    width: '100%',
  },
  table: {
    width: '55%',
  },
  title: {
    color: '#3f51b5',
    textAlign: 'center',
  },
}));

const Dashboard = ({ history }) => {
  const classes = useStyles();
  const recepiesList = useSelector(getRecepiesList);
  const [listRef, setListRef] = useState(recepiesList);
  const navigateToPage = () => {
    history.push('/');
  };

  useEffect(() => {
    setListRef(recepiesList);
  }, [recepiesList]);

  const getOptions = () => recepiesList.map(list => list?.ingredients?.map(val => val.name)).flat();

  const onChange = (e, values) => {
    if (!values.length) {
      setListRef(recepiesList);
      return;
    }
    const filterdValue = recepiesList.filter(list => list.ingredients.find(val => values.includes(val.name)));
    setListRef([...filterdValue]);
  };

  const rows = listRef.map(list => ({
    DishName: list.dishName,
    TotalIngredients: list?.ingredients?.length,
    history: list?.ingredients.map(ing => ({
      IngredientsName: ing.name,
      Quantity: ing.quantity,
      unit: ing.unit,
      steps: ing.steps,
      picture: ing.picture,
    })),
  }));

  return (
    <div>
      <div className={classes.add}>
        <Autocomplete
          multiple
          id="size-small-outlined-multi"
          size="small"
          options={getOptions() || []}
          getOptionLabel={option => option}
          className={classes.autoComplete}
          onChange={onChange}
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Filter"
              placeholder="Select ingredients"
              className={classes.text}
            />
          )}
        />
        <Tooltip title="Add Recipes" aria-label="Add Recipes">
          <Button variant="contained" color="primary" onClick={navigateToPage}>
            Add Recipes
          </Button>
        </Tooltip>
      </div>
      <h1 className={classes.title}>List of Recipes</h1>
      <div className={classes.root}>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Dish name</TableCell>
                <TableCell>Total Number of Ingredients</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rows || []).map(row => (
                <Row key={row.DishName} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Dashboard;
