// 编导页面 mock 数据

export const biandaoTabs = ['文案二创', '立项管理', '行业选题', '文案自创', '我的文案库'] as const;

// 文案二创 tab
export const biandaoScriptTabs = ['短视频', '直播话术', '口播文案'] as const;

export const biandaoScriptCards = [
  { title: '口播/短剧/图文拆解', desc: 'AI分析对标视频并生成文案', icon: 'script', color: '#6366f1' },
  { title: '短视频文案改写', desc: '改写文案风格', icon: 'edit', color: '#8b5cf6' },
  { title: '爆款标题创作工坊', desc: 'AI批量生成爆款标题', icon: 'title', color: '#a855f7' },
  { title: '口播短视频创作', desc: '输入文案自动生成口播视频', icon: 'video', color: '#ec4899' },
];

// 立项管理 tab
export const biandaoProjectCards = [
  { name: '创建人设立项', icon: 'character', desc: '立账号人设类型、性格、语气、记忆点等', color: '#8b5cf6' },
  { name: '创建产品立项', icon: 'product', desc: '专柜商品资料、核心卖点参数', color: '#6366f1' },
  { name: '创建门店立项', icon: 'store', desc: '专柜商品资料、核心卖点参数', color: '#a855f7' },
];

export const biandaoProjectSubTabs = ['人设管理', '产品立项', '门店立项'] as const;

// 行业选题 tab
export const biandaoIndustryTabs = ['人设管理', '产品立项', '门店立项'] as const;

export const biandaoIndustryPersonas = [
  { name: '美商主播茉莉', type: '美妆护肤' },
  { name: '数码达人小陈', type: '3C数码' },
  { name: '美食家老张', type: '餐饮美食' },
];

export const biandaoIndustryTemplates = [
  ['痛点共鸣型', '悬念吸引', '二次吸引', '效果反差'],
  ['沉浸展示', '造中测试', '选品对比', '情感营销'],
  ['场景痛点', '选题拆解', '选题解析', '选题推荐'],
  ['话题热点', '话题延展', '话题挑战', '话题互动'],
];

// 文案自创 tab
export const biandaoWriteCategories = ['产品带货', '品牌宣传', '知识分享'] as const;

// 我的文案库 tab
export const biandaoLibraryItems = [
  {
    title: '美妆带货-小张老',
    subtitle: '文案二创 / 创建于 2026-03-29',
    content: '这个八十岁的爷爷是我的学生。这个五十岁的阿姨，也是我的学生。这次教了个小学生来录课。没错，我都教人上了一遍，你可得看仔细了能学不会的就赶紧其实没什么神秘的，只是我们想多了太多。了一开始...',
    tags: ['春日狂欢月应合作伙伴', '春桃同狂欢'],
    source: 'https://v.douyin.com/...',
  },
  {
    title: '美妆带货-小张老',
    subtitle: '文案二创 / 创建于 2026-03-29',
    content: '这个八十岁的爷爷是我的学生。这个五十岁的阿姨，也是我的学生。这次教了个小学生来录课。没错，我都教人上了一遍，你可得看仔细了能学不会的就赶紧其实没什么神秘的，只是我们想多了太多。了一开始...',
    tags: ['春日狂欢月应合作伙伴', '春桃同狂欢'],
    source: 'https://v.douyin.com/...',
  },
  {
    title: '美妆带货-小张老',
    subtitle: '文案二创 / 创建于 2026-03-29',
    content: '这个八十岁的爷爷是我的学生。这个五十岁的阿姨，也是我的学生。这次教了个小学生来录课。没错，我都教人上了一遍，你可得看仔细了能学不会的就赶紧其实没什么神秘的，只是我们想多了太多。了一开始...',
    tags: ['春日狂欢月应合作伙伴', '春桃同狂欢'],
    source: 'https://v.douyin.com/...',
  },
  {
    title: '美妆带货-小张老',
    subtitle: '文案二创 / 创建于 2026-03-29',
    content: '这个八十岁的爷爷是我的学生。这个五十岁的阿姨，也是我的学生。这次教了个小学生来录课。没错，我都教人上了一遍，你可得看仔细了能学不会的就赶紧其实没什么神秘的，只是我们想多了太多。了一开始...',
    tags: ['春日狂欢月应合作伙伴', '春桃同狂欢'],
    source: 'https://v.douyin.com/...',
  },
  {
    title: '美妆带货-小张老',
    subtitle: '文案二创 / 创建于 2026-03-29',
    content: '这个八十岁的爷爷是我的学生。这个五十岁的阿姨，也是我的学生。这次教了个小学生来录课。没错，我都教人上了一遍，你可得看仔细了能学不会的就赶紧其实没什么神秘的，只是我们想多了太多。了一开始...',
    tags: ['春日狂欢月应合作伙伴', '春桃同狂欢'],
    source: 'https://v.douyin.com/...',
  },
  {
    title: '美妆带货-小张老',
    subtitle: '文案二创 / 创建于 2026-03-29',
    content: '这个八十岁的爷爷是我的学生。这个五十岁的阿姨，也是我的学生。这次教了个小学生来录课。没错，我都教人上了一遍，你可得看仔细了能学不会的就赶紧其实没什么神秘的，只是我们想多了太多。了一开始...',
    tags: ['春日狂欢月应合作伙伴', '春桃同狂欢'],
    source: 'https://v.douyin.com/...',
  },
];

export type BiandaoLibraryItem = typeof biandaoLibraryItems[number];
