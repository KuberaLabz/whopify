import { Home, ShieldCheck, Package, Sparkles, BarChart3, Settings, Sun, Moon } from 'lucide-react';
import styles from './Sidebar.module.css';

const MENU_ITEMS = [
  { icon: Home, label: 'Dashboard' },
  { icon: ShieldCheck, label: 'Store Audit' },
  { icon: Package, label: 'Products' },
  { icon: Sparkles, label: 'Experiences' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.logoContainer}>
          <div className={styles.logoCircle}>W</div>
          <span className={`${styles.logoText} serif`}>Whopy</span>
        </div>
        <nav className={styles.nav}>
          {MENU_ITEMS.map((item) => (
            <button key={item.label} className={styles.navButton}>
              <div className={styles.iconWrapper}>
                <item.icon size={20} />
              </div>
              <span className={styles.label}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className={styles.bottom}>
        <button className={styles.themeToggle}>
          <div className={styles.iconWrapper}>
            <Sun size={18} />
          </div>
          <span className={styles.label}>Light Mode</span>
        </button>
      </div>
    </aside>
  );
}
