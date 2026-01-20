import type { Trade } from "@/types/trade";
import styles from "./TradeRow.module.css";

type Props = {
  trade: Trade;
  onClick: (trade: Trade) => void;
};

const TradeRow = ({ trade, onClick }: Props) => {
  return (
    <tr
      className={trade.pnl >= 0 ? styles.win : styles.loss}
      onClick={() => onClick(trade)}
      style={{ cursor: "pointer" }}
    >
      <td>{trade.date}</td>
      <td>{trade.symbol}</td>
      <td>{trade.direction}</td>
      <td>{trade.entry}</td>
      <td>{trade.exit}</td>
      <td>{trade.pnl.toFixed(2)}</td>
      <td>{trade.result}</td>
    </tr>
  );
};

export default TradeRow;
