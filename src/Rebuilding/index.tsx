import { useAtom } from "./createJotai";
import { salaryAtom } from "./model";
import SalaryDisplay from "./SalaryDisplay";

const Rebuilding = () => {
  const [salary, setSalary] = useAtom(salaryAtom);

  return (
    <div>
      <input value={salary} onChange={(e) => setSalary(+e.target.value)} />
      <SalaryDisplay />
    </div>
  );
};

export default Rebuilding;
