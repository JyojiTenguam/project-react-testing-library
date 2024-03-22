import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('NotFound component tests', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found.', () => {
    renderWithRouter(<App />, { route: '/NotFound' });

    const heading = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(heading).toBeInTheDocument();
  });

  it('verifica se uma imagem com o src específico é renderizada', () => {
    renderWithRouter(<App />, { route: '/NotFound' });

    const image = screen.getByRole('img', { name: /Clefairy pushing buttons randomly with text I have no idea what i'm doing/i }) as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain('404.gif');
  });
});
