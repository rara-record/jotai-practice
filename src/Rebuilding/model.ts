import { atom } from "./createJotai";

export const salaryAtom = atom(100_000);
export const totalSalaryAtom = atom((get) => get(salaryAtom) + get(salaryAtom));
