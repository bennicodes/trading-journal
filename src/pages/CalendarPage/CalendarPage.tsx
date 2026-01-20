import CalendarComponent from "@/components/Calendar/Calendar";
import CalendarDayModal from "@/components/Calendar/CalendarModal";
import type { DayTrade } from "@/components/Calendar/types";
import type { Trade } from "@/types/trade";
import { useEffect, useRef, useState } from "react";
import styles from "./CalendarPage.module.css";

const LOCAL_STORAGE_KEY = "trades";

const CalendarPage = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<DayTrade | null>(null);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  // Load trades from localStorage
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

  const handlePrevMonth = () =>
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );

  const handleNextMonth = () =>
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );

  const handleMonthSelect = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearDropdown(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        monthRef.current &&
        !monthRef.current.contains(event.target as Node)
      ) {
        setShowMonthDropdown(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderMonthDropdown = () => (
    <div
      className={styles.dropdown}
      ref={(el) => {
        if (el) {
          const selected = el.querySelector(".selected") as HTMLElement;
          if (selected) selected.scrollIntoView({ block: "nearest" });
        }
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const isSelected = i === currentDate.getMonth();
        return (
          <div
            key={i}
            className={`${styles.dropdownItem} ${isSelected ? styles.selected : ""}`}
            onClick={() => handleMonthSelect(i)}
          >
            {new Date(0, i).toLocaleString("default", { month: "short" })}
          </div>
        );
      })}
    </div>
  );

  const renderYearDropdown = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2000 + 1 }).map(
      (_, i) => currentYear - i,
    ); // descending
    return (
      <div
        className={styles.dropdown}
        ref={(el) => {
          if (el) {
            const selected = el.querySelector(".selected") as HTMLElement;
            if (selected) selected.scrollIntoView({ block: "nearest" });
          }
        }}
      >
        {years.map((year) => {
          const isSelected = year === currentDate.getFullYear();
          return (
            <div
              key={year}
              className={`${styles.dropdownItem} ${isSelected ? styles.selected : ""}`}
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section>
      <header className={styles.header}>
        <button onClick={handlePrevMonth}>← Prev</button>

        <div className={styles.dateSelectors}>
          {/* Month */}
          <div ref={monthRef} className={styles.dropdownWrapper}>
            <span
              className={styles.selectorText}
              onClick={() => setShowMonthDropdown((prev) => !prev)}
            >
              {currentDate.toLocaleString("default", { month: "long" })}
            </span>
            {showMonthDropdown && renderMonthDropdown()}
          </div>

          {/* Year */}
          <div ref={yearRef} className={styles.dropdownWrapper}>
            <span
              className={styles.selectorText}
              onClick={() => setShowYearDropdown((prev) => !prev)}
            >
              {currentDate.getFullYear()}
            </span>
            {showYearDropdown && renderYearDropdown()}
          </div>
        </div>

        <button onClick={handleNextMonth}>Next →</button>
      </header>

      <CalendarComponent
        trades={trades}
        date={currentDate}
        mode="page"
        onDayClick={setSelectedDay}
      />

      {selectedDay && (
        <CalendarDayModal
          day={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </section>
  );
};

export default CalendarPage;
