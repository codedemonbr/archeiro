<p align="center">
  <img src="https://via.placeholder.com/1200x400/1e293b/94a3b8?text=Archeiro+-+Gestor+de+Projetos+Arquitetônicos" alt="Archeiro Banner" width="100%"/>
  <br/><br/>
  <a href="https://github.com/codedemonbr/archeiro/stargazers"><img src="https://img.shields.io/github/stars/codedemonbr/archeiro?style=for-the-badge&color=yellow" alt="Stars"/></a>
  <a href="https://github.com/codedemonbr/archeiro/forks"><img src="https://img.shields.io/github/forks/codedemonbr/archeiro?style=for-the-badge&color=teal" alt="Forks"/></a>
  <a href="https://github.com/codedemonbr/archeiro/issues"><img src="https://img.shields.io/github/issues/codedemonbr/archeiro?style=for-the-badge&color=orange" alt="Issues"/></a>
  <a href="https://github.com/codedemonbr/archeiro/blob/main/LICENSE"><img src="https://img.shields.io/github/license/codedemonbr/archeiro?style=for-the-badge&color=purple" alt="License"/></a>
  <br/>
  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java"/>
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes"/>
</p>

<h1 align="center">🏹 Archeiro</h1>
<h3 align="center">O gestor de arquivos definitivo para arquitetos e escritórios de arquitetura</h3>

<p align="center">
  <b>Organize • Visualize • Compartilhe</b> projetos de arquitetura com velocidade, segurança e beleza.<br/>
  Feito por arquitetos, para arquitetos.
</p>

<p align="center">
  <a href="#-comece-hoje">Comece agora</a> •
  <a href="#-principais-diferenciais">Diferenciais</a> •
  <a href="#-stack-tecnológica">Tecnologias</a> •
  <a href="#-implantação">Deploy</a> •
  <a href="#-contribua">Contribua</a>
</p>

---

## ✨ Por que o Archeiro está mudando o jogo?

Arquitetos gastam horas preciosas procurando arquivos, enviando pastas pesadas por e-mail e perdendo versões antigas de projetos.  

**Archeiro resolve isso de forma elegante e profissional:**


- Busca instantânea + filtros por projeto, data, tipo, cliente, tags
- Feito para escalar: do escritório pequeno ao grande studio

> “Finalmente uma ferramenta que entende o fluxo real de um escritório de arquitetura.”  
> — (futuro depoimento de usuário 😄)

---

## 🚀 Comece hoje (em menos de 5 minutos)

### Pré-requisitos

- Node.js 18+  
- Java 17+  
- Docker + Docker Compose (recomendado para dev)  
- Opcional: Minikube / cluster Kubernetes

### Desenvolvimento local (recomendado)

```bash
# 1. Clone o projeto
git clone https://github.com/codedemonbr/archeiro.git
cd archeiro

# 2. Suba os serviços auxiliares (PostgreSQL, RabbitMQ, etc)
docker compose up -d

# 3. Backend
cd backend
./mvnw clean install
./mvnw spring-boot:run

# 4. Frontend (em outro terminal)
cd ../frontend
npm install
npm run dev
```

---

## 🛠️ Stack Tecnológica (escolha moderna e robusta)

**Frontend**  
Next.js 14+ • TypeScript • Tailwind CSS • React Server Components

**Backend**  
Java 21 • Spring Boot 3 • Spring Security • Arquitetura Hexagonal  
PostgreSQL • RabbitMQ (filas assíncronas) • MinIO/S3 (armazenamento)

**DevOps & Qualidade**  
Docker • Kubernetes manifests prontos • JUnit 5 + Mockito  
GitHub Actions (CI/CD sugerido)

---

## ☸️ Deploy em Produção (Kubernetes)

Já incluímos manifests testados em `k8s/`

```bash
# Ajuste os secrets e configmaps
kubectl apply -k k8s/overlays/production/
```

Ou use Helm Chart (futuro)

---

## 🧪 Testes e Qualidade

```bash
# Backend
cd backend
./mvnw test

# Frontend (em desenvolvimento)
cd frontend
npm run test    # ou npm run lint
```

---

## 🤝 Como contribuir

Adoraríamos sua ajuda! Algumas ideias:

- Melhorar visualização de arquivos (suporte a mais formatos)
- Recursos de markup/colaboração em planta
- Integração com BIM tools
- Tradução (inglês, espanhol…)
- Temas dark/light mais bonitos

1. Abra uma **issue** descrevendo sua ideia  
2. Fork → branch → pull request  
3. Siga nosso [Código de Conduta](CODE_OF_CONDUCT.md) e [Guia de Contribuição](CONTRIBUTING.md)

---

## 📄 Licença

MIT License — sinta-se livre para usar, modificar e comercializar.

Criado com 💙 por **[Thiago Henrique](https://github.com/SEU_USUARIO)** — BraSil com S

📬 **Dúvidas? Sugestões?** Abra uma issue ou me chama no LinkedIn/X!

⭐ Se você gostou do projeto, não esquece de dar uma estrela — ajuda muito!

<p align="center">
  <img src="https://via.placeholder.com/800x200/0f172a/64748b?text=Feito+para+arquitetos+que+amamos+o+que+fazemos" alt="Footer" width="80%"/>
</p>




