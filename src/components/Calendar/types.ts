export type DayTrade = {
  date: string;
  pnl: number;
  trades: Trade[];
  isCurrentMonth: boolean;
};
