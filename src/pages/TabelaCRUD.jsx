import { useState } from "react";

export default function TabelaCRUD() {
  const [registros, setRegistros] = useState([]);

  const adicionar = () => {
    const novo = {
      id: crypto.randomUUID(),
      dia: "Novo dia",
      prato: "Descrição do prato"
    };
    setRegistros([...registros, novo]);
  };

  const remover = (id) => {
    setRegistros(registros.filter((r) => r.id !== id));
  };

  return (
    <div>
      <h2>Administração do Cardápio</h2>
      <button onClick={adicionar}>Adicionar</button>

      <table>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Prato</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {registros.map((r) => (
            <tr key={r.id}>
              <td>{r.dia}</td>
              <td>{r.prato}</td>
              <td>
                <button onClick={() => remover(r.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
