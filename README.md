# Webprogrammierung I (Abgabe: 30.09.2017)

Diese Repository beinhaltet das benötigte Programm um die Aufgabenstellung des Fachs: "Webprogrammierung I" zu erfüllen.

## Aufgabenstellung
Erstellung einer Projekt-Datenbank-Server-Applikation.
### Datenbank Schemata:
Das Programm enthält die folgenden Tabellen.
##### Mitarbeiter
* Pindex (PK)
* Mitarbeiternummer
* Nachname
* Vorname
* Postleitzahl
* Ort
* Straße / Hausnummer
* Benutzername
* Passwort (im Klartext)
* Abteilungsnummer (FK)

##### Abteilungen
* Pindex (PK)
* Abteilungsnummer
* Name

##### Projekte
* Pindex (PK)
* Projektnummer
* Text

##### Projekt-Mitarbeiter
* Pindex(PK)
* Mindex (FK)
* Prjindex (FK)

### Servertechnologie
Als Servertechnologie wird Node.js verwendet.

### Aufbau der Benutzeroberfläche
Anmeldung erfolgt über Benutzername und Passwort für die User: *Admin*  und *Normaler Benutzer*

#### **Admin**
##### Bei Anmeldung:
* Kann Benutzer anlegen und löschen
* Kann Passwort neu setzen
##### Nach erfolgreicher Anmeldung:
* Tabelle der Benutzer: *löschen* oder *Passwort ändern*

#### **Normaler Benutzer**
##### Bei Anmeldung:
* Kann Passwort neu setzen
* Kann Benutzername neu setzen
##### Nach erfolgreicher Anmeldung:
* Benutzername ändern
* Passwort ändern
* Tabelle mit den Projekten - Projektauswählen: *den Text ändern*


## Einführung

Dieses Programm stellt einen rudimentären Node-Server mit MongoDB Anbindung dar.

### Voraussetzungen

Zunächst muss eine aktuelle Version von Node.js auf dem Rechner installiert werden. Herunterzuladen unter [Nodejs.org](https://nodejs.org/en/)

nach Installation kann die aktuell installierte Version mit folgendem Befehl angezeigt werden:
```
node -v
```
Version: **8.5.0** für die Entwicklung verwendet.

* Sollte eine andere Node-Version zu Problemen, führen kann mithilfe des NVM (Node Version Manager/ [Download](https://github.com/creationix/nvm)) explizit die für die Entwicklung verwendete Version installiert werden.
```
// Download and  install a <version>
nvm install <version>
```
Weiteres hierzu siehe: [StackOverflow](https://stackoverflow.com/questions/7718313/how-to-change-to-an-older-version-of-node-js)


### Installation

Das Repository kann auf dem üblichen Weg lokal heruntergeladen werden. Programm wird mit dem folgenden Befehl mit all seinen Dependencies installiert:

```
npm start
```


## Tests

```
Give an example
```

## Weiterführende Dokumentation

### Software-Architektur
* Bild und Beschreibung

### Klassen-Dokumentation
* lorem

### Datenbank-ER-Modell
* lorem

### Design-Entscheidungen
* lorem

### Anleitung zum Deployment
* lorem

## Verwendete Software und Modules
* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/de)

### Node Modules
* [Express](https://expressjs.com/de/)
* [Nodemon](https://nodemon.io/)


## Autor

* **Name: Johannes Koch**
* **Matr.Nr: 22571**
* **Mail: u30394@hs-harz.de**

## Dozent

* **Name: Michael Wilhelm**
* **Mail: mwilhelm@hs-harz.de**


## Lizenz

Dieses Projekt wird unter der MIT-Lizenz lizenziert. Details unter: [LICENCE.md](LICENCE.md)

## Anerkennung

* Daniel Shiffman - The Coding Train: [Building an API with Node.js](https://www.youtube.com/watch?v=P-Upi9TMrBk&list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp)
