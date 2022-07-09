import update from "immutability-helper";
import type { CSSProperties, FC } from "react";
import { useCallback, useState } from "react";

import { Card } from "./Card";

const style: CSSProperties = {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
};

export interface Item {
  id: number;
  text: string;
  width: string;
  height: string;
}

export interface ContainerState {
  cards: Item[];
}

export const Container: FC = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Mini Chart",
      width: "33%",
      height: "10rem",
    },
    {
      id: 2,
      text: "Mini Chart",
      width: "33%",
      height: "10rem",
    },
    {
      id: 3,
      text: "Mini Chart",
      width: "33%",
      height: "10rem",
    },
    {
      id: 4,
      text: "Full Width Table",
      width: "100%",
      height: "20rem",
    },
    // {
    //   id: 5,
    //   text: "1/3 Page Three",
    //   width: "33%",
    // },
    // {
    //   id: 6,
    //   text: "1 Page",
    //   width: "100%",
    // },
    // {
    //   id: 7,
    //   text: "1/2 Page Three",
    //   width: "50%",
    // },
  ]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      })
    );
  }, []);

  const renderCard = useCallback(
    (
      card: { id: number; text: string; width: string; height: string },
      index: number
    ) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          width={card.width}
          height={card.height}
          moveCard={moveCard}
        />
      );
    },
    [moveCard]
  );

  return (
    <>
      <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
    </>
  );
};
