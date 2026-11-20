import type { LangTranslations } from "./utils";

export const TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      title: "Recommander le bon produit",
      situation:
        "M. Weber vient au guichet. Il dit : « Je paie CHF 1'800 de loyer chaque mois. J'oublie parfois – y a-t-il une solution automatique ? »",
      question: "Que conseillez-vous ?",
      options: [
        { key: "A", text: "Mettre en place une carte de crédit – débiter le loyer mensuel sur la carte et le prélever automatiquement par LSV." },
        { key: "B", text: "Mettre en place un ordre permanent – même montant, même bénéficiaire, exécuté automatiquement chaque mois" },
        { key: "C", text: "Mettre en place un LSV – le bailleur émet un ordre LSV et prélève le loyer automatiquement du compte, sans que le client n'ait rien à faire." },
        { key: "D", text: "Activer E-Bill – le bailleur envoie la facture de loyer chaque mois digitalement dans l'e-banking, le client confirme d'un clic." },
      ],
      feedback:
        "L'ordre permanent est idéal pour les paiements récurrents avec le même montant au même bénéficiaire. LSV serait faux – LSV est déclenché par l'émetteur de la facture, pas par le client. E-Bill sert pour les factures digitales, pas pour les paiements fixes récurrents.",
    },
    "1.2": {
      title: "Expliquer E-Bill",
      situation:
        "Une cliente demande : « Je reçois tellement de factures papier. Y a-t-il une solution digitale ? »",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "« Payer via QR-code dans l'e-banking – l'appli lit automatiquement toutes les données du bulletin de versement. C'est aussi sans papier que E-Bill, et vous gardez le contrôle sur chaque montant et date. »" },
        { key: "B", text: "« Les solutions de facturation digitale ne sont disponibles que pour les grandes entreprises. Pour les clients privés, la facture papier reste la seule demande de paiement légalement valable en Suisse. »" },
        { key: "C", text: "« Mettre en place un ordre permanent pour chaque émetteur de facture – le montant est débité à la même date. Si la facture varie, l'ordre permanent vire quand même le même montant convenu. »" },
        { key: "D", text: "« Avec E-Bill, vous recevez vos factures directement dans l'e-banking – déjà pré-saisies. Vous n'avez plus qu'à vérifier et confirmer en quelques clics. Fini le papier. »" },
      ],
      feedback:
        "E-Bill = factures digitales directement dans l'e-banking. L'émetteur envoie la facture électroniquement – la cliente vérifie et paie d'un clic. Pas de bulletin de versement, pas de papier. L'ordre permanent serait faux, car les factures peuvent avoir des montants différents.",
    },
    "1.3": {
      title: "Perte de carte",
      situation: "Un client appelle, agité : « J'ai perdu ma carte Maestro – que dois-je faire ? »",
      question: "Que lui dites-vous ?",
      options: [
        { key: "A", text: "« Pas de panique – appelez immédiatement la hotline de blocage : 0800 80 40 40. La carte est bloquée immédiatement. Ensuite, nous commandons une nouvelle carte. »" },
        { key: "B", text: "« Notez le numéro de carte et les dernières transactions, venez demain matin en agence et déposez un rapport de perte écrit – sans cela, aucune carte de remplacement ne peut être émise. »" },
        { key: "C", text: "« Le risque d'abus est faible si le PIN n'était pas noté sur la carte. Attendez 48 heures – si aucune transaction étrangère n'apparaît d'ici là, vous n'avez pas besoin de faire bloquer la carte. »" },
        { key: "D", text: "« L'essentiel est de changer immédiatement le PIN de la carte et le mot de passe e-banking. Ainsi, aucune transaction par carte n'est plus possible – un blocage par la banque n'est nécessaire que si des débits étrangers apparaissent. »" },
      ],
      feedback:
        "En cas de perte de carte, bloquer immédiatement ! La hotline de blocage 0800 80 40 40 est disponible 24h/24. Une carte bloquée ne peut plus être utilisée abusivement. Venir demain en agence est trop tard – la carte doit être bloquée immédiatement. Ensuite, une carte de remplacement est commandée.",
    },
    "1.4": {
      title: "Expliquer le QR-facture",
      situation:
        "Un nouveau client, 68 ans, vous montre une facture : « Avant j'avais toujours un bulletin de versement orange ou rouge – maintenant il y a juste un code-barre bizarre. C'est quoi ? »",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "« Le QR-code n'est valable que pour le paiement en ligne. Pour les paiements en espèces au bureau de poste, vous avez toujours besoin de l'ancien bulletin de versement – nous pouvons vous l'établir gratuitement. »" },
        { key: "B", text: "« C'est le nouveau QR-facture – il a remplacé l'ancien bulletin de versement depuis 2022. Dans l'e-banking, il suffit de photographier le QR-code : toutes les données de paiement sont lues automatiquement. Plus besoin de tout taper. »" },
        { key: "C", text: "« C'est un élément de sécurité – le code confirme que la facture est authentique. Pour payer, vous devez quand même saisir toutes les données manuellement dans l'e-banking. »" },
        { key: "D", text: "« Les QR-factures sont uniquement pour les entreprises – les clients privés peuvent continuer à utiliser le bulletin de versement classique. Parlez à l'émetteur, qu'il envoie une facture normale. »" },
      ],
      feedback:
        "Depuis octobre 2022, le QR-facture a complètement remplacé les bulletins de versement orange et rouge. Le QR-code contient toutes les données de paiement (IBAN, montant, bénéficiaire, référence). Dans l'e-banking, il suffit de scanner – c'est fait. Au bureau de poste et aux automates bancaires, le QR-code peut également être lu. Plus besoin de saisir manuellement.",
    },
    "1.5": {
      title: "Virement TWINT entre collègues",
      situation:
        "Une cliente, 24 ans, demande : « Ma collègue et moi partageons souvent des factures communes. Y a-t-il une solution plus simple qu'un virement bancaire à chaque fois ? »",
      question: "Que lui conseillez-vous ?",
      options: [
        { key: "A", text: "« Le plus simple est un compte commun – vous pouvez toutes les deux retirer directement, sans virer à chaque fois. »" },
        { key: "B", text: "« Mettre en place un LSV – votre collègue peut alors prélever automatiquement sa part de votre compte. »" },
        { key: "C", text: "« TWINT – l'appli permet des virements instantanés entre particuliers via numéro de téléphone ou QR-code. Pas d'IBAN nécessaire, crédit immédiat. »" },
        { key: "D", text: "« Activer E-Bill – ainsi votre collègue peut envoyer des factures digitales directement dans votre e-banking. »" },
      ],
      feedback:
        "TWINT est idéal pour les paiements entre particuliers : virement instantané par numéro de téléphone, QR-code ou TWINT-ID. Pas d'IBAN nécessaire, l'argent est immédiatement sur le compte. Parfait pour les additions partagées, le loyer entre colocataires, les achats sur places de marché. LSV et E-Bill sont conçus pour les paiements d'entreprises, pas de compte commun nécessaire.",
    },
    "2.1": {
      title: "LSV vs. ordre permanent",
      situation:
        "Un client a une facture de caisse-maladie avec des montants différents chaque mois. Il demande ce qui est mieux – ordre permanent ou LSV ?",
      question: "Que lui conseillez-vous ?",
      options: [
        { key: "A", text: "LSV – la caisse-maladie prélève automatiquement le bon montant, même s'il varie. Protégé par le droit d'opposition." },
        { key: "B", text: "Mettre en place un ordre permanent avec le montant mensuel le plus élevé attendu – si la prime est plus basse, la différence reste sur le compte de la caisse-maladie comme crédit et est déduite de la prochaine facture." },
        { key: "C", text: "Mettre en place les deux en parallèle – l'ordre permanent couvre la partie fixe de la prime, l'ordre LSV égalise les différences variables. Ainsi chaque facture est couverte sans sous-paiement." },
        { key: "D", text: "Payer manuellement – ainsi le client garde le plein contrôle et vérifie la prime actuelle chaque mois avant de payer. C'est plus laborieux, mais c'est la méthode la plus sûre pour des montants variables." },
      ],
      feedback:
        "Le LSV est idéal lorsque le montant varie. L'ordre permanent n'est utile que pour un montant constant – comme les primes de caisse-maladie peuvent varier, le LSV est le bon choix. Le droit d'opposition protège le client contre les prélèvements incorrects.",
    },
    "2.2": {
      title: "Expliquer la sécurité de l'e-banking",
      situation:
        "Un client dit : « J'ai peur de l'e-banking – j'ai entendu dire qu'on peut se faire pirater. Que me conseillez-vous ? »",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "« L'e-banking a le même risque de fraude que les achats en ligne. Pour les virements supérieurs à CHF 5'000, je recommande le guichet – nous validons chaque paiement manuellement et pouvons intervenir immédiatement en cas de soupçon de phishing. »" },
        { key: "B", text: "« L'e-banking est sûr si vous respectez ces règles : ne jamais communiquer votre mot de passe, toujours utiliser l'appli officielle de la banque, signaler immédiatement les e-mails de phishing, mettre à jour régulièrement votre appareil. »" },
        { key: "C", text: "« Changer régulièrement de mot de passe est la mesure de protection la plus importante. La banque envoie automatiquement une confirmation SMS lors de connexions inhabituelles – cela protège également contre les accès étrangers. »" },
        { key: "D", text: "« Notre banque garantit le remboursement en cas de dommages dus à des piratages, tant que vous utilisez l'e-banking via notre portail officiel. Les pertes dues au phishing sont assurées et remboursées dans les 5 jours ouvrables. »" },
      ],
      feedback:
        "L'e-banking est sûr avec un comportement approprié. Les règles les plus importantes : ne jamais communiquer le mot de passe, utiliser uniquement l'appli/site officiel, reconnaître le phishing, maintenir l'appareil à jour. Important : la banque ne demande JAMAIS le mot de passe par e-mail ou téléphone ! La réponse A est fausse – l'e-banking est plus sûr et moins cher que le guichet.",
    },
    "2.3": {
      title: "Virement à l'étranger Europe",
      situation:
        "Un client veut virer CHF 2'000 à un ami en Allemagne. De quoi a-t-il besoin ?",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "« Dans l'UE, SEPA Instant s'applique : un simple numéro de compte suffit, l'IBAN et le BIC sont automatiquement complétés par le système de compensation. Le montant est transmis en temps réel. »" },
        { key: "B", text: "« L'IBAN seul ne suffit pas pour l'Allemagne – le BIC est obligatoire en supplément, car les paiements entre la Suisse et l'UE passent exclusivement par SWIFT. SEPA ne s'applique qu'au sein de la zone euro. »" },
        { key: "C", text: "« Pour les paiements vers l'Allemagne, nous avons impérativement besoin de l'IBAN et du BIC, car l'Allemagne n'a pas signé d'accord SEPA avec la Suisse. Le bénéficiaire doit communiquer le code BIC à 8 ou 11 chiffres. »" },
        { key: "D", text: "« L'Allemagne est dans la zone SEPA. L'IBAN du bénéficiaire suffit – pas de BIC nécessaire. Frais moins élevés que SWIFT. Virement généralement en 1 à 2 jours. »" },
      ],
      feedback:
        "L'Allemagne est dans la zone SEPA – au sein de SEPA, l'IBAN seul suffit, pas de BIC requis. Frais moins élevés que SWIFT. Important : la Suisse n'est pas un pays UE, mais elle est membre SEPA – les clients suisses peuvent donc envoyer des paiements SEPA vers l'UE.",
    },
    "2.4": {
      title: "Carte de débit vs. carte de crédit en voyage",
      situation:
        "Un client prévoit un voyage de trois semaines en Thaïlande. Il demande : « Vaut-il mieux prendre la carte de débit ou la carte de crédit ? »",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "« La carte de débit est mieux – elle débite directement du compte, vous gardez ainsi le plein contrôle. À l'étranger, les frais sont les mêmes qu'avec la carte de crédit. »" },
        { key: "B", text: "« La carte de crédit est recommandée pour les voyages à l'étranger : réservations d'hôtels, location de voiture et réserve d'urgence. Beaucoup de pays n'acceptent pas la carte de débit. Prendre aussi la carte de débit comme backup pour les retraits. Attention aux frais de change dans les deux cas. »" },
        { key: "C", text: "« Laisser les deux cartes à la maison – à l'étranger, l'argent liquide est plus sûr. Changer des CHF à l'aéroport et convertir en monnaie locale est moins cher que tout paiement par carte. »" },
        { key: "D", text: "« La carte de crédit uniquement si vous pouvez rembourser le montant total en fin de mois – sinon des intérêts élevés s'accumulent. La carte de débit est acceptée partout en Thaïlande et sans risque d'endettement. »" },
      ],
      feedback:
        "La carte de crédit est souvent indispensable lors des voyages à l'étranger : hôtels, locations de voiture et réservations en ligne exigent souvent une carte de crédit (la carte de débit n'est souvent pas acceptée). Points importants : 1) Assurance voyage incluse dans certaines cartes de crédit. 2) Frais de change dans les deux cas (env. 1,5–2,5 % par transaction). 3) Les retraits avec la carte de crédit sont chers (frais cash advance). Recommander la carte de débit comme backup.",
    },
    "2.5": {
      title: "Paiement sans contact – sécurité",
      situation:
        "Une cliente demande avec inquiétude : « J'ai lu qu'avec un appareil spécial on peut voler de l'argent sur ma carte sans que je le remarque – c'est vrai ? »",
      question: "Que lui répondez-vous ?",
      options: [
        { key: "A", text: "« C'est malheureusement vrai – les cartes NFC sont un risque de sécurité. Je recommande de désactiver la fonction NFC et de payer uniquement avec le PIN. »" },
        { key: "B", text: "« Le skimming NFC est théoriquement possible mais extrêmement improbable en pratique. La carte devrait être approchée à quelques centimètres, le montant est limité à CHF 80 sans PIN, et la banque surveille activement toutes les transactions. »" },
        { key: "C", text: "« Le risque est réel – achetez de préférence une protection RFID. Ainsi, tout débit sans contact à votre insu est techniquement impossible. »" },
        { key: "D", text: "« Le paiement sans contact est totalement sûr – les transactions NFC ne peuvent techniquement pas être interceptées. L'appareil devrait être posé directement sur la carte, ce qui se remarquerait immédiatement. »" },
      ],
      feedback:
        "Le skimming NFC n'est pas un risque réel en pratique : 1) L'appareil doit être à <4 cm de la carte, 2) Limite sans PIN : CHF 80 (après plusieurs transactions NFC consécutives, le PIN est automatiquement demandé), 3) Les banques surveillent les transactions pour détecter les anomalies. Le message principal : NFC est sûr, la limite protège, les vrais cas de vol NFC en Suisse sont extrêmement rares.",
    },
    "3.1": {
      title: "SEPA vs. SWIFT",
      situation:
        "Un client veut effectuer des virements – Cas A : CHF 5'000 en France. Cas B : CHF 5'000 au Japon. Il demande la différence.",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "« France = zone SEPA = seul l'IBAN est nécessaire, pas de BIC, frais moins élevés. Japon = SWIFT = hors UE/EEE, IBAN et BIC obligatoires, frais plus élevés – surtout en devises étrangères. »" },
        { key: "B", text: "« Pas de différence essentielle – les deux pays sont traités via le réseau SWIFT international. La France est membre UE, mais SEPA ne s'applique pas aux banques suisses, car la Suisse n'est pas membre UE. »" },
        { key: "C", text: "« Les paiements vers le Japon passent par le système ISO 20022, qui unifie SEPA et SWIFT. Le Japon et l'UE ont un accord bilatéral de paiement – l'IBAN suffit, pas de BIC nécessaire. »" },
        { key: "D", text: "« Les deux pays nécessitent impérativement l'IBAN et le BIC – la France a signé le traité SEPA seulement en 2019, raison pour laquelle les anciens comptes nécessitent encore le code BIC. »" },
      ],
      feedback:
        "SEPA s'applique aux pays UE/EEE – au sein de SEPA, l'IBAN suffit, pas de BIC nécessaire. SWIFT s'applique partout dans le monde hors UE/EEE – IBAN et BIC obligatoires, frais plus élevés. Important : la Suisse n'est pas un pays UE mais elle est membre SEPA ! La France est UE/SEPA, le Japon est SWIFT.",
    },
    "3.2": {
      title: "Reconnaître le phishing",
      situation:
        "Un client vous montre un e-mail : « Cher client, votre compte va être bloqué. Cliquez ici et entrez votre mot de passe. Cordialement, Votre banque »",
      question: "Que dites-vous au client ?",
      options: [
        { key: "A", text: "« Ça a l'air sérieux – cliquer sur le lien en toute sécurité »" },
        { key: "B", text: "« C'est du phishing ! Ne jamais cliquer sur de tels liens ni entrer le mot de passe. Les banques ne demandent JAMAIS le mot de passe par e-mail. Supprimer immédiatement l'e-mail et nous informer. »" },
        { key: "C", text: "« Changer rapidement le mot de passe dans l'e-banking après avoir cliqué »" },
        { key: "D", text: "« Cliquer sur le lien uniquement si vous êtes sûr »" },
      ],
      feedback:
        "Phishing classique ! Caractéristiques : urgence (« va être bloqué »), demande de mot de passe, lien dans l'e-mail. Les banques ne demandent JAMAIS le mot de passe ou les données de connexion par e-mail. Toujours supprimer immédiatement ces e-mails. Signaler l'e-mail de phishing à l'équipe de sécurité de la banque. Ne jamais cliquer sur le lien, ne jamais entrer le mot de passe !",
    },
    "3.3": {
      title: "Cas complexe – quatre demandes",
      situation:
        "Un client vient avec quatre demandes : 1. Loyer CHF 2'200 mensuellement automatique. 2. Caisse-maladie avec montant variable. 3. Factures sans papier. 4. Virer de l'argent au Japon.",
      question: "Quels produits conseillez-vous pour chaque point ?",
      options: [
        { key: "A", text: "1. Ordre permanent  2. Ordre permanent avec montant variable  3. E-Bill  4. SEPA – le Japon a adhéré à l'accord SEPA, donc l'IBAN suffit sans BIC." },
        { key: "B", text: "1. LSV  2. LSV  3. Ordre permanent  4. SWIFT avec IBAN uniquement – le Japon accepte en tant que pays G7 les normes de paiement européennes sans BIC." },
        { key: "C", text: "1. E-Bill  2. Ordre permanent  3. LSV  4. SEPA avec IBAN – le BIC n'est plus nécessaire en Europe depuis 2016, le standard SEPA s'applique aussi au Japon." },
        { key: "D", text: "1. Ordre permanent  2. LSV  3. Activer E-Bill  4. SWIFT – hors UE/EEE, IBAN et BIC obligatoires, frais plus élevés en JPY" },
      ],
      feedback:
        "Chaque produit a sa raison d'être : 1. Ordre permanent = même montant, même bénéficiaire. 2. LSV = montant variable – la caisse-maladie prélève elle-même. 3. E-Bill = factures sans papier directement dans l'e-banking. 4. Le Japon est hors UE/EEE → SWIFT obligatoire, IBAN + BIC nécessaires, frais plus élevés que SEPA. Rappel : Suisse = membre SEPA, mais pas pays UE !",
    },
    "3.4": {
      title: "Date de valeur vs. date de comptabilisation",
      situation:
        "Une cliente est énervée : « J'ai viré CHF 3'000 vendredi – sur le relevé, la date de comptabilisation est vendredi, mais l'argent n'est arrivé chez le bénéficiaire que mardi. Qu'est-ce qui ne va pas ? »",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "« C'est une erreur de notre banque – un virement national doit arriver le même jour ouvrable. Vous pouvez déposer une réclamation formelle et exiger des intérêts de retard. »" },
        { key: "B", text: "« La date de comptabilisation et la date de valeur sont deux choses différentes : la date de comptabilisation indique quand votre banque a enregistré le paiement. La date de valeur est le moment où l'argent est disponible avec effet d'intérêt chez le bénéficiaire. Les virements effectués vendredi soir après la clôture journalière passent généralement par le clearing le prochain jour ouvrable (lundi). »" },
        { key: "C", text: "« La réception tardive chez le bénéficiaire est due au fait que la banque du bénéficiaire a retenu l'argent en interne. C'est un problème connu chez certaines banques. »" },
        { key: "D", text: "« Les virements nationaux passent toujours le même jour – le bénéficiaire a l'argent au plus tard 4 heures après l'ordre. Si c'était mardi, l'ordre doit avoir été reçu seulement lundi. »" },
      ],
      feedback:
        "Distinction importante : date de comptabilisation = quand le paiement est enregistré dans votre système. Date de valeur = quand l'argent est disponible avec effet d'intérêt chez le bénéficiaire. Virements nationaux : les ordres passés avant la clôture journalière (généralement 16h30) sont traités le jour même. Vendredi soir = prochain clearing lundi → crédit chez le bénéficiaire lundi ou mardi. Ce n'est pas une erreur, c'est la pratique standard de valeur.",
    },
    "3.5": {
      title: "Opposition LSV après prélèvement non autorisé",
      situation:
        "Un client est agité : « Mon fitness club a prélevé CHF 480 de mon compte via LSV – j'ai pourtant résilié l'abonnement il y a 3 mois ! Que puis-je faire ? »",
      question: "Que lui expliquez-vous et que faites-vous ?",
      options: [
        { key: "A", text: "« Malheureusement, les prélèvements LSV ne peuvent plus être annulés après 30 jours. Vous devez réclamer l'argent directement auprès du fitness club. »" },
        { key: "B", text: "« Vous pouvez faire opposition dans les 30 jours à compter de la date de comptabilisation. Nous effectuons le remboursement. Je vous recommande également de bloquer l'ordre LSV pour cet émetteur, afin qu'aucun nouveau prélèvement ne soit effectué. »" },
        { key: "C", text: "« Un remboursement n'est possible que si le fitness club y consent. Nous ne pouvons pas réclamer l'argent unilatéralement – ce ne serait pas légalement fondé. »" },
        { key: "D", text: "« Avec LSV, vous n'avez pas de droit d'opposition – c'est la différence avec un virement normal. Vous devez réclamer le montant par voie judiciaire. »" },
      ],
      feedback:
        "Droit d'opposition LSV : le client peut faire opposition dans les 30 jours à compter de la date de comptabilisation – la banque rembourse le montant sans que l'émetteur ne doive donner son accord. Après ce délai, seule la voie directe auprès de l'émetteur est possible. Important : bloquer immédiatement l'ordre LSV pour cet émetteur ! La banque peut exclure certains émetteurs du mandat LSV pour éviter de nouveaux prélèvements non autorisés.",
    },
  },
  it: {
    "1.1": {
      title: "Raccomandare il prodotto giusto",
      situation:
        "Il sig. Weber viene allo sportello. Dice: «Pago CHF 1'800 di affitto ogni mese. A volte dimentico – c'è una soluzione automatica?»",
      question: "Cosa consiglia?",
      options: [
        { key: "A", text: "Attivare una carta di credito – addebitare l'importo mensile dell'affitto sulla carta e farlo prelevare automaticamente tramite LSV." },
        { key: "B", text: "Attivare un ordine permanente – stesso importo, stesso beneficiario, eseguito automaticamente ogni mese" },
        { key: "C", text: "Attivare un LSV – il locatore emette un ordine LSV e preleva l'affitto automaticamente dal conto, senza che il cliente debba fare nulla." },
        { key: "D", text: "Attivare E-Bill – il locatore invia la fattura dell'affitto ogni mese digitalmente nell'e-banking, il cliente conferma con un clic." },
      ],
      feedback:
        "L'ordine permanente è ideale per i pagamenti ricorrenti con lo stesso importo allo stesso beneficiario. L'LSV sarebbe sbagliato – l'LSV è attivato dall'emittente della fattura, non dal cliente. E-Bill serve per le fatture digitali, non per i pagamenti fissi ricorrenti.",
    },
    "1.2": {
      title: "Spiegare E-Bill",
      situation:
        "Una cliente chiede: «Ricevo così tante fatture cartacee. C'è una soluzione digitale?»",
      question: "Cosa le spiega?",
      options: [
        { key: "A", text: "«Pagare tramite QR-code nell'e-banking – l'app legge automaticamente tutti i dati dalla polizza di versamento. È altrettanto senza carta come E-Bill, e mantiene il pieno controllo su ogni importo e data.»" },
        { key: "B", text: "«Le soluzioni di fatturazione digitale sono disponibili solo per le grandi imprese. Per i clienti privati, la fattura cartacea rimane l'unica richiesta di pagamento legalmente valida in Svizzera.»" },
        { key: "C", text: "«Attivare un ordine permanente per ogni emittente di fattura – l'importo viene addebitato alla stessa data. Se la fattura varia, l'ordine permanente bonificherà comunque lo stesso importo concordato.»" },
        { key: "D", text: "«Con E-Bill riceve le fatture direttamente nell'e-banking – già pre-inserite. Deve solo verificare e confermare con pochi clic. Niente più carta.»" },
      ],
      feedback:
        "E-Bill = fatture digitali direttamente nell'e-banking. L'emittente invia la fattura elettronicamente – la cliente verifica e paga con un clic. Nessuna polizza di versamento, nessuna carta. L'ordine permanente sarebbe sbagliato, perché le fatture possono avere importi diversi.",
    },
    "1.3": {
      title: "Smarrimento carta",
      situation: "Un cliente chiama agitato: «Ho perso la mia carta Maestro – cosa devo fare?»",
      question: "Cosa gli dice?",
      options: [
        { key: "A", text: "«Niente panico – chiami immediatamente la hotline di blocco: 0800 80 40 40. La carta viene bloccata immediatamente. Poi ordiniamo una nuova carta.»" },
        { key: "B", text: "«Annoti il numero della carta e le ultime transazioni, venga domani mattina in filiale e presenti una denuncia di smarrimento scritta – senza di essa non può essere emessa nessuna carta sostitutiva.»" },
        { key: "C", text: "«Il rischio di abuso è basso se il PIN non era annotato sulla carta. Aspetti 48 ore – solo se nel frattempo appaiono transazioni estranee, dovrà far bloccare la carta.»" },
        { key: "D", text: "«La cosa più importante è cambiare immediatamente il PIN della carta e la password dell'e-banking. Così non sono più possibili transazioni con la carta – un blocco da parte della banca è necessario solo se appaiono addebiti estranei.»" },
      ],
      feedback:
        "In caso di smarrimento della carta, bloccarla immediatamente! La hotline di blocco 0800 80 40 40 è disponibile 24 ore su 24. Una carta bloccata non può più essere utilizzata abusivamente. Venire domani in filiale è troppo tardi – la carta deve essere bloccata immediatamente. Poi viene ordinata una carta sostitutiva.",
    },
    "1.4": {
      title: "Spiegare la QR-fattura",
      situation:
        "Un nuovo cliente, 68 anni, le mostra una fattura: «Prima avevo sempre una polizza di versamento arancione o rossa – adesso c'è solo uno strano codice a barre. Cos'è?»",
      question: "Cosa gli spiega?",
      options: [
        { key: "A", text: "«Il QR-code vale solo per il pagamento online. Per i pagamenti in contanti all'ufficio postale ha ancora bisogno della vecchia polizza di versamento – possiamo compilarla gratuitamente per lei.»" },
        { key: "B", text: "«È la nuova QR-fattura – ha sostituito la vecchia polizza di versamento dal 2022. Nell'e-banking basta fotografare il QR-code: tutti i dati di pagamento vengono letti automaticamente. Nessuna digitazione manuale.»" },
        { key: "C", text: "«È una caratteristica di sicurezza – il codice conferma che la fattura è autentica. Per pagare deve comunque inserire tutti i dati manualmente nell'e-banking.»" },
        { key: "D", text: "«Le QR-fatture sono solo per le aziende – i clienti privati possono continuare a usare la polizza di versamento classica. Contatti l'emittente, che invii una fattura normale.»" },
      ],
      feedback:
        "Da ottobre 2022 la QR-fattura ha completamente sostituito le polizze di versamento arancioni e rosse. Il QR-code contiene tutti i dati di pagamento (IBAN, importo, beneficiario, riferimento). Nell'e-banking basta scansionare – fatto. Agli uffici postali e agli sportelli automatici delle banche il QR-code può essere letto allo stesso modo. Nessuna digitazione manuale necessaria.",
    },
    "1.5": {
      title: "Bonifico TWINT tra colleghe",
      situation:
        "Una cliente, 24 anni, chiede: «La mia collega e io dividiamo spesso fatture comuni. C'è una soluzione più semplice di un bonifico bancario ogni volta?»",
      question: "Cosa consiglia?",
      options: [
        { key: "A", text: "«Il più semplice è un conto comune – entrambe possono prelevare direttamente, senza dover bonificare ogni volta.»" },
        { key: "B", text: "«Attivare un LSV – la sua collega può poi prelevare automaticamente la sua parte dal suo conto.»" },
        { key: "C", text: "«TWINT – l'app consente bonifici istantanei tra privati tramite numero di telefono o QR-code. Nessun IBAN necessario, accredito immediato.»" },
        { key: "D", text: "«Attivare E-Bill – così la sua collega può inviare fatture digitali direttamente nel suo e-banking.»" },
      ],
      feedback:
        "TWINT è ideale per i pagamenti tra privati: bonifico istantaneo tramite numero di telefono, QR-code o TWINT-ID. Nessun IBAN necessario, il denaro è immediatamente sul conto. Perfetto per il conto diviso al ristorante, l'affitto tra coinquilini, gli acquisti su piattaforme. LSV ed E-Bill sono pensati per i pagamenti aziendali, nessun conto comune necessario.",
    },
    "2.1": {
      title: "LSV vs. ordine permanente",
      situation:
        "Un cliente ha una fattura della cassa malati con importi diversi ogni mese. Chiede cosa è meglio – ordine permanente o LSV?",
      question: "Cosa consiglia?",
      options: [
        { key: "A", text: "LSV – la cassa malati preleva automaticamente l'importo corretto, anche se varia. Protetto dal diritto di opposizione." },
        { key: "B", text: "Attivare un ordine permanente con l'importo mensile più elevato previsto – se il premio è più basso, la differenza rimane sul conto della cassa malati come credito e viene detratta dalla fattura successiva." },
        { key: "C", text: "Attivare entrambi in parallelo – l'ordine permanente copre la parte fissa del premio, l'ordine LSV pareggia le differenze variabili. Così ogni fattura è coperta senza pagamento insufficiente." },
        { key: "D", text: "Pagare manualmente – così il cliente mantiene il pieno controllo e controlla il premio attuale ogni mese prima di pagare. È più laborioso, ma è il metodo più sicuro per importi variabili." },
      ],
      feedback:
        "L'LSV è ideale quando l'importo varia. L'ordine permanente è utile solo con un importo costante – poiché i premi della cassa malati possono variare, l'LSV è la scelta giusta. Il diritto di opposizione protegge il cliente da addebiti errati.",
    },
    "2.2": {
      title: "Spiegare la sicurezza dell'e-banking",
      situation:
        "Un cliente dice: «Ho paura dell'e-banking – ho sentito che si può essere hackerati. Cosa mi consiglia?»",
      question: "Cosa gli spiega?",
      options: [
        { key: "A", text: "«L'e-banking ha lo stesso rischio di frode degli acquisti online. Per i bonifici superiori a CHF 5'000 consiglio lo sportello – lì validiamo ogni pagamento manualmente e possiamo intervenire immediatamente in caso di sospetto phishing.»" },
        { key: "B", text: "«L'e-banking è sicuro se rispetta queste regole: non comunicare mai la password, usare sempre l'app ufficiale della banca, segnalare immediatamente le e-mail di phishing, aggiornare regolarmente il dispositivo.»" },
        { key: "C", text: "«Cambiare regolarmente la password è la misura di protezione più importante. La banca invia automaticamente una conferma SMS in caso di accessi insoliti – questo protegge anche dagli accessi estranei.»" },
        { key: "D", text: "«La nostra banca garantisce il rimborso in caso di danni dovuti ad attacchi hacker, purché utilizzi l'e-banking tramite il nostro portale ufficiale. Le perdite dovute al phishing sono assicurate e rimborsate entro 5 giorni lavorativi.»" },
      ],
      feedback:
        "L'e-banking è sicuro con un comportamento corretto. Le regole più importanti: non comunicare mai la password, usare solo l'app/sito ufficiale, riconoscere il phishing, mantenere aggiornato il dispositivo. Importante: la banca non chiede MAI la password per e-mail o telefono! La risposta A è sbagliata – l'e-banking è più sicuro e meno costoso dello sportello.",
    },
    "2.3": {
      title: "Bonifico estero Europa",
      situation:
        "Un cliente vuole bonificare CHF 2'000 a un amico in Germania. Di cosa ha bisogno?",
      question: "Cosa gli spiega?",
      options: [
        { key: "A", text: "«Nell'UE vale SEPA Instant: basta un semplice numero di conto, l'IBAN e il BIC vengono aggiunti automaticamente dal sistema di compensazione. L'importo viene trasmesso in tempo reale.»" },
        { key: "B", text: "«L'IBAN da solo non basta per la Germania – il BIC è obbligatorio in aggiunta, perché i pagamenti tra Svizzera e UE transitano esclusivamente via SWIFT. SEPA vale solo all'interno della zona euro.»" },
        { key: "C", text: "«Per i pagamenti verso la Germania abbiamo bisogno di IBAN e BIC, perché la Germania non ha firmato un accordo SEPA con la Svizzera. Il beneficiario deve comunicare il codice BIC a 8 o 11 cifre.»" },
        { key: "D", text: "«La Germania è nella zona SEPA. Basta l'IBAN del beneficiario – nessun BIC necessario. Commissioni più basse che con SWIFT. Bonifico solitamente in 1-2 giorni.»" },
      ],
      feedback:
        "La Germania è nella zona SEPA – all'interno di SEPA basta l'IBAN, nessun BIC richiesto. Commissioni più basse che con SWIFT. Importante: la Svizzera non è un paese UE, ma è membro SEPA – i clienti svizzeri possono quindi inviare pagamenti SEPA verso l'UE.",
    },
    "2.4": {
      title: "Carta di debito vs. carta di credito in viaggio",
      situation:
        "Un cliente pianifica un viaggio di tre settimane in Tailandia. Chiede: «È meglio portare la carta di debito o la carta di credito?»",
      question: "Cosa gli spiega?",
      options: [
        { key: "A", text: "«La carta di debito è meglio – addebita direttamente dal conto, così mantiene il pieno controllo. All'estero le commissioni sono le stesse della carta di credito.»" },
        { key: "B", text: "«La carta di credito è consigliata per i viaggi all'estero: prenotazioni di hotel, noleggio auto e riserva di emergenza. Molti paesi non accettano la carta di debito. Portare anche la carta di debito come backup per i prelievi. Attenzione alle commissioni di cambio in entrambi i casi.»" },
        { key: "C", text: "«Lasciare entrambe le carte a casa – all'estero il contante è più sicuro. Cambiare CHF all'aeroporto e convertire in valuta locale è più conveniente di qualsiasi pagamento con carta.»" },
        { key: "D", text: "«La carta di credito solo se può saldare l'intero importo a fine mese – altrimenti si accumulano alti interessi. La carta di debito è accettata ovunque in Tailandia e senza rischio di debiti.»" },
      ],
      feedback:
        "La carta di credito è spesso indispensabile nei viaggi all'estero: hotel, noleggio auto e prenotazioni online richiedono spesso una carta di credito (la carta di debito spesso non è accettata). Punti importanti: 1) Assicurazione viaggio inclusa in alcune carte di credito. 2) Commissioni di cambio in entrambi i casi (circa 1,5-2,5% per transazione). 3) I prelievi con la carta di credito sono costosi (commissione cash advance). Consigliare la carta di debito come backup.",
    },
    "2.5": {
      title: "Pagamento contactless – sicurezza",
      situation:
        "Una cliente chiede preoccupata: «Ho letto che con un dispositivo speciale si può rubare denaro dalla mia carta senza che me ne accorga – è vero?»",
      question: "Cosa le risponde?",
      options: [
        { key: "A", text: "«Purtroppo è vero – le carte NFC sono un rischio per la sicurezza. Consiglio di disattivare la funzione NFC e di pagare solo con il PIN.»" },
        { key: "B", text: "«Lo skimming NFC è teoricamente possibile ma nella pratica estremamente improbabile. La carta dovrebbe essere avvicinata a pochi centimetri, l'importo è limitato a CHF 80 senza PIN, e la banca monitora attivamente tutte le transazioni.»" },
        { key: "C", text: "«Il rischio è reale – acquisti preferibilmente una protezione RFID. Così ogni addebito contactless a sua insaputa è tecnicamente impossibile.»" },
        { key: "D", text: "«Il pagamento contactless è completamente sicuro – le transazioni NFC non possono tecnicamente essere intercettate. Il dispositivo dovrebbe essere posato direttamente sulla carta, il che si noterebbe immediatamente.»" },
      ],
      feedback:
        "Lo skimming NFC non è un rischio reale nella pratica: 1) Il dispositivo deve essere a <4 cm dalla carta, 2) Limite senza PIN: CHF 80 (dopo diverse transazioni NFC consecutive, viene automaticamente richiesto il PIN), 3) Le banche monitorano le transazioni per individuare anomalie. Il messaggio principale: NFC è sicuro, il limite protegge, i veri casi di furto NFC in Svizzera sono estremamente rari.",
    },
    "3.1": {
      title: "SEPA vs. SWIFT",
      situation:
        "Un cliente vuole effettuare bonifici – Caso A: CHF 5'000 in Francia. Caso B: CHF 5'000 in Giappone. Chiede la differenza.",
      question: "Cosa gli spiega?",
      options: [
        { key: "A", text: "«Francia = zona SEPA = solo IBAN necessario, nessun BIC, commissioni più basse. Giappone = SWIFT = fuori UE/SEE, IBAN e BIC obbligatori, commissioni più alte – soprattutto in valute estere.»" },
        { key: "B", text: "«Nessuna differenza essenziale – entrambi i paesi vengono elaborati tramite la rete SWIFT internazionale. La Francia è membro UE, ma SEPA non si applica alle banche svizzere, perché la Svizzera non è membro UE.»" },
        { key: "C", text: "«I pagamenti verso il Giappone transitano tramite il sistema ISO 20022, che unifica SEPA e SWIFT. Giappone e UE hanno un accordo di pagamento bilaterale – basta l'IBAN, nessun BIC necessario.»" },
        { key: "D", text: "«Entrambi i paesi richiedono obbligatoriamente IBAN e BIC – la Francia ha firmato il trattato SEPA solo nel 2019, motivo per cui per i vecchi conti è ancora richiesto il codice BIC.»" },
      ],
      feedback:
        "SEPA si applica ai paesi UE/SEE – all'interno di SEPA basta l'IBAN, nessun BIC necessario. SWIFT si applica a livello mondiale al di fuori di UE/SEE – IBAN e BIC obbligatori, commissioni più alte. Importante: la Svizzera non è un paese UE ma è membro SEPA! La Francia è UE/SEPA, il Giappone è SWIFT.",
    },
    "3.2": {
      title: "Riconoscere il phishing",
      situation:
        "Un cliente le mostra un'e-mail: «Gentile cliente, il suo conto verrà bloccato. Clicchi qui e inserisca la sua password. Cordiali saluti, La sua banca»",
      question: "Cosa dice al cliente?",
      options: [
        { key: "A", text: "«Sembra serio – cliccare sul link tranquillamente»" },
        { key: "B", text: "«È phishing! Non cliccare mai su tali link né inserire la password. Le banche non chiedono MAI la password via e-mail. Eliminare immediatamente l'e-mail e informarci.»" },
        { key: "C", text: "«Cambiare rapidamente la password nell'e-banking dopo aver cliccato»" },
        { key: "D", text: "«Cliccare sul link solo se si è sicuri»" },
      ],
      feedback:
        "Phishing classico! Caratteristiche: urgenza («verrà bloccato»), richiesta di password, link nell'e-mail. Le banche non chiedono MAI la password o i dati di accesso via e-mail. Eliminare sempre immediatamente tali e-mail. Segnalare l'e-mail di phishing al team di sicurezza della banca. Non cliccare mai sul link, non inserire mai la password!",
    },
    "3.3": {
      title: "Caso complesso – quattro richieste",
      situation:
        "Un cliente viene con quattro richieste: 1. Affitto CHF 2'200 mensile automatico. 2. Cassa malati con importo variabile. 3. Fatture senza carta. 4. Bonifico in Giappone.",
      question: "Quali prodotti consiglia per ogni punto?",
      options: [
        { key: "A", text: "1. Ordine permanente  2. Ordine permanente con importo variabile  3. E-Bill  4. SEPA – il Giappone ha aderito all'accordo SEPA, quindi basta l'IBAN senza BIC." },
        { key: "B", text: "1. LSV  2. LSV  3. Ordine permanente  4. SWIFT con solo IBAN – il Giappone accetta in quanto paese G7 gli standard di pagamento europei senza BIC." },
        { key: "C", text: "1. E-Bill  2. Ordine permanente  3. LSV  4. SEPA con IBAN – il BIC non è più necessario in Europa dal 2016, lo standard SEPA si applica anche al Giappone." },
        { key: "D", text: "1. Ordine permanente  2. LSV  3. Attivare E-Bill  4. SWIFT – fuori UE/SEE, IBAN e BIC obbligatori, commissioni più alte in JPY" },
      ],
      feedback:
        "Ogni prodotto ha il suo scopo: 1. Ordine permanente = stesso importo, stesso beneficiario. 2. LSV = importo variabile – la cassa malati preleva da sola. 3. E-Bill = fatture senza carta direttamente nell'e-banking. 4. Il Giappone è fuori da UE/SEE → SWIFT obbligatorio, IBAN + BIC necessari, commissioni più alte che SEPA. Ricordare: Svizzera = membro SEPA, ma non paese UE!",
    },
    "3.4": {
      title: "Data valuta vs. data di contabilizzazione",
      situation:
        "Una cliente è arrabbiata: «Ho bonificato CHF 3'000 venerdì – sull'estratto conto la data di contabilizzazione è venerdì, ma il denaro è arrivato dal beneficiario solo martedì. Cosa c'è che non va?»",
      question: "Cosa le spiega?",
      options: [
        { key: "A", text: "«È un errore della nostra banca – un bonifico nazionale deve arrivare lo stesso giorno lavorativo. Può presentare un reclamo formale ed esigere interessi di mora.»" },
        { key: "B", text: "«La data di contabilizzazione e la data valuta sono due cose diverse: la data di contabilizzazione indica quando la sua banca ha registrato il pagamento. La data valuta è il momento in cui il denaro è disponibile con effetto di interessi presso il beneficiario. I bonifici effettuati venerdì sera dopo la chiusura giornaliera transitano generalmente per il clearing il successivo giorno lavorativo (lunedì).»" },
        { key: "C", text: "«Il ritardo nell'accredito al beneficiario è dovuto al fatto che la banca del beneficiario ha trattenuto il denaro internamente. È un problema noto con alcune banche.»" },
        { key: "D", text: "«I bonifici nazionali transitano sempre lo stesso giorno – il beneficiario ha il denaro al più tardi 4 ore dopo l'ordine. Se era martedì, l'ordine deve essere stato ricevuto solo lunedì.»" },
      ],
      feedback:
        "Distinzione importante: data di contabilizzazione = quando il pagamento viene registrato nel sistema. Data valuta = quando il denaro è disponibile con effetto di interessi presso il beneficiario. Bonifici nazionali: gli ordini effettuati prima della chiusura giornaliera (solitamente 16:30) vengono elaborati lo stesso giorno. Venerdì sera = prossimo clearing lunedì → accredito al beneficiario lunedì o martedì. Non è un errore, è la pratica standard della data valuta.",
    },
    "3.5": {
      title: "Opposizione LSV dopo addebito non autorizzato",
      situation:
        "Un cliente è agitato: «Il mio centro fitness ha prelevato CHF 480 dal mio conto tramite LSV – ho disdetto l'abbonamento 3 mesi fa! Cosa posso fare?»",
      question: "Cosa gli spiega e cosa avvia?",
      options: [
        { key: "A", text: "«Purtroppo gli addebiti LSV non possono più essere annullati dopo 30 giorni. Deve reclamare il denaro direttamente al centro fitness.»" },
        { key: "B", text: "«Può fare opposizione entro 30 giorni dalla data di contabilizzazione. Avviamo il rimborso. Consiglio anche di bloccare l'ordine LSV per questo emittente, in modo che non vengano effettuati ulteriori addebiti.»" },
        { key: "C", text: "«Un rimborso è possibile solo se il centro fitness dà il suo consenso. Non possiamo reclamare il denaro unilateralmente – non sarebbe legalmente fondato.»" },
        { key: "D", text: "«Con l'LSV non ha diritto di opposizione – questa è la differenza rispetto a un normale bonifico. Deve reclamare l'importo per vie legali.»" },
      ],
      feedback:
        "Diritto di opposizione LSV: il cliente può fare opposizione entro 30 giorni dalla data di contabilizzazione – la banca rimborsa l'importo senza che l'emittente debba dare il suo consenso. Dopo tale termine, è possibile solo la via diretta presso l'emittente. Importante: bloccare immediatamente l'ordine LSV per questo emittente! La banca può escludere singoli emittenti dal mandato LSV per evitare ulteriori addebiti non autorizzati.",
    },
  },
};
