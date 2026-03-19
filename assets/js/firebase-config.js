// ============================================================
// ⚠️  CONFIGURAÇÃO DO FIREBASE — OBRIGATÓRIO PREENCHER
// ============================================================
//
// COMO OBTER SUAS CREDENCIAIS:
// 1. Acesse https://console.firebase.google.com/
// 2. Crie um projeto (ou use um existente)
// 3. Clique em ⚙️ > Configurações do projeto
// 4. Em "Seus aplicativos", clique em </> (Web)
// 5. Registre o app e copie o firebaseConfig abaixo
//
// Consulte docs/DEPLOY.md para instruções detalhadas
// ============================================================

const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  projectId: "SEU-PROJETO-ID",
  storageBucket: "SEU-PROJETO.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

// ============================================================
// Inicializar Firebase — NÃO MODIFICAR ABAIXO
// ============================================================
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Configurações do Firestore
db.settings({ experimentalForceLongPolling: false });

// Habilitar persistência offline (melhora performance)
db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('[Firebase] Persistência offline: múltiplas abas abertas.');
  } else if (err.code === 'unimplemented') {
    console.warn('[Firebase] Persistência offline não suportada neste navegador.');
  }
});
