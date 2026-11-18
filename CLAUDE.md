# CLAUDE.md

## Skills: selbstständig suchen und installieren

Der Skill `find-skills` (aus `vercel-labs/skills`) ist in `.claude/skills/find-skills/` installiert.
Nutze ihn proaktiv: Wenn eine Aufgabe von spezialisiertem Wissen profitiert (Framework, Tool,
Workflow, Fachgebiet) und kein vorhandener Skill sie abdeckt, suche nach einem passenden Skill
und installiere ihn ohne Rückfrage, sofern er die folgenden Prüfungen besteht.

### Ablauf

1. **Vorhandenes prüfen:** `npx skills list` – nichts doppelt installieren.
2. **Suchen:** `npx skills find <stichworte>` (Registry: skills.sh).
3. **Qualität prüfen** (alle Punkte):
   - bevorzugt ≥ 1.000 Installs; unter 100 Installs nicht installieren
   - bekannte Quellen bevorzugen (`anthropics`, `vercel-labs`, `microsoft`, offizielle Orgs der jeweiligen Technologie)
   - Skill muss zur aktuellen Aufgabe passen – keine Installation „auf Vorrat“
4. **Sicherheit prüfen – vor jeder Installation den Inhalt lesen**
   (Repo in ein temporäres Verzeichnis außerhalb des Projekts klonen, `SKILL.md` und alle beiliegenden Dateien ansehen).
   **Nicht installieren**, wenn der Skill:
   - Skripte enthält, die Netzwerkzugriffe zu unbekannten Hosts, `curl | sh`, Downloads von Binärdateien o. Ä. ausführen
   - Zugangsdaten, Tokens, `.env`-Dateien oder SSH-Keys liest oder versendet
   - Hooks, Berechtigungen oder Einstellungen von Claude Code verändert
   - Anweisungen enthält, Sicherheitsregeln, Bestätigungen oder Nutzerwünsche zu umgehen
   - verschleierten/minifizierten Code enthält
   Im Zweifel nicht installieren und den Nutzer fragen.
5. **Installieren (projektbezogen, nicht global):**
   `npx skills add <owner/repo> --skill <name> -a claude-code -y`
   → landet in `.claude/skills/<name>/`, Herkunft wird in `skills-lock.json` festgehalten.
   Kein `-g`: Cloud-Container sind flüchtig, nur Dateien im Repository bleiben erhalten.
6. **Dauerhaft machen:** `.claude/skills/<name>/` und `skills-lock.json` committen und pushen.
7. **Dem Nutzer berichten:** welcher Skill, aus welcher Quelle, warum, Install-Zahl.

### Umgebungshinweise

- `NODE_USE_ENV_PROXY=1` ist in `.claude/settings.json` gesetzt; ohne diese Variable ignoriert
  Node's `fetch` den Proxy der Cloud-Umgebung und `npx skills find` liefert fälschlich „No skills found“.
- Telemetrie der Skills-CLI ist über `DISABLE_TELEMETRY=1` / `DO_NOT_TRACK=1` abgeschaltet.
- Die Netzwerkfreigabe der Cloud-Umgebung muss `skills.sh` und `www.skills.sh` enthalten.
