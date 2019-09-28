create table loan(
    id int primary key auto_increment,
    account varchar(36) not null,
    amount numeric not null,
    taken_at date not null,
    duration_in_days int not null,
    interest_rate int,
);
