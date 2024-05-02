# REST API Authentication & Authorization

Denna webbtjänst (REST API) hanterar lagring av arbetserfarenheter, den fungerar som ett cv-register. Applikationen är byggd på NodeJs och Express server som sköter kommunikationen med en MongoDB (NoSQL) databas där datan lagras. NPM packet Mongoose har använts för att hantera kommunikationen mellan applikationen och MongoDB databasen.

Denna webbplatsen kräver inlogging för de lagrade arbetserfarenheter ska visas och för att genomföra CRUD operationer. 

[bcrypt](https://www.npmjs.com/package/bcrypt) har använts för att hash:a och validera lösenorden, samt [JWT](https://jwt.io/) har använts för att autentisiera användare. 

Applikationen i detta repo lanseras på ett PaaS som heter railway.app vid denna [länk](https://auth-production-afa2.up.railway.app/) och databasen är hostad i MongoDB Atlas

## Denna webbtjänst hanterar CRUD operations 
1. **Create** genom att ta emot och bearbeta **POST request** med json data från klienten och lagra datan i databasen.
2. **Read** genom att ta emot och bearbeta **GET request** som hämtar lagrade data i database.
3. **Update** genom att ta emot och bearbeta **PUT request** som skickar JSON data som uppdaterar/ändrar en befintlig rad vid angivit id i databasen
4. **Delete** genom att ta emot och bearbeta **DELETE request** från klienten som raderar en rad vid angivit id i databasen.

## Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

|Metod  |Ändpunkt             |Beskrivning                                                                      |
|-------|---------------------|---------------------------------------------------------------------------------|
|GET    |/workexperiences     |Hämtar alla arbetserfarenheter.                                                  |
|POST   |/workexperiences     |Lagrar en ny arbetserfarenheter. Kräver arbetserfarenhet-objekt skickas med.     |
|PUT    |/workexperiences/:id |Uppdaterar en existerande arbetserfarenheter med angivet ID.                     |
|DELETE |/workexperiences/:id |Raderar en arbetserfarenhet med angivet ID                                       |

Ett arbetserfarenhet-objekt returneras/skickas i JSON-format med följande struktur:
```
{
    "companyname": "The White House",
    "jobtitle": "Chief Meme Officer",
    "location": "Washington, D.C",
    "startdate": "2024-04-01T00:00:00.000Z",
    "enddate": "2024-04-01T00:00:00.000Z",
  }
```