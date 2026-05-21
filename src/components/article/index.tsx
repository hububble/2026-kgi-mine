import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Blockquote from '../blockquote';
import Heading from '../heading';
import Paragraph from '../paragraph';
import { ArticleIcons } from './config';
import Field from './field';
import './index.less';
import NavBar from './navBar';
import useURI from '@/hooks/useURI';

const Article = memo(() => {
  const [, setContext] = useContext(Context);
  const [transition, setTransition] = useState(TransitionType.Unset);
  const [, setURI] = useURI();

  useEffect(() => {
    setURI({ path: 'article-demo-cover.png', name: 'article-demo-cover' });
  }, []);

  return (
    <OnloadProvider
      onStart={() => setContext({ type: ActionType.LoadingProcess, state: { enabled: true } })}
      onload={() => {
        setContext({ type: ActionType.LoadingProcess, state: { enabled: false } });
        setTransition(TransitionType.FadeIn);
      }}
    >
      <div className='Article'>
        <Blockquote className='flex w-full justify-center' scroll>
          <div className='inner'>
            <div
              className={twMerge(
                'inner-contain',
                transition === TransitionType.FadeIn && 'animate-fadeInPy',
              )}
            >
              <div className='ctx'>
                <NavBar />
                <div className='article'>
                  <div className='image' />
                  <div className='blockquote'>
                    <div className='flex w-full flex-col gap-5'>
                      <Heading.H1 className='text-white'>
                        打造自己的享樂人生——夏韻芬的「三年享樂理財學」
                      </Heading.H1>
                      <Heading.H4 className='text-white'>
                        從日常累積生活的節奏，夏韻芬的「三年享樂理財學」
                      </Heading.H4>
                      <div className='flex w-full flex-row flex-wrap items-start gap-4'>
                        <Field icon={ArticleIcons.favorite}>367</Field>
                        <Field icon={ArticleIcons.bookmark}>28</Field>
                        <Field icon={ArticleIcons.share}>14</Field>
                        <Field icon={ArticleIcons.career}>10</Field>
                        <Field icon={ArticleIcons.relations}>5</Field>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='p-7'>
                  <div className='w-full rounded-4xl bg-white p-7'>
                    <Heading.H2 className='text-primary-blue font-bold'>
                      「如果你不能在睡覺時賺錢，你將工作到死為止。」 ——華倫・巴菲特 (Warren Buffet)
                    </Heading.H2>
                    <Paragraph>
                      <Heading.H4 className='text-justify'>
                        凱基ETF 直播聊天室
                        為什麼近年『ETF』在投資市場上超級熱門？2025年7月統計ETF受益人數已突破1500萬人，這股風潮背後，其實隱藏著許多人希望擺脫「用時間換取金錢」的渴望。然而，對於許多投資新手來說，ETF
                        可能仍然有些陌生。別擔心！這篇就是你的專屬「ETF懶人包」，我們將帶你用最易懂的方式，搞懂
                        ETF 是什麼，並解答 ETF 怎麼買等基本疑問。
                        很開心能幫助你踏出實現被動收入的第一步！今天要帶你認識 ETF是什麼?白話大解密
                        ETF 的追蹤指標是什麼？ ETF對投資人的好處 ETF可以怎麼買 ETF有哪些風險
                      </Heading.H4>
                    </Paragraph>
                    <Heading.H4>「ETF 是什麼？白話文大解密」</Heading.H4>
                    <Paragraph>
                      <Heading.H4 className='text-justify'>
                        ETF 是什麼？想像你走進一間水果行，想買水果。ETF (Exchange Traded
                        Fund)，也就是指數股票型基金，就好像是水果行老闆事先幫你搭配好的綜合水果籃。
                        這個水果籃裡，有各式各樣的水果，例如蘋果、香蕉、橘子、葡萄等等，而不是只有單一種水果。同樣地，一個
                        ETF
                        基金裡面，也包含了許多不同的股票、債券或其他資產，而不是只有單一一種資產。
                      </Heading.H4>
                    </Paragraph>
                    <Paragraph>
                      <div className='flex flex-col gap-3 pt-5'>
                        <Heading.H4>
                          <a
                            href='#'
                            className='text-secondary-blue font-bold underline underline-offset-2'
                          >
                            豐盛未來式
                          </a>
                        </Heading.H4>
                        <div className='text-secondary-blue flex w-full flex-row flex-wrap items-center justify-start gap-1'>
                          {['#財富投資', '＃ETF', '#豐盛人生', '#00915', '#00945B', '#00950B'].map(
                            (tag) => (
                              <Heading.H4 key={tag}>{tag}</Heading.H4>
                            ),
                          )}
                        </div>
                      </div>
                    </Paragraph>
                    <div className='flex w-full flex-row items-center justify-between text-base font-light'>
                      <div>閱覽次數 | 1437</div>
                      <div>2024.10.30</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Blockquote>
      </div>
    </OnloadProvider>
  );
});
export default Article;
