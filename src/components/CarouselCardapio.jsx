import { useState } from "react";
import CardDia from "./CardDia";

export default function CarouselCardapio({ itens }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const anterior = () => {
    setDirection("left");
    setIndex((i) => (i === 0 ? Math.max(0, itens.length - 2) : i - 1));
  };

  const proximo = () => {
    setDirection("right");
    setIndex((i) => (i >= itens.length - 2 ? 0 : i + 1));
  };

  if (!itens || itens.length === 0) {
    return <p>Carregando cardápio...</p>;
  }

  const proximosCards = [itens[index], itens[(index + 1) % itens.length]];

  return (
    <div className="carousel-container">
      <button className="carousel-btn carousel-btn-prev" onClick={anterior}>◀</button>
      
      <div className="carousel-cards-wrapper">
        {proximosCards.map((card, i) => (
          <div 
            key={`${index}-${i}`}
            className={`carousel-item ${direction}`}
          >
            <CardDia dados={card} />
          </div>
        ))}
      </div>
      
      <button className="carousel-btn carousel-btn-next" onClick={proximo}>▶</button>
    </div>
  );
}
