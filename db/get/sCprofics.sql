select proficiencies.id as id, name from characterprofics
join proficiencies on proficiencies.id = characterprofics.proficid
where charid = $1;