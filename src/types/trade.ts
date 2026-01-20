export type Trade = {
  id: string;
  date: string;
  symbol: string;
  direction: "BUY" | "SELL";
  entry: number;
  exit: number;
  pnl: number;
  result: "WIN" | "LOSS";
  notes?: string;
  images?: string[];
  accountId?: string;
};
