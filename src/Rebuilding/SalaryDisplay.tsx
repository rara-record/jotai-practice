import { useAtom, useAtomValue } from "./createJotai";
import { salaryAtom, totalSalaryAtom } from "./model";

const SalaryDisplay = () => {
  const [salary] = useAtom(salaryAtom);
  const totalSalary = useAtomValue(totalSalaryAtom);

  return (
    <div>
      <div>SalaryDisplay: {salary}</div>
      <div>{totalSalary}</div>
    </div>
  );
};

export default SalaryDisplay;
