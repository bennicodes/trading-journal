import type { Trade } from "@/types/trade";
import TradeRow from "../TradeRow/TradeRow";
import styles from "./TradesTable.module.css";

type Props = {
  trades: Trade[];
  onRowClick: (trade: Trade) => void;
};

const TradesTable = ({ trades, onRowClick }: Props) => {
  if (!trades.length) return <p className={styles.empty}>No trades yet</p>;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Symbol</th>
          <th>Dir</th>
          <th>Entry</th>
          <th>Exit</th>
          <th>PnL</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((trade) => (
          <TradeRow key={trade.id} trade={trade} onClick={onRowClick} />
        ))}
      </tbody>
    </table>
  );
};

export default TradesTable;
