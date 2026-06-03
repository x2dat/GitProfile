export type ThemeName = 'glass-dark' | 'dracula' | 'nord' | 'cyberpunk';

export type WidgetType = 'header' | 'about' | 'tech-stack' | 'stats' | 'socials' | 'markdown';

export interface HeaderData {
  title: string;
  subtitle: string;
  bannerUrl: string;
  typingEnabled: boolean;
  typingText: string[];
}

export interface AboutData {
  introduction: string;
  work: string;
  learning: string;
  collaborate: string;
  email: string;
}

export interface TechStackData {
  icons: string[];
  layout: 'grid' | 'badges';
}

export interface StatsData {
  username: string;
  showStats: boolean;
  showLanguages: boolean;
  showStreak: boolean;
  cardTheme: string;
}

export interface SocialsData {
  github: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  portfolio: string;
  badgeStyle: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic';
}

export interface MarkdownData {
  content: string;
}

export interface Widget {
  id: string;
  type: WidgetType;
  enabled: boolean;
  data: any; // Can be cast to specific WidgetData based on type
}

export interface TechIcon {
  key: string;
  name: string;
  color: string;
}
