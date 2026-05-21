import { useState, useEffect } from "react";
import { API_URL } from "../apiConfig"; // Chave de trilho (Sistemas Distribuídos vs Web)

export default function TabelaCRUD() {
  // Estados do CRUD
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  // Estados da Inteligência Artificial
  const [sugestaoIA, setSugestaoIA] = useState("");
  const [carregandoIA, setCarregandoIA] = useState(false);

  // ==========================================
  // 1. OPERAÇÕES DE CRUD (Disciplina de Web)
  // ==========================================
  const buscarProdutos = async () => {
    try {
      // CORRIGIDO: Utiliza diretamente a API_URL definida no apiConfig
      const response = await fetch(API_URL);
      const data = await response.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  const handleCadastrar = async (e) => {
    e.preventDefault();
    if (!nome || !preco) return alert("Preencha todos os campos!");

    const novoProduto = {
      nome: nome,
      preco: parseFloat(preco),
      disponivel: true
    };

    try {
      // CORRIGIDO: Utiliza diretamente a API_URL para o método POST
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto)
      });

      setNome("");
      setPreco("");
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao salvar o prato na nuvem.");
    }
  };

  const handleExcluir = async (id) => {
    try {
      // CORRIGIDO: Concatenando a barra de rota '/' antes do ID do produto
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const handleMudarStatus = async (produto) => {
    const produtoAtualizado = { ...produto, disponivel: !produto.disponivel };
    
    try {
      // CORRIGIDO: Concatenando a barra de rota '/' antes do ID do produto
      await fetch(`${API_URL}/${produto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoAtualizado)
      });
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao mudar status do produto:", error);
    }
  };

  // ==========================================
  // 2. INTEGRAÇÃO COM IA (API Gateway + Lambda AWS)
  // ==========================================
  const gerarSugestaoComIA = async () => {
    setCarregandoIA(true);
    setSugestaoIA("Consultando o Nutricionista IA na AWS...");
    
    try {
      const prompt = "Aja como um nutricionista de um restaurante universitário (bandejão). Sugira apenas os nomes e preços justos de 3 opções completas de pratos (incluindo uma vegana) para o almoço de hoje. Formate em texto simples.";
      
      const URL_API_GATEWAY = "https://um4of5exti.execute-api.us-east-1.amazonaws.com/deploy-03/cardapio";
      
      const resp = await fetch(URL_API_GATEWAY, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      if (!resp.ok) throw new Error('Falha ao chamar a infraestrutura Serverless');
      const data = await resp.json();
      
      setSugestaoIA(data.text); 
      
    } catch (error) {
      console.error("Erro na IA Distribuída:", error);
      setSugestaoIA("Ops! Falha ao conectar com o serviço de IA na nuvem AWS.");
    } finally {
      setCarregandoIA(false);
    }
  };

  // ==========================================
  // 3. INTERFACE (Padronizada em formato de Card)
  // ==========================================
  return (
    <div className="crud-card">
      <h2>Gerenciar Cardápio (CRUD & IA)</h2>

      {/* --- SESSÃO DA INTELIGÊNCIA ARTIFICIAL --- */}
      <div className="qrcode-area" style={{ marginTop: "0", marginBottom: "30px" }}>
        <h3>✨ Assistente de Cardápio com IA</h3>
        <p className="ia-description" style={{ margin: "10px 0 20px 0" }}>
          Sem ideias para o prato de hoje? Deixe a Inteligência Artificial sugerir!
        </p>
        
        <button 
          className="copy-btn"
          style={{ background: "#4285f4", marginTop: "0" }}
          onClick={gerarSugestaoComIA} 
          disabled={carregandoIA}
        >
          {carregandoIA ? "Consultando Nutricionista IA..." : "Gerar Sugestões de Pratos"}
        </button>
        
        {sugestaoIA && (
          <pre className="ia-resposta-box animated">
            {sugestaoIA}
          </pre>
        )}
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "25px 0" }} />

      {/* --- SESSÃO DE CADASTRO --- */}
      <form onSubmit={handleCadastrar} className="recarga-form" style={{ boxShadow: "none", padding: "0", maxWidth: "100%" }}>
        <div className="crud-inputs-group">
          <div className="crud-field">
            <label>Nome do prato:</label>
            <input 
              type="text"
              placeholder="Ex: Feijoada" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />
          </div>
          
          <div className="crud-field" style={{ flex: "0 0 150px" }}>
            <label>Preço (R$):</label>
            <input 
              type="number" 
              step="0.01"
              placeholder="0,00" 
              value={preco} 
              onChange={(e) => setPreco(e.target.value)} 
            />
          </div>
        </div>

        <button type="submit" className="btn-cadastrar">
          ➕ Cadastrar Novo Prato
        </button>
      </form>

      {/* --- SESSÃO DE LISTAGEM --- */}
      <table className="crud-table">
        <thead>
          <tr>
            <th>Prato</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "#888", padding: "20px" }}>
                Nenhum prato cadastrado no cardápio.
              </td>
            </tr>
          ) : (
            produtos.map((p) => (
              <tr key={p.id}>
                <td style={{ fontWeight: "600" }}>{p.nome}</td>
                <td>R$ {parseFloat(p.preco).toFixed(2)}</td>
                <td>
                  <button 
                    onClick={() => handleMudarStatus(p)}
                    style={{ background: "none", border: "1px solid #ddd", padding: "6px 10px", borderRadius: "20px", cursor: "pointer", fontSize: "14px" }}
                  >
                    {p.disponivel ? "🟢 Disponível" : "🔴 Esgotado"}
                  </button>
                </td>
                <td>
                  <button 
                    onClick={() => handleExcluir(p.id)}
                    style={{ background: "#dc3545", color: "white", border: "none", padding: "6px 12px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
                  >
                    🗑️ Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}