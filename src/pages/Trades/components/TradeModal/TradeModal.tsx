import Modal from "@/components/Modal/Modal";
import type { Trade } from "@/types/trade";

type Props = {
  trade: Trade;
  onClose: () => void;
};

const TradeModal = ({ trade, onClose }: Props) => {
  return (
    <Modal title={`${trade.symbol} — ${trade.result}`} onClose={onClose}>
      <p>Date: {trade.date}</p>
      <p>Direction: {trade.direction}</p>
      <p>Entry: {trade.entry}</p>
      <p>Exit: {trade.exit}</p>
      <p>PnL: {trade.pnl.toFixed(2)}</p>
      {trade.notes && <p>Notes: {trade.notes}</p>}
      {trade.images && trade.images.length > 0 && (
        <div
          style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap" }}
        >
          {trade.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Trade ${i}`}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          ))}
        </div>
      )}
    </Modal>
  );
};

export default TradeModal;
