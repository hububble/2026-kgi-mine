import Button from '@/components/button';
import Heading from '@/components/heading';
import Paragraph from '@/components/paragraph';
import useLogin from '@/hooks/useLogin';
import { memo, useEffect, useMemo } from 'react';

const Demo = memo(() => {
  const [response] = useLogin({ auto: true, backgroundAppProcess: true });

  useEffect(() => {
    console.log('response', response);
  }, [response]);

  const ButtonShouldShow = useMemo(() => {}, [response]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <Paragraph>
        <Heading.H1>asd</Heading.H1>
      </Paragraph>

      <Button>
        <Button.Regular>註冊/登入</Button.Regular>
      </Button>
    </div>
  );
});
export default Demo;
