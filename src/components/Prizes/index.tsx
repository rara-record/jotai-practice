import { atom, useAtom } from "jotai";
import {
  Provider,
  Provider as ScopedProvider,
  useAtom as useScopedAtom,
} from "jotai-scope";
import React from "react";

type PrizesMethods = {
  order: number;
  name: string;
};

type Props = {
  prizeMethods: PrizesMethods[];
  children: React.ReactNode;
};

//모달 visibility 기본 atom
const overlayStepAtom = atom<{
  step1: boolean;
  step2: boolean;
}>({
  step1: false,
  step2: false,
});

const methodAtom = atom({});

const Prizes = ({ prizeMethods, children }: Props) => {
  return (
    <div>
      {prizeMethods.map((method) => {
        return (
          <ScopedProvider
            atoms={[overlayStepAtom, methodAtom]}
            key={method.order}
          >
            {children}
          </ScopedProvider>
        );
      })}
    </div>
  );
};

export const PrizesCard = () => {
  const [, setOpen] = useScopedAtom(overlayStepAtom);

  return (
    <div>
      <Card onClick={() => setOpen((prev) => ({ ...prev, step1: true }))} />
      <Modal />
    </div>
  );
};

export const Card = ({ onClick }: any) => {
  return (
    <div onClick={onClick} style={{ border: "1px solid #000" }}>
      asd
    </div>
  );
};

export const Modal = () => {
  const [open, setOpen] = useScopedAtom(overlayStepAtom);

  const handleConfirm = (event: React.FormEvent) => {
    event.preventDefault();
    setOpen((prev) => ({ ...prev, step1: false, step2: true }));
  };

  return (
    <div>
      <div style={{ display: open.step1 ? "block" : "none" }}>
        step1 모달이야
        <button type='button'>Close</button>
        <button type='submit' onClick={handleConfirm}>
          Confirm
        </button>
      </div>

      {/* <div style={{ display: open.step2 ? "block" : "none" }}>
        step2 모달이야
        <button type='button' onClick={() => toggleModal("closeStep2")}>
          Close
        </button>
      </div> */}
    </div>
  );
};

export default Prizes;
