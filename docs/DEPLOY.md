# 🚀 Guia de Deploy e Configuração — Cardápio Digital

Este guia passo a passo explica como configurar o Firebase, subir o código para o GitHub e fazer o deploy gratuito na Vercel.

---

## 1️⃣ Configuração do Firebase

O sistema utiliza o Firebase para Banco de Dados (Firestore), Autenticação e Armazenamento de Imagens (Storage).

### Passo 1: Criar o Projeto
1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"**
3. Dê um nome ao projeto (ex: `cardapio-digital`)
4. Desative o Google Analytics (não é necessário) e clique em **"Criar projeto"**

### Passo 2: Configurar Autenticação
1. No menu lateral, vá em **Criação > Authentication**
2. Clique em **"Vamos começar"**
3. Na aba **"Sign-in method"**, clique em **"E-mail/senha"**
4. Ative a primeira opção ("Ativar") e clique em **Salvar**

### Passo 3: Configurar Banco de Dados (Firestore)
1. No menu lateral, vá em **Criação > Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Escolha o local (ex: `southamerica-east1` para Brasil)
4. Inicie em **"Modo de produção"**
5. Após criar, vá na aba **"Regras"** e cole o conteúdo do arquivo `firestore.rules` que está no projeto. Clique em **Publicar**.
6. Vá na aba **"Índices"** e crie os índices conforme o arquivo `firestore.indexes.json` (ou deixe que o Firebase crie automaticamente quando você usar o sistema).

### Passo 4: Configurar Armazenamento (Storage)
1. No menu lateral, vá em **Criação > Storage**
2. Clique em **"Vamos começar"**
3. Inicie em **"Modo de produção"**
4. Após criar, vá na aba **"Regras"** e cole o conteúdo do arquivo `storage.rules` que está no projeto. Clique em **Publicar**.

### Passo 5: Obter as Credenciais
1. No menu lateral, clique na **Engrenagem ⚙️ > Configurações do projeto**
2. Role para baixo até "Seus aplicativos" e clique no ícone **`</>` (Web)**
3. Dê um apelido ao app (ex: `cardapio-web`) e clique em **"Registrar app"**
4. Copie o objeto `firebaseConfig` que será gerado.
5. Abra o arquivo `assets/js/firebase-config.js` no seu projeto e substitua os valores pelas suas credenciais.

---

## 2️⃣ Subindo para o GitHub

1. Crie uma conta no [GitHub](https://github.com/) se não tiver.
2. Crie um novo repositório (ex: `meu-cardapio-digital`).
3. No seu computador, abra o terminal na pasta do projeto e execute:

```bash
git init
git add .
git commit -m "Commit inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/meu-cardapio-digital.git
git push -u origin main
```

---

## 3️⃣ Deploy na Vercel (Gratuito)

A Vercel é a melhor plataforma para hospedar este projeto gratuitamente.

1. Acesse a [Vercel](https://vercel.com/) e faça login com sua conta do GitHub.
2. Clique em **"Add New..." > "Project"**.
3. Encontre o repositório `meu-cardapio-digital` e clique em **"Import"**.
4. O arquivo `vercel.json` já está configurado no projeto, então você não precisa mudar nada.
5. Clique em **"Deploy"**.
6. Aguarde alguns segundos. Pronto! Seu sistema está no ar.

---

## 4️⃣ Primeiro Acesso

1. Acesse a URL gerada pela Vercel (ex: `https://meu-cardapio-digital.vercel.app`).
2. Clique em **"Criar Conta Grátis"**.
3. Preencha os dados do seu restaurante.
4. Você será redirecionado para o Painel Administrativo.
5. Vá em **Configurações** para adicionar sua Logo.
6. Vá em **Categorias** e crie suas categorias (ex: Lanches, Bebidas).
7. Vá em **Produtos** e adicione seus itens.
8. Vá em **QR Code**, imprima e coloque nas mesas!

---

## 💡 Dicas de Uso

- **Impressão de Comanda:** O sistema é compatível com impressoras térmicas (58mm e 80mm). Basta clicar em "Imprimir" na comanda do pedido.
- **Notificação Sonora:** Deixe a aba do painel aberta no computador ou tablet do caixa. Quando um pedido chegar, o sistema emitirá um som (certifique-se de que o navegador permite reprodução de áudio).
- **Modo Escuro:** Clique no ícone de lua 🌙 no topo do painel para ativar o modo escuro.
