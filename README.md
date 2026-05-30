# Sales OS · PWA

**Painel de Performance para Vendas Digitais**  
Funciona offline • Instala como app nativo • Mobile + PC

---

## 🚀 Como hospedar no GitHub (gratuito)

### Passo 1 — Criar repositório
1. Acesse [github.com](https://github.com) e faça login (ou crie conta grátis)
2. Clique em **New repository**
3. Nome: `salesos` (ou qualquer nome)
4. Marque **Public**
5. Clique em **Create repository**

### Passo 2 — Fazer upload dos arquivos
1. Na página do repositório, clique em **uploading an existing file**
2. Arraste todos estes arquivos:
   - `index.html`
   - `sw.js`
   - `manifest.json`
   - pasta `icons/` com os dois PNGs
3. Clique em **Commit changes**

### Passo 3 — Ativar GitHub Pages
1. Vá em **Settings** → **Pages** (menu lateral)
2. Em **Source**, selecione **Deploy from a branch**
3. Branch: `main` · Folder: `/ (root)`
4. Clique **Save**
5. Aguarde ~1 min e seu app estará em:  
   **`https://SEU_USUARIO.github.io/salesos`**

### Passo 4 — Instalar como app nativo

**📱 Android (Chrome):**
- Acesse a URL no Chrome
- Toque nos 3 pontinhos → "Adicionar à tela inicial"
- Ou use o banner "Instalar app" que aparece automaticamente

**🍎 iPhone/iPad (Safari):**
- Acesse a URL no Safari
- Toque no ícone de compartilhar (quadrado com seta)
- "Adicionar à Tela de Início"

**💻 PC (Chrome/Edge):**
- Acesse a URL
- Clique no ícone de instalar na barra de endereço (⊕)
- Ou Menu → "Instalar Sales OS"

---

## ✅ Funcionalidades

- 📊 **Dashboard** — KPIs operacionais e financeiros em tempo real
- ✅ **Tarefas** — Diário / Semanal / Mensal com status e prioridade
- 👥 **Leads & CRM** — Pipeline visual + lista com histórico
- 💰 **Financeiro** — ROAS, margem, simulação Kiwify
- ⚡ **Plano de Guerra** — Checklist + fases + canais para 1.000 vendas
- ⚙️ **Config** — Metas, backup/restore JSON
- 🔌 **100% offline** — Service Worker cacheia tudo localmente
- 💾 **Dados salvos** — localStorage, sem servidor necessário

---

## 📁 Estrutura de arquivos

```
salesos/
├── index.html      ← App completo
├── sw.js           ← Service Worker (offline)
├── manifest.json   ← Config PWA (instalação nativa)
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

*Sales OS v1.0 · PWA · Modo Deus Ativado*
