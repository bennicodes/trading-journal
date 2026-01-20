import { TopNav } from "./TopNav/TopNav";

type Props = {
  children: React.ReactNode;
};

export const Appshell = ({ children }: Props) => {
  return (
    <div className="app">
      <TopNav />
      {children}
    </div>
  );
};
