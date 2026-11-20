import type { LangTranslations } from "./utils";

export const CO_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      situation:
        "Crédit hypothécaire approuvé. Le gage immobilier n'est pas encore inscrit. Le client demande quand il recevra l'argent.",
      question: "Quand peut-on effectuer le versement?",
      options: [
        {
          key: "A",
          text: "Seulement une fois le gage immobilier inscrit, tous les documents signés et la preuve d'assurance fournie.",
        },
        {
          key: "B",
          text: "Immédiatement – avec le contrat de crédit signé, la banque est légalement tenue de verser. Le gage immobilier peut être en attente si le notaire a remis une confirmation écrite de versement.",
        },
        {
          key: "C",
          text: "Automatiquement dans les trois jours ouvrables – l'interface crédit interne déclenche un versement automatique après approbation, dès que le contrat est enregistré comme 'signé'. Le gage immobilier n'est pas vérifié.",
        },
        {
          key: "D",
          text: "Le conseiller clientèle décide en accord avec le client – l'approbation ne fixe que le montant et les conditions, pas la date de versement. Le conseiller a toute liberté d'action.",
        },
      ],
      feedback:
        "Le versement n'a lieu que lorsque toutes les sûretés sont constituées. Le gage immobilier doit être inscrit au registre foncier avant le versement.",
    },
    "1.2": {
      situation:
        "Vous vérifiez un dossier de crédit avant le versement. Le contrat de crédit est présent mais n'a été signé que par le client – la signature de la banque manque.",
      question: "Que faites-vous?",
      options: [
        { key: "A", text: "Verser – le client a signé" },
        {
          key: "B",
          text: "Ne pas verser – le contrat de crédit doit être signé par les deux parties.",
        },
        { key: "C", text: "Demander à un collègue" },
        { key: "D", text: "Faire signer ultérieurement et verser immédiatement" },
      ],
      feedback:
        "Le contrat de crédit n'entre en vigueur que lorsque les deux parties ont signé. Le versement sans signatures complètes est impossible.",
    },
    "1.3": {
      situation: "Le crédit a été versé. Quand doit-on établir un rappel?",
      question: "Quand établissez-vous le rappel?",
      options: [
        {
          key: "A",
          text: "Aucun rappel nécessaire après versement complet – pendant la durée, le système bancaire principal surveille automatiquement tous les paiements et envoie des alertes en cas de défaut.",
        },
        {
          key: "B",
          text: "Rappel uniquement en cas de problèmes ou situations ETP – pour les hypothèques avec paiements réguliers, la vérification annuelle automatique suffit.",
        },
        {
          key: "C",
          text: "Pour chaque octroi de crédit – vérification régulière de la solvabilité et des garanties.",
        },
        {
          key: "D",
          text: "Rappel après 10 ans lors d'un changement de période de taux fixe – entre-temps, le système interne de surveillance du rating gère la solvabilité automatiquement.",
        },
      ],
      feedback:
        "Le rappel est obligatoire pour chaque crédit. Vérification régulière de la solvabilité, des garanties et de la situation du client. Pour les cas ETP, le rappel est plus fréquent.",
    },
    "1.4": {
      situation:
        "Un client souhaite un crédit à la consommation de CHF 25'000 pour une voiture d'occasion. Il est employé à temps plein et demande: «Quand vais-je recevoir l'argent?»",
      question: "Qu'est-ce qui doit impérativement être vérifié avant le versement?",
      options: [
        {
          key: "A",
          text: "Le bulletin de salaire actuel et la déclaration sur l'honneur suffisent – pour les crédits inférieurs à CHF 30'000, une procédure simplifiée est admissible selon la LCC.",
        },
        {
          key: "B",
          text: "L'attestation de salaire de l'employeur et la déclaration signée suffisent. La consultation ZEK est laissée à l'appréciation de la banque selon la LCC.",
        },
        {
          key: "C",
          text: "Les bulletins de salaire et la consultation ZEK suffisent. Les engagements existants ne doivent être inclus que si le montant dépasse CHF 30'000.",
        },
        {
          key: "D",
          text: "Examen de la capacité de crédit selon la LCC: bulletins de salaire (min. 3 mois), extrait du registre des poursuites, tous les engagements existants inclus. Crédit uniquement si prouvément supportable.",
        },
      ],
      feedback:
        "LCC art. 22: l'examen de la capacité de crédit est obligatoire par la loi avant tout contrat de crédit à la consommation. Bulletins de salaire (min. 3 mois), extrait du registre des poursuites, tous les engagements inclus. Sans examen, le contrat est nul (LCC art. 15) – la banque assume alors le risque total.",
    },
    "2.1": {
      briefing:
        "Hypothèque CHF 700'000 sur un objet de valeur vénale CHF 900'000. Calculer la part en blanc.",
      question: "La 1re hypothèque couvre jusqu'à ___ % de la valeur vénale.",
      feedback:
        "Tout ce qui dépasse 65% de nantissement est 2e hypothèque = part en blanc. Cette part en blanc doit être remboursée dans les 15 ans – directement ou indirectement via le pilier 3a.",
    },
    "2.2": {
      situation:
        "Crédit d'entreprise CHF 200'000. Un cautionnement du propriétaire a été convenu comme sûreté. Vous constatez que le contrat de cautionnement n'est pas signé.",
      question: "Que faites-vous?",
      options: [
        { key: "A", text: "Verser – une promesse verbale suffit" },
        {
          key: "B",
          text: "Ne pas verser – le cautionnement doit être disponible par écrit et signé avant le versement.",
        },
        { key: "C", text: "Versement partiel CHF 100'000" },
        { key: "D", text: "Verser sans cautionnement" },
      ],
      feedback:
        "Les sûretés doivent être entièrement constituées avant le versement. Un cautionnement sans signature n'est pas juridiquement valide.",
    },
    "2.3": {
      situation:
        "Hypothèque CHF 800'000. Fonds propres CHF 200'000 (25%). Le client affirme que les fonds propres sont disponibles mais aucune preuve ne figure dans le dossier.",
      question: "Que faites-vous?",
      options: [
        { key: "A", text: "Faire confiance – le client dit qu'ils sont là" },
        { key: "B", text: "Verser 50%" },
        { key: "C", text: "Verser et vérifier ultérieurement" },
        {
          key: "D",
          text: "Ne pas verser – les fonds propres doivent être attestés avant le versement (relevé de compte, relevé de dépôt, etc.).",
        },
      ],
      feedback:
        "Les fonds propres doivent être justifiés avant le versement. Relevé de compte ou relevé de dépôt comme preuve. Sans preuve, pas de versement – quoi que dise le client.",
    },
    "2.4": {
      situation:
        "Un propriétaire de PME demande un crédit d'exploitation de CHF 150'000. Il est devant vous et dit: «Nous nous portons bien – l'année dernière 10% de croissance.»",
      question: "Quels documents exigez-vous impérativement?",
      options: [
        {
          key: "A",
          text: "Bilans des 2 dernières années, extrait RC, registre des poursuites (entreprise et propriétaire), plan de liquidités actuel. Déduire le taux de fonds propres et le cash-flow opérationnel des chiffres.",
        },
        {
          key: "B",
          text: "La déclaration sur l'honneur du propriétaire et les relevés de compte actuels suffisent comme base – pour les crédits d'exploitation inférieurs à CHF 250'000, aucun bilan complet n'est requis selon la procédure PME simplifiée.",
        },
        {
          key: "C",
          text: "Extrait RC et carte d'identité du propriétaire – cela prouve le droit de signature, condition principale pour les crédits aux personnes morales. Les bilans peuvent être soumis après six mois.",
        },
        {
          key: "D",
          text: "Le business plan et les projections de croissance suffisent comme base de crédit – pour les PME en forte croissance, nous évaluons principalement les perspectives d'avenir. C'est ainsi réglé en interne pour les crédits jusqu'à CHF 250'000.",
        },
      ],
      feedback:
        "Crédit d'entreprise: bilans (min. 2 ans) pour analyse de tendance, extrait RC pour droit de signature, registre des poursuites entreprise et propriétaire (en cas de solidarité), plan de liquidités. Taux de fonds propres >20% et cash-flow opérationnel positif sont déterminants – les promesses de croissance ne remplacent pas les chiffres.",
    },
    "2.5": {
      situation:
        "Un client possède un dépôt-titres avec des actions d'une valeur de CHF 200'000. Il souhaite un crédit lombard de CHF 150'000.",
      question: "Qu'observez-vous?",
      options: [
        {
          key: "A",
          text: "Pas de problème – le dépôt dépasse le montant du crédit et constitue une couverture complète. Les portefeuilles d'actions sont nantis à 100% de la valeur de marché car ils peuvent être liquidés à tout moment.",
        },
        {
          key: "B",
          text: "Le dépôt doit être entièrement liquidé avant l'octroi du crédit – seulement une fois le capital sur le compte, un crédit en compte courant garanti peut être mis en place. Le dépôt lui-même ne peut pas être mis en gage.",
        },
        {
          key: "C",
          text: "Les crédits lombards sont accordés selon le principe 1:1 – CHF 200'000 de dépôt équivaut à CHF 200'000 de limite de crédit. Un contrat de gage n'est pas légalement prescrit pour les crédits lombards.",
        },
        {
          key: "D",
          text: "Valeur de nantissement des actions max. 50-60% de la valeur de marché = CHF 100'000-120'000. CHF 150'000 dépasse la valeur de nantissement. Contrat de gage obligatoire. En cas de baisse des cours, risque d'appel de marge.",
        },
      ],
      feedback:
        "Valeur de nantissement selon la classe d'actifs: actions 50-60%, obligations 70-80%, fonds monétaires jusqu'à 90%. CHF 150'000 sur CHF 200'000 d'actions = 75% de nantissement – trop élevé. Contrat de gage et formulaire de mise en gage obligatoires. En cas de baisse des cours sous la valeur de gage: appel de marge – le client doit fournir des sûretés supplémentaires ou réduire le crédit.",
    },
    "2.6": {
      situation:
        "Un client hypothécaire n'a pas payé deux taux d'intérêts consécutifs. Arriéré total CHF 4'500. Aucun contact depuis 6 semaines malgré les lettres de rappel.",
      question: "Quelles sont les prochaines étapes?",
      options: [
        {
          key: "A",
          text: "Lettre recommandée avec délai final, engager les poursuites, informer le conseiller et le service crédit. Documenter chaque étape sans lacune.",
        },
        { key: "B", text: "Attendre – peut-être payera-t-il encore de lui-même" },
        { key: "C", text: "Envoyer encore une simple lettre de rappel" },
        { key: "D", text: "Résilier le crédit immédiatement sans autres étapes" },
      ],
      feedback:
        "Processus de relance en cas de retard: 1. Lettre de rappel (effectuée), 2. Lettre recommandée avec délai final de paiement, 3. Engager les poursuites, 4. Résiliation du crédit (uniquement en dernier recours). Documentation sans lacune de chaque étape obligatoire – conservation des preuves pour d'éventuelles procédures judiciaires.",
    },
    "2.7": {
      situation:
        "Max Huber (52 ans), entrepreneur individuel, achète un immeuble commercial pour CHF 1'200'000. Il demande une hypothèque de CHF 800'000 (nantissement 67%).",
      question: "Qu'observez-vous?",
      options: [
        { key: "A", text: "Tout en ordre – 67% est inférieur à 80%" },
        {
          key: "B",
          text: "67% de nantissement est normal et admissible pour le commercial",
        },
        { key: "C", text: "Seule la clarification FATCA est pertinente ici" },
        {
          key: "D",
          text: "Nantissement 67% dépasse le maximum pour les immeubles commerciaux (60-65%). De plus: entrepreneur individuel = personne physique – déclaration FATCA obligatoire.",
        },
      ],
      feedback:
        "Immeubles commerciaux: nantissement maximal 60-65% (nettement plus bas que pour la résidence principale à 80%). CHF 800'000 / CHF 1'200'000 = 67% – trop élevé, ETP ou refus nécessaire. L'entrepreneur individuel est juridiquement une personne physique: déclaration FATCA obligatoire pour chaque relation bancaire.",
    },
    "3.1": {
      situation: "Vous vérifiez le versement d'une hypothèque de CHF 1'200'000. Liste de contrôle:",
      question: "Que faites-vous?",
      options: [
        { key: "A", text: "Verser – la plupart des éléments sont présents" },
        {
          key: "B",
          text: "Ne pas verser – 2 points manquent: la preuve d'assurance et le rappel doivent être traités avant le versement.",
        },
        { key: "C", text: "Versement partiel" },
        {
          key: "D",
          text: "Verser et enregistrer les documents manquants en complément – la preuve d'assurance peut être soumise dans les 30 jours, le rappel est considéré comme établi.",
        },
      ],
      feedback:
        "Toutes les conditions de versement doivent être remplies – sans exception. Compléter la preuve d'assurance et le rappel, puis verser.",
    },
    "3.2": {
      situation:
        "Le crédit a été approuvé comme ETP. Un crédit normal a un rappel de 2 ans. Qu'en est-il pour l'ETP?",
      question: "Quel rappel s'applique pour l'ETP?",
      options: [
        { key: "A", text: "Identique à un crédit normal" },
        { key: "B", text: "Aucun rappel nécessaire" },
        {
          key: "C",
          text: "Rappel plus court – l'ETP est un cas exceptionnel et doit être vérifié plus fréquemment.",
        },
        { key: "D", text: "Rappel de 5 ans" },
      ],
      feedback:
        "ETP = entorse à la règle avec motivation. C'est pourquoi le rappel est plus court que la normale. La banque doit vérifier plus fréquemment si la situation s'est améliorée.",
    },
    "3.3": {
      situation:
        "La banque a un 1er gage immobilier de CHF 500'000 et un 2e gage de CHF 200'000. L'objet est vendu pour CHF 600'000. Combien la banque reçoit-elle?",
      question: "Combien la banque reçoit-elle de la vente?",
      options: [
        { key: "A", text: "CHF 700'000 – montant total" },
        {
          key: "B",
          text: "CHF 600'000 – le 1er gage est entièrement couvert (CHF 500'000), le 2e gage seulement partiellement (CHF 100'000).",
        },
        { key: "C", text: "CHF 350'000 – 50% chacun" },
        { key: "D", text: "Uniquement le 1er gage CHF 500'000" },
      ],
      feedback:
        "L'ordre de priorité est déterminant. Le 1er gage est servi en premier. CHF 500'000 pour le 1er gage, les CHF 100'000 restants pour le 2e gage. CHF 100'000 de la 2e hypothèque ne sont pas couverts.",
    },
    "3.4": {
      situation:
        "Un jeune entrepreneur (28 ans) a fondé une startup technologique. Chiffre d'affaires annuel: CHF 0 (phase de création, 6 mois). Il demande un crédit d'exploitation de CHF 100'000, sans garanties et sans bilan.",
      question: "Que faites-vous?",
      options: [
        {
          key: "A",
          text: "Crédit impossible sous cette forme: pas de bilan, pas de garanties. Proposer des alternatives: Société de cautionnement BG Mitte, soutien Innosuisse, crowdfunding, tour de table. Décision de crédit possible dès que bilan et garanties disponibles.",
        },
        {
          key: "B",
          text: "Examiner le crédit en principe – business plan et profil du fondateur suffisent comme base. Le client peut soumettre les bilans après 12 mois, les garanties sont optionnelles en cas d'idée convaincante.",
        },
        {
          key: "C",
          text: "Prendre le cautionnement personnel du père comme sûreté principale – le risque est ainsi suffisamment couvert et le crédit peut être approuvé sans autres documents.",
        },
        {
          key: "D",
          text: "Accorder immédiatement un microcrédit de CHF 10'000, durée 36 mois. Dès que le premier bilan est disponible, augmenter le crédit au montant demandé.",
        },
      ],
      feedback:
        "Sans bilan et sans garanties, un crédit bancaire n'est pas praticable – l'examen nécessite des données financières documentées. Bonne pratique: proposer des alternatives (Société de cautionnement BG Mitte, Innosuisse, crowdfunding, Business Angels). Traiter le jeune entrepreneur équitablement et refuser avec perspective est préférable à un crédit sans fondement.",
    },
  },

  it: {
    "1.1": {
      situation:
        "Credito ipotecario approvato. La garanzia immobiliare non è ancora iscritta. Il cliente chiede quando arriverà il denaro.",
      question: "Quando è possibile effettuare il versamento?",
      options: [
        {
          key: "A",
          text: "Solo quando la garanzia immobiliare è iscritta, tutti i documenti sono firmati e la prova assicurativa è disponibile.",
        },
        {
          key: "B",
          text: "Immediatamente – con il contratto di credito firmato, la banca è legalmente tenuta a versare. La garanzia immobiliare può essere in sospeso se il notaio ha rilasciato una conferma scritta di versamento.",
        },
        {
          key: "C",
          text: "Automaticamente entro tre giorni lavorativi – l'interfaccia interna del credito attiva un versamento automatico dopo l'approvazione, non appena il contratto è registrato come 'firmato'. La garanzia immobiliare non viene verificata.",
        },
        {
          key: "D",
          text: "Il consulente clienti decide in accordo con il cliente – l'approvazione fissa solo l'importo e le condizioni, non la data di versamento. Il consulente ha piena libertà d'azione.",
        },
      ],
      feedback:
        "Il versamento avviene solo quando tutte le garanzie sono costituite. La garanzia immobiliare deve essere iscritta nel registro fondiario prima del versamento.",
    },
    "1.2": {
      situation:
        "Sta verificando un dossier di credito prima del versamento. Il contratto di credito è presente ma è stato firmato solo dal cliente – manca la firma della banca.",
      question: "Cosa fa?",
      options: [
        { key: "A", text: "Versare – il cliente ha firmato" },
        {
          key: "B",
          text: "Non versare – il contratto di credito deve essere firmato da entrambe le parti.",
        },
        { key: "C", text: "Chiedere a un collega" },
        { key: "D", text: "Far firmare in seguito e versare immediatamente" },
      ],
      feedback:
        "Il contratto di credito diventa giuridicamente valido solo quando entrambe le parti hanno firmato. Il versamento senza firme complete è impossibile.",
    },
    "1.3": {
      situation: "Il credito è stato versato. Quando deve essere impostato un promemoria?",
      question: "Quando imposta il promemoria?",
      options: [
        {
          key: "A",
          text: "Nessun promemoria necessario dopo versamento completo – durante la durata, il sistema bancario principale monitora automaticamente tutti i pagamenti e invia avvisi in caso di mancato pagamento.",
        },
        {
          key: "B",
          text: "Promemoria solo in caso di problemi o situazioni ETP – per le ipoteche con pagamenti regolari degli interessi, la verifica annuale automatica da parte del sistema è sufficiente.",
        },
        {
          key: "C",
          text: "Per ogni concessione di credito – verifica regolare della solvibilità e delle garanzie.",
        },
        {
          key: "D",
          text: "Promemoria dopo 10 anni al cambio del periodo a tasso fisso – nel frattempo, il sistema interno di monitoraggio del rating si occupa automaticamente della valutazione continua della solvibilità.",
        },
      ],
      feedback:
        "Il promemoria è obbligatorio per ogni credito. Verifica regolare della solvibilità, delle garanzie e della situazione del cliente. Per i casi ETP, il promemoria è più frequente.",
    },
    "1.4": {
      situation:
        "Un cliente desidera un credito al consumo di CHF 25'000 per un'automobile usata. Ha un impiego fisso e chiede: «Quando riceverò il denaro?»",
      question: "Cosa deve essere verificato obbligatoriamente prima del versamento?",
      options: [
        {
          key: "A",
          text: "La busta paga attuale e l'autodichiarazione sono sufficienti – per crediti al consumo sotto CHF 30'000, è ammissibile una procedura semplificata secondo la LCC.",
        },
        {
          key: "B",
          text: "La certificazione salariale del datore di lavoro e l'autodichiarazione firmata sono sufficienti. La consultazione ZEK è a discrezione della banca secondo la LCC.",
        },
        {
          key: "C",
          text: "Le buste paga e la consultazione ZEK sono sufficienti. I debiti esistenti devono essere calcolati solo se l'importo richiesto supera CHF 30'000.",
        },
        {
          key: "D",
          text: "Esame della capacità di credito secondo la LCC: buste paga (min. 3 mesi), estratto del registro delle esecuzioni, tutti i debiti esistenti inclusi. Credito solo se dimostrabilmente sostenibile.",
        },
      ],
      feedback:
        "LCC art. 22: l'esame della capacità di credito è legalmente obbligatorio prima di ogni contratto di credito al consumo. Buste paga (min. 3 mesi), estratto del registro delle esecuzioni, tutti i debiti inclusi. Senza esame il contratto è nullo (LCC art. 15) – la banca assume quindi il rischio totale.",
    },
    "2.1": {
      briefing:
        "Ipoteca CHF 700'000 su un oggetto di valore venale CHF 900'000. Calcolare la parte scoperta.",
      question: "La 1a ipoteca copre fino al ___ % del valore venale.",
      feedback:
        "Tutto ciò che supera il 65% di pegno è 2a ipoteca = parte scoperta. Questa parte scoperta deve essere rimborsata entro 15 anni – direttamente o indirettamente tramite il pilastro 3a.",
    },
    "2.2": {
      situation:
        "Credito aziendale CHF 200'000. Come garanzia è stata convenuta una fideiussione del titolare. Constata che il contratto di fideiussione non è firmato.",
      question: "Cosa fa?",
      options: [
        { key: "A", text: "Versare – una promessa verbale è sufficiente" },
        {
          key: "B",
          text: "Non versare – la fideiussione deve essere disponibile per iscritto e firmata prima del versamento.",
        },
        { key: "C", text: "Versamento parziale CHF 100'000" },
        { key: "D", text: "Versare senza fideiussione" },
      ],
      feedback:
        "Le garanzie devono essere completamente costituite prima del versamento. Una fideiussione senza firma non è giuridicamente valida.",
    },
    "2.3": {
      situation:
        "Ipoteca CHF 800'000. Fondi propri CHF 200'000 (25%). Il cliente afferma che i fondi propri sono disponibili ma nel dossier non vi è alcuna prova.",
      question: "Cosa fa?",
      options: [
        { key: "A", text: "Fidarsi – il cliente dice che ci sono" },
        { key: "B", text: "Versare il 50%" },
        { key: "C", text: "Versare e verificare in seguito" },
        {
          key: "D",
          text: "Non versare – i fondi propri devono essere attestati prima del versamento (estratto conto, estratto del deposito, ecc.).",
        },
      ],
      feedback:
        "I fondi propri devono essere documentati prima del versamento. Estratto conto o estratto del deposito come prova. Senza prova nessun versamento – indipendentemente da quanto dice il cliente.",
    },
    "2.4": {
      situation:
        "Un titolare di PMI richiede un credito d'esercizio di CHF 150'000. È davanti a Lei e dice: «Andiamo bene – l'anno scorso crescita del 10%.»",
      question: "Quali documenti esige obbligatoriamente?",
      options: [
        {
          key: "A",
          text: "Bilanci degli ultimi 2 anni, estratto RC, registro delle esecuzioni (azienda e titolare), pianificazione attuale della liquidità. Dedurre dai dati il tasso di fondi propri e il cash flow operativo.",
        },
        {
          key: "B",
          text: "L'autodichiarazione del titolare e gli estratti conto attuali sono sufficienti come base – per crediti d'esercizio sotto CHF 250'000, non è richiesto un bilancio completo secondo la procedura PMI semplificata.",
        },
        {
          key: "C",
          text: "Estratto RC e documento d'identità del titolare – questo dimostra chiaramente il diritto di firma, condizione principale per i crediti a persone giuridiche. I bilanci possono essere presentati dopo sei mesi.",
        },
        {
          key: "D",
          text: "Il business plan e le proiezioni di crescita sono sufficienti come base di credito – per le PMI in forte crescita, valutiamo principalmente le prospettive future. È così regolato internamente per i crediti fino a CHF 250'000.",
        },
      ],
      feedback:
        "Credito aziendale: bilanci (min. 2 anni) per analisi di tendenza, estratto RC per diritto di firma, registro delle esecuzioni azienda e titolare (in caso di solidarietà), pianificazione della liquidità. Tasso di fondi propri >20% e cash flow operativo positivo sono determinanti – le promesse di crescita non sostituiscono i dati.",
    },
    "2.5": {
      situation:
        "Un cliente possiede un deposito titoli con azioni di valore CHF 200'000. Desidera un credito lombardo di CHF 150'000.",
      question: "Cosa constata?",
      options: [
        {
          key: "A",
          text: "Nessun problema – il deposito supera l'importo del credito e costituisce una copertura completa. I portafogli azionari sono dati in pegno al 100% del valore di mercato attuale poiché possono essere liquidati in qualsiasi momento.",
        },
        {
          key: "B",
          text: "Il deposito deve essere completamente liquidato prima della concessione del credito – solo quando il capitale è sul conto si può aprire un credito in conto corrente garantito. Il deposito stesso non può essere dato in pegno.",
        },
        {
          key: "C",
          text: "I crediti lombardi sono concessi secondo il principio 1:1 – CHF 200'000 di deposito equivale a CHF 200'000 di limite di credito. Un contratto di pegno non è legalmente prescritto per i crediti lombardi.",
        },
        {
          key: "D",
          text: "Valore di pegno delle azioni max. 50-60% del valore di mercato = CHF 100'000-120'000. CHF 150'000 supera il valore di pegno. Contratto di pegno obbligatorio. In caso di ribasso dei corsi, rischio di margin call.",
        },
      ],
      feedback:
        "Valore di pegno secondo la classe di attivo: azioni 50-60%, obbligazioni 70-80%, fondi monetari fino al 90%. CHF 150'000 su CHF 200'000 di azioni = 75% di pegno – troppo alto. Contratto di pegno e modulo di costituzione del pegno obbligatori. In caso di ribasso dei corsi sotto il valore di pegno: margin call – il cliente deve fornire garanzie supplementari o ridurre il credito.",
    },
    "2.6": {
      situation:
        "Un cliente ipotecario non ha pagato due rate di interessi consecutive. Arretrato totale CHF 4'500. Nessun contatto da 6 settimane nonostante le lettere di sollecito.",
      question: "Quali sono i prossimi passi?",
      options: [
        {
          key: "A",
          text: "Lettera raccomandata con termine finale, avviare le esecuzioni, informare il consulente e l'ufficio crediti. Documentare ogni passo senza lacune.",
        },
        { key: "B", text: "Attendere – forse pagherà ancora da solo" },
        { key: "C", text: "Inviare ancora un semplice sollecito" },
        { key: "D", text: "Disdire il credito immediatamente senza ulteriori passi" },
      ],
      feedback:
        "Processo di sollecito in caso di ritardo: 1. Lettera di sollecito (effettuata), 2. Lettera raccomandata con termine finale di pagamento, 3. Avviare le esecuzioni, 4. Disdetta del credito (solo come ultima ratio dopo escalation). Documentazione senza lacune di ogni passo obbligatoria – conservazione delle prove per eventuali procedimenti giudiziari.",
    },
    "2.7": {
      situation:
        "Max Huber (52 anni), imprenditore individuale, acquista un immobile commerciale per CHF 1'200'000. Chiede un'ipoteca di CHF 800'000 (pegno 67%).",
      question: "Cosa constata?",
      options: [
        { key: "A", text: "Tutto in ordine – 67% è inferiore all'80%" },
        {
          key: "B",
          text: "67% di pegno è normale e ammissibile per il commerciale",
        },
        { key: "C", text: "Solo il chiarimento FATCA è rilevante qui" },
        {
          key: "D",
          text: "Pegno 67% supera il massimo per gli immobili commerciali (60-65%). Inoltre: imprenditore individuale = persona fisica – autodichiarazione FATCA obbligatoria.",
        },
      ],
      feedback:
        "Immobili commerciali: pegno massimo 60-65% (nettamente inferiore all'abitazione principale con l'80%). CHF 800'000 / CHF 1'200'000 = 67% – troppo alto, ETP o rifiuto necessario. L'imprenditore individuale è giuridicamente una persona fisica: autodichiarazione FATCA obbligatoria per ogni relazione bancaria.",
    },
    "3.1": {
      situation: "Sta verificando il versamento di un'ipoteca di CHF 1'200'000. Lista di controllo:",
      question: "Cosa fa?",
      options: [
        { key: "A", text: "Versare – la maggior parte degli elementi è presente" },
        {
          key: "B",
          text: "Non versare – 2 punti mancano: la prova assicurativa e il promemoria devono essere completati prima del versamento.",
        },
        { key: "C", text: "Versamento parziale" },
        {
          key: "D",
          text: "Versare e registrare i documenti mancanti come completamento – la prova assicurativa può essere presentata entro 30 giorni, il promemoria si considera impostato.",
        },
      ],
      feedback:
        "Tutti i presupposti di versamento devono essere soddisfatti – senza eccezioni. Completare la prova assicurativa e il promemoria, poi versare.",
    },
    "3.2": {
      situation:
        "Il credito è stato approvato come ETP. Un credito normale ha un promemoria di 2 anni. Cosa vale per l'ETP?",
      question: "Quale promemoria vale per l'ETP?",
      options: [
        { key: "A", text: "Uguale a un credito normale" },
        { key: "B", text: "Nessun promemoria necessario" },
        {
          key: "C",
          text: "Promemoria più breve – l'ETP è un caso eccezionale e deve essere verificato più frequentemente.",
        },
        { key: "D", text: "Promemoria di 5 anni" },
      ],
      feedback:
        "ETP = deroga alla regola con motivazione. Per questo motivo il promemoria è più breve del normale. La banca deve verificare più frequentemente se la situazione è migliorata.",
    },
    "3.3": {
      situation:
        "La banca ha una 1a garanzia immobiliare di CHF 500'000 e una 2a garanzia di CHF 200'000. L'oggetto viene venduto per CHF 600'000. Quanto riceve la banca?",
      question: "Quanto riceve la banca dalla vendita?",
      options: [
        { key: "A", text: "CHF 700'000 – importo totale" },
        {
          key: "B",
          text: "CHF 600'000 – la 1a garanzia è completamente soddisfatta (CHF 500'000), la 2a garanzia solo parzialmente (CHF 100'000).",
        },
        { key: "C", text: "CHF 350'000 – 50% ciascuno" },
        { key: "D", text: "Solo la 1a garanzia CHF 500'000" },
      ],
      feedback:
        "L'ordine di priorità è determinante. La 1a garanzia viene soddisfatta per prima. CHF 500'000 per la 1a garanzia, i restanti CHF 100'000 per la 2a garanzia. CHF 100'000 della 2a ipoteca non sono coperti.",
    },
    "3.4": {
      situation:
        "Un giovane imprenditore (28 anni) ha fondato una startup tecnologica. Fatturato annuo: CHF 0 (fase di avviamento, 6 mesi). Richiede un credito d'esercizio di CHF 100'000, senza garanzie e senza bilancio.",
      question: "Cosa fa?",
      options: [
        {
          key: "A",
          text: "Credito impossibile in questa forma: nessun bilancio, nessuna garanzia. Mostrare alternative: Società di fideiussione BG Mitte, sostegno Innosuisse, crowdfunding, round di capitale. Decisione di credito possibile quando bilancio e garanzie disponibili.",
        },
        {
          key: "B",
          text: "Esaminare il credito in linea di principio – business plan e profilo del fondatore sono sufficienti come base. Il cliente può presentare i bilanci dopo 12 mesi, le garanzie sono opzionali in caso di idea convincente.",
        },
        {
          key: "C",
          text: "Prendere la fideiussione personale del padre come garanzia principale – il rischio è così sufficientemente coperto e il credito può essere approvato senza ulteriori documenti.",
        },
        {
          key: "D",
          text: "Concedere immediatamente un microcredito di CHF 10'000, durata 36 mesi. Non appena disponibile il primo bilancio, aumentare il credito all'importo richiesto.",
        },
      ],
      feedback:
        "Senza bilancio e senza garanzie, un credito bancario non è praticabile – l'esame del credito richiede dati finanziari documentati. Buona prassi: mostrare alternative (Società di fideiussione BG Mitte, Innosuisse, crowdfunding, Business Angels). Trattare il giovane imprenditore equamente e rifiutare con prospettiva è preferibile a una concessione di credito senza fondamento.",
    },
  },
};
