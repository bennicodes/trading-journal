import styles from "./StatCard.module.css";

type Props = {
  label: string;
  value: string;
};

export const StatCard = ({ label, value }: Props) => {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <strong className={styles.value}>{value}</strong>
    </div>
  );
};
