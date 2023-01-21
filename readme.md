# Führungsharke
Unter [fuehrungsharke.github.io](https://fuehrungsharke.github.io/) kann eine eigene Führungsharke erstellt werden. Diese kann als Vektorgrafik (`*.svg`) heruntergeladen werden.

## Beispiele

### Technischer Zug mit Bergungsgruppe und Fachgruppe Notversorgung / Notinstandsetzung
![Technischer Zug mit Bergungsgruppe und Fachgruppe Notversorgung / Notinstandsetzung](./examples/TZ_B_N.svg)
[Konfigurationsdatei](./examples/TZ_B_N.json)

## Konfiguration
Die Struktur der Führungsharke kann als `*.json`-Datei gespeichert und auch wieder geladen werden.

Folgende Grundzeichen können in der Führungsharke konfiguriert und über das Kontextmenü modifiziert werden:
| Bedeutung | Zeichen |
| --- | --- |
| Einheit | ![Einheit](./icons/signs/unit.svg) |
| Person | ![Person](./icons/signs/person.svg) |
| Fahrzeug | ![Fahrzeug](./icons/signs/vehicle.svg) |
| Befehlsstelle | ![Führungsstelle](./icons/signs/flag.svg) |
| Gebäude | ![Gebäude](./icons/signs/building.svg) |
| Gefahr | ![Gebäude](./icons/signs/hazard.svg) |
| Maßnahme | ![Gebäude](./icons/signs/measure.svg) |
| Stelle | ![Gebäude](./icons/signs/place.svg) |
| Zweirad | ![Fahrrad](./icons/signs/bike.svg) |
| Boot | ![Boot](./icons/signs/boat.svg) |
| Platzhalter | ![Platzhalter](./signs/Empty.svg)<br>\[Platzhalter\] |

## Bildnachweise
| Bild | Quelle | Lizenz |
| --- | --- | --- |
| <img src="./icons/orgs/Bundespolizei.svg" alt="BPOL" width="35"/> | https://de.wikipedia.org/wiki/Datei:Bundespolizei-Logos.svg | Gemeinfrei |
| <img src="./icons/orgs/Bundeswehr.svg" alt="BW" width="35"/> | https://de.wikipedia.org/wiki/Datei:Logo_of_the_Bundeswehr.svg | Gemeinfrei |
| <img src="./icons/orgs/THW.svg" alt="THW" width="35"/> | https://de.wikipedia.org/wiki/Datei:THW.svg | Gemeinfrei |
| <img src="./icons/ui/add.svg" width="35"/><img src="./icons/ui/calc.svg" width="35"/><img src="./icons/ui/collapse.svg" width="35"/><img src="./icons/ui/copy.svg" width="35"/><img src="./icons/ui/cut.svg" width="35"/><img src="./icons/ui/decollapse.svg" width="35"/><img src="./icons/ui/delete.svg" width="35"/><img src="./icons/ui/edit.svg" width="35"/><img src="./icons/ui/eye_disabled.svg" width="35"/><img src="./icons/ui/eye.svg" width="35"/><img src="./icons/ui/organisation.svg" width="35"/><img src="./icons/ui/paste.svg" width="35"/><img src="./icons/ui/reset.svg" width="35"/><img src="./icons/ui/sum.svg" width="35"/><img src="./icons/ui/toggle_off.svg" width="35"/><img src="./icons/ui/toggle_on.svg" width="35"/> | https://fonts.google.com/icons | [Creative Commons](https://creativecommons.org/licenses/by-sa/4.0/) |

# How to run
Für die lokale Entwicklung kann auf Docker zurückgegriffen werden. Dazu muss Docker auf dem System installiert sein (siehe [Offizielle Dokumentation](https://docs.docker.com/engine/install/))

Wenn Docker auf dem Host installiert ist, genügt es folgende Dockerbefehle auszuführen:
<p><code>docker build . -t fuehrungsharke</code> - Baut das Docker Image lokal unter dem Namen "fuehrungsharke"</p>
<p><code>docker run --name fuehark --rm -p 8080:3000 fuehrungsharke</code> - Erstellt den Container, führt ihn aus und ermöglicht den Zugriff auf die Applikation auf "localhost:8080". Durch STRG+C kann die Ausführung gestoptt und der Container gelöscht werden.</p>

## Deployment
Die Anwendung muss auf einem Webserver betrieben werden. Ein lokales Betreiben im Dateisystem und Öffnen der Datei `index.html' reicht nicht aus, da dies die "Same Origin Policy" des Browsers verletzt.
Da es nicht weise wäre diese für den Browser Schutzmaßnahme abzuschalten ist der bessere Weg einen kleinen Webserver zu betreiben. Mögliche freie Software ist hier Apache, nginx, lighttpd. Die einzelnen Projekte liefern gute Erklärungen wie man einen einfachen Server installiert,


1. Sobald der Webserver läuft und du dessen Testseite sehen kannst, lade die folgende Datei herunter: `https://github.com/Fuehrungsharke/Fuehrungsharke.github.io/archive/refs/heads/main.zip` das ist die von Github erstellte Zusammenfassung dieser Codesammlung zum aktuellen Stand.
2. Kopiere diese Datei in das Verzeichnis in dem der Webserver seine Webseiten anbietet und entpacke die Datei
3. Die Daten werden nun in den Ordner `Fuehrungsharke.github.io-main` entpackt, verschiebe diese Daten in das Wurzelverzeichnis deines webservers. Den Ordner `Fuehrungsharke.github.io-main` und die Datei `main.zip` kannst du danach löschen.
4. Rufe in deinem Browser die Adresse deines Webservers auf. Du solltest nun die Anwendung sehen.

