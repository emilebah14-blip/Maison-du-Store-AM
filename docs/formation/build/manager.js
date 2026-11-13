// Formation Manager — Espace Pro Maison du Store AM.
// Règles reprises de CM-maisondustore/Maison-du-store-AM (Backend/ADMIN.md, QUOTE-PRICING.md, routes/staff.php, contrôleurs Staff, services).
const L = require("./lib");
const { HEX, MONO, tb } = L;

module.exports = async function buildManager(out) {
  const pres = L.createDeck({ audience: "Formation Manager", title: "Formation Manager — Espace Pro" });
  const T = 6;
  const S = (o) => L.content(pres, { total: T, ...o });

  // 1. Couverture -------------------------------------------------------------
  pres.addSection({ title: "Introduction" });
  let s = pres.addSlide({ masterName: "MDS_COVER", sectionTitle: "Introduction" });
  s.addShape(pres.shapes.OVAL, { x: 0.9, y: 0.75, w: 0.9, h: 0.9, fill: { color: HEX.white }, line: { color: HEX.gold, width: 1 }, objectName: "Fond logo" });
  s.addImage({ path: L.img("logo"), x: 0.95, y: 0.8, w: 0.8, h: 0.8, altText: "Logo Maison du Store AM", objectName: "Logo" });
  s.addText([{ text: "Maison du Store AM", options: { breakLine: true, fontFace: L.THEME.headFontFace, fontSize: 20, color: HEX.white } }, { text: "Espace professionnel", options: { fontSize: 12, color: HEX.sapinMuted } }], tb({ x: 1.95, y: 0.85, w: 4, h: 0.8 }));
  s.addText("FORMATION MANAGER · ESPACE PRO", { placeholder: "kicker" });
  s.addText("L’atelier, le planning et les chantiers, au même endroit", { placeholder: "title" });
  s.addText("Piloter l’activité, chiffrer et valider les devis, organiser l’équipe terrain, gérer clients, factures et catalogue.", { placeholder: "body" });
  L.tringle(pres, s, { x: 0.9, y: 6.35, w: 5.5, n: 6, active: 1, dark: true, d: 0.2 });
  s.addText("Accès : maisondustoream.com/admin/connexion", tb({ x: 7.2, y: 6.3, w: 5.3, h: 0.3, align: "right", fontFace: MONO, fontSize: 11, color: HEX.sapinMuted }));
  s.addNotes("Formation du rôle Manager (« bureau »). Durée conseillée : 2 h 30 avec un devis de démonstration chiffré de bout en bout. Les écrans sont les maquettes de conception de l’Espace Pro (docs/maquette), capturées en version mobile (390 px, onglets du bureau en bas d’écran), les règles celles du code (Backend/ADMIN.md, QUOTE-PRICING.md, routes/staff.php). Les maquettes montrent le compte de l’Admin principal : dans l’onglet « Plus », le manager ne voit pas Images et portfolio, Documents et automatisations ni Équipe (il garde Catalogue et Corbeille).");

  // 2. Parcours -----------------------------------------------------------------
  s = S({ section: "Introduction", kicker: "Parcours de formation", title: "Six modules pour tenir le bureau" });
  const mods = [["Pilotage", "Vue d’ensemble, compteurs, notifications, recherche"], ["Devis", "Cycle de vie, chiffrage, validation, paiements"], ["Planning", "Rendez-vous, prestations, affectation des agents"], ["Gestion", "Clients, factures, messagerie, catalogue"], ["Cas particuliers", "Blocages, messages, subtilités, limites du rôle"], ["Routines", "Profil, réglages, rituels du bureau"]];
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
    "faire passer un devis de « À traiter » à « Soldé » sans blocage, chiffrage et paiements compris ;",
    "planifier l’équipe terrain sans chevauchement et réaffecter en cas d’absence ;",
    "lire chaque message de blocage de l’Espace Pro et savoir ce qui relève de l’Admin principal.",
  ], { x: 0.95, y: 5.32, w: 11.4, h: 1.2, size: 14, space: 4 });
  s.addNotes("Le manager a « le bureau » : prix, tous les devis, planning, clients, factures, messagerie, catalogue et corbeille. Les réglages du site restent à l’Admin principal (User::isOwner).");

  // 3. Matrice des droits ------------------------------------------------------
  s = S({ section: "Introduction", kicker: "Rôles", title: "Ce que chaque rôle peut faire" });
  const Y = { text: "✓", options: { color: "2F7350", bold: true, align: "center" } };
  const N = { text: "–", options: { color: HEX.text2, align: "center" } };
  const P = (t) => ({ text: t, options: { color: HEX.goldText, align: "center" } });
  L.table(pres, s, ["Fonction", "Admin principal", "Manager", "Agent"], [
    ["Vue d’ensemble, tous les devis, prix et totaux", Y, Y, P("Ses devis, sans prix")],
    ["Chiffrage, validation, acceptation, paiements", Y, Y, N],
    ["Rendez-vous : confirmer, déplacer, annuler, affecter", Y, Y, P("Lecture des siens")],
    ["Prestations : planifier, affecter, annuler", Y, Y, P("Avancement, compte rendu")],
    ["Clients et contacts, factures, messagerie, corbeille", Y, Y, N],
    ["Catalogue, matériaux et finitions", Y, Y, N],
    ["Réglages du site : équipe, visiteurs, mise en page, automatisations, images", Y, P("Refusé (403)"), N],
  ], { x: 0.6, y: 1.75, w: 12.1, colW: [6.1, 2.0, 2.0, 2.0], size: 13, rowH: 0.6 });
  s.addText("Ce qu’un rôle ne peut pas faire n’apparaît pas dans son menu ; le serveur refuse aussi l’accès direct par lien.", tb({ x: 0.6, y: 6.55, w: 12.1, h: 0.3, fontSize: 12.5, italic: true, color: HEX.goldText }));
  s.addNotes("Sources : App\\Models\\User (isAdmin = admin ou manager ; isOwner = admin), middlewares admin et owner de routes/staff.php : « Admin principal seul : le manager reçoit un refus, comme l’agent. » Le menu du manager se termine par Catalogue et Corbeille (StaffInterface::navigation).");

  // MODULE 1 — Pilotage -----------------------------------------------------------
  L.divider(pres, { section: "1 · Pilotage", kicker: "Module 01", title: "Piloter l’activité", body: "La vue d’ensemble dit ce qui attend, ce qui bloque et ce qui est dû.", mod: 1, total: T });

  s = S({ section: "1 · Pilotage", mod: 1, kicker: "Module 01 · Vue d’ensemble", title: "Ce qui attend le bureau aujourd’hui" });
  let r = L.phone(pres, s, "m_home", { x: 0.6, y: 1.6, h: 5.2, caption: "Accueil" });
  [[0.78, 0.07], [0.96, 0.135], [0.72, 0.445], [0.6, 0.8], [0.5, 0.95]].forEach(([fx, fy], i) => L.marker(pres, s, r, i + 1, fx, fy));
  const r2 = L.phone(pres, s, "m_plus", { x: 3.2, y: 1.6, h: 5.2, caption: "Onglet « Plus »" });
  L.marker(pres, s, r2, 6, 0.9, 0.3);
  L.legend(pres, s, [
    ["Recherche globale", "Client, téléphone, numéro de devis ou de facture."],
    ["À traiter", "Devis à valider (dont prix à définir), rendez-vous à confirmer, messages non lus, factures impayées."],
    ["Aujourd’hui sur le terrain", "Interventions du jour, agent et état ; lien vers le planning."],
    ["Devis à valider", "Montant et ancienneté ; « Prix à définir » à compléter avant validation."],
    ["Onglets du bureau", "Accueil, Devis, Planning, Clients, Plus."],
    ["Plus", "Prestations, matériaux et finitions, factures, messagerie, catalogue."],
  ], { x: 6.0, y: 1.7, w: 6.7, rowH: 0.68, gap: 0.14, size: 13.5 });
  s.addNotes("dashboard.blade.php (branche admin) : Devis à valider, Prix à définir, Factures émises non payées et Total dû, Planning de la semaine, Prestations à venir. Le bloc Automatisations (SMTP, exécution des règles) n’est utile qu’à l’Admin principal : la page Documents et automatisations est réservée au rôle owner. Compteurs du menu : devis pending + draft, rendez-vous pending, messages entrants non lus.");

  s = S({ section: "1 · Pilotage", mod: 1, kicker: "Module 01 · Notifications", title: "Être prévenu sans surveiller l’écran" });
  const notifs = [["Nouveau devis demandé", "Une demande arrive du site : elle apparaît en « À traiter ».", "gold"], ["Nouveau rendez-vous demandé", "Un client a réservé un créneau : à confirmer.", "info"], ["Pour les agents", "Ils reçoivent « Nouvelle prestation affectée » et « Prestation mise à jour » à chaque modification de votre part.", "ok"]];
  notifs.forEach(([t, d, tone], i) => {
    const y = 1.8 + i * 1.5;
    L.card(pres, s, { x: 0.6, y, w: 7.2, h: 1.3, fill: HEX.white, sh: true, name: t });
    const col = tone === "gold" ? HEX.gold : (tone === "info" ? "3F6285" : "2F7350");
    s.addShape(pres.shapes.OVAL, { x: 0.85, y: y + 0.38, w: 0.5, h: 0.5, fill: { color: col }, line: { color: col }, objectName: "Icône " + t });
    s.addText("●", tb({ x: 0.85, y: y + 0.38, w: 0.5, h: 0.5, align: "center", valign: "middle", fontSize: 12, color: HEX.white }));
    s.addText([{ text: t, options: { bold: true, color: HEX.ink, breakLine: true } }, { text: d }], tb({ x: 1.6, y: y + 0.2, w: 6.0, h: 0.95, fontSize: 13.5, color: HEX.text }));
  });
  L.card(pres, s, { x: 8.2, y: 1.8, w: 4.5, h: 4.3, fill: HEX.sapin, line: HEX.sapin, name: "Conseil" });
  L.tag(s, "Qui reçoit quoi", 8.5, 2.05, 4, HEX.goldLight);
  s.addText("Les demandes du site sont envoyées à tous les comptes actifs Admin principal et Manager. Activez les notifications du navigateur sur votre téléphone depuis le menu de votre compte : une demande traitée vite est souvent une vente.", tb({ x: 8.5, y: 2.45, w: 3.95, h: 3.5, fontSize: 14, color: HEX.white }));
  s.addNotes("StaffPushNotifications::admins envoie aux rôles admin et manager actifs ; send() cible l’agent d’une prestation. Les notifications sont aussi listées dans la cloche (route staff.notifications.index) et peuvent être marquées lues.");

  // MODULE 2 — Devis ---------------------------------------------------------------
  L.divider(pres, { section: "2 · Devis", kicker: "Module 02", title: "Le devis, de la demande au solde", body: "Vous affectez, chiffrez, validez, enregistrez l’accord et les paiements. Chaque étape a sa condition.", mod: 2, total: T });

  s = S({ section: "2 · Devis", mod: 2, kicker: "Module 02 · Cycle de vie", title: "Douze étapes, cinq conditions à connaître" });
  const flow1 = ["Reçu", "Brouillon", "Validé", "Envoyé", "Accepté", "Acompte"];
  const flow2 = ["Fabrication", "Pose planifiée", "Installé", "Solde attendu", "Soldé", "Facture"];
  L.tag(s, "Avant l’accord du client", 0.6, 1.8, 6);
  L.tringle(pres, s, { x: 1.1, y: 2.25, w: 11.1, n: 6, active: 6, d: 0.24, labels: flow1 });
  L.tag(s, "Après l’accord (étapes d’avancement)", 0.6, 3.35, 6);
  L.tringle(pres, s, { x: 1.1, y: 3.8, w: 11.1, n: 6, active: 6, d: 0.24, labels: flow2 });
  const gates = [["Valider", "Chiffrage vérifié, aucun prix « à définir », choix techniques revérifiés."], ["Accepté", "Acceptation enregistrée avec sa preuve dans les notes internes. Le devis est verrouillé."], ["Fabrication", "Accord du client et acompte requis reçus et enregistrés."], ["Soldé", "Total reçu et enregistré."], ["Facture", "Préparée depuis un devis accepté, puis émise."]];
  gates.forEach(([t, d], i) => {
    const x = 0.6 + i * 2.44;
    L.card(pres, s, { x, y: 4.85, w: 2.3, h: 1.85, fill: i % 2 ? HEX.panel : HEX.white, sh: !(i % 2), name: "Condition " + t });
    s.addText(t, tb({ x: x + 0.18, y: 5.0, w: 2.0, h: 0.35, fontSize: 14.5, bold: true, color: HEX.goldText }));
    s.addText(d, tb({ x: x + 0.18, y: 5.38, w: 2.0, h: 1.3, fontSize: 12, color: HEX.text }));
  });
  s.addNotes("QuoteWorkflow::STAGES : En fabrication, Pose planifiée, Installé, Solde attendu, Soldé ; états calculés : draft, approved, sent (message envoyé ou partagé), deposit_pending, deposit_paid. QuoteWorkflowController : « L’accord du client doit être enregistré avant le démarrage », « L’acompte requis doit être reçu et enregistré avant le démarrage de la fabrication », « Le solde doit être reçu et enregistré avant de solder le dossier ». Le workflow ne déclenche aucun message par lui-même.");

  s = S({ section: "2 · Devis", mod: 2, kicker: "Module 02 · La fiche devis", title: "Tout le dossier sur une page" });
  r = L.phone(pres, s, "m_fichefen", { x: 0.6, y: 1.6, h: 5.2, caption: "Fiche · Fenêtres" });
  L.marker(pres, s, r, 1, 0.9, 0.11);
  r = L.phone(pres, s, "m_fichechif", { x: 3.2, y: 1.6, h: 5.2, caption: "Fiche · Chiffrage et notes" });
  L.marker(pres, s, r, 2, 0.9, 0.12); L.marker(pres, s, r, 3, 0.9, 0.76);
  L.legend(pres, s, [
    ["Fenêtres", "Choix communs, dimensions et choix de chaque fenêtre."],
    ["Chiffrage", "Lignes, sous-total, taxe, total TTC."],
    ["Notes internes", "Visibles par l’équipe seulement : on y consigne la preuve de l’acceptation."],
  ], { x: 6.0, y: 1.7, w: 6.7, rowH: 0.72, gap: 0.16, size: 13.5 });
  L.card(pres, s, { x: 6.0, y: 4.45, w: 6.7, h: 2.25, fill: HEX.panel, name: "Haut de fiche" });
  L.tag(s, "Aussi sur la fiche", 6.3, 4.65, 6);
  L.bullets(s, [
    [{ text: "En haut : ", bold: true }, { text: "PDF, Préparer un message, Modifier, Enregistrer l’acceptation." }],
    [{ text: "Frise : ", bold: true }, { text: "Reçu, Brouillon, Validé, Envoyé, Accepté, Facturé." }],
    [{ text: "En bas : ", bold: true }, { text: "client, planification (agent, validité, livraison, pose), paiements, historique." }],
  ], { x: 6.3, y: 5.0, w: 6.2, h: 1.65, size: 13, space: 4 });
  s.addNotes("Faire ouvrir un devis de démonstration. Les notes internes (sous le chiffrage) ne sont visibles que par le bureau ; c’est là qu’on consigne la preuve de l’acceptation du client. Les dates prévisionnelles de livraison et de pose ne créent pas d’intervention dans le planning : il faut créer la prestation.");

  s = S({ section: "2 · Devis", mod: 2, kicker: "Module 02 · Chiffrage", title: "Calculer depuis le catalogue, puis ajuster" });
  r = L.phone(pres, s, "m_chiffrage", { x: 0.9, y: 1.6, h: 5.2, caption: "Formulaire · Chiffrage" });
  const rules = [
    [{ text: "Prix vide = prix du catalogue ; 0 = offert. ", bold: true }, { text: "Un prix de pose vide reste « à définir » et bloque la validation." }],
    [{ text: "Pose rideaux : ", bold: true }, { text: "toujours saisie dans le devis. Hors Abidjan, la pose des stores aussi." }],
    [{ text: "Motorisation store : ", bold: true }, { text: "exige le kit moteur. Rail Wave électrique des rideaux facturé au mètre." }],
    [{ text: "Frais : ", bold: true }, { text: "globaux, par ouverture ou par trajet ; pose globale et pose par ouverture ne se cumulent pas." }],
    [{ text: "Remise : ", bold: true }, { text: "pourcentage, montant fixe ou total négocié ; le brut reste visible." }],
    [{ text: "Tout changement ", bold: true }, { text: "de mesures, composants ou quantités impose un nouveau calcul." }],
  ];
  L.bullets(s, rules, { x: 4.1, y: 1.8, w: 8.6, h: 4.9, size: 15, space: 12 });
  s.addNotes("ADMIN.md (Chiffrage réservé à Admin-CM) et QUOTE-PRICING.md. « Calculer depuis le catalogue » remplace les lignes après confirmation ; le calcul est signé côté serveur ; les lignes commerciales restent modifiables. Surface au m² = largeur × hauteur en cm / 10 000. Accroches par lots de 100. Les tarifs utilisés sont archivés dans le devis : un changement ultérieur du catalogue ne recalcule pas les devis enregistrés. Mode « Saisie entièrement manuelle » pour les dossiers particuliers.");

  s = S({ section: "2 · Devis", mod: 2, kicker: "Module 02 · Exemple chiffré", title: "Un devis de 271 875 FCFA, acompte et solde" });
  const stats = [["241 875", "Fournitures"], ["30 000", "Frais"], ["271 875", "Total définitif"]];
  stats.forEach(([v, l], i) => {
    const y = 1.8 + i * 1.6;
    L.card(pres, s, { x: 0.6, y, w: 4.6, h: 1.4, fill: i === 2 ? HEX.sapin : HEX.white, line: i === 2 ? HEX.sapin : HEX.line, sh: i !== 2, name: l });
    s.addText(v, tb({ x: 0.9, y: y + 0.18, w: 4.0, h: 0.7, fontFace: MONO, fontSize: 32, color: i === 2 ? HEX.white : HEX.ink }));
    s.addText(l.toUpperCase() + " · FCFA", tb({ x: 0.9, y: y + 0.92, w: 4.0, h: 0.3, fontFace: MONO, fontSize: 10, color: i === 2 ? HEX.goldLight : HEX.goldText, charSpacing: 1.5 }));
  });
  s.addChart(pres.charts.DOUGHNUT, [{ name: "Échéancier", labels: ["Acompte 70 %", "Solde"], values: [190313, 81562] }], {
    x: 5.5, y: 1.7, w: 3.6, h: 4.4, holeSize: 62, chartColors: [HEX.gold, HEX.sapin], showLegend: true, legendPos: "b", legendFontSize: 12, legendFontFace: "+mn-lt", legendColor: HEX.text,
    showValue: false, showPercent: true, dataLabelColor: HEX.white, dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt", showTitle: true, title: "Échéancier", titleFontSize: 14, titleFontFace: "+mn-lt", titleColor: HEX.ink,
  });
  L.card(pres, s, { x: 9.4, y: 1.8, w: 3.3, h: 4.6, fill: HEX.goldTint, line: HEX.goldTint, name: "Arrondis" });
  L.tag(s, "Comment c’est calculé", 9.65, 2.0, 3);
  s.addText([
    { text: "Acompte : 190 313 FCFA", options: { bold: true, color: HEX.ink, breakLine: true } },
    { text: "70 % de 271 875 = 190 312,5, arrondi au franc, demi-franc vers le haut.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Solde : 81 562 FCFA", options: { bold: true, color: HEX.ink, breakLine: true } },
    { text: "La différence exacte, jamais arrondie à part.", options: { breakLine: true } },
    { text: " ", options: { breakLine: true, fontSize: 6 } },
    { text: "Chaque ligne est arrondie au franc par ouverture, puis multipliée par le nombre d’ouvertures.", options: {} },
  ], tb({ x: 9.65, y: 2.35, w: 2.9, h: 3.95, fontSize: 12.5, color: HEX.text }));
  s.addText("Chiffres du jeu d’essai officiel du moteur de chiffrage (QuoteCalculatorTest).", tb({ x: 0.6, y: 6.55, w: 8.5, h: 0.3, fontSize: 11, italic: true, color: HEX.text2 }));
  s.addNotes("QUOTE-PRICING.md, Vérification : 241 875 F CFA de fournitures, 30 000 F CFA de frais, 271 875 F CFA de total, 190 313 F CFA d’acompte et 81 562 F CFA de solde. Autres cas testés : six stores à 405 000 F CFA ; remise de 10 % ; total négocié ramené de 579 000 à 515 000 F CFA. L’acompte vaut par défaut 70 % du total définitif ; la remise s’applique sur le brut, l’acompte sur le définitif.");

  s = S({ section: "2 · Devis", mod: 2, kicker: "Module 02 · Paiements", title: "Enregistrer l’argent reçu, sans rien effacer" });
  r = L.phone(pres, s, "m_paiements", { x: 0.9, y: 1.6, h: 5.2, caption: "Formulaire · Paiements" });
  L.bullets(s, [
    [{ text: "Mode : ", bold: true }, { text: "avance puis solde, ou paiement intégral." }],
    [{ text: "Chaque versement : ", bold: true }, { text: "montant, date, moyen, référence, confirmation ; l’auteur est tracé." }],
    [{ text: "Erreur de saisie ? ", bold: true }, { text: "« Annuler » avec un motif. La trace reste. Ce n’est pas un remboursement." }],
    [{ text: "Garde-fous : ", bold: true }, { text: "les versements ne dépassent pas le total ; le total ne descend pas sous les montants reçus." }],
  ], { x: 4.1, y: 1.8, w: 8.6, h: 3.6, size: 15, space: 12 });
  L.card(pres, s, { x: 4.1, y: 5.6, w: 8.6, h: 1.0, fill: HEX.panel, name: "Distinction" });
  s.addText("Ce suivi des versements du devis est distinct du statut de paiement des factures.", tb({ x: 4.4, y: 5.7, w: 8.1, h: 0.8, fontSize: 14, valign: "middle" }));
  s.addNotes("ADMIN.md, Formulaire de devis interne point 5 et paragraphe quote_payments : historisés avec l’auteur, annulation avec motif, « Une annulation de saisie n’est pas un remboursement bancaire ». Messages : « Le total ne peut pas être inférieur aux paiements reçus. » ; « L’avance prévue ne peut pas dépasser le total du devis. » Un reçu PDF est disponible par versement.");

  // MODULE 3 — Planning ---------------------------------------------------------------
  L.divider(pres, { section: "3 · Planning", kicker: "Module 03", title: "Le planning de l’équipe", body: "Confirmer les rendez-vous, planifier les prestations, affecter les bons agents.", mod: 3, total: T });

  s = S({ section: "3 · Planning", mod: 3, kicker: "Module 03 · Rendez-vous", title: "Confirmer, déplacer, annuler, affecter" });
  r = L.phone(pres, s, "m_rdv", { x: 0.9, y: 1.6, h: 5.2, caption: "Rendez-vous" });
  L.tag(s, "Règles de l’agenda", 4.1, 1.8, 6);
  L.bullets(s, [
    [{ text: "Créneaux : ", bold: true }, { text: "8, 9, 10, 11, 14, 15, 16 et 17 h, fermé le dimanche." }],
    [{ text: "Réservation : ", bold: true }, { text: "au moins 1 h à l’avance, jusqu’à 3 mois." }],
    [{ text: "Annuler libère le créneau ", bold: true }, { text: "sans supprimer la demande." }],
    [{ text: "Un créneau = un rendez-vous : ", bold: true }, { text: "« Ce créneau est déjà réservé. »" }],
    [{ text: "Agent : ", bold: true }, { text: "uniquement un agent actif ; il voit alors le rendez-vous." }],
  ], { x: 4.1, y: 2.2, w: 8.6, h: 4.5, size: 15, space: 12 });
  s.addNotes("AppointmentController::update (groupe admin) : date, time parmi config('appointments.slots'), status pending|confirmed|completed|cancelled, agent_id (agent actif), internal_notes. Contrainte d’unicité du créneau : « Ce créneau est déjà réservé. » Une réactivation sur un créneau déjà repris est refusée (ADMIN.md). Vues semaine, jour, liste ; les archives et la corbeille s’affichent en liste.");

  s = S({ section: "3 · Planning", mod: 3, kicker: "Module 03 · Prestations", title: "Planifier une prestation sans chevauchement" });
  r = L.phone(pres, s, "m_prest", { x: 0.9, y: 1.6, h: 5.2, caption: "Prestations" });
  L.tag(s, "Nouvelle prestation", 4.1, 1.8, 6);
  L.bullets(s, [
    [{ text: "Type : ", bold: true }, { text: "devis sur place, installation, service après-vente." }],
    [{ text: "Agent actif, date et heure, ", bold: true }, { text: "durée de 15 à 480 min, adresse, consignes." }],
    [{ text: "Lien devis ou rendez-vous : ", bold: true }, { text: "du même client, sinon « Le document appartient à un autre client. »" }],
    [{ text: "Chevauchement refusé : ", bold: true }, { text: "« Cet agent a déjà une prestation sur ce créneau. »" }],
    [{ text: "Planning : ", bold: true }, { text: "créneaux occupés des agents sur 60 jours." }],
  ], { x: 4.1, y: 2.2, w: 8.6, h: 4.5, size: 15, space: 12 });
  s.addNotes("InterventionController::store et planning() : agent_id (rôle agent, actif), scheduled_at, duration_minutes 15..480, address, instructions ; kind devis_sur_place|installation|sav. checkSlot refuse le chevauchement. PLANNING_DAYS = 60. L’agent est notifié à la création et à chaque mise à jour. Seul le bureau annule une prestation.");

  s = S({ section: "3 · Planning", mod: 3, kicker: "Module 03 · Affecter et réaffecter", title: "Le bon agent, au bon endroit" });
  const aff = [
    ["Choisir l’agent", "Consultez son profil : communes couvertes, savoir-faire (motorisation, rideaux…), jours travaillés, disponibilité."],
    ["Affecter le devis", "L’agent ne voit que les devis qui lui sont affectés et les prépare tant qu’ils ne sont pas validés."],
    ["Accès indirect", "L’agent d’une prestation lit le devis lié du même client, sans prix. Réaffecter ou annuler la prestation retire cet accès."],
    ["Agent absent", "Réaffectez ses prestations et rendez-vous à un agent actif : le contrôle de chevauchement s’applique au nouvel agent."],
  ];
  aff.forEach(([t, d], i) => {
    const x = 0.6 + (i % 2) * 6.15, y = 1.8 + Math.floor(i / 2) * 2.0;
    L.card(pres, s, { x, y, w: 5.95, h: 1.8, fill: i % 3 ? HEX.panel : HEX.white, sh: !(i % 3), name: t });
    s.addText(t, tb({ x: x + 0.3, y: y + 0.22, w: 5.4, h: 0.4, fontSize: 16, bold: true, color: HEX.ink }));
    s.addText(d, tb({ x: x + 0.3, y: y + 0.68, w: 5.4, h: 1.05, fontSize: 13.5, color: HEX.text }));
  });
  L.card(pres, s, { x: 0.6, y: 5.85, w: 12.1, h: 0.85, fill: HEX.goldTint, line: HEX.goldTint, name: "Exemple" });
  s.addText([{ text: "Exemple : ", options: { bold: true, color: HEX.goldText } }, { text: "Koffi est malade. Ouvrez « Prestations », filtrez sur son nom, réaffectez à Yao ses deux interventions du jour ; Yao reçoit « Prestation mise à jour »." }], tb({ x: 0.9, y: 5.95, w: 11.6, h: 0.65, fontSize: 13.5, valign: "middle" }));
  s.addNotes("Quote::canBeViewedBy et ADMIN.md (accès indirect, même client, retiré à la réaffectation). Seuls les agents actifs sont proposés (where role agent, active true). Un compte désactivé ne peut plus se connecter ; la désactivation se fait dans Équipe, page réservée à l’Admin principal.");

  // MODULE 4 — Gestion ---------------------------------------------------------------
  L.divider(pres, { section: "4 · Gestion", kicker: "Module 04", title: "Gestion du bureau", body: "Clients, factures, messagerie et catalogue : un dossier par client, des documents figés, des envois relus.", mod: 4, total: T });

  s = S({ section: "4 · Gestion", mod: 4, kicker: "Module 04 · Clients et contacts", title: "Un dossier par client, rien ne s’efface" });
  r = L.phone(pres, s, "m_client", { x: 0.9, y: 1.6, h: 5.2, caption: "Fiche client" });
  L.bullets(s, [
    [{ text: "Création automatique : ", bold: true }, { text: "une demande du site crée ou retrouve le dossier par adresse e-mail normalisée." }],
    [{ text: "Coordonnées vérifiées : ", bold: true }, { text: "jamais remplacées par une nouvelle demande." }],
    [{ text: "Types : ", bold: true }, { text: "clients, fournisseurs et partenaires créés à la main." }],
    [{ text: "Archiver : ", bold: true }, { text: "masque le dossier des nouvelles affectations, sans effacer devis, rendez-vous, factures ni messages." }],
    [{ text: "Corbeille : ", bold: true }, { text: "restaurer un élément supprimé par erreur." }],
  ], { x: 4.1, y: 1.85, w: 8.6, h: 4.8, size: 15, space: 12 });
  s.addNotes("ADMIN.md, Parcours quotidien points 1 et 6. Routes contacts (index, store, show, update), corbeille (trash.*) : archiver, désarchiver, supprimer, restaurer. Aucun effacement métier n’est exposé dans l’interface en dehors de la corbeille.");

  s = S({ section: "4 · Gestion", mod: 4, kicker: "Module 04 · Factures", title: "Préparer, vérifier, émettre, encaisser" });
  r = L.phone(pres, s, "m_facture", { x: 0.9, y: 1.6, h: 5.2, caption: "Factures" });
  const inv = [["1 · Préparer", "Depuis un devis accepté."], ["2 · Vérifier", "Relire le PDF."], ["3 · Émettre", "Fige montants et taxe ; numéro MDS-0000001 unique, jamais réutilisé."], ["4 · Encaisser", "Enregistrer le paiement intégral reçu."]];
  inv.forEach(([t, d], i) => s.addText([{ text: t, options: { bold: true, color: HEX.ink, breakLine: true } }, { text: d }], tb({ x: 4.1, y: 1.8 + i * 0.95, w: 8.6, h: 0.85, fontSize: 15, color: HEX.text })));
  L.card(pres, s, { x: 4.1, y: 5.75, w: 8.6, h: 0.9, fill: HEX.goldTint, line: HEX.goldTint, name: "Limites" });
  s.addText("Pas d’acomptes, de paiements partiels ni d’avoirs sur les factures dans cette version.", tb({ x: 4.4, y: 5.8, w: 8.1, h: 0.8, fontSize: 14, valign: "middle" }));
  s.addNotes("ADMIN.md, Parcours quotidien point 5 et Paramètres de facturation : tant que les mentions de l’entreprise sont incomplètes, les factures restent en brouillon. Le taux de taxe est saisi sur chaque devis. Statuts : Brouillon, Émise, Payée.");

  s = S({ section: "4 · Gestion", mod: 4, kicker: "Module 04 · Messagerie", title: "Chaque envoi part d’un brouillon relu" });
  r = L.phone(pres, s, "m_msg", { x: 0.9, y: 1.6, h: 5.2, caption: "Messagerie" });
  L.bullets(s, [
    [{ text: "E-mail : ", bold: true }, { text: "brouillon relu, envoyé explicitement. Document joint au seul client du document." }],
    [{ text: "WhatsApp : ", bold: true }, { text: "ouvre wa.me avec un lien signé vers le PDF exact, valable 30 jours." }],
    [{ text: "« Marquer comme partagé » ", bold: true }, { text: "est une déclaration, pas une preuve de lecture." }],
    [{ text: "Relever les e-mails : ", bold: true }, { text: "20 messages par page, du plus récent au plus ancien." }],
    [{ text: "Promotions : ", bold: true }, { text: "uniquement avec un consentement commercial enregistré." }],
  ], { x: 4.1, y: 1.85, w: 8.6, h: 4.8, size: 15, space: 12 });
  s.addNotes("ADMIN.md, Messagerie Hostinger Email. Statuts : Envoyé (acceptation SMTP, pas la lecture), Envoi à vérifier (incident : vérifier dans Hostinger avant de préparer un autre message), Partagé manuellement. Si les coordonnées ou le document ont changé depuis la préparation, l’envoi est bloqué : préparer un nouveau brouillon. L’acceptation des conditions d’un devis ne vaut pas consentement aux promotions.");

  s = S({ section: "4 · Gestion", mod: 4, kicker: "Module 04 · Catalogue", title: "Catalogue, matériaux et finitions" });
  r = L.phone(pres, s, "m_cat", { x: 0.6, y: 1.6, h: 5.2, caption: "Catalogue" });
  r = L.phone(pres, s, "m_mat", { x: 3.2, y: 1.6, h: 5.2, caption: "Matériaux et finitions" });
  L.tag(s, "Catalogue (site)", 6.0, 1.8, 6);
  L.bullets(s, [
    [{ text: "Visible sur le site ", bold: true }, { text: "et Disponible sont indépendants : visible mais indisponible = « sur commande »." }],
    [{ text: "Nouveau produit masqué ", bold: true }, { text: "jusqu’à sa publication." }],
    [{ text: "Masquer le catalogue ", bold: true }, { text: "retire les produits du site, pas des devis." }],
  ], { x: 6.0, y: 2.15, w: 6.7, h: 2.3, size: 14, space: 8 });
  L.tag(s, "Matériaux et finitions (devis)", 6.0, 4.6, 6);
  L.bullets(s, [
    [{ text: "Prix FCFA, unité, compatibilités ", bold: true }, { text: "et disponibilité de chaque option." }],
    [{ text: "« Demande de devis publique » ", bold: true }, { text: "alimente le formulaire du site sans montrer les prix." }],
  ], { x: 6.0, y: 4.95, w: 6.7, h: 1.8, size: 14, space: 8 });
  s.addNotes("ADMIN.md, Catalogue et Chiffrage depuis le catalogue. Coûts internes d’un produit : vide = non renseigné, 0 = coût nul ; jamais dans l’API publique et sans recalcul des devis existants. Les tarifs initiaux du seed (occultants, voilages, rails, stores au m², kit moteur 100 000 FCFA, pose store Abidjan 5 000 FCFA par ouverture) restent modifiables et ne sont jamais écrasés par un nouveau seed.");

  // MODULE 5 — Cas particuliers -----------------------------------------------------------
  L.divider(pres, { section: "5 · Cas particuliers", kicker: "Module 05", title: "Blocages, exceptions et subtilités", body: "Chaque refus de l’Espace Pro protège un chiffre, un client ou une trace. Voici comment les lever proprement.", mod: 5, total: T });

  s = S({ section: "5 · Cas particuliers", mod: 5, kicker: "Module 05 · Blocages du devis", title: "Le message affiché et comment le lever" });
  L.table(pres, s, ["Message de l’Espace Pro", "Pourquoi", "Comment le lever"], [
    ["« Les choix techniques ont changé. Vérifiez le chiffrage dans le formulaire complet avant validation. »", "Un agent a modifié mesures ou choix.", "Ouvrir le formulaire, recalculer, enregistrer, puis valider."],
    ["« Des prix restent à définir (notamment la pose). »", "Une ligne sans prix, souvent la pose.", "Saisir le prix, recalculer depuis le catalogue."],
    ["« Devis accepté ou facturé : document verrouillé. »", "L’accord du client fige le devis.", "Aucune modification ; nouveau devis si le projet change."],
    ["« L’acompte requis doit être reçu et enregistré avant le démarrage de la fabrication. »", "Pas de fabrication sans acompte.", "Enregistrer le versement reçu, puis l’étape."],
    ["« Ce devis a été modifié. Rechargez-le avant d’enregistrer. »", "Modification en parallèle.", "Recharger, comparer, ressaisir."],
  ], { x: 0.6, y: 1.75, w: 12.1, colW: [5.4, 3.0, 3.7], size: 12, rowH: 0.82 });
  s.addNotes("QuoteController::update (pricing_review_required, calculation.pending, verrou accepted ou facturé, edit_version) et QuoteWorkflowController. Ces contrôles sont faits par le serveur : impossible de les contourner depuis une autre page.");

  s = S({ section: "5 · Cas particuliers", mod: 5, kicker: "Module 05 · Cas exceptionnels", title: "Situations concrètes, bons réflexes" });
  L.table(pres, s, ["Situation", "Ce qui se passe", "Votre réflexe"], [
    ["Le client veut reprendre un rendez-vous annulé, créneau déjà pris", "« Ce créneau est déjà réservé. »", "Proposer un autre créneau libre."],
    ["Deux prestations du même agent qui se touchent", "« Cet agent a déjà une prestation sur ce créneau. »", "Décaler, raccourcir la durée ou changer d’agent."],
    ["Lier la prestation au devis d’un autre client", "« Le document appartient à un autre client. »", "Vérifier le dossier ; créer le bon devis."],
    ["Chantier hors Abidjan", "La pose store n’est pas incluse automatiquement.", "Chiffrer la pose et le déplacement explicitement."],
    ["E-mail en « Envoi à vérifier »", "Envois automatiques suspendus, pas de renvoi aveugle.", "Contrôler dans le webmail Hostinger avant tout nouvel envoi."],
    ["Client sans consentement qui demande les promotions", "L’envoi promotionnel est refusé.", "Enregistrer d’abord son consentement dans le dossier."],
  ], { x: 0.6, y: 1.75, w: 12.1, colW: [4.0, 4.0, 4.1], size: 12, rowH: 0.7 });
  s.addNotes("AppointmentController (unicité), InterventionController (checkSlot, contrôle du client), ADMIN.md (pose hors Abidjan, incident SMTP, consentement promotions).");

  s = S({ section: "5 · Cas particuliers", mod: 5, kicker: "Module 05 · Subtilités", title: "Six détails qui font la différence" });
  const subs = [
    ["Prix vide ≠ zéro", "Vide reprend le catalogue (ou reste « à définir » pour la pose) ; 0 signifie offert."],
    ["Catalogue et devis", "Modifier un tarif ne recalcule jamais un devis enregistré : les tarifs utilisés y sont archivés."],
    ["Dates prévisionnelles", "Livraison et pose saisies sur le devis ne créent pas de prestation : planifiez-la."],
    ["Workflow muet", "Avancer une étape n’envoie aucun message au client : préparez-le vous-même."],
    ["Agent qui modifie", "Le devis repasse en brouillon ; les montants précédents sont gardés jusqu’au recalcul."],
    ["Archiver n’est pas supprimer", "Un dossier archivé garde tout son historique et peut être désarchivé."],
  ];
  subs.forEach(([t, d], i) => {
    const x = 0.6 + (i % 3) * 4.07, y = 1.8 + Math.floor(i / 3) * 2.45;
    L.card(pres, s, { x, y, w: 3.9, h: 2.25, fill: i % 2 ? HEX.panel : HEX.white, sh: !(i % 2), name: t });
    s.addText(t, tb({ x: x + 0.25, y: y + 0.22, w: 3.4, h: 0.4, fontSize: 15.5, bold: true, color: HEX.ink }));
    s.addText(d, tb({ x: x + 0.25, y: y + 0.68, w: 3.45, h: 1.5, fontSize: 13, color: HEX.text }));
  });
  s.addNotes("ADMIN.md et QUOTE-PRICING.md : « Un prix vide reprend le catalogue, zéro signifie offert » ; « Un changement ultérieur du catalogue ne recalcule pas les devis enregistrés » ; « Les dates prévisionnelles ne créent pas d’intervention dans le planning » ; « Le workflow ne déclenche aucun message par lui-même ».");

  s = S({ section: "5 · Cas particuliers", mod: 5, kicker: "Module 05 · Limites du rôle", title: "Ce qui reste à l’Admin principal" });
  const owner = [["Équipe", "Créer les comptes, attribuer les rôles, désactiver, remettre un mot de passe temporaire."], ["Documents et automatisations", "Modèles e-mail et WhatsApp, règles d’envoi, connexion SMTP."], ["Mise en page", "PDF de devis, factures et reçus, fonds de page, mentions."], ["Images et portfolio", "Hero de l’accueil, réalisations, illustrations."], ["Visiteurs", "Statistiques de fréquentation du site."]];
  owner.forEach(([t, d], i) => {
    const y = 1.8 + i * 0.98;
    L.card(pres, s, { x: 0.6, y, w: 7.6, h: 0.85, fill: i % 2 ? HEX.panel : HEX.white, sh: !(i % 2), name: t });
    s.addText(t, tb({ x: 0.85, y: y + 0.1, w: 2.7, h: 0.65, fontSize: 14.5, bold: true, color: HEX.ink, valign: "middle" }));
    s.addText(d, tb({ x: 3.6, y: y + 0.1, w: 4.45, h: 0.65, fontSize: 12.5, color: HEX.text, valign: "middle" }));
  });
  L.card(pres, s, { x: 8.6, y: 1.8, w: 4.1, h: 4.75, fill: HEX.sapin, line: HEX.sapin, name: "Procédure" });
  L.tag(s, "Le bon réflexe", 8.9, 2.05, 3.6, HEX.goldLight);
  s.addText("Ces pages renvoient un refus au manager comme à l’agent. Notez le besoin (nouvel agent, texte de message, mention légale) et transmettez-le à l’Admin principal. Pour un mot de passe oublié, seul l’Admin principal peut en remettre un temporaire.", tb({ x: 8.9, y: 2.45, w: 3.55, h: 3.9, fontSize: 14, color: HEX.white }));
  s.addNotes("routes/staff.php, groupe middleware owner : visiteurs, mise-en-page, communications, contents, equipe. Commentaire du code : « Admin principal seul : le manager reçoit un refus, comme l’agent. »");

  // MODULE 6 — Routines --------------------------------------------------------------------
  L.divider(pres, { section: "6 · Routines", kicker: "Module 06", title: "Votre profil et vos rituels", body: "Personnaliser son espace, puis tenir le bureau au quotidien, chaque semaine et chaque mois.", mod: 6, total: T });

  s = S({ section: "6 · Routines", mod: 6, kicker: "Module 06 · Profil et paramètres", title: "Signature, disponibilité, thème" });
  r = L.phone(pres, s, "m_profil", { x: 0.6, y: 1.6, h: 5.2, caption: "Modifier mon profil" });
  L.marker(pres, s, r, 1, 0.9, 0.54);
  r = L.phone(pres, s, "m_profilsig", { x: 3.2, y: 1.6, h: 5.2, caption: "Signature et disponibilité" });
  L.marker(pres, s, r, 2, 0.9, 0.12); L.marker(pres, s, r, 3, 0.9, 0.556);
  L.legend(pres, s, [
    ["Identité et coordonnées", "Civilité, nom, fonction, téléphone professionnel, joignable sur WhatsApp."],
    ["Signature", "Texte de signature (500 caractères au plus), avec aperçu."],
    ["Disponibilité", "Disponible ou absent, avec une date de retour."],
    ["Thème et animations", "Clair, Sombre ou Automatique ; réduire les animations."],
    ["Sécurité", "Changer le mot de passe, déconnecter les autres appareils."],
  ], { x: 6.0, y: 1.75, w: 6.7, rowH: 0.75, gap: 0.2, size: 14 });
  s.addNotes("ProfileController::updateProfile, branche bureau : signature (max 500), back_on (date de retour), availability, phone, whatsapp, cover. updateSettings : theme light|dark|auto, reduce_motion. Les formats sont fixés pour toute l’équipe (JJ/MM/AAAA, 24 h).");

  s = S({ section: "6 · Routines", mod: 6, kicker: "Module 06 · Rituels", title: "Chaque jour, chaque semaine, chaque mois" });
  const cols = [
    ["Chaque jour", ["Vider les compteurs : devis à traiter, rendez-vous à confirmer, messages non lus.", "Compléter les « Prix à définir » et valider.", "Vérifier le planning du lendemain, réaffecter les absents.", "Enregistrer les versements reçus."]],
    ["Chaque semaine", ["Relancer les devis envoyés sans réponse.", "Suivre l’avancement : fabrication, pose planifiée, installé.", "Lire les comptes rendus des prestations terminées.", "Relever les e-mails de la boîte de réception."]],
    ["Chaque mois", ["Contrôler les factures émises non payées.", "Mettre à jour tarifs, matériaux et disponibilités.", "Archiver les dossiers clos.", "Remonter à l’Admin principal les besoins d’équipe et de modèles."]],
  ];
  cols.forEach(([t, items], i) => {
    const x = 0.6 + i * 4.07;
    L.card(pres, s, { x, y: 1.8, w: 3.9, h: 4.85, fill: i === 0 ? HEX.sapin : HEX.white, line: i === 0 ? HEX.sapin : HEX.line, sh: i !== 0, name: t });
    s.addText(t, tb({ x: x + 0.3, y: 2.05, w: 3.3, h: 0.5, fontFace: L.THEME.headFontFace, fontSize: 24, color: i === 0 ? HEX.white : HEX.ink }));
    L.bullets(s, items, { x: x + 0.3, y: 2.75, w: 3.35, h: 3.8, size: 13.5, color: i === 0 ? HEX.sapinText : HEX.text, space: 10 });
  });
  s.addNotes("Routine proposée à partir des écrans existants (compteurs du menu, vue d’ensemble, filtres de statut). À adapter au rythme de l’atelier.");

  // Évaluation ----------------------------------------------------------------------------
  pres.addSection({ title: "Évaluation" });
  const quiz = [
    ["La validation est refusée : « Des prix restent à définir ». Que faire ?", "Saisir le prix manquant (souvent la pose), recalculer depuis le catalogue, enregistrer, valider."],
    ["Un agent a modifié un devis déjà chiffré. Pouvez-vous valider ?", "Pas avant d’avoir revérifié et recalculé dans le formulaire complet."],
    ["Le client a accepté mais n’a rien payé. Fabrication ?", "Non : accord enregistré et acompte reçu sont tous deux requis."],
    ["Vous avez saisi un versement en double.", "L’annuler avec un motif : la trace reste, ce n’est pas un remboursement."],
    ["Un agent est absent demain.", "Réaffecter ses prestations et rendez-vous à un agent actif, sans chevauchement."],
    ["Vous devez créer un compte pour un nouvel agent.", "Demander à l’Admin principal : la page Équipe lui est réservée."],
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
  s.addNotes("Corriger collectivement et revenir au module concerné si besoin.");

  s = pres.addSlide({ masterName: "MDS_COVER", sectionTitle: "Évaluation" });
  s.addText("FIN DE LA FORMATION MANAGER", { placeholder: "kicker" });
  s.addText("Le bureau tient, le terrain avance", { placeholder: "title" });
  s.addText("Affecter, chiffrer, valider, encaisser : chaque étape laisse une trace et protège le client comme l’atelier.", { placeholder: "body" });
  L.tringle(pres, s, { x: 0.9, y: 6.35, w: 5.5, n: 6, active: 6, dark: true, d: 0.2 });
  s.addNotes("Remettre le guide ADMIN.md à jour si des règles évoluent ; cette formation suit le code de l’Espace Pro au 12/11/2026.");

  await pres.writeFile({ fileName: out });
  await require("/root/.claude/skills/synced/9f51262c-e417-40f4-9cb6-a349697abd6a_a4ce3e49-9717-4792-8e6b-0d0d16105c75/pptx/scripts/apply_theme.js").applyTheme(out, L.THEME);
};
