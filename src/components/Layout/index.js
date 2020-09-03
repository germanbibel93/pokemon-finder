/* eslint-disable func-names */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  AppBar,
  TextField,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { toFirstCharUppercase } from "../../constants";
import { PokeApi } from '../../services/pokeApi';
 
const useStyles = makeStyles((theme) => ({
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    width: "60%",
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "100%",
    margin: "5px",
  },
}));

const Pokedex = () => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");
  const [render, setRender] = useState(false);

  const fetchPoke = async () => {
    const newPokemonData = await PokeApi();
    setPokemonData(newPokemonData);
  }

  useEffect(() => {
    fetchPoke();
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
    if(e.target.value.length > 2){
        setRender(true);
    }else{
        setRender(false)
    }
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];
    return (
      <>
        <Grid item xs={12} key={pokemonId} data-testid="pokedex-grid">
          <Card className={classes.root}>
            <CardMedia
              className={classes.cardMedia}
              image={sprite}
              style={{ width: "130px", height: "130px" }}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {`${id}. ${toFirstCharUppercase(name)}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </>
    );
  };

  return (
    <>
      <AppBar position="static">
        <h1>POKEMON FINDER</h1>
        <small>El que quiere Pokemons, que los busque</small>
        <div className={classes.searchContainer}>
          <TextField
            className={classes.searchInput}
            onChange={handleSearchChange}
            label="Buscar"
            variant="standard"
            inputProps={{
              'data-testid': 'search-textarea'
            }}
          />
          <SearchIcon className={classes.searchIcon} />
        </div>
      </AppBar>
      {pokemonData && render && (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      )}
    </>
  );
};
export default Pokedex;