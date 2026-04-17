export type NavItem = {
  href: string;
  label: string;
  icon: string;
  disabled?: boolean;
};

export const primaryNav: NavItem[] = [
  { href: '/', label: '灵感', icon: '灵感' },
  { href: '/biandao', label: '编导', icon: '编导' },
  { href: '/banana', label: '作图', icon: '做图' },
  { href: '/audio', label: '音频', icon: '音频' },
  { href: '/video', label: '视频', icon: '视频' },
  { href: '/asset', label: '资产', icon: '资产' },
];
