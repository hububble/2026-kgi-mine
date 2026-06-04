import { memo } from 'react';
import './alertClose.less';

const AlertClose = memo(() => (
  <div className='alertClose'>
    <svg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0.5 10.5L10.2901 0.500148M0.709908 0.5L10.5 10.4999'
        stroke='#00367C'
        stroke-linecap='round'
      />
    </svg>
  </div>
));
export default AlertClose;
