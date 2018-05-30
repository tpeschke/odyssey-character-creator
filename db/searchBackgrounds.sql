SELECT * FROM backgrounds
where UPPER(name) like ('%' || $1 || '%')