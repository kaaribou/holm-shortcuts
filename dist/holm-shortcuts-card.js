/* HOLM Shortcuts — barre de raccourcis animée : images, icônes ou ambiances HOLM FX, valeurs en direct et actions.
 * Fait partie de HOLM — Home Orchestration & Living Management. https://github.com/kaaribou/holm-shortcuts — licence MIT
 *   type: custom:holm-shortcuts-card
 *   layout: row | grid | scroll     size: s | m | l | xl     style: glass | card | transparent     button_style: plain | tile | pill
 *   items: [{ name, icon, image, fx, color, url, entity, tap_action, hold_action, badge: { entities | entity, color } }]
 */
(() => {
  const VERSION = "1.0.0";

  // ---- HOLM i18n : textes écrits en français, traduits à l'affichage (en, de, es, it, nl, pt, pl) ----
  // Langue : option `language` de la carte, sinon celle du profil Home Assistant ; anglais si la langue n'est pas traduite.
  const HOLM_LANGS = ["en", "de", "es", "it", "nl", "pt", "pl"];
  const LANG_NAMES = { fr: "Français", en: "English", de: "Deutsch", es: "Español", it: "Italiano", nl: "Nederlands", pt: "Português", pl: "Polski" };
  const I18N = {
    "HOLM Shortcuts": ["HOLM Shortcuts", "HOLM Shortcuts", "HOLM Shortcuts", "HOLM Shortcuts", "HOLM Shortcuts", "HOLM Shortcuts", "HOLM Shortcuts"],
    "Une barre de raccourcis animée : images, icônes ou ambiances HOLM FX, valeurs en direct et actions.": ["An animated shortcut bar: images, icons or HOLM FX ambiences, live values and actions.", "Eine animierte Verknüpfungsleiste: Bilder, Symbole oder HOLM-FX-Stimmungen, Live-Werte und Aktionen.", "Una barra de accesos directos animada: imágenes, iconos o ambientes HOLM FX, valores en directo y acciones.", "Una barra di scorciatoie animata: immagini, icone o atmosfere HOLM FX, valori in tempo reale e azioni.", "Een geanimeerde snelkoppelingsbalk: afbeeldingen, pictogrammen of HOLM FX-sferen, live waarden en acties.", "Uma barra de atalhos animada: imagens, ícones ou ambientes HOLM FX, valores em direto e ações.", "Animowany pasek skrótów: obrazy, ikony lub nastroje HOLM FX, wartości na żywo i akcje."],
    "Ajoutez des boutons dans l'éditeur de la carte.": ["Add buttons in the card editor.", "Fügen Sie Schaltflächen im Karteneditor hinzu.", "Añada botones en el editor de la tarjeta.", "Aggiungi pulsanti nell'editor della scheda.", "Voeg knoppen toe in de kaarteditor.", "Adicione botões no editor do cartão.", "Dodaj przyciski w edytorze karty."],
    "Langue": ["Language", "Sprache", "Idioma", "Lingua", "Taal", "Idioma", "Język"],
    "Automatique (profil)": ["Automatic (profile)", "Automatisch (Profil)", "Automático (perfil)", "Automatica (profilo)", "Automatisch (profiel)", "Automático (perfil)", "Automatycznie (profil)"],
    "Titre (facultatif)": ["Title (optional)", "Titel (optional)", "Título (opcional)", "Titolo (facoltativo)", "Titel (optioneel)", "Título (opcional)", "Tytuł (opcjonalnie)"],
    "Apparence": ["Appearance", "Darstellung", "Apariencia", "Aspetto", "Weergave", "Aparência", "Wygląd"],
    "Disposition": ["Layout", "Anordnung", "Disposición", "Disposizione", "Indeling", "Disposição", "Układ"],
    "En rangée (largeur égale)": ["In a row (equal width)", "In einer Reihe (gleiche Breite)", "En fila (mismo ancho)", "In fila (stessa larghezza)", "Op een rij (gelijke breedte)", "Em linha (mesma largura)", "W rzędzie (równa szerokość)"],
    "En grille": ["Grid", "Raster", "En cuadrícula", "A griglia", "Raster", "Em grelha", "Siatka"],
    "Défilante (mobile)": ["Scrolling (mobile)", "Scrollend (Mobil)", "Desplazable (móvil)", "Scorrevole (mobile)", "Scrollend (mobiel)", "Deslizante (telemóvel)", "Przewijany (telefon)"],
    "Colonnes (grille)": ["Columns (grid)", "Spalten (Raster)", "Columnas (cuadrícula)", "Colonne (griglia)", "Kolommen (raster)", "Colunas (grelha)", "Kolumny (siatka)"],
    "Taille des boutons": ["Button size", "Schaltflächengröße", "Tamaño de los botones", "Dimensione dei pulsanti", "Knopgrootte", "Tamanho dos botões", "Rozmiar przycisków"],
    "Petite": ["Small", "Klein", "Pequeño", "Piccola", "Klein", "Pequeno", "Mały"],
    "Moyenne": ["Medium", "Mittel", "Mediano", "Media", "Middel", "Médio", "Średni"],
    "Grande": ["Large", "Groß", "Grande", "Grande", "Groot", "Grande", "Duży"],
    "Très grande": ["Extra large", "Sehr groß", "Muy grande", "Molto grande", "Zeer groot", "Muito grande", "Bardzo duży"],
    "Libellés": ["Labels", "Beschriftungen", "Etiquetas", "Etichette", "Labels", "Etiquetas", "Etykiety"],
    "Sous le bouton": ["Under the button", "Unter der Schaltfläche", "Bajo el botón", "Sotto il pulsante", "Onder de knop", "Por baixo do botão", "Pod przyciskiem"],
    "Masqués": ["Hidden", "Ausgeblendet", "Ocultas", "Nascoste", "Verborgen", "Ocultas", "Ukryte"],
    "Lignes de libellé": ["Label lines", "Zeilen der Beschriftung", "Líneas de etiqueta", "Righe dell'etichetta", "Regels van het label", "Linhas da etiqueta", "Wiersze etykiety"],
    "Style de la barre": ["Bar style", "Leistenstil", "Estilo de la barra", "Stile della barra", "Stijl van de balk", "Estilo da barra", "Styl paska"],
    "Verre dépoli": ["Frosted glass", "Milchglas", "Vidrio esmerilado", "Vetro smerigliato", "Matglas", "Vidro fosco", "Matowe szkło"],
    "Fond de carte du thème": ["Theme card background", "Kartenhintergrund des Themes", "Fondo de tarjeta del tema", "Sfondo scheda del tema", "Kaartachtergrond van het thema", "Fundo de cartão do tema", "Tło karty z motywu"],
    "Transparent": ["Transparent", "Transparent", "Transparente", "Trasparente", "Transparant", "Transparente", "Przezroczysty"],
    "Style des boutons": ["Button style", "Schaltflächenstil", "Estilo de los botones", "Stile dei pulsanti", "Stijl van de knoppen", "Estilo dos botões", "Styl przycisków"],
    "Simple (image et libellé)": ["Plain (picture and label)", "Einfach (Bild und Beschriftung)", "Simple (imagen y etiqueta)", "Semplice (immagine ed etichetta)", "Eenvoudig (afbeelding en label)", "Simples (imagem e etiqueta)", "Prosty (obraz i etykieta)"],
    "Tuiles": ["Tiles", "Kacheln", "Mosaicos", "Riquadri", "Tegels", "Mosaicos", "Kafelki"],
    "Pastilles (icône à gauche)": ["Pills (icon on the left)", "Pillen (Symbol links)", "Píldoras (icono a la izquierda)", "Pillole (icona a sinistra)", "Pillen (pictogram links)", "Pílulas (ícone à esquerda)", "Pigułki (ikona po lewej)"],
    "Couleur principale": ["Main colour", "Hauptfarbe", "Color principal", "Colore principale", "Hoofdkleur", "Cor principal", "Kolor główny"],
    "Fond (couleur, dégradé ou variable de thème)": ["Background (colour, gradient or theme variable)", "Hintergrund (Farbe, Verlauf oder Theme-Variable)", "Fondo (color, degradado o variable del tema)", "Sfondo (colore, sfumatura o variabile del tema)", "Achtergrond (kleur, verloop of themavariabele)", "Fundo (cor, gradiente ou variável do tema)", "Tło (kolor, gradient lub zmienna motywu)"],
    "Arrondi des bords (ex. 16px)": ["Corner radius (e.g. 16px)", "Eckenradius (z. B. 16px)", "Radio de las esquinas (p. ej. 16px)", "Arrotondamento degli angoli (es. 16px)", "Hoekafronding (bijv. 16px)", "Arredondamento dos cantos (ex. 16px)", "Zaokrąglenie rogów (np. 16px)"],
    "Ambiance HOLM FX de la barre": ["HOLM FX ambience of the bar", "HOLM-FX-Stimmung der Leiste", "Ambiente HOLM FX de la barra", "Atmosfera HOLM FX della barra", "HOLM FX-sfeer van de balk", "Ambiente HOLM FX da barra", "Nastrój HOLM FX paska"],
    "Aucune": ["None", "Keine", "Ninguno", "Nessuna", "Geen", "Nenhum", "Brak"],
    "Intensité de l'ambiance": ["Ambience intensity", "Intensität der Stimmung", "Intensidad del ambiente", "Intensità dell'atmosfera", "Intensiteit van de sfeer", "Intensidade do ambiente", "Intensywność nastroju"],
    "Effets": ["Effects", "Effekte", "Efectos", "Effetti", "Effecten", "Efeitos", "Efekty"],
    "Effets au survol et à l'appui": ["Hover and press effects", "Effekte beim Überfahren und Drücken", "Efectos al pasar y pulsar", "Effetti al passaggio e alla pressione", "Effecten bij aanwijzen en indrukken", "Efeitos ao passar e premir", "Efekty po najechaniu i naciśnięciu"],
    "Animation d'apparition": ["Entrance animation", "Einblendanimation", "Animación de aparición", "Animazione di comparsa", "Verschijningsanimatie", "Animação de entrada", "Animacja pojawiania się"],
    "Mettre en évidence la vue en cours": ["Highlight the current view", "Aktuelle Ansicht hervorheben", "Resaltar la vista actual", "Evidenzia la vista corrente", "Huidige weergave markeren", "Destacar a vista atual", "Wyróżnij bieżący widok"],
    "Vibration au toucher": ["Haptic feedback", "Vibration bei Berührung", "Vibración al tocar", "Vibrazione al tocco", "Trillen bij aanraken", "Vibração ao tocar", "Wibracja przy dotyku"],
    "Boutons": ["Buttons", "Schaltflächen", "Botones", "Pulsanti", "Knoppen", "Botões", "Przyciski"],
    "Ajouter un bouton": ["Add a button", "Schaltfläche hinzufügen", "Añadir un botón", "Aggiungi un pulsante", "Knop toevoegen", "Adicionar um botão", "Dodaj przycisk"],
    "Nouveau bouton": ["New button", "Neue Schaltfläche", "Nuevo botón", "Nuovo pulsante", "Nieuwe knop", "Novo botão", "Nowy przycisk"],
    "Nom": ["Name", "Name", "Nombre", "Nome", "Naam", "Nome", "Nazwa"],
    "Icône": ["Icon", "Symbol", "Icono", "Icona", "Pictogram", "Ícone", "Ikona"],
    "Image (adresse /local/… ou https://…)": ["Picture (/local/… or https://… address)", "Bild (Adresse /local/… oder https://…)", "Imagen (dirección /local/… o https://…)", "Immagine (indirizzo /local/… o https://…)", "Afbeelding (adres /local/… of https://…)", "Imagem (endereço /local/… ou https://…)", "Obraz (adres /local/… lub https://…)"],
    "Téléverser une image": ["Upload a picture", "Bild hochladen", "Subir una imagen", "Carica un'immagine", "Afbeelding uploaden", "Carregar uma imagem", "Prześlij obraz"],
    "Téléversement…": ["Uploading…", "Wird hochgeladen…", "Subiendo…", "Caricamento…", "Uploaden…", "A carregar…", "Przesyłanie…"],
    "Téléversement impossible : {e}": ["Upload failed: {e}", "Hochladen fehlgeschlagen: {e}", "No se pudo subir: {e}", "Caricamento non riuscito: {e}", "Uploaden mislukt: {e}", "Falha ao carregar: {e}", "Przesyłanie nie powiodło się: {e}"],
    "Image quand l'entité est active (facultatif)": ["Picture when the entity is active (optional)", "Bild, wenn die Entität aktiv ist (optional)", "Imagen cuando la entidad está activa (opcional)", "Immagine quando l'entità è attiva (facoltativa)", "Afbeelding als de entiteit actief is (optioneel)", "Imagem quando a entidade está ativa (opcional)", "Obraz, gdy encja jest aktywna (opcjonalnie)"],
    "Ambiance HOLM FX du bouton": ["HOLM FX ambience of the button", "HOLM-FX-Stimmung der Schaltfläche", "Ambiente HOLM FX del botón", "Atmosfera HOLM FX del pulsante", "HOLM FX-sfeer van de knop", "Ambiente HOLM FX do botão", "Nastrój HOLM FX przycisku"],
    "Couleur (icône, halo, ambiance)": ["Colour (icon, glow, ambience)", "Farbe (Symbol, Leuchten, Stimmung)", "Color (icono, halo, ambiente)", "Colore (icona, alone, atmosfera)", "Kleur (pictogram, gloed, sfeer)", "Cor (ícone, halo, ambiente)", "Kolor (ikona, poświata, nastrój)"],
    "Vue à ouvrir": ["View to open", "Zu öffnende Ansicht", "Vista que abrir", "Vista da aprire", "Te openen weergave", "Vista a abrir", "Widok do otwarcia"],
    "Entité (valeur en direct, état actif)": ["Entity (live value, active state)", "Entität (Live-Wert, aktiver Zustand)", "Entidad (valor en directo, estado activo)", "Entità (valore in tempo reale, stato attivo)", "Entiteit (live waarde, actieve status)", "Entidade (valor em direto, estado ativo)", "Encja (wartość na żywo, stan aktywny)"],
    "Afficher la valeur de l'entité": ["Show the entity value", "Wert der Entität anzeigen", "Mostrar el valor de la entidad", "Mostra il valore dell'entità", "Waarde van de entiteit tonen", "Mostrar o valor da entidade", "Pokaż wartość encji"],
    "Actif quand…": ["Active when…", "Aktiv, wenn…", "Activo cuando…", "Attivo quando…", "Actief als…", "Ativo quando…", "Aktywny, gdy…"],
    "États actifs (séparés par des virgules ; vide = allumé, ouvert, en lecture…)": ["Active states (comma-separated; empty = on, open, playing…)", "Aktive Zustände (durch Kommas getrennt; leer = an, offen, Wiedergabe…)", "Estados activos (separados por comas; vacío = encendido, abierto, reproduciendo…)", "Stati attivi (separati da virgole; vuoto = acceso, aperto, in riproduzione…)", "Actieve statussen (gescheiden door komma's; leeg = aan, open, speelt…)", "Estados ativos (separados por vírgulas; vazio = ligado, aberto, a reproduzir…)", "Stany aktywne (oddzielone przecinkami; puste = włączony, otwarty, odtwarzanie…)"],
    "Actif au-dessus de": ["Active above", "Aktiv über", "Activo por encima de", "Attivo sopra", "Actief boven", "Ativo acima de", "Aktywny powyżej"],
    "Actif en dessous de": ["Active below", "Aktiv unter", "Activo por debajo de", "Attivo sotto", "Actief onder", "Ativo abaixo de", "Aktywny poniżej"],
    "Animer l'ambiance seulement quand l'entité est active": ["Animate the ambience only when the entity is active", "Stimmung nur animieren, wenn die Entität aktiv ist", "Animar el ambiente solo cuando la entidad está activa", "Anima l'atmosfera solo quando l'entità è attiva", "Sfeer alleen animeren als de entiteit actief is", "Animar o ambiente só quando a entidade está ativa", "Animuj nastrój tylko, gdy encja jest aktywna"],
    "Pastille": ["Badge", "Abzeichen", "Insignia", "Badge", "Badge", "Distintivo", "Plakietka"],
    "Pastille : compter les entités actives": ["Badge: count active entities", "Abzeichen: aktive Entitäten zählen", "Insignia: contar las entidades activas", "Badge: conta le entità attive", "Badge: actieve entiteiten tellen", "Distintivo: contar as entidades ativas", "Plakietka: licz aktywne encje"],
    "Pastille : valeur d'une entité": ["Badge: value of an entity", "Abzeichen: Wert einer Entität", "Insignia: valor de una entidad", "Badge: valore di un'entità", "Badge: waarde van een entiteit", "Distintivo: valor de uma entidade", "Plakietka: wartość encji"],
    "Couleur de la pastille": ["Badge colour", "Farbe des Abzeichens", "Color de la insignia", "Colore del badge", "Kleur van de badge", "Cor do distintivo", "Kolor plakietki"],
    "Actions": ["Actions", "Aktionen", "Acciones", "Azioni", "Acties", "Ações", "Akcje"],
    "Action au toucher (sinon : la vue, ou les détails de l'entité)": ["Tap action (otherwise: the view, or the entity details)", "Tippaktion (sonst: die Ansicht oder die Entitätsdetails)", "Acción al tocar (si no: la vista o los detalles de la entidad)", "Azione al tocco (altrimenti: la vista o i dettagli dell'entità)", "Tikactie (anders: de weergave of de details van de entiteit)", "Ação ao tocar (senão: a vista ou os detalhes da entidade)", "Akcja dotknięcia (inaczej: widok lub szczegóły encji)"],
    "Action à l'appui long": ["Hold action", "Aktion bei langem Drücken", "Acción al mantener pulsado", "Azione alla pressione prolungata", "Actie bij lang indrukken", "Ação ao manter premido", "Akcja przytrzymania"],
    "Monter": ["Move up", "Nach oben", "Subir", "Sposta su", "Omhoog", "Subir", "W górę"],
    "Descendre": ["Move down", "Nach unten", "Bajar", "Sposta giù", "Omlaag", "Descer", "W dół"],
    "Dupliquer": ["Duplicate", "Duplizieren", "Duplicar", "Duplica", "Dupliceren", "Duplicar", "Duplikuj"],
    "Supprimer": ["Delete", "Löschen", "Eliminar", "Elimina", "Verwijderen", "Eliminar", "Usuń"],
    "Modifier": ["Edit", "Bearbeiten", "Editar", "Modifica", "Bewerken", "Editar", "Edytuj"],
    "HOLM FX n'est pas installé : les ambiances ne s'afficheront pas.": ["HOLM FX is not installed: ambiences will not be shown.", "HOLM FX ist nicht installiert: Stimmungen werden nicht angezeigt.", "HOLM FX no está instalado: los ambientes no se mostrarán.", "HOLM FX non è installato: le atmosfere non verranno mostrate.", "HOLM FX is niet geïnstalleerd: sferen worden niet getoond.", "O HOLM FX não está instalado: os ambientes não serão mostrados.", "HOLM FX nie jest zainstalowany: nastroje nie będą wyświetlane."],
    "Visuel : l'ambiance HOLM FX passe derrière l'icône ou l'image ; seule, elle remplit le rond du bouton.": ["Visual: the HOLM FX ambience goes behind the icon or picture; on its own, it fills the button's circle.", "Bild: die HOLM-FX-Stimmung liegt hinter dem Symbol oder Bild; allein füllt sie den Kreis der Schaltfläche.", "Visual: el ambiente HOLM FX va detrás del icono o la imagen; solo, llena el círculo del botón.", "Visuale: l'atmosfera HOLM FX va dietro l'icona o l'immagine; da sola, riempie il cerchio del pulsante.", "Visueel: de HOLM FX-sfeer komt achter het pictogram of de afbeelding; alleen vult hij de cirkel van de knop.", "Visual: o ambiente HOLM FX fica atrás do ícone ou da imagem; sozinho, preenche o círculo do botão.", "Wizualizacja: nastrój HOLM FX jest za ikoną lub obrazem; sam wypełnia koło przycisku."],
    "Accueil": ["Home", "Startseite", "Inicio", "Home", "Start", "Início", "Start"],
    "Énergie": ["Energy", "Energie", "Energía", "Energia", "Energie", "Energia", "Energia"],
    "Lumières": ["Lights", "Lichter", "Luces", "Luci", "Lampen", "Luzes", "Światła"],
    "Météo": ["Weather", "Wetter", "Tiempo", "Meteo", "Weer", "Meteorologia", "Pogoda"],
  };
  let LANG = "fr";
  const langOf = (hass, c) => { const l = String((c && c.language) || (hass && ((hass.locale && hass.locale.language) || hass.language)) || navigator.language || "en").toLowerCase().split(/[-_]/)[0]; return l === "fr" || HOLM_LANGS.includes(l) ? l : "en"; };
  const setLang = (hass, c) => (LANG = langOf(hass, c));
  const _ = (s, v) => { let o = LANG === "fr" ? s : ((I18N[s] && I18N[s][HOLM_LANGS.indexOf(LANG)]) || s); if (v) for (const k in v) o = o.split("{" + k + "}").join(v[k]); return o; };
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // couleur saisie par l'utilisateur : couleur CSS simple ou var(--…), sinon ignorée
  const safeColor = (v) => { const s = String(v || "").trim(); return /^(#[0-9a-f]{3,8}|(rgb|rgba|hsl|hsla)\([\d\s.,%/-]+\)|var\(--[\w-]+\)|[a-z]{3,20})$/i.test(s) ? s : ""; };
  const safeCss = (v) => String(v || "").replace(/[;{}<>]/g, "").trim();   // fond, arrondi : une seule valeur CSS
  const safeUrl = (v) => { const s = String(v || "").trim(); return /^(\/|https?:\/\/|data:image\/)/i.test(s) ? s : ""; };

  const SIZES = { s: [30, 10], m: [40, 10.5], l: [52, 12.5], xl: [64, 14] };
  const ACTIVE = ["on", "open", "opening", "closing", "home", "playing", "heat", "cool", "heat_cool", "auto", "dry", "fan_only", "heating", "cooling",
    "unlocked", "unlocking", "armed_home", "armed_away", "armed_night", "armed_vacation", "armed_custom_bypass", "arming", "triggered", "pending",
    "cleaning", "returning", "active", "detected", "true"];
  const isActive = (st, it) => {
    if (!st || ["unavailable", "unknown"].includes(st.state)) return false;
    const n = parseFloat(st.state);
    if (it.above !== undefined && it.above !== null && it.above !== "") return !isNaN(n) && n > +it.above && (it.below === undefined || it.below === null || it.below === "" || n < +it.below);
    if (it.below !== undefined && it.below !== null && it.below !== "") return !isNaN(n) && n < +it.below;
    if (it.active_state) return String(it.active_state).split(",").map((x) => x.trim().toLowerCase()).filter(Boolean).includes(String(st.state).toLowerCase());
    return ACTIVE.includes(String(st.state).toLowerCase());
  };
  const fmtState = (hass, st) => {
    if (!st) return "";
    try { if (hass.formatEntityState) return hass.formatEntityState(st); } catch (e) { /* ancienne version de HA */ }
    const u = st.attributes.unit_of_measurement;
    return `${st.state}${u ? " " + u : ""}`;
  };
  const fire = (node, type, detail) => node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
  const navigate = (path) => { history.pushState(null, "", path); window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } })); };
  const curPath = () => decodeURIComponent(location.pathname).replace(/\/$/, "");
  const sameView = (p) => { if (!p) return false; const a = String(p).split("?")[0].replace(/\/$/, ""); return !!a && a === curPath(); };

  // action par défaut : la vue (url), sinon les détails de l'entité
  const defaultTap = (it) => (it.url ? (/^https?:\/\//i.test(it.url) ? { action: "url", url_path: it.url } : { action: "navigate", navigation_path: it.url }) : it.entity ? { action: "more-info" } : { action: "none" });
  const runAction = (node, hass, act, it) => {
    if (!act || !act.action || act.action === "none") return;
    if (act.confirmation && !confirm(typeof act.confirmation === "object" && act.confirmation.text ? act.confirmation.text : `${it.name || ""} ?`)) return;
    const entity = act.entity || it.entity;
    switch (act.action) {
      case "navigate": if (act.navigation_path) navigate(act.navigation_path); break;
      case "url": if (act.url_path) window.open(act.url_path, act.new_tab === false ? "_self" : "_blank", "noopener"); break;
      case "more-info": if (entity) fire(node, "hass-more-info", { entityId: entity }); break;
      case "toggle": if (entity) hass.callService("homeassistant", "toggle", { entity_id: entity }); break;
      case "perform-action": case "call-service": {
        const srv = act.perform_action || act.service; if (!srv || !srv.includes(".")) break;
        const [d, s] = srv.split(".", 2);
        hass.callService(d, s, act.data || act.service_data || {}, act.target);
        break;
      }
      case "assist": fire(node, "show-dialog", { dialogTag: "ha-voice-command-dialog", dialogImport: () => {}, dialogParams: {} }); break;
      case "fire-dom-event": fire(node, "ll-custom", act); break;
      default: break;
    }
  };

  const fxReady = () => !!customElements.get("holm-fx-card");
  const fxList = () => window.HOLM_FX_AMBIANCES || [];

  // ---------------- la carte ----------------
  class HolmShortcutsCard extends HTMLElement {
    static getConfigElement() { return document.createElement("holm-shortcuts-card-editor"); }
    static getStubConfig() {
      return { items: [
        { name: _("Accueil"), icon: "mdi:home", url: "/lovelace/0", color: "#26c6da" },
        { name: _("Énergie"), icon: "mdi:solar-power-variant", color: "#ffb300" },
        { name: _("Lumières"), icon: "mdi:lightbulb-group", color: "#ffd54f" },
        { name: _("Météo"), icon: "mdi:weather-partly-cloudy", color: "#4fc3f7" },
      ] };
    }
    setConfig(c) {
      if (!c || (c.items !== undefined && !Array.isArray(c.items))) throw new Error("items: list of buttons");
      this._c = { layout: "row", size: "m", labels: "below", label_lines: 2, style: "glass", button_style: "plain", columns: 4,
        effects: true, entrance: true, highlight: true, haptic: true, ...c, items: (c.items || []).filter((x) => x && typeof x === "object") };
      this._sig = "";
      if (this._hass) this._build();
    }
    set hass(h) {
      const first = !this._hass;
      this._hass = h;
      if (first || !this.shadowRoot || this._lang !== langOf(h, this._c)) this._build();
      else this._update();
    }
    getCardSize() { return this._c && this._c.layout === "grid" ? 1 + Math.ceil(this._items().length / (this._c.columns || 4)) * 2 : 2; }
    getGridOptions() { return { columns: 12, min_columns: 3, rows: "auto" }; }
    connectedCallback() {
      this._onLoc = () => this._update();
      window.addEventListener("location-changed", this._onLoc);
      window.addEventListener("popstate", this._onLoc);
      if (this._ro && this.shadowRoot) this._watchFit();
      if (!fxReady() && !this._fxWait) { this._fxWait = true; customElements.whenDefined("holm-fx-card").then(() => { this._fxWait = false; this._mountFx(); }); }
    }
    disconnectedCallback() { if (this._ro) this._ro.disconnect(); window.removeEventListener("location-changed", this._onLoc); window.removeEventListener("popstate", this._onLoc); }
    _items() {
      const u = this._hass && this._hass.user;
      return this._c.items.map((it, i) => ({ ...it, _i: i })).filter((it) => !Array.isArray(it.users) || !it.users.length || (u && it.users.some((x) => [u.name, u.id].map((v) => String(v || "").toLowerCase()).includes(String(x).toLowerCase()))));
    }
    _build() {
      if (!this._c || !this._hass) return;
      this._lang = setLang(this._hass, this._c);
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
      const c = this._c, items = this._items();
      const [px, fs] = SIZES[c.size] || (+c.size ? [+c.size, Math.max(9, Math.round(+c.size / 3.6))] : SIZES.m);
      const vars = [`--sz:${px}px`, `--fs:${fs}px`, `--lines:${Math.max(1, +c.label_lines || 2)}`, `--cols:${Math.max(1, +c.columns || 4)}`];
      const acc = safeColor(c.accent); if (acc) vars.push(`--acc:${acc}`);
      const bg = safeCss(c.background); if (bg) vars.push(`--hs-bg:${bg}`);
      const rad = safeCss(c.border_radius); if (rad) vars.push(`--hs-radius:${/^\d+(\.\d+)?$/.test(rad) ? rad + "px" : rad}`);
      const cls = [`st-${c.style}`, `bs-${c.button_style}`, `lay-${c.layout}`, c.labels === "hidden" ? "nolab" : "", c.effects !== false ? "fxon" : "", c.entrance !== false && !this._shown ? "enter" : "", bg ? "hasbg" : ""].join(" ");
      this.shadowRoot.innerHTML = `<style>${CSS}</style>
        <ha-card class="${cls}" style="${vars.join(";")}">
          ${c.fx ? `<div class="bgfx" data-bgfx></div>` : ""}
          ${c.title ? `<div class="ttl">${esc(c.title)}</div>` : ""}
          ${items.length ? `<div class="items">${items.map((it, k) => this._itemHtml(it, k)).join("")}</div>` : `<div class="empty">${esc(_("Ajoutez des boutons dans l'éditeur de la carte."))}</div>`}
        </ha-card>`;
      this._shown = true;
      this._fx = [];
      this._bind();
      this._mountFx();
      this._update(true);
      this._watchFit();
    }
    // libellés : réduire un peu la police de toute la barre si un mot ne tient pas dans la largeur d'un bouton (jusqu'à 8 px)
    _watchFit() {
      if (this._ro) this._ro.disconnect();
      const card = this.shadowRoot.querySelector("ha-card"); if (!card || !window.ResizeObserver) return;
      this._ro = new ResizeObserver(() => { cancelAnimationFrame(this._fitRaf); this._fitRaf = requestAnimationFrame(() => this._fit()); });
      this._ro.observe(card);
    }
    _fit() {
      const card = this.shadowRoot && this.shadowRoot.querySelector("ha-card"); if (!card || this._c.button_style === "pill" || this._c.labels === "hidden") return;
      card.style.removeProperty("--fs-fit");
      const lbs = [...card.querySelectorAll(".lb")]; if (!lbs.length) return;
      const base = parseFloat(getComputedStyle(lbs[0]).fontSize) || 11;
      const cv = this._cv || (this._cv = document.createElement("canvas").getContext("2d"));
      const fam = getComputedStyle(lbs[0]).fontFamily;
      let fs = base;
      for (const lb of lbs) {
        const w = lb.clientWidth - 2; if (w <= 0) continue;
        const word = (lb.textContent || "").split(/\s+/).reduce((a, b) => (b.length > a.length ? b : a), "");
        if (!word) continue;
        let f = fs;
        cv.font = `600 ${f}px ${fam}`;
        while (f > 8 && cv.measureText(word).width > w) { f -= 0.5; cv.font = `600 ${f}px ${fam}`; }
        fs = Math.min(fs, f);
      }
      if (fs < base) card.style.setProperty("--fs-fit", fs + "px");
    }
    _itemHtml(it, k) {
      const col = safeColor(it.color), img = safeUrl(it.image), fx = it.fx && it.fx !== "none" ? String(it.fx) : "";
      const vis = img ? `<img src="${esc(img)}" alt="" loading="lazy" draggable="false">` : it.icon ? `<ha-icon icon="${esc(it.icon)}"></ha-icon>` : "";
      const kind = fx ? "hasfx" : img ? "img" : it.icon ? "ico" : "none";
      return `<button class="it" data-i="${it._i}" style="${col ? `--c:${col};` : ""}--d:${k * 55}ms" aria-label="${esc(it.name || "")}">
          <span class="vis ${kind}">${fx ? `<span class="fx" data-fx="${esc(fx)}"></span>` : ""}${vis}<span class="bdg"></span></span>
          <span class="txt"><span class="lb">${esc(it.name || "")}</span><span class="val"></span></span>
        </button>`;
    }
    _mountFx() {
      if (!this.shadowRoot || !fxReady()) return;
      const c = this._c;
      const bar = this.shadowRoot.querySelector("[data-bgfx]");
      if (bar && !bar.firstChild) {
        const e = document.createElement("holm-fx-card");
        try { e.setConfig({ ambiance: c.fx, height: "100%", background: "transparent", intensity: +c.fx_intensity || 1, color: safeColor(c.accent) || undefined, max_fps: 30 }); bar.appendChild(e); this._fx.push(e); } catch (err) { console.warn("HOLM Shortcuts : ambiance", c.fx, err); }
      }
      this.shadowRoot.querySelectorAll(".fx[data-fx]").forEach((host) => {
        if (host.firstChild) return;
        const it = c.items[+host.closest(".it").dataset.i] || {};
        const cfg = { ambiance: host.dataset.fx, height: "100%", background: "transparent", intensity: +it.fx_intensity || 1, max_fps: 30, frame: false };
        const col = safeColor(it.color); if (col) cfg.color = col;
        if (it.fx_only_active && it.entity) Object.assign(cfg, { entity: it.entity, inactive: "calme" }, it.above !== undefined && it.above !== "" ? { above: +it.above } : {}, it.below !== undefined && it.below !== "" ? { below: +it.below } : {});
        const e = document.createElement("holm-fx-card");
        try { e.setConfig(cfg); host.appendChild(e); this._fx.push(e); } catch (err) { console.warn("HOLM Shortcuts : ambiance", cfg.ambiance, err); }
      });
      this._fx.forEach((e) => { e.hass = this._hass; });
    }
    _update(force) {
      if (!this.shadowRoot || !this._hass || !this._c) return;
      const h = this._hass, c = this._c;
      const ents = new Set();
      c.items.forEach((it) => { if (it.entity) ents.add(it.entity); const b = it.badge || {}; if (b.entity) ents.add(b.entity); (b.entities || []).forEach((e) => ents.add(e)); });
      const key = [...ents].map((e) => { const s = h.states[e]; return s ? e + s.state + (s.last_updated || "") : e; }).join("|") + "#" + curPath();
      if (!force && key === this._key) { this._fx && this._fx.forEach((e) => { e.hass = h; }); return; }
      this._key = key;
      this.shadowRoot.querySelectorAll(".it").forEach((el) => {
        const it = c.items[+el.dataset.i] || {}, st = it.entity ? h.states[it.entity] : null;
        const on = !!st && isActive(st, it);
        el.classList.toggle("on", on);
        const im = el.querySelector(".vis img"), alt = safeUrl(it.image_on);
        if (im && alt) { const want = on ? alt : safeUrl(it.image); if (im.getAttribute("src") !== want) im.setAttribute("src", want); }
        const tap = it.tap_action || defaultTap(it);
        el.classList.toggle("cur", c.highlight !== false && tap.action === "navigate" && sameView(tap.navigation_path));
        const val = el.querySelector(".val");
        const show = st && it.show_state !== false;
        val.textContent = show ? fmtState(h, st) : "";
        val.style.display = show ? "" : "none";
        // pastille : nombre d'entités actives, ou valeur d'une entité (point pulsant si elle est active sans être un nombre)
        const b = it.badge, bd = el.querySelector(".bdg");
        let txt = "", dot = false;
        if (b && Array.isArray(b.entities) && b.entities.length) { const n = b.entities.filter((e) => isActive(h.states[e], {})).length; if (n) txt = String(n); }
        else if (b && b.entity) { const s = h.states[b.entity]; if (s) { const n = parseFloat(s.state); if (!isNaN(n)) { if (n > 0) txt = String(Math.round(n * 10) / 10).replace(".", LANG === "en" ? "." : ","); } else if (isActive(s, {})) dot = true; } }
        bd.textContent = txt;
        bd.className = `bdg${txt || dot ? " show" : ""}${dot ? " dot" : ""}`;
        const bc = b && safeColor(b.color); bd.style.background = bc || "";
      });
      this._fx && this._fx.forEach((e) => { e.hass = h; });
    }
    _bind() {
      this.shadowRoot.querySelectorAll(".it").forEach((el) => {
        let timer = null, held = false;
        const it = () => this._c.items[+el.dataset.i] || {};
        const clear = () => { clearTimeout(timer); timer = null; };
        el.addEventListener("pointerdown", (e) => {
          held = false;
          if (this._c.effects !== false) this._ripple(el, e);
          clear();
          timer = setTimeout(() => {
            const x = it(); const act = x.hold_action || (x.entity ? { action: "more-info" } : null);
            if (!act || act.action === "none") return;
            held = true; this._haptic("medium"); runAction(this, this._hass, act, x);
          }, 500);
        });
        ["pointerup", "pointerleave", "pointercancel"].forEach((t) => el.addEventListener(t, clear));
        el.addEventListener("contextmenu", (e) => { if (held || timer) e.preventDefault(); });
        el.addEventListener("click", (e) => {
          clear();
          if (held) { held = false; e.preventDefault(); return; }
          const x = it(); this._haptic("light");
          runAction(this, this._hass, x.tap_action || defaultTap(x), x);
        });
      });
    }
    _ripple(el, e) {
      const r = el.getBoundingClientRect(), d = Math.max(r.width, r.height) * 1.4, s = document.createElement("span");
      s.className = "ripple";
      s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
      el.appendChild(s); setTimeout(() => s.remove(), 650);
    }
    _haptic(kind) { if (this._c.haptic !== false) fire(this, "haptic", kind); }
  }

  const CSS = `
  :host { display:block; --acc: var(--primary-color, #26c6da); }
  ha-card { position:relative; overflow:hidden; padding:10px 8px; border-radius: var(--hs-radius, var(--ha-card-border-radius, 16px)); isolation:isolate; }
  ha-card.st-glass { background: var(--hs-bg, color-mix(in srgb, var(--card-background-color, #1c1c1c) 58%, transparent)); -webkit-backdrop-filter: blur(16px) saturate(1.35); backdrop-filter: blur(16px) saturate(1.35);
    border:1px solid rgba(255,255,255,.09); box-shadow: 0 10px 28px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.07); }
  ha-card.st-card.hasbg { background: var(--hs-bg); }
  ha-card.st-transparent { background: var(--hs-bg, none); border:none; box-shadow:none; -webkit-backdrop-filter:none; backdrop-filter:none; }
  .bgfx { position:absolute; inset:0; z-index:0; pointer-events:none; }
  .bgfx holm-fx-card { position:absolute; inset:0; display:block; }
  .ttl { position:relative; z-index:1; font-size:14px; font-weight:700; margin:0 6px 8px; }
  .empty { position:relative; z-index:1; padding:10px; font-size:13px; opacity:.7; text-align:center; }
  .items { position:relative; z-index:1; display:flex; gap:6px; }
  .lay-row .items { justify-content:space-around; }
  .lay-row .it { flex:1 1 0; min-width:0; }
  .lay-grid .items { display:grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); }
  .lay-scroll .items { overflow-x:auto; scroll-snap-type:x mandatory; scrollbar-width:none; padding-bottom:2px; }
  .lay-scroll .items::-webkit-scrollbar { display:none; }
  .lay-scroll .it { flex:0 0 auto; width: calc(var(--sz) * 2); scroll-snap-align:start; }
  .lay-scroll.bs-pill .it { width:auto; flex:0 0 auto; }
  .it { position:relative; overflow:hidden; display:flex; flex-direction:column; align-items:center; gap:5px; padding:6px 2px 5px; border:0; margin:0; background:none; color: var(--primary-text-color);
    font:inherit; cursor:pointer; border-radius:14px; -webkit-tap-highlight-color:transparent; outline:none; touch-action:manipulation; user-select:none; -webkit-user-select:none;
    transition: transform .25s cubic-bezier(.2,.9,.3,1.4), background .25s, box-shadow .25s; }
  .it:focus-visible { box-shadow: 0 0 0 2px var(--acc); }
  .bs-tile .it { background: rgba(127,127,127,.1); border:1px solid rgba(127,127,127,.14); padding:10px 4px 8px; }
  .bs-pill .items { flex-wrap:wrap; }
  .lay-scroll.bs-pill .items { flex-wrap:nowrap; }
  .bs-pill .it { flex-direction:row; flex:0 1 auto; gap:8px; padding:5px 14px 5px 5px; border-radius:999px; background: rgba(127,127,127,.12); text-align:left; }
  .bs-pill .txt { align-items:flex-start; }
  .vis { position:relative; width:var(--sz); height:var(--sz); display:grid; place-items:center; flex:none; transition: transform .3s cubic-bezier(.2,.9,.3,1.5), filter .3s; }
  .vis > * { grid-area:1/1; }
  .vis.ico::before { content:""; position:absolute; inset:0; border-radius:50%; background: color-mix(in srgb, var(--c, var(--acc)) 16%, transparent); transition: background .3s; }
  .vis.hasfx { border-radius:50%; box-shadow: 0 0 0 1px color-mix(in srgb, var(--c, var(--acc)) 30%, transparent), 0 4px 14px color-mix(in srgb, var(--c, var(--acc)) 25%, transparent); }
  .vis .fx { position:absolute; inset:0; border-radius:50%; overflow:hidden; z-index:0; background: color-mix(in srgb, var(--c, var(--acc)) 12%, #0b1416); }
  .vis .fx holm-fx-card { position:absolute; inset:0; display:block; }
  .vis img { position:relative; z-index:1; width:100%; height:100%; object-fit:contain; filter: drop-shadow(0 3px 6px rgba(0,0,0,.35)); pointer-events:none; }
  .vis.hasfx img { width:68%; height:68%; }
  .vis ha-icon { position:relative; z-index:1; --mdc-icon-size: calc(var(--sz) * .58); color: var(--c, var(--acc)); filter: drop-shadow(0 2px 6px color-mix(in srgb, var(--c, var(--acc)) 45%, transparent)); }
  .vis.hasfx ha-icon { color:#fff; filter: drop-shadow(0 1px 4px rgba(0,0,0,.6)); }
  .txt { display:flex; flex-direction:column; align-items:center; min-width:0; max-width:100%; }
  .nolab .txt { display:none; }
  .lb { font-size:var(--fs-fit, var(--fs)); font-weight:600; line-height:1.18; text-align:center; display:-webkit-box; -webkit-line-clamp:var(--lines); -webkit-box-orient:vertical; overflow:hidden; overflow-wrap:anywhere; hyphens:manual; transition: color .25s; }
  .bs-pill .lb { text-align:left; white-space:nowrap; display:block; overflow:visible; }
  .val { font-size: calc(var(--fs) * .95); opacity:.72; font-variant-numeric: tabular-nums; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%; }
  .bdg { position:absolute; top:-5px; right:-7px; z-index:3; min-width:17px; height:17px; padding:0 5px; box-sizing:border-box; border-radius:9px; background:#e53935; color:#fff;
    font-size:10.5px; font-weight:700; line-height:17px; text-align:center; display:none; box-shadow: 0 0 0 2px var(--card-background-color, #1c1c1c); }
  .bdg.show { display:block; animation: hs-pop .4s cubic-bezier(.2,.9,.3,1.6); }
  .bdg.dot { min-width:11px; width:11px; height:11px; padding:0; top:-2px; right:-2px; animation: hs-pulse 1.6s ease-in-out infinite; }
  /* actif : anneau lumineux qui respire, libellé coloré */
  .it.on .vis::after { content:""; position:absolute; inset:-5px; border-radius:50%; border:2px solid var(--c, var(--acc)); box-shadow: 0 0 12px var(--c, var(--acc)); animation: hs-ring 2.4s ease-in-out infinite; pointer-events:none; }
  .it.on .vis.ico::before { background: color-mix(in srgb, var(--c, var(--acc)) 32%, transparent); }
  .it.on .lb { color: var(--c, var(--acc)); }
  /* vue en cours */
  .it.cur { background: color-mix(in srgb, var(--acc) 16%, transparent); }
  .it.cur .lb { color: var(--acc); }
  .it.cur::after { content:""; position:absolute; left:32%; right:32%; bottom:1px; height:3px; border-radius:2px; background: var(--acc); }
  .bs-pill .it.cur::after { display:none; }
  /* effets */
  @media (hover: hover) {
    .fxon .it:hover { background: rgba(127,127,127,.09); }
    .fxon.bs-tile .it:hover { background: rgba(127,127,127,.16); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,.18); }
    .fxon .it:hover .vis { transform: translateY(-3px) scale(1.07); }
    .fxon .it:hover .vis img, .fxon .it:hover .vis ha-icon { filter: drop-shadow(0 6px 10px color-mix(in srgb, var(--c, var(--acc)) 55%, transparent)); }
  }
  .fxon .it:active .vis { transform: scale(.88); transition-duration:.08s; }
  .ripple { position:absolute; border-radius:50%; transform:scale(0); background: color-mix(in srgb, var(--c, var(--acc)) 30%, transparent); animation: hs-rip .6s ease-out forwards; pointer-events:none; z-index:0; }
  .enter .it { animation: hs-up .55s cubic-bezier(.2,.9,.3,1.2) both; animation-delay: var(--d); }
  @keyframes hs-up { from { opacity:0; transform: translateY(10px) scale(.94); } }
  @keyframes hs-rip { to { transform:scale(1); opacity:0; } }
  @keyframes hs-ring { 0%,100% { opacity:.85; transform:scale(1); } 50% { opacity:.35; transform:scale(1.08); } }
  @keyframes hs-pop { from { transform:scale(0); } }
  @keyframes hs-pulse { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(1.35); opacity:.6; } }
  @media (prefers-reduced-motion: reduce) { .it, .vis, .bdg, .it.on .vis::after, .enter .it { animation:none !important; transition:none !important; } }
  `;

  // ---------------- éditeur visuel ----------------
  const langField = () => ({ name: "language", selector: { select: { mode: "dropdown", options: [{ value: "", label: _("Automatique (profil)") }, ...Object.entries(LANG_NAMES).map(([value, label]) => ({ value, label }))] } } });
  const fxOptions = () => [{ value: "none", label: _("Aucune") }, ...fxList().map((a) => ({ value: a.id, label: a.name || a.id }))];
  const fxSel = () => (fxList().length ? { select: { mode: "dropdown", options: fxOptions() } } : { text: {} });

  class HolmShortcutsCardEditor extends HTMLElement {
    setConfig(c) {
      this._config = { ...c, items: Array.isArray(c.items) ? c.items.map((x) => ({ ...x })) : [] };
      if (this._ownChange) { this._ownChange = false; this._syncForms(); return; }
      this._render();
    }
    set hass(h) {
      const first = !this._hass;
      this._hass = h;
      if (first) { this._render(); if (!fxReady()) customElements.whenDefined("holm-fx-card").then(() => this._render()); }
      this.querySelectorAll("ha-form").forEach((f) => { f.hass = h; });
    }
    _emit() {
      const out = { ...this._config };
      const defs = { layout: "row", size: "m", labels: "below", label_lines: 2, style: "glass", button_style: "plain", columns: 4, effects: true, entrance: true, highlight: true, haptic: true, fx_intensity: 1 };
      for (const [k, v] of Object.entries(out)) if (v === "" || v === undefined || v === null || defs[k] === v || (k === "fx" && v === "none")) delete out[k];
      out.items = (this._config.items || []).map((it) => {
        const o = { ...it };
        for (const [k, v] of Object.entries(o)) if (v === "" || v === undefined || v === null || (k === "fx" && v === "none") || (Array.isArray(v) && !v.length)) delete o[k];
        if (o.badge) { const b = { ...o.badge }; for (const [k, v] of Object.entries(b)) if (v === "" || v == null || (Array.isArray(v) && !v.length)) delete b[k]; if (Object.keys(b).length) o.badge = b; else delete o.badge; }
        return o;
      });
      this._ownChange = true;
      fire(this, "config-changed", { config: out });
    }
    _globalSchema() {
      const sizeOpts = [["s", "Petite"], ["m", "Moyenne"], ["l", "Grande"], ["xl", "Très grande"]].map(([value, l]) => ({ value, label: _(l) }));
      return [
        langField(),
        { name: "title", selector: { text: {} } },
        { type: "expandable", name: "", title: _("Apparence"), icon: "mdi:palette-outline", schema: [
          { type: "grid", name: "", schema: [
            { name: "layout", selector: { select: { mode: "dropdown", options: [{ value: "row", label: _("En rangée (largeur égale)") }, { value: "grid", label: _("En grille") }, { value: "scroll", label: _("Défilante (mobile)") }] } } },
            { name: "columns", selector: { number: { min: 1, max: 12, mode: "box" } } },
            { name: "size", selector: { select: { mode: "dropdown", options: sizeOpts } } },
            { name: "button_style", selector: { select: { mode: "dropdown", options: [{ value: "plain", label: _("Simple (image et libellé)") }, { value: "tile", label: _("Tuiles") }, { value: "pill", label: _("Pastilles (icône à gauche)") }] } } },
            { name: "labels", selector: { select: { mode: "dropdown", options: [{ value: "below", label: _("Sous le bouton") }, { value: "hidden", label: _("Masqués") }] } } },
            { name: "label_lines", selector: { number: { min: 1, max: 4, mode: "box" } } },
            { name: "style", selector: { select: { mode: "dropdown", options: [{ value: "glass", label: _("Verre dépoli") }, { value: "card", label: _("Fond de carte du thème") }, { value: "transparent", label: _("Transparent") }] } } },
            { name: "accent", selector: { text: {} } },
            { name: "background", selector: { text: {} } },
            { name: "border_radius", selector: { text: {} } },
          ] },
        ] },
        { type: "expandable", name: "", title: _("Effets"), icon: "mdi:auto-fix", schema: [
          { type: "grid", name: "", schema: [{ name: "fx", selector: fxSel() }, { name: "fx_intensity", selector: { number: { min: 0.2, max: 2, step: 0.1, mode: "slider" } } }] },
          { type: "grid", name: "", schema: [{ name: "effects", selector: { boolean: {} } }, { name: "entrance", selector: { boolean: {} } }, { name: "highlight", selector: { boolean: {} } }, { name: "haptic", selector: { boolean: {} } }] },
        ] },
      ];
    }
    _itemSchema() {
      return [
        { name: "name", selector: { text: {} } },
        { type: "grid", name: "", schema: [{ name: "icon", selector: { icon: {} } }, { name: "image", selector: { text: {} } }] },
        { type: "grid", name: "", schema: [{ name: "fx", selector: fxSel() }, { name: "color", selector: { text: {} } }] },
        { name: "url", selector: { navigation: {} } },
        { name: "entity", selector: { entity: {} } },
        { type: "expandable", name: "", title: _("Actif quand…"), icon: "mdi:lightning-bolt-outline", schema: [
          { name: "show_state", selector: { boolean: {} } },
          { name: "active_state", selector: { text: {} } },
          { type: "grid", name: "", schema: [{ name: "above", selector: { number: { mode: "box", step: "any" } } }, { name: "below", selector: { number: { mode: "box", step: "any" } } }] },
          { name: "image_on", selector: { text: {} } },
          { name: "fx_only_active", selector: { boolean: {} } },
        ] },
        { type: "expandable", name: "", title: _("Pastille"), icon: "mdi:numeric-1-circle-outline", schema: [
          { name: "badge_entities", selector: { entity: { multiple: true } } },
          { name: "badge_entity", selector: { entity: {} } },
          { name: "badge_color", selector: { text: {} } },
        ] },
        { type: "expandable", name: "", title: _("Actions"), icon: "mdi:gesture-tap", schema: [
          { name: "tap_action", selector: { ui_action: {} } },
          { name: "hold_action", selector: { ui_action: {} } },
        ] },
      ];
    }
    _labels() {
      return { language: "Langue", title: "Titre (facultatif)", layout: "Disposition", columns: "Colonnes (grille)", size: "Taille des boutons", button_style: "Style des boutons", labels: "Libellés",
        label_lines: "Lignes de libellé", style: "Style de la barre", accent: "Couleur principale", background: "Fond (couleur, dégradé ou variable de thème)", border_radius: "Arrondi des bords (ex. 16px)",
        fx: this._inItem ? "Ambiance HOLM FX du bouton" : "Ambiance HOLM FX de la barre", fx_intensity: "Intensité de l'ambiance", effects: "Effets au survol et à l'appui", entrance: "Animation d'apparition",
        highlight: "Mettre en évidence la vue en cours", haptic: "Vibration au toucher", name: "Nom", icon: "Icône", image: "Image (adresse /local/… ou https://…)", color: "Couleur (icône, halo, ambiance)",
        url: "Vue à ouvrir", entity: "Entité (valeur en direct, état actif)", show_state: "Afficher la valeur de l'entité", active_state: "États actifs (séparés par des virgules ; vide = allumé, ouvert, en lecture…)",
        above: "Actif au-dessus de", image_on: "Image quand l'entité est active (facultatif)", below: "Actif en dessous de", fx_only_active: "Animer l'ambiance seulement quand l'entité est active", badge_entities: "Pastille : compter les entités actives",
        badge_entity: "Pastille : valeur d'une entité", badge_color: "Couleur de la pastille", tap_action: "Action au toucher (sinon : la vue, ou les détails de l'entité)", hold_action: "Action à l'appui long" };
    }
    _itemData(it) {
      const b = it.badge || {};
      return { show_state: true, fx: "none", ...it, badge_entities: b.entities || [], badge_entity: b.entity || "", badge_color: b.color || "" };
    }
    _render() {
      if (!this._hass || !this._config) return;
      setLang(this._hass, this._config);
      const items = this._config.items || [];
      const open = this._open ?? -1;
      this.innerHTML = `<style>${ECSS}</style>
        <div class="g"></div>
        ${!fxReady() ? `<div class="warn">${esc(_("HOLM FX n'est pas installé : les ambiances ne s'afficheront pas."))}</div>` : ""}
        <div class="sec"><ha-icon icon="mdi:gesture-tap-button"></ha-icon>${esc(_("Boutons"))}</div>
        <div class="list">${items.map((it, i) => `<div class="row ${open === i ? "open" : ""}" data-i="${i}">
            <div class="rh">
              <span class="pv" style="${safeColor(it.color) ? `--c:${safeColor(it.color)}` : ""}">${safeUrl(it.image) ? `<img src="${esc(safeUrl(it.image))}" alt="">` : it.icon ? `<ha-icon icon="${esc(it.icon)}"></ha-icon>` : it.fx && it.fx !== "none" ? `<ha-icon icon="mdi:auto-fix"></ha-icon>` : `<ha-icon icon="mdi:gesture-tap-button"></ha-icon>`}</span>
              <button class="nm" data-a="toggle">${esc(it.name || _("Nouveau bouton"))}</button>
              <button class="ib" data-a="up" title="${esc(_("Monter"))}" ${i ? "" : "disabled"}><ha-icon icon="mdi:arrow-up"></ha-icon></button>
              <button class="ib" data-a="down" title="${esc(_("Descendre"))}" ${i < items.length - 1 ? "" : "disabled"}><ha-icon icon="mdi:arrow-down"></ha-icon></button>
              <button class="ib" data-a="dup" title="${esc(_("Dupliquer"))}"><ha-icon icon="mdi:content-copy"></ha-icon></button>
              <button class="ib" data-a="del" title="${esc(_("Supprimer"))}"><ha-icon icon="mdi:delete-outline"></ha-icon></button>
              <button class="ib" data-a="toggle" title="${esc(_("Modifier"))}"><ha-icon icon="mdi:chevron-${open === i ? "up" : "down"}"></ha-icon></button>
            </div>
            ${open === i ? `<div class="rb"><div class="f"></div>
              <div class="up"><button class="btn" data-a="upload"><ha-icon icon="mdi:upload"></ha-icon><span>${esc(_("Téléverser une image"))}</span></button><input type="file" accept="image/*" hidden><span class="umsg"></span></div>
              <div class="hint">${esc(_("Visuel : l'ambiance HOLM FX passe derrière l'icône ou l'image ; seule, elle remplit le rond du bouton."))}</div></div>` : ""}
          </div>`).join("")}</div>
        <button class="btn add" data-a="add"><ha-icon icon="mdi:plus"></ha-icon><span>${esc(_("Ajouter un bouton"))}</span></button>`;
      // réglages généraux
      const g = document.createElement("ha-form");
      this._inItem = false;
      const L = this._labels();
      g.hass = this._hass; g.schema = this._globalSchema(); g.computeLabel = (s) => (L[s.name] ? _(L[s.name]) : s.name);
      g.data = { layout: "row", size: "m", labels: "below", label_lines: 2, style: "glass", button_style: "plain", columns: 4, effects: true, entrance: true, highlight: true, haptic: true, fx: "none", fx_intensity: 1, ...this._config, language: this._config.language || "" };
      g.addEventListener("value-changed", (ev) => { const v = ev.detail.value; const items = this._config.items; this._config = { ...v, items }; if (!v.language) delete this._config.language; this._emit(); });
      this.querySelector(".g").appendChild(g);
      this._gform = g;
      // bouton ouvert
      const box = this.querySelector(".row.open .f");
      if (box) {
        const f = document.createElement("ha-form");
        this._inItem = true;
        const L2 = this._labels();
        f.hass = this._hass; f.schema = this._itemSchema(); f.computeLabel = (s) => (L2[s.name] ? _(L2[s.name]) : s.name);
        f.computeHelper = (s) => (s.name === "url" ? _(L2.url) : undefined);
        f.data = this._itemData(items[open]);
        f.addEventListener("value-changed", (ev) => {
          const v = { ...ev.detail.value };
          const badge = { entities: v.badge_entities, entity: v.badge_entity, color: v.badge_color };
          delete v.badge_entities; delete v.badge_entity; delete v.badge_color;
          if (v.show_state === true) delete v.show_state;
          this._config.items[this._open] = { ...v, badge };
          this._emit();
          this._refreshHeader(this._open);
        });
        box.appendChild(f);
        this._iform = f;
      } else this._iform = null;
      this._wire();
    }
    _syncForms() {
      // la carte a été mise à jour par nos soins : ne pas recréer les formulaires (garder le focus)
      if (this._gform) this._gform.data = { ...this._gform.data, ...this._config, items: undefined };
      if (this._iform && this._config.items[this._open]) this._iform.data = this._itemData(this._config.items[this._open]);
    }
    _refreshHeader(i) {
      const it = this._config.items[i], row = this.querySelector(`.row[data-i="${i}"]`); if (!row || !it) return;
      row.querySelector(".nm").textContent = it.name || _("Nouveau bouton");
      const pv = row.querySelector(".pv"), col = safeColor(it.color);
      pv.style.cssText = col ? `--c:${col}` : "";
      pv.innerHTML = safeUrl(it.image) ? `<img src="${esc(safeUrl(it.image))}" alt="">` : it.icon ? `<ha-icon icon="${esc(it.icon)}"></ha-icon>` : `<ha-icon icon="${it.fx && it.fx !== "none" ? "mdi:auto-fix" : "mdi:gesture-tap-button"}"></ha-icon>`;
    }
    _wire() {
      this.querySelectorAll("[data-a]").forEach((b) => b.addEventListener("click", (e) => {
        e.preventDefault();
        const a = b.dataset.a, row = b.closest(".row"), i = row ? +row.dataset.i : -1, items = this._config.items;
        if (a === "add") { items.push({ name: _("Nouveau bouton"), icon: "mdi:star-four-points-outline" }); this._open = items.length - 1; this._emit(); return this._render(); }
        if (a === "toggle") { this._open = this._open === i ? -1 : i; return this._render(); }
        if (a === "up" && i > 0) { [items[i - 1], items[i]] = [items[i], items[i - 1]]; this._open = this._open === i ? i - 1 : this._open; this._emit(); return this._render(); }
        if (a === "down" && i < items.length - 1) { [items[i + 1], items[i]] = [items[i], items[i + 1]]; this._open = this._open === i ? i + 1 : this._open; this._emit(); return this._render(); }
        if (a === "dup") { items.splice(i + 1, 0, JSON.parse(JSON.stringify(items[i]))); this._open = i + 1; this._emit(); return this._render(); }
        if (a === "del") { items.splice(i, 1); this._open = -1; this._emit(); return this._render(); }
        if (a === "upload") return row.querySelector("input[type=file]").click();
      }));
      const inp = this.querySelector(".row.open input[type=file]");
      if (inp) inp.addEventListener("change", () => this._upload(inp));
    }
    // téléversement par l'intégration « image » de Home Assistant (celle de la carte Image) : /api/image/serve/<id>/original
    async _upload(inp) {
      const file = inp.files && inp.files[0]; if (!file) return;
      const msg = this.querySelector(".row.open .umsg"), i = this._open;
      msg.textContent = _("Téléversement…"); msg.classList.remove("err");
      try {
        const fd = new FormData(); fd.append("file", file);
        const r = await this._hass.fetchWithAuth("/api/image/upload", { method: "POST", body: fd });
        if (!r.ok) throw new Error(r.status === 413 ? "413 (> 20 Mo)" : String(r.status));
        const j = await r.json();
        this._config.items[i] = { ...this._config.items[i], image: `/api/image/serve/${j.id}/original` };
        this._emit(); this._render();
      } catch (err) { msg.textContent = _("Téléversement impossible : {e}", { e: err.message || err }); msg.classList.add("err"); }
    }
  }
  const ECSS = `
    holm-shortcuts-card-editor { display:block; }
    holm-shortcuts-card-editor .sec { display:flex; align-items:center; gap:8px; font-weight:700; margin:18px 0 8px; }
    holm-shortcuts-card-editor .warn { margin:10px 0; padding:8px 10px; border-radius:8px; background: rgba(255,152,0,.14); font-size:13px; }
    holm-shortcuts-card-editor .list { display:flex; flex-direction:column; gap:6px; }
    holm-shortcuts-card-editor .row { border:1px solid var(--divider-color, rgba(127,127,127,.3)); border-radius:12px; overflow:hidden; }
    holm-shortcuts-card-editor .rh { display:flex; align-items:center; gap:4px; padding:4px 4px 4px 8px; }
    holm-shortcuts-card-editor .pv { width:30px; height:30px; flex:none; border-radius:50%; display:grid; place-items:center; background: color-mix(in srgb, var(--c, var(--primary-color)) 16%, transparent); color: var(--c, var(--primary-color)); overflow:hidden; }
    holm-shortcuts-card-editor .pv img { width:100%; height:100%; object-fit:contain; }
    holm-shortcuts-card-editor .pv ha-icon { --mdc-icon-size:18px; }
    holm-shortcuts-card-editor .nm { flex:1; min-width:0; text-align:left; border:0; background:none; color:inherit; font:inherit; font-weight:600; cursor:pointer; padding:6px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
    holm-shortcuts-card-editor .ib { border:0; background:none; color:inherit; cursor:pointer; padding:6px; border-radius:50%; display:grid; place-items:center; opacity:.75; }
    holm-shortcuts-card-editor .ib:hover:not(:disabled) { opacity:1; background: rgba(127,127,127,.15); }
    holm-shortcuts-card-editor .ib:disabled { opacity:.25; cursor:default; }
    holm-shortcuts-card-editor .ib ha-icon { --mdc-icon-size:18px; }
    holm-shortcuts-card-editor .rb { padding:4px 10px 12px; border-top:1px solid var(--divider-color, rgba(127,127,127,.3)); }
    holm-shortcuts-card-editor .up { display:flex; align-items:center; gap:10px; margin-top:8px; flex-wrap:wrap; }
    holm-shortcuts-card-editor .umsg { font-size:12.5px; opacity:.8; } holm-shortcuts-card-editor .umsg.err { color: var(--error-color, #e53935); opacity:1; }
    holm-shortcuts-card-editor .hint { font-size:12px; opacity:.7; margin-top:8px; }
    holm-shortcuts-card-editor .btn { display:inline-flex; align-items:center; gap:6px; border:1px solid var(--divider-color, rgba(127,127,127,.35)); background:none; color:inherit; font:inherit; font-size:13px; font-weight:600; padding:7px 12px; border-radius:10px; cursor:pointer; }
    holm-shortcuts-card-editor .btn:hover { background: rgba(127,127,127,.12); }
    holm-shortcuts-card-editor .btn ha-icon { --mdc-icon-size:18px; }
    holm-shortcuts-card-editor .add { margin-top:10px; width:100%; justify-content:center; border-style:dashed; }
  `;

  if (!customElements.get("holm-shortcuts-card")) customElements.define("holm-shortcuts-card", HolmShortcutsCard);
  if (!customElements.get("holm-shortcuts-card-editor")) customElements.define("holm-shortcuts-card-editor", HolmShortcutsCardEditor);
  window.customCards = window.customCards || [];
  if (!window.customCards.some((c) => c.type === "holm-shortcuts-card")) {
    setLang(document.querySelector("home-assistant")?.hass);
    window.customCards.push({ type: "holm-shortcuts-card", name: _("HOLM Shortcuts"), description: _("Une barre de raccourcis animée : images, icônes ou ambiances HOLM FX, valeurs en direct et actions."), preview: true, documentationURL: "https://github.com/kaaribou/holm-shortcuts" });
  }
  console.info(`%c HOLM-SHORTCUTS %c ${VERSION} `, "background:#26c6da;color:#0b1416;border-radius:3px 0 0 3px", "background:#123;color:#fff;border-radius:0 3px 3px 0");
})();
