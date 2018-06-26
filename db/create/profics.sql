insert into characterprofics (charId, proficid)
values ($1,$2);

update proficiencies
set selected = selected + 1
where id = $2;