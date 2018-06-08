insert into characterspecial (charid, name, type)
values ($1, $2, $3)
returning id