import type { LangTranslations } from "./utils";

export const KOE_L1_TRANSLATIONS: LangTranslations = {
  fr: {
    "l1-standard-ch": {
      title: "Cas standard – Client privé suisse",
      briefing:
        "M. Müller (32 ans), ressortissant suisse, domicilié à Berne, souhaite ouvrir un compte privé. Il présente un passeport suisse valide. Aucune caractéristique de risque particulière détectée.",
      generalFeedback:
        "Dans le cas standard d'un client privé suisse, vous avez besoin de : contrat de base, pièce d'identité / passeport CH valide, déclaration personnelle FATCA (personne physique) et formulaire A (VSB 20 – ayant droit économique). Les documents d'entreprise, la diligence renforcée (EDD), les formulaires PPE, les attestations de domicile ou les spécimens de signature ne font pas partie des documents réglementaires obligatoires pour ce cas standard.",
      documents: [
        {
          id: "basisvertrag",
          label: "Contrat de base",
          feedbackSelected: "Correct – le contrat de base régit la relation d'affaires et est obligatoire pour toute ouverture de compte.",
          feedbackNotSelected: "Erreur : le contrat de base est le document fondamental de toute ouverture de compte et ne peut pas être omis.",
        },
        {
          id: "ausweis-ch",
          label: "Pièce d'identité / passeport CH valide",
          feedbackSelected: "Correct – document d'identification principal conformément à la LBA.",
          feedbackNotSelected: "Erreur : l'identification avec une pièce d'identité valide est obligatoire.",
        },
        {
          id: "eigenerklarung-np",
          label: "Déclaration personnelle FATCA (personne physique)",
          feedbackSelected: "Correct – la vérification FATCA (citoyenneté américaine, lieu de naissance aux États-Unis, carte verte) est obligatoire pour toute ouverture de compte.",
          feedbackNotSelected: "Erreur : la vérification FATCA doit être effectuée pour chaque nouvelle ouverture – questions relatives à la citoyenneté américaine, au lieu de naissance aux États-Unis, à la carte verte et au numéro d'identification fiscal américain.",
        },
        {
          id: "formular-a",
          label: "Formulaire A (ayant droit économique, VSB 20)",
          feedbackSelected: "Correct – le formulaire A documente l'ayant droit économique conformément à la VSB 20, même si celui-ci est identique au titulaire du compte.",
          feedbackNotSelected: "Erreur : le formulaire A est obligatoire selon la VSB 20 – même si le titulaire du compte = l'ayant droit économique.",
        },
        {
          id: "wohnsitzbestatigung",
          label: "Attestation de domicile / confirmation d'enregistrement",
          feedbackSelected: "Erreur : une attestation de domicile n'est pas requise pour ce cas standard.",
          feedbackNotSelected: "Correct – aucune attestation de domicile nécessaire dans le cas standard.",
        },
        {
          id: "unterschriftenprobe",
          label: "Spécimen de signature",
          feedbackSelected: "Erreur : le spécimen de signature n'est pas un document obligatoire de l'ouverture de compte réglementaire.",
          feedbackNotSelected: "Correct – ne fait pas partie des documents obligatoires du cas standard.",
        },
        {
          id: "kontaktdaten",
          label: "Téléphone / adresse e-mail",
          feedbackSelected: "Erreur : les coordonnées ne sont pas un document de l'ouverture de compte réglementaire.",
          feedbackNotSelected: "Correct – non requis.",
        },
        {
          id: "handelsregister",
          label: "Extrait du registre du commerce",
          feedbackSelected: "Erreur : les extraits du registre du commerce ne sont pertinents que pour les clients commerciaux.",
          feedbackNotSelected: "Correct – non pertinent pour les personnes physiques.",
        },
        {
          id: "jahresabschluss",
          label: "Clôture annuelle / bilan",
          feedbackSelected: "Erreur : applicable uniquement aux comptes commerciaux et d'entreprise.",
          feedbackNotSelected: "Correct – non applicable pour un compte privé.",
        },
        {
          id: "herkunft-vermoegen",
          label: "Justificatif d'origine des fonds",
          feedbackSelected: "Erreur : requis uniquement en cas de risque accru ou de dépôts importants – non applicable ici.",
          feedbackNotSelected: "Correct – cas standard sans caractéristiques de risque, pas de diligence renforcée (EDD) nécessaire.",
        },
        {
          id: "pep-formular",
          label: "Formulaire de vérification PPE",
          feedbackSelected: "Erreur : pertinent uniquement pour les personnes politiquement exposées.",
          feedbackNotSelected: "Correct – aucun indice de statut PPE.",
        },
        {
          id: "vollmacht",
          label: "Procuration",
          feedbackSelected: "Erreur : aucune procuration demandée – le client agit en son propre nom.",
          feedbackNotSelected: "Correct – non requis.",
        },
        {
          id: "reisepass-ausl",
          label: "Passeport étranger",
          feedbackSelected: "Erreur : le client est ressortissant suisse – le passeport étranger ne s'applique pas.",
          feedbackNotSelected: "Correct – le client est suisse.",
        },
      ],
    },
    "l1-ausweis-abgelaufen": {
      title: "Attention – Pièce d'identité périmée",
      briefing:
        "Mme Keller souhaite ouvrir un compte privé. Elle présente sa carte d'identité suisse – en l'examinant de près, vous constatez que la date d'expiration était il y a 3 mois. Mme Keller dit : « Ça n'a pas d'importance, la photo est encore valable. »",
      generalFeedback:
        "Un document d'identité périmé n'est pas un moyen d'identification valable – même si « la photo est encore bonne ». L'ensemble du processus ultérieur (formulaire A, contrat de base, FATCA, etc.) ne peut être poursuivi qu'après présentation d'une pièce d'identité valide. Il n'existe pas d'exception via la compliance.",
      documents: [
        {
          id: "gultig-ausweis-anfordern",
          label: "Exiger une pièce d'identité / un passeport valide",
          feedbackSelected: "Correct – les documents périmés ne sont pas un moyen d'identification valable.",
          feedbackNotSelected: "Erreur : vous devez impérativement exiger une pièce d'identité valide.",
        },
        {
          id: "termin-neu",
          label: "Fixer un nouveau rendez-vous dès qu'une pièce d'identité valide est disponible",
          feedbackSelected: "Correct – Mme Keller doit renouveler sa pièce d'identité puis revenir.",
          feedbackNotSelected: "Erreur : Mme Keller doit être orientée vers un nouveau rendez-vous avec une pièce d'identité valide.",
        },
        {
          id: "basisvertrag",
          label: "Contrat de base",
          feedbackSelected: "Incorrect – sans identification valable, aucun contrat ne peut être conclu. C'est précisément le point d'apprentissage de ce cas.",
          feedbackNotSelected: "Correctement non sélectionné – aucune conclusion de contrat possible sans pièce d'identité valide.",
        },
        {
          id: "formular-a",
          label: "Formulaire A (ayant droit économique, VSB 20)",
          feedbackSelected: "Incorrect – sans pièce d'identité valide, le processus ne peut pas atteindre cette étape.",
          feedbackNotSelected: "Correctement non sélectionné – le processus s'arrête avant, à la pièce d'identité invalide.",
        },
        {
          id: "eigenerklarung-np",
          label: "Déclaration personnelle FATCA (personne physique)",
          feedbackSelected: "Incorrect – le processus FATCA présuppose une identification complétée. Sans pièce d'identité valide, cette étape n'est pas atteinte.",
          feedbackNotSelected: "Correctement non sélectionné – le processus s'arrête à la pièce d'identité invalide avant que FATCA ne devienne pertinent.",
        },
        {
          id: "wohnsitzbestatigung",
          label: "Attestation de domicile",
          feedbackSelected: "Incorrect – la justification du domicile n'est pertinente qu'après une identification valable. Le processus s'arrête avant.",
          feedbackNotSelected: "Correctement non sélectionné – sans identification valable, aucun processus documentaire ultérieur.",
        },
        {
          id: "unterschriftenprobe",
          label: "Spécimen de signature",
          feedbackSelected: "Incorrect – le spécimen de signature fait partie du processus d'ouverture qui ne commence qu'après une identification valable.",
          feedbackNotSelected: "Correctement non sélectionné – le processus s'arrête avant.",
        },
        {
          id: "ausweis-abgelaufen-akzeptieren",
          label: "Accepter quand même la pièce d'identité périmée",
          feedbackSelected: "Erreur grave : un document périmé n'est pas un moyen d'identification valable – cela enfreint la LBA art. 3.",
          feedbackNotSelected: "Correct – les pièces d'identité périmées ne peuvent jamais être acceptées.",
        },
        {
          id: "kopie-abgelaufen",
          label: "Faire une copie de la pièce d'identité périmée et continuer",
          feedbackSelected: "Erreur : une copie ne rend pas un document invalide valable.",
          feedbackNotSelected: "Correct – la copie d'un document périmé est sans valeur.",
        },
        {
          id: "ausnahme-compliance",
          label: "Demander une exception auprès du service compliance",
          feedbackSelected: "Erreur : une pièce d'identité périmée est une règle absolue sans marge d'appréciation – il n'existe pas d'exception compliance.",
          feedbackNotSelected: "Correct – aucune exception possible, c'est une règle absolue.",
        },
      ],
    },
    "l1-vollmacht-mcq": {
      title: "Question juridique : ouverture de compte par procuration",
      briefing:
        "M. Huber appelle et souhaite ouvrir un compte privé. Il ne peut cependant pas se rendre en personne à l'agence. Il propose d'envoyer son frère muni d'une procuration.",
      question: "Qu'est-ce qui est correct dans ce cas ?",
      options: [
        {
          key: "A",
          text: "La première identification doit être effectuée personnellement par M. Huber. Une procuration ne remplace pas l'identification personnelle lors de l'ouverture d'un compte.",
        },
        {
          key: "B",
          text: "Le frère peut venir avec une procuration. La banque identifie le frère et ouvre le compte au nom de M. Huber.",
        },
        {
          key: "C",
          text: "Une procuration notariée suffit – l'identification est ainsi effectuée.",
        },
        {
          key: "D",
          text: "Le compte peut également être ouvert par demande en ligne ou par courrier, sans présence personnelle.",
        },
      ],
      feedback:
        "Conformément à la LBA, l'ayant droit économique (M. Huber) doit être identifié personnellement lors de l'ouverture du compte. Une procuration autorise le mandataire à gérer le compte ultérieurement – mais elle ne remplace jamais l'identification initiale du titulaire du compte.",
      feedbackPerOption: {
        A: "Correct – la LBA art. 3 exige l'identification personnelle du titulaire du compte. M. Huber doit se présenter en personne.",
        B: "Incorrect – en identifiant le frère, seul le frère est enregistré, pas M. Huber. L'obligation LBA d'identifier l'ayant droit économique n'est pas remplie.",
        C: "Incorrect – une légalisation notariale de la procuration ne change rien à l'obligation d'identifier personnellement l'ayant droit économique.",
        D: "Incorrect – pour les nouveaux clients en Suisse, l'identification personnelle en agence ou par vidéo-identification est en principe requise.",
      },
    },
    "l1-saule3a": {
      title: "Compte 3a – Personne privée suisse",
      briefing:
        "M. Bühler (38 ans), ressortissant suisse, employé salarié, souhaite ouvrir un compte d'épargne pilier 3a. Il souhaite verser CHF 500 par mois. Aucune caractéristique de risque particulière détectée.",
      generalFeedback:
        "Pilier 3a (prévoyance liée) selon la LPP : seules les personnes exerçant une activité lucrative peuvent effectuer des versements. Le bénéficiaire de la prévoyance est toujours identique à l'ayant droit économique – c'est pourquoi aucun formulaire A n'est requis. Limite de versement 2024 : CHF 7 056 (salariés avec caisse de pension) resp. jusqu'à CHF 35 280 (indépendants sans caisse de pension). Les fonds sont bloqués jusqu'à la retraite.",
      documents: [
        {
          id: "basisvertrag-3a",
          label: "Contrat de base / contrat de prévoyance pilier 3a",
          feedbackSelected: "Correct – le contrat de prévoyance 3a est la base contractuelle du compte de prévoyance lié.",
          feedbackNotSelected: "Erreur : sans contrat de prévoyance 3a, le compte ne peut pas être ouvert.",
        },
        {
          id: "ausweis-ch",
          label: "Pièce d'identité / passeport CH valide",
          feedbackSelected: "Correct – obligation d'identification conformément à la LBA pour toute ouverture de compte.",
          feedbackNotSelected: "Erreur : l'identification avec une pièce d'identité valide est obligatoire.",
        },
        {
          id: "eigenerklarung-np",
          label: "Déclaration personnelle FATCA (personne physique)",
          feedbackSelected: "Correct – la vérification FATCA est obligatoire pour toute ouverture de compte.",
          feedbackNotSelected: "Erreur : la déclaration personnelle FATCA doit être obtenue pour chaque nouvelle ouverture.",
        },
        {
          id: "formular-a",
          label: "Formulaire A (ayant droit économique, VSB 20)",
          feedbackSelected: "Erreur : aucun formulaire A n'est requis pour les comptes 3a – le bénéficiaire de la prévoyance est toujours identique à l'ayant droit économique par la loi (prévoyance liée selon LPP).",
          feedbackNotSelected: "Correct – pas de formulaire A pour les comptes 3a : l'ayant droit économique est toujours identique au titulaire du compte par la loi.",
        },
        {
          id: "lohnausweis",
          label: "Certificat de salaire / justificatif d'activité lucrative",
          feedbackSelected: "Erreur : un certificat de salaire n'est pas requis lors de l'ouverture du compte – l'activité lucrative est déclarée par le client lui-même.",
          feedbackNotSelected: "Correct – aucun certificat de salaire requis pour l'ouverture. Le client déclare lui-même son activité lucrative.",
        },
        {
          id: "pep-formular",
          label: "Formulaire de vérification PPE",
          feedbackSelected: "Erreur : aucun indice de statut PPE – aucun formulaire requis.",
          feedbackNotSelected: "Correct – aucune caractéristique PPE détectable.",
        },
        {
          id: "hr-auszug",
          label: "Extrait du registre du commerce",
          feedbackSelected: "Erreur : les extraits du registre du commerce ne sont pertinents que pour les personnes morales, pas pour les personnes physiques.",
          feedbackNotSelected: "Correct – non pertinent pour les personnes physiques.",
        },
        {
          id: "steuererklaerung",
          label: "Déclaration fiscale",
          feedbackSelected: "Erreur : une déclaration fiscale n'est pas requise pour l'ouverture d'un compte.",
          feedbackNotSelected: "Correct – non requis pour l'ouverture.",
        },
      ],
    },
  },
  it: {
    "l1-standard-ch": {
      title: "Caso standard – Cliente privato svizzero",
      briefing:
        "Il Sig. Müller (32 anni), cittadino svizzero, domiciliato a Berna, desidera aprire un conto privato. Ha con sé un passaporto svizzero valido. Nessuna caratteristica di rischio particolare rilevata.",
      generalFeedback:
        "Nel caso standard di un cliente privato svizzero sono necessari: contratto di base, documento d'identità / passaporto CH valido, dichiarazione personale FATCA (persona fisica) e formulario A (VSB 20 – avente diritto economico). I documenti aziendali, la due diligence rafforzata (EDD), i formulari PPE, le attestazioni di domicilio o i campioni di firma non rientrano tra i documenti regolamentari obbligatori per questo caso standard.",
      documents: [
        {
          id: "basisvertrag",
          label: "Contratto di base",
          feedbackSelected: "Corretto – il contratto di base disciplina il rapporto d'affari ed è obbligatorio per ogni apertura di conto.",
          feedbackNotSelected: "Errore: il contratto di base è il documento fondamentale di ogni apertura di conto e non può mancare.",
        },
        {
          id: "ausweis-ch",
          label: "Documento d'identità / passaporto CH valido",
          feedbackSelected: "Corretto – documento d'identificazione principale conformemente alla LRD.",
          feedbackNotSelected: "Errore: l'identificazione con un documento d'identità valido è obbligatoria.",
        },
        {
          id: "eigenerklarung-np",
          label: "Dichiarazione personale FATCA (persona fisica)",
          feedbackSelected: "Corretto – la verifica FATCA (cittadinanza americana, luogo di nascita negli USA, Green Card) è obbligatoria per ogni apertura di conto.",
          feedbackNotSelected: "Errore: la verifica FATCA deve essere effettuata per ogni nuova apertura – domande relative alla cittadinanza americana, al luogo di nascita negli USA, alla Green Card e al numero di identificazione fiscale americano.",
        },
        {
          id: "formular-a",
          label: "Formulario A (avente diritto economico, VSB 20)",
          feedbackSelected: "Corretto – il formulario A documenta l'avente diritto economico conformemente alla VSB 20, anche se coincide con il titolare del conto.",
          feedbackNotSelected: "Errore: il formulario A è obbligatorio secondo la VSB 20 – anche se il titolare del conto = l'avente diritto economico.",
        },
        {
          id: "wohnsitzbestatigung",
          label: "Attestazione di domicilio / conferma di registrazione",
          feedbackSelected: "Errore: un'attestazione di domicilio non è richiesta per questo caso standard.",
          feedbackNotSelected: "Corretto – nessuna attestazione di domicilio necessaria nel caso standard.",
        },
        {
          id: "unterschriftenprobe",
          label: "Campione di firma",
          feedbackSelected: "Errore: il campione di firma non è un documento obbligatorio dell'apertura di conto regolamentare.",
          feedbackNotSelected: "Corretto – non rientra nei documenti obbligatori del caso standard.",
        },
        {
          id: "kontaktdaten",
          label: "Telefono / indirizzo e-mail",
          feedbackSelected: "Errore: i dati di contatto non sono un documento dell'apertura di conto regolamentare.",
          feedbackNotSelected: "Corretto – non richiesto.",
        },
        {
          id: "handelsregister",
          label: "Estratto del registro di commercio",
          feedbackSelected: "Errore: gli estratti del registro di commercio sono pertinenti solo per i clienti commerciali.",
          feedbackNotSelected: "Corretto – non pertinente per le persone fisiche.",
        },
        {
          id: "jahresabschluss",
          label: "Bilancio annuale / conto economico",
          feedbackSelected: "Errore: applicabile solo ai conti commerciali e aziendali.",
          feedbackNotSelected: "Corretto – non applicabile per un conto privato.",
        },
        {
          id: "herkunft-vermoegen",
          label: "Giustificativo dell'origine dei fondi",
          feedbackSelected: "Errore: richiesto solo in caso di rischio elevato o depositi importanti – non applicabile qui.",
          feedbackNotSelected: "Corretto – caso standard senza caratteristiche di rischio, nessuna due diligence rafforzata (EDD) necessaria.",
        },
        {
          id: "pep-formular",
          label: "Formulario di verifica PPE",
          feedbackSelected: "Errore: pertinente solo per le persone politicamente esposte.",
          feedbackNotSelected: "Corretto – nessun indizio di stato PPE.",
        },
        {
          id: "vollmacht",
          label: "Procura",
          feedbackSelected: "Errore: nessuna procura richiesta – il cliente agisce in proprio nome.",
          feedbackNotSelected: "Corretto – non richiesto.",
        },
        {
          id: "reisepass-ausl",
          label: "Passaporto estero",
          feedbackSelected: "Errore: il cliente è cittadino svizzero – il passaporto estero non è applicabile.",
          feedbackNotSelected: "Corretto – il cliente è svizzero.",
        },
      ],
    },
    "l1-ausweis-abgelaufen": {
      title: "Attenzione – Documento d'identità scaduto",
      briefing:
        "La Sig.ra Keller desidera aprire un conto privato. Presenta la sua carta d'identità svizzera – esaminandola attentamente, si accorge che la data di scadenza era 3 mesi fa. La Sig.ra Keller dice: «Non importa, la foto è ancora valida.»",
      generalFeedback:
        "Un documento d'identità scaduto non è un mezzo d'identificazione valido – anche se «la foto è ancora valida». L'intero processo successivo (formulario A, contratto di base, FATCA, ecc.) può essere proseguito solo dopo la presentazione di un documento d'identità valido. Non esiste eccezione tramite la compliance.",
      documents: [
        {
          id: "gultig-ausweis-anfordern",
          label: "Esigere un documento d'identità / passaporto valido",
          feedbackSelected: "Corretto – i documenti scaduti non sono un mezzo d'identificazione valido.",
          feedbackNotSelected: "Errore: deve esigere imperativamente un documento d'identità valido.",
        },
        {
          id: "termin-neu",
          label: "Fissare un nuovo appuntamento non appena è disponibile un documento d'identità valido",
          feedbackSelected: "Corretto – la Sig.ra Keller deve rinnovare il documento d'identità e tornare successivamente.",
          feedbackNotSelected: "Errore: la Sig.ra Keller deve essere indirizzata a un nuovo appuntamento con un documento d'identità valido.",
        },
        {
          id: "basisvertrag",
          label: "Contratto di base",
          feedbackSelected: "Errato – senza identificazione valida non può essere concluso alcun contratto. Questo è esattamente il punto di apprendimento di questo caso.",
          feedbackNotSelected: "Correttamente non selezionato – nessuna conclusione di contratto possibile senza documento d'identità valido.",
        },
        {
          id: "formular-a",
          label: "Formulario A (avente diritto economico, VSB 20)",
          feedbackSelected: "Errato – senza documento d'identità valido, il processo non può raggiungere questa fase.",
          feedbackNotSelected: "Correttamente non selezionato – il processo si interrompe prima, al documento d'identità non valido.",
        },
        {
          id: "eigenerklarung-np",
          label: "Dichiarazione personale FATCA (persona fisica)",
          feedbackSelected: "Errato – il processo FATCA presuppone un'identificazione completata. Senza documento d'identità valido, questa fase non viene raggiunta.",
          feedbackNotSelected: "Correttamente non selezionato – il processo si interrompe al documento d'identità non valido prima che il FATCA diventi rilevante.",
        },
        {
          id: "wohnsitzbestatigung",
          label: "Attestazione di domicilio",
          feedbackSelected: "Errato – la giustificazione del domicilio è rilevante solo dopo un'identificazione valida. Il processo si interrompe prima.",
          feedbackNotSelected: "Correttamente non selezionato – senza identificazione valida, nessun ulteriore processo documentale.",
        },
        {
          id: "unterschriftenprobe",
          label: "Campione di firma",
          feedbackSelected: "Errato – il campione di firma fa parte del processo di apertura che inizia solo dopo un'identificazione valida.",
          feedbackNotSelected: "Correttamente non selezionato – il processo si interrompe prima.",
        },
        {
          id: "ausweis-abgelaufen-akzeptieren",
          label: "Accettare comunque il documento d'identità scaduto",
          feedbackSelected: "Errore grave: un documento scaduto non è un mezzo d'identificazione valido – ciò viola la LRD art. 3.",
          feedbackNotSelected: "Corretto – i documenti d'identità scaduti non possono mai essere accettati.",
        },
        {
          id: "kopie-abgelaufen",
          label: "Fare una copia del documento d'identità scaduto e procedere",
          feedbackSelected: "Errore: una copia non rende valido un documento non valido.",
          feedbackNotSelected: "Corretto – la copia di un documento scaduto è priva di valore.",
        },
        {
          id: "ausnahme-compliance",
          label: "Richiedere un'eccezione al servizio compliance",
          feedbackSelected: "Errore: un documento d'identità scaduto è una regola assoluta senza margine di discrezionalità – non esiste un'eccezione compliance.",
          feedbackNotSelected: "Corretto – nessuna eccezione possibile, è una regola assoluta.",
        },
      ],
    },
    "l1-vollmacht-mcq": {
      title: "Questione giuridica: apertura di conto tramite procura",
      briefing:
        "Il Sig. Huber chiama e desidera aprire un conto privato. Non può però recarsi personalmente alla filiale. Propone di mandare suo fratello con una procura.",
      question: "Cosa è corretto in questo caso?",
      options: [
        {
          key: "A",
          text: "La prima identificazione deve essere effettuata personalmente dal Sig. Huber. Una procura non sostituisce l'identificazione personale all'apertura di un conto.",
        },
        {
          key: "B",
          text: "Il fratello può venire con una procura. La banca identifica il fratello e apre il conto a nome del Sig. Huber.",
        },
        {
          key: "C",
          text: "Una procura notarile è sufficiente – con essa l'identificazione è eseguita.",
        },
        {
          key: "D",
          text: "Il conto può essere aperto anche tramite richiesta online o per posta, senza presenza personale.",
        },
      ],
      feedback:
        "Conformemente alla LRD, l'avente diritto economico (Sig. Huber) deve essere identificato personalmente all'apertura del conto. Una procura autorizza il mandatario a gestire il conto successivamente – ma non sostituisce mai la prima identificazione del titolare del conto.",
      feedbackPerOption: {
        A: "Corretto – la LRD art. 3 richiede l'identificazione personale del titolare del conto. Il Sig. Huber deve presentarsi di persona.",
        B: "Errato – identificando il fratello, viene registrato solo il fratello, non il Sig. Huber. L'obbligo LRD di identificare l'avente diritto economico rimane inadempiuto.",
        C: "Errato – una legalizzazione notarile della procura non cambia nulla all'obbligo di identificare personalmente l'avente diritto economico.",
        D: "Errato – per i nuovi clienti in Svizzera è in linea di principio richiesta l'identificazione personale in filiale o tramite video-identificazione.",
      },
    },
    "l1-saule3a": {
      title: "Conto 3a – Persona privata svizzera",
      briefing:
        "Il Sig. Bühler (38 anni), cittadino svizzero, dipendente, desidera aprire un conto di risparmio pilastro 3a. Desidera versare CHF 500 al mese. Nessuna caratteristica di rischio particolare rilevata.",
      generalFeedback:
        "Pilastro 3a (previdenza vincolata) secondo la LPP: solo le persone che esercitano un'attività lucrativa possono effettuare versamenti. Il beneficiario della previdenza è sempre identico all'avente diritto economico – pertanto non è richiesto alcun formulario A. Limite di versamento 2024: CHF 7 056 (dipendenti con cassa pensioni) rispettivamente fino a CHF 35 280 (indipendenti senza cassa pensioni). I fondi sono vincolati fino al pensionamento.",
      documents: [
        {
          id: "basisvertrag-3a",
          label: "Contratto di base / contratto previdenziale pilastro 3a",
          feedbackSelected: "Corretto – il contratto previdenziale 3a è la base contrattuale per il conto di previdenza vincolata.",
          feedbackNotSelected: "Errore: senza contratto previdenziale 3a il conto non può essere aperto.",
        },
        {
          id: "ausweis-ch",
          label: "Documento d'identità / passaporto CH valido",
          feedbackSelected: "Corretto – obbligo di identificazione conformemente alla LRD per ogni apertura di conto.",
          feedbackNotSelected: "Errore: l'identificazione con un documento d'identità valido è obbligatoria.",
        },
        {
          id: "eigenerklarung-np",
          label: "Dichiarazione personale FATCA (persona fisica)",
          feedbackSelected: "Corretto – la verifica FATCA è obbligatoria per ogni apertura di conto.",
          feedbackNotSelected: "Errore: la dichiarazione personale FATCA deve essere ottenuta per ogni nuova apertura.",
        },
        {
          id: "formular-a",
          label: "Formulario A (avente diritto economico, VSB 20)",
          feedbackSelected: "Errore: per i conti 3a non è richiesto alcun formulario A – il beneficiario della previdenza è per legge sempre identico all'avente diritto economico (previdenza vincolata secondo LPP).",
          feedbackNotSelected: "Corretto – nessun formulario A per i conti 3a: l'avente diritto economico è per legge sempre identico al titolare del conto.",
        },
        {
          id: "lohnausweis",
          label: "Certificato di salario / prova di attività lucrativa",
          feedbackSelected: "Errore: un certificato di salario non è richiesto all'apertura del conto – l'attività lucrativa viene dichiarata dal cliente stesso.",
          feedbackNotSelected: "Corretto – nessun certificato di salario richiesto per l'apertura. Il cliente dichiara lui stesso la propria attività lucrativa.",
        },
        {
          id: "pep-formular",
          label: "Formulario di verifica PPE",
          feedbackSelected: "Errore: nessun indizio di stato PPE – nessun formulario richiesto.",
          feedbackNotSelected: "Corretto – nessuna caratteristica PPE rilevabile.",
        },
        {
          id: "hr-auszug",
          label: "Estratto del registro di commercio",
          feedbackSelected: "Errore: gli estratti del registro di commercio sono pertinenti solo per le persone giuridiche, non per le persone fisiche.",
          feedbackNotSelected: "Corretto – non pertinente per le persone fisiche.",
        },
        {
          id: "steuererklaerung",
          label: "Dichiarazione fiscale",
          feedbackSelected: "Errore: una dichiarazione fiscale non è richiesta per l'apertura di un conto.",
          feedbackNotSelected: "Corretto – non richiesta per l'apertura.",
        },
      ],
    },
  },
};
