import { Route, Routes } from "react-router-dom";
import { Appshell } from "./layout/Appshell";
import Dashboard from "./pages/Dashboard/Dashboard";
import Trades from "./pages/Trades/Trades";

export const App = () => {
  return (
    <Appshell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/trades" element={<Trades />} />
        <Route path="/calendar" element={<div>Calendar</div>} />
      </Routes>
    </Appshell>
  );
};

export default App;
