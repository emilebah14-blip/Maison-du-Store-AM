// Formation Agent — Espace Pro Maison du Store AM.
// Règles reprises de CM-maisondustore/Maison-du-store-AM (Backend/ADMIN.md, routes/staff.php, contrôleurs Staff, services).
const L = require("./lib");
const { HEX, MONO, tb } = L;

module.exports = async function buildAgent(out) {
  const pres = L.createDeck({ audience: "Formation Agent", title: "Formation Agent — Espace Pro" });
  const T = 6;
  const S = (o) => L.content(pres, { total: T, ...o });

  // 1. Couverture -------------------------------------------------------------
  pres.addSection({ title: "Introduction" });
  let s = pres.addSlide({ masterName: "MDS_COVER", sectionTitle: "Introduction" });
  s.addShape(pres.shapes.OVAL, { x: 0.9, y: 0.75, w: 0.9, h: 0.9, fill: { color: HEX.white }, line: { color: HEX.gold, width: 1 }, objectName: "Fond logo" });
  s.addImage({ path: L.img("logo"), x: 0.95, y: 0.8, w: 0.8, h: 0.8, altText: "Logo Maison du Store AM", objectName: "Logo" });
  s.addText([{ text: "Maison du Store AM", options: { breakLine: true, fontFace: L.THEME.headFontFace, fontSize: 20, color: HEX.white } }, { text: "Espace professionnel", options: { fontSize: 12, color: HEX.sapinMuted } }], tb({ x: 1.95, y: 0.85, w: 4, h: 0.8 }));
  s.addText("FORMATION AGENT · ESPACE PRO", { placeholder: "kicker" });
  s.addText("Le terrain, vos devis et vos rendez-vous, au même endroit", { placeholder: "title" });
  s.addText("Parcours complet pour prendre en main l’Espace Pro : prestations du jour, devis sur place, rendez-vous, cas particuliers et réglages personnels.", { placeholder: "body" });
  L.tringle(pres, s, { x: 0.9, y: 6.35, w: 5.5, n: 6, active: 1, dark: true, d: 0.2 });
  s.addText("Accès : maisondustoream.com/admin/connexion", tb({ x: 7.2, y: 6.3, w: 5.3, h: 0.3, align: "right", fontFace: MONO, fontSize: 11, color: HEX.sapinMuted }));
  s.addNotes("Accueil des agents. Durée conseillée : 1 h 30 avec manipulation sur un téléphone. Rappeler que l’Espace Pro est réservé à l’équipe : aucun compte client n’existe. Les écrans montrés sont les maquettes de conception de l’Espace Pro (dossier docs/maquette du projet) ; les règles décrites sont celles du code en production (Backend/ADMIN.md, routes/staff.php).");

  // 2. Parcours -----------------------------------------------------------------
  s = S({ section: "Introduction", kicker: "Parcours de formation", title: "Six modules, du premier login au compte rendu" });
  const mods = [["Prise en main", "Connexion, mot de passe, écran « Aujourd’hui »"], ["Prestations", "Démarrer, suivre et clôturer une intervention"], ["Devis sur place", "Mesures, choix, photos et notes de terrain"], ["Rendez-vous", "Lire et préparer les rendez-vous affectés"], ["Cas particuliers", "Messages d’erreur, réflexes et subtilités"], ["Personnaliser", "Profil, préférences, notifications, routine"]];
  L.tringle(pres, s, { x: 1.35, y: 2.0, w: 10.6, n: 6, active: 6, d: 0.26 });
  mods.forEach(([t, d], i) => {
    const x = 0.6 + i * 2.06;
    L.tag(s, "Module " + String(i + 1).padStart(2, "0"), x + 0.1, 2.55, 1.9);
    s.addText(t, tb({ x: x + 0.1, y: 2.85, w: 1.9, h: 0.45, fontFace: L.THEME.headFontFace, fontSize: 22, color: HEX.ink }));
    s.addText(d, tb({ x: x + 0.1, y: 3.35, w: 1.85, h: 1.0, fontSize: 13, color: HEX.text }));
  });
  L.card(pres, s, { x: 0.6, y: 4.75, w: 12.1, h: 1.8, fill: HEX.goldTint, line: HEX.goldTint, name: "Objectifs" });
  L.tag(s, "À la fin de la formation, vous savez", 0.95, 5.0, 6);
  L.bullets(s, [
    "organiser votre journée depuis « Aujourd’hui » et clôturer chaque prestation avec un compte rendu ;",
    "préparer un devis sur place complet (mesures, choix, photos) que le bureau pourra chiffrer sans vous rappeler ;",
    "réagir seul aux messages de l’Espace Pro et savoir quand passer la main au bureau.",
  ], { x: 0.95, y: 5.32, w: 11.4, h: 1.2, size: 14, space: 4 });
  s.addNotes("Présenter la logique : l’agent travaille surtout sur téléphone, le bureau (Manager et Admin principal) prépare le planning, chiffre et valide. Chaque module se termine par une manipulation.");

  // 3. Rôle ---------------------------------------------------------------------
  s = S({ section: "Introduction", kicker: "Votre rôle", title: "Vous préparez, le bureau chiffre et valide" });
  L.card(pres, s, { x: 0.6, y: 1.75, w: 5.85, h: 4.85, fill: HEX.white, sh: true, name: "Agent" });
  L.tag(s, "Ce que vous faites", 0.95, 2.0, 5);
  L.bullets(s, [
    [{ text: "Vos prestations : ", bold: true }, { text: "consignes, coordonnées du client, avancement et compte rendu." }],
    [{ text: "Vos devis : ", bold: true }, { text: "mesures, choix techniques, photos, notes de terrain, tant que le devis n’est pas validé." }],
    [{ text: "Vos rendez-vous : ", bold: true }, { text: "lecture des rendez-vous qui vous sont affectés." }],
    [{ text: "Votre profil : ", bold: true }, { text: "disponibilité, savoir-faire, communes, jours travaillés." }],
  ], { x: 0.95, y: 2.35, w: 5.3, h: 4.1, size: 14.5, space: 10 });
  L.card(pres, s, { x: 6.85, y: 1.75, w: 5.85, h: 4.85, fill: HEX.panel, name: "Bureau" });
  L.tag(s, "Ce que fait le bureau (Manager, Admin principal)", 7.2, 2.0, 5.3);
  L.bullets(s, [
    [{ text: "Prix, totaux, paiements, PDF chiffrés : ", bold: true }, { text: "jamais visibles par l’agent, contrôlé par le serveur." }],
    [{ text: "Planning : ", bold: true }, { text: "créer, déplacer, annuler les prestations et les rendez-vous." }],
    [{ text: "Validation et acceptation ", bold: true }, { text: "des devis, factures, messagerie client." }],
    [{ text: "Catalogue, clients, comptes : ", bold: true }, { text: "aucun accès global côté agent." }],
  ], { x: 7.2, y: 2.35, w: 5.3, h: 3.4, size: 14.5, space: 10 });
  s.addText("Ce qu’un rôle ne peut pas faire n’apparaît pas dans son menu.", tb({ x: 7.2, y: 5.85, w: 5.3, h: 0.5, fontSize: 13, italic: true, color: HEX.goldText }));
  s.addNotes("Source : tableau « Rôles » de Backend/ADMIN.md et App\\Models\\User (rôles admin, manager, agent). Insister : l’agent ne voit aucun montant, même dans les réponses techniques ; ce n’est pas un oubli d’affichage mais une règle serveur.");

  // MODULE 1 ---------------------------------------------------------------------
  L.divider(pres, { section: "1 · Prise en main", kicker: "Module 01", title: "Prise en main", body: "Se connecter, sécuriser son compte et lire l’écran « Aujourd’hui ».", mod: 1, total: T, notes: "Module court : chaque agent se connecte pendant la séance avec son identifiant et son mot de passe temporaire." });

  s = S({ section: "1 · Prise en main", mod: 1, kicker: "Module 01 · Connexion", title: "Première connexion : changer le mot de passe" });
  let r = L.shot(pres, s, "password", { x: 0.6, y: 1.75, w: 6.6, h: 4.6 }, { align: "left", caption: "Maquette · Mot de passe à changer" });
  L.legend(pres, s, [
    ["Ouvrir /admin/connexion", "Saisir l’identifiant et le mot de passe remis par l’Admin principal."],
    ["Choisir votre mot de passe", "12 caractères minimum, majuscules, minuscules et chiffres, différent du temporaire."],
    ["Les autres sessions se ferment", "Changer le mot de passe déconnecte vos autres appareils."],
    ["Oubli ou blocage", "Pas de réinitialisation publique : demandez à l’Admin principal."],
  ], { x: 7.6, y: 1.8, w: 5.1, rowH: 0.95, gap: 0.22, size: 14 });
  s.addNotes("Tant que le mot de passe temporaire n’est pas remplacé, toutes les pages redirigent vers « Mot de passe » (middleware StaffAccess). Règle de complexité : Password::min(12)->mixedCase()->numbers(), champ « different:current_password ». Après 5 essais erronés en une minute : « Trop de tentatives. Réessayez dans une minute. » Un compte désactivé répond simplement « Identifiants incorrects. »");

  s = S({ section: "1 · Prise en main", mod: 1, kicker: "Module 01 · Votre écran d’accueil", title: "« Aujourd’hui » : votre journée en un coup d’œil" });
  r = L.shot(pres, s, "today", { x: 0.6, y: 1.65, w: 3.4, h: 5.15 }, { align: "left" });
  [[0.93, 0.2], [0.5, 0.355], [0.93, 0.45], [0.93, 0.565], [0.93, 0.73], [0.93, 0.955]].forEach(([fx, fy], i) => L.marker(pres, s, r, i + 1, fx, fy));
  L.legend(pres, s, [
    ["Prochaine intervention", "Heure, type, client, adresse."],
    ["Itinéraire et Appeler", "Ouvre la carte ou le téléphone."],
    ["Consignes du bureau", "Code d’accès, matériel, contraintes."],
    ["Ouvrir la fiche et démarrer", "Passe à la fiche prestation."],
    ["Ensuite aujourd’hui", "Les autres interventions du jour."],
    ["Cette semaine", "Vision des jours suivants."],
  ], { x: 4.55, y: 1.75, w: 4.3, rowH: 0.62, gap: 0.18, size: 13.5 });
  L.card(pres, s, { x: 9.2, y: 1.75, w: 3.5, h: 4.95, fill: HEX.sapin, line: HEX.sapin, name: "Menu agent" });
  L.tag(s, "Votre menu", 9.5, 2.0, 3, HEX.goldLight);
  ["Aujourd’hui", "Mes prestations", "Mes rendez-vous", "Mes devis", "Profil"].forEach((t, i) => {
    s.addText(t, tb({ x: 9.5, y: 2.45 + i * 0.5, w: 3, h: 0.4, fontSize: 15, color: i === 0 ? HEX.white : HEX.sapinText, bold: i === 0 }));
  });
  s.addText("Sur téléphone, le menu devient des onglets en bas d’écran. Le bouton « + Devis sur place » crée un devis depuis la prestation en cours.", tb({ x: 9.5, y: 5.05, w: 3, h: 1.5, fontSize: 12.5, color: HEX.sapinMuted }));
  s.addNotes("Menu agent défini dans StaffInterface::navigation : Aujourd’hui, Mes prestations, Mes rendez-vous, Mes devis, Profil. Le tableau de bord agent affiche la prochaine intervention, les consignes, les boutons Itinéraire et Appeler, puis « Ensuite aujourd’hui » et « Cette semaine ». Faire ouvrir l’écran à chacun.");

  // MODULE 2 ---------------------------------------------------------------------
  L.divider(pres, { section: "2 · Prestations", kicker: "Module 02", title: "Vos prestations", body: "Devis sur place, installation ou service après-vente : une prestation se démarre, se suit et se clôture avec un compte rendu.", mod: 2, total: T, notes: "Le bureau crée les prestations (agent, date, durée, adresse, consignes). L’agent les fait avancer." });

  s = S({ section: "2 · Prestations", mod: 2, kicker: "Module 02 · Cycle d’une prestation", title: "Planifié, En cours, Terminé" });
  r = L.shot(pres, s, "prestation", { x: 0.6, y: 1.65, w: 2.95, h: 5.15 }, { align: "left" });
  const stX = 4.1;
  [["planned", "Le bureau vous affecte la prestation : vous recevez « Nouvelle prestation affectée »."], ["in_progress", "Sur place, vous la passez « En cours »."], ["completed", "Clôture possible uniquement avec un compte rendu rédigé."]].forEach(([k, d], i) => {
    const y = 1.85 + i * 1.12;
    L.card(pres, s, { x: stX, y, w: 4.6, h: 0.95, fill: HEX.white, sh: true, name: "Étape " + k });
    L.badge(pres, s, k, stX + 0.2, y + 0.3, { size: 12 });
    s.addText(d, tb({ x: stX + 1.65, y: y + 0.12, w: 2.85, h: 0.75, fontSize: 12.5, color: HEX.text, valign: "middle" }));
  });
  L.card(pres, s, { x: stX, y: 5.3, w: 4.6, h: 1.4, fill: HEX.panel, name: "Annulé" });
  L.badge(pres, s, "cancelled", stX + 0.2, 5.5, { size: 12 });
  s.addText("Seul le bureau annule ou déplace une prestation. Une prestation Terminée ou Annulée ne se modifie plus.", tb({ x: stX + 0.2, y: 5.9, w: 4.2, h: 0.75, fontSize: 12.5 }));
  L.tag(s, "Trois types de prestation", 9.15, 1.85, 3.6);
  [["Devis sur place", "Mesurer et préparer le devis chez le client."], ["Installation", "Poser ce qui a été vendu."], ["Service après-vente", "Réparer, régler, remplacer."]].forEach(([t, d], i) => {
    s.addText([{ text: t, options: { bold: true, color: HEX.ink, breakLine: true } }, { text: d }], tb({ x: 9.15, y: 2.2 + i * 0.85, w: 3.55, h: 0.75, fontSize: 13.5, color: HEX.text }));
  });
  L.card(pres, s, { x: 9.15, y: 4.85, w: 3.55, h: 1.85, fill: HEX.goldTint, line: HEX.goldTint, name: "Notification" });
  L.tag(s, "Notifications reçues", 9.4, 5.05, 3.2);
  s.addText("« Nouvelle prestation affectée » et « Prestation mise à jour » quand le bureau modifie l’heure, l’adresse ou les consignes.", tb({ x: 9.4, y: 5.35, w: 3.15, h: 1.3, fontSize: 12.5 }));
  s.addNotes("InterventionController::update : statuts planned, in_progress, completed, cancelled. Pour l’agent, « cancelled » est refusé (403) et une prestation completed ou cancelled ne peut plus être modifiée. Le compte rendu (report) est obligatoire si le statut est completed (required_if). Le bureau reçoit les chevauchements : un agent ne peut pas avoir deux prestations sur le même créneau.");

  s = S({ section: "2 · Prestations", mod: 2, kicker: "Module 02 · Exemple pas à pas", title: "16 h, devis sur place chez M. Kacou Hervé" });
  const steps = [
    ["Avant de partir", "Dans « Aujourd’hui », lire les consignes, appuyer sur Itinéraire."],
    ["Sur place", "Ouvrir la fiche, passer la prestation « En cours »."],
    ["Créer le devis", "« + Devis sur place » : le devis est rattaché au client de la prestation."],
    ["Mesurer et photographier", "Une ligne par fenêtre, largeur × hauteur en cm, une photo par ouverture."],
    ["Enregistrer", "Le devis part au bureau en brouillon pour chiffrage."],
    ["Clôturer", "Rédiger le compte rendu puis passer à « Terminé »."],
  ];
  L.tringle(pres, s, { x: 1.15, y: 2.05, w: 11.0, n: 6, active: 6, d: 0.26 });
  steps.forEach(([t, d], i) => {
    const x = 0.6 + i * 2.02;
    L.card(pres, s, { x, y: 2.6, w: 1.88, h: 2.55, fill: i % 2 ? HEX.panel : HEX.white, sh: !(i % 2), name: "Pas " + (i + 1) });
    L.tag(s, "Étape " + (i + 1), x + 0.15, 2.78, 1.6);
    s.addText(t, tb({ x: x + 0.15, y: 3.08, w: 1.6, h: 0.65, fontSize: 14, bold: true, color: HEX.ink }));
    s.addText(d, tb({ x: x + 0.15, y: 3.75, w: 1.62, h: 1.35, fontSize: 12, color: HEX.text }));
  });
  L.card(pres, s, { x: 0.6, y: 5.45, w: 12.1, h: 1.2, fill: HEX.goldTint, line: HEX.goldTint, name: "Exemple compte rendu" });
  L.tag(s, "Exemple de compte rendu", 0.9, 5.6, 4);
  s.addText("« Deux fenêtres mesurées (salon 180 × 220, chambre 120 × 160). Client souhaite une motorisation au salon. Prise électrique à 40 cm à droite. Photos jointes. »", tb({ x: 0.9, y: 5.9, w: 11.5, h: 0.7, fontSize: 13.5, italic: true, color: HEX.text }));
  s.addNotes("Le devis créé depuis une prestation (route interventions.quote) prend la source « Sur place », le statut Brouillon, le client et l’agent de la prestation. Montrer le parcours sur un téléphone avec la prestation de démonstration. Un compte rendu utile dit ce qui a été fait, ce qui reste et ce que le bureau doit savoir.");

  // MODULE 3 ---------------------------------------------------------------------
  L.divider(pres, { section: "3 · Devis sur place", kicker: "Module 03", title: "Le devis sur place", body: "Vous relevez les mesures et les choix ; le bureau chiffre. Un devis bien préparé se valide sans rappeler le client.", mod: 3, total: T, notes: "C’est le cœur du métier de l’agent. Prévoir 25 minutes avec une saisie complète." });

  s = S({ section: "3 · Devis sur place", mod: 3, kicker: "Module 03 · Le formulaire", title: "Quatre blocs : client, choix, fenêtres, notes" });
  r = L.shot(pres, s, "devismobile", { x: 0.6, y: 1.65, w: 3.0, h: 5.15 }, { align: "left" });
  const blocks = [
    ["Client", "Nom ou raison sociale et téléphone obligatoires, adresse obligatoire, prénom et e-mail facultatifs, commune."],
    ["Choix communs", "Type : Rideaux, Voilages, Rideaux et voilages ou Stores. Motorisé ou non, finition compatible, zone Abidjan ou hors Abidjan."],
    ["Fenêtres", "De 1 à 30. Libellé, largeur et hauteur en cm, notes, une photo (JPG, PNG ou WebP, 2 Mo maximum)."],
    ["Notes de terrain", "Accès, support, contraintes, souhaits du client : tout ce qui aide le chiffrage."],
  ];
  blocks.forEach(([t, d], i) => {
    const x = 3.85 + (i % 2) * 4.45, y = 1.75 + Math.floor(i / 2) * 2.15;
    L.card(pres, s, { x, y, w: 4.25, h: 1.95, fill: HEX.white, sh: true, name: t });
    s.addShape(pres.shapes.OVAL, { x: x + 0.25, y: y + 0.25, w: 0.34, h: 0.34, fill: { color: HEX.sapin }, line: { color: HEX.sapin }, objectName: "Num " + t });
    s.addText(String(i + 1), tb({ x: x + 0.25, y: y + 0.25, w: 0.34, h: 0.34, align: "center", valign: "middle", fontFace: MONO, fontSize: 11, color: HEX.white, bold: true }));
    s.addText(t, tb({ x: x + 0.75, y: y + 0.24, w: 3.3, h: 0.4, fontSize: 16, bold: true, color: HEX.ink }));
    s.addText(d, tb({ x: x + 0.25, y: y + 0.75, w: 3.8, h: 1.15, fontSize: 12.5, color: HEX.text }));
  });
  L.card(pres, s, { x: 3.85, y: 6.05, w: 8.85, h: 0.65, fill: HEX.goldTint, line: HEX.goldTint, name: "Interdits" });
  s.addText([{ text: "Champs réservés au bureau : ", options: { bold: true, color: HEX.goldText } }, { text: "prix, lignes de vente, taxe, paiements, dates du devis et de pose, agent affecté." }], tb({ x: 4.1, y: 6.12, w: 8.4, h: 0.5, fontSize: 13, valign: "middle" }));
  s.addNotes("Validation serveur AgentQuoteData::validate : contact.lastName, phone et address requis ; email et firstName facultatifs ; windows min 1 max 30 ; largeur et hauteur numériques (la virgule est acceptée et convertie). Les champs lines, pricing, tax, payment, deposit, dates, agent_id sont « prohibited » pour l’agent. Photo : QuotePhotos, une image par ouverture.");

  s = S({ section: "3 · Devis sur place", mod: 3, kicker: "Module 03 · Personnaliser une fenêtre", title: "Choix communs ou fenêtre personnalisée" });
  L.card(pres, s, { x: 0.6, y: 1.8, w: 3.9, h: 4.8, fill: HEX.sapin, line: HEX.sapin, name: "Choix communs" });
  L.tag(s, "Choix communs du devis", 0.9, 2.05, 3.4, HEX.goldLight);
  [["Type", "Rideaux et voilages"], ["Motorisation", "Non"], ["Finition", "Plis flamands"], ["Zone", "Abidjan"]].forEach(([k, v], i) => {
    s.addText([{ text: k, options: { color: HEX.sapinMuted, fontSize: 12, breakLine: true } }, { text: v, options: { color: HEX.white, fontSize: 16, bold: true } }], tb({ x: 0.9, y: 2.5 + i * 0.95, w: 3.3, h: 0.8 }));
  });
  const wins = [
    ["01 · Salon", "260 × 240 cm", "Utilise les choix communs", "ok", "Rideaux et voilages, plis flamands"],
    ["02 · Chambre", "140 × 180 cm", "Utilise les choix communs", "ok", "Rideaux et voilages, plis flamands"],
    ["03 · Bureau", "120 × 150 cm", "Personnalisée", "progress", "Store, motorisé, finition compatible moteur"],
  ];
  wins.forEach(([n, dim, mode, tone, res], i) => {
    const y = 1.8 + i * 1.65;
    s.addShape(pres.shapes.LINE, { x: 4.55, y: y + 0.72, w: 0.6, h: 0, line: { color: tone === "ok" ? HEX.gold : HEX.lineStrong, width: 1.5, dashType: tone === "ok" ? "solid" : "dash", endArrowType: "triangle" }, objectName: "Flèche " + n });
    L.card(pres, s, { x: 5.25, y, w: 7.45, h: 1.45, fill: tone === "ok" ? HEX.white : HEX.goldTint, line: tone === "ok" ? HEX.line : HEX.gold, sh: tone === "ok", name: n });
    s.addText(n, tb({ x: 5.5, y: y + 0.2, w: 2.4, h: 0.4, fontSize: 16, bold: true, color: HEX.ink }));
    s.addText(dim, tb({ x: 5.5, y: y + 0.65, w: 2.4, h: 0.35, fontFace: MONO, fontSize: 13, color: HEX.text }));
    L.badge(pres, s, "x", 8.0, y + 0.22, { label: mode, tone, glyph: tone === "ok" ? "✓" : "◐", size: 11.5, w: 2.9 });
    s.addText(res, tb({ x: 8.0, y: y + 0.72, w: 4.5, h: 0.6, fontSize: 13, color: HEX.text }));
  });
  s.addText("Décocher « Utiliser les choix communs » ou changer une sélection ne modifie que la fenêtre concernée : un même devis peut mêler rideaux et stores.", tb({ x: 5.25, y: 6.75 - 0.05, w: 7.45, h: 0.3, fontSize: 12, italic: true, color: HEX.goldText }));
  s.addNotes("ADMIN.md, formulaire de devis interne, point 3 : les choix communs s’appliquent aux fenêtres qui les utilisent ; décocher l’option ou changer une sélection personnalise uniquement la fenêtre. Côté serveur (AgentQuoteData), une fenêtre « inherit_defaults » reprend type, motorisation, finition et zone du devis. La finition doit être compatible avec la catégorie et la motorisation, sinon : « Choisissez une finition disponible pour ce type de projet. »");

  s = S({ section: "3 · Devis sur place", mod: 3, kicker: "Module 03 · Après l’enregistrement", title: "Ce que devient votre devis au bureau" });
  const qs = [["pending", "Demande reçue", "Demande du site, à traiter par le bureau."], ["draft", "Votre préparation", "Modifiable par vous tant qu’il n’est pas validé."], ["approved", "Chiffré et validé", "Le bureau a vérifié les prix et la pose."], ["accepted", "Accord du client", "Document verrouillé, plus aucune modification."]];
  qs.forEach(([k, t, d], i) => {
    const x = 0.6 + i * 3.08;
    L.card(pres, s, { x, y: 1.85, w: 2.88, h: 2.3, fill: HEX.white, sh: true, name: "Statut " + k });
    L.badge(pres, s, k, x + 0.22, 2.08, { size: 12 });
    s.addText(t, tb({ x: x + 0.22, y: 2.6, w: 2.5, h: 0.4, fontSize: 15, bold: true, color: HEX.ink }));
    s.addText(d, tb({ x: x + 0.22, y: 3.05, w: 2.5, h: 1.0, fontSize: 12.5, color: HEX.text }));
    if (i < 3) s.addShape(pres.shapes.LINE, { x: x + 2.9, y: 3.0, w: 0.16, h: 0, line: { color: HEX.gold, width: 1.5, endArrowType: "triangle" }, objectName: "Suite " + i });
  });
  L.card(pres, s, { x: 0.6, y: 4.45, w: 5.95, h: 2.2, fill: HEX.panel, name: "Modification" });
  L.tag(s, "Si vous modifiez un devis déjà chiffré", 0.9, 4.65, 5.5);
  s.addText("Le devis repasse en brouillon et le bureau doit revérifier le chiffrage avant toute validation. Les montants précédents sont conservés en attendant.", tb({ x: 0.9, y: 5.0, w: 5.4, h: 1.5, fontSize: 14 }));
  L.card(pres, s, { x: 6.75, y: 4.45, w: 5.95, h: 2.2, fill: HEX.panel, name: "Autres statuts" });
  L.tag(s, "Autres issues possibles", 7.05, 4.65, 5.5);
  let bx = 7.05; bx += L.badge(pres, s, "rejected", bx, 5.05, { size: 12 }) + 0.15; L.badge(pres, s, "cancelled", bx, 5.05, { size: 12 });
  s.addText("Refusé par le client ou annulé par le bureau. Le dossier reste consultable.", tb({ x: 7.05, y: 5.55, w: 5.4, h: 0.9, fontSize: 14 }));
  s.addNotes("Statuts et glyphes : StaffInterface::STATUSES. Un agent peut enregistrer un devis en statut pending ou draft uniquement (QuoteController::update). Toute mise à jour du formulaire par un agent pose « pricing_review_required » : le bureau ne peut pas valider avant d’avoir recalculé. Devis accepté ou facturé : « Devis accepté ou facturé : document verrouillé. »");

  // MODULE 4 ---------------------------------------------------------------------
  L.divider(pres, { section: "4 · Rendez-vous", kicker: "Module 04", title: "Vos rendez-vous", body: "Vous consultez les rendez-vous qui vous sont affectés ; le bureau les confirme, les déplace ou les annule.", mod: 4, total: T });

  s = S({ section: "4 · Rendez-vous", mod: 4, kicker: "Module 04 · Lire son agenda", title: "Mes rendez-vous : semaine, jour ou liste" });
  r = L.shot(pres, s, "rdvmobile", { x: 0.6, y: 1.65, w: 3.0, h: 5.15 }, { align: "left" });
  L.tag(s, "Ce que vous voyez", 4.2, 1.85, 4);
  L.bullets(s, [
    "Uniquement les rendez-vous qui vous sont affectés, en lecture.",
    "Trois vues : Semaine, Jour, Liste (filtrable par statut).",
    "Pour chaque rendez-vous : client, lieu, objet, Appeler et Itinéraire.",
  ], { x: 4.2, y: 2.2, w: 4.2, h: 2.2, size: 14 });
  L.tag(s, "Statuts", 4.2, 4.45, 4);
  let yb = 4.8; ["pending", "confirmed", "completed", "cancelled"].forEach((k, i) => L.badge(pres, s, k, 4.2 + (i % 2) * 1.75, yb + Math.floor(i / 2) * 0.5, { size: 12 }));
  L.card(pres, s, { x: 8.75, y: 1.8, w: 3.95, h: 4.85, fill: HEX.panel, name: "Règles agenda" });
  L.tag(s, "Règles de l’agenda", 9.05, 2.05, 3.5);
  L.bullets(s, [
    [{ text: "Créneaux : ", bold: true }, { text: "8 h, 9 h, 10 h, 11 h, 14 h, 15 h, 16 h, 17 h." }],
    [{ text: "Fermé le dimanche, ", bold: true }, { text: "réservation jusqu’à 3 mois et au moins 1 h à l’avance." }],
    [{ text: "Types : ", bold: true }, { text: "au showroom, à domicile, par téléphone ou visio." }],
    [{ text: "Un changement ? ", bold: true }, { text: "Appelez le bureau : seul le bureau déplace ou annule." }],
  ], { x: 9.05, y: 2.4, w: 3.45, h: 4.1, size: 13.5, space: 9 });
  s.addNotes("AppointmentController::index : vues semaine, jour, liste ; l’agent ne voit que ses rendez-vous (agent_id). La mise à jour (update) est dans le groupe « admin » : refusée à l’agent. Créneaux et règles : config/appointments.php (slots, closed_weekdays [0] = dimanche, lead_minutes 60, months_ahead 3).");

  // MODULE 5 ---------------------------------------------------------------------
  L.divider(pres, { section: "5 · Cas particuliers", kicker: "Module 05", title: "Cas exceptionnels et subtilités", body: "Les messages que vous pouvez rencontrer, ce qu’ils veulent dire et le bon réflexe.", mod: 5, total: T, notes: "Faire lire chaque message à voix haute : ce sont les textes exacts affichés par l’Espace Pro." });

  const caseRows1 = [
    ["Le devis est ouvert sur deux appareils", "« Ce devis a été modifié dans une autre fenêtre. Rechargez-le avant de reprendre la saisie. »", "Recharger, vérifier, ressaisir seulement ce qui manque."],
    ["Le client est un dossier archivé", "« Ce dossier est archivé ou ne correspond pas à un client. Admin-CM doit vérifier le dossier. »", "Prévenir le bureau, ne pas créer de doublon."],
    ["Finition qui ne va pas avec le type ou le moteur", "« Choisissez une finition disponible pour ce type de projet. »", "Choisir une finition proposée ; noter le souhait du client."],
    ["Photo refusée", "« Photo d’ouverture : choisissez une image JPG, PNG ou WebP de 2 Mo maximum. »", "Reprendre la photo plus légère, puis la sélectionner de nouveau."],
    ["Clôture sans compte rendu", "Le champ compte rendu est exigé pour passer à « Terminé ».", "Rédiger le compte rendu puis clôturer."],
  ];
  s = S({ section: "5 · Cas particuliers", mod: 5, kicker: "Module 05 · Cas exceptionnels (1/2)", title: "Pendant la saisie : message et réflexe" });
  L.table(pres, s, ["Situation", "Message de l’Espace Pro", "Votre réflexe"], caseRows1, { x: 0.6, y: 1.75, w: 12.1, colW: [3.2, 5.3, 3.6], size: 12.5, rowH: 0.8 });
  s.addNotes("Messages exacts : QuoteFormController (edit_version, contact archivé), AgentQuoteData (finition), QuotePhotos (photo), InterventionController (report required_if completed). Après une erreur de validation, un fichier choisi doit être sélectionné de nouveau : les navigateurs ne le conservent pas.");

  const caseRows2 = [
    ["Trop d’essais de connexion", "« Trop de tentatives. Réessayez dans une minute. »", "Attendre une minute ; en cas d’oubli, appeler l’Admin principal."],
    ["Lien vers un devis ou une prestation qui n’est pas à vous", "Accès refusé (erreur 403).", "Normal : demander au bureau si vous devez y avoir accès."],
    ["Devis accepté ou facturé", "« Devis accepté ou facturé : document verrouillé. »", "Signaler toute correction au bureau, qui décide."],
    ["Client sans adresse e-mail", "Aucun message : l’e-mail est facultatif.", "Saisir le téléphone avec soin, il devient le contact principal."],
    ["Chantier hors Abidjan", "Zone « Hors Abidjan » à choisir.", "Le bureau chiffrera la pose explicitement ; préciser l’accès en notes."],
    ["Plus de 30 fenêtres", "Le formulaire s’arrête à 30 fenêtres.", "Prévenir le bureau avant de poursuivre."],
  ];
  s = S({ section: "5 · Cas particuliers", mod: 5, kicker: "Module 05 · Cas exceptionnels (2/2)", title: "Accès, verrous et chantiers hors norme" });
  L.table(pres, s, ["Situation", "Ce que vous voyez", "Votre réflexe"], caseRows2, { x: 0.6, y: 1.75, w: 12.1, colW: [3.2, 4.6, 4.3], size: 12.5, rowH: 0.7 });
  s.addNotes("AuthController (RateLimiter 5 tentatives), contrôles abort 403 sur devis et prestations, QuoteController (verrou), AgentQuoteData (email nullable, zone abidjan|other, windows max 30). ADMIN.md : hors Abidjan, la pose des stores doit être chiffrée explicitement.");

  s = S({ section: "5 · Cas particuliers", mod: 5, kicker: "Module 05 · Subtilités", title: "Six détails qui évitent les allers-retours" });
  const subs = [
    ["Accès au devis lié", "Vous pouvez ouvrir le devis lié à votre prestation, même affecté à un autre agent : lecture technique seule, sans prix. L’accès disparaît si la prestation est réaffectée ou annulée."],
    ["Coordonnées vérifiées", "Votre saisie rattache le client à son dossier sans écraser les coordonnées déjà vérifiées par le bureau."],
    ["Mesures en centimètres", "Largeur × hauteur en cm. La virgule est acceptée (120,5). Le bureau convertit pour le chiffrage."],
    ["Une photo par ouverture", "Photographiez la fenêtre entière et le support de fixation : c’est ce qui manque le plus souvent."],
    ["Options retirées", "Une option retirée du catalogue reste sur les devis enregistrés ; à la prochaine modification, remplacez-la."],
    ["Enregistrer, c’est envoyer", "Seul « Enregistrer » écrit en base. Ne quittez pas l’écran avant la confirmation."],
  ];
  subs.forEach(([t, d], i) => {
    const x = 0.6 + (i % 3) * 4.07, y = 1.8 + Math.floor(i / 3) * 2.45;
    L.card(pres, s, { x, y, w: 3.9, h: 2.25, fill: i % 2 ? HEX.panel : HEX.white, sh: !(i % 2), name: t });
    s.addText(t, tb({ x: x + 0.25, y: y + 0.22, w: 3.4, h: 0.4, fontSize: 15.5, bold: true, color: HEX.ink }));
    s.addText(d, tb({ x: x + 0.25, y: y + 0.68, w: 3.45, h: 1.5, fontSize: 12.5, color: HEX.text }));
  });
  s.addNotes("Sources : ADMIN.md (accès indirect : même client, sans prix ni PDF, retiré à la réaffectation ou annulation ; dossiers créés sans écraser les coordonnées vérifiées ; options devenues incompatibles à remplacer ; « Seul Enregistrer le devis écrit la saisie en base »). AgentQuoteData convertit la virgule en point.");

  // MODULE 6 ---------------------------------------------------------------------
  L.divider(pres, { section: "6 · Personnaliser", kicker: "Module 06", title: "Votre espace, vos réglages", body: "Un profil à jour aide le bureau à vous confier les bonnes prestations.", mod: 6, total: T });

  s = S({ section: "6 · Personnaliser", mod: 6, kicker: "Module 06 · Profil", title: "Mon profil : terrain et savoir-faire" });
  r = L.shot(pres, s, "profilagent", { x: 0.6, y: 1.65, w: 7.2, h: 4.95 }, { align: "left", caption: "Maquette · Modifier mon profil (agent)" });
  L.legend(pres, s, [
    ["Identité et coordonnées", "Civilité, fonction affichée, téléphone pro, joignable sur WhatsApp."],
    ["Communes couvertes", "Oui ou non pour les 13 communes d’Abidjan et « Hors Abidjan »."],
    ["Savoir-faire", "Stores, rideaux et voilages, motorisation, électroménager, meubles, SAV."],
    ["Jours, horaires, urgence", "Jours travaillés, horaires, contact en cas d’urgence."],
    ["Disponibilité", "Disponible ou absent, photo de couverture."],
  ], { x: 8.2, y: 1.75, w: 4.5, rowH: 0.78, gap: 0.2, size: 13 });
  s.addNotes("ProfileController::updateProfile, branche agent : skills, hours, emergency_name, emergency_phone, skill_list (SKILLS), days (lun..dim), zone_list (communes de StaffInterface::COMMUNES + Hors Abidjan), availability (available, away), whatsapp, cover (image 2 Mo). L’adresse e-mail de connexion se change via le bureau.");

  s = S({ section: "6 · Personnaliser", mod: 6, kicker: "Module 06 · Paramètres", title: "Thème, animations, notifications et sécurité" });
  r = L.shot(pres, s, "theme", { x: 0.6, y: 1.75, w: 7.0, h: 2.6 }, { align: "left", caption: "Maquette · Paramètres, choix du thème" });
  const prefs = [
    ["Thème", "Clair, Sombre ou Automatique. Il suit votre compte sur tous vos appareils ; les PDF et e-mails restent clairs."],
    ["Réduire les animations", "Pour un téléphone plus lent ou par confort visuel."],
    ["Formats", "Fixés pour toute l’équipe : dates JJ/MM/AAAA, heures sur 24 h."],
  ];
  prefs.forEach(([t, d], i) => s.addText([{ text: t, options: { bold: true, color: HEX.ink, breakLine: true } }, { text: d }], tb({ x: 0.6 + i * 2.4, y: 4.95, w: 2.25, h: 1.7, fontSize: 12.5, color: HEX.text })));
  L.card(pres, s, { x: 8.0, y: 1.75, w: 4.7, h: 2.35, fill: HEX.panel, name: "Notifications" });
  L.tag(s, "Notifications", 8.3, 1.95, 4);
  s.addText("Les alertes arrivent dans votre espace (cloche). Activez ou coupez les notifications du navigateur depuis le menu de votre compte, sur chaque appareil.", tb({ x: 8.3, y: 2.3, w: 4.2, h: 1.7, fontSize: 13 }));
  L.card(pres, s, { x: 8.0, y: 4.3, w: 4.7, h: 2.35, fill: HEX.sapin, line: HEX.sapin, name: "Sécurité" });
  L.tag(s, "Téléphone perdu ?", 8.3, 4.5, 4, HEX.goldLight);
  s.addText("« Se déconnecter de tous les autres appareils » (mot de passe actuel demandé), puis changez votre mot de passe. Prévenez le bureau.", tb({ x: 8.3, y: 4.85, w: 4.2, h: 1.7, fontSize: 13, color: HEX.white }));
  s.addNotes("settings.blade.php et ProfileController::updateSettings : theme light|dark|auto, reduce_motion. logoutOthers exige current_password. Les notifications du navigateur passent par l’abonnement push (routes push/abonnement). Le thème sombre existe aussi en maquette (ProParametresSombre).");

  s = S({ section: "6 · Personnaliser", mod: 6, kicker: "Module 06 · Routine", title: "Une journée type sur le terrain" });
  const day = [["7 h 30", "Ouvrir « Aujourd’hui »", "Lire les consignes de chaque intervention, vérifier le matériel."], ["Sur la route", "Itinéraire, Appeler", "Prévenir le client depuis la fiche en cas de retard."], ["Chez le client", "Démarrer", "Passer la prestation « En cours »."], ["Mesures", "Devis sur place", "Fenêtres, choix, photos, notes ; Enregistrer."], ["Avant de partir", "Compte rendu", "Rédiger puis passer à « Terminé »."], ["Fin de journée", "Cloche et semaine", "Lire les notifications et préparer demain."]];
  L.tringle(pres, s, { x: 1.1, y: 1.95, w: 11.1, n: 6, active: 6, d: 0.24 });
  day.forEach(([h, t, d], i) => {
    const x = 0.6 + i * 2.02;
    s.addText(h, tb({ x, y: 2.4, w: 1.9, h: 0.35, fontFace: MONO, fontSize: 12, color: HEX.goldText, align: "center" }));
    L.card(pres, s, { x, y: 2.85, w: 1.88, h: 2.3, fill: HEX.white, sh: true, name: "Moment " + (i + 1) });
    s.addText(t, tb({ x: x + 0.15, y: 3.02, w: 1.6, h: 0.65, fontSize: 14, bold: true, color: HEX.ink }));
    s.addText(d, tb({ x: x + 0.15, y: 3.7, w: 1.6, h: 1.4, fontSize: 12, color: HEX.text }));
  });
  L.card(pres, s, { x: 0.6, y: 5.45, w: 12.1, h: 1.2, fill: HEX.goldTint, line: HEX.goldTint, name: "Checklist" });
  L.tag(s, "Avant de quitter un client", 0.9, 5.6, 4);
  s.addText([{ text: "☐ Toutes les fenêtres mesurées et nommées      ☐ Une photo par ouverture      ☐ Motorisation et zone renseignées", options: { breakLine: true } }, { text: "☐ Notes d’accès et contraintes      ☐ Devis enregistré      ☐ Compte rendu rédigé" }], tb({ x: 0.9, y: 5.92, w: 11.6, h: 0.6, fontSize: 13, color: HEX.text }));
  s.addNotes("Faire remplir la checklist sur un cas réel. Rappeler qu’un compte rendu vide empêche la clôture.");

  // Quiz -----------------------------------------------------------------------
  pres.addSection({ title: "Évaluation" });
  const quiz = [
    ["Le client demande le prix pendant la visite. Que répondez-vous ?", "Le bureau chiffre et valide le devis ; vous ne voyez aucun montant. Annoncez un délai de retour."],
    ["Pourquoi ne pouvez-vous pas passer la prestation à « Terminé » ?", "Le compte rendu est obligatoire pour clôturer."],
    ["Le client veut déplacer son rendez-vous de demain.", "Seul le bureau déplace ou annule : transmettez la demande."],
    ["Deux fenêtres en rideaux, une en store motorisé : un ou deux devis ?", "Un seul : personnalisez la troisième fenêtre."],
    ["« Ce devis a été modifié dans une autre fenêtre… » Que faire ?", "Recharger le devis avant de reprendre la saisie."],
    ["Vous avez perdu votre téléphone.", "Déconnecter les autres appareils, changer le mot de passe, prévenir le bureau."],
  ];
  s = L.content(pres, { section: "Évaluation", kicker: "Auto-évaluation", title: "Six questions pour vérifier les acquis" });
  quiz.forEach(([q], i) => {
    const x = 0.6 + (i % 2) * 6.15, y = 1.8 + Math.floor(i / 2) * 1.6;
    L.card(pres, s, { x, y, w: 5.95, h: 1.4, fill: i % 2 ? HEX.panel : HEX.white, sh: !(i % 2), name: "Question " + (i + 1) });
    s.addText("Q" + (i + 1), tb({ x: x + 0.25, y: y + 0.25, w: 0.6, h: 0.5, fontFace: L.THEME.headFontFace, fontSize: 26, color: HEX.goldText }));
    s.addText(q, tb({ x: x + 0.95, y: y + 0.25, w: 4.8, h: 1.0, fontSize: 14, color: HEX.ink, valign: "middle" }));
  });
  s.addNotes("Laisser 5 minutes. Les réponses sont sur la diapositive suivante.");
  s = L.content(pres, { section: "Évaluation", kicker: "Auto-évaluation · Réponses", title: "Les bonnes réponses" });
  L.table(pres, s, ["Question", "Réponse"], quiz.map(([q, a], i) => [{ text: "Q" + (i + 1) + ". " + q }, a]), { x: 0.6, y: 1.75, w: 12.1, colW: [5.6, 6.5], size: 12.5, rowH: 0.7 });
  s.addNotes("Corriger collectivement. Revenir au module concerné si une réponse pose problème.");

  // Aide et clôture -------------------------------------------------------------
  s = L.content(pres, { section: "Évaluation", kicker: "Aide", title: "Qui contacter, et pour quoi" });
  const help = [["Bureau (Manager ou Admin principal)", "Déplacer ou annuler un rendez-vous ou une prestation, accès à un devis, dossier client archivé, question de prix."], ["Admin principal", "Mot de passe oublié, compte bloqué ou désactivé, changement d’adresse e-mail de connexion."], ["Messagerie de l’entreprise", "contact@maisondustoream.com"]];
  help.forEach(([t, d], i) => {
    const y = 1.8 + i * 1.6;
    L.card(pres, s, { x: 0.6, y, w: 12.1, h: 1.4, fill: i === 1 ? HEX.panel : HEX.white, sh: i !== 1, name: t });
    s.addText(t, tb({ x: 0.95, y: y + 0.25, w: 4.2, h: 0.9, fontSize: 17, bold: true, color: HEX.ink, valign: "middle" }));
    s.addText(d, tb({ x: 5.3, y: y + 0.25, w: 7.1, h: 0.9, fontSize: 14, color: HEX.text, valign: "middle" }));
  });
  s.addNotes("Aucune réinitialisation publique n’existe : l’Admin principal remet un mot de passe temporaire depuis « Équipe » (ADMIN.md, Installation et première connexion).");

  s = pres.addSlide({ masterName: "MDS_COVER", sectionTitle: "Évaluation" });
  s.addText("FIN DE LA FORMATION AGENT", { placeholder: "kicker" });
  s.addText("À vous de jouer sur le terrain", { placeholder: "title" });
  s.addText("Ouvrez « Aujourd’hui », démarrez, mesurez, enregistrez, rédigez le compte rendu.", { placeholder: "body" });
  L.tringle(pres, s, { x: 0.9, y: 6.35, w: 5.5, n: 6, active: 6, dark: true, d: 0.2 });
  s.addNotes("Remettre à chaque agent ses identifiants et vérifier que tous ont changé leur mot de passe temporaire avant la fin de la séance.");

  await pres.writeFile({ fileName: out });
  await require("/root/.claude/skills/synced/9f51262c-e417-40f4-9cb6-a349697abd6a_a4ce3e49-9717-4792-8e6b-0d0d16105c75/pptx/scripts/apply_theme.js").applyTheme(out, L.THEME);
};
