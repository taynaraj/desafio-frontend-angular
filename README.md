# 🎨 Desafio Frontend Angular

Projeto desenvolvido com **Angular** para gerenciamento de eventos, incluindo listagem, edição e exclusão de eventos, além de autenticação de usuários.

---

## 🚀 Como rodar o projeto localmente

### 1️⃣ Clonar o repositório

Abra o terminal e execute:

````sh
git clone https://github.com/taynaraj/desafio-frontend-angular.git
cd desafio-frontend-angular
``

### 2️⃣ Instalar as dependências
Antes de iniciar o projeto, instale as dependências necessárias:

```sh

npm install
``

### 3️⃣ Iniciar o servidor Angular
Para rodar o frontend, utilize o seguinte comando:

```sh

ng serve
``

## A aplicação estará disponível em:
🔗 http://localhost:4200

🔌 **Rodar a API Fake (JSON Server)**
O projeto usa JSON Server para simular uma API. Para inicializá-la, execute:

```sh

json-server --watch eventos.json --port 3000
``

### A API estará disponível em:
🔗 http://localhost:3000/events

🔑 **Autenticação**
Para acessar a aplicação, utilize as seguintes credenciais no login:

Usuário: admin
Senha: 1234

📂 **Estrutura do Projeto**

📁 src/
 ┣ 📁 app/
 ┃ ┣ 📁 auth/               # Autenticação (Login)
 ┃ ┣ 📁 events/             # Listagem e edição de eventos
 ┃ ┣ 📁 services/           # Comunicação com API Fake
 ┃ ┣ 📁 shared/             # Componentes reutilizáveis (Header, Layout)
 ┃ ┣ 📁 styles/             # Estilos globais
 ┃ ┣ 📄 app.routes.ts       # Rotas da aplicação
 ┃ ┣ 📄 app.component.ts    # Componente raiz
 ┃ ┗ ...
 ┣ 📄 index.html            # Página inicial
 ┣ 📄 styles.scss           # Estilos globais
 ┗ ...

🛠 **Tecnologias Utilizadas**

Angular
TypeScript
Bootstrap 5
JSON Server (API Fake)
Ngx-Toastr (Notificações)
Font Awesome (Ícones)
````
