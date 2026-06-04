import React, { useState } from 'react';
import { FileCode, Eye, Copy, Check } from 'lucide-react';
import type { Widget } from '../types';
import { TECH_ICONS } from '../iconsData';

interface PreviewPanelProps {
  widgets: Widget[];
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ widgets }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [includeAttribution, setIncludeAttribution] = useState(true);

  // Compile GFM Markdown String from Widget Configurations
  const generateMarkdown = (): string => {
    let md = '';

    widgets.forEach(w => {
      if (!w.enabled) return;

      switch (w.type) {
        case 'header': {
          const { title, subtitle, bannerUrl, typingEnabled, typingText } = w.data;
          
          if (bannerUrl) {
            md += `<p align="center">\n  <img src="${bannerUrl}" alt="banner image" width="100%" />\n</p>\n\n`;
          }
          if (title) {
            md += `<h1 align="center">${title}</h1>\n\n`;
          }
          if (subtitle) {
            md += `<p align="center">\n  ${subtitle}\n</p>\n\n`;
          }
          if (typingEnabled && typingText.length > 0) {
            const listText = encodeURIComponent(typingText.join(' ⚡ '));
            md += `<p align="center">\n  <a href="https://github.com/x2dat/WebQuest">\n    <img src="https://readme-typing-svg.demolab.com?font=Outfit&size=20&duration=3000&pause=1000&color=BD93F9&center=true&vCenter=true&width=435&lines=${listText}" alt="Typing Animation" />\n  </a>\n</p>\n\n`;
          }
          md += '<br />\n\n';
          break;
        }
        
        case 'about': {
          const { introduction, work, learning, collaborate, email } = w.data;
          
          if (introduction) {
            md += `## About Me\n\n${introduction}\n\n`;
          }
          
          let list = '';
          if (work) list += `- 🔭 I’m currently working on **${work}**\n`;
          if (learning) list += `- 🌱 I’m currently learning **${learning}**\n`;
          if (collaborate) list += `- 👯 I’m looking to collaborate on **${collaborate}**\n`;
          if (email) list += `- 📫 How to reach me: [${email}](mailto:${email})\n`;
          
          if (list) {
            md += list + '\n';
          }
          break;
        }
        
        case 'tech-stack': {
          const { icons, layout } = w.data;
          if (icons.length === 0) break;
          
          md += `## My Tech Stack\n\n`;
          
          if (layout === 'badges') {
            md += '<p align="left">\n';
            icons.forEach((key: string) => {
              const matched = TECH_ICONS.find(t => t.key === key);
              if (matched) {
                md += `  <img src="https://img.shields.io/badge/${encodeURIComponent(matched.name)}-${matched.color}?style=for-the-badge&logo=${matched.key}&logoColor=white" alt="${matched.name}" />\n`;
              }
            });
            md += '</p>\n\n';
          } else {
            // Simple grid
            md += '<p align="left">\n';
            icons.forEach((key: string) => {
              const matched = TECH_ICONS.find(t => t.key === key);
              if (matched) {
                md += `  <a href="https://skillicons.dev">\n    <img src="https://skillicons.dev/icons?i=${key}" alt="${matched.name}" />\n  </a>\n`;
              }
            });
            md += '</p>\n\n';
          }
          break;
        }
        
        case 'stats': {
          const { username, showStats, showLanguages, showStreak, cardTheme } = w.data;
          if (!username) break;

          md += `## GitHub Analytics\n\n`;
          md += '<p align="center">\n';
          
          if (showStats) {
            md += `  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${cardTheme}" alt="GitHub stats" />\n`;
          }
          if (showLanguages) {
            md += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${cardTheme}" alt="Top languages" />\n`;
          }
          if (showStreak) {
            md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${cardTheme}" alt="GitHub streak" />\n`;
          }
          
          md += '</p>\n\n';
          break;
        }
        
        case 'socials': {
          const { github, linkedin, twitter, youtube, portfolio, badgeStyle } = w.data;
          
          md += `## Connect with Me\n\n`;
          md += '<p align="left">\n';
          
          if (github) {
            md += `  <a href="https://github.com/${github}">\n    <img src="https://img.shields.io/badge/GitHub-181717?style=${badgeStyle}&logo=github&logoColor=white" alt="GitHub" />\n  </a>\n`;
          }
          if (linkedin) {
            md += `  <a href="https://linkedin.com/in/${linkedin}">\n    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=${badgeStyle}&logo=linkedin&logoColor=white" alt="LinkedIn" />\n  </a>\n`;
          }
          if (twitter) {
            md += `  <a href="https://twitter.com/${twitter}">\n    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=${badgeStyle}&logo=twitter&logoColor=white" alt="Twitter" />\n  </a>\n`;
          }
          if (youtube) {
            md += `  <a href="https://youtube.com/${youtube}">\n    <img src="https://img.shields.io/badge/YouTube-FF0000?style=${badgeStyle}&logo=youtube&logoColor=white" alt="YouTube" />\n  </a>\n`;
          }
          if (portfolio) {
            md += `  <a href="${portfolio}">\n    <img src="https://img.shields.io/badge/Portfolio-emerald?style=${badgeStyle}&logo=google-chrome&logoColor=white" alt="Portfolio" />\n  </a>\n`;
          }
          
          md += '</p>\n\n';
          break;
        }
        
        case 'markdown': {
          md += w.data.content + '\n\n';
          break;
        }
      }
    });

    if (includeAttribution) {
      md += `\n\n---\n\n<!-- Generated with GitProfile Studio -->\n<p align="center">\n  <a href="https://x2dat.github.io/GitProfile/">\n    <img src="https://img.shields.io/badge/Generated%20with-GitProfile%20Studio-blue?style=flat-square" alt="GitProfile Studio" />\n  </a>\n</p>`;
    }

    return md.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Convert markdown elements directly to React elements
  const renderMarkdownToHtml = () => {
    const rawMarkdown = generateMarkdown();
    if (!rawMarkdown) {
      return (
        <div className="preview-empty-state">
          <Eye size={40} className="empty-icon" />
          <h3>No Content to Preview</h3>
          <p>Add some active widgets in the canvas to see your Markdown layout render here.</p>
        </div>
      );
    }

    // Split markdown by lines and parse basic HTML tags safely
    const lines = rawMarkdown.split('\n');
    const elements: React.ReactNode[] = [];

    let currentList: React.ReactNode[] = [];
    let listKey = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="preview-ul">
            {currentList}
          </ul>
        );
        currentList = [];
      }
    };

    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();

      // Skip empty lines or line breaks
      if (!line) {
        flushList();
        i++;
        continue;
      }

      // Ignore HTML Comments
      if (line.startsWith('<!--')) {
        flushList();
        i++;
        continue;
      }

      // Horizontal Rule
      if (line === '---') {
        flushList();
        elements.push(<hr key={`hr-${i}`} style={{ border: 'none', borderBottom: '1px solid var(--border)', margin: '16px 0' }} />);
        i++;
        continue;
      }

      if (line === '<br />') {
        flushList();
        elements.push(<br key={`br-${i}`} />);
        i++;
        continue;
      }

      // Check for alignment paragraphs or HTML anchors
      if (line.startsWith('<p align="center">') || line.startsWith('<p align="left">')) {
        flushList();
        const align = line.includes('center') ? 'center' : 'left';
        
        // Accumulate tags inside the paragraph block
        let pContent = '';
        i++;
        while (i < lines.length && !lines[i].includes('</p>')) {
          pContent += lines[i].trim() + ' ';
          i++;
        }
        
        // Simple match finder for links containing badges
        let linkMatch;
        const linkMatches: { href: string; src: string; alt: string }[] = [];
        const linkPattern = /<a href="([^"]+)">\s*<img src="([^"]+)" alt="([^"]+)"\s*\/>\s*<\/a>/g;
        
        while ((linkMatch = linkPattern.exec(pContent)) !== null) {
          linkMatches.push({ href: linkMatch[1], src: linkMatch[2], alt: linkMatch[3] });
        }

        if (linkMatches.length > 0) {
          elements.push(
            <div key={`p-align-${i}`} className={`preview-p align-${align}`}>
              {linkMatches.map((lm, idx) => (
                <a key={idx} href={lm.href} target="_blank" rel="noreferrer">
                  <img src={lm.src} alt={lm.alt} className="preview-badge" />
                </a>
              ))}
            </div>
          );
        } else {
          // Standard Image matches
          let singleImgMatch;
          const imgMatches: { src: string; alt: string; width?: string }[] = [];
          const imgPattern = /<img src="([^"]+)" alt="([^"]+)"(?:\s+width="([^"]+)")?\s*\/>/g;
          
          while ((singleImgMatch = imgPattern.exec(pContent)) !== null) {
            imgMatches.push({ src: singleImgMatch[1], alt: singleImgMatch[2], width: singleImgMatch[3] });
          }

          if (imgMatches.length > 0) {
            elements.push(
              <div key={`p-align-${i}`} className={`preview-p align-${align}`}>
                {imgMatches.map((im, idx) => (
                  <img 
                    key={idx} 
                    src={im.src} 
                    alt={im.alt} 
                    width={im.width || "auto"} 
                    className={im.width === "100%" ? "preview-banner-img" : "preview-badge"} 
                  />
                ))}
              </div>
            );
          }
        }
        
        i++;
        continue;
      }

      // Headers (e.g. ## Title)
      if (line.startsWith('#')) {
        flushList();
        const level = line.match(/^#+/)?.[0].length || 1;
        const text = line.replace(/^#+\s+/, '');
        
        const renderHeader = (lvl: number, txt: string, keyVal: string) => {
          switch (lvl) {
            case 1: return <h1 key={keyVal} className="preview-h1">{txt}</h1>;
            case 2: return <h2 key={keyVal} className="preview-h2">{txt}</h2>;
            case 3: return <h3 key={keyVal} className="preview-h3">{txt}</h3>;
            case 4: return <h4 key={keyVal} className="preview-h4">{txt}</h4>;
            case 5: return <h5 key={keyVal} className="preview-h5">{txt}</h5>;
            default: return <h6 key={keyVal} className="preview-h6">{txt}</h6>;
          }
        };
        
        elements.push(renderHeader(level, text, `h-${i}`));
        i++;
        continue;
      }

      // Bullet Lists (e.g. - Items)
      if (line.startsWith('-') || line.startsWith('*')) {
        const text = line.replace(/^[-*]\s+/, '');
        
        // Parse simple bold tags and links inside bullet text
        const boldRegex = /\*\*([^*]+)\*\*/g;
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        
        // Simple GFM parsing
        let parsedText: any = text;
        const boldMatches = [...text.matchAll(boldRegex)];
        const linkMatches = [...text.matchAll(linkRegex)];

        if (boldMatches.length > 0 || linkMatches.length > 0) {
          // Handled visually for simple previews
          parsedText = text.replace(boldRegex, '$1').replace(linkRegex, '$1');
        }

        currentList.push(
          <li key={`li-${i}`} className="preview-li">
            {parsedText}
          </li>
        );
        i++;
        continue;
      }

      // Default text paragraphs
      flushList();
      elements.push(<p key={`text-${i}`} className="preview-text-p">{line}</p>);
      i++;
    }

    flushList();
    return <div className="preview-markdown-rendered">{elements}</div>;
  };

  return (
    <div className="preview-panel glass-panel">
      <div className="preview-header">
        <div className="preview-tabs">
          <button 
            className={`preview-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <Eye size={14} />
            Live Render
          </button>
          <button 
            className={`preview-tab-btn ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <FileCode size={14} />
            GFM Markdown
          </button>
        </div>

        <div className="attribution-toggle-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <input 
            type="checkbox" 
            id="attribution-toggle" 
            checked={includeAttribution} 
            onChange={(e) => setIncludeAttribution(e.target.checked)}
            style={{ cursor: 'pointer', accentColor: 'var(--accent)' }}
          />
          <label htmlFor="attribution-toggle" style={{ cursor: 'pointer', userSelect: 'none' }}>
            Add Attribution Badge
          </label>
        </div>

        <button className="copy-md-btn glow-btn" onClick={handleCopy}>
          {copied ? (
            <>
              <Check size={14} style={{ color: 'var(--success)' }} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy Readme</span>
            </>
          )}
        </button>
      </div>

      <div className="preview-content-scroll">
        {activeTab === 'preview' ? (
          renderMarkdownToHtml()
        ) : (
          <pre className="code-block code-font">
            <code>{generateMarkdown() || 'Add widgets to compile Markdown...'}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
