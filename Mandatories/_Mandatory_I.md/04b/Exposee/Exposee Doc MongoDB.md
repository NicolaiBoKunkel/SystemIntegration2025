# Exposee Doc – MongoDB
## Dine opgaver
- Forbind til databasen med de forskellige brugere.
- Test selv hvad du kan og ikke kan som hver bruger.
- Undersøg graden af granulær adgang.
- Dokumenter dine tests med screenshots af succeser og fejl til din aflevering.
- Hvis dokumentationen mangler, så skal du bede mig om hjælp.

---

## Database Oplysninger

| Parameter       | Value                  |
|----------------|------------------------|
| **Host**       | 10.136.130.131         |
| **Port**       | 27017                   |
| **Database Name** | granular_access_db |
| **Container Name** | mongo-container    |

### Brugerkonti

| Brugernavn | Password |
|------------|----------|
| user1      | User1Pass |
| user2      | User2Pass |
| user3      | User3Pass |

---

## Forbind til databasen via CLI

Når containeren er startet, kan du logge ind som følgende brugere:

### Login som `user1`:
```sh
docker run --rm -it mongo mongosh "mongodb://user1:User1Pass@10.136.130.131:27017/granular_access_db"
```

### Login som `user2`:
```sh
docker run --rm -it mongo mongosh "mongodb://user2:User2Pass@10.136.130.131:27017/granular_access_db"
```

### Login som `user3`:
```sh
docker run --rm -it mongo mongosh "mongodb://user3:User3Pass@10.136.130.131:27017/granular_access_db"
```

For at sikre, at databasen er valgt, kan du køre følgende kommando i `mongosh`:
```sh
use granular_access_db
```

---

## Database Struktur

Tabeller i databasen indeholder følgende felter:

| Felt       | Datatype  |
|-----------|----------|
| _id       | ObjectId |
| username  | String   |
| email     | String   |
| ssn       | String   |
| role      | String   |

---

## MongoDB Kommandoer

Når forbindelsen er oprettet, kan du afprøve forskellige kommandoer med de forskellige brugere.

### Vis begrænset samling:
```sh
db.restricted_users_view.find().pretty()
```

### Vis hele samlingen:
```sh
db.users_data.find().pretty()
```

### Indsæt ny data:
```sh
db.users_data.insertOne({ username: "test", email: "test@example.com", ssn: "000-00-0000", role: "user" })
```

### Opdater email på en bruger:
```sh
db.users_data.updateOne({ username: "bob" }, { $set: { email: "bob@example.com" } })
```

### Slet data:
```sh
db.users_data.deleteOne({ username: "test" })
```

---