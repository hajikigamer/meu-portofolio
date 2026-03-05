# Meu Portfólio

Portfolio pessoal desenvolvido com HTML, CSS e JavaScript.

## 🚀 Funcionalidades

- **Relógio Digital**: Mostra hora atual com opção 12h/24h
- **Contador de Visitas**: Acompanha visitas ao site
- **Projetos**: Galeria de projetos com filtros e modal
- **GitHub Stats**: Integração com API do GitHub (requer configuração)
- **Weather Widget**: Mostra meteorologia baseada na localização
- **Sistema de Contacto**: Formulário com validação e armazenamento local
- **Admin Panel**: Para gerenciar mensagens recebidas

## 🔧 Configuração

### GitHub API (Opcional)

Para ativar os stats do GitHub:

1. **Gere um Personal Access Token:**
   - Vá para https://github.com/settings/tokens
   - Clique em "Generate new token (classic)"
   - Dê um nome (ex: `portfolio-api`)
   - Selecione apenas o scope `public_repo`
   - Clique em "Generate token"
   - **Copie o token imediatamente**

2. **Configure o token:**
   - Abra o arquivo `config.js` (não versionado)
   - Substitua `'ghp_SEU_TOKEN_AQUI'` pelo seu token real
   - Exemplo:
     ```javascript
     const GITHUB_TOKEN = 'ghp_XXXXXXXXXXXXXXXXXXXXX';
     ```

3. **Pronto!** Os stats do GitHub aparecerão automaticamente.

> ⚠️ **Importante:** Nunca commite tokens reais no código. O arquivo `config.js` está no `.gitignore` por segurança.

## 📁 Estrutura do Projeto

```
meu-portfolio/
├── index.html          # Página principal
├── script.js           # Lógica JavaScript
├── styles.css          # Estilos CSS
├── config.js           # Configurações (não versionado)
├── .gitignore          # Arquivos ignorados pelo Git
├── Projetos/           # Pasta com projetos
└── README.md           # Este arquivo
```

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis CSS
- **JavaScript ES6+**: Lógica interativa
- **LocalStorage**: Persistência de dados
- **Fetch API**: Requisições HTTP
- **GitHub API**: Integração com repositórios

## 🌐 Deploy

Este projeto pode ser hospedado em qualquer servidor web estático como:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## 📝 Licença

Este projeto é open source e está disponível sob a [Licença MIT](LICENSE).
