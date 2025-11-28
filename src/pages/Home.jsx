import { useState, useEffect } from "react";
import CarouselCardapio from "../components/CarouselCardapio";
import GraficoCalorias from "../components/GraficoCalorias";


export default function Home() {
  const [cardapio, setCardapio] = useState({ almoco: [], jantar: [] });
  const totalAlmoco = cardapio.almoco.reduce((sum, item) => sum + item.calorias, 0);
  const totalJantar = cardapio.jantar.reduce((sum, item) => sum + item.calorias, 0);


  useEffect(() => {
    fetch("/data/cardapio.json")
      .then((res) => res.json())
      .then((data) => setCardapio(data));
  }, []);

  return (
    <div>
      <h2>Cardápio da Semana</h2>

      <div className="section-refeicao">
        <h3>Almoço</h3>
        <p className="horario-texto">11h00 às 13h45</p>
        <CarouselCardapio itens={cardapio.almoco} />
      </div>

      <div className="section-refeicao">
        <h3>Jantar</h3>
        <p className="horario-texto">18h00 às 20h45</p>
        <CarouselCardapio itens={cardapio.jantar} />
      </div>
      
      <div className="dashboard">
        <h3>Resumo semanal</h3>
        <p>Calorias totais almoço: <strong>{totalAlmoco}</strong> kcal</p>
        <p>Calorias totais jantar: <strong>{totalJantar}</strong> kcal</p>
      </div>
      <GraficoCalorias
        almoco={cardapio.almoco}
        jantar={cardapio.jantar}
      />

    </div>
    
  );
}
