import type { LangTranslations } from "./utils";

export const MW_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      briefing:
        "Intérêts hypothécaires de CHF 2'400 étaient dus le 1er mai. Aujourd'hui, nous sommes le 15 mai. Aucun paiement reçu.",
      question: "Le rappel de paiement est envoyé ___ jours après l'échéance.",
      feedback:
        "Le rappel de paiement intervient 10 jours après l'échéance – premier contact amical, pas encore de frais de relance. Objectif: le client paie sans nouvelle escalade.",
    },
    "1.2": {
      briefing:
        "Le client a payé le montant en souffrance après le 1er rappel. Le rappel comportait des frais de CHF 25.",
      question: "Que se passe-t-il avec les frais de relance?",
      options: [
        { key: "A", text: "Les frais sont remis – le client a quand même payé" },
        {
          key: "B",
          text: "Les frais de relance de CHF 25 restent dus et sont facturés au client.",
        },
        { key: "C", text: "Réduire les frais de moitié" },
        { key: "D", text: "Laisser décider le supérieur" },
      ],
      feedback:
        "Les frais de relance ne sont pas remis même si le client paie ensuite. Les frais sont dus en raison du travail de relance de la banque. Seulement dans des cas exceptionnels et avec autorisation, un remise de frais est possible.",
    },
    "1.3": {
      briefing:
        "Taux de crédit à la consommation CHF 450 était dû le 1er avril. Rappel de paiement envoyé le 11 avril. Aucune réaction. Aujourd'hui nous sommes le 25 avril.",
      question: "Que faut-il faire maintenant?",
      options: [
        { key: "A", text: "Envoyer le 1er rappel avec délai et frais de relance." },
        { key: "B", text: "Envoyer à nouveau un rappel de paiement" },
        { key: "C", text: "Résilier immédiatement" },
        { key: "D", text: "Engager des poursuites" },
      ],
      feedback:
        "Le rappel de paiement a été ignoré. Prochaine étape: 1er rappel avec délai de paiement concret et frais de relance. Le client doit comprendre que l'escalade suit.",
    },
    "2.1": {
      briefing:
        "Le client n'a pas payé malgré le rappel de paiement et deux rappels. Arriéré: CHF 3'600. Quelles sont les conditions pour une résiliation?",
      question: "Comment procédez-vous?",
      options: [
        { key: "A", text: "Résilier immédiatement – deux rappels suffisent" },
        {
          key: "B",
          text: "Résiliation uniquement par écrit en recommandé, avec délai de résiliation, après que toutes les étapes de relance ont été parcourues.",
        },
        { key: "C", text: "Une résiliation verbale suffit" },
        { key: "D", text: "D'abord les poursuites, puis la résiliation" },
      ],
      feedback:
        "La résiliation doit impérativement être effectuée par écrit en recommandé. Toutes les étapes de relance précédentes doivent avoir été parcourues. Une résiliation sans étapes correctes peut être contestée juridiquement.",
    },
    "2.2": {
      briefing:
        "Le client doit CHF 1'800. Après le 1er rappel, il paie CHF 900 – la moitié. Il dit: «Je paierai le reste le mois prochain.»",
      question: "Que faites-vous?",
      options: [
        {
          key: "A",
          text: "D'accord – accepter le paiement partiel et arrêter le processus de relance",
        },
        { key: "B", text: "Arrêter complètement le processus de relance" },
        { key: "C", text: "Rembourser le montant total" },
        {
          key: "D",
          text: "Comptabiliser le paiement partiel, mais continuer le processus de relance pour les CHF 900 restants. Obtenir une confirmation écrite de l'accord de paiement échelonné.",
        },
      ],
      feedback:
        "Le paiement partiel est comptabilisé mais le processus de relance continue pour le solde. Sans convention écrite, une promesse verbale n'a pas de valeur. Consigner par écrit l'accord de paiement échelonné.",
    },
    "2.3": {
      briefing:
        "Le crédit a été résilié. Le client ne paie toujours pas. Que faut-il pour engager les poursuites?",
      question: "Comment engagez-vous les poursuites?",
      options: [
        {
          key: "A",
          text: "Déposer une réquisition de poursuite auprès de l'office des poursuites compétent avec: données du débiteur, montant de la créance, motif de la créance.",
        },
        { key: "B", text: "Une instruction verbale à l'office des poursuites suffit" },
        { key: "C", text: "Déclarer directement la faillite" },
        { key: "D", text: "Mandater un avocat et attendre" },
      ],
      feedback:
        "Les poursuites passent par l'office des poursuites compétent (domicile du débiteur). Réquisition de poursuite avec données précises du débiteur et détails de la créance. L'office des poursuites envoie ensuite le commandement de payer au débiteur.",
    },
    "3.1": {
      briefing:
        "La banque a engagé des poursuites. Le débiteur fait opposition. Qu'est-ce que cela signifie et que doit faire la banque?",
      question: "Comment réagissez-vous?",
      options: [
        {
          key: "A",
          text: "L'opposition suspend provisoirement les poursuites. La banque doit demander la mainlevée au tribunal pour continuer les poursuites.",
        },
        { key: "B", text: "Les poursuites sont terminées – l'opposition clôt tout" },
        { key: "C", text: "Engager immédiatement une procédure de faillite" },
        { key: "D", text: "Ne rien faire – simplement attendre" },
      ],
      feedback:
        "Opposition = le débiteur conteste la créance. Les poursuites sont interrompues. La banque a besoin d'une mainlevée (provisoire ou définitive) pour continuer. La mainlevée provisoire est possible si une reconnaissance de dette écrite existe (p.ex. contrat de crédit).",
    },
    "3.2": {
      briefing:
        "Un client hypothécaire n'a pas payé 3 mois d'intérêts. Total CHF 7'200 en souffrance. Toutes les étapes de relance parcourues. Objet: résidence principale valeur CHF 900'000. Hypothèque: CHF 600'000.",
      question: "Que recommandez-vous?",
      options: [
        {
          key: "A",
          text: "Engager immédiatement des poursuites en réalisation de gage immobilier",
        },
        { key: "B", text: "Ne rien entreprendre – l'objet est suffisamment en garantie" },
        { key: "C", text: "Amortir immédiatement le crédit" },
        {
          key: "D",
          text: "Malgré la résiliation, chercher d'abord à parler avec le client – examiner la vente de l'objet ou le refinancement. La réalisation forcée est le dernier recours.",
        },
      ],
      feedback:
        "Pour les hypothèques avec couverture suffisante, toujours chercher une solution en premier. La réalisation forcée est coûteuse et longue pour tous. La vente par le client lui-même est souvent une meilleure solution. Seulement si aucun accord: poursuites en réalisation de gage immobilier.",
    },
    "3.3": {
      briefing:
        "Une créance ouverte de 2019 de CHF 2'800 n'a jamais été poursuivie. Le client réapparaît et souhaite ouvrir un nouveau compte.",
      question: "Les créances de crédit à la consommation se prescrivent après ___ ans.",
      feedback:
        "Les créances de crédit à la consommation se prescrivent après 5 ans. Une créance prescrite ne peut plus être réclamée juridiquement. La nouvelle relation d'affaires est examinée séparément – tenir compte de la solvabilité et de l'inscription ZEK.",
    },
  },

  it: {
    "1.1": {
      briefing:
        "Interessi ipotecari di CHF 2'400 erano in scadenza il 1° maggio. Oggi è il 15 maggio. Nessun pagamento ricevuto.",
      question: "Il sollecito di pagamento viene inviato ___ giorni dopo la scadenza.",
      feedback:
        "Il sollecito di pagamento avviene 10 giorni dopo la scadenza – primo contatto amichevole, ancora nessuna tassa di sollecito. Obiettivo: il cliente paga senza ulteriore escalation.",
    },
    "1.2": {
      briefing:
        "Il cliente ha pagato l'importo in sospeso dopo il 1° sollecito. Il sollecito aveva una tassa di CHF 25.",
      question: "Cosa succede con la tassa di sollecito?",
      options: [
        { key: "A", text: "La tassa viene condonata – il cliente ha comunque pagato" },
        {
          key: "B",
          text: "La tassa di sollecito di CHF 25 rimane e viene addebitata al cliente.",
        },
        { key: "C", text: "Dimezzare la tassa" },
        { key: "D", text: "Lasciare decidere al superiore" },
      ],
      feedback:
        "Le tasse di sollecito non vengono condonati anche se il cliente paga in seguito. La tassa è dovuta per il lavoro di sollecito della banca. Solo in casi eccezionali e con autorizzazione, un condono è possibile.",
    },
    "1.3": {
      briefing:
        "Rata di credito al consumo CHF 450 era in scadenza il 1° aprile. Sollecito di pagamento inviato l'11 aprile. Nessuna reazione. Oggi è il 25 aprile.",
      question: "Cosa bisogna fare ora?",
      options: [
        { key: "A", text: "Inviare il 1° sollecito con termine e tassa di sollecito." },
        { key: "B", text: "Inviare nuovamente un sollecito di pagamento" },
        { key: "C", text: "Disdire immediatamente" },
        { key: "D", text: "Avviare le esecuzioni" },
      ],
      feedback:
        "Il sollecito di pagamento è stato ignorato. Fase successiva: 1° sollecito con termine di pagamento concreto e tassa di sollecito. Il cliente deve capire che seguirà un'escalation.",
    },
    "2.1": {
      briefing:
        "Il cliente non ha pagato nonostante il sollecito di pagamento e due solleciti. Arretrato: CHF 3'600. Quali sono le condizioni per una disdetta?",
      question: "Come procede?",
      options: [
        { key: "A", text: "Disdire immediatamente – due solleciti sono sufficienti" },
        {
          key: "B",
          text: "Disdetta solo per iscritto tramite raccomandata, con termine di disdetta, dopo che tutte le fasi di sollecito sono state percorse.",
        },
        { key: "C", text: "Una disdetta verbale è sufficiente" },
        { key: "D", text: "Prima le esecuzioni, poi la disdetta" },
      ],
      feedback:
        "La disdetta deve essere effettuata obbligatoriamente per iscritto tramite raccomandata. Tutte le fasi di sollecito precedenti devono essere state percorse. Una disdetta senza le fasi corrette può essere contestata giuridicamente.",
    },
    "2.2": {
      briefing:
        "Il cliente deve CHF 1'800. Dopo il 1° sollecito paga CHF 900 – la metà. Dice: «Il resto lo pago il mese prossimo.»",
      question: "Cosa fa?",
      options: [
        {
          key: "A",
          text: "D'accordo – accettare il pagamento parziale e fermare il processo di sollecito",
        },
        { key: "B", text: "Fermare completamente il processo di sollecito" },
        { key: "C", text: "Rimborosare l'importo totale" },
        {
          key: "D",
          text: "Contabilizzare il pagamento parziale, ma continuare il processo di sollecito per i CHF 900 restanti. Ottenere una conferma scritta dell'accordo di pagamento rateale.",
        },
      ],
      feedback:
        "Il pagamento parziale viene contabilizzato ma il processo di sollecito continua per il saldo. Senza accordo scritto, una promessa verbale non ha valore. Fissare per iscritto l'accordo di pagamento rateale.",
    },
    "2.3": {
      briefing:
        "Il credito è stato disdetto. Il cliente ancora non paga. Cosa occorre per avviare le esecuzioni?",
      question: "Come avvia le esecuzioni?",
      options: [
        {
          key: "A",
          text: "Presentare una domanda di esecuzione all'ufficio esecuzioni competente con: dati del debitore, importo del credito, motivo del credito.",
        },
        {
          key: "B",
          text: "Un'istruzione verbale all'ufficio esecuzioni è sufficiente",
        },
        { key: "C", text: "Dichiarare direttamente il fallimento" },
        { key: "D", text: "Incaricare un avvocato e attendere" },
      ],
      feedback:
        "Le esecuzioni passano per l'ufficio esecuzioni competente (domicilio del debitore). Domanda di esecuzione con dati precisi del debitore e dettagli del credito. L'ufficio esecuzioni invia quindi il precetto escussivo al debitore.",
    },
    "3.1": {
      briefing:
        "La banca ha avviato le esecuzioni. Il debitore propone opposizione. Cosa significa e cosa deve fare la banca?",
      question: "Come reagisce?",
      options: [
        {
          key: "A",
          text: "L'opposizione sospende provvisoriamente le esecuzioni. La banca deve richiedere la revoca dell'opposizione al tribunale per continuare le esecuzioni.",
        },
        { key: "B", text: "Le esecuzioni sono concluse – l'opposizione chiude tutto" },
        { key: "C", text: "Avviare immediatamente il fallimento" },
        { key: "D", text: "Non fare nulla – semplicemente attendere" },
      ],
      feedback:
        "Opposizione = il debitore contesta il credito. Le esecuzioni vengono interrotte. La banca ha bisogno della revoca dell'opposizione (provvisoria o definitiva) per continuare. La revoca provvisoria è possibile se esiste un riconoscimento scritto del debito (p.es. contratto di credito).",
    },
    "3.2": {
      briefing:
        "Un cliente ipotecario non ha pagato 3 mesi di interessi. Totale CHF 7'200 in sospeso. Tutte le fasi di sollecito percorse. Oggetto: abitazione principale valore CHF 900'000. Ipoteca: CHF 600'000.",
      question: "Cosa raccomanda?",
      options: [
        {
          key: "A",
          text: "Avviare immediatamente esecuzioni in realizzazione del pegno immobiliare",
        },
        {
          key: "B",
          text: "Non fare nulla – l'oggetto è una garanzia sufficiente",
        },
        { key: "C", text: "Ammortizzare immediatamente il credito" },
        {
          key: "D",
          text: "Nonostante la disdetta, cercare prima un colloquio con il cliente – esaminare la vendita dell'oggetto o il rifinanziamento. La realizzazione forzata è l'ultima ratio.",
        },
      ],
      feedback:
        "Per le ipoteche con copertura sufficiente, cercare sempre prima una soluzione. La realizzazione forzata è costosa e lunga per tutti. La vendita da parte del cliente stesso è spesso una soluzione migliore. Solo se nessun accordo: esecuzioni in realizzazione del pegno immobiliare.",
    },
    "3.3": {
      briefing:
        "Un credito aperto del 2019 di CHF 2'800 non è mai stato eseguito. Il cliente riappare e desidera aprire un nuovo conto.",
      question: "I crediti al consumo si prescrivono dopo ___ anni.",
      feedback:
        "I crediti al consumo si prescrivono dopo 5 anni. Un credito prescritto non può più essere reclamato giuridicamente. La nuova relazione d'affari viene esaminata separatamente – tenere conto della solvibilità e dell'iscrizione ZEK.",
    },
  },
};
