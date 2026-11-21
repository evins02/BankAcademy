import type { LangTranslations } from "./utils";

export const BLANKOKREDIT_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      briefing: "Le client Kevin Huber, célibataire, sans enfants, souhaite un crédit à la consommation de CHF 18'000.",
      question: "Quelle est ta décision ?",
      options: [
        { key: "A", text: "Refuser – risque trop élevé" },
        {
          key: "B",
          text: "Accorder – solvabilité établie. L'amortissement mensuel de CHF 500 est inférieur à la marge disponible de CHF 1'720.",
        },
        { key: "C", text: "Rejeter – documents manquants" },
        { key: "D", text: "Accord partiel de CHF 10'000" },
      ],
      feedback:
        "Solvabilité clairement établie. La marge disponible de CHF 1'720 couvre largement l'amortissement de CHF 500. Accord possible.",
    },
    "1.2": {
      briefing: "La cliente Lisa Meier, célibataire, souhaite un crédit de CHF 30'000.",
      question: "Quelle est ta décision ?",
      options: [
        { key: "A", text: "Accorder – le salaire net de CHF 4'200 est stable et le ZEK ne montre aucune inscription négative au moment de l'examen." },
        {
          key: "B",
          text: "Rejeter avec indication : nouvelle demande dans 6 mois, après remboursement de la carte de crédit la marge dépassera CHF 800.",
        },
        { key: "C", text: "Accord partiel de CHF 20'000 sur 36 mois – l'amortissement tombe à CHF 556 et entre dans la marge." },
        { key: "D", text: "Refuser – solvabilité non établie. L'amortissement mensuel de CHF 1'056 dépasse massivement la marge de CHF 430." },
      ],
      feedback:
        "Solvabilité clairement non établie. La marge de CHF 430 ne suffit pas pour l'amortissement de CHF 1'056. Refus obligatoire.",
    },
    "1.3": {
      briefing:
        "Un client vient pour un crédit de CHF 15'000. Dans le ZEK, vous voyez : il a déjà une carte de crédit avec une limite de CHF 10'000 et un leasing de CHF 12'000.",
      question: "Que prends-tu en compte dans l'examen de solvabilité ?",
      options: [
        { key: "A", text: "Uniquement le nouveau crédit" },
        { key: "B", text: "Uniquement les crédits existants" },
        {
          key: "C",
          text: "Toutes les obligations de crédit à la consommation : carte de crédit CHF 10'000 + leasing CHF 12'000 + nouveau crédit CHF 15'000 = total CHF 37'000",
        },
        { key: "D", text: "Le ZEK n'est pas pertinent" },
      ],
      feedback:
        "Le ZEK affiche TOUTES les obligations de crédit à la consommation existantes. Celles-ci doivent toutes être prises en compte – pas seulement le nouveau crédit. Total CHF 37'000 ÷ 36 = CHF 1'028 / mois.",
    },
    "1.4": {
      briefing:
        "Un client souhaite un crédit de CHF 12'000. En consultant le ZEK, vous trouvez une inscription négative : un crédit de 2022 n'a pas été payé pendant 4 mois, mais a été soldé depuis.",
      question: "Qu'est-ce que cela signifie pour la décision de crédit ?",
      options: [
        { key: "A", text: "Refuser – une inscription négative au ZEK implique un refus automatique. Aucune exception possible." },
        { key: "B", text: "Ignorer – le crédit étant déjà payé, l'inscription est caduque. Seule la situation actuelle des obligations compte." },
        { key: "C", text: "Évaluer la solvabilité malgré tout – l'inscription négative augmente le risque, doit être documentée. Selon la gravité, une approbation reste possible. La décision appartient au prêteur compétent." },
        { key: "D", text: "Accorder un crédit réduit de CHF 5'000 – les inscriptions négatives réduisent automatiquement le montant maximal à un tiers." },
      ],
      feedback:
        "Une inscription négative au ZEK n'est pas un motif de refus automatique, mais un signal de risque important. Elle doit être documentée et évaluée. Ce qui compte : depuis combien de temps ? Quelle gravité ? A-t-elle été régularisée ? L'examen de solvabilité suit tout de même la procédure standard. La décision appartient au titulaire de compétence.",
    },
    "1.5": {
      briefing:
        "Une nouvelle cliente demande : «Qu'est-ce que ce montant de base que vous déduisez de mon revenu ? Qu'est-ce qu'il couvre ?»",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "«Le montant de base couvre le loyer et les charges – tout le reste comme la nourriture et les vêtements doit être indiqué séparément.»" },
        { key: "B", text: "«Le montant de base est une déduction forfaitaire pour les dépenses courantes : alimentation, vêtements, hygiène personnelle, ménage. Il est fixé par la loi et varie selon l'état civil (célibataire CHF 1'200, couple CHF 1'700, enfant CHF 400 en plus).»" },
        { key: "C", text: "«Le montant de base est une grandeur interne à la banque que nous ne pouvons pas détailler. Il est basé sur des moyennes statistiques.»" },
        { key: "D", text: "«Le montant de base couvre uniquement les impôts et l'assurance maladie – le loyer, les frais de transport et le coût de la vie sont saisis séparément.»" },
      ],
      feedback:
        "Le montant de base (selon la loi sur le crédit à la consommation LCC et les directives) est un forfait pour les dépenses courantes : alimentation, vêtements, hygiène personnelle, ménage. Il n'est pas négociable et varie selon l'état civil : célibataire CHF 1'200, couple CHF 1'700, par enfant + CHF 400. Le loyer, l'assurance maladie, les frais de transport et les impôts sont déduits séparément.",
    },
    "2.1": {
      briefing: "Un couple souhaite un crédit de CHF 25'000. L'emprunteur est le mari.",
      question: "Quelle est ta décision ?",
      options: [
        { key: "A", text: "Prendre le revenu total du couple CHF 9'800 pour le calcul" },
        { key: "B", text: "Prendre uniquement le revenu du mari CHF 5'800" },
        {
          key: "C",
          text: "Calculer la part proportionnelle de l'emprunteur : 59% = CHF 5'782. Solvabilité établie.",
        },
        { key: "D", text: "Prendre la moyenne des deux revenus" },
      ],
      feedback:
        "Pour les couples, la part proportionnelle de l'emprunteur est calculée. Ni le revenu total, ni uniquement son propre revenu.",
    },
    "2.2": {
      briefing:
        "Un client souhaite un crédit de CHF 40'000 avec une durée de 5 ans. Il dit : «Sur 5 ans, ça ne fait que CHF 667 par mois – c'est avantageux !»",
      question:
        "L'examen de solvabilité est toujours effectué sur ___ mois – indépendamment de la durée du contrat.",
      answer: "36",
      unit: "mois",
      feedback:
        "IMPORTANT : L'examen d'amortissement est TOUJOURS effectué sur 36 mois – même si le contrat dure 5 ans. C'est une question piège classique à l'examen !",
    },
    "2.3": {
      briefing: "Un client souhaite un crédit de CHF 20'000. La marge disponible calculée est de CHF 580.",
      question: "Que fais-tu ?",
      options: [
        { key: "A", text: "Accorder – la solvabilité est établie. CHF 556 ≤ CHF 580. Juste, mais clairement dans la limite." },
        {
          key: "B",
          text: "Refuser – trop juste",
        },
        { key: "C", text: "Accord partiel de CHF 18'000" },
        { key: "D", text: "Demander des documents supplémentaires" },
      ],
      feedback:
        "La solvabilité est établie – même si juste. Tant que l'amortissement est inférieur à la marge, l'accord est possible. Pas de marge d'appréciation pour une règle claire.",
    },
    "2.4": {
      briefing:
        "Un client a une carte de crédit avec une limite de CHF 15'000. Il dit : «Je ne l'utilise jamais – elle est presque toujours à zéro. Peut-on ignorer la limite ?»",
      question: "Que lui dis-tu ?",
      options: [
        { key: "A", text: "«Oui – si la carte n'est effectivement pas utilisée, la limite peut être exclue du calcul. On prend le solde réel.»" },
        { key: "B", text: "«Non – selon la réglementation ZEK et la LCC, la limite totale de la carte est toujours prise en compte, indépendamment du solde actuel. La limite est l'obligation potentielle.»" },
        { key: "C", text: "«Seulement s'il résilie la carte avant l'octroi du crédit – la limite disparaît alors du ZEK en 30 jours.»" },
        { key: "D", text: "«On ne prend en compte que 50% de la limite – c'est le forfait usuel pour les cartes avec faible utilisation prouvée.»" },
      ],
      feedback:
        "La limite totale de la carte de crédit est toujours prise en compte – pas le solde actuel. La limite est une obligation de crédit existante au sens de la LCC. Si le client résilie la limite, l'entrée doit d'abord disparaître du ZEK avant d'être exclue du calcul. La suppression ZEK prend selon l'établissement 30 à 90 jours.",
    },
    "2.5": {
      briefing:
        "Une cliente a un revenu accessoire : elle travaille le samedi comme vendeuse et gagne CHF 700/mois en plus. Son revenu net principal est de CHF 3'800. Elle souhaite un crédit de CHF 15'000.",
      question: "Peut-on prendre en compte le revenu accessoire ?",
      options: [
        { key: "A", text: "Oui – toutes les sources de revenus prouvées peuvent être additionnées. Total CHF 4'500 comme base de calcul." },
        { key: "B", text: "Uniquement si le revenu accessoire est justifié par des fiches de salaire des 12 derniers mois et est considéré comme durable et régulier – alors il peut être pris en compte." },
        { key: "C", text: "Non – les revenus accessoires ne sont pas légalement imputables. Seul le revenu principal compte pour le calcul de solvabilité." },
        { key: "D", text: "Uniquement la moitié – les revenus accessoires sont comptés à 50% car considérés moins stables que le revenu principal." },
      ],
      feedback:
        "Le revenu accessoire peut être pris en compte s'il est : 1) régulier (pas uniquement ponctuel), 2) prouvé par des justificatifs (fiches de salaire 12 mois), 3) présumé durable. Un travail occasionnel des 2 derniers mois ne suffirait pas. Un emploi à temps partiel stable avec preuves sur au moins 1 an suffit.",
    },
    "3.1": {
      briefing: "Le client Marco Ferretti, marié, 2 enfants, souhaite un crédit de CHF 35'000.",
      question: "Quelle est ta décision ?",
      options: [
        { key: "A", text: "Accorder – revenu suffisamment élevé" },
        { key: "B", text: "Accord partiel de CHF 10'000" },
        {
          key: "C",
          text: "Refuser – solvabilité non établie. L'amortissement de CHF 1'528 dépasse massivement la marge de CHF 487.",
        },
        { key: "D", text: "Rejeter – vérifier les documents" },
      ],
      feedback:
        "Malgré un bon revenu : les charges fixes élevées, la pension alimentaire et les crédits existants absorbent la marge. Refus obligatoire. Vérifier soigneusement les inscriptions ZEK !",
    },
    "3.2": {
      briefing:
        "Marge disponible : CHF 800. Aucun crédit existant. Un client demande : «Quel crédit puis-je obtenir au maximum ?»",
      question:
        "Quel est le crédit maximum pour ce client ? CHF ___",
      answer: "28800",
      unit: "CHF",
      feedback:
        "Crédit maximum = marge disponible × 36 mois. CHF 800 × 36 = CHF 28'800. C'est la limite supérieure de la solvabilité.",
    },
    "3.3": {
      briefing:
        "Un client a une marge disponible de CHF 1'000. Crédit existant CHF 18'000. Il souhaite CHF 15'000 supplémentaires.",
      question: "La solvabilité est-elle établie ?",
      options: [
        { key: "A", text: "Non – le crédit existant suffit déjà à lui seul" },
        {
          key: "B",
          text: "Rembourser d'abord le crédit existant",
        },
        { key: "C", text: "Accorder uniquement CHF 10'000" },
        { key: "D", text: "Oui – CHF 917 ≤ CHF 1'000. Solvabilité établie pour le montant total de CHF 33'000." },
      ],
      feedback:
        "Ce qui compte toujours c'est le montant TOTAL de tous les crédits divisé par 36. Pas chaque crédit individuellement. CHF 33'000 ÷ 36 = CHF 917 ≤ marge CHF 1'000 = solvabilité établie.",
    },
    "3.4": {
      briefing:
        "Un client souhaite un crédit de CHF 25'000. Marge disponible : CHF 450. Amortissement : CHF 694/mois → solvabilité non établie. Son père (64 ans, revenu net CHF 7'000, sans dettes) se propose comme caution.",
      question: "Qu'apporte la caution du père ?",
      options: [
        { key: "A", text: "La caution remplace entièrement l'examen de solvabilité – si la caution a un revenu suffisant, le crédit peut être accordé même si l'emprunteur principal est insolvable." },
        { key: "B", text: "La caution améliore la sécurité de la banque, mais ne supprime pas l'examen de solvabilité légal. Si l'emprunteur principal est insolvable, le refus est obligatoire – indépendamment des cautions." },
        { key: "C", text: "Le père peut être intégré comme codébiteur. Les deux revenus sont alors additionnés et la solvabilité est recalculée – c'est admissible en interne." },
        { key: "D", text: "La caution ne fonctionne que pour les hypothèques, pas pour les crédits à la consommation. Elle n'est pas reconnue légalement comme garantie pour les crédits à la consommation." },
      ],
      feedback:
        "Important : l'examen de solvabilité selon la LCC est obligatoire et ne peut être remplacé par aucune sûreté – même pas une caution. Si l'emprunteur principal est insolvable (amortissement > marge), le refus est obligatoire. Exception : si le père est intégré comme co-requérant solidaire, les deux revenus et dépenses sont additionnés et une nouvelle solvabilité est calculée.",
    },
    "3.5": {
      briefing:
        "Un client, 45 ans, employé de commerce, a perdu son emploi. Il vit d'indemnités de chômage (CHF 3'600/mois net). Il souhaite un crédit de CHF 10'000 pour financer la période de transition.",
      question: "Que s'applique aux bénéficiaires de l'AC ?",
      options: [
        { key: "A", text: "Accorder – les indemnités de chômage sont garanties par l'État et aussi stables qu'un salaire. La solvabilité est calculée normalement avec CHF 3'600." },
        { key: "B", text: "Refuser par principe – les bénéficiaires de l'AC ne peuvent pas demander de crédits selon la LCC car le revenu est considéré comme non durable." },
        { key: "C", text: "Évaluer la solvabilité, mais avec la plus grande prudence : les indemnités de chômage sont limitées dans le temps (max. 2 ans). Le risque de durée du crédit dépasse généralement la durée de perception de l'AC. Le refus est approprié dans la plupart des cas." },
        { key: "D", text: "Accorder uniquement CHF 5'000 – en cas de chômage, le montant du crédit est automatiquement limité à 50%." },
      ],
      feedback:
        "Les indemnités de chômage peuvent être prises en compte comme revenu – techniquement. Le problème principal : l'AC est limitée dans le temps (max. 520 indemnités journalières ≈ 2 ans). Un crédit de 36 mois dépasse massivement la période de revenu garantie. Dans la pratique, un crédit est presque toujours refusé lors d'une perception d'AC ou une durée très courte est convenue.",
    },
  },
  it: {
    "1.1": {
      briefing: "Il cliente Kevin Huber, celibe, senza figli, desidera un credito al consumo di CHF 18'000.",
      question: "Qual è la tua decisione?",
      options: [
        { key: "A", text: "Rifiutare – rischio troppo elevato" },
        {
          key: "B",
          text: "Accordare – solvibilità accertata. L'ammortamento mensile di CHF 500 è inferiore alla disponibilità di CHF 1'720.",
        },
        { key: "C", text: "Respingere – documenti mancanti" },
        { key: "D", text: "Accordo parziale di CHF 10'000" },
      ],
      feedback:
        "Solvibilità chiaramente accertata. La disponibilità di CHF 1'720 copre agevolmente l'ammortamento di CHF 500. Accordo possibile.",
    },
    "1.2": {
      briefing: "La cliente Lisa Meier, celibe, desidera un credito di CHF 30'000.",
      question: "Qual è la tua decisione?",
      options: [
        { key: "A", text: "Accordare – il salario netto di CHF 4'200 è stabile e la ZEK non mostra iscrizioni negative al momento dell'esame." },
        {
          key: "B",
          text: "Respingere con indicazione: nuova richiesta fra 6 mesi, dopo il rimborso della carta di credito la disponibilità supera CHF 800.",
        },
        { key: "C", text: "Accordo parziale di CHF 20'000 su 36 mesi – l'ammortamento scende a CHF 556 e rientra nella disponibilità." },
        { key: "D", text: "Rifiutare – solvibilità non accertata. L'ammortamento mensile di CHF 1'056 supera massicciamente la disponibilità di CHF 430." },
      ],
      feedback:
        "Solvibilità chiaramente non accertata. La disponibilità di CHF 430 non è sufficiente per l'ammortamento di CHF 1'056. Rifiuto obbligatorio.",
    },
    "1.3": {
      briefing:
        "Un cliente viene per un credito di CHF 15'000. Nella ZEK vede: ha già una carta di credito con limite di CHF 10'000 e un leasing di CHF 12'000.",
      question: "Cosa prendi in considerazione nell'esame di solvibilità?",
      options: [
        { key: "A", text: "Solo il nuovo credito" },
        { key: "B", text: "Solo i crediti esistenti" },
        {
          key: "C",
          text: "Tutti gli obblighi di credito al consumo: carta di credito CHF 10'000 + leasing CHF 12'000 + nuovo credito CHF 15'000 = totale CHF 37'000",
        },
        { key: "D", text: "La ZEK non è rilevante" },
      ],
      feedback:
        "Nella ZEK sono visibili TUTTI gli obblighi di credito al consumo esistenti. Tutti devono essere presi in considerazione – non solo il nuovo credito. Totale CHF 37'000 ÷ 36 = CHF 1'028 / mese.",
    },
    "1.4": {
      briefing:
        "Un cliente vuole un credito di CHF 12'000. Consultando la ZEK, vede un'iscrizione negativa: un credito del 2022 non è stato pagato per 4 mesi, ma è stato nel frattempo saldato.",
      question: "Cosa significa per la decisione di credito?",
      options: [
        { key: "A", text: "Rifiutare – un'iscrizione negativa nella ZEK significa rifiuto automatico. Nessuna eccezione possibile." },
        { key: "B", text: "Ignorare – poiché il credito è già pagato, l'iscrizione è irrilevante. Per la solvibilità conta solo la situazione attuale degli obblighi." },
        { key: "C", text: "Esaminare comunque la solvibilità – l'iscrizione negativa aumenta il rischio, deve essere documentata. A seconda della gravità può esserci comunque un'approvazione. La decisione spetta al titolare di competenza." },
        { key: "D", text: "Accordare un credito ridotto di CHF 5'000 – le iscrizioni negative riducono automaticamente l'importo massimo a un terzo." },
      ],
      feedback:
        "Un'iscrizione negativa nella ZEK non è un motivo automatico di rifiuto, ma un importante segnale di rischio. Deve essere documentata e valutata. Ciò che conta: da quanto tempo? Quanto grave? È stata regolarizzata? L'esame di solvibilità segue comunque la procedura standard. La decisione spetta al titolare di competenza.",
    },
    "1.5": {
      briefing:
        "Una nuova cliente chiede: «Cos'è questo importo di base che detrae dal mio reddito? Cosa comprende?»",
      question: "Cosa le spieghi?",
      options: [
        { key: "A", text: "«L'importo di base copre affitto e spese accessorie – tutto il resto come cibo e vestiti deve essere indicato separatamente.»" },
        { key: "B", text: "«L'importo di base è una deduzione forfettaria per le spese correnti: alimentazione, abbigliamento, cura personale, economia domestica. È fissato dalla legge e varia in base allo stato civile (single CHF 1'200, coppia CHF 1'700, figlio CHF 400 in più).»" },
        { key: "C", text: "«L'importo di base è una grandezza interna alla banca che non possiamo dettagliare. Si basa su dati statistici medi.»" },
        { key: "D", text: "«L'importo di base copre solo imposte e assicurazione malattia – affitto, spese di trasporto e costo della vita vengono rilevati separatamente.»" },
      ],
      feedback:
        "L'importo di base (secondo la legge sul credito al consumo LCC e le direttive) è un forfait per le spese correnti: alimentazione, abbigliamento, cura personale, economia domestica. Non è negoziabile e varia in base allo stato civile: single CHF 1'200, coppia CHF 1'700, per figlio + CHF 400. Affitto, assicurazione malattia, spese di trasporto e imposte vengono dedotti separatamente.",
    },
    "2.1": {
      briefing: "Una coppia desidera un credito di CHF 25'000. Il debitore è il marito.",
      question: "Qual è la tua decisione?",
      options: [
        { key: "A", text: "Prendere il reddito totale della coppia CHF 9'800 per il calcolo" },
        { key: "B", text: "Prendere solo il reddito del marito CHF 5'800" },
        {
          key: "C",
          text: "Calcolare la quota proporzionale del debitore: 59% = CHF 5'782. Solvibilità accertata.",
        },
        { key: "D", text: "Prendere la media dei due redditi" },
      ],
      feedback:
        "Per le coppie si calcola la quota proporzionale del debitore. Non il reddito totale e non solo il suo reddito.",
    },
    "2.2": {
      briefing:
        "Un cliente vuole un credito di CHF 40'000 con durata 5 anni. Dice: «Su 5 anni sono solo CHF 667 al mese – è conveniente!»",
      question:
        "L'esame di solvibilità viene sempre effettuato su ___ mesi – indipendentemente dalla durata contrattuale.",
      answer: "36",
      unit: "mesi",
      feedback:
        "IMPORTANTE: L'esame di ammortamento viene effettuato SEMPRE su 36 mesi – anche se il contratto dura 5 anni. È una classica domanda trabocchetto all'esame!",
    },
    "2.3": {
      briefing: "Un cliente vuole un credito di CHF 20'000. La disponibilità calcolata è di CHF 580.",
      question: "Cosa fai?",
      options: [
        { key: "A", text: "Accordare – la solvibilità è accertata. CHF 556 ≤ CHF 580. Giusto, ma chiaramente entro il limite." },
        {
          key: "B",
          text: "Rifiutare – troppo giusto",
        },
        { key: "C", text: "Accordo parziale di CHF 18'000" },
        { key: "D", text: "Richiedere ulteriori documenti" },
      ],
      feedback:
        "La solvibilità è accertata – anche se appena. Finché l'ammortamento è inferiore alla disponibilità, l'accordo è possibile. Nessun margine di discrezionalità per una regola chiara.",
    },
    "2.4": {
      briefing:
        "Un cliente ha una carta di credito con limite di CHF 15'000. Dice: «Non la uso mai – è quasi sempre a zero. Si può escludere il limite?»",
      question: "Cosa gli dici?",
      options: [
        { key: "A", text: "«Sì – se la carta non viene effettivamente utilizzata, il limite può essere escluso dal calcolo. Prendiamo il saldo effettivo.»" },
        { key: "B", text: "«No – secondo la regolamentazione ZEK e la LCC, il limite totale della carta viene sempre computato, indipendentemente dal saldo attuale. Il limite è l'obbligo potenziale.»" },
        { key: "C", text: "«Solo se cancella la carta prima dell'erogazione del credito – il limite sparisce dalla ZEK entro 30 giorni.»" },
        { key: "D", text: "«Computiamo solo il 50% del limite – è il forfait consueto per carte con utilizzo basso dimostrato.»" },
      ],
      feedback:
        "Il limite totale della carta di credito viene sempre computato – non il saldo attuale. Il limite è un obbligo di credito esistente ai sensi della LCC. Se il cliente cancella il limite, l'iscrizione deve prima sparire dalla ZEK prima di essere esclusa dal calcolo. La cancellazione dalla ZEK richiede 30-90 giorni a seconda dell'istituto.",
    },
    "2.5": {
      briefing:
        "Una cliente ha un reddito accessorio: lavora il sabato come commessa e guadagna CHF 700/mese in più. Il suo reddito netto principale è CHF 3'800. Desidera un credito di CHF 15'000.",
      question: "Puoi computare il reddito accessorio?",
      options: [
        { key: "A", text: "Sì – tutte le fonti di reddito documentate possono essere sommate. Totale CHF 4'500 come base di calcolo." },
        { key: "B", text: "Solo se il reddito accessorio è documentato da buste paga degli ultimi 12 mesi ed è considerato duraturo e regolare – allora può essere computato." },
        { key: "C", text: "No – i redditi accessori non sono computabili per legge. Solo il reddito principale conta per il calcolo della solvibilità." },
        { key: "D", text: "Solo la metà – i redditi accessori vengono computati al 50% perché considerati meno stabili del reddito principale." },
      ],
      feedback:
        "Il reddito accessorio può essere computato se: 1) è regolare (non solo occasionale), 2) è documentato da giustificativi (buste paga 12 mesi), 3) è presumibilmente duraturo. Un lavoro occasionale degli ultimi 2 mesi non basterebbe. Un impiego a tempo parziale stabile con prove su almeno 1 anno sì.",
    },
    "3.1": {
      briefing: "Il cliente Marco Ferretti, sposato, 2 figli, desidera un credito di CHF 35'000.",
      question: "Qual è la tua decisione?",
      options: [
        { key: "A", text: "Accordare – reddito sufficientemente elevato" },
        { key: "B", text: "Accordo parziale di CHF 10'000" },
        {
          key: "C",
          text: "Rifiutare – solvibilità non accertata. L'ammortamento di CHF 1'528 supera massicciamente la disponibilità di CHF 487.",
        },
        { key: "D", text: "Respingere – verificare i documenti" },
      ],
      feedback:
        "Nonostante un buon reddito: gli alti costi fissi, gli alimenti e i crediti esistenti erodono la disponibilità. Rifiuto obbligatorio. Verificare attentamente le iscrizioni ZEK!",
    },
    "3.2": {
      briefing:
        "Disponibilità: CHF 800. Nessun credito esistente. Un cliente chiede: «Quanto credito posso ottenere al massimo?»",
      question:
        "Qual è il credito massimo per questo cliente? CHF ___",
      answer: "28800",
      unit: "CHF",
      feedback:
        "Credito massimo = disponibilità × 36 mesi. CHF 800 × 36 = CHF 28'800. Questo è il limite superiore della solvibilità.",
    },
    "3.3": {
      briefing:
        "Un cliente ha una disponibilità di CHF 1'000. Credito esistente CHF 18'000. Desidera CHF 15'000 aggiuntivi.",
      question: "La solvibilità è accertata?",
      options: [
        { key: "A", text: "No – il credito esistente da solo è già sufficiente" },
        {
          key: "B",
          text: "Estinguere prima il credito esistente",
        },
        { key: "C", text: "Accordare solo CHF 10'000" },
        { key: "D", text: "Sì – CHF 917 ≤ CHF 1'000. Solvibilità accertata per l'importo totale di CHF 33'000." },
      ],
      feedback:
        "Ciò che conta sempre è l'importo TOTALE di tutti i crediti diviso per 36. Non ogni credito singolarmente. CHF 33'000 ÷ 36 = CHF 917 ≤ disponibilità CHF 1'000 = solvibilità accertata.",
    },
    "3.4": {
      briefing:
        "Un cliente vuole un credito di CHF 25'000. Disponibilità: CHF 450. Ammortamento: CHF 694/mese → solvibilità non accertata. Il padre (64 anni, reddito netto CHF 7'000, senza debiti) si offre come garante.",
      question: "Cosa comporta la garanzia del padre?",
      options: [
        { key: "A", text: "La garanzia sostituisce integralmente l'esame di solvibilità – se il garante ha un reddito sufficiente, il credito può essere accordato anche se il debitore principale è insolvibile." },
        { key: "B", text: "La garanzia migliora la sicurezza della banca, ma non sopprime l'esame di solvibilità legale. Se il debitore principale è insolvibile, il rifiuto è obbligatorio – indipendentemente dalle garanzie." },
        { key: "C", text: "Il padre può essere integrato come comodebitore. I due redditi vengono sommati e la solvibilità viene ricalcolata – è ammissibile internamente." },
        { key: "D", text: "La garanzia funziona solo per le ipoteche, non per i crediti al consumo. Non è riconosciuta legalmente come garanzia per i crediti al consumo." },
      ],
      feedback:
        "Importante: l'esame di solvibilità secondo la LCC è obbligatorio e non può essere sostituito da alcuna garanzia – nemmeno da una fideiussione. Se il debitore principale è insolvibile (ammortamento > disponibilità), il rifiuto è obbligatorio. Eccezione: se il padre viene integrato come co-richiedente solidale, entrambi i redditi e le spese vengono sommati e viene calcolata una nuova solvibilità.",
    },
    "3.5": {
      briefing:
        "Un cliente, 45 anni, impiegato commerciale, ha perso il lavoro. Vive di indennità di disoccupazione (CHF 3'600/mese netto). Vuole un credito di CHF 10'000 per coprire il periodo di transizione.",
      question: "Cosa vale per i beneficiari dell'AD?",
      options: [
        { key: "A", text: "Accordare – le indennità di disoccupazione sono garantite dallo Stato e altrettanto stabili del salario. La solvibilità viene calcolata normalmente con CHF 3'600." },
        { key: "B", text: "Rifiutare per principio – i beneficiari dell'AD non possono richiedere crediti al consumo secondo la LCC poiché il reddito è considerato non duraturo." },
        { key: "C", text: "Esaminare la solvibilità, ma con la massima cautela: le indennità di disoccupazione sono limitate nel tempo (max. 2 anni). Il rischio di durata del credito supera tipicamente il periodo di percezione dell'AD. Il rifiuto è appropriato nella maggior parte dei casi." },
        { key: "D", text: "Accordare solo CHF 5'000 – in caso di disoccupazione l'importo del credito è automaticamente limitato al 50%." },
      ],
      feedback:
        "Le indennità di disoccupazione possono essere computate come reddito – tecnicamente. Il problema principale: l'AD è limitata nel tempo (max. 520 indennità giornaliere ≈ 2 anni). Un credito di 36 mesi supera massicciamente il periodo di reddito garantito. Nella pratica, un credito viene quasi sempre rifiutato durante la percezione dell'AD o viene concordata una durata molto breve.",
    },
  },
};
