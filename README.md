# Webprogrammierung I (Abgabe: 30.09.2017)

Diese Repository beinhaltet das benötigte Programm um die Aufgabenstellung des Fachs: "Webprogrammierung I" zu erfüllen.

## Aufgabenstellung
Erstellung einer Projekt-Datenbank-Server-Applikation.
### Datenbank Schemata:

| Mitarbeiter            | Abteilungen      | Projekte      | Projekt-Mitarbeiter |
|------------------------|------------------|---------------|---------------------|
| Pindex (PK)            | Pindex (PK)      | Pindex (PK)   | Pindex (PK)         |
| Mitarbeiternummer      | Abteilungsnummer | Projektnummer | Mindex (FK)         |
| Nachname               | Name             | Text          | Prjindex (FK)       |
| Vorname                |                  |               |                     |
| Postleitzahl           |                  |               |                     |
| Ort                    |                  |               |                     |
| Straße / Hausnummer    |                  |               |                     |
| Benutzername           |                  |               |                     |
| Passwort (im Klartext) |                  |               |                     |
| Abteilungsnummer (FK)  |                  |               |                     |

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


#### Node.js
Zunächst muss eine aktuelle Version von Node.js auf dem Rechner installiert werden. Herunterzuladen unter [Nodejs.org](https://nodejs.org/en/)

nach Installation kann die aktuell installierte Version mit folgendem Befehl angezeigt werden:
```
$ node -v
```

* Node.js - Version: **8.5.0** für die Entwicklung verwendet. Sollte eine andere Node-Version zu Problemen führen, kann mithilfe des NVM (Node Version Manager/ [Download](https://github.com/creationix/nvm)) explizit die für die Entwicklung verwendete Version installiert werden.
```
// Download and  install a <version>
$ nvm install <version>
```
Weitere Infos siehe: [StackOverflow](https://stackoverflow.com/questions/7718313/how-to-change-to-an-older-version-of-node-js)

* npm - Version: **5.4.2** für die Entwicklung verwendet. Sollte eine andere npm-Version zu Problemen führen, kann die zur Entwicklung verwendete Version über den folgenden Befehl installiert werden:
```
$ npm install npm@<version> -g
```
Weitere Infos siehe: [npmjs.org](https://www.npmjs.com/get-npm)

#### MongoDB
Als Datenbank wird die dokumentenorientierte noSQL Datenbank *MongoDB* genutzt. ([Download](https://www.mongodb.com/download-center#community))
Der heruntergeladene Ordner muss entpackt werden und sollte durch den Namen *"mongodb"* ersetzt werden.
Für weiterführende Installationshinweise siehe [MongoDB.com/manual](https://docs.mongodb.com/manual/administration/install-community/).

##### **MongoDB auf Mac**
Um direkt die Datenbank zu starten begibt man sich in den Ordner *mongodb/bin*  und führt die *mongod* Datei aus um den Datenbank-Server zu starten.
```
$ cd mongodb/bin
$ ./mongod
```
Um einen Client zu starten muss in einem weiteren Terminal-Fenster im selben ordner *mongodb/bin* die Datei *mongo* ausgeführt werden.
```
$ ./mongo
```
Die Ausführung der Datei kann Adminrechte benötigen. In diesem Fall kann das Problem mit dem folgenden Befehl vor dem Ausführen der *mongod*-Datei behoben werden.
```
$ sudo su <admin-passwort>
```
Die Datenbank-Dateien werden per Default im Ordner */data/db* gespeichert. Dieser kann mit folgendem Befehl erstellt werden
```
$ mkdir -p /data/db
```
---
##### **MongoDB auf Windows**
Um MongoDB auf Windows zu installieren muss die .exe-Datei ausgeführt werden. Per Default wird MongoDB auf C:"&#92;"Program"&#92;"Files"&#92;"MongoDB"&#92;"Server"&#92;"[versions-nummer]\ installiert.
Das Default Data-Directory liegt in "&#92;"data"&#92;"db. Der entsprechende Ordner kann mit dem folgeden Befehl erstellt werden.
```
$ md \data\db
```
Im Ordner MongoDB"&#92;"Server"&#92;"[versions-nummer]"&#92;"bin muss der folgende Befehl getätigt werden um den mongoDB-Server zu starten.
```
$ mongod.exe
```
Im selben Ordner kann der Client über den folgeden Befehl gestartet werden.
```
$ mongo.exe
```
---
### Installation der Applikation

Das Repository kann auf dem üblichen Weg lokal heruntergeladen werden. Das Programm wird mit dem folgenden Befehl mit all seinen Dependencies installiert:

```
$ npm start
```


## Tests
Die REST-API wurde mithilfe des Tools *Postman* getestet. ([Download](https://www.getpostman.com/))

Ausgabe aller Einträge in der DB:
![Postman get all DB Entries](/doc/images/postman__01.png)

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
Alle hier aufgelisteten Module sind in der *package.json* aufgelistet und werden bei der initialen Installation mit installiert.
* [Express](https://expressjs.com/de/) // lightweight layer on top of node.js to build faster web-server
```
$ npm install express
```
* [Nodemon](https://nodemon.io/) // Monitors the Code and restarts the server every time there has been made changes to the code.
```
// mainly for dev. instead of $ node server.js
$ nodemon server.js
```
* [Body-Parser](https://github.com/expressjs/body-parser) // To not get all the data of the body when making a post-request this module helps to parse the request and it will not be shown.
```
$ npm install body-parser
```
* [Mongoose](http://mongoosejs.com/) // elegant mongodb object modeling for node.js
```
$ npm install mongoose
```
* [Express-Generator](https://expressjs.com/de/starter/generator.html) // helps to manage to structure the direcotries, folders and files. by typing
```
$ express
```
and creates all the folders and files as default.

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
* Traversy Media: [RESTful API From Scratch](https://www.youtube.com/watch?v=eB9Fq9I5ocs)
