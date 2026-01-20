import { Route, Routes } from "react-router-dom";
import { Appshell } from "./layout/Appshell";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Trades from "./pages/Trades/Trades";

export const App = () => {
  return (
    <Appshell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Appshell>
  );
};

export default App;
