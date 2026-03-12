import styles from './AIOrientedOrb.module.css';

export default function AIOrientedOrb() {
  return (
    <div className={styles.container}>
      <div className={styles.orb} />
      <div className={styles.glow} />
    </div>
  );
}
