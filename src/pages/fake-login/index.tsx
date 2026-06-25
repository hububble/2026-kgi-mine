import { memo } from 'react';
import Landing from './landing';

const FakeLogin = memo(() => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <Landing />
    </div>
  );
});
export default FakeLogin;
