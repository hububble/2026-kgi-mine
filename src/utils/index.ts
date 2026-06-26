import { SceneDepth, SceneSize } from '@/settings/config';
import BezierEasing from 'bezier-easing';

export const printCSSAnimation = (radius: number = 20, isBlank: boolean = false) => {
  let i = 0;
  if (isBlank) {
    let s = setInterval(() => {
      console.log(`${i * 5}%{ opacity:${0.2 + Math.random() * 0.8}; }`);
      if (i === 10) clearInterval(s);
      else i++;
    }, 30);
  }

  let index = 0;
  const r = radius;
  let out = '';
  const render = () => {
    const x = Math.cos((Math.PI / 180) * index) * r;
    const y = Math.sin((Math.PI / 180) * index * 2) * r;
    const currentX = x + r;
    const rotate = index;

    out += `${Math.round((index / 360) * 100)}%{transform: translateX(${currentX.toFixed(2)}px) translateY(${y.toFixed(2)}px) rotate(${rotate}deg);}\n`;

    index += 5;
    if (index <= 360) requestAnimationFrame(render);
    else console.log(out);
  };
  render();
};

export const checkElementInViewport = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const checkElementInViewportWithThreshold = (el: HTMLElement, threshold: number) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= -threshold &&
    rect.left >= -threshold &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + threshold
  );
};

export const checkElementCenterOfScreenWithOffset = (el: HTMLElement, offset: number) => {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0) return false;
  return rect.left < 0 ? false : rect.left <= window.innerWidth / 2 + offset;
};

export const mergePath = (file: string) => {
  const host = window.KGI_MINE_BASE_URI || location.origin;
  const currentApiWithSlash = file.slice(0, 1) === '/' ? file : `/${file}`;
  const currentHostWithoutSlash = host.slice(-1) === '/' ? host.slice(0, -1) : host;
  return `${currentHostWithoutSlash}${currentApiWithSlash}`;
};

export const normalizeAudioSrc = (path: string): string => {
  const raw = mergePath(path);

  try {
    const url = new URL(raw, window.location.origin);
    const reqIsLocalhost = /^(localhost|127\.0\.0\.1)$/i.test(url.hostname);
    const pageIsRemote = !/^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

    if (pageIsRemote && reqIsLocalhost) {
      url.protocol = window.location.protocol;
      url.host = window.location.host;
    }

    return url.toString();
  } catch {
    return raw;
  }
};

export const resolveAudioSrc = (src: string) => {
  const normalized = normalizeAudioSrc(src);

  try {
    const url = new URL(normalized, window.location.origin);
    const reqIsLocalhost = /^(localhost|127\.0\.0\.1)$/i.test(url.hostname);
    const pageIsRemote = !/^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

    if (pageIsRemote && reqIsLocalhost) {
      url.protocol = window.location.protocol;
      url.host = window.location.host;
    }

    return url.toString();
  } catch {
    return normalized;
  }
};

export const getViewPxByDirection = (percent: number, width: number) => {
  const ratio = getViewPxRatio({ width });
  const currentOffset = percent / SceneDepth.middle / ratio;
  return currentOffset;
};

export const getPercentByViewPx = (px: number, width: number) => {
  const ratio = getViewPxRatio({ width });
  const currentPercent = px * SceneDepth.middle * ratio;
  return currentPercent + 17;
};

export const getViewPxRatio = ({ width }: { width: number }) => {
  const basicBackgroundPanOffset = SceneSize.width - window.innerWidth;
  const targetBackgroundPanOffset = width - window.innerWidth;
  return (targetBackgroundPanOffset / basicBackgroundPanOffset) * getScreenOffset();
};

export const getScreenOffset = (defaultRatio: number = 2) => {
  // The ratio is calculated based on the difference between the current view width and the original design width, compared to the original background pan offset. This allows for dynamic adjustment of the parallax effect based on the actual view size, ensuring a consistent visual experience across different screen sizes.
  const easing =
    window.innerWidth > 768 ? BezierEasing(0.5, 0, 0.75, 0) : BezierEasing(0.22, 1, 0.36, 1);

  const windowRatio = window.innerWidth / window.innerHeight;
  const expectedRatio = 1680 / 1050;

  const offsetRatio = windowRatio - expectedRatio;
  const currentOffset = easing(Math.abs(offsetRatio)) * (offsetRatio < 0 ? -1 : 1);
  return defaultRatio + currentOffset;
};

export function shareURL({ onError }: { onError?: () => void }) {
  if (navigator.share) {
    const shareData = {
      title: '--2026 KGI MINE--',
      text: '來自2026 KGI MINE的邀請，快來一起體驗吧！',
      url: window.location.href,
    };
    navigator
      .share(shareData)
      .then(() => console.log('URL shared successfully'))
      .catch((error) => console.error('Error sharing URL:', error));
  } else {
    onError?.();
  }
}
