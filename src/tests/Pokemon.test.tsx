import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';
import { Pokemon } from '../components';

const MORE_DETAILS_ID = 'More details';

describe('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const cardName = screen.getByText('Pikachu');
    expect(cardName).toBeInTheDocument();
  });
  it('O tipo correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const cardType = screen.getByTestId('pokemon-type');
    expect(cardType.textContent).toBe('Electric');
  });
  it('O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>, em que <value> e <measurementUnit> são, respectivamente, o peso médio do Pokémon e sua unidade de medida.', () => {
    renderWithRouter(<App />);
    const cartAverageWeight = screen.getByText('Average weight: 6.0 kg');
    expect(cartAverageWeight).toBeInTheDocument();
  });
  it('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, em que <name> é o nome do Pokémon.', () => {
    renderWithRouter(<App />);
    const cardImage = screen.getByAltText('Pikachu sprite');
    const cardImagePath = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    expect(cardImage).toBeInTheDocument();
    expect((cardImage as HTMLImageElement).src).toBe(cardImagePath);
  });
});

describe('Testes do componente Pokemon', () => {
  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido.', () => {
    renderWithRouter(<App />);

    // Encontrar o link para o Pokémon Pikachu
    const pikachuLink = screen.getByText(MORE_DETAILS_ID);

    // Simular o clique no link
    fireEvent.click(pikachuLink);

    // Verificar se a URL é atualizada corretamente
    expect(window.location.pathname).toBe('/pokemon/25');
  });
  it('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);

    // Encontrar o link para o Pokémon Pikachu
    const pikachuLink = screen.getByText(MORE_DETAILS_ID);

    // Simular o clique no link
    fireEvent.click(pikachuLink);

    // Verificar se a URL é atualizada corretamente
    expect(window.location.pathname).toBe('/pokemon/25');
  });

  it('Também teste se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver.', async () => {
    renderWithRouter(<App />);

    // Aguarde o link estar disponível no DOM
    const pikachuLink = await screen.findByText(MORE_DETAILS_ID);

    // Simule o clique no link
    fireEvent.click(pikachuLink);

    // Capture a nova URL após clicar no link
    const newUrl = window.location.pathname;

    // Verifique se a URL é atualizada corretamente
    expect(newUrl).toMatch(/\/pokemon\/\d+/); // Verifica se a nova URL corresponde ao padrão /pokemon/<id>
  });
});

describe('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
  it('O ícone deve ser uma imagem com o atributo src que contém o caminho /star-icon.png.', async () => {
    renderWithRouter(<App />);

    // Passo 1: Renderizar o componente com um Pokemon específico marcado como favorito
    const pokemon = pokemonList[0]; // Aqui definimos a variável pokemon
    render(<Pokemon pokemon={ pokemon } isFavorite showDetailsLink={ false } />);

    // Passo 2: Encontrar a imagem com o alt text correspondente
    const starIcon = screen.getByRole('img', { name: `${pokemon.name} is marked as favorite` });

    // Passo 3: Verificar se a imagem tem o alt text correto
    expect(starIcon).toBeInTheDocument();
  });

  it('A imagem deve ter o atributo alt igual a <Pokemon> is marked as favorite, em que <Pokemon> é o nome do Pokémon exibido.', async () => {
    // Passo 1: Renderizar o componente com um Pokemon específico marcado como favorito
    const pokemon = pokemonList[0]; // Aqui definimos a variável pokemon
    render(<Pokemon pokemon={ pokemon } isFavorite showDetailsLink={ false } />);

    // Passo 2: Encontrar a imagem com o alt text correspondente
    const starIcon = screen.getByRole('img', { name: `${pokemon.name} is marked as favorite` });

    // Passo 3: Verificar se o atributo alt da imagem é o esperado
    expect(starIcon).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
  });
});
