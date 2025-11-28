import { useState } from "react";
import qrcodeImg from "/qrcode-pix.png";

export default function Recarga() {
  const [cartao, setCartao] = useState("");
  const [valor, setValor] = useState("");
  const [exibirQr, setExibirQr] = useState(false);

  function gerarQrCode() {
    if (cartao.length < 5 || valor <= 0) {
      alert("Preencha o número do cartão e valor!");
      return;
    }
    setExibirQr(true);
  }

  function copiarCodigo() {
    navigator.clipboard.writeText(`pix-ifsp-cartao-${cartao}-valor-${valor}`);
    alert("Código copiado!");
  }

  return (
    <div className="recarga-form">
      <h2>Recarga do Cartão RU</h2>

      <label>Número do cartão:</label>
      <input type="text" value={cartao} onChange={(e) => setCartao(e.target.value)} />

      <label>Valor da recarga (R$):</label>
      <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} />

      <button onClick={gerarQrCode}>Gerar QR Code</button>

      {exibirQr && (
        <div className="qrcode-area">
          <h3>Pagamento via PIX</h3>
          <img src={qrcodeImg} alt="QR Code PIX" />

          <button className="copy-btn" onClick={copiarCodigo}>
            Copiar código PIX
          </button>
        </div>
      )}
    </div>
  );
}
