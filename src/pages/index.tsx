import Auth from '@/components/auth';
import Container from '@/components/container';
import LoadingProcess from '@/components/loadingProcess';
import Modal from '@/components/modal';
import { PAGE } from '@/settings/config';
import { Context, DatasetState, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import EnterFrame from 'lesca-enterframe';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import { useEffect, useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import FakeLogin from './fake-login';
import Home from './home';
import Journey from './journey';
import { JourneySceneSetting } from './journey/config';

Click.install('#immersive_experience_section');

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.JSON,
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
    EnterFrame.setFPS(JourneySceneSetting.fps);
  }, []);

  const currentPage = useMemo(() => {
    switch (page) {
      default:
      case PAGE.home:
        return <Home />;

      case PAGE.journey:
        return <Journey />;

      case PAGE.login:
        return <FakeLogin />;
    }
  }, [page]);

  return (
    <div className='App'>
      <Context.Provider {...{ value }}>
        <Auth>
          <Container>{currentPage}</Container>
          {context[ActionType.LoadingProcess]?.enabled && <LoadingProcess />}
          {(page === PAGE.home || page === PAGE.login) && context[ActionType.Modal]?.enabled && (
            <Modal />
          )}
        </Auth>
      </Context.Provider>
    </div>
  );
};

async function bootstrap() {
  if (import.meta.env.VITE_MOCKING === 'true') {
    const { worker } = await import('@/mocks/browser');
    await worker.start({
      serviceWorker: { url: './mockServiceWorker.js' },
      quiet: true, // Disables all library logging
      onUnhandledRequest: 'bypass', // Ignores unhandled requests
    });
  }

  if (rootAppElement?.children.length === 0) {
    ReactDOM.createRoot(rootAppElement).render(<App dataset={rooAppDataset} />);
  }
}

bootstrap();
