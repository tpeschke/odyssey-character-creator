insert into charactertalents (charId, talentid)
values ($1,$2);

update talents
set selected = selected + 1
where id = $2;