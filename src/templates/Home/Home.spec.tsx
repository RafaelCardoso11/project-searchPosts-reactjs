import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Home } from '.';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com/*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title 2',
          body: 'body 2',
          url: 'img2.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title 3',
          body: 'body 3',
          url: 'img3.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('<Home />', () => {
  it('should render search, posts and load more posts', async () => {
    render(<Home />);

    expect.assertions(3);

    const noMorePosts = screen.getByText('Não existe nenhum post com esse nome.');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Search.../i);
    expect(search).toBeInTheDocument();

    const posts = screen.getAllByRole('img', { name: /title/i });
    expect(posts).toHaveLength(2);

    const buttonLoadPosts = screen.getByRole('button', { name: /load more posts/i });
    expect(buttonLoadPosts).toBeInTheDocument();
  });
  it('should search for posts', async () => {
    render(<Home />);

    expect.assertions(9);

    const noMorePosts = screen.getByText('Não existe nenhum post com esse nome.');
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/Search.../i);

    expect(screen.getByText('body 1')).toBeInTheDocument();
    expect(screen.getByText('body 2')).toBeInTheDocument();
    expect(screen.queryByRole('body 3')).not.toBeInTheDocument(); //O query faz com que o erro não apareça na tela

    userEvent.type(search, 'title 1');
    expect(screen.getByText('body 1')).toBeInTheDocument();
    expect(screen.queryByRole('body 2')).not.toBeInTheDocument(); //O query faz com que o erro não apareça na tel
    expect(screen.queryByRole('body 3')).not.toBeInTheDocument(); //O query faz com que o erro não apareça na tela

    userEvent.clear(search);
    expect(screen.getByText('body 1')).toBeInTheDocument();
    expect(screen.getByText('body 2')).toBeInTheDocument();

    userEvent.type(search, 'blablabla');
    expect(screen.getByText('Não existe nenhum post com esse nome.')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);

    const noMorePosts = screen.getByText('Não existe nenhum post com esse nome.');
    await waitForElementToBeRemoved(noMorePosts);

    const buttonLoadPosts = screen.getByRole('button', { name: /Load more Posts/i });
    expect(buttonLoadPosts);

    userEvent.click(buttonLoadPosts);

    expect(screen.getByText('body 3')).toBeInTheDocument();
    expect(buttonLoadPosts).toBeDisabled();
  });
});
