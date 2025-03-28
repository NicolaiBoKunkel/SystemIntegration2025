Exposee Dokumentation – PostgreSQL (Modtaget fra opgave-partner)

Din opgave som integrator
•	Forbind til databasen med de forskellige brugere.
•	Test selv, hvad du kan og ikke kan som hver bruger.
•	Prøv at læse, indsætte, update og slette data.
•	Undersøg graden af granular adgang.
•	Dokumentér alle tests med screenshots af både succeser og fejl.
•	Hvis dokumentationen mangler noget, skal du bede mig opdatere den.

Database Information
•	Ip: 10.136.137.33
•	Port: 5432
•	Database Name: secure_db
•	Container Name: my_postgres

Brugere
Brugernavn	Password
admin	admin
user1	password1
user2	password2
user3	password3



Sådan starter du databasen
1.	Sørg for, at Docker er installeret og kører.
2.	Start containeren med:
docker start my_postgres
3.	Tjek om containeren kører:
docker ps

Sådan forbinder du til databasen via CLI
Forbind til databasen som en specifik bruger:
docker run --rm -it postgres psql "postgresql://[BRUGERNAVN]:[PASSWORD]@10.136.137.33:5432/secure_db"


Tabelstruktur
Databasen indeholder en tabel ved navn sensitive_data med følgende kolonner:
Kolonnenavn	Datatype
id	SERIAL PRIMARY KEY
username	TEXT
role	TEXT
secret_info	TEXT

Commands du kan benytte i databasen:
Read:
Brug SELECT til at hente data fra tabellen sensitive_data.
Du kan f.eks. forsøge at hente alle kolonner eller kun udvalgte felter.
SELECT * FROM sensitive_data;

Insert:
Test om brugeren har rettigheder til at indsætte nye rækker i tabellen.
Udfyld felterne username, role, og secret_info med egne testværdier.
INSERT INTO sensitive_data (username, role, secret_info)
VALUES ('[brugernavn]', '[rolle]', '[hemmelig information]');
Update:
Opdater eksisterende data (UPDATE):
Prøv at ændre et eksisterende felt, f.eks. opdatere en brugers rolle eller hemmelige info.
Husk at angive en WHERE-betingelse, så du ikke opdaterer alt.
UPDATE sensitive_data
SET secret_info = '[ny værdi]'
WHERE username = '[eksisterende brugernavn]';
Delete:
Test om brugeren har rettighed til at slette en række.
Angiv en WHERE-betingelse for at slette specifik data.
DELETE FROM sensitive_data
WHERE username = '[brugernavn]';

Når du er færdig
Stop containeren:
docker stop my_postgres