# Exposee Dokumentation – PostgreSQL

## Din opgave som integrator
- Forbind til databasen med de forskellige brugere.
- Test selv, hvad du kan og ikke kan som hver bruger.
- Prøv at læse, indsætte og slette data.
- Undersøg graden af granulær adgang.
- Dokumentér alle tests med screenshots af både succeser og fejl.
- Hvis dokumentationen mangler noget, skal du bede mig opdatere den – ikke få hjælp privat.

---

## Database Information

| Parameter       | Værdi          |
|----------------|---------------|
| **Host**       | 10.136.147.10 |
| **Port**       | 5432          |
| **Database Name** | secure_db  |
| **Container Name** | my_postgres |

### Brugerkonti

| Brugernavn | Password   |
|------------|-----------|
| admin      | admin     |
| user1      | password1 |
| user2      | password2 |
| user3      | password3 |

---

## Sådan starter du databasen

1. Sørg for, at **Docker** er installeret og kører.
2. Start containeren med:
   ```sh
   docker start my_postgres
   ```
3. Tjek om containeren kører:
   ```sh
   docker ps
   ```

---

## Sådan forbinder du til databasen via CLI

Forbind til databasen som en specifik bruger:
```sh
docker exec -it my_postgres psql -U [BRUGERNAVN] -d secure_db
```

Erstat `[BRUGERNAVN]` med den ønskede bruger, f.eks. `admin`, `user1`, `user2`, eller `user3`.

---

## Tabelstruktur

Databasen indeholder en tabel ved navn **`sensitive_data`** med følgende kolonner:

| Kolonnenavn  | Datatype            |
|-------------|------------------|
| id         | SERIAL PRIMARY KEY |
| username   | TEXT               |
| role       | TEXT               |
| secret_info | TEXT               |

---

## Når du er færdig

Stop containeren med følgende kommando:
```sh
docker stop my_postgres
