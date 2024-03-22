import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('App component tests', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });

    const pokedexInfo = screen.getByRole('heading', { name: /About Pokédex/i });

    expect(pokedexInfo).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });

    const heading = screen.getByRole('heading', { name: /about pokédex/i });

    expect(heading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<App />, { route: '/about' });

    const firstParagraph = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon./i);
    const secondParagraph = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them./i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<App />, { route: '/about' });

    const image = screen.getByRole('img', { name: /pokédex/i }) as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
