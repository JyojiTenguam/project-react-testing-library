import { vi } from 'vitest';
import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('App component tests', () => {
  afterEach(() => { // limpar o mock de um teste para o outro
    vi.restoreAllMocks();
  });

  it('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', () => {
    renderWithRouter(<App />, { route: '/favorites' });

    const message = screen.getByText(/No favorite Pokémon found/i);

    expect(message).toBeInTheDocument();
  });

  it('Apenas são exibidos os Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemons } />);
    pokemons.forEach((pokemon) => {
      const name = screen.getByText(pokemon.name);
      expect(name).toBeInTheDocument();
    });
  });
});
