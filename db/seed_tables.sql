create table users (
    id serial Primary KEY,
    user_name VARCHAR(40),
    auth_id TEXT
);

create table aliens (
    id serial Primary KEY,
    species VARCHAR(40),
    selected Int DEFAULT 0
);

insert into aliens (species)
values ('Akehlarian'), ('Clone'), ('Droid'), ('Ghost'), ('Human'), ('Hiven');
