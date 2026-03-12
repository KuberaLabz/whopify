import React from 'react';
import { Plus, Settings2, Paperclip, ArrowUp } from 'lucide-react';
import styles from './ChatInterface.module.css';

export default function ChatInterface({ onSend, disabled }: { onSend: (msg: string) => void, disabled: boolean }) {
  const [value, setValue] = React.useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend(value);
        setValue("");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.slab} glass`}>
        <div className={styles.inputArea}>
          <textarea 
            placeholder="Ask Me Anything..." 
            className={styles.input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
          />
        </div>
        <div className={styles.bottomBar}>
          <div className={styles.leftActions}>
            <button className={styles.actionButton} aria-label="Add">
              <Plus size={18} />
            </button>
            <button className={styles.actionButton} aria-label="Settings">
              <Settings2 size={18} />
            </button>
          </div>
          <div className={styles.rightActions}>
            <button className={styles.iconButton} aria-label="Attach file">
              <Paperclip size={20} />
            </button>
            <button 
              className={styles.sendButton} 
              onClick={() => value.trim() && onSend(value)}
              disabled={!value.trim() || disabled}
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
