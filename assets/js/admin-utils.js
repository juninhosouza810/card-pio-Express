/* ============================================================
   UTILITÁRIOS DO PAINEL ADMINISTRATIVO
   ============================================================ */

// Toast notifications
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type] || icons.info}</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Formatar preço
function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);
}

// Formatar data/hora
function formatDateTime(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).format(date);
}

function formatTime(timestamp) {
  if (!timestamp) return '—';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(date);
}

// Tempo relativo
function timeAgo(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s atrás`;
  if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
  return formatDateTime(timestamp);
}

// Loading overlay
function showLoading(msg = 'Carregando...') {
  let overlay = document.getElementById('loadingOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div class="loading-box">
        <div class="spinner"></div>
        <p id="loadingMsg" style="color:var(--text-secondary);font-size:0.9rem">${msg}</p>
      </div>`;
    document.body.appendChild(overlay);
  } else {
    document.getElementById('loadingMsg').textContent = msg;
    overlay.style.display = 'flex';
  }
}

function hideLoading() {
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) overlay.style.display = 'none';
}

// Modal genérico de confirmação
function showConfirm(title, message, onConfirm) {
  const existing = document.getElementById('confirmModal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'confirmModal';
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal" style="max-width:400px">
      <div class="modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modal-body">
        <p style="color:var(--text-secondary)">${message}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="document.getElementById('confirmModal').remove()">Cancelar</button>
        <button class="btn btn-danger" id="confirmBtn">Confirmar</button>
      </div>
    </div>`;
  document.body.appendChild(modal);
  document.getElementById('confirmBtn').onclick = () => {
    modal.remove();
    onConfirm();
  };
}

// Gerar ID único
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Upload de imagem para Firebase Storage
async function uploadImage(file, path) {
  const storageRef = storage.ref(path);
  const snapshot = await storageRef.put(file);
  return await snapshot.ref.getDownloadURL();
}

// Verificar autenticação
function requireAuth(callback) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = 'login.html';
    } else {
      callback(user);
    }
  });
}

// Obter dados do estabelecimento
async function getEstabelecimento(uid) {
  const doc = await db.collection('users').doc(uid).get();
  if (doc.exists) {
    return doc.data().estabelecimento || {};
  }
  return {};
}

// Status do pedido
const ORDER_STATUS = {
  novo: { label: 'Novo Pedido', color: 'danger', icon: '🔴', class: 'new' },
  preparo: { label: 'Em Preparo', color: 'warning', icon: '🟡', class: 'preparing' },
  entregue: { label: 'Entregue', color: 'success', icon: '🟢', class: 'delivered' },
  cancelado: { label: 'Cancelado', color: 'secondary', icon: '⚫', class: 'cancelled' }
};

// Atualizar badge de pedidos na sidebar
function updateOrderBadge(count) {
  const badge = document.getElementById('ordersBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline' : 'none';
  }
}

// Som de notificação
function playNotificationSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
  } catch (e) {
    console.warn('Não foi possível tocar som de notificação:', e);
  }
}

// Sidebar toggle para mobile
function initSidebar() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }
}

// Modo escuro
function initDarkMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

function toggleDarkMode() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
  localStorage.setItem('darkMode', !isDark);
  const btn = document.getElementById('darkModeBtn');
  if (btn) btn.textContent = isDark ? '🌙' : '☀️';
}

// Inicializar modo escuro ao carregar
initDarkMode();
