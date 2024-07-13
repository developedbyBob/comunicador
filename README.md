
# Comunicador WebApp

## Descrição

Este projeto foi desenvolvido para resolver um problema de comunicação em tempo real durante um evento onde era necessário se comunicar com várias pessoas ao mesmo tempo. Como não tínhamos recursos financeiros para adquirir rádios e o WhatsApp apresentava um grande atraso, surgiu a ideia de criar este webapp para facilitar a comunicação.

## Funcionalidades

- Comunicação em tempo real via áudio.
- Criação e participação em salas de chat.
- Suporte a múltiplos usuários na mesma sala.
- Interface responsiva e amigável para dispositivos móveis e desktop.

## Tecnologias Utilizadas

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
- **Backend**:
  - Node.js
  - Express
  - Socket.io
- **Outras**:
  - WebRTC para transmissão de áudio

## Estrutura do Projeto

```
comunicador/
│
├── controllers/
│   └── chatController.js
├── models/
│   └── chatModel.js
├── public/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── routes/
│   └── chatRoutes.js
├── views/
│   └── index.html
├── server.js
├── package.json
└── README.md
```

## Instalação e Execução

### Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- NPM instalado (versão 6 ou superior)

### Passos para Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/developedbyBob/comunicador.git
   cd comunicador
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Inicie o servidor:
   ```sh
   node server.js
   ```

4. Abra o navegador e acesse `http://localhost:3001` para usar o aplicativo.

## Como Usar

1. Abra o navegador e acesse `http://localhost:3001`.
2. Insira o nome da sala de chat que deseja criar ou entrar.
3. Clique em "Start Chat" para iniciar a comunicação.
4. Use os botões "Mute" e "Stop Chat" para controlar o áudio.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias e correções.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Autor

- **Devoloped By Bob** - [GitHub](https://github.com/developedbyBob)