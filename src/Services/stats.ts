import { Trade } from "@/types/trade";

export const calculateWinRate = (trades: Trade[]) => {
  if (!trades.length) return 0;
  const wins = trades.filter((t) => t.pnl > 0).length;
  return (wins / trades.length) * 100;
};
