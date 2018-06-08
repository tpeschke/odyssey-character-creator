update aliens
set selected = selected + 1
where id = $3;

update backgrounds
set selected = selected + 1
where id = $4;

insert into characters (userid, bp, species, background, hp, credits, stats)
values ($1, $2, $3, $4, $5, $6, $7)
returning id