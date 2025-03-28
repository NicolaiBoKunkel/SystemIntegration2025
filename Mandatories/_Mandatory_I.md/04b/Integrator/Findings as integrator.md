# Mine opdagelser som Integrator
I de underliggende screenshots vil jeg vise mine opdagelser som integrator til en PostgreSQL-database, hvor jeg har undersøgt graden af granulær adgangskontrol for de forskellige brugere.
## Adgang som Admin
Admin-brugeren har fuld adgang til tabellen sensitive_data, hvilket inkluderer: SELECT (læse data), INSERT (indsætte data), UPDATE (opdatere data) og DELETE (slette data)
![Admin View](new_granular_admin.JPG)

## Adgang som User 1
User 1 får permission denied fejl på alle operationer.
![User 1 View](new_granular_user1.JPG)

## Adgang som User 2
User 2 kan kun læse egen række med SELECT. Andre commands som INSERT, UPDATE og DELETE resulterer i permission denied fejl
![User 2 View](new_granular_user2.JPG)

## Adgang som User 3 Access
User 3 kan læse med SELECT, samt indsætte med INSERT og opdatere med UPDATE på egne rækker. Den kan derimod ikke slette, hvilket må skyldes RLS-setupet i databasen, da jeg lavede flere forsøg på at slette, uden held.
![User 3 View](new_granular_user3.JPG)