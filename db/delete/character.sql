delete from specialtables
where weaponid = (select id from characterspecial where id = $1);

delete from characterspecial
where id = $1;

delete from characterqf
where charid = $1;

delete from charactertalents
where charid = $1;

delete from characterprofics
where charid = $1;

delete from characters
where id = $1;

delete from stats
where id = (select stats from characters where id = $1);