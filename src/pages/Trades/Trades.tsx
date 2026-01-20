import type { Trade } from "@/types/trade";
import { useEffect, useState } from "react";
import TradeForm from "./components/TradeForm/TradeForm";
import TradeModal from "./components/TradeModal/TradeModal";
import TradesTable from "./components/TradesTable/TradesTable";
import styles from "./Trades.module.css";

const LOCAL_STORAGE_KEY = "trades";

const Trades = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Trade[] = JSON.parse(stored);
        setTrades(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Failed to parse trades from localStorage", e);
        setTrades([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trades));
  }, [trades]);

  const handleAddTrade = (trade: Trade) => {
    setTrades((prev) => [trade, ...prev]);
  };

  const handleRowClick = (trade: Trade) => setSelectedTrade(trade);
  const closeModal = () => setSelectedTrade(null);

  return (
    <section className={styles.container}>
      <h1>Trades</h1>

      {/* Manual trade form */}
      <TradeForm onAddTrade={handleAddTrade} />

      {/* Trades table */}
      <TradesTable trades={trades} onRowClick={handleRowClick} />

      {/* Modal for selected trade */}
      {selectedTrade && (
        <TradeModal trade={selectedTrade} onClose={closeModal} />
      )}
    </section>
  );
};

export default Trades;
