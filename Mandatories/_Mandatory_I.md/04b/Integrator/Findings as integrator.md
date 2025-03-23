# Mine opdagelser som Integrator
I de underliggende screenshots vil jeg vise mine opdagelser som integrator til en PostgreSQL-database, hvor jeg har undersøgt graden af granulær adgangskontrol for de forskellige brugere.
## Adgang som Admin
Admin-brugeren har fuld adgang til tabellen sensitive_data, hvilket inkluderer: SELECT (læse data), INSERT (indsætte data), UPDATE (opdatere data) og DELETE (slette data)
![Admin View](Admin_granular.JPG)

## Adgang som User 1
User 1 får permission denied fejl på alle operationer.
![User 1 View](User1_granular.JPG)

## Adgang som User 2
User 2 kan kun læse egen række med SELECT. INSERT, UPDATE og DELETE resulterer i permission denied fejl
![User 2 View](User2_granular.JPG)

## Adgang som User 3 Access
User 3 kan også kun læse egen række med SELECT...
![User 3 View](User3_granular.JPG)