import { useState, useEffect } from "react";
import { API_URL } from "../apiConfig"; // Chave de trilho (Sistemas Distribuídos vs Web)
import { GoogleGenerativeAI } from "@google/generative-ai"; // Importação da IA

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
    const response = await fetch(`${API_URL}/produtos`);
    const data = await response.json();
    setProdutos(data);
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

    await fetch(`${API_URL}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoProduto)
    });

    setNome("");
    setPreco("");
    buscarProdutos();
  };

  const handleExcluir = async (id) => {
    await fetch(`${API_URL}/produtos/${id}`, { method: "DELETE" });
    buscarProdutos();
  };

  const handleMudarStatus = async (produto) => {
    const produtoAtualizado = { ...produto, disponivel: !produto.disponivel };
    await fetch(`${API_URL}/produtos/${produto.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produtoAtualizado)
    });
    buscarProdutos();
  };

  // ==========================================
  // 2. INTEGRAÇÃO COM IA (API Google Gemini)
  // ==========================================
  const gerarSugestaoComIA = async () => {
    setCarregandoIA(true);
    setSugestaoIA("Pensando em opções deliciosas...");
    
    try {
      // ATENÇÃO: Cole sua chave do Google AI Studio aqui dentro das aspas!
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = "Aja como um nutricionista de um restaurante universitário (bandejão). Sugira apenas os nomes e preços justos de 3 opções completas de pratos (incluindo uma vegana) para o almoço de hoje. Formate em texto simples.";

      const result = await model.generateContent(prompt);
      setSugestaoIA(result.response.text());
    } catch (error) {
      console.error("Erro na IA:", error);
      setSugestaoIA("Ops! Falha ao conectar com a IA. Verifique sua chave API.");
    } finally {
      setCarregandoIA(false);
    }
  };

  // ==========================================
  // 3. INTERFACE (O que aparece na tela)
  // ==========================================
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2>Gerenciar Cardápio (CRUD & IA)</h2>

      {/* --- SESSÃO DA INTELIGÊNCIA ARTIFICIAL --- */}
      <div style={{ background: "#e8f0fe", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>✨ Assistente de Cardápio com IA</h3>
        <p>Sem ideias para o prato de hoje? Deixe a Inteligência Artificial sugerir!</p>
        <button 
          onClick={gerarSugestaoComIA} 
          disabled={carregandoIA}
          style={{ background: "#4285f4", color: "white", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          {carregandoIA ? "Consultando Nutricionista IA..." : "Gerar Sugestões de Pratos"}
        </button>
        
        {sugestaoIA && (
          <pre style={{ background: "white", padding: "15px", marginTop: "15px", whiteSpace: "pre-wrap", fontFamily: "sans-serif", borderRadius: "5px", border: "1px solid #ccc" }}>
            {sugestaoIA}
          </pre>
        )}
      </div>

      {/* --- SESSÃO DE CADASTRO (CREATE) --- */}
      <form onSubmit={handleCadastrar} style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input 
          placeholder="Nome do prato (ex: Feijoada)" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          style={{ flex: 1, padding: "8px" }}
        />
        <input 
          type="number" 
          placeholder="Preço (R$)" 
          value={preco} 
          onChange={(e) => setPreco(e.target.value)} 
          style={{ width: "120px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 15px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Cadastrar
        </button>
      </form>

      {/* --- SESSÃO DE LISTAGEM (READ, UPDATE, DELETE) --- */}
      <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f4f4f4" }}>
          <tr>
            <th>Prato</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: "center" }}>Nenhum prato cadastrado.</td></tr>
          ) : (
            produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>R$ {parseFloat(p.preco).toFixed(2)}</td>
                <td>
                  <button 
                    onClick={() => handleMudarStatus(p)}
                    style={{ background: "none", border: "1px solid #ccc", padding: "5px", borderRadius: "3px", cursor: "pointer" }}
                  >
                    {p.disponivel ? "🟢 Disponível" : "🔴 Esgotado"}
                  </button>
                </td>
                <td>
                  <button 
                    onClick={() => handleExcluir(p.id)}
                    style={{ background: "#dc3545", color: "white", border: "none", padding: "5px 10px", borderRadius: "3px", cursor: "pointer" }}
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