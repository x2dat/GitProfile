import React from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Eye, 
  EyeOff, 
  Layers 
} from 'lucide-react';
import type { Widget } from '../types';
import { 
  HeaderForm, 
  AboutForm, 
  TechStackForm, 
  StatsForm, 
  SocialsForm, 
  MarkdownForm 
} from './WidgetForms';

interface CanvasProps {
  widgets: Widget[];
  onChangeWidget: (id: string, data: any) => void;
  onToggleWidget: (id: string) => void;
  onDeleteWidget: (id: string) => void;
  onMoveWidget: (id: string, direction: 'up' | 'down') => void;
}

export const Canvas: React.FC<CanvasProps> = ({
  widgets,
  onChangeWidget,
  onToggleWidget,
  onDeleteWidget,
  onMoveWidget
}) => {
  const getWidgetLabel = (type: string) => {
    switch (type) {
      case 'header': return 'Profile Header';
      case 'about': return 'About Me';
      case 'tech-stack': return 'Tech Stack Grid';
      case 'stats': return 'GitHub Stats Cards';
      case 'socials': return 'Social Badges';
      case 'markdown': return 'Custom Markdown';
      default: return 'Widget';
    }
  };

  const renderWidgetForm = (widget: Widget) => {
    const handleFormChange = (updatedData: any) => {
      onChangeWidget(widget.id, updatedData);
    };

    switch (widget.type) {
      case 'header':
        return <HeaderForm data={widget.data} onChange={handleFormChange} />;
      case 'about':
        return <AboutForm data={widget.data} onChange={handleFormChange} />;
      case 'tech-stack':
        return <TechStackForm data={widget.data} onChange={handleFormChange} />;
      case 'stats':
        return <StatsForm data={widget.data} onChange={handleFormChange} />;
      case 'socials':
        return <SocialsForm data={widget.data} onChange={handleFormChange} />;
      case 'markdown':
        return <MarkdownForm data={widget.data} onChange={handleFormChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="canvas-panel glass-panel">
      <div className="canvas-header">
        <div className="canvas-title-group">
          <Layers size={18} />
          <h2>Profile Canvas</h2>
        </div>
        <span className="widget-count">{widgets.length} active widgets</span>
      </div>

      <div className="canvas-content-scroll">
        {widgets.length === 0 ? (
          <div className="canvas-empty-state">
            <Layers size={40} className="empty-icon animate-pulse" />
            <h3>Your Profile Canvas is Empty</h3>
            <p>Select widgets from the left toolbox to add them here, reorder them, and configure details.</p>
          </div>
        ) : (
          <div className="canvas-cards-list">
            {widgets.map((widget, index) => (
              <div 
                key={widget.id} 
                className={`canvas-card ${!widget.enabled ? 'disabled' : ''}`}
              >
                <div className="card-drag-bar">
                  <div className="card-meta">
                    <button 
                      type="button"
                      className={`toggle-enable-btn ${widget.enabled ? 'active' : ''}`}
                      onClick={() => onToggleWidget(widget.id)}
                      title={widget.enabled ? 'Disable widget' : 'Enable widget'}
                    >
                      {widget.enabled ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <span className="card-widget-type">{getWidgetLabel(widget.type)}</span>
                  </div>

                  <div className="card-actions">
                    <button 
                      onClick={() => onMoveWidget(widget.id, 'up')}
                      disabled={index === 0}
                      title="Move up"
                      className="arrow-btn"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      onClick={() => onMoveWidget(widget.id, 'down')}
                      disabled={index === widgets.length - 1}
                      title="Move down"
                      className="arrow-btn"
                    >
                      <ArrowDown size={14} />
                    </button>
                    <button 
                      onClick={() => onDeleteWidget(widget.id)}
                      className="delete-card-btn"
                      title="Delete widget"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="card-form-wrapper">
                  {renderWidgetForm(widget)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
