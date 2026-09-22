# Frontend Laravel — Maison du Store AM

Cette arborescence est la migration Laravel du frontend existant. Les deux
vues Blade reprennent intégralement le HTML, le contenu, les styles, les
icônes et les comportements des pages statiques ; seule la couche de
chargement est devenue Laravel/Vite.

## Installation dans Laravel

Copier le contenu de ce dossier à la racine d'un projet Laravel récent, sans
écraser les fichiers métier existants :

- `resources/views/home.blade.php` et `resources/views/quote.blade.php` ;
- `resources/css`, `resources/js` et `resources/assets` ;
- les deux routes de présentation de `routes/web.php` (les fusionner avec
  celles existantes) ;
- `vite.config.js` et les dépendances Vite de `package.json`, si le projet ne
  les possède pas déjà.

Puis lancer `npm install`, `npm run build` et les migrations Laravel du
projet. En développement, `npm run dev` suffit avec `php artisan serve`.

## Ce que les vues fournissent au JavaScript

Avant l'entrée Vite, chaque vue initialise `window.MDS.config` avec :

- les URLs `/` et `/devis` ;
- les endpoints API ;
- le jeton CSRF (`<meta name="csrf-token">`) et les en-têtes Laravel
  `X-CSRF-TOKEN` / `X-Requested-With`.

Les modules restent indépendants et les pages statiques de `Frontend/`
continuent de fonctionner en mode démonstration. Côté Laravel, `enabled` est
vrai : aucune donnée n'est simulée.

## Contrat d'API à implémenter

| Endpoint | Méthode | Corps / réponse attendus |
| --- | --- | --- |
| `/api/products` | `GET` | Une liste de produits, ou une ressource Laravel `{ data: [...] }`. |
| `/api/quotes/stores` | `POST` | `{ contact, product, dimensions, notes, submittedAt }` pour un store. |
| `/api/quotes/curtains` | `POST` | Même structure pour un rideau. |
| `/api/appointments` | `POST` | `{ lastName, firstName, phone, email, appointmentType, project, message, date, time, submittedAt }`. |

Un produit peut utiliser les noms `snake_case` de Laravel (`product_type`,
`quote_model`, `is_available`, `is_featured`) ou les noms déjà utilisés par
la maquette. Pour conserver exactement les cartes catalogue, retourner aussi
`id`, `name`, `category`, `reference`, `description`, `features`, `colors`,
`specs`, `price` et les champs d'état.

Les requêtes en erreur doivent renvoyer le format de validation Laravel
standard (`422` avec `errors`). Le frontend affiche déjà un message d'échec
sans perdre la saisie ; le contrôleur peut donc valider et persister les
demandes sans adaptation visuelle.
