select talents.id as id, name from charactertalents
join talents on talents.id = charactertalents.talentid
where charid = $1