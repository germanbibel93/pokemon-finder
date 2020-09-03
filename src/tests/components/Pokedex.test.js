import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
 
import Pokedex from '../../components/Layout';
import { PokeApi } from '../../services/pokeApi';
import PokeList from '../mock/pokeList';

jest.mock('../../services/pokeApi');


describe('Pokedex-test', () => {
  test('renders Pokedex component', () => {
    PokeApi.mockReturnValueOnce(Promise.resolve(PokeList));
    render(<Pokedex />);
    expect(screen.getByText('Buscar')).toBeInTheDocument();
    
  });

  test('Pokemon search', async () => {
    PokeApi.mockReturnValueOnce(Promise.resolve(PokeList));
    const {findByText } = render(<Pokedex />)
    expect(screen.queryByTestId('pokedex-grid')).not.toBeInTheDocument();

    expect(screen.getByTestId('search-textarea')).toBeInTheDocument();
    const search = screen.getByTestId('search-textarea');
    fireEvent.change(search, { target: { value: 'man' } });
    const grid = { classes: { root: 'root' } };
    expect(grid).toMatchSnapshot();
    const items = await findByText('4. Charmander')
    expect(items).toBeInTheDocument();
  });

});