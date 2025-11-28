export default function CardDia({ dados }) {
  const vegetariano = dados.vegetariano !== undefined;

  return (
    <div
      className="card-dia"
      style={{
        borderLeft: vegetariano
          ? "8px solid #4caf50"    // verde
          : "8px solid #2196f3"    // azul
      }}
    >
      {dados.img && <img src={dados.img} className="card-img" />}

      <h3>{dados.dia}</h3>

      <p><strong>Prato Principal:</strong> {dados.prato_principal}</p>
      <p><strong>Vegetariano:</strong> {dados.vegetariano}</p>
      <p><strong>Salada:</strong> {dados.salada}</p>
      <p><strong>Sobremesa:</strong> {dados.sobremesa}</p>

      <div className="calorias">{dados.calorias} kcal</div>
    </div>
  );
}
