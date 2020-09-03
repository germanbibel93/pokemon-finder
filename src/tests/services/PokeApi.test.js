/* eslint-disable no-unused-expressions */
import axios from 'axios';
 
import { PokeApi } from '../../services/pokeApi';

import PokeList from '../mock/Results';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('PokeApi', () => {
  it('fetches successfully data from an API', async () => {

    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { results: PokeList } }));
    
    const results = await PokeApi();

    expect(results).not.toBe({})
  });

  it('fetches erroneously data from an API',() => {

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error()),
    );
    expect( async () => { await PokeApi() }).toThrow; 
  });
});