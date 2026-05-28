import Container from '@/components/container';
import LoadingProcess from '@/components/loadingProcess';
import Modal from '@/components/modal';
import { Debug, PAGE } from '@/settings/config';
import { Context, DatasetState, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import EnterFrame from 'lesca-enterframe';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import { useEffect, useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './demo';
import Home from './home';
import Journey from './journey';

Click.install('#immersive_experience_section');

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.URL_ENCODED,
  formatType: formatType.JSON,
});

const rootAppElement = document.getElementById('immersive_experience_section');
const rooAppDataset = Object.fromEntries(Object.entries(rootAppElement?.dataset || {}));

const App = ({ dataset }: { dataset: typeof rooAppDataset }) => {
  const [context, setContext] = useReducer(Reducer, {
    ...InitialState,
    [ActionType.Dataset]: { dataset: { ...DatasetState.dataset, ...dataset } },
  });

  const value: TContext = useMemo(() => [context, setContext], [context]);
  const page = context[ActionType.Page] || PAGE.home;

  useEffect(() => {
    const baseUri = `${context[ActionType.Dataset]?.dataset.baseUri || location.origin}`.replace(
      /\/?$/,
      '/',
    );

    window.KGI_MINE_BASE_URI = baseUri;
    document.documentElement.style.setProperty('--base-uri', baseUri);
    EnterFrame.setFPS(Debug.fps);
  }, []);

  const currentPage = useMemo(() => {
    switch (page) {
      default:
      case PAGE.home:
        return <Home />;

      case PAGE.journey:
        return <Journey />;

      case PAGE.demo:
        return <Demo />;
    }
  }, [page]);

  return (
    <div className='App'>
      <Context.Provider {...{ value }}>
        <Container>{currentPage}</Container>
        {context[ActionType.LoadingProcess]?.enabled && <LoadingProcess />}
        {(page === PAGE.home || page === PAGE.demo) && context[ActionType.Modal]?.enabled && (
          <Modal />
        )}
      </Context.Provider>
    </div>
  );
};

async function bootstrap() {
  if (import.meta.env.VITE_MOCKING === 'true') {
    const { worker } = await import('@/mocks/browser');
    await worker.start({
      serviceWorker: { url: './mockServiceWorker.js' },
    });
  }

  if (rootAppElement?.children.length === 0) {
    ReactDOM.createRoot(rootAppElement).render(<App dataset={rooAppDataset} />);
  }
}

bootstrap();
