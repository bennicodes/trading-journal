import type { Trade } from "@/types/trade";
import { useState } from "react";
import styles from "./DashboardCalendar.module.css";

type Props = {
  trades: Trade[];
};

type DayTrade = {
  date: string;
  pnl: number;
  trades: Trade[];
  isCurrentMonth: boolean;
};

const DashboardCalendar = ({ trades }: Props) => {
  const [selectedDay, setSelectedDay] = useState<DayTrade | null>(null);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed

  const firstDay = new Date(year, month, 1).getDay(); // Sunday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Map trades to days
  const tradesByDay: Record<string, DayTrade> = {};
  trades.forEach((trade) => {
    const tradeDate = new Date(trade.date);
    const dayKey = tradeDate.toDateString();
    if (!tradesByDay[dayKey]) {
      tradesByDay[dayKey] = {
        date: trade.date,
        pnl: 0,
        trades: [],
        isCurrentMonth: tradeDate.getMonth() === month,
      };
    }
    tradesByDay[dayKey].pnl += trade.pnl;
    tradesByDay[dayKey].trades.push(trade);
  });

  // Build calendar grid
  const calendarDays: DayTrade[] = [];

  // Previous month filler
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(year, month - 1, day);
    const dayKey = date.toDateString();
    calendarDays.push({
      date: date.toISOString(),
      pnl: tradesByDay[dayKey]?.pnl ?? 0,
      trades: tradesByDay[dayKey]?.trades ?? [],
      isCurrentMonth: false,
    });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dayKey = date.toDateString();
    calendarDays.push({
      date: date.toISOString(),
      pnl: tradesByDay[dayKey]?.pnl ?? 0,
      trades: tradesByDay[dayKey]?.trades ?? [],
      isCurrentMonth: true,
    });
  }

  // Next month filler
  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  const nextMonthDays = totalCells - calendarDays.length;
  for (let d = 1; d <= nextMonthDays; d++) {
    const date = new Date(year, month + 1, d);
    const dayKey = date.toDateString();
    calendarDays.push({
      date: date.toISOString(),
      pnl: tradesByDay[dayKey]?.pnl ?? 0,
      trades: tradesByDay[dayKey]?.trades ?? [],
      isCurrentMonth: false,
    });
  }

  return (
    <div className={styles.calendarContainer}>
      <h3>
        {today.toLocaleString("default", { month: "long" })} {year}
      </h3>
      <div className={styles.weekHeaders}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className={styles.weekHeader}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {calendarDays.map((dayTrade, idx) => {
          const pnlDisplay =
            dayTrade.trades.length > 0
              ? `${dayTrade.pnl >= 0 ? "+" : "-"}${Math.abs(
                  dayTrade.pnl
                ).toFixed(2)}`
              : "";

          // Assign background class based on PnL and month
          let bgClass = styles.neutralDay;
          if (dayTrade.pnl > 0) bgClass = styles.positiveDay;
          else if (dayTrade.pnl < 0) bgClass = styles.negativeDay;

          if (!dayTrade.isCurrentMonth) bgClass += " " + styles.outsideMonth;

          return (
            <div
              key={idx}
              className={`${styles.day} ${bgClass}`}
              onClick={() => dayTrade.trades.length && setSelectedDay(dayTrade)}
            >
              <div className={styles.dayNumber}>
                {new Date(dayTrade.date).getDate()}
              </div>
              {dayTrade.trades.length > 0 && (
                <div className={styles.pnl}>{pnlDisplay}</div>
              )}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedDay(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>
              Trades on {new Date(selectedDay.date).toLocaleDateString()} — PnL:{" "}
              {selectedDay.pnl >= 0
                ? `+${selectedDay.pnl.toFixed(2)}`
                : selectedDay.pnl.toFixed(2)}
            </h4>
            <ul>
              {selectedDay.trades.map((t) => (
                <li key={t.id}>
                  {t.symbol} — {t.direction} — {t.entry} → {t.exit} — {t.result}{" "}
                  — PnL:{" "}
                  {t.pnl >= 0 ? `+${t.pnl.toFixed(2)}` : t.pnl.toFixed(2)}
                  {t.notes && ` — Notes: ${t.notes}`}
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedDay(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCalendar;
