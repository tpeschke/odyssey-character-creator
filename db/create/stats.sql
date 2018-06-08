insert into stats (str, int, wis, dex, con, cha, lks, rep)
values ($1, $2, $3, $4, $5, $6, $7, $8)
returning id