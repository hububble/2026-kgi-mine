import Container from '@/components/container';
import LoadingProcess from '@/components/loadingProcess';
import { Context, InitialState, Reducer } from '@/settings/constant';
import '@/settings/global.css';
import { ActionType, TContext } from '@/settings/type';
import Click from 'lesca-click';
import Fetcher, { contentType, formatType } from 'lesca-fetcher';
import { useMemo, useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import IframeDemo from './s';

Click.install('#immersive_experience_section');

Fetcher.install({
  hostUrl: import.meta.env.VITE_API_PATH || './api',
  contentType: contentType.URL_ENCODED,
  formatType: formatType.JSON,
});

const rootAppElement = document.getElementById('immersive_experience_section');

const App = () => {
  const [context, setContext] = useReducer(Reducer, InitialState);
  const value: TContext = useMemo(() => [context, setContext], [context]);

  return (
    <div className='App'>
      <Context.Provider {...{ value }}>
        <Container>
          <IframeDemo />
        </Container>
        {context[ActionType.LoadingProcess]?.enabled && <LoadingProcess />}
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
    ReactDOM.createRoot(rootAppElement).render(<App />);
  }
}

bootstrap();
