# n8n-nodes-tess-ai-by-pareto

Community node para integração da Tess AI com o n8n.

Este node permite interações diretas com os principais recursos da Tess AI:
- Agentes (execução, listagem, detalhes, resposta)
- Arquivos (upload, listagem, leitura, processamento e exclusão)
- Webhooks (criação, listagem e remoção)

---

## 📦 Instalação

Para instalar este pacote em uma instância self-hosted do n8n:

```bash
npm install n8n-nodes-tess-ai-by-pareto
```

> Certifique-se de estar no diretório `.n8n/custom` e que seu ambiente esteja configurado para aceitar nodes personalizados.

---

## 🔐 Autenticação

Este node usa **Bearer Token** da API Tess.

1. Vá até o menu de credenciais no n8n
2. Adicione uma nova credencial "Tess API"
3. Informe sua **API Key** obtida em [https://tess.pareto.io](https://tess.pareto.io)

---

## 🧩 Nodes Disponíveis

### 🔹 Tess Agents
- Executar Agente (`POST /agents/{id}/execute`)
- Listar Agentes (`GET /agents`)
- Detalhar Agente (`GET /agents/{id}`)
- Obter Resposta da Execução (`GET /agent-responses/{id}`)

### 🔹 Tess Files
- Upload de Arquivo (`POST /files`)
- Listar Arquivos (`GET /files`)
- Detalhar Arquivo (`GET /files/{fileId}`)
- Remover Arquivo (`DELETE /files/{fileId}`)
- Processar Arquivo (`POST /files/{fileId}/process`)

### 🔹 Tess Webhooks
- Criar Webhook (`POST /agents/{id}/webhooks`)
- Listar Webhooks (`GET /webhooks` ou `GET /agents/{id}/webhooks`)
- Remover Webhook (`DELETE /webhooks/{id}`)

---

## 📁 Estrutura do Projeto

```
n8n-nodes-tess-ai/
├── credentials/
│   └── tessApi.credentials.ts
├── nodes/
│   ├── Agents/
│   ├── Files/
│   └── Webhooks/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você deseja melhorar este node ou adicionar novas funcionalidades:

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Faça push para a branch
5. Abra um Pull Request

---

## 📄 Licença

MIT © Pareto