import type { Trade } from "@/types/trade";
import { useMemo } from "react";
import styles from "./Calendar.module.css";

export type DayTrade = {
  date: string;
  pnl: number;
  trades: Trade[];
  isCurrentMonth: boolean;
};

type CalendarMode = "dashboard" | "page";

type Props = {
  trades: Trade[];
  date: Date;
  mode: CalendarMode;
  onDayClick?: (day: DayTrade) => void;
};

const Calendar = ({ trades, date, mode, onDayClick }: Props) => {
  // Helper to get start of month
  const getMonthData = (currentDate: Date) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get first day to display (start of week for the first day)
    const startDay = new Date(firstDay);
    startDay.setDate(firstDay.getDate() - firstDay.getDay()); // Sunday = 0

    // Get last day to display (end of week for last day)
    const endDay = new Date(lastDay);
    endDay.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    const days: DayTrade[] = [];
    for (let d = new Date(startDay); d <= endDay; d.setDate(d.getDate() + 1)) {
      const dayStr = d.toISOString().split("T")[0];
      const dayTrades = trades.filter((t) => t.date === dayStr);
      const pnl = dayTrades.reduce((sum, t) => sum + t.pnl, 0);
      days.push({
        date: dayStr,
        pnl,
        trades: dayTrades,
        isCurrentMonth: d.getMonth() === month,
      });
    }

    return days;
  };

  const monthDays = useMemo(() => getMonthData(date), [trades, date]);

  return (
    <div className={styles.calendar}>
      {/* Weekday headers */}
      <div className={styles.weekdays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((wd) => (
          <div key={wd} className={styles.weekday}>
            {wd}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className={styles.daysGrid}>
        {monthDays.map((day) => {
          const hasPnL = day.trades.length > 0;
          const positive = day.pnl >= 0;

          let dayClass = styles.day;
          if (!day.isCurrentMonth) dayClass += ` ${styles.outsideMonth}`;
          if (hasPnL)
            dayClass += ` ${positive ? styles.positiveDay : styles.negativeDay}`;

          return (
            <div
              key={day.date}
              className={dayClass}
              onClick={() => mode === "page" && hasPnL && onDayClick?.(day)}
            >
              <span>{new Date(day.date).getDate()}</span>
              {hasPnL && (
                <span className={styles.pnl}>
                  {positive ? "+" : "-"}
                  {Math.abs(day.pnl).toFixed(2)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
