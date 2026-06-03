import React, { useState } from 'react';
import { X, Search, Check } from 'lucide-react';
import { TECH_ICONS } from '../iconsData';
import type { 
  HeaderData, 
  AboutData, 
  TechStackData, 
  StatsData, 
  SocialsData, 
  MarkdownData 
} from '../types';

// ================= HEADER FORM =================
export const HeaderForm: React.FC<{
  data: HeaderData;
  onChange: (data: HeaderData) => void;
}> = ({ data, onChange }) => {
  const [typingInput, setTypingInput] = useState('');

  const updateField = (key: keyof HeaderData, val: any) => {
    onChange({ ...data, [key]: val });
  };

  const addTypingItem = () => {
    if (!typingInput.trim()) return;
    updateField('typingText', [...data.typingText, typingInput.trim()]);
    setTypingInput('');
  };

  const removeTypingItem = (index: number) => {
    updateField('typingText', data.typingText.filter((_, i) => i !== index));
  };

  return (
    <div className="widget-form-grid">
      <div className="form-group">
        <label>Profile Greeting / Title</label>
        <input 
          type="text" 
          value={data.title}
          onChange={(e) => updateField('title', e.target.value)}
          placeholder="Hi, I'm John Doe 👋"
        />
      </div>

      <div className="form-group">
        <label>Subtitle Description</label>
        <input 
          type="text" 
          value={data.subtitle}
          onChange={(e) => updateField('subtitle', e.target.value)}
          placeholder="A software engineer building web applications..."
        />
      </div>

      <div className="form-group">
        <label>Banner Image URL (Optional)</label>
        <input 
          type="text" 
          value={data.bannerUrl}
          onChange={(e) => updateField('bannerUrl', e.target.value)}
          placeholder="https://images.unsplash.com/photo..."
        />
      </div>

      <div className="form-group row-toggle">
        <label>Enable Typing Animation</label>
        <input 
          type="checkbox" 
          checked={data.typingEnabled}
          onChange={(e) => updateField('typingEnabled', e.target.checked)}
        />
      </div>

      {data.typingEnabled && (
        <div className="form-group col-full">
          <label>Typing Phrases</label>
          <div className="tag-list">
            {data.typingText.map((txt, idx) => (
              <span key={idx} className="typing-tag">
                {txt}
                <button onClick={() => removeTypingItem(idx)}><X size={12} /></button>
              </span>
            ))}
          </div>
          <div className="tag-input-row">
            <input 
              type="text" 
              value={typingInput}
              onChange={(e) => setTypingInput(e.target.value)}
              placeholder="e.g. Full Stack Developer"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTypingItem();
                }
              }}
            />
            <button type="button" onClick={addTypingItem}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ================= ABOUT FORM =================
export const AboutForm: React.FC<{
  data: AboutData;
  onChange: (data: AboutData) => void;
}> = ({ data, onChange }) => {
  const updateField = (key: keyof AboutData, val: any) => {
    onChange({ ...data, [key]: val });
  };

  return (
    <div className="widget-form-grid">
      <div className="form-group col-full">
        <label>Self Introduction</label>
        <textarea 
          value={data.introduction}
          onChange={(e) => updateField('introduction', e.target.value)}
          placeholder="Brief intro about yourself..."
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>🔭 What are you currently working on?</label>
        <input 
          type="text" 
          value={data.work}
          onChange={(e) => updateField('work', e.target.value)}
          placeholder="e.g. personal portfolio, react hooks"
        />
      </div>

      <div className="form-group">
        <label>🌱 What are you learning?</label>
        <input 
          type="text" 
          value={data.learning}
          onChange={(e) => updateField('learning', e.target.value)}
          placeholder="e.g. TypeScript, GraphQL, Rust"
        />
      </div>

      <div className="form-group">
        <label>👯 What do you want to collaborate on?</label>
        <input 
          type="text" 
          value={data.collaborate}
          onChange={(e) => updateField('collaborate', e.target.value)}
          placeholder="e.g. open source tools"
        />
      </div>

      <div className="form-group">
        <label>📫 How to reach you (Email)?</label>
        <input 
          type="email" 
          value={data.email}
          onChange={(e) => updateField('email', e.target.value)}
          placeholder="email@example.com"
        />
      </div>
    </div>
  );
};

// ================= TECH STACK FORM =================
export const TechStackForm: React.FC<{
  data: TechStackData;
  onChange: (data: TechStackData) => void;
}> = ({ data, onChange }) => {
  const [search, setSearch] = useState('');

  const toggleIcon = (key: string) => {
    const updated = data.icons.includes(key)
      ? data.icons.filter(k => k !== key)
      : [...data.icons, key];
    onChange({ ...data, icons: updated });
  };

  const filteredIcons = TECH_ICONS.filter(icon => 
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tech-stack-editor">
      <div className="tech-controls">
        <div className="search-bar-wrapper">
          <Search size={14} />
          <input 
            type="text" 
            placeholder="Search languages or tools..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="layout-toggle-group">
          <label>Badge Layout:</label>
          <select 
            value={data.layout} 
            onChange={(e) => onChange({ ...data, layout: e.target.value as 'grid' | 'badges' })}
          >
            <option value="badges">Shield Badges</option>
            <option value="grid">Grid (Minimalist Icons)</option>
          </select>
        </div>
      </div>

      <div className="tech-list-scroll">
        {filteredIcons.map(icon => {
          const isChecked = data.icons.includes(icon.key);
          return (
            <button
              key={icon.key}
              type="button"
              className={`tech-chip-btn ${isChecked ? 'selected' : ''}`}
              style={{ '--brand-color': `#${icon.color}` } as React.CSSProperties}
              onClick={() => toggleIcon(icon.key)}
            >
              <span className="checkbox-glow">
                {isChecked && <Check size={12} />}
              </span>
              <span>{icon.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ================= STATS FORM =================
export const StatsForm: React.FC<{
  data: StatsData;
  onChange: (data: StatsData) => void;
}> = ({ data, onChange }) => {
  const updateField = (key: keyof StatsData, val: any) => {
    onChange({ ...data, [key]: val });
  };

  const statsThemes = [
    'dracula', 'radical', 'merko', 'gruvbox', 'tokyonight', 
    'onedark', 'dark', 'vision-friendly-dark', 'default'
  ];

  return (
    <div className="widget-form-grid">
      <div className="form-group">
        <label>GitHub Username</label>
        <input 
          type="text" 
          value={data.username}
          onChange={(e) => updateField('username', e.target.value)}
          placeholder="your-username"
        />
      </div>

      <div className="form-group">
        <label>Card Theme</label>
        <select 
          value={data.cardTheme}
          onChange={(e) => updateField('cardTheme', e.target.value)}
        >
          {statsThemes.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="form-group row-toggle">
        <label>Show Profile Stats</label>
        <input 
          type="checkbox" 
          checked={data.showStats}
          onChange={(e) => updateField('showStats', e.target.checked)}
        />
      </div>

      <div className="form-group row-toggle">
        <label>Show Top Languages</label>
        <input 
          type="checkbox" 
          checked={data.showLanguages}
          onChange={(e) => updateField('showLanguages', e.target.checked)}
        />
      </div>

      <div className="form-group row-toggle">
        <label>Show Commit Streak</label>
        <input 
          type="checkbox" 
          checked={data.showStreak}
          onChange={(e) => updateField('showStreak', e.target.checked)}
        />
      </div>
    </div>
  );
};

// ================= SOCIALS FORM =================
export const SocialsForm: React.FC<{
  data: SocialsData;
  onChange: (data: SocialsData) => void;
}> = ({ data, onChange }) => {
  const updateField = (key: keyof SocialsData, val: any) => {
    onChange({ ...data, [key]: val });
  };

  const badgeStyles = [
    { key: 'flat', label: 'Flat' },
    { key: 'flat-square', label: 'Flat Square' },
    { key: 'for-the-badge', label: 'For the Badge' },
    { key: 'plastic', label: 'Plastic' }
  ];

  return (
    <div className="widget-form-grid">
      <div className="form-group">
        <label>GitHub Handle</label>
        <input 
          type="text" 
          value={data.github}
          onChange={(e) => updateField('github', e.target.value)}
          placeholder="username"
        />
      </div>

      <div className="form-group">
        <label>LinkedIn Username</label>
        <input 
          type="text" 
          value={data.linkedin}
          onChange={(e) => updateField('linkedin', e.target.value)}
          placeholder="in/username"
        />
      </div>

      <div className="form-group">
        <label>Twitter Handle</label>
        <input 
          type="text" 
          value={data.twitter}
          onChange={(e) => updateField('twitter', e.target.value)}
          placeholder="username"
        />
      </div>

      <div className="form-group">
        <label>YouTube Channel ID</label>
        <input 
          type="text" 
          value={data.youtube}
          onChange={(e) => updateField('youtube', e.target.value)}
          placeholder="c/ChannelName"
        />
      </div>

      <div className="form-group">
        <label>Portfolio / Personal Web</label>
        <input 
          type="text" 
          value={data.portfolio}
          onChange={(e) => updateField('portfolio', e.target.value)}
          placeholder="https://example.com"
        />
      </div>

      <div className="form-group">
        <label>Badge Style</label>
        <select 
          value={data.badgeStyle}
          onChange={(e) => updateField('badgeStyle', e.target.value)}
        >
          {badgeStyles.map(b => (
            <option key={b.key} value={b.key}>{b.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

// ================= CUSTOM MARKDOWN =================
export const MarkdownForm: React.FC<{
  data: MarkdownData;
  onChange: (data: MarkdownData) => void;
}> = ({ data, onChange }) => {
  return (
    <div className="editor-container">
      <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
        Write custom GFM Markdown content
      </label>
      <textarea 
        className="code-font"
        value={data.content}
        onChange={(e) => onChange({ ...data, content: e.target.value })}
        placeholder="### My Coding Journey..."
        rows={6}
        style={{ minHeight: '140px', width: '100%', resize: 'vertical' }}
      />
    </div>
  );
};
