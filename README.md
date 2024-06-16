
# Projeto de Ecommerce - Backend

Este projeto é um backend para um sistema de ecommerce, desenvolvido com Node.js e TypeScript. Ele fornece funcionalidades para a criação, gestão e consulta de pedidos de livros, suportando diferentes tipos de pagamento e a opção de adicionar um endereço de entrega para pedidos físicos.






## Funcionalidades

- Gerenciamento de Pedidos: Criação, leitura e exclusão de pedidos.
- Itens do Pedido: Adição de itens (livros) aos pedidos, com detalhes sobre quantidade e - preço.
- Pagamentos: Suporte a múltiplos tipos de pagamento, incluindo cartão de crédito, débito,  PayPal e saldo de usuário.
- Endereços de Entrega: Inclusão opcional de endereços de entrega, vinculados a usuários e pedidos específicos.
- Livros: Consulta de preços e informações de livros diretamente do banco de dados.


## Tecnologias Utilizadas


- Node.js: Plataforma de desenvolvimento.
- TypeScript: Linguagem utilizada para maior segurança e melhor manutenção do código.
- Express: Framework para construção de APIs.
- MySQL: Banco de dados relacional utilizado para armazenar informações de usuários, pedidos, livros e endereços.


## Tabelas

- **tb_user** armazena as informações dos usuários.
```
    id
    name
    email
    password

```

- **tb_books** armazena as informações dos livros disponíveis.
```
    id
    title
    author
    img
    description
    genre
    pages
    price
    is_ebook
```

- **tb_order** armazena os pedidos feitos pelos usuários, incluindo o tipo de pagamento e o saldo.

```
    id
    user_id 
    order_date
    status
    total_price
    payment_type
    balance 

```

- **tb_order_item** armazena os itens contidos em cada pedido, relacionando cada item a um pedido e a um livro específico.

```
    id
    order_id 
    book_id 
    quantity 
    price 
```

- **tb_addresses** armazena os endereços de entrega, que são opcionais e podem estar relacionados a um pedido específico e a um usuário.

```
    id
    user_id
    order_id
    street
    number
    complement
    city 
    state
    country
    zipcode
```



#### Cria um novo usuário
```
POST /api/user/create
```

| Parâmetro  | Tipo     | Descrição                           |
| :--------- | :------- | :---------------------------------- |
| `name`     | `string` | **Obrigatório**. O nome do usuário  |
| `email`    | `string` | **Obrigatório**. O email do usuário |
| `password` | `string` | **Obrigatório**. A senha do usuário |

```
Exemplo de corpo de requisição:
```
```
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Autenticação do usuário
```
POST /api/user/login
```
| Parâmetro  | Tipo     | Descrição                           |
| :--------- | :------- | :---------------------------------- |
| `email`    | `string` | **Obrigatório**. O email do usuário |
| `password` | `string` | **Obrigatório**. A senha do usuário |

#### Retorna um usuário
```
GET /api/user/${id}
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário    |

#### Atualiza um usuário
```
PUT /api/user/${id}/update
```

| Parâmetro  | Tipo     | Descrição                           |
| :--------- | :------- | :---------------------------------- |
| `id`       | `string` | **Obrigatório**. O ID do usuário    |
| `name`     | `string` | **Obrigatório**. O nome do usuário     |
| `email`    | `string` | **Obrigatório**. O email do usuário    |
| `password` | `string` | **Obrigatório**. A senha do usuário    |


Exemplo de corpo de requisição:
```
{
  "name": "John Doe Updated",
  "email": "john.doe.updated@example.com",
  "password": "newpassword123"
}
```

#### Deleta um usuário

```
DELETE /api/user/${id}/delete
```
| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do usuário    |


#### Cria um novo livro
```
POST /api/books/create
```
| Parâmetro       | Tipo     | Descrição                           |
| :-------------- | :------- | :---------------------------------- |
| `title`         | `string` | **Obrigatório**. Título do livro    |
| `author`        | `string` | **Obrigatório**. Autor do livro     |
| `genre`         | `string` | **Obrigatório**. Gênero do livro    |
| `description`   | `string` | **Obrigatório**. Descrição do livro |
| `img`           | `string` | **Obrigatório**. URL da imagem do livro |
| `is_ebook`      | `boolean`| **Obrigatório**. Indica se é um eBook ou não |
| `pages`         | `number` | **Obrigatório**. Número de páginas do livro |
| `price`         | `number` | **Obrigatório**. Preço do livro     |

