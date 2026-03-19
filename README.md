# 🍽️ Cardápio Digital com QR Code

Um sistema completo de cardápio digital para restaurantes, lanchonetes e bares. Permite que os clientes façam pedidos diretamente pelo celular escaneando um QR Code na mesa, enquanto o estabelecimento gerencia tudo em tempo real através de um painel administrativo.

## ✨ Funcionalidades

### 🧑‍💼 Para o Estabelecimento (Painel Admin)
- **Gestão de Cardápio:** Criação, edição e exclusão de categorias e produtos.
- **Upload de Imagens:** Fotos dos produtos salvas no Firebase Storage.
- **Pedidos em Tempo Real:** Painel estilo Kanban (Novos, Em Preparo, Entregues).
- **Notificações:** Alerta sonoro e visual para novos pedidos.
- **Impressão de Comandas:** Layout otimizado para impressoras térmicas (58mm e 80mm).
- **Geração de QR Code:** Criação e download de QR Codes individuais por mesa.
- **Dashboard:** Estatísticas de vendas e pedidos do dia.
- **Multi-tenant:** Cada restaurante tem sua própria conta e dados isolados.
- **Modo Escuro:** Interface adaptável para ambientes com pouca luz.

### 📱 Para o Cliente (Cardápio)
- **Sem Aplicativo:** Acesso direto pelo navegador do celular.
- **Carrinho de Compras:** Adição de itens, controle de quantidade e observações.
- **Identificação de Mesa:** Pedido vinculado diretamente à mesa do cliente.
- **Interface Moderna:** Design responsivo e intuitivo, inspirado nos principais apps de delivery.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Variáveis, Flexbox, Grid), JavaScript Vanilla (ES6+)
- **Backend/BaaS:** Firebase (Firestore, Authentication, Storage)
- **Hospedagem:** Vercel (Configurado via `vercel.json`)
- **Bibliotecas Externas:** QRCode.js (Geração de QR Codes)

## 🚀 Como Instalar e Fazer Deploy

Consulte o arquivo [docs/DEPLOY.md](docs/DEPLOY.md) para instruções detalhadas passo a passo de como configurar o Firebase e fazer o deploy na Vercel.

## 📁 Estrutura do Projeto

```
cardapio-digital/
├── admin/                  # Painel Administrativo
│   ├── index.html          # Dashboard
│   ├── login.html          # Autenticação
│   ├── categorias.html     # Gestão de categorias
│   ├── produtos.html       # Gestão de produtos
│   ├── pedidos.html        # Gestão de pedidos em tempo real
│   ├── configuracoes.html  # Dados do restaurante
│   └── qrcode.html         # Geração de QR Codes
├── cliente/                # Visão do Cliente
│   └── cardapio.html       # Cardápio digital e carrinho
├── assets/                 # Recursos estáticos
│   ├── css/                # Estilos (global, admin, cardapio, print)
│   └── js/                 # Scripts (firebase-config, admin-utils)
├── docs/                   # Documentação
│   └── DEPLOY.md           # Guia de deploy
├── index.html              # Landing page / Redirecionamento
├── firebase.json           # Configuração do Firebase Hosting
├── firestore.rules         # Regras de segurança do banco
├── storage.rules           # Regras de segurança de arquivos
└── vercel.json             # Configuração de rotas da Vercel
```

## 📄 Licença

Este projeto é de código aberto e pode ser utilizado e modificado livremente.
