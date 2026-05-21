import { useState } from "react";
// import qrcodeImg from "/qrcode-pix.png"; // <-- COMENTE ESSA LINHA (Não usaremos mais a imagem local)

export default function Recarga() {
  const [cartao, setCartao] = useState("");
  const [valor, setValor] = useState("");
  const [exibirQr, setExibirQr] = useState(false);
  
  // --- ADICIONE ESTE NOVO ESTADO ---
  const [qrCodeUrl, setQrCodeUrl] = useState(""); 

  async function gerarQrCode() {
    if (cartao.length < 5 || valor <= 0) {
      alert("Preencha o número do cartão e valor!");
      return;
    }

    // --- NOVA LÓGICA COM AWS LAMBDA ---
    try {
      // Substitua pela sua URL do API Gateway (sem o /pagamento no final)
      const API_URL = "https://um4of5exti.execute-api.us-east-1.amazonaws.com/deploy-03/pagamento";
      
      const response = await fetch(`${API_URL}`);
      const data = await response.json();

      setQrCodeUrl(data.qrcode_url); // Link que vem da Lambda
      setExibirQr(true);
    } catch (error) {
      console.error("Erro ao conectar com a AWS:", error);
      alert("Erro ao gerar QR Code na nuvem.");
    }
  }

  function copiarCodigo() {
    navigator.clipboard.writeText(`pix-ifsp-cartao-${cartao}-valor-${valor}`);
    alert("Código copiado!");
  }

  return (
    <div className="recarga-form">
      <h2>Recarga do Cartão RU (Processado via AWS)</h2>

      <label>Número do cartão:</label>
      <input type="text" value={cartao} onChange={(e) => setCartao(e.target.value)} />

      <label>Valor da recarga (R$):</label>
      <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} />

      <button onClick={gerarQrCode}>Gerar QR Code via Lambda</button>

      {exibirQr && (
        <div className="qrcode-area">
          <h3>Pagamento via PIX</h3>
          
          {/* --- ALTERE O SRC DA IMAGEM AQUI --- */}
          <img src={qrCodeUrl} alt="QR Code PIX Dinâmico" style={{ width: '200px' }} />

          <button className="copy-btn" onClick={copiarCodigo}>
            Copiar código PIX
          </button>
        </div>
      )}
    </div>
  );
}
