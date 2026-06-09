import Button from '@/components/button';
import Heading from '@/components/heading';
import Paragraph from '@/components/paragraph';
import useSignIn from '@/hooks/useSignIn';
import { memo, useContext, useMemo } from 'react';
import { DemoContext, DemoPageType } from '../config';

const Landing = memo(() => {
  const [, setState] = useContext(DemoContext);
  const [response, setSignIn] = useSignIn();

  const ButtonShouldShow = useMemo(() => {
    if (!response) {
      return (
        <Button
          onClick={() => {
            setSignIn({ credential: 'Ab123456789', email: 'test@test.com' });
          }}
        >
          <Button.Outline>註冊/登入</Button.Outline>
        </Button>
      );
    } else {
      return (
        <Button
          key={response.result.token}
          onClick={() => {
            setState((S) => ({ ...S, page: DemoPageType.iframe }));
          }}
        >
          <Button.Regular>開始</Button.Regular>
        </Button>
      );
    }
  }, [response]);

  return (
    <>
      <Paragraph>
        <Heading.H1>{response?.result.token}</Heading.H1>
      </Paragraph>
      {ButtonShouldShow}
    </>
  );
});
export default Landing;
