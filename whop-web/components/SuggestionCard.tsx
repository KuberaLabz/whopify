import styles from './SuggestionCard.module.css';

interface SuggestionCardProps {
  title: string;
  onClick: () => void;
}

export default function SuggestionCard({ title, onClick }: SuggestionCardProps) {
  return (
    <button className={`${styles.card} glass`} onClick={onClick}>
      <p>{title}</p>
    </button>
  );
}
