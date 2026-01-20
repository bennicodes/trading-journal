import type { Trade } from "@/types/trade";
import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import styles from "./Dashboard.module.css";
import DashboardCalendar from "./components/DashboardCalendar/DashboardCalendar";

const LOCAL_STORAGE_KEY = "trades";

const Dashboard = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentMonthPnL, setCurrentMonthPnL] = useState(0);

  // Load trades from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Trade[] = JSON.parse(stored);
        const validTrades = Array.isArray(parsed) ? parsed : [];
        setTrades(validTrades);

        const today = new Date();
        const monthPnL = validTrades
          .filter(
            (t) =>
              new Date(t.date).getMonth() === today.getMonth() &&
              new Date(t.date).getFullYear() === today.getFullYear()
          )
          .reduce((sum, t) => sum + t.pnl, 0);
        setCurrentMonthPnL(monthPnL);
      } catch (e) {
        console.error("Failed to parse trades from localStorage", e);
        setTrades([]);
        setCurrentMonthPnL(0);
      }
    }
  }, []);

  if (trades.length === 0) return <p className={styles.empty}>No trades yet</p>;

  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const wins = trades.filter((t) => t.result === "WIN").length;
  const winRate = ((wins / trades.length) * 100).toFixed(1);
  const latestTrade = trades[0];

  const equityData = trades
    .slice()
    .reverse()
    .reduce<{ date: string; equity: number }[]>((acc, trade, idx) => {
      const prevEquity = idx === 0 ? 0 : acc[idx - 1].equity;
      acc.push({ date: trade.date, equity: prevEquity + trade.pnl });
      return acc;
    }, []);

  return (
    <div className={styles.dashboard}>
      {/* Metrics */}
      <div className={styles.card}>
        <h3>Total PnL</h3>
        <p className={totalPnL >= 0 ? styles.positive : styles.negative}>
          {totalPnL.toFixed(2)}
        </p>
      </div>

      <div className={styles.card}>
        <h3>Current Month PnL</h3>
        <p className={currentMonthPnL >= 0 ? styles.positive : styles.negative}>
          {currentMonthPnL.toFixed(2)}
        </p>
      </div>

      <div className={styles.card}>
        <h3>Win Rate</h3>
        <p>{winRate}%</p>
      </div>

      <div className={styles.card}>
        <h3>Latest Trade</h3>
        <p>
          {latestTrade.symbol} — {latestTrade.result} —{" "}
          {latestTrade.pnl.toFixed(2)}
        </p>
      </div>

      {/* Equity Curve */}
      <div
        className={styles.card}
        style={{ width: "100%", height: 250, marginTop: "1rem" }}
      >
        <h3>Equity Curve</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={equityData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="equity"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Calendar */}
      <div style={{ marginTop: "2rem" }}>
        <DashboardCalendar trades={trades} />
      </div>
    </div>
  );
};

export default Dashboard;
