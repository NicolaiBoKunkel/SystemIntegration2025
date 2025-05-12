# Webhook Exposee – Dokumentation

Dette system er designet til at simulere et **invoice-betalingstema**, hvor eksterne systemer (Integrators) kan registrere webhook-endpoints og modtage events som f.eks. `"invoice_paid"` og `"invoice_created"`.

Dokumentationen er skrevet med udgangspunkt i brug med **Postman**, men integrationen kan også testes med curl eller via kode.

> **Bemærk:** I en rigtig verden ville webhooks blive kaldt automatisk, når en hændelse (som betaling af en faktura) opstår.  
> I denne testopgave bruges `GET /ping` til manuelt at simulere en event.

---

## 1. Registrér din webhook

Send en `POST` request til følgende endpoint:

```
https://opgave12a.loca.lt/webhooks/register
```

**Body (JSON):**
```json
{
  "url": "https://opgave12a.loca.lt/webhook",
  "events": ["invoice_paid", "invoice_created"]
}
```

---

## 2. Send et ping for at teste

For at simulere at en faktura er blevet betalt, send en `GET` request til:

```
https://opgave12a.loca.lt/ping
```

Dette vil sende følgende payload som en `POST` til din registrerede webhook:

```json
{
  "event": "invoice_paid",
  "timestamp": "2025-05-04T14:30:00.000Z",
  "data": {
    "invoiceId": "INV-001",
    "amount": 199.99,
    "currency": "USD"
  }
}
```

Hvis alt fungerer korrekt, vil du se denne payload blive modtaget af din webhook-server.

---

## 3. Afmeld din webhook (valgfrit)

Send en `POST` request til følgende endpoint:

```
https://opgave12a.loca.lt/webhooks/unregister
```

**Body (JSON):**
```json
{
  "url": "https://opgave12a.loca.lt/webhook"
}
```

Hvis afmeldingen lykkes, returneres en bekræftelse og en HTTP 200 statuskode.

---

## Vigtigt

- **Din LocalTunnel skal være aktiv**, både når du registrerer og modtager webhooks.
- Du skal have en lokal server kørende, der lytter på `POST /webhook`.
- Brug gerne terminalen til at bekræfte at webhooken bliver modtaget.

---

## Du er færdig når:

- Din webhook er korrekt registreret.
- Du har modtaget et event (f.eks. `"invoice_paid"`) på din server.
- Du kan dokumentere modtagelsen (f.eks. via en screenshot).
- (Valgfrit) Du har afmeldt webhooken korrekt.
