# Projeto CRUD de Clientes com Clean Architecture e SOLID Principles

Este projeto é uma aplicação CRUD para gerenciar clientes, desenvolvida como parte de um desafio técnico. A aplicação permite criar, listar, editar, copiar e excluir registros de clientes, utilizando uma arquitetura baseada em princípios de **Clean Architecture**, **SOLID**, e **Design Patterns**. A aplicação é composta por um backend em **Node.js** com **Express** e um frontend em **Next.js**.

## Tecnologias Utilizadas

- **Node.js:** Para execução do backend.
- **Express.js:** Framework backend para receber e processar requisições HTTP.
- **Next.js (React):** Framework frontend para construir interfaces de usuário.
- **Firebird:** Banco de dados utilizado no projeto.
- **TypeScript:** Tipagem estática para maior robustez.
- **Tailwind CSS:** Framework CSS para estilização da interface.
- **Lucide:** Biblioteca de ícones para uma UI mais intuitiva.

## Arquitetura e Organização do Projeto

O projeto foi desenvolvido seguindo o princípio de **Clean Architecture**, separando as camadas de responsabilidade e aplicando os **SOLID Principles**. A estrutura principal do projeto está organizada da seguinte maneira:

### Estrutura de Pastas

- **/adapters**: Contém controladores que conectam a lógica de negócios com a interface e o banco de dados.
- **/domain**: Inclui entidades e interfaces, definindo as propriedades dos clientes e as abstrações utilizadas no repositório.
- **/external/db**: Inclui a implementação do repositório de dados e a conexão com o banco de dados.
- **/main**: Contém os arquivos principais de configuração e os componentes de UI no frontend.
- **/interactors**: Contém os serviços do frontend para se comunicar com o backend.

Essa estrutura foi pensada para desacoplar a lógica de negócios da interface e da infraestrutura, facilitando a manutenção e a troca de componentes, caso necessário.

## Instalação e Configuração

### Pré-requisitos

- Node.js
- Banco de dados Firebird
- Ferramenta de gerenciamento de Firebird, como FlameRobin

### Passos

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    cd nome-do-repositorio
    ```

2. Instale as dependências para o backend e o frontend:
    ```bash
    npm install
    ```

3. Configure o arquivo `.env`:
    ```plaintext
    PORT=3000
    DB_HOST=localhost
    DB_PORT=3050
    DB_DATABASE=C:\seu-caminho\seu-banco.fdb
    DB_USER
    ```
4. Execute o servidor backend
    ```bash
    npm run dev
    ```
5. Em um novo terminal, execute o servidor frontend (Next.js):
   ```bash
    npm run dev
    ```
