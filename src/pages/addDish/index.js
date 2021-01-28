import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import recepiesActions from '../../store/recepies/actions';
import { getRecepiesList } from '../../store/recepies/selector';

const useStyles = makeStyles(theme => ({
  grid: {
    marginBottom: theme.spacing(2),
  },
  textField: {
    width: '100%',
  },
  btnWrap: {
    width: '100%',
    height: '56px',
  },
  btnWrapper: {
    textAlign: 'end',
  },
}));

const AddDish = ({ history }) => {
  const recepiesList = useSelector(getRecepiesList);
  const [formData, setFormData] = useState({});
  const [ingredientData, setIngredientData] = useState({});
  const [ingredientDataArr, setIngredientDataArr] = useState([]);
  const [errors, setError] = useState({});
  const classes = useStyles();
  const dispatch = useDispatch();

  const onDataChange = (name, type) => e => {
    const { value } = e.target;
    if (type) {
      setIngredientData({
        ...ingredientData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateIngredients = () => {
    const { name, quantity, unit, steps, picture } = ingredientData;
    const { dishName } = formData;
    const errorList = {
      ...errors,
      name: !name,
      quantity: !quantity,
      unit: !unit,
      steps: !steps,
      picture: !picture,
      dishName: !dishName,
    };
    setError({ ...errorList });
    return !name || !quantity || !unit || !steps || !picture;
  };

  const onRemove = index => () => {
    const data = ingredientDataArr;
    setIngredientDataArr([...data.slice(0, index), ...data.slice(index + 1)]);
  };

  const addIngredient = () => {
    const isError = validateIngredients();
    if (!isError) {
      setIngredientDataArr((prevState = []) => [...prevState, ingredientData]);
      setIngredientData({});
    }
  };

  const addDish = () => {
    const isError = validateIngredients();
    if (ingredientDataArr.length > 0 && !Object.keys(ingredientData).length && formData.dishName) {
      dispatch(recepiesActions.getRecepiesData({ ...formData, ingredients: [...ingredientDataArr] }));
      history.push('/list');
    }
    if (!isError && ingredientDataArr.length === 0 && !Object.keys(ingredientDataArr).length) {
      dispatch(recepiesActions.getRecepiesData({ ...formData, ingredients: [{ ...ingredientData }] }));
      history.push('/list');
    }
    if (!isError && ingredientDataArr.length > 0 && Object.keys(ingredientDataArr).length) {
      dispatch(
        recepiesActions.getRecepiesData({ ...formData, ingredients: [...ingredientDataArr, { ...ingredientData }] }),
      );
      history.push('/list');
    }
  };

  const navigateToPage = () => {
    history.push('/list');
  };

  return (
    <div>
      <div className={classes.btnWrapper}>
        {recepiesList.length > 0 && (
          <Button variant="contained" color="primary" onClick={navigateToPage}>
            Show Recepies List
          </Button>
        )}
      </div>
      <div>
        <Grid container>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <form className={classes.root} noValidate autoComplete="off">
              <Grid item xs={12} className={classes.grid}>
                <TextField
                  id="dishName"
                  label="Name of the dish"
                  variant="outlined"
                  className={classes.textField}
                  value={formData?.dishName || ''}
                  onChange={onDataChange('dishName')}
                  error={errors?.dishName}
                  helperText={errors?.dishName && 'Enter Name of the dish'}
                />
              </Grid>
              {(ingredientDataArr || []).map((ingredient, key) => (
                <Grid item xs={12} className={classes.grid}>
                  <FormControl variant="outlined" className={classes.textField}>
                    <InputLabel htmlFor="outlined-adornment-password">{`Ingredient ${key + 1}`}</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      value={ingredient?.name}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle visibility" onClick={onRemove(key)} edge="end">
                            <DeleteForeverRoundedIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </Grid>
              ))}
              <Grid item xs={12} className={classes.grid}>
                <TextField
                  id="name"
                  label="Ingredient name"
                  variant="outlined"
                  className={classes.textField}
                  value={ingredientData?.name || ''}
                  onChange={onDataChange('name', 'ingredients')}
                  error={errors?.name}
                  helperText={errors?.name && 'Enter Ingredient name'}
                />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <TextField
                  id="quantity"
                  label="Ingredient quantity"
                  variant="outlined"
                  className={classes.textField}
                  type="number"
                  value={ingredientData?.quantity || ''}
                  onChange={onDataChange('quantity', 'ingredients')}
                  error={errors?.quantity}
                  helperText={errors?.quantity && 'Enter Ingredient quantity'}
                />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <TextField
                  id="unit"
                  label="Unit of measurement for ingredient qty"
                  variant="outlined"
                  className={classes.textField}
                  value={ingredientData?.unit || ''}
                  onChange={onDataChange('unit', 'ingredients')}
                  error={errors?.unit}
                  helperText={errors?.unit && 'Enter Unit of measurement'}
                />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <TextField
                  id="steps"
                  label="Steps to cook"
                  variant="outlined"
                  className={classes.textField}
                  multiline
                  value={ingredientData?.steps || ''}
                  onChange={onDataChange('steps', 'ingredients')}
                  error={errors?.steps}
                  helperText={errors?.steps && 'Enter Steps'}
                />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <TextField
                  id="picture"
                  label="Picture of dish in the form of URL"
                  variant="outlined"
                  className={classes.textField}
                  value={ingredientData?.picture || ''}
                  onChange={onDataChange('picture', 'ingredients')}
                  error={errors?.picture}
                  type="url"
                  helperText={errors?.picture && 'Enter Picture of dish in the form of URL'}
                />
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <Button variant="outlined" color="secondary" className={classes.btnWrap} onClick={addIngredient}>
                  Add Another Ingredients
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <Button variant="contained" color="primary" className={classes.btnWrap} onClick={addDish}>
                  SAVE DISH
                </Button>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </div>
    </div>
  );
};

export default AddDish;
