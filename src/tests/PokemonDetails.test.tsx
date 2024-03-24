import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

it('Exibe as informações detalhadas do Pokémon selecionado na tela', async () => {
  renderWithRouter(<App />);

  // Clique no botão para selecionar um Pokémon do tipo Fire
  const btnFire = screen.getByRole('button', { name: /fire/i });
  fireEvent.click(btnFire);

  // Clique no botão "More details" para ver as informações detalhadas
  const btnDetails = screen.getByRole('link', { name: /more details/i });
  fireEvent.click(btnDetails);

  // Verifique se o resumo do Pokémon está presente na tela
  const resume = screen.getByText(
    /The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly./i,
  );
  expect(resume).toBeInTheDocument();

  // Verifique se o cabeçalho dos detalhes do Pokémon está presente na tela
  const pokemonDetailsHeading = screen.getByRole('heading', { name: /charmander details/i });
  expect(pokemonDetailsHeading).toBeInTheDocument();

  // Verifique se o botão "More details" não está mais na tela
  expect(btnDetails).not.toBeInTheDocument();

  // Verifique se o cabeçalho "Summary" está presente na tela
  const summaryHeading = screen.getByRole('heading', { name: /summary/i });
  expect(summaryHeading).toBeInTheDocument();
});

it('Existe na página uma seção com os mapas contendo as localizações do Pokémon', async () => {
  renderWithRouter(<App />);

  // Clique no botão para selecionar um Pokémon do tipo Fire
  const btnFire = screen.getByRole('button', { name: /fire/i });
  fireEvent.click(btnFire);

  // Clique no botão "More details" para ver as informações detalhadas
  const btnDetails = screen.getByRole('link', { name: /more details/i });
  fireEvent.click(btnDetails);

  // Encontre os elementos relacionados aos mapas de localização do Pokémon
  const imgLocations = screen.getAllByRole('img', { name: /Charmander location/i });
  const heading = screen.getByRole('heading', { name: /game locations of charmander/i });
  const firstImg = imgLocations[0];
  const firstLocationName = screen.getByText(/alola route 3/i);

  // Verifique se a seção de mapas e seus conteúdos estão presentes na tela
  expect(heading).toBeInTheDocument();
  expect(imgLocations).toHaveLength(4); // Supondo que Charmander tenha 4 localizações
  expect(firstImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/9/93/Alola_Route_3_Map.png');
  expect(firstImg).toHaveAttribute('alt', 'Charmander location');
  expect(firstLocationName).toBeInTheDocument();
});

it('Usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
  // Renderize o componente com o roteador
  renderWithRouter(<App />);

  // Clique no botão para selecionar um Pokémon do tipo Fire
  const btnFire = screen.getByRole('button', { name: /fire/i });
  fireEvent.click(btnFire);

  // Clique no botão "More details" para ver as informações detalhadas
  const btnDetails = screen.getByRole('link', { name: /more details/i });
  fireEvent.click(btnDetails);

  // Verifique se a caixa de seleção para favoritar o Pokémon está presente
  const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(checkBox).toBeInTheDocument();

  // Marque a caixa de seleção para favoritar o Pokémon
  fireEvent.click(checkBox);

  // Verifique se o ícone de estrela está presente após favoritar o Pokémon
  const imgStar = screen.getByRole('img', { name: /charmander is marked as favorite/i });
  expect(imgStar).toBeInTheDocument();

  // Desmarque a caixa de seleção para desfavoritar o Pokémon
  fireEvent.click(checkBox);

  // Verifique se o ícone de estrela não está mais presente após desfavoritar o Pokémon
  expect(imgStar).not.toBeInTheDocument();

  // Verifique se a caixa de seleção para favoritar o Pokémon ainda está presente
  expect(screen.getByText('Pokémon favoritado?')).toBeInTheDocument();
});
