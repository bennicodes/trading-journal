import Button from "@/components/Button/Button";
import type { Trade } from "@/types/trade";
import { useState, type FormEvent } from "react";
import styles from "./TradeForm.module.css";

type Props = {
  onAddTrade: (trade: Trade) => void;
};

const TradeForm = ({ onAddTrade }: Props) => {
  const [symbol, setSymbol] = useState("");
  const [direction, setDirection] = useState<"BUY" | "SELL">("BUY");
  const [entry, setEntry] = useState<number | "">("");
  const [exit, setExit] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!symbol || entry === "" || exit === "") return;

    const pnl = Number(exit) - Number(entry);
    const result = pnl >= 0 ? "WIN" : "LOSS";

    const newTrade: Trade = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      symbol,
      direction,
      entry: Number(entry),
      exit: Number(exit),
      pnl,
      result,
      notes,
    };

    onAddTrade(newTrade);

    // Reset form
    setSymbol("");
    setDirection("BUY");
    setEntry("");
    setExit("");
    setNotes("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <input
          type="text"
          placeholder="Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          required
        />
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value as "BUY" | "SELL")}
        >
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
      </div>
      <div className={styles.row}>
        <input
          type="number"
          placeholder="Entry"
          value={entry}
          onChange={(e) => setEntry(Number(e.target.value))}
          required
        />
        <input
          type="number"
          placeholder="Exit"
          value={exit}
          onChange={(e) => setExit(Number(e.target.value))}
          required
        />
      </div>
      <div className={styles.row}>
        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <Button type="submit" variant="primary">
        Add Trade
      </Button>
    </form>
  );
};

export default TradeForm;
