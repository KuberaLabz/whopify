import { Bell, Share2 } from 'lucide-react';
import styles from './TopActions.module.css';

export default function TopActions() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={`${styles.brand} serif`}>Whopy AI</h1>
      </div>
      <div className={styles.right}>
        <button className={styles.iconButton} aria-label="Notifications">
          <Bell size={20} />
        </button>
        <button className={styles.iconButton} aria-label="Share">
          <Share2 size={20} />
        </button>
        <div className={styles.avatar}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Milovan" alt="User" />
        </div>
      </div>
    </div>
  );
}
