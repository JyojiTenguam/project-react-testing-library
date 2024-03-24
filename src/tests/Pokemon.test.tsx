import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// renderWithRouter(<App />);
// const cardName = screen.getByText('Pikachu');
// const cardType = screen.getByTestId('pokemon-type');
// const cartAverageWeight = screen.getByText('Average weight: 6.0 kg');
// const cardImage = screen.getByAltText('Pikachu sprite');
// const cardImagePath = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
// // teste
// expect(cardType.textContent).toBe('Electric');
// expect(cardName).toBeInTheDocument();
// expect(cartAverageWeight).toBeInTheDocument();
// expect((cardImage as HTMLImageElement).src).toBe(cardImagePath);
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
  it('O ícone deve ser uma imagem com o atributo src que contém o caminho /star-icon.png.', () => {
    renderWithRouter(<App />);

    // Verifica se o ícone de favorito está presente
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();

    // Verifica se o ícone de favorito é uma imagem
    expect(favoriteIcon.tagName).toBe('IMG');

    // Verifica se o atributo src da imagem contém o caminho /star-icon.png
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.png');
  });
  it('A imagem deve ter o atributo alt igual a <Pokemon> is marked as favorite, em que <Pokemon> é o nome do Pokémon exibido.', () => {
    renderWithRouter(<App />);

    // Verifica se o link "More details" está presente com base no ID
    const moreDetailsLink = screen.getByTestId(MORE_DETAILS_ID);
    expect(moreDetailsLink).toBeInTheDocument();

    // Verifica se o texto do link é "More details"
    expect(moreDetailsLink).toHaveTextContent('More details');
  });
});
