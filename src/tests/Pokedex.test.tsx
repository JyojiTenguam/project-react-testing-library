import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

const POKEMON_NAME_TEST_ID = 'pokemon-name';
const POKEMON_TYPE_BUTTON_TEST_ID = 'pokemon-type-button';

describe('Testes do componente Pokedex', () => {
  it('deve renderizar um cabeçalho h2 com o texto "Encountered Pokémon."', () => {
    renderWithRouter(<App />, { route: '/' });

    const heading = screen.getByRole('heading', { name: /Encountered Pokémon/i });

    expect(heading).toBeInTheDocument();
  });

  it('deve mostrar apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />, { route: '/' });

    const pokemonElements = screen.getAllByTestId(POKEMON_NAME_TEST_ID);

    expect(pokemonElements.length).toBe(1);
  });

  it('deve exibir o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado.', () => {
    renderWithRouter(<App />, { route: '/' });

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });

    fireEvent.click(nextPokemonButton);

    const nextPokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID);
    expect(nextPokemonName).toBeInTheDocument();
  });

  it('deve mostrar o primeiro Pokémon da lista ao clicar no botão se estiver no último Pokémon da lista.', () => {
    renderWithRouter(<App />, { route: '/' });

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const totalPokemons = pokemonList.length;
    const firstPokemonName = pokemonList[0].name;
    const lastPokemonName = pokemonList[totalPokemons - 1].name;

    for (let i = 0; i < totalPokemons - 1; i++) {
      fireEvent.click(nextPokemonButton);
    }

    let displayedPokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID).textContent;
    expect(displayedPokemonName).toBe(lastPokemonName);

    fireEvent.click(nextPokemonButton);

    displayedPokemonName = screen.getByTestId(POKEMON_NAME_TEST_ID).textContent;
    expect(displayedPokemonName).toBe(firstPokemonName);
  });
});

describe('Testes se a Pokedex tem botões de filtro:', () => {
  it('deve ter um botão de filtro para cada tipo de Pokémon, sem repetição.', () => {
    renderWithRouter(<App />, { route: '/' });

    const uniquePokemonTypes = [...new Set(pokemonList.map((pokemon) => pokemon.type))];
    const filterButtons = screen.getAllByTestId(POKEMON_TYPE_BUTTON_TEST_ID);

    expect(filterButtons.length).toBe(uniquePokemonTypes.length);

    filterButtons.forEach((button) => {
      const buttonText = button.textContent;
      expect(uniquePokemonTypes).toContain(buttonText);
    });
  });

  it('deve apenas circular pelos Pokémon daquele tipo após selecionar um botão de tipo.', () => {
    renderWithRouter(<App />, { route: '/' });

    const allButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(allButton);

    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const allPokemonTypes = [...new Set(pokemonList.map((pokemon) => pokemon.type))];

    for (let i = 0; i < pokemonList.length; i++) {
      fireEvent.click(nextButton);
      const pokemonType = screen.getByTestId('pokemon-type').textContent;
      expect(allPokemonTypes).toContain(pokemonType);
    }
  });

  it('deve exibir o texto correto no botão de tipo, por exemplo, "Psíquico."', () => {
    renderWithRouter(<App />, { route: '/' });
    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });

    for (let index = 0; index < pokemonList.length; index++) {
      fireEvent.click(nextButton);
      const pokemonType = screen.getByTestId('pokemon-type').textContent;
      if (pokemonType === null) {
        throw new Error('Nenhum tipo de Pokémon encontrado');
      }
      const typeButton = screen.getByRole('button', { name: new RegExp(pokemonType, 'i') });
      expect(typeButton).toBeInTheDocument();
      expect(typeButton.textContent).toBe(pokemonType);
    }
  });

  it('deve sempre ter o botão "All" visível.', () => {
    renderWithRouter(<App />, { route: '/' });

    const allButton = screen.getByRole('button', { name: /All/i });

    expect(allButton).toBeInTheDocument();
  });

  it('deve ser possível clicar no botão de filtro "All"', () => {
    renderWithRouter(<App />, { route: '/' });

    const allButton = screen.getByRole('button', { name: 'All' });
    fireEvent.click(allButton);

    // Verifique se Pikachu está visível
    expect(screen.getByText('Pikachu')).toBeInTheDocument();

    // Clique no botão "Posion"
    const fireButton = screen.getByRole('button', { name: 'Poison' });
    fireEvent.click(fireButton);

    // Verifique se Ekans está visível
    expect(screen.getByText('Ekans')).toBeInTheDocument();

    // Clique novamente no botão "All"
    fireEvent.click(allButton);

    // Verifique se Pikachu está visível novamente
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
