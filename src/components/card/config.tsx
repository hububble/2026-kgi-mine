import { TUserDataContent } from '@/settings/type';

export const URI = [
  { path: 'card-bg.jpg', name: 'card-bg' },
  { path: 'card-topic-icon.svg', name: 'card-topic-icon' },
];

export const findPrimarySecondaryTag = (data?: TUserDataContent) => {
  const { hubSpot_PrimaryTag, hubSpot_SecondaryTag } = data || {};

  const currentPrimaryTag = (hubSpot_PrimaryTag || 'NONE') as 'CAREER' | 'FINANCE' | 'HEALTH' | 'RELATIONS' | 'SOCIETY' | 'NONE';

  const currentSecondaryTag = (hubSpot_SecondaryTag || 'NONE') as 'CAREER' | 'FINANCE' | 'HEALTH' | 'RELATIONS' | 'SOCIETY' | 'NONE';

  let primaryCount = 0;
  let secondaryCount = 0;

  switch (currentPrimaryTag.toLowerCase()) {
    case 'career':
      primaryCount = data?.careerRequirement || 0;
      break;
    case 'finance':
      primaryCount = data?.financeRequirement || 0;
      break;
    case 'health':
      primaryCount = data?.healthRequirement || 0;
      break;
    case 'relations':
      primaryCount = data?.relationsRequirement || 0;
      break;
    case 'community':
      primaryCount = data?.societyRequirement || 0;
      break;
    case 'none':
      primaryCount = 0;
      break;
  }

  switch (currentSecondaryTag.toLowerCase()) {
    case 'career':
      secondaryCount = data?.careerRequirement || 0;
      break;
    case 'finance':
      secondaryCount = data?.financeRequirement || 0;
      break;
    case 'health':
      secondaryCount = data?.healthRequirement || 0;
      break;
    case 'relations':
      secondaryCount = data?.relationsRequirement || 0;
      break;
    case 'community':
      secondaryCount = data?.societyRequirement || 0;
      break;
    case 'none':
      secondaryCount = 0;
      break;
  }

  return {
    primary: { type: currentPrimaryTag.toLowerCase(), count: primaryCount },
    secondary: { type: currentSecondaryTag.toLowerCase(), count: secondaryCount },
  };
};
