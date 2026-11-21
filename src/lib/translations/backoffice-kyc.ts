import type { LangTranslations } from "./utils";

export const BKO_KYC_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      briefing:
        "Le conseiller clientèle Stefan Meier a soumis cet après-midi le dossier suivant pour l'ouverture d'un compte privé. Tu es responsable du premier contrôle. Vérifie le dossier pour en assurer la complétude avant la validation.",
      feedback:
        "Les données professionnelles (profession, employeur, taux d'occupation) sont obligatoires pour la documentation KYC selon les Règles de diligence des banques. Elles forment la base de l'évaluation des risques. Le conseiller clientèle doit compléter ces informations auprès du client avant que le compte puisse être ouvert.",
    },
    "1.2": {
      briefing:
        "La conseillère clientèle Anna Müller a soumis le dossier suivant pour validation. L'entretien d'ouverture a eu lieu hier. Vérifie le dossier pour en assurer la complétude.",
      feedback:
        "Les informations financières (revenu, fortune, origine des fonds) sont des données obligatoires dans le processus KYC. Elles forment la base de l'évaluation des risques. Sans ces informations, aucun contrôle KYC régulier ne peut être effectué.",
    },
    "1.3": {
      briefing:
        "Le conseiller clientèle Marco Rossi te présente le dossier suivant pour l'ouverture d'un compte privé. Examine-le attentivement et prends ta décision.",
      question: "Tu examines ce dossier avant l'ouverture du compte. Quelle est ta décision ?",
      options: [
        { key: "A", text: "Rejeter – le revenu manque" },
        { key: "B", text: "Rejeter – le formulaire A manque" },
        { key: "C", text: "Valider – dossier complet et correct" },
        { key: "D", text: "Valider avec remarque – l'héritage comme origine des fonds doit être attesté par un acte successoral avant que la première transaction puisse être effectuée." },
      ],
      feedback:
        "Le dossier est complet et correctement rempli. Tous les champs obligatoires sont présents, la pièce d'identité est valide, le formulaire A est signé. L'indication 'salaire et héritage' comme origine des fonds est plausible pour ce niveau de fortune. La validation peut avoir lieu.",
    },
    "2.1": {
      briefing:
        "Le conseiller clientèle Luca Ferrari soumet un dossier pour l'ouverture d'un compte d'un expatrié. À première vue, tous les champs semblent remplis. Examine attentivement le dossier avant de décider.",
      feedback:
        "La pièce d'identité a expiré le 15.03.2024 – aujourd'hui c'est plus de deux ans plus tard. L'identification doit être répétée avec un document valide. Selon les Règles de diligence art. 3, une identification physique valide est obligatoire. Pas de pièce d'identité valide = pas d'ouverture de compte.",
    },
    "2.2": {
      briefing:
        "La conseillère clientèle Sarah Keller soumet un dossier pour l'ouverture d'un compte d'une société holding. La société a son siège à Zoug et détient des participations à l'étranger. Vérifie le dossier avant la validation.",
      feedback:
        "Les sociétés de domicile (holdings sans activité opérationnelle) nécessitent obligatoirement le formulaire A, car les ayants droit économiques doivent être identifiés. Le formulaire K est uniquement pour les sociétés d'exploitation. L'ADE (ayant droit économique) doit être documenté et la diligence accrue explicitement mentionnée – c'est la procédure standard pour les holdings.",
    },
    "2.3": {
      briefing:
        "Un dossier parvient de la filiale Berne-Centre. L'entretien d'ouverture a eu lieu la semaine dernière. Le conseiller clientèle a soumis le dossier aujourd'hui pour validation. Examine-le attentivement.",
      feedback:
        "Lorsque plusieurs données obligatoires sont incomplètes, le dossier doit être entièrement rejeté. Tous les points manquants doivent être listés individuellement dans le commentaire afin que le conseiller clientèle puisse faire les relances ciblées. Sans signature, le formulaire A n'est en outre pas juridiquement valide.",
    },
    "3.1": {
      briefing:
        "Tu reçois le dossier pour l'ouverture d'un compte privé. Le client est diplomate et vit depuis peu en Suisse. Le dossier semble complètement rempli à première vue. Examine-le attentivement avant la validation.",
      feedback:
        "Les ambassadeurs sont par définition des PPE (Personnes Politiquement Exposées). Selon la LBA art. 6, les obligations de diligence accrue doivent obligatoirement être appliquées. L'approbation de la direction générale est en outre requise avant que le compte puisse être ouvert. Ces trois points sont entièrement absents – le dossier doit être rejeté.",
    },
    "3.2": {
      briefing:
        "Le conseiller clientèle Tim Schärer te présente le dossier d'un nouveau client. Tous les champs sont remplis, le formulaire A est présent, la pièce d'identité est valide. Tu examines le dossier sur le fond.",
      question: "Tu examines ce dossier. Qu'est-ce qui te frappe et quelle est ta décision ?",
      options: [
        { key: "A", text: "Valider – tous les champs sont remplis et formellement corrects" },
        { key: "B", text: "Rejeter – le revenu n'est pas attesté par un certificat de salaire" },
        { key: "C", text: "Demande de clarification sur l'origine de la fortune – CHF 1'800'000 doit être expliqué avec ce revenu" },
        { key: "D", text: "Valider – le formulaire A et la pièce d'identité sont présents" },
      ],
      feedback:
        "Un magasinier avec CHF 58'000 de revenu annuel et CHF 1'800'000 de fortune : même en économisant pendant 30 ans, cela donnerait au maximum CHF 1'740'000 – sans dépenses. L'origine doit être documentée concrètement (p.ex. preuve d'héritage, donation, vente immobilière). «Épargnes» n'est pas suffisant. Les indications d'origine non plausibles sont un indicateur classique de blanchiment d'argent.",
    },
    "3.3": {
      briefing:
        "Le conseiller clientèle a soumis un dossier pour un nouveau client de l'étranger. Le client souhaite ouvrir un compte privé et déposer initialement CHF 5'000'000. Examine attentivement le dossier et évalue la situation globale.",
      question: "Tu examines ce dossier. Quelle est la bonne décision ?",
      options: [
        { key: "A", text: "Valider – le formulaire A est présent, la pièce d'identité est valide jusqu'en 2027 et le pays d'origine est membre de l'UE, ce qui réduit nettement le profil de risque." },
        { key: "B", text: "Renvoyer le dossier et demander uniquement profession et employeur avec justificatif de revenu – le formulaire A et la pièce d'identité sont présents, le reste est en grande partie complet." },
        { key: "C", text: "Rejeter entièrement – profession trop vague, employeur/revenu manquants, origine des fonds non attestée, vérification PPE manquante" },
        { key: "D", text: "Informer le supérieur et activer la Compliance – pour les clients étrangers avec profil professionnel peu clair, toujours escalader sans prendre de décision propre." },
      ],
      feedback:
        "Plusieurs lacunes critiques : (1) «Entrepreneur» est trop vague – secteur, nom de l'entreprise et fonction doivent être documentés. (2) L'employeur et le revenu manquent totalement. (3) «Produits d'activité commerciale» ne suffit pas comme origine des fonds pour CHF 5 millions – il faut des preuves concrètes (contrats, comptes). (4) La vérification PPE manque – pour les clients étrangers avec des dépôts élevés, c'est une étape obligatoire. Tous ces points ensemble rendent une validation impossible.",
    },
  },
  it: {
    "1.1": {
      briefing:
        "Il consulente clienti Stefan Meier ha presentato questo pomeriggio il seguente dossier per l'apertura di un conto privato. Sei responsabile del primo controllo. Verifica il dossier per la sua completezza prima dell'approvazione.",
      feedback:
        "I dati professionali (professione, datore di lavoro, grado di occupazione) sono obbligatori per la documentazione KYC secondo le Norme di diligenza delle banche. Costituiscono la base della valutazione del rischio. Il consulente clienti deve completare queste informazioni presso il cliente prima che il conto possa essere aperto.",
    },
    "1.2": {
      briefing:
        "La consulente clienti Anna Müller ha presentato il seguente dossier per l'approvazione. Il colloquio di apertura ha avuto luogo ieri. Verifica il dossier per la sua completezza.",
      feedback:
        "Le informazioni finanziarie (reddito, patrimonio, provenienza dei fondi) sono dati obbligatori nel processo KYC. Costituiscono la base della valutazione del rischio. Senza queste informazioni non è possibile effettuare una regolare verifica KYC.",
    },
    "1.3": {
      briefing:
        "Il consulente clienti Marco Rossi ti presenta il seguente dossier per l'apertura di un conto privato. Esaminalo attentamente e prendi la tua decisione.",
      question: "Esamini questo dossier prima dell'apertura del conto. Qual è la tua decisione?",
      options: [
        { key: "A", text: "Respingere – il reddito manca" },
        { key: "B", text: "Respingere – il modulo A manca" },
        { key: "C", text: "Approvare – dossier completo e corretto" },
        { key: "D", text: "Approvare con riserva – l'eredità come provenienza dei fondi deve essere attestata da un atto successorio prima che la prima transazione possa essere effettuata." },
      ],
      feedback:
        "Il dossier è completo e correttamente compilato. Tutti i campi obbligatori sono presenti, il documento d'identità è valido, il modulo A è firmato. L'indicazione 'salario ed eredità' come provenienza dei fondi è plausibile per questo livello patrimoniale. L'approvazione può avere luogo.",
    },
    "2.1": {
      briefing:
        "Il consulente clienti Luca Ferrari presenta un dossier per l'apertura di un conto di un expatriato. A prima vista tutti i campi sembrano compilati. Esamina attentamente il dossier prima di decidere.",
      feedback:
        "Il documento d'identità è scaduto il 15.03.2024 – oggi sono passati più di due anni. L'identificazione deve essere ripetuta con un documento valido. Secondo le Norme di diligenza art. 3, un'identificazione fisica valida è obbligatoria. Nessun documento d'identità valido = nessuna apertura del conto.",
    },
    "2.2": {
      briefing:
        "La consulente clienti Sarah Keller presenta un dossier per l'apertura di un conto di una società holding. La società ha la sede a Zugo e detiene partecipazioni all'estero. Verifica il dossier prima dell'approvazione.",
      feedback:
        "Le società domiciliari (holding senza attività operativa) richiedono obbligatoriamente il modulo A, poiché gli aventi diritto economico devono essere identificati. Il modulo K è solo per le società operative. L'ADE (avente diritto economico) deve essere documentato e la diligenza accresciuta esplicitamente menzionata – è la procedura standard per le holding.",
    },
    "2.3": {
      briefing:
        "Dalla filiale Berna-Centro arriva il seguente dossier. Il colloquio di apertura ha avuto luogo la settimana scorsa. Il consulente clienti ha presentato il dossier oggi per l'approvazione. Esaminalo attentamente.",
      feedback:
        "Quando diversi dati obbligatori sono incompleti, il dossier deve essere completamente respinto. Tutti i punti mancanti devono essere elencati singolarmente nel commento affinché il consulente clienti possa fare i solleciti mirati. Senza firma, il modulo A non è inoltre giuridicamente valido.",
    },
    "3.1": {
      briefing:
        "Ricevi il dossier per l'apertura di un conto privato. Il cliente è un diplomatico e vive da poco in Svizzera. Il dossier sembra completamente compilato a prima vista. Esaminalo attentamente prima dell'approvazione.",
      feedback:
        "Gli ambasciatori sono per definizione PPE (Persone Politicamente Esposte). Secondo la LRD art. 6, gli obblighi di diligenza accresciuta devono essere obbligatoriamente applicati. È inoltre richiesta l'approvazione della direzione generale prima che il conto possa essere aperto. Questi tre punti mancano completamente – il dossier deve essere respinto.",
    },
    "3.2": {
      briefing:
        "Il consulente clienti Tim Schärer ti presenta il dossier di un nuovo cliente. Tutti i campi sono compilati, il modulo A è presente, il documento d'identità è valido. Esamini il dossier nel merito.",
      question: "Esamini questo dossier. Cosa noti e qual è la tua decisione?",
      options: [
        { key: "A", text: "Approvare – tutti i campi sono compilati e formalmente corretti" },
        { key: "B", text: "Respingere – il reddito non è attestato da un certificato salariale" },
        { key: "C", text: "Richiesta di chiarimento sull'origine del patrimonio – CHF 1'800'000 deve essere spiegato con questo reddito" },
        { key: "D", text: "Approvare – il modulo A e il documento d'identità sono presenti" },
      ],
      feedback:
        "Un magazziniere con CHF 58'000 di reddito annuo e CHF 1'800'000 di patrimonio: anche risparmiando per 30 anni, darebbe al massimo CHF 1'740'000 – senza spese. L'origine deve essere documentata concretamente (p.es. prova di eredità, donazione, vendita immobiliare). «Risparmi» non è sufficiente. Le indicazioni di provenienza non plausibili sono un indicatore classico di riciclaggio di denaro.",
    },
    "3.3": {
      briefing:
        "Il consulente clienti ha presentato un dossier per un nuovo cliente dall'estero. Il cliente desidera aprire un conto privato e depositare inizialmente CHF 5'000'000. Esamina attentamente il dossier e valuta la situazione complessiva.",
      question: "Esamini questo dossier. Qual è la decisione giusta?",
      options: [
        { key: "A", text: "Approvare – il modulo A è presente, il documento d'identità è valido fino al 2027 e il paese d'origine è membro dell'UE, il che riduce nettamente il profilo di rischio." },
        { key: "B", text: "Rinviare il dossier e richiedere solo professione e datore di lavoro con giustificativo di reddito – il modulo A e il documento d'identità sono presenti, il resto è in gran parte completo." },
        { key: "C", text: "Respingere completamente – professione troppo vaga, datore di lavoro/reddito mancanti, provenienza dei fondi non attestata, verifica PPE mancante" },
        { key: "D", text: "Informare il superiore e attivare la Compliance – per i clienti stranieri con profilo professionale poco chiaro, escalare sempre senza prendere una propria decisione." },
      ],
      feedback:
        "Diverse lacune critiche: (1) «Imprenditore» è troppo vago – settore, nome dell'azienda e funzione devono essere documentati. (2) Il datore di lavoro e il reddito mancano completamente. (3) «Proventi dell'attività commerciale» non basta come provenienza dei fondi per CHF 5 milioni – servono prove concrete (contratti, bilanci). (4) La verifica PPE manca – per i clienti stranieri con depositi elevati è un passo obbligatorio. Tutti questi punti insieme rendono un'approvazione impossibile.",
    },
  },
};
