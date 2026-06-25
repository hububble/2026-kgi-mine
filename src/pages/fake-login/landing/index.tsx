import Button from '@/components/button';
import Heading from '@/components/heading';
import { useAuth } from '@/components/auth';
import Paragraph from '@/components/paragraph';
import useSignIn from '@/hooks/useSignIn';
import { memo, useEffect } from 'react';

const Landing = memo(() => {
  const [, setAuth] = useAuth();
  const [response, setSignIn] = useSignIn();

  useEffect(() => {
    if (response) {
      if (response.isSuccess) {
        const { token } = response.result;
        setAuth({
          token,
          isLogin: true,
          memberId: response.result.memberId,
          memberInfoDto: response.result.memberInfoDto,
        });
        window.location.href = window.location.origin;
      }
    }
  }, [response, setAuth]);

  return (
    <>
      <Paragraph>
        <Heading.H1>
          使用 useSignIn:測試 <br />
          credential: Ab123456789
          <br />
          email: test@test.com
        </Heading.H1>
      </Paragraph>
      <Button
        onClick={() => {
          setSignIn({ credential: 'Ab123456789', email: 'test@test.com' });
        }}
      >
        <Button.Outline>註冊/登入</Button.Outline>
      </Button>
    </>
  );
});
export default Landing;
