import { atom, useAtom, useAtomValue } from "jotai";
import React, { createContext, useContext, useEffect } from "react";

type PrizesMethods = {
  order: number;
  name: string;
};

type Props = {
  prizeMethods: PrizesMethods[];
  children: React.ReactNode;
};

// 1. 모달 visibility 기본 atom
const modalVisibilityAtom = atom<{ [key: number]: boolean }>({});

// 2. 현재 열린 모달의 order를 결정하는 파생 상태
const openedModalOrderAtom = atom((get) => {
  const visibility = get(modalVisibilityAtom);
  return Object.keys(visibility).find((key) => visibility[Number(key)]);
});

// 3. 모달을 열거나 닫는 action atom
const toggleModalAtom = atom(null, (get, set, order: number) => {
  const visibility = get(modalVisibilityAtom);
  set(modalVisibilityAtom, {
    ...visibility,
    [order]: !visibility[order],
  });
});

const overlayVisibleAtom = atom<boolean>(false);

const methodsAtom = atom<PrizesMethods[]>([]);

const Exchanges = ({ prizeMethods, children }: Props) => {
  const [, setMethods] = useAtom(methodsAtom);

  useEffect(() => {
    setMethods(prizeMethods);
  }, [prizeMethods, setMethods]);

  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export const ExchangeCard = () => {
  const [methods] = useAtom(methodsAtom);
  const [, toggleModal] = useAtom(toggleModalAtom);
  return (
    <div>
      {methods.map((method) => (
        <Card method={method} onClick={() => toggleModal(method.order)} />
      ))}
    </div>
  );
};

export const Card = ({ method, onClick }: any) => {
  return (
    <div onClick={onClick} style={{ border: "1px solid #000" }}>
      name: {method.name}
    </div>
  );
};

export const ModalContainer = () => {
  return (
    <div>
      <Modal />
      <Overlay />
    </div>
  );
};

const Modal = () => {
  const openedModalOrder = useAtom(openedModalOrderAtom);
  const [, setOverlayVisible] = useAtom(overlayVisibleAtom);

  const handleConfirmClick = () => {
    setOverlayVisible(true);
  };

  return (
    <div style={{ display: openedModalOrder ? "block" : "none" }}>
      모달이야
      <button onClick={handleConfirmClick}>Confirm</button>
    </div>
  );
};

const Overlay = () => {
  const [overlayVisible, setOverlayVisible] = useAtom(overlayVisibleAtom);

  const handleConfirmClick = () => {
    setOverlayVisible(false);
  };

  return (
    <div style={{ display: overlayVisible ? "block" : "none" }}>
      오버레이야
      <button onClick={handleConfirmClick}>Confirm</button>
    </div>
  );
};
export default Exchanges;
