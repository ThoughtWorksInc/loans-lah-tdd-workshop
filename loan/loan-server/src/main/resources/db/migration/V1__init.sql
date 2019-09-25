create table loan(
    id int primary key auto_increment,
    account int not null,
    amount numeric not null,
    taken_at date not null,
    duration_in_days int not null
);
