import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grid: {
    marginBottom: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
  btnWrap: {
    width: '100%',
    height: '56px',
  },
}));

const AddDish = () => {
  const [formData, setFormData] = useState({});
  const [ingredientData, setIngredientData] = useState({});

  const classes = useStyles();

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
    console.log('e---', formData, ingredientData);
  };

  return (
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
              onChange={onDataChange('dishName')}
            />
          </Grid>
          <Grid item xs={12} className={classes.grid}>
            <TextField
              id="name"
              label="Ingredient name"
              variant="outlined"
              className={classes.textField}
              onChange={onDataChange('name', 'ingredients')}
            />
          </Grid>
          <Grid item xs={12} className={classes.grid}>
            <TextField
              id="quantity"
              label="Ingredient quantity"
              variant="outlined"
              className={classes.textField}
              type="number"
              onChange={onDataChange('quantity', 'ingredients')}
            />
          </Grid>
          <Grid item xs={12} className={classes.grid}>
            <TextField
              id="unit"
              label="Unit of measurement for ingredient qty"
              variant="outlined"
              className={classes.textField}
              onChange={onDataChange('unit', 'ingredients')}
            />
          </Grid>
          <Grid item xs={12} className={classes.grid}>
            <TextField
              id="steps"
              label="Steps to cook"
              variant="outlined"
              className={classes.textField}
              multiline
              onChange={onDataChange('name', 'ingredients')}
            />
          </Grid>
          <Grid item xs={12} className={classes.grid}>
            <TextField
              id="picture"
              label="Picture of dish in the form of URL"
              variant="outlined"
              className={classes.textField}
              onChange={onDataChange('picture', 'ingredients')}
            />
          </Grid>
          <Grid item xs={12} className={classes.grid}>
            <Button variant="outlined" color="secondary" className={classes.btnWrap}>
              Add Another Ingredients
            </Button>
          </Grid>
          <Grid item xs={12} className={classes.grid}>
            <Button variant="contained" color="primary" className={classes.btnWrap}>
              SAVE DISH
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
};

export default AddDish;
