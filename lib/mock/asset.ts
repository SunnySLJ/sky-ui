export type AssetTab = '作品' | '分身' | '音频' | '素材' | '文案';

export const assetTabs: AssetTab[] = ['作品', '分身', '音频', '素材', '文案'];

// Sub tabs: 作品 and 分身 have sub-tabs
export const assetSubTabs: Record<AssetTab, string[]> = {
  作品: ['造梦视频', '香蕉作品', '混剪成片', '替换/迁移', '电商作品', '智能包装'],
  分身: ['照片形象', '燃动分身', '对口型视频'],
  音频: [],
  素材: [],
  文案: [],
};

export const assetCards = [
  '/images/cdn-2.png',
  '/images/cdn-3.jpg',
  '/images/cdn-4.png',
  '/images/cdn-5.jpg',
  '/images/ba91e81c1a7b02544c6b61d852aacc.png',
  '/images/36ba636d5351f39326d46f4fec61fc.jpg',
  '/images/7a0f19e1775f75480dd733a559468c.png',
  '/images/9382bd4e92b293bc2d5427cdd78043.png',
  '/images/a44778616c13e342f99a8a1ef81cb6.png',
  '/images/72fabc6325ec83c23065743cd2f10e.jpg',
];
