# Führungsharke
Unter [fuehrungsharke.github.io](https://fuehrungsharke.github.io/) kann eine eigene Führungsharke erstellt werden. Diese kann als Vektorgrafik (`*.svg`) heruntergeladen werden.

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
| Platzhalter | ![Platzhalter](./signs/Empty.svg)<br>\[Platzhalter\] |

## Bildnachweise
| Bild | Quelle | Lizenz |
| --- | --- | --- |
| <img src="./icons/orgs/Bundespolizei.svg" alt="BPOL" width="35"/> | https://de.wikipedia.org/wiki/Datei:Bundespolizei-Logos.svg | Gemeinfrei |
| <img src="./icons/orgs/Bundeswehr.svg" alt="BW" width="35"/> | https://de.wikipedia.org/wiki/Datei:Logo_of_the_Bundeswehr.svg | Gemeinfrei |
| <img src="./icons/orgs/THW.svg" alt="THW" width="35"/> | https://de.wikipedia.org/wiki/Datei:THW.svg | Gemeinfrei |

# How to run
Für die lokale Entwicklung kann auf Docker zurückgegriffen werden. Dazu muss Docker auf dem System installiert sein (siehe [Offizielle Dokumentation]](https://docs.docker.com/engine/install/))

Wenn Docker auf dem Host installiert ist, genügt es folgende Dockerbefehle auszuführen:
<code>docker build . -t fuehrungsharke</code> - Baut das Docker Image lokal unter dem Namen "fuehrungsharke"
<code>docker run --name fuehark --rm -p 8080:3000 fuehrungsharke</code> - Erstellt den Container, führt ihn aus und ermöglicht den Zugriff auf die Applikation auf "localhost:8080". Durch STRG+C kann die Ausführung gestoptt und der Container gelöscht werden.