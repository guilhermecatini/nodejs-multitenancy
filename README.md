# Exemplo de múltiplas conexões com NodeJS
Um simples exemplo de múltiplas conexões utilizando [NodeJS](https://nodejs.org/en/) com [ExpressJS](https://expressjs.com/pt-br/) e [mongoose](https://mongoosejs.com/).

Nesse exemplo teremos uma base de dados onde vão estar as informações das conexões disponíveis, e para setar qual conexão vamos utilizar, passaremos um parâmetro via header chamado **customerid**.

## Iniciando o servidor
Certifique-se de ter o [git](https://git-scm.com/), [NodeJS](https://nodejs.org/en/) e [MongoDB](https://www.mongodb.com/) instalados.

1. Clone o repositório
2. Após ter clonado, instale suas dependências utilizando o comando:

    `npm install`

3. Instale o pacote nodemon globalmente utilizando o comando:

    `npm install -g nodemon`

4. Inicie o projeto utilizando o comando:

    `npm start`

5. Seu servidor vai estar disponível no endereço http://localhost:3000

## Carregando a base de dados para múltiplas conexões
Abra o console do MongoDB e adicione esses três clientes na base de dados:

```javascript
use dbmaster;
db.customers.save( { db_name: 'db01', connection_name: 'db01' } );
db.customers.save( { db_name: 'db02', connection_name: 'db02' } );
db.customers.save( { db_name: 'db03', connection_name: 'db03' } );
```

Feito isso, vamos executar o comando para listar o que acabou de ser inserido, e vamos guardar os ID's gerados pelo MongoDB.

```javascript
db.customers.find().pretty();
```

O resultado obtido é:

```javascript
{
        "_id" : ObjectId("5bd85b40f81b7ecfc409bdca"),
        "db_name" : "db01",
        "connection_name" : "db01"
}
{
        "_id" : ObjectId("5bd85b40f81b7ecfc409bdcb"),
        "db_name" : "db02",
        "connection_name" : "db02"
}
{
        "_id" : ObjectId("5bd85b41f81b7ecfc409bdcc"),
        "db_name" : "db03",
        "connection_name" : "db03"
}
```

## Inserindo dados
Após inserirmos os clientes acima, vamos incluir dados para cada cliente, passando o id do cliente pelo cabeçalho da requisição. O id do cliente são os que foram gerados automaticamente pelo MongoDB. Utilizaremos o **console do Google Chrome** para realizar essas requisições, lembrando que teremos que ter o **plugin do jQuery** disponível para realizar os comandos abaixo.

1. Inserindo um dado em um determinado cliente:

**Cliente 01**
```javascript
$.ajax({
    method: 'POST',
	url: 'http://localhost:3000/api/v1/board',
	headers: { customerid: '5bd85b40f81b7ecfc409bdca' },
	data: { title: 'Board 01 da Empresa 01' }
}).done(function (r) {
	console.log(r);
});
```

**Cliente 02**
```javascript
$.ajax({
    method: 'POST',
	url: 'http://localhost:3000/api/v1/board',
	headers: { customerid: '5bd85b40f81b7ecfc409bdcb' },
	data: { title: 'Board 01 da Empresa 02' }
}).done(function (r) {
	console.log(r);
});
```

**Cliente 03**
```javascript
$.ajax({
    method: 'POST',
	url: 'http://localhost:3000/api/v1/board',
	headers: { customerid: '5bd85b41f81b7ecfc409bdcc' },
	data: { title: 'Board 01 da Empresa 03' }
}).done(function (r) {
	console.log(r);
});
```

Note que para cada requisição eu passei um **customerid** diferente no header, que são referentes aos ids dos clientes.

Agora vamos consultar no MongoDB quantas bases temos criadas lá utilizando o comando:

```javascript
show dbs;
```

O Resultado obtido é:

```
admin     0.000GB
config    0.000GB
db01      0.000GB // Criado conforme o ID Passado
db02      0.000GB // Criado conforme o ID Passado
db03      0.000GB // Criado conforme o ID Passado
dbmaster  0.000GB
local     0.000GB
```

## Capturando os dados inseridos.
Agora vamos requisitar os dados conforme o ID do cliente passado pelo header da requisição.

**Cliente 01**
```javascript
$.ajax({
    method: 'GET',
	url: 'http://localhost:3000/api/v1/board',
	headers: { customerid: '5bd85b40f81b7ecfc409bdca' }
}).done(function (r) {
	console.log(r);
});
```

**Cliente 02**
```javascript
$.ajax({
    method: 'GET',
	url: 'http://localhost:3000/api/v1/board',
	headers: { customerid: '5bd85b40f81b7ecfc409bdcb' }
}).done(function (r) {
	console.log(r);
});
```

**Cliente 03**
```javascript
$.ajax({
    method: 'GET',
	url: 'http://localhost:3000/api/v1/board',
	headers: { customerid: '5bd85b41f81b7ecfc409bdcc' }
}).done(function (r) {
	console.log(r);
});
```

## Considerações
Note que para cada consulta, ele trouxe 1 registro, pois ele está conectando em bases diferentes conforme o ID do cliente passado. Lembrando que este é um simples exemplo, está faltando algumas validações, como verificar se o ID de cliente existe antes de continuar, causando erro na aplicação.
