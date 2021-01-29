import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Grid, Button, Divider, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
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
    height: '45px',
  },
  btnWrapper: {
    textAlign: 'end',
  },
  ingredient: {
    marginTop: theme.spacing(3),
  },
}));

const AddDish = ({ history }) => {
  const recepiesList = useSelector(getRecepiesList);
  const [formData, setFormData] = useState({
    dishName: '',
    ingredients: [
      {
        id: 0,
        name: '',
        quantity: '',
        unit: '',
        steps: '',
        picture: '',
      },
    ],
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

  const onDataChange = (name, id) => e => {
    // eslint-disable-next-line no-debugger
    debugger;
    const { value } = e.target;
    if (id >= 0) {
      const index = formData?.ingredients.findIndex(item => item.id === id);
      if (index !== -1) {
        setFormData({
          ...formData,
          ingredients: [
            ...formData.ingredients.slice(0, index),
            { ...formData.ingredients[index], [name]: value },
            ...formData.ingredients.slice(index + 1),
          ],
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateIngredients = () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const { name = '', quantity = '', unit = '', steps = '', picture = '' } = formData?.ingredients[
      formData?.ingredients.length - 1
    ];
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
    setErrors({ ...errorList });
    return !name || !quantity || !unit || !steps || !picture;
  };

  const addIngredient = () => {
    const isError = validateIngredients();
    if (isError) {
      setError(isError);
    } else {
      setError(false);
    }
    if (!isError) {
      const item = {
        id: formData?.ingredients?.length || 0,
        name: '',
        quantity: '',
        unit: '',
        steps: '',
        picture: '',
      };
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, { ...item }],
      });
    }
  };

  const addDish = () => {
    // eslint-disable-next-line no-debugger
    debugger;
    const isError = validateIngredients();
    if (isError) {
      if (isError && formData?.ingredients?.length && formData?.ingredients[0].name !== '') {
        dispatch(recepiesActions.getRecepiesData({ ...formData }));
        history.push('/list');
      } else {
        setError(isError);
      }
    } else {
      setError(false);
      dispatch(recepiesActions.getRecepiesData({ ...formData }));
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
                  size="small"
                  label="Name of the dish"
                  variant="outlined"
                  className={classes.textField}
                  value={formData?.dishName || ''}
                  onChange={onDataChange('dishName')}
                />
              </Grid>
              <Divider />
              {(formData?.ingredients || []).map(item => (
                <div className={classes.ingredient}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        id="name"
                        size="small"
                        label="Ingredient name"
                        variant="outlined"
                        className={classes.textField}
                        value={item?.name || ''}
                        onChange={onDataChange('name', item.id)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="quantity"
                        size="small"
                        label="Ingredient quantity"
                        variant="outlined"
                        className={classes.textField}
                        type="number"
                        value={item?.quantity || ''}
                        onChange={onDataChange('quantity', item.id)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="unit"
                        size="small"
                        label="Unit of measurement for ingredient qty"
                        variant="outlined"
                        className={classes.textField}
                        value={item?.unit || ''}
                        onChange={onDataChange('unit', item.id)}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="steps"
                        size="small"
                        label="Steps to cook"
                        variant="outlined"
                        className={classes.textField}
                        multiline
                        value={item?.steps || ''}
                        onChange={onDataChange('steps', item.id)}
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.grid}>
                      <TextField
                        id="picture"
                        size="small"
                        label="Picture of dish in the form of URL"
                        variant="outlined"
                        className={classes.textField}
                        value={item?.picture || ''}
                        onChange={onDataChange('picture', item.id)}
                        type="url"
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={error}
        onClose={() => setError(!error)}
        autoHideDuration={6000}
        key={{ vertical: 'top' } + { horizontal: 'right' }}
      >
        <Alert severity="error">Fill all the information...!</Alert>
      </Snackbar>
    </div>
  );
};

export default AddDish;
