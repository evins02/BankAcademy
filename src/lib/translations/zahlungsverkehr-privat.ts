import type { LangTranslations } from "./utils";

export const ZV_PRIVAT_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      title: "Recommander le bon produit",
      situation:
        "M. Weber vient au guichet. Il dit : 'Je paye CHF 1'800 de loyer chaque mois. Je l'oublie parfois – y a-t-il une solution automatique ?'",
      question: "Que recommandes-tu ?",
      options: [
        { key: "A", text: "Configurer une carte de crédit – débiter le loyer mensuel sur la carte et l'encaisser automatiquement par prélèvement." },
        { key: "B", text: "Mettre en place un ordre permanent – même montant, même bénéficiaire, exécuté automatiquement chaque mois" },
        { key: "C", text: "Mettre en place un LSV – le bailleur émet un ordre LSV et prélève automatiquement le loyer depuis le compte, sans que le client n'ait à faire quoi que ce soit." },
        { key: "D", text: "Activer E-Bill – le bailleur envoie la facture de loyer mensuelle directement dans l'e-banking, le client confirme d'un clic." },
      ],
      feedback:
        "L'ordre permanent est idéal pour les paiements récurrents avec le même montant au même bénéficiaire. Le LSV serait incorrect – le LSV est déclenché par le créancier, pas par le client. L'E-Bill sert pour les factures numériques, pas pour les paiements fixes récurrents.",
    },
    "1.2": {
      title: "Expliquer E-Bill",
      situation: "Une cliente demande : 'Je reçois tellement de factures papier. Y a-t-il une solution numérique ?'",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "\"Payer par QR-code dans l'e-banking – l'appli lit automatiquement toutes les données du bulletin de versement. C'est aussi sans papier que E-Bill, et vous gardez le plein contrôle sur chaque montant et date.\"" },
        { key: "B", text: "\"Les solutions de facturation numérique ne sont disponibles chez nous que pour les grandes entreprises. Pour les clients privés, la facture papier reste le seul document de paiement légalement valable en Suisse.\"" },
        { key: "C", text: "\"Mettre en place un ordre permanent pour chaque créancier – le montant est débité à la même date. Si la facture varie, l'ordre permanent transfère quand même le même montant convenu.\"" },
        { key: "D", text: "\"Avec E-Bill, vous recevez vos factures directement dans l'e-banking – déjà saisies. Il vous suffit de vérifier et de confirmer en quelques clics. Plus de papier.\"" },
      ],
      feedback:
        "E-Bill = factures numériques directement dans l'e-banking. Le créancier envoie la facture électroniquement – la cliente vérifie et paye d'un clic. Pas de bulletin de versement, pas de papier. L'ordre permanent serait incorrect, car les factures peuvent avoir des montants différents.",
    },
    "1.3": {
      title: "Perte de carte",
      situation: "Un client appelle, agité : 'J'ai perdu ma carte Maestro – que dois-je faire ?'",
      question: "Que lui dis-tu ?",
      options: [
        { key: "A", text: "\"Pas de panique – appelez immédiatement la hotline de blocage : 0800 80 40 40. La carte sera immédiatement bloquée. Ensuite, nous commanderons une nouvelle carte.\"" },
        { key: "B", text: "\"Notez le numéro de carte et les dernières transactions, venez demain matin à l'agence et déposez un rapport de perte écrit – sans cela, aucune carte de remplacement ne peut être émise.\"" },
        { key: "C", text: "\"Le risque d'abus est faible si le PIN n'était pas noté sur la carte. Attendez 48 heures – seulement si des transactions étrangères apparaissent d'ici là, vous devez faire bloquer la carte.\"" },
        { key: "D", text: "\"Le plus important est de changer immédiatement le PIN de la carte et le mot de passe de l'e-banking. Ainsi, plus aucune transaction par carte n'est possible – un blocage par la banque n'est nécessaire que si des transactions étrangères apparaissent.\"" },
      ],
      feedback:
        "En cas de perte de carte, bloquez-la immédiatement ! La hotline de blocage 0800 80 40 40 est joignable 24h/24, 7j/7. Une carte bloquée ne peut plus être utilisée abusivement. Venir à l'agence demain est trop tard – la carte doit être bloquée immédiatement. Ensuite, une carte de remplacement est demandée.",
    },
    "1.4": {
      title: "Expliquer la facture QR",
      situation:
        "Un nouveau client, 68 ans, vous montre une facture : «Avant, j'avais toujours un bulletin de versement orange ou rouge – maintenant il y a juste un étrange code-barres. Qu'est-ce que c'est ?»",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "«Le QR-code est uniquement pour le paiement en ligne. Pour les paiements en espèces à la poste, vous avez toujours besoin de l'ancien bulletin de versement – vous pouvez le faire remplir gratuitement chez nous.»" },
        { key: "B", text: "«C'est la nouvelle facture QR – elle a remplacé l'ancien bulletin de versement depuis 2022. Dans l'e-banking, il suffit de photographier le QR-code : toutes les données de paiement sont lues automatiquement. Plus besoin de saisir manuellement.»" },
        { key: "C", text: "«C'est un élément de sécurité – le code confirme que la facture est authentique. Pour payer, vous devez quand même saisir manuellement toutes les données dans l'e-banking.»" },
        { key: "D", text: "«Les factures QR sont uniquement pour les entreprises – les clients privés peuvent continuer à utiliser le bulletin de versement classique. Contactez l'émetteur pour qu'il envoie une facture normale.»" },
      ],
      feedback:
        "Depuis octobre 2022, la facture QR a complètement remplacé le bulletin de versement orange et rouge. Le QR-code contient toutes les données de paiement (IBAN, montant, bénéficiaire, référence). Dans l'e-banking, il suffit de scanner – c'est fait. Au guichet postal et aux automates bancaires, le QR-code peut également être lu. Plus besoin de saisie manuelle.",
    },
    "1.5": {
      title: "Virement TWINT entre amis",
      situation:
        "Une cliente, 24 ans, demande : «Ma collègue et moi partageons souvent des factures communes. Y a-t-il une solution plus simple que de faire à chaque fois un virement bancaire ?»",
      question: "Que recommandes-tu ?",
      options: [
        { key: "A", text: "«Le plus simple est un compte commun – vous pouvez toutes les deux retirer directement, sans avoir à virer à chaque fois.»" },
        { key: "B", text: "«Mettre en place un LSV – votre collègue peut alors automatiquement encaisser votre part de votre compte.»" },
        { key: "C", text: "«TWINT – l'appli permet des virements instantanés entre particuliers via numéro de téléphone ou QR-code. Pas d'IBAN nécessaire, crédit immédiat.»" },
        { key: "D", text: "«Activer E-Bill – ainsi votre collègue peut envoyer des factures numériques directement à votre e-banking.»" },
      ],
      feedback:
        "TWINT est idéal pour les paiements entre particuliers : virement instantané par numéro de téléphone, QR-code ou TWINT-ID. Pas d'IBAN nécessaire, argent immédiatement sur le compte. Parfait pour les additions de restaurant partagées, le loyer entre colocataires, les achats sur le marché. LSV et E-Bill sont conçus pour les paiements d'entreprises, pas de compte commun nécessaire.",
    },
    "2.1": {
      title: "LSV vs. ordre permanent",
      situation:
        "Un client a des primes d'assurance-maladie avec des montants différents chaque mois. Il demande ce qui est mieux – un ordre permanent ou un LSV ?",
      question: "Que recommandes-tu ?",
      options: [
        { key: "A", text: "LSV – la caisse-maladie prélève automatiquement le bon montant, même s'il varie. Protégé par un droit d'opposition." },
        { key: "B", text: "Mettre en place un ordre permanent avec le montant mensuel le plus élevé attendu – si la prime est plus basse, la différence reste sur le compte de la caisse-maladie en tant que crédit et est déduite de la prochaine facture." },
        { key: "C", text: "Mettre en place les deux en parallèle – l'ordre permanent couvre la part fixe de la prime, l'ordre LSV compense les différences variables. Ainsi, chaque facture est couverte sans sous-paiement." },
        { key: "D", text: "Payer manuellement – ainsi le client garde le contrôle total et vérifie chaque mois la prime actuelle avant de payer. C'est plus laborieux, mais c'est la méthode la plus sûre pour les montants variables." },
      ],
      feedback:
        "Le LSV est idéal lorsque le montant varie. L'ordre permanent n'a de sens qu'avec un montant fixe – comme les primes de caisse-maladie peuvent varier, le LSV est le bon choix. Le droit d'opposition protège le client contre les prélèvements incorrects.",
    },
    "2.2": {
      title: "Expliquer la sécurité de l'e-banking",
      situation:
        "Un client dit : 'J'ai peur de l'e-banking – j'ai entendu qu'on peut se faire pirater. Que me conseillez-vous ?'",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "\"L'e-banking a le même risque de fraude que le shopping en ligne. Pour les virements supérieurs à CHF 5'000, je recommande le guichet – nous validons chaque paiement manuellement et pouvons intervenir immédiatement en cas de soupçon de phishing.\"" },
        { key: "B", text: "\"L'e-banking est sûr si vous respectez ces règles : ne jamais communiquer votre mot de passe, toujours utiliser l'appli officielle de la banque, signaler immédiatement les e-mails de phishing, mettre régulièrement à jour votre appareil.\"" },
        { key: "C", text: "\"Changer régulièrement le mot de passe est la mesure de protection la plus importante. La banque envoie automatiquement une confirmation par SMS en cas de connexion inhabituelle – cela protège en plus contre les accès non autorisés.\"" },
        { key: "D", text: "\"Notre banque garantit le remboursement en cas de dommages causés par des piratages, tant que vous utilisez l'e-banking via notre portail officiel. Les pertes dues au phishing sont assurées et remboursées dans les 5 jours ouvrables.\"" },
      ],
      feedback:
        "L'e-banking est sûr avec un comportement approprié. Les règles les plus importantes : ne jamais communiquer le mot de passe, utiliser uniquement l'appli/site officiel, reconnaître le phishing, maintenir l'appareil à jour. Important : La banque ne demande JAMAIS le mot de passe par e-mail ou téléphone ! La réponse A est incorrecte – l'e-banking est plus sûr et moins cher que le guichet.",
    },
    "2.3": {
      title: "Virement international en Europe",
      situation:
        "Un client veut envoyer CHF 2'000 à un ami en Allemagne. De quoi a-t-il besoin ?",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "\"Dans l'UE, SEPA Instant s'applique : un simple numéro de compte suffit, l'IBAN et le BIC sont automatiquement complétés par le système de compensation. Le montant est transmis en temps réel.\"" },
        { key: "B", text: "\"L'IBAN seul ne suffit pas pour l'Allemagne – le BIC est obligatoire en plus, car les paiements entre la Suisse et l'UE passent exclusivement par SWIFT. SEPA ne s'applique qu'au sein de la zone euro.\"" },
        { key: "C", text: "\"Pour les paiements vers l'Allemagne, nous avons besoin de l'IBAN et du BIC, car l'Allemagne n'a pas signé d'accord SEPA avec la Suisse. Le bénéficiaire doit communiquer le code BIC à 8 ou 11 chiffres.\"" },
        { key: "D", text: "\"L'Allemagne se trouve dans la zone SEPA. L'IBAN du bénéficiaire suffit – pas de BIC nécessaire. Frais moins élevés que SWIFT. Paiement généralement en 1–2 jours.\"" },
      ],
      feedback:
        "L'Allemagne est dans la zone SEPA – au sein de SEPA, l'IBAN seul suffit, pas de BIC requis. Frais moins élevés que SWIFT. Important : La Suisse n'est pas un pays de l'UE mais membre SEPA – les clients suisses peuvent donc effectuer des paiements SEPA vers l'UE.",
    },
    "2.4": {
      title: "Carte de débit vs. carte de crédit en voyage",
      situation:
        "Un client prévoit un voyage de trois semaines en Thaïlande. Il demande : «Vaut-il mieux emporter la carte de débit ou la carte de crédit ?»",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "«La carte de débit est préférable – elle débite directement du compte, vous gardez ainsi le plein contrôle. Les frais à l'étranger sont les mêmes qu'avec la carte de crédit.»" },
        { key: "B", text: "«La carte de crédit est recommandée pour les voyages à l'étranger : hôtels, locations de voiture et réserve d'urgence. Beaucoup de pays n'acceptent pas la carte de débit. Emporter la carte de débit en complément pour les retraits d'espèces. Tenir compte des frais de change pour les deux.»" },
        { key: "C", text: "«Laisser les deux cartes à la maison – à l'étranger, les espèces sont plus sûres. Changer des CHF à l'aéroport et convertir en monnaie locale est moins cher que tout paiement par carte.»" },
        { key: "D", text: "«Carte de crédit uniquement si vous pouvez régler la totalité du montant en fin de mois – sinon des intérêts élevés s'accumulent. La carte de débit est acceptée mondialement en Thaïlande et sans risque d'endettement.»" },
      ],
      feedback:
        "La carte de crédit est souvent indispensable lors des voyages à l'étranger : les hôtels, locations de voiture et réservations en ligne exigent fréquemment une carte de crédit (la carte de débit n'est souvent pas acceptée). Notes importantes : 1) Assurance voyage incluse dans certaines cartes de crédit. 2) Frais de change pour les deux cartes (env. 1,5–2,5 % par transaction). 3) Les retraits d'espèces avec une carte de crédit sont chers (frais cash advance). Recommander la carte de débit en complément.",
    },
    "2.5": {
      title: "Paiement sans contact – Sécurité",
      situation:
        "Une cliente demande, inquiète : «J'ai lu qu'on peut voler de l'argent de ma carte avec un appareil spécial sans que je m'en aperçoive – est-ce vrai ?»",
      question: "Que lui dis-tu ?",
      options: [
        { key: "A", text: "«C'est malheureusement exact – les cartes NFC représentent un risque de sécurité. Je vous recommande de faire désactiver la fonction NFC et de payer uniquement par PIN.»" },
        { key: "B", text: "«Le skimming NFC est théoriquement possible mais extrêmement improbable en pratique. La carte devrait être approchée à quelques centimètres, le montant est limité à CHF 80 sans PIN, et la banque surveille activement toutes les transactions.»" },
        { key: "C", text: "«Le risque est réel – achetez de préférence une housse de protection RFID. Ainsi, tout débit sans contact à votre insu est techniquement impossible.»" },
        { key: "D", text: "«Le paiement sans contact est totalement sûr – les transactions NFC ne peuvent techniquement pas être interceptées. L'appareil devrait être posé directement sur la carte, ce qui se remarquerait immédiatement.»" },
      ],
      feedback:
        "Le skimming NFC n'est pas un risque réel en pratique : 1) L'appareil doit être à <4 cm de la carte, 2) Limite sans PIN : CHF 80 (après plusieurs transactions NFC consécutives, le PIN est automatiquement demandé), 3) Les banques surveillent les transactions pour détecter les anomalies. Le message principal : le NFC est sûr, la limite protège, les vrais cas de vol NFC en Suisse sont extrêmement rares.",
    },
    "3.1": {
      title: "SEPA vs. SWIFT",
      situation:
        "Un client veut envoyer de l'argent – Cas A : CHF 5'000 en France. Cas B : CHF 5'000 au Japon. Il demande la différence.",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "\"France = zone SEPA = seul l'IBAN est nécessaire, pas de BIC, frais moins élevés. Japon = SWIFT = hors UE/EEE, IBAN et BIC obligatoires, frais plus élevés – surtout pour les devises étrangères.\"" },
        { key: "B", text: "\"Pas de différence significative – les deux pays sont traités via le réseau SWIFT international. La France est membre de l'UE, mais SEPA ne s'applique pas aux banques suisses, car la Suisse n'est pas membre de l'UE.\"" },
        { key: "C", text: "\"Les paiements vers le Japon passent par le système ISO 20022, qui unifie SEPA et SWIFT. Le Japon et l'UE ont un accord bilatéral de paiement – l'IBAN suffit, pas de BIC nécessaire.\"" },
        { key: "D", text: "\"Les deux pays nécessitent obligatoirement l'IBAN et le BIC – la France a signé le contrat SEPA en 2019 seulement, c'est pourquoi le code BIC est encore nécessaire pour les anciens comptes.\"" },
      ],
      feedback:
        "SEPA s'applique aux pays UE/EEE – au sein de SEPA, l'IBAN seul suffit, pas de BIC nécessaire. SWIFT s'applique partout dans le monde en dehors de l'UE/EEE – IBAN et BIC obligatoires, frais plus élevés. Important : La Suisse n'est pas un pays de l'UE mais membre SEPA ! La France est UE/SEPA, le Japon est SWIFT.",
    },
    "3.2": {
      title: "Reconnaître le phishing",
      situation:
        "Un client vous montre un e-mail : 'Cher client, votre compte va être bloqué. Cliquez ici et entrez votre mot de passe. Cordialement, Votre banque'",
      question: "Que dis-tu au client ?",
      options: [
        { key: "A", text: "\"Ça semble sérieux – cliquer sur le lien en toute sécurité\"" },
        { key: "B", text: "\"C'est du phishing ! Ne jamais cliquer sur de tels liens ni entrer son mot de passe. Les banques ne demandent JAMAIS le mot de passe par e-mail. Supprimer immédiatement l'e-mail et nous informer.\"" },
        { key: "C", text: "\"Changer rapidement le mot de passe dans l'e-banking après le clic\"" },
        { key: "D", text: "\"Ne cliquer sur le lien que si vous êtes sûr\"" },
      ],
      feedback:
        "Phishing classique ! Caractéristiques : urgence ('va être bloqué'), demande de mot de passe, lien dans l'e-mail. Les banques ne demandent JAMAIS le mot de passe ou les données de connexion par e-mail. Toujours supprimer immédiatement ces e-mails. Signaler l'e-mail de phishing à l'équipe de sécurité de la banque. Ne pas cliquer sur le lien, ne pas entrer le mot de passe !",
    },
    "3.3": {
      title: "Cas complexe – quatre demandes",
      situation:
        "Un client arrive avec quatre demandes : 1. Loyer CHF 2'200 mensuellement automatiquement. 2. Caisse-maladie avec montant variable. 3. Factures sans papier. 4. Envoyer de l'argent au Japon.",
      question: "Quels produits recommandez-vous pour chaque point ?",
      options: [
        { key: "A", text: "1. Ordre permanent  2. Ordre permanent avec montant variable  3. E-Bill  4. SEPA – le Japon a adhéré à l'accord SEPA, l'IBAN suffit donc sans BIC." },
        { key: "B", text: "1. LSV  2. LSV  3. Ordre permanent  4. SWIFT avec IBAN uniquement – le Japon accepte en tant que pays du G7 les standards de paiement européens sans BIC." },
        { key: "C", text: "1. E-Bill  2. Ordre permanent  3. LSV  4. SEPA avec IBAN – le BIC n'est plus nécessaire en Europe depuis 2016, le standard SEPA s'applique aussi au Japon." },
        { key: "D", text: "1. Ordre permanent  2. LSV  3. Activer E-Bill  4. SWIFT – hors UE/EEE, IBAN et BIC obligatoires, frais plus élevés pour JPY" },
      ],
      feedback:
        "Chaque produit a son utilité : 1. Ordre permanent = même montant, même bénéficiaire. 2. LSV = montant variable – la caisse-maladie prélève elle-même. 3. E-Bill = factures sans papier directement dans l'e-banking. 4. Le Japon est en dehors de l'UE/EEE → SWIFT obligatoire, IBAN + BIC nécessaires, frais plus élevés que SEPA. À retenir : La Suisse = membre SEPA, mais pas pays de l'UE !",
    },
    "3.4": {
      title: "Date de valeur vs. date de comptabilisation",
      situation:
        "Une cliente est mécontente : «J'ai effectué un virement de CHF 3'000 vendredi – sur le relevé, la date de comptabilisation est vendredi, mais l'argent n'est arrivé chez le bénéficiaire que mardi. Que se passe-t-il ?»",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "«C'est une erreur de notre banque – un virement national doit arriver le même jour ouvrable. Vous pouvez déposer une réclamation formelle et exiger des intérêts de retard.»" },
        { key: "B", text: "«La date de comptabilisation et la date de valeur sont deux choses différentes : la date de comptabilisation indique quand votre banque a enregistré le paiement. La date de valeur est le moment à partir duquel l'argent est disponible chez le bénéficiaire en termes d'intérêts. Les virements effectués le vendredi soir après la clôture journalière passent généralement par le clearing le prochain jour ouvrable (lundi).»" },
        { key: "C", text: "«La banque du bénéficiaire a retenu l'argent en interne. C'est un problème connu dans certaines banques.»" },
        { key: "D", text: "«Les virements nationaux passent toujours le même jour – le bénéficiaire reçoit l'argent au plus tard 4 heures après l'ordre. Si c'était mardi, l'ordre a dû être reçu lundi.»" },
      ],
      feedback:
        "Distinction importante : Date de comptabilisation = quand le paiement est enregistré dans le système. Date de valeur = quand l'argent est disponible chez le bénéficiaire en termes d'intérêts. Virements nationaux : les ordres jusqu'à la clôture journalière (généralement 16h30) sont traités le même jour. Vendredi soir = prochain clearing lundi → crédit chez le bénéficiaire lundi ou mardi. Ce n'est pas une erreur, c'est la pratique standard de la date de valeur.",
    },
    "3.5": {
      title: "Opposition LSV après prélèvement non autorisé",
      situation:
        "Un client est agité : «Ma salle de sport a prélevé CHF 480 de mon compte via LSV – j'ai pourtant résilié l'abonnement il y a 3 mois ! Que puis-je faire ?»",
      question: "Que lui expliques-tu et que mets-tu en place ?",
      options: [
        { key: "A", text: "«Malheureusement, les prélèvements LSV ne peuvent plus être annulés après plus de 30 jours. Vous devez réclamer l'argent directement auprès de la salle de sport.»" },
        { key: "B", text: "«Vous pouvez faire opposition dans les 30 jours suivant la date de comptabilisation. Nous déclenchons le remboursement. En même temps, je vous recommande de bloquer l'ordre LSV pour ce créancier, afin qu'aucun autre prélèvement ne soit effectué.»" },
        { key: "C", text: "«Un remboursement n'est possible qu'avec l'accord de la salle de sport. Nous ne pouvons pas réclamer l'argent unilatéralement – ce ne serait pas légalement fondé.»" },
        { key: "D", text: "«Avec le LSV, vous n'avez pas de droit d'opposition – c'est la différence avec un virement normal. Vous devez réclamer le montant par voie judiciaire.»" },
      ],
      feedback:
        "Droit d'opposition LSV : Le client peut faire opposition dans les 30 jours suivant la date de comptabilisation – la banque rembourse le montant sans que le créancier n'ait à donner son accord. Après ce délai, seul le recours direct auprès du créancier est possible. Important : bloquer immédiatement l'ordre LSV pour ce créancier ! La banque peut exclure des créanciers individuels du mandat LSV, afin qu'aucun autre prélèvement non autorisé ne suive.",
    },
  },
  it: {
    "1.1": {
      title: "Raccomandare il prodotto giusto",
      situation:
        "Il sig. Weber viene allo sportello. Dice: 'Pago CHF 1'800 di affitto ogni mese. A volte lo dimentico – c'è una soluzione automatica?'",
      question: "Cosa consigli?",
      options: [
        { key: "A", text: "Configurare una carta di credito – addebitare l'importo mensile dell'affitto sulla carta e riscuoterlo automaticamente tramite addebito diretto." },
        { key: "B", text: "Impostare un ordine permanente – stesso importo, stesso destinatario, eseguito automaticamente ogni mese" },
        { key: "C", text: "Impostare un LSV – il locatore emette un ordine LSV e riscuote automaticamente l'affitto dal conto, senza che il cliente debba fare nulla." },
        { key: "D", text: "Attivare E-Bill – il locatore invia la fattura dell'affitto mensile direttamente nell'e-banking, il cliente conferma con un clic." },
      ],
      feedback:
        "L'ordine permanente è ideale per i pagamenti ricorrenti con lo stesso importo allo stesso destinatario. LSV sarebbe sbagliato – l'LSV viene avviato dal creditore, non dal cliente. E-Bill è per le fatture digitali, non per i pagamenti fissi ricorrenti.",
    },
    "1.2": {
      title: "Spiegare E-Bill",
      situation: "Una cliente chiede: 'Ricevo così tante fatture cartacee. Esiste una soluzione digitale?'",
      question: "Cosa le spieghi?",
      options: [
        { key: "A", text: "\"Pagare con il codice QR nell'e-banking – l'app legge automaticamente tutti i dati dalla polizza di versamento. È altrettanto senza carta come E-Bill, e mantieni il pieno controllo su ogni importo e data.\"" },
        { key: "B", text: "\"Le soluzioni di fatturazione digitale sono disponibili da noi solo per i grandi clienti. Per i clienti privati, la fattura cartacea rimane l'unico invito al pagamento legalmente valido in Svizzera.\"" },
        { key: "C", text: "\"Impostare un ordine permanente per ogni creditore – l'importo viene addebitato alla stessa data. Se la fattura varia, l'ordine permanente trasferisce comunque lo stesso importo concordato.\"" },
        { key: "D", text: "\"Con E-Bill ricevi le fatture direttamente nell'e-banking – già preregistrate. Devi solo verificare e confermare con pochi clic. Niente più carta.\"" },
      ],
      feedback:
        "E-Bill = fatture digitali direttamente nell'e-banking. Il creditore invia la fattura elettronicamente – la cliente verifica e paga con un clic. Nessuna polizza di versamento, nessuna carta. L'ordine permanente sarebbe sbagliato, poiché le fatture possono avere importi diversi.",
    },
    "1.3": {
      title: "Smarrimento carta",
      situation: "Un cliente chiama agitato: 'Ho perso la mia carta Maestro – cosa devo fare?'",
      question: "Cosa gli dici?",
      options: [
        { key: "A", text: "\"Niente panico – chiama immediatamente la hotline di blocco: 0800 80 40 40. La carta verrà bloccata immediatamente. Poi ordineremo una nuova carta.\"" },
        { key: "B", text: "\"Prendi nota del numero della carta e delle ultime transazioni, vieni domattina in filiale e presenta un rapporto di smarrimento scritto – senza di esso non può essere emessa una carta sostitutiva.\"" },
        { key: "C", text: "\"Il rischio di abuso è basso se il PIN non era annotato sulla carta. Aspetta 48 ore – solo se nel frattempo appaiono transazioni estranee, devi far bloccare la carta.\"" },
        { key: "D", text: "\"La cosa più importante è cambiare immediatamente il PIN della carta e la password dell'e-banking. Così non sono più possibili transazioni con carta – un blocco da parte della banca è necessario solo se appaiono transazioni estranee.\"" },
      ],
      feedback:
        "In caso di smarrimento della carta, falla bloccare immediatamente! La hotline di blocco 0800 80 40 40 è raggiungibile 24 ore su 24, 7 giorni su 7. Una carta bloccata non può più essere utilizzata in modo fraudolento. Venire in filiale domani è troppo tardi – la carta deve essere bloccata immediatamente. Poi viene richiesta una carta sostitutiva.",
    },
    "1.4": {
      title: "Spiegare la fattura QR",
      situation:
        "Un nuovo cliente, 68 anni, ti mostra una fattura: «Prima avevo sempre una polizza di versamento arancione o rossa – ora c'è solo uno strano codice a barre. Cos'è?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«Il codice QR è solo per il pagamento online. Per i pagamenti in contanti all'ufficio postale hai ancora bisogno della vecchia polizza di versamento – puoi farla compilare gratuitamente da noi.»" },
        { key: "B", text: "«È la nuova fattura QR – ha sostituito la vecchia polizza di versamento dal 2022. Nell'e-banking basta fotografare il codice QR: tutti i dati di pagamento vengono letti automaticamente. Niente più inserimento manuale.»" },
        { key: "C", text: "«È un elemento di sicurezza – il codice conferma che la fattura è autentica. Per pagare, devi comunque inserire manualmente tutti i dati nell'e-banking.»" },
        { key: "D", text: "«Le fatture QR sono solo per le aziende – i clienti privati possono continuare a usare la classica polizza di versamento. Contatta l'emittente affinché invii una fattura normale.»" },
      ],
      feedback:
        "Da ottobre 2022, la fattura QR ha completamente sostituito la polizza di versamento arancione e rossa. Il codice QR contiene tutti i dati di pagamento (IBAN, importo, destinatario, riferimento). Nell'e-banking basta scannerizzare – fatto. All'ufficio postale e agli sportelli bancari automatici il codice QR può essere letto. Non è più necessario l'inserimento manuale.",
    },
    "1.5": {
      title: "Bonifico TWINT tra amici",
      situation:
        "Una cliente, 24 anni, chiede: «La mia collega e io dividiamo spesso le spese comuni. C'è una soluzione più semplice che fare ogni volta un bonifico bancario?»",
      question: "Cosa consigli?",
      options: [
        { key: "A", text: "«La cosa più semplice è un conto comune – entrambe potete prelevare direttamente, senza dover fare bonifici ogni volta.»" },
        { key: "B", text: "«Impostare un LSV – la tua collega può poi addebitare automaticamente la tua quota dal tuo conto.»" },
        { key: "C", text: "«TWINT – l'app consente bonifici istantanei tra privati tramite numero di telefono o codice QR. Nessun IBAN necessario, accredito immediato.»" },
        { key: "D", text: "«Attivare E-Bill – così la tua collega può inviare fatture digitali direttamente al tuo e-banking.»" },
      ],
      feedback:
        "TWINT è ideale per i pagamenti tra privati: bonifico istantaneo tramite numero di telefono, codice QR o TWINT-ID. Nessun IBAN necessario, denaro immediatamente sul conto. Perfetto per le spese del ristorante divise, l'affitto tra coinquilini, gli acquisti al mercato. LSV ed E-Bill sono pensati per i pagamenti aziendali, non è necessario un conto comune.",
    },
    "2.1": {
      title: "LSV vs. ordine permanente",
      situation:
        "Un cliente ha premi di cassa malati con importi diversi ogni mese. Chiede cosa è meglio – un ordine permanente o un LSV?",
      question: "Cosa consigli?",
      options: [
        { key: "A", text: "LSV – la cassa malati addebita automaticamente l'importo corretto, anche se varia. Protetto dal diritto di opposizione." },
        { key: "B", text: "Impostare un ordine permanente con l'importo mensile più alto previsto – se il premio è inferiore, la differenza rimane sul conto della cassa malati come credito e viene detratta dalla fattura successiva." },
        { key: "C", text: "Impostare entrambi in parallelo – l'ordine permanente copre la parte fissa del premio, l'ordine LSV compensa le differenze variabili. Così ogni fattura è coperta senza pagamento insufficiente." },
        { key: "D", text: "Pagare manualmente – così il cliente mantiene il pieno controllo e verifica ogni mese il premio attuale prima di pagare. È più laborioso, ma è il metodo più sicuro per gli importi variabili." },
      ],
      feedback:
        "LSV è ideale quando l'importo varia. L'ordine permanente ha senso solo con importi fissi – poiché i premi della cassa malati possono variare, LSV è la scelta giusta. Il diritto di opposizione protegge il cliente da addebiti errati.",
    },
    "2.2": {
      title: "Spiegare la sicurezza dell'e-banking",
      situation:
        "Un cliente dice: 'Ho paura dell'e-banking – ho sentito che si può essere violati informaticamente. Cosa mi consiglia?'",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "\"L'e-banking ha lo stesso rischio di frode dello shopping online. Per i bonifici superiori a CHF 5'000 consiglio lo sportello – lì convalidiamo ogni pagamento manualmente e possiamo intervenire immediatamente in caso di sospetto phishing.\"" },
        { key: "B", text: "\"L'e-banking è sicuro se segui queste regole: non comunicare mai la password, usare sempre l'app ufficiale della banca, segnalare immediatamente le e-mail di phishing, aggiornare regolarmente il dispositivo.\"" },
        { key: "C", text: "\"Cambiare regolarmente la password è la misura di protezione più importante. La banca invia automaticamente una conferma via SMS in caso di accessi insoliti – questo protegge ulteriormente contro gli accessi non autorizzati.\"" },
        { key: "D", text: "\"La nostra banca garantisce il rimborso in caso di danni causati da attacchi informatici, purché utilizzi l'e-banking tramite il nostro portale ufficiale. Le perdite causate dal phishing sono assicurate e rimborsate entro 5 giorni lavorativi.\"" },
      ],
      feedback:
        "L'e-banking è sicuro con un comportamento corretto. Le regole più importanti: non comunicare mai la password, usare solo l'app/sito ufficiale, riconoscere il phishing, mantenere il dispositivo aggiornato. Importante: La banca NON chiede MAI la password via e-mail o telefono! La risposta A è sbagliata – l'e-banking è più sicuro e meno costoso dello sportello.",
    },
    "2.3": {
      title: "Pagamento internazionale in Europa",
      situation:
        "Un cliente vuole trasferire CHF 2'000 a un amico in Germania. Di cosa ha bisogno?",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "\"Nell'UE vale SEPA Instant: basta un semplice numero di conto, IBAN e BIC vengono automaticamente completati dal sistema di compensazione. L'importo viene trasmesso in tempo reale.\"" },
        { key: "B", text: "\"Solo l'IBAN non è sufficiente per la Germania – il BIC è obbligatoriamente necessario, perché i pagamenti tra Svizzera e UE passano esclusivamente tramite SWIFT. SEPA si applica solo all'interno della zona euro.\"" },
        { key: "C", text: "\"Per i pagamenti verso la Germania abbiamo bisogno di IBAN e BIC, perché la Germania non ha firmato un accordo SEPA con la Svizzera. Il destinatario deve comunicare il codice BIC a 8 o 11 cifre.\"" },
        { key: "D", text: "\"La Germania si trova nella zona SEPA. Basta l'IBAN del destinatario – nessun BIC necessario. Commissioni inferiori rispetto a SWIFT. Pagamento di solito in 1–2 giorni.\"" },
      ],
      feedback:
        "La Germania si trova nella zona SEPA – all'interno di SEPA basta l'IBAN, nessun BIC richiesto. Commissioni inferiori rispetto a SWIFT. Importante: La Svizzera non è un paese UE ma membro SEPA – quindi i clienti svizzeri possono inviare pagamenti SEPA all'UE.",
    },
    "2.4": {
      title: "Carta di debito vs. carta di credito in viaggio",
      situation:
        "Un cliente pianifica un viaggio di tre settimane in Thailandia. Chiede: «È meglio portare la carta di debito o la carta di credito?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«La carta di debito è migliore – addebita direttamente dal conto, così mantieni il pieno controllo. Le commissioni all'estero sono le stesse della carta di credito.»" },
        { key: "B", text: "«La carta di credito è consigliata per i viaggi all'estero: hotel, noleggio auto e riserva di emergenza. Molti paesi non accettano la carta di debito. Portare la carta di debito come riserva per i prelievi di contanti. Considerare le commissioni su valuta estera per entrambe.»" },
        { key: "C", text: "«Lasciare entrambe le carte a casa – all'estero i contanti sono più sicuri. Cambiare CHF all'aeroporto e convertire in valuta locale è più economico di qualsiasi pagamento con carta.»" },
        { key: "D", text: "«Carta di credito solo se puoi saldare l'intero importo a fine mese – altrimenti si accumulano interessi elevati. La carta di debito è accettata in tutto il mondo in Thailandia e senza rischio di indebitamento.»" },
      ],
      feedback:
        "La carta di credito è spesso indispensabile nei viaggi all'estero: hotel, noleggio auto e prenotazioni online richiedono frequentemente una carta di credito (la carta di debito spesso non viene accettata). Note importanti: 1) Assicurazione viaggi inclusa in alcune carte di credito. 2) Commissioni su valuta estera per entrambe le carte (circa 1,5–2,5% per transazione). 3) I prelievi di contanti con carta di credito sono costosi (commissione cash advance). Consigliare la carta di debito come riserva.",
    },
    "2.5": {
      title: "Pagamento contactless – Sicurezza",
      situation:
        "Una cliente chiede preoccupata: «Ho letto che con un dispositivo speciale si può rubare denaro dalla mia carta senza che me ne accorga – è vero?»",
      question: "Cosa le dici?",
      options: [
        { key: "A", text: "«Purtroppo è vero – le carte NFC rappresentano un rischio per la sicurezza. Consiglio di disattivare la funzione NFC e di pagare solo con PIN.»" },
        { key: "B", text: "«Lo skimming NFC è teoricamente possibile ma nella pratica estremamente improbabile. La carta dovrebbe essere avvicinata a pochi centimetri, l'importo è limitato a CHF 80 senza PIN, e la banca monitora attivamente tutte le transazioni.»" },
        { key: "C", text: "«Il rischio è reale – acquisti preferibilmente una custodia di protezione RFID. Così ogni addebito contactless a tua insaputa è tecnicamente impossibile.»" },
        { key: "D", text: "«Il pagamento contactless è completamente sicuro – le transazioni NFC non possono tecnicamente essere intercettate. Il dispositivo dovrebbe essere posato direttamente sulla carta, il che si noterebbe immediatamente.»" },
      ],
      feedback:
        "Lo skimming NFC nella pratica non è un rischio reale: 1) Il dispositivo deve essere a <4 cm dalla carta, 2) Limite senza PIN: CHF 80 (dopo diverse transazioni NFC consecutive, il PIN viene automaticamente richiesto), 3) Le banche monitorano le transazioni per individuare anomalie. Il messaggio principale: l'NFC è sicuro, il limite protegge, i veri casi di furto NFC in Svizzera sono estremamente rari.",
    },
    "3.1": {
      title: "SEPA vs. SWIFT",
      situation:
        "Un cliente vuole trasferire denaro – Caso A: CHF 5'000 in Francia. Caso B: CHF 5'000 in Giappone. Chiede la differenza.",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "\"Francia = zona SEPA = solo IBAN necessario, nessun BIC, commissioni inferiori. Giappone = SWIFT = fuori UE/SEE, IBAN e BIC obbligatori, commissioni più alte – soprattutto per le valute estere.\"" },
        { key: "B", text: "\"Nessuna differenza significativa – entrambi i paesi vengono gestiti tramite la rete SWIFT internazionale. La Francia è membro UE, ma SEPA non si applica alle banche svizzere, poiché la Svizzera non è membro UE.\"" },
        { key: "C", text: "\"I pagamenti verso il Giappone passano per il sistema ISO 20022, che unifica SEPA e SWIFT. Il Giappone e l'UE hanno un accordo di pagamento bilaterale – basta l'IBAN, nessun BIC necessario.\"" },
        { key: "D", text: "\"Entrambi i paesi richiedono obbligatoriamente IBAN e BIC – la Francia ha firmato il contratto SEPA solo nel 2019, motivo per cui il codice BIC è ancora necessario per i vecchi conti.\"" },
      ],
      feedback:
        "SEPA si applica ai paesi UE/SEE – all'interno di SEPA basta l'IBAN, nessun BIC necessario. SWIFT si applica a livello mondiale al di fuori dell'UE/SEE – IBAN e BIC obbligatori, commissioni più alte. Importante: La Svizzera non è un paese UE ma membro SEPA! La Francia è UE/SEPA, il Giappone è SWIFT.",
    },
    "3.2": {
      title: "Riconoscere il phishing",
      situation:
        "Un cliente ti mostra un'e-mail: 'Gentile cliente, il suo conto verrà bloccato. Clicchi qui e inserisca la sua password. Cordiali saluti, La sua banca'",
      question: "Cosa dici al cliente?",
      options: [
        { key: "A", text: "\"Sembra serio – cliccare sul link in tutta sicurezza\"" },
        { key: "B", text: "\"È phishing! Non cliccare mai su tali link né inserire la password. Le banche NON chiedono MAI la password via e-mail. Eliminare immediatamente l'e-mail e informarci.\"" },
        { key: "C", text: "\"Cambiare rapidamente la password nell'e-banking dopo il clic\"" },
        { key: "D", text: "\"Cliccare sul link solo se sei sicuro\"" },
      ],
      feedback:
        "Phishing classico! Caratteristiche: urgenza ('verrà bloccato'), richiesta di password, link nell'e-mail. Le banche NON chiedono MAI password o dati di accesso via e-mail. Eliminare sempre immediatamente tali e-mail. Segnalare l'e-mail di phishing al team di sicurezza della banca. Non cliccare sul link, non inserire la password!",
    },
    "3.3": {
      title: "Caso complesso – quattro richieste",
      situation:
        "Un cliente arriva con quattro richieste: 1. Affitto CHF 2'200 mensilmente automaticamente. 2. Cassa malati con importo variabile. 3. Fatture senza carta. 4. Trasferire denaro in Giappone.",
      question: "Quali prodotti consigli per ogni punto?",
      options: [
        { key: "A", text: "1. Ordine permanente  2. Ordine permanente con importo variabile  3. E-Bill  4. SEPA – il Giappone ha aderito all'accordo SEPA, quindi basta l'IBAN senza BIC." },
        { key: "B", text: "1. LSV  2. LSV  3. Ordine permanente  4. SWIFT solo con IBAN – il Giappone accetta come paese del G7 gli standard di pagamento europei senza BIC." },
        { key: "C", text: "1. E-Bill  2. Ordine permanente  3. LSV  4. SEPA con IBAN – il BIC non è più necessario in Europa dal 2016, lo standard SEPA si applica anche al Giappone." },
        { key: "D", text: "1. Ordine permanente  2. LSV  3. Attivare E-Bill  4. SWIFT – fuori UE/SEE, IBAN e BIC obbligatori, commissioni più alte per JPY" },
      ],
      feedback:
        "Ogni prodotto ha il suo scopo: 1. Ordine permanente = stesso importo, stesso destinatario. 2. LSV = importo variabile – la cassa malati addebita autonomamente. 3. E-Bill = fatture senza carta direttamente nell'e-banking. 4. Il Giappone è al di fuori dell'UE/SEE → SWIFT obbligatorio, IBAN + BIC necessari, commissioni più alte di SEPA. Da ricordare: La Svizzera = membro SEPA, ma non paese UE!",
    },
    "3.4": {
      title: "Data valuta vs. data contabile",
      situation:
        "Una cliente è seccata: «Ho effettuato un bonifico di CHF 3'000 venerdì – sull'estratto conto la data contabile è venerdì, ma il denaro è arrivato al destinatario solo martedì. Cosa c'è che non va?»",
      question: "Cosa le spieghi?",
      options: [
        { key: "A", text: "«È un errore della nostra banca – un bonifico nazionale deve arrivare lo stesso giorno lavorativo. Puoi presentare un reclamo formale e richiedere interessi di mora.»" },
        { key: "B", text: "«La data contabile e la data valuta sono due cose diverse: la data contabile mostra quando la tua banca ha registrato il pagamento. La data valuta è il momento da cui il denaro è disponibile per il destinatario ai fini degli interessi. I bonifici inviati venerdì sera dopo la chiusura giornaliera di solito passano per il clearing il giorno lavorativo successivo (lunedì).»" },
        { key: "C", text: "«La banca del destinatario ha trattenuto il denaro internamente. È un problema noto in alcune banche.»" },
        { key: "D", text: "«I bonifici nazionali passano sempre lo stesso giorno – il destinatario riceve il denaro al massimo 4 ore dopo l'ordine. Se era martedì, l'ordine deve essere arrivato lunedì.»" },
      ],
      feedback:
        "Distinzione importante: Data contabile = quando il pagamento viene registrato nel sistema. Data valuta = quando il denaro è disponibile per il destinatario ai fini degli interessi. Bonifici nazionali: gli ordini fino alla chiusura giornaliera (di solito 16:30) vengono elaborati lo stesso giorno. Venerdì sera = prossimo clearing lunedì → accredito al destinatario lunedì o martedì. Non è un errore, ma la pratica standard della data valuta.",
    },
    "3.5": {
      title: "Opposizione LSV dopo addebito non autorizzato",
      situation:
        "Un cliente è agitato: «La mia palestra ha addebitato CHF 480 dal mio conto tramite LSV – ma ho disdetto l'abbonamento 3 mesi fa! Cosa posso fare?»",
      question: "Cosa gli spieghi e cosa avvii?",
      options: [
        { key: "A", text: "«Purtroppo gli addebiti LSV non possono essere annullati dopo più di 30 giorni. Deve richiedere il denaro direttamente alla palestra.»" },
        { key: "B", text: "«Può fare opposizione entro 30 giorni dalla data contabile. Avviamo il rimborso. Allo stesso tempo consiglio di bloccare l'ordine LSV per questo creditore, in modo che non vengano effettuati ulteriori addebiti.»" },
        { key: "C", text: "«Un rimborso è possibile solo con l'accordo della palestra. Non possiamo richiedere il denaro unilateralmente – non sarebbe legalmente fondato.»" },
        { key: "D", text: "«Con LSV non hai diritto di opposizione – questa è la differenza rispetto a un normale bonifico. Devi richiedere l'importo per via giudiziaria.»" },
      ],
      feedback:
        "Diritto di opposizione LSV: Il cliente può fare opposizione entro 30 giorni dalla data contabile – la banca rimborsa l'importo senza che il creditore debba dare il suo consenso. Dopo questo termine, è possibile solo il contatto diretto con il creditore. Importante: bloccare immediatamente l'ordine LSV per questo creditore! La banca può escludere singoli creditori dal mandato LSV, in modo che non seguano ulteriori addebiti non autorizzati.",
    },
  },
};
