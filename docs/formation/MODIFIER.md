# Modifier les formations soi-même

Concerne `Formation_Agent.pptx` et `Formation_Manager.pptx`.

## 1. Avant d'ouvrir

- Installer les trois polices de la charte, gratuites sur Google Fonts : **Cormorant Garamond** (titres), **Inter** (texte), **IBM Plex Mono** (étiquettes). Sans elles, PowerPoint les remplace et la mise en page bouge.
- Logiciel conseillé : PowerPoint. Keynote et Google Slides (Fichier > Importer) fonctionnent aussi, avec de petites différences d'affichage.

## 2. Modifier un texte

Cliquer dans la zone de texte et taper. Les titres et les petites étiquettes or au-dessus (« MODULE 02 · … ») sont des zones de la disposition : leur style suit le masque.

## 3. Changer toutes les diapositives d'un coup

**Affichage > Masque des diapositives**, puis l'une des trois dispositions :

| Disposition | Utilisée pour |
| --- | --- |
| `MDS_COVER` | Couverture et diapositive de fin (fond vert sapin) |
| `MDS_DIVIDER` | Intercalaires de module (fond sapin, grand numéro) |
| `MDS_CONTENT` | Toutes les diapositives de contenu (fond blanc) |

On y change le pied de page (« MAISON DU STORE AM · FORMATION AGENT »), la police et la taille des titres, le numéro de page.

## 4. Notes du formateur

Volet **Notes** sous chaque diapositive (Affichage > Notes). Elles contiennent le déroulé oral et la source de chaque règle dans le code.

## 5. Remplacer une capture d'écran

Clic droit sur l'image > **Changer d'image** > À partir d'un fichier : la taille et la position sont conservées. Les pastilles or numérotées posées sur la capture sont des formes séparées : les déplacer si le nouvel écran est différent.

## 6. Ajouter, déplacer, supprimer des diapositives

- **Ajouter** : dupliquer une diapositive voisine du même module (Ctrl+D). On garde ainsi la frise de module en haut à droite, les cartes et les styles. Sinon : Nouvelle diapositive > disposition `MDS_CONTENT`.
- **Réordonner ou supprimer** : mode **Trieuse de diapositives**. Chaque module est une section : on peut déplacer, réduire ou supprimer un module entier.
- **Frise de module** (ronds or en haut à droite) : le nombre de ronds remplis indique le module. Après un déplacement entre modules, copier la frise d'une diapositive du module d'arrivée.

## 7. Tableaux, pastilles de statut, cartes

- Tableaux : cliquer dans une cellule pour modifier ; Disposition > Insérer une ligne.
- Pastilles de statut (« ✓ Accepté », « ! À traiter »…) : copier-coller une pastille existante puis changer le texte, pour garder la couleur de l'interface.

## 8. Couleurs de la charte

Les couleurs sont appliquées forme par forme : changer le thème PowerPoint ne les modifie pas. Utiliser la pipette ou **Reproduire la mise en forme**, ou saisir le code :

| Couleur | Code |
| --- | --- |
| Vert sapin (fonds sombres) | `#20332C` |
| Or (boutons, frise) | `#C09F6A` |
| Or texte (étiquettes) | `#84642F` |
| Teinte or (encadrés) | `#F6F0E4` |
| Fond alterné | `#F9F8F4` |
| Encre (titres) | `#1C1C1C` |
| Texte | `#353535` |

## 9. Diffuser

**Fichier > Exporter > PDF** pour envoyer une version non modifiable.

## 10. Attention

Les deux fichiers sont aussi produits par le script `build/` (`node build/run.js`). Relancer ce script **écrase toutes les modifications manuelles**. Choisir une seule voie : modifier à la main, ou faire modifier le script (`build/agent.js`, `build/manager.js`) puis régénérer.
