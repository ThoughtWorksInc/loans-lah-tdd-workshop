create table loan(
    id serial primary key,
    account varchar(36) not null,
    amount numeric not null,
    taken_at date not null,
    duration_in_days int not null,
    interest_rate int
);
