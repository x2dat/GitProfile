import React from 'react';
import { 
  Sparkles, 
  User, 
  Code, 
  BarChart2, 
  Share2, 
  FileText, 
  Plus 
} from 'lucide-react';
import type { ThemeName, WidgetType } from '../types';

interface ToolboxProps {
  theme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
  onAddWidget: (type: WidgetType) => void;
}

export const Toolbox: React.FC<ToolboxProps> = ({
  theme,
  onThemeChange,
  onAddWidget
}) => {
  const themesList: { key: ThemeName; name: string; colors: string[] }[] = [
    { key: 'glass-dark', name: 'Glass Dark', colors: ['#07090e', '#8b5cf6'] },
    { key: 'dracula', name: 'Dracula', colors: ['#282a36', '#bd93f9'] },
    { key: 'nord', name: 'Nord', colors: ['#2e3440', '#88c0d0'] },
    { key: 'cyberpunk', name: 'Cyberpunk', colors: ['#0c0817', '#ff007f'] }
  ];

  const widgetTemplates: { type: WidgetType; label: string; desc: string; icon: React.ReactNode }[] = [
    { 
      type: 'header', 
      label: 'Profile Header', 
      desc: 'Intro title, subtitle, banner, typing animations.',
      icon: <Sparkles size={16} /> 
    },
    { 
      type: 'about', 
      label: 'About Me', 
      desc: 'Details on your work, learning, and collaboration.',
      icon: <User size={16} /> 
    },
    { 
      type: 'tech-stack', 
      label: 'Tech Stack Grid', 
      desc: 'Checklist of languages and frameworks with brand icons.',
      icon: <Code size={16} /> 
    },
    { 
      type: 'stats', 
      label: 'GitHub Stats Cards', 
      desc: 'Stats, languages, and commit streak cards.',
      icon: <BarChart2 size={16} /> 
    },
    { 
      type: 'socials', 
      label: 'Social Badges', 
      desc: 'Shields.io links to socials like LinkedIn, Twitter, etc.',
      icon: <Share2 size={16} /> 
    },
    { 
      type: 'markdown', 
      label: 'Custom Markdown', 
      desc: 'Write custom markdown content directly.',
      icon: <FileText size={16} /> 
    }
  ];

  return (
    <div className="toolbox-panel glass-panel">
      <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div className="logo-icon" style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: '1.1rem',
          color: '#fff',
          boxShadow: '0 0 12px var(--accent-glow)'
        }}>P</div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 600 }}>GitProfile</h1>
      </div>

      <div className="toolbox-section">
        <h3>Theme Presets</h3>
        <div className="themes-grid">
          {themesList.map(t => (
            <button
              key={t.key}
              onClick={() => onThemeChange(t.key)}
              className={`theme-card-btn ${theme === t.key ? 'active' : ''}`}
            >
              <div className="theme-preview-dots">
                <span className="dot-bg" style={{ backgroundColor: t.colors[0] }}></span>
                <span className="dot-accent" style={{ backgroundColor: t.colors[1] }}></span>
              </div>
              <span className="theme-name-label">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="toolbox-section flex-1">
        <h3>Add Widgets</h3>
        <div className="widgets-toolbox-list">
          {widgetTemplates.map(w => (
            <button
              key={w.type}
              onClick={() => onAddWidget(w.type)}
              className="widget-add-btn-card"
            >
              <div className="widget-icon-box">
                {w.icon}
              </div>
              <div className="widget-info-text">
                <span className="widget-label">{w.label}</span>
                <span className="widget-desc">{w.desc}</span>
              </div>
              <div className="widget-plus-indicator">
                <Plus size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