Exemplo de corpo de requisição:
```json
{
  "title": "Dom Casmurro",
  "author": "Machado de Assis",
  "genre": "Literatura Brasileira",
  "description": "Romance brasileiro clássico",
  "img": "https://example.com/dom-casmurro.jpg",
  "is_ebook": false,
  "pages": 256,
  "price": 35.90
}
```

#### Retorna um livro pelo ID
```
GET /api/books/${id}
```
| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do livro      |

#### Retorna todos os livros
```
GET /api/books
```
#### Atualiza um livro
```
PUT /api/books/${id}/update
```
| Parâmetro       | Tipo     | Descrição                           |
| :-------------- | :------- | :---------------------------------- |
| `id`            | `string` | **Obrigatório**. O ID do livro      |
| `title`         | `string` | **Obrigatório**. Título do livro    |
| `author`        | `string` | **Obrigatório**. Autor do livro     |
| `genre`         | `string` | **Obrigatório**. Gênero do livro    |
| `description`   | `string` | **Obrigatório**. Descrição do livro |
| `img`           | `string` | **Obrigatório**. URL da imagem do livro |
| `is_ebook`      | `boolean`| **Obrigatório**. Indica se é um eBook ou não |
| `pages`         | `number` | **Opcional**. Número de páginas do livro |
| `price`         | `number` | **Obrigatório**. Preço do livro     |

Exemplo de corpo de requisição:
```
{
  "title": "Dom Casmurro",
  "author": "Machado de Assis",
  "genre": "Literatura Brasileira",
  "description": "Romance brasileiro clássico atualizado",
  "img": "https://example.com/dom-casmurro.jpg",
  "is_ebook": false,
  "pages": 300,
  "price": 39.90
}
```

#### Deleta um livro
```
DELETE /api/books/${id}/delete
```
| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do livro      |



#### Cria um novo pedido
```
POST /api/order/create
```

| Parâmetro       | Tipo     | Descrição                           |
| :-------------- | :------- | :---------------------------------- |
| `user_id`       | `number` | **Obrigatório**. ID do usuário que está fazendo o pedido |
| `items`         | `array`  | **Obrigatório**. Array de objetos representando os itens do pedido |
| `balance`       | `number` | **Obrigatório**. Saldo do usuário utilizado no pedido |
| `payment_type`  | `string` | **Obrigatório**. Tipo de pagamento utilizado (`credit_card`, `debit_card`, `paypal`, `balance`) |
| `address`       | `object` | **Opcional**. Objeto representando o endereço de entrega |

Exemplo de corpo de requisição:
```
{
  "user_id": 1,
  "items": [
    {
      "book_id": 3,
      "quantity": 1,
      "price": 15.00
    }
  ],
  "balance": 200.00,
  "payment_type": "balance",
  "address": {
    "street": "Rua das Flores",
    "number": "123",
    "complement": "Bloco A, Ap. 101",
    "city": "São Paulo",
    "state": "SP",
    "country": "Brasil",
    "zipcode": "01010-010"
  }
}
```
#### Retorna todos os pedidos de um usuário

```
GET /api/orders/${user_id}
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `user_id` | `number` | **Obrigatório**. ID do usuário      |

#### Deleta um pedido

```
DELETE /api/order/${id}/delete
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do pedido     |

#### Atualiza o status de um pedido

```
PUT /api/order/${id}/update
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do pedido     |
| `status`  | `string` | **Obrigatório**. Novo status do pedido (`pending`, `completed`, `cancelled`) |

Exemplo de corpo de requisição:
```
{
  "status": "completed"
}
```

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/mathfm/LeiaJa-backend
```

Entre no diretório do projeto

```bash
  cd LeiaJa-backend
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```



## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT`
`HOST`
`USER`
`PASSWORD`
`DATABASE`
`PORT_DATABASE`
`TOKEN`