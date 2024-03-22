import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('App component tests', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação: Home, About, Favorite Pokemon', async () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritePokémonLink = screen.getByRole('link', { name: /favorite pokémon/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokémonLink).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByText(/home/i));
    expect(window.location.pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByText(/about/i));
    expect(window.location.pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
    const { user } = renderWithRouter(<App />);

    await user.click(screen.getByText(/favorite pokémon/i));
    expect(window.location.pathname).toBe('/favorites');
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
    renderWithRouter(<App />, { route: '/url-invalida' });

    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
