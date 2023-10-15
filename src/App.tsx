import "./App.css";
import Prizes, { PrizesCard } from "./components/Prizes";

const prizeMethods = [
  { order: 12, name: "method1" },
  { order: 22, name: "method2" },
  { order: 32, name: "method3" },
];

const App = () => {
  return (
    <div>
      <Prizes prizeMethods={prizeMethods}>
        <PrizesCard />
      </Prizes>
    </div>
  );
};

export default App;
