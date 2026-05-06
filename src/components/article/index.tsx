import { Context } from '@/settings/constant';
import { ActionType, TransitionType } from '@/settings/type';
import OnloadProvider from 'lesca-react-onload';
import { memo, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Blockquote from '../blockquote';
import Heading from '../heading';
import Paragraph from '../paragraph';
import { ArticleIcons } from './config';
import Field from './field';
import './index.less';
import NavBar from './navBar';

const Article = memo(() => {
  const [, setContext] = useContext(Context);
  const [transition, setTransition] = useState(TransitionType.Unset);

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
                      <Heading.D3 className='text-white'>
                        從日常累積生活的節奏，夏韻芬的「三年享樂理財學」
                      </Heading.D3>
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
                <div className='w-full bg-white p-10'>
                  <Heading.D3>文／財經節目主持人 夏韻芬</Heading.D3>
                  <Paragraph>
                    <Heading.D3>
                      人生像一趟長途旅行，你可以選擇趕行程的打卡團，也可以慢下腳步，細細體驗沿途的風景。「理財的目的，不只是讓你變有錢，而是讓你有選擇的權利。」我在凱基投信去年的「豐盛未來式」全台巡迴講座的開場，引來全場點頭共鳴。我相信，理財的終點不是數字的累積，而是能活出自己喜歡的樣子。
                    </Heading.D3>
                  </Paragraph>
                  <Paragraph>
                    <Heading.D3>
                      我覺得我的人生像是一趟從「跟團」到「自由行」的旅行演進史。早年，我也曾追求CP值最高的選擇，精打細算、行程滿檔，但旅行結束後卻常覺得「累而不快樂」；直到開始自由行、甚至自己組團，我才體會到，真正的享樂不在於花多少錢，而在於是否真的感受到生活的豐盛。投資也是同樣的概念，投資不是比誰跑得快，而是看誰能跑得久，短線操作需要市場判斷力與高度風險承擔，而穩健投資則重在紀律與時間的累積。
                    </Heading.D3>
                  </Paragraph>
                  <Paragraph>
                    <Heading.D3>
                      若以「棒球賽」比喻投資，想一年賺30%就像揮出全壘打，固然精彩，但需要天時地利人和；而三年賺30%，就像穩定擊出安打，一步步推進壘包、累積成果。然而，多數投資人不是輸在選股，而是輸在心態。若能謹記，市場上沒有永遠的全壘打手，投資成功的關鍵是找到自己能穩定揮棒的節奏，利用複利效應達成自己設定的目標。
                    </Heading.D3>
                  </Paragraph>
                  <Paragraph>
                    <Heading.D3>
                      「理財」是我人生的基石，「享受」則為人生的追求，所以我有我的「三三三法則」——三分之一時間用來努力工作，三分之一做自己喜歡的事，三分之一投入公益。
                    </Heading.D3>
                  </Paragraph>
                  <Paragraph>
                    <Heading.D3>
                      理財不只是為了退休，更是為了活得精彩，所以，錢要花在讓你更好的地方。在我人生中五筆「非花不可」的錢，分別是旅行體驗、運動健身、學習新知、欣賞藝文、以及請客聯誼，這些支出看似消費，實際上是對人生品質的投資。
                    </Heading.D3>
                  </Paragraph>
                  <Paragraph>
                    <Heading.D3>
                      我認為財富只是基礎，幸福的感覺卻來自日常的態度。當你願意讓生活更細緻、更溫暖時，幸福感自然會增加。對我而言，「享樂」不是放縱，而是對生活的細心經營與長期規劃。從日常累積出生活的節奏、同時制定三年目標，讓理財與人生同步滾動、持續成長，因為錢不能帶來幸福，但能讓你更接近自己想要的生活。
                    </Heading.D3>
                  </Paragraph>
                  <Paragraph>
                    <div className='flex flex-col gap-3 pt-5'>
                      <Heading.D3>
                        <a
                          href='#'
                          className='text-secondary-blue font-bold underline underline-offset-2'
                        >
                          豐盛未來式
                        </a>
                      </Heading.D3>
                      <div className='text-secondary-blue flex w-full flex-row flex-wrap items-center justify-start gap-1'>
                        {['#財富投資', '＃ETF', '#豐盛人生', '#00915', '#00945B', '#00950B'].map(
                          (tag) => (
                            <Heading.D3 key={tag}>{tag}</Heading.D3>
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
        </Blockquote>
      </div>
    </OnloadProvider>
  );
});
export default Article;
