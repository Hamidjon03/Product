create table products
(
  id serial primary key,
  name varchar(128) unique not null,
  price bigint default 0,
  count int default 0
);

INSERT INTO products
  (name, price, count)
VALUES('Fructs', 2, 1);

create table users
(
  id serial primary key,
  login varchar(128) unique not null,
  password text not null,
  balance bigint default 0
);

create table transactions
(
  id serial primary key,
  user_id int not null,
  product_id int default null,
  product_count int not null,
  total_price bigint not null,
  CONSTRAINT fk_user_id
      FOREIGN KEY(user_id) 
        REFERENCES users(id)
        on delete CASCADE,
  CONSTRAINT fk_product_id
      FOREIGN KEY(product_id) 
        REFERENCES products(id)
        on delete set null
);