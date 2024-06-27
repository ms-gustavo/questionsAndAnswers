<h1>Q&A Project - Plataforma de Perguntas e Respostas</h1>
  
  <p>Uma plataforma de perguntas e respostas ao estilo Yahoo Respostas, desenvolvida com TypeScript, MySQL e Zod.</p>
  
  <h2>Instalação</h2>
  <p>Para iniciar o projeto localmente, siga os passos abaixo:</p>
  <code>npm install</code>

   <h2>Configuração do Banco de Dados</h2>
  <p>Para conectar-se ao banco de dados MySQL, crie um arquivo <code>.env</code> na raiz do projeto com as seguintes variáveis preenchidas com suas credenciais:</p>
  <pre><code>
  DB_NAME='seu_nome_do_banco'
  DB_USER='seu_usuario_do_banco'
  DB_PASSWORD='sua_senha_do_banco'
  DB_HOST='localhost'
  DB_DIALECT='mysql'
  PORT=3000
  </code></pre>
  
  <h2>Executando o Projeto</h2>
  <p>Execute o seguinte comando para iniciar o servidor:</p>
  <code>npm start</code>

  <p>Execute o seguinte comando para rodar os testes:</p>
  <code>npm test</code>
  <h2>Tecnologias Utilizadas</h2>
  <p>O projeto utiliza as seguintes tecnologias:</p>
  <ul>
    <li><strong>TypeScript</strong>: Um superconjunto de JavaScript que adiciona tipagem estática opcional.</li>
    <li><strong>MySQL</strong>: Um sistema de gerenciamento de banco de dados relacional.</li>
    <li><strong>Jest</strong>: Um framework de testes em JavaScript que facilita a criação e execução de testes unitários e de integração.</li>
    <li><strong>Sequelize</strong>: Um ORM (Object-Relational Mapping) para Node.js, utilizado para facilitar a interação com bancos de dados relacionais.</li>
    <li><strong>EJS</strong>: Um mecanismo de templates simples e eficiente para renderização de HTML no servidor.</li>
    <li><strong>Zod</strong>: Uma biblioteca de validação de esquemas em TypeScript para validação de dados.</li>
    <li><strong>Express.js</strong>: Um framework web para Node.js utilizado para construir APIs.</li>
  </ul>
