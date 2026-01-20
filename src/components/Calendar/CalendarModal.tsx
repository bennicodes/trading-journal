import Modal from "../Modal/Modal";
import type { DayTrade } from "./Calendar";
import styles from "./CalendarModal.module.css";

type Props = {
  day: DayTrade;
  onClose: () => void;
};

const CalendarDayModal = ({ day, onClose }: Props) => {
  return (
    <Modal onClose={onClose} title={new Date(day.date).toDateString()}>
      {day.trades.length === 0 ? (
        <p className={styles.empty}>No trades for this day</p>
      ) : (
        <ul className={styles.tradeList}>
          {day.trades.map((trade) => (
            <li key={trade.id} className={styles.tradeItem}>
              <div
                className={styles.tradeHeader}
                style={{
                  color:
                    trade.pnl >= 0
                      ? "var(--pnl-positive)"
                      : "var(--pnl-negative)",
                }}
              >
                <span>
                  {trade.symbol} — {trade.result} — {trade.pnl >= 0 ? "+" : "-"}
                  {Math.abs(trade.pnl).toFixed(2)}
                </span>
                <span>{trade.direction}</span>
              </div>
              {trade.notes && <p className={styles.notes}>{trade.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default CalendarDayModal;
