# Formations Espace Pro

- `Formation_Agent.pptx` : 27 diapositives, 6 modules (prise en main, prestations, devis sur place, rendez-vous, cas particuliers, personnalisation), quiz et notes de l'intervenant.
- `Formation_Manager.pptx` : 32 diapositives, 6 modules (pilotage, devis et chiffrage, planning, gestion, cas particuliers, routines), quiz et notes de l'intervenant.

Les règles décrites viennent du code de l'Espace Pro (`CM-maisondustore/Maison-du-store-AM` : `Backend/ADMIN.md`, `QUOTE-PRICING.md`, `routes/staff.php`, contrôleurs `Staff`). Les captures sont les maquettes de conception (`Backend/docs/maquette`). Charte : `css/variables.css` et les tokens de l'Espace Pro (vert sapin, or, Cormorant Garamond, Inter, IBM Plex Mono). Les polices doivent être installées sur le poste qui projette.

Régénérer : `build/capture-maquettes.js` (captures Playwright), puis `node build/run.js` avec `pptxgenjs` installé et le script `apply_theme.js` du skill pptx.
