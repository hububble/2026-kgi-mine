import Button from '@/components/button';
import Heading from '@/components/heading';
import Paragraph from '@/components/paragraph';
import useLogin from '@/hooks/useLogin';
import { faker } from '@faker-js/faker';
import { memo, useContext, useMemo } from 'react';
import { DemoContext, DemoPageType } from '../config';

const Landing = memo(() => {
  const [, setState] = useContext(DemoContext);
  const [response] = useLogin({ auto: true, backgroundAppProcess: true });

  const ButtonShouldShow = useMemo(() => {
    if (!response) return null;

    if (response?.isSuccess === false) {
      return (
        <Button
          onClick={() => {
            // TODO: 這裡的註冊/登入邏輯需要根據實際情況修改，以下僅為示例
            window.location.href = `${window.location.origin}${window.location.pathname}?page=3&token=${faker.string.ulid()}`;
          }}
        >
          <Button.Outline>註冊/登入</Button.Outline>
        </Button>
      );
    } else {
      if (response.result) {
        return (
          <Button
            onClick={() => {
              setState((S) => ({ ...S, page: DemoPageType.iframe }));
            }}
          >
            <Button.Regular>開始</Button.Regular>
          </Button>
        );
      }
    }
  }, [response]);

  return (
    <>
      <Paragraph>
        <Heading.H1>{response?.result}</Heading.H1>
      </Paragraph>
      {ButtonShouldShow}
    </>
  );
});
export default Landing;
