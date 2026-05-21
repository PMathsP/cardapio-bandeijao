export default function Sobre() {
  return (
    <div className="sobre-page">
      <h2>Sobre o Projeto</h2>
      <p>
        Este projeto é uma entrega acadêmica integradora para duas disciplinas distintas do IFSP.
        Ele foi desenvolvido para agregar valor técnico em desenvolvimento web moderno e em
        conceitos práticos de sistemas distribuídos, demonstrando como uma única SPA interage
        com persistência de dados local e serviços Serverless na nuvem.
      </p>

      <div className="sobre-blocks">
        <div className="discipline-block">
          <h3>Programação Dinâmica para Web</h3>
          <p>
            Foco no desenvolvimento do ecossistema Frontend utilizando React + Vite, gerenciamento 
            de estados, renderização baseada em componentes e comunicação assíncrona.
          </p>
          <ul>
            <li><strong>Interface SPA:</strong> Estrutura de navegação fluida baseada em componentes reutilizáveis.</li>
            <li><strong>Manipulação de Dados (CRUD):</strong> Gerenciamento completo de pratos (Criar, Ler, Atualizar, Deletar) em `src/pages/TabelaCRUD.jsx`.</li>
            <li><strong>Persistência Local simulada:</strong> Consumo de API REST local via `json-server` (arquivo `db.json` na porta 3000) para persistir o cardápio.</li>
            <li><strong>Consumo de APIs:</strong> Tratamento de promessas com `fetch` assíncrono e atualização dinâmica do DOM via Hooks do React (`useState`, `useEffect`).</li>
          </ul>
        </div>

        <div className="discipline-block">
          <h3>Sistemas Distribuídos</h3>
          <p>
            Demonstração prática de uma arquitetura descentralizada orientada a microsserviços e 
            computação em nuvem no modelo <strong>Serverless</strong>.
          </p>
          <ul>
            <li><strong>Desacoplamento e Gateways:</strong> Roteamento de requisições do frontend para a nuvem AWS através do <strong>Amazon API Gateway</strong>, com gerenciamento e publicação de estágios de implantação (`deploy-03`).</li>
            <li><strong>Computação Serverless (FaaS):</strong> Processamento lógico assíncrono utilizando funções <strong>AWS Lambda</strong> rodando em ambiente Node.js 22 isolado.</li>
            <li><strong>Integração com Provedores de IA:</strong> Função Lambda atuando como proxy seguro, utilizando `fetch` nativo para se conectar à API do Google Gemini (modelo `gemini-2.5-flash`), mantendo chaves de API ocultas via Variáveis de Ambiente da AWS.</li>
            <li><strong>Resolução de Desafios Distribuídos:</strong> Configuração fina de políticas de <strong>CORS</strong> (Cross-Origin Resource Sharing) e ajustes de <strong>Timeout de execução</strong> para tolerância a falhas e chamadas de longa duração de IA.</li>
            <li><strong>Integração de Serviços Remotos:</strong> Rota `/pagamento` integrada a endpoints na nuvem para simular transações e geração de dados dinâmicos.</li>
          </ul>
        </div>
      </div>

      <div className="about-summary">
        <h3>Arquitetura de Fluxo do Sistema</h3>
        <ul>
          <li><strong>Camada de Apresentação (React):</strong> Renderiza a interface do usuário localmente (`localhost:5173`) e dispara eventos de rede assíncronos.</li>
          <li><strong>Persistência Local (`json-server`):</strong> Resolve as operações básicas de listagem e modificação do estoque de pratos.</li>
          <li><strong>Camada Distribuída (AWS API Gateway + Lambda):</strong> Intercepta requisições de IA e pagamentos, aplica políticas de segurança de origem e computa as regras de negócio de forma escalável na nuvem da AWS.</li>
          <li><strong>Provedor de Inteligência Artificial (Google Gemini API):</strong> Processa os prompts enviados pelo usuário e gera inteligência contextualizada para o cardápio do bandejão.</li>
        </ul>
      </div>
    </div>
  );
}