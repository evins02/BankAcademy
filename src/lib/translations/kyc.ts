import type { LangTranslations } from "./utils";

export const KYC_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      situation:
        "Un nouveau client se présente à l'agence pour ouvrir un compte. Il n'a pas de pièce d'identité sur lui et dit qu'il peut la déposer la semaine prochaine.",
      question: "Que faites-vous ?",
      options: [
        { key: "A", text: "Ouvrir le compte et lui demander de fournir la pièce d'identité ultérieurement" },
        { key: "B", text: "Ne pas ouvrir le compte – l'identification est impérative avant l'ouverture du compte" },
        { key: "C", text: "Ouvrir le compte mais le bloquer jusqu'à réception de la pièce d'identité" },
        { key: "D", text: "Prendre rendez-vous la semaine prochaine et préparer provisoirement les documents du compte – tant que le compte n'est pas actif, l'obligation d'identification ne s'applique pas encore." },
      ],
      feedback:
        "Selon la CDB et la LBA, l'identification du cocontractant doit impérativement être effectuée AVANT l'ouverture du compte. Une pièce d'identité officielle (passeport ou carte d'identité) est obligatoire. Sans identification, aucune relation d'affaires ne peut être établie.",
    },
    "1.2": {
      situation:
        "Vous êtes au guichet. Un homme souhaite connaître le solde du compte de son épouse. Il a sa carte bancaire, mais ne connaît pas le code PIN et ne dispose d'aucune procuration.",
      question: "Que faites-vous ?",
      options: [
        { key: "A", text: "Ne donner aucune information – pas d'accès sans procuration" },
        { key: "B", text: "Communiquer le solde – c'est l'époux" },
        { key: "C", text: "Indiquer uniquement le montant approximatif" },
        { key: "D", text: "Appeler l'épouse et lui demander" },
      ],
      feedback:
        "Le secret bancaire protège chaque client individuellement. Même les époux n'ont pas droit aux informations de compte sans procuration. Vous ne pouvez donner aucune information – ni même confirmer l'existence d'un compte.",
    },
    "1.3": {
      situation:
        "Une connaissance vous demande après le travail : «Dis, j'ai vu mon voisin chez vous à la banque aujourd'hui – il a un compte chez vous ?»",
      question: "Que répondez-vous ?",
      options: [
        { key: "A", text: "«Oui, il est notre client»" },
        { key: "B", text: "«Demande-lui toi-même»" },
        { key: "C", text: "«Je ne l'ai pas vu aujourd'hui»" },
        { key: "D", text: "«Je ne peux malheureusement pas vous dire cela»" },
      ],
      feedback:
        "Le secret bancaire s'applique également en dehors des heures de travail et dans la vie privée. Vous ne pouvez ni confirmer ni nier qu'une personne est cliente de votre banque. La discrétion absolue s'applique même envers les amis et la famille.",
    },
    "1.4": {
      situation:
        "Une jeune cliente, 22 ans, souhaite ouvrir son premier compte. Elle vous demande : «De quoi ai-je besoin pour ouvrir un compte ?»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«Seulement votre adresse et numéro de téléphone – le reste est géré en interne.»" },
        { key: "B", text: "«Une pièce d'identité officielle (passeport ou carte d'identité) et une preuve de domicile. En cas de liens avec les États-Unis, une déclaration FATCA. Tout le reste, nous le remplissons ensemble.»" },
        { key: "C", text: "«Passeport, justificatifs de salaire des 3 derniers mois, extrait du registre des poursuites et permis de séjour – nous devons vérifier la solvabilité avant d'ouvrir un compte.»" },
        { key: "D", text: "«Seulement une pièce d'identité officielle – tout le reste est facultatif. Le domicile est consulté directement par nous auprès du registre des habitants.»" },
      ],
      feedback:
        "Documents obligatoires lors de l'ouverture de compte : 1) Pièce d'identité officielle avec photo (passeport ou carte d'identité nationale) – obligatoire selon la CDB pour l'identification. 2) Justificatif de domicile (confirmer la résidence en Suisse). 3) Auto-déclaration FATCA si des liens avec les États-Unis sont possibles. Pas besoin de justificatif de salaire ou d'extrait du registre des poursuites – cela concerne les demandes de crédit, pas l'ouverture de compte.",
    },
    "1.5": {
      situation: "Un client demande : «Que signifie exactement KYC ? Je l'entends partout.»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«KYC signifie 'Keep Your Cash' – une règle interne de la banque limitant les transactions en espèces.»" },
        { key: "B", text: "«KYC – 'Know Your Customer' – signifie que la banque doit connaître ses clients : qui ils sont, d'où vient leur argent, et si le modèle commercial est plausible. Cela prévient le blanchiment d'argent et le financement du terrorisme.»" },
        { key: "C", text: "«KYC est une directive européenne pour les grandes banques – les petites banques et les clients privés ne sont pas concernés.»" },
        { key: "D", text: "«KYC n'est pertinent que lors du premier contact – ensuite, le statut client n'est plus jamais vérifié tant qu'il n'y a pas d'accusations pénales.»" },
      ],
      feedback:
        "Le KYC (Know Your Customer) est l'obligation légale de la banque de connaître ses clients : identité, ayants droit économiques, origine des fonds et objet de la relation d'affaires. Bases légales : LBA (Loi sur le blanchiment d'argent) et CDB (Convention relative à l'obligation de diligence des banques). Le KYC n'est pas un événement unique – le profil client doit être maintenu à jour en permanence.",
    },
    "2.1": {
      situation:
        "Une nouvelle cliente souhaite ouvrir un compte. Elle dit que l'argent sur le compte appartient en réalité à son frère à l'étranger et qu'elle le gère seulement pour lui.",
      question: "Que faut-il impérativement faire dans cette situation ?",
      options: [
        { key: "A", text: "Remplir le formulaire A – l'ayant droit économique est le frère" },
        { key: "B", text: "Identifier uniquement la cliente – elle est la partie contractante et porte la responsabilité juridique. L'origine des fonds et les ayants droit économiques ne doivent pas être documentés séparément." },
        { key: "C", text: "Refuser le compte en principe – les comptes pour des tiers ne sont autorisés qu'avec un accord fiduciaire écrit et l'approbation de la compliance." },
        { key: "D", text: "Remplir le formulaire K – c'est le formulaire standard pour les relations fiduciaires. Il remplace le formulaire A et est transmis directement à la FINMA." },
      ],
      feedback:
        "Lorsque l'ayant droit économique n'est pas identique au cocontractant, le formulaire A doit impérativement être rempli. Il y est consigné qui est le véritable propriétaire économique des valeurs patrimoniales. C'est une obligation fondamentale selon la CDB et la LBA.",
    },
    "2.2": {
      situation:
        "Lors de l'entretien annuel, un client privé de longue date mentionne en passant : «Mes enfants ne le savent presque pas – je suis en réalité né à Boston.» L'auto-déclaration FATCA dans son dossier indique systématiquement «Aucun lien avec les États-Unis».",
      question: "Que devez-vous faire ?",
      options: [
        { key: "A", text: "Rien – il n'a pas mentionné la citoyenneté américaine" },
        { key: "B", text: "Mettre à jour immédiatement le statut FATCA : un lieu de naissance américain justifie une obligation FATCA. Établir une nouvelle auto-déclaration, informer la compliance, demander la preuve du numéro fiscal américain ou de la renonciation à la citoyenneté." },
        { key: "C", text: "Noter en interne – agir lors du prochain entretien annuel" },
        { key: "D", text: "Bloquer le compte jusqu'à clarification" },
      ],
      feedback:
        "Un lieu de naissance américain établit en principe une citoyenneté américaine – et donc une obligation FATCA. L'auto-déclaration doit être mise à jour immédiatement. Le client doit soit fournir un numéro d'identification fiscale américain (TIN), soit prouver sa renonciation à la citoyenneté américaine (Certificate of Loss of Nationality, CLN). Le FATCA n'est pas une routine d'ouverture unique – le dossier doit être mis à jour à chaque nouvel indice pertinent.",
    },
    "2.3": {
      briefing:
        "Un nouveau client souhaite déposer CHF 30'000 en espèces. Il explique que l'argent provient de la vente de sa voiture.",
      question:
        "Selon la CDB, l'origine des fonds lors de dépôts en espèces supérieurs à CHF ___ doit être documentée.",
      feedback:
        "Selon la CDB, pour les transactions commerciales et les dépôts supérieurs à CHF 25'000, l'identité doit être vérifiée et l'origine des fonds documentée. Le client doit être en mesure de démontrer de manière crédible l'origine, par exemple avec un contrat d'achat pour la voiture.",
    },
    "2.4": {
      situation:
        "Vous avez deux clients : le client A est un médecin suisse avec des revenus en Suisse. Le client B est un entrepreneur étranger souhaitant déposer CHF 2 mio. – origine inconnue, siège de la société dans une juridiction offshore.",
      question: "Quel niveau de diligence s'applique à qui ?",
      options: [
        { key: "A", text: "Tous deux reçoivent une CDD standard – le seul montant ne justifie pas encore un contrôle renforcé tant qu'il n'y a pas d'antécédents judiciaires." },
        { key: "B", text: "Tous deux reçoivent une EDD – tout nouveau client avec des liens étrangers est considéré comme à haut risque." },
        { key: "C", text: "Client A : CDD standard suffisante. Client B : EDD obligatoire – origine des fonds inconnue, juridiction offshore et volume sont des facteurs de risque élevé selon l'art. 6 LBA." },
        { key: "D", text: "Client A : pas de KYC nécessaire (client national). Client B : CDD standard avec signature supplémentaire." },
      ],
      feedback:
        "La CDD (diligence standard) s'applique aux relations d'affaires normales à faible risque. L'EDD (Enhanced Due Diligence / diligence renforcée) s'applique en présence de facteurs à risque élevé : origine des fonds inconnue, juridiction offshore, montants élevés, statut PPE ou transactions inhabituelles. Ici : le client B remplit plusieurs caractéristiques de risque élevé → EDD obligatoire plus approbation de la direction (art. 6 LBA).",
    },
    "2.5": {
      situation:
        "Dans un cours de formation bancaire, on vous demande : «Expliquez le modèle en trois phases du blanchiment d'argent.»",
      question: "Quelle réponse est correcte ?",
      options: [
        { key: "A", text: "Gagner → Cacher → Dépenser : Les gains délictueux sont d'abord perçus, puis cachés sur des comptes anonymes et finalement utilisés pour des achats légaux." },
        { key: "B", text: "Placement → Empilement → Intégration : Les fonds criminels sont introduits, dissimulés par de nombreuses transactions et finalement réintroduits dans le circuit économique comme fonds légaux." },
        { key: "C", text: "Dépôt → Transfert → Retrait : Les espèces sont déposées, transférées à l'étranger et retirées proprement – chaque phase correspond à un établissement bancaire distinct." },
        { key: "D", text: "Compte → Transaction → Clôture : L'argent sale passe par trois comptes bancaires dans différents pays et est considéré comme blanchi après le troisième transfert." },
      ],
      feedback:
        "Le modèle en trois phases : 1) Placement : Les espèces provenant d'activités criminelles sont introduites dans le système financier (p. ex. dépôts en espèces, sociétés fictives). 2) Empilement : La piste est brouillée par de nombreuses transactions, virements à l'étranger, achats immobiliers. 3) Intégration : L'argent apparaît comme une fortune propre dans le circuit économique légal. Les collaborateurs bancaires doivent notamment reconnaître et signaler la phase 1.",
    },
    "3.1": {
      situation:
        "Vous suivez depuis 5 ans un client avec une petite entreprise artisanale. Soudain, CHF 50'000 arrivent mensuellement sur son compte – auparavant, le maximum était CHF 8'000. Sur question, il dit avoir reçu un nouveau grand contrat.",
      question: "Quelles obligations avez-vous selon la LBA ?",
      options: [
        { key: "A", text: "Enregistrer l'explication du client dans le CRM comme 'grand contrat confirmé' et observer le comportement transactionnel pendant 3 mois. En l'absence d'autres anomalies, aucune mesure LBA n'est nécessaire." },
        { key: "B", text: "Ouvrir un ticket compliance et attendre – le collaborateur interne examine les faits et décide lui-même si une annonce au MROS est nécessaire. En tant que conseiller, aucune autre étape n'est requise." },
        { key: "C", text: "Bloquer le compte de manière préventive et informer le client par écrit de l'examen en cours. Ce n'est qu'après le retour du client avec des pièces justificatives que la compliance décide." },
        { key: "D", text: "Réidentification, clarification de l'origine, documentation – en cas de soupçon, annonce au MROS" },
      ],
      feedback:
        "En cas de changements inhabituels dans le comportement transactionnel, les art. 5 et 6 LBA s'appliquent : réidentification et détermination de l'ayant droit économique ainsi qu'obligation de clarification spéciale. Si le soupçon se confirme : obligation d'annonce au MROS, obligation de blocage des valeurs patrimoniales et interdiction d'information envers le client (art. 10a LBA).",
    },
    "3.2": {
      situation:
        "Une personne politiquement exposée (PPE) étrangère souhaite ouvrir un compte et déposer CHF 500'000. L'origine des fonds est inconnue.",
      question: "Qu'est-ce qui s'applique aux PPE et que devez-vous faire ?",
      options: [
        { key: "A", text: "Effectuer une vérification KYC normale – le statut PPE seul n'est pas une raison de diligence renforcée tant que le client n'a pas d'accusations de corruption avérées." },
        { key: "B", text: "Rejeter la relation d'affaires en principe – selon l'art. 6 LBA, les PPE étrangères sans citoyenneté de l'UE sont automatiquement classées comme clients non admissibles." },
        { key: "C", text: "Appliquer des obligations de diligence renforcées : approbation de la direction, clarification de l'origine des fonds, surveillance rapprochée" },
        { key: "D", text: "Informer la compliance par e-mail et ouvrir le compte provisoirement – la compliance décide dans les 5 jours ouvrables si des conditions particulières s'appliquent." },
      ],
      feedback:
        "Les PPE sont soumises à des obligations de diligence renforcées selon l'art. 6 LBA. L'ouverture de la relation d'affaires nécessite impérativement l'approbation de la direction. L'origine des fonds doit être documentée de manière exhaustive. La relation d'affaires est surveillée de près. Une PPE n'est pas automatiquement à refuser – mais l'effort est nettement plus important.",
    },
    "3.3": {
      situation:
        "Votre collègue de longue date vous demande de lui donner brièvement accès à un compte client car il n'y a pas lui-même accès pour l'instant. Le client serait d'accord.",
      question: "Que faites-vous ?",
      options: [
        { key: "A", text: "Refuser l'accès – chaque collaborateur ne peut accéder qu'aux comptes pour lesquels il est habilité" },
        { key: "B", text: "Accorder l'accès – le collègue est soumis au même secret professionnel que vous. Un échange d'accès temporaire est admissible dans le cadre du droit organisationnel interne." },
        { key: "C", text: "Accorder l'accès et l'enregistrer dans le système de tickets comme 'échange d'accès temporaire pour raisons opérationnelles' – la documentation protège les deux parties." },
        { key: "D", text: "Accorder temporairement l'accès et informer brièvement le supérieur – si le collègue assume la responsabilité, cela est couvert par la protection des données." },
      ],
      feedback:
        "Le principe du besoin d'en connaître s'applique de manière absolue. Chaque collaborateur ne peut accéder qu'aux données client pour lesquelles il dispose d'une habilitation claire. Un accès non autorisé viole le secret bancaire et la protection des données – indépendamment de la confiance accordée au collègue ou de l'accord du client. Cela peut entraîner des conséquences pénales.",
    },
    "3.4": {
      situation:
        "Vous venez d'envoyer une annonce de soupçon de blanchiment d'argent au MROS. Votre client vous appelle peu après et vous demande directement : «Avez-vous signalé quoi que ce soit à mon sujet ?»",
      question: "Que faites-vous ?",
      options: [
        { key: "A", text: "Répondre honnêtement au client – la transparence est une valeur fondamentale de la banque. Il a le droit de connaître une annonce le concernant." },
        { key: "B", text: "Répondre de manière évasive : «Il n'y a rien de particulier» – un mensonge direct est interdit, mais vous pouvez contourner la vérité sans enfreindre la loi." },
        { key: "C", text: "Ne pas informer le client et esquiver la question – l'interdiction de divulgation selon l'art. 10a LBA interdit toute révélation de l'annonce ou de l'enquête en cours." },
        { key: "D", text: "Notifier immédiatement la compliance et mettre fin à la conversation – l'appel pourrait être une tentative d'influencer l'enquête." },
      ],
      feedback:
        "Art. 10a LBA : interdiction absolue d'information ('tipping-off'). Après une annonce au MROS, ni l'annonce ni l'enquête en cours ne peuvent être divulguées au client. Ni directement ni indirectement, ni oralement ni par écrit. Objectif : empêcher la fuite du suspect ou la destruction de preuves. En cas de violation, des conséquences pénales menacent le collaborateur bancaire.",
    },
    "3.5": {
      situation:
        "Une société dont le siège est aux îles Caïmans souhaite ouvrir un compte. Le représentant autorisé (avocat de Zurich) explique que les véritables propriétaires sont deux personnes privées dont il ne peut pas divulguer les noms sans difficulté.",
      question: "Que devez-vous faire ?",
      options: [
        { key: "A", text: "Ouvrir le compte avec l'avocat comme cocontractant – en tant que représentant autorisé, il porte l'entière responsabilité juridique. Les personnes derrière n'ont pas besoin d'être identifiées." },
        { key: "B", text: "Le formulaire K (société domiciliaire) et le formulaire A (ayants droit économiques) doivent impérativement être remplis. Les véritables ayants droit économiques doivent être identifiés nominativement – sans ces informations, l'ouverture d'un compte est impossible." },
        { key: "C", text: "Ouvrir le compte provisoirement et donner 30 jours à l'avocat pour nommer les propriétaires. D'ici là, seuls les dépôts sont autorisés." },
        { key: "D", text: "Informer la compliance et ouvrir le compte sans formulaire A – l'avocat est soumis au secret professionnel qui le dispense de divulguer ses mandants." },
      ],
      feedback:
        "Société domiciliaire (société boîte aux lettres sans activité opérationnelle au siège) : le formulaire K est obligatoire. S'y ajoute le formulaire A pour saisir nominativement les ayants droit économiques. Sans identification complète des personnes derrière, le compte ne peut pas être ouvert – peu importe que le représentant soit un avocat. Le secret professionnel de l'avocat ne dispense pas la banque des obligations LBA.",
    },
    "3.6": {
      situation:
        "Votre client entreprise, un importateur-exportateur de textiles, effectue plusieurs fois par mois des virements en EUR à des contreparties dans des pays à risque LBA élevé. Les montants des factures varient fortement (CHF 8'000–150'000), mais les quantités et qualités livrées ne correspondent pas aux prix facturés selon les données sectorielles.",
      question: "Qu'est-ce qui décrit ce schéma et que devez-vous faire ?",
      options: [
        { key: "A", text: "Rien – les activités d'import-export sont légitimes par nature et les fluctuations de prix sont normales sur le marché" },
        { key: "B", text: "Trade-Based Money Laundering (TBML) : la sur ou sous-facturation dissimule les flux financiers. Obligation de clarification renforcée, plausibilisation des factures commerciales avec les prix du marché, informer la compliance." },
        { key: "C", text: "Vérifier uniquement si un montant dépasse CHF 100'000 – en dessous, aucune clarification particulière n'est nécessaire" },
        { key: "D", text: "Demander par écrit au client de fournir toutes les factures des 2 dernières années" },
      ],
      feedback:
        "Le Trade-Based Money Laundering (TBML) est l'une des méthodes de blanchiment d'argent les plus complexes : les criminels dissimulent les flux financiers par sur ou sous-facturation lors de transactions commerciales. Signaux d'alarme : les prix des factures s'écartent fortement des prix du marché, contreparties dans des pays à haut risque, fréquentes fluctuations sans raison de marché reconnaissable. L'art. 6 LBA oblige à une clarification spéciale – indépendamment du seuil. Impliquer la compliance et le cas échéant le MROS.",
    },
    "3.7": {
      situation:
        "Un client privé souhaite déposer CHF 80'000. Il explique avoir vendu des bitcoins. Il présente une capture d'écran de son exchange crypto comme preuve d'origine, mais ne peut pas expliquer d'où provenaient les bitcoins acquis à l'origine.",
      question: "Qu'est-ce qui s'applique aux actifs virtuels et comment procédez-vous ?",
      options: [
        { key: "A", text: "Refuser le dépôt – les cryptomonnaies ne sont pas reconnues en Suisse comme source légitime" },
        { key: "B", text: "La capture d'écran suffit – l'exchange a déjà effectué le KYC, donc l'argent est propre" },
        { key: "C", text: "Diligence renforcée : clarifier l'origine des bitcoins (achat ? minage ? donation ?), faire vérifier l'historique des transactions sur la blockchain (compliance/outils externes), prouver la source des fonds fiat d'origine. La capture d'écran seule ne suffit pas." },
        { key: "D", text: "Accepter au maximum CHF 15'000 – pour les montants supérieurs, il n'existe pas de base juridique pour les cryptomonnaies" },
      ],
      feedback:
        "Les actifs virtuels (AV) sont soumis à la LBA depuis 2020. Une capture d'écran d'un exchange crypto ne prouve que la vente, pas l'origine des bitcoins. Questions : les BTC ont-ils été achetés à l'origine avec des fonds fiat légaux ? Quand et où ? Y a-t-il eu des transactions via des adresses du darknet ou des mixers ? La compliance peut utiliser des outils d'analyse blockchain (Chainalysis, Elliptic). La Circ. FINMA 2016/7 et les normes GAFI sur les actifs virtuels s'appliquent. En cas d'origine inconnue : EDD, pas de dépôt sans documentation complète.",
    },
    "3.8": {
      situation:
        "Le client privé de longue date Hanspeter Müller (53 ans, employé) est élu lors des prochaines élections au Conseil communal et prendra ses fonctions dans 3 mois. Vous l'apprenez par un article de journal.",
      question: "Quelles obligations KYC naissent maintenant ?",
      options: [
        { key: "A", text: "Rien – le client est suisse, pas une PPE étrangère. Les politiciens communaux nationaux ne sont pas considérés comme des PPE selon la LBA." },
        { key: "B", text: "Bloquer le compte jusqu'à la prise de fonction officielle, puis réévaluer" },
        { key: "C", text: "Mise à jour de statut : un Conseiller communal suisse est une PPE nationale (PPEi) selon la LBA révisée. Vérifier la classification des risques, en cas de fortune ou de transactions élevées : initier une EDD. Mettre à jour le dossier." },
        { key: "D", text: "Envoyer une lettre au client et lui demander ses activités futures" },
      ],
      feedback:
        "Depuis la révision de la LBA 2016 (en vigueur 2020), la notion de PPE s'applique également aux personnes politiquement exposées nationales (PPEi). Les politiciens communaux d'une certaine importance peuvent en relever. Obligation : mettre à jour le dossier immédiatement lors du changement de statut, vérifier la classification des risques, le cas échéant EDD. La banque doit surveiller proactivement les changements de statut PPE (veille médiatique, contrôle périodique). Le client doit être informé des nouvelles exigences KYC.",
    },
    "3.9": {
      situation:
        "Via une holding SA en Suisse (actionnaire unique : une société BVI, dont le propriétaire est à son tour une fondation aux Seychelles), CHF 5 mio. doivent être transférés sur un compte suisse. Aucun objectif économique reconnaissable de la structure.",
      question: "Quel est le plus grand défi et comment procédez-vous ?",
      options: [
        { key: "A", text: "Ouvrir le compte – toutes les juridictions mentionnées sont légales et la holding suisse est régulièrement enregistrée" },
        { key: "B", text: "Remplir le formulaire K pour la holding suisse – cela suffit" },
        { key: "C", text: "Identifier les ayants droit économiques de toute la structure jusqu'à la personne physique (principe de transparence). Formulaire A pour chaque niveau. Sans identification de la personne ayant droit économique : pas de compte." },
        { key: "D", text: "La compliance contacte directement la fondation des Seychelles – elle est légalement responsable" },
      ],
      feedback:
        "Les structures sociétaires imbriquées sont un moyen classique de dissimulation des valeurs patrimoniales. Le principe de transparence selon la LBA et la CDB exige que la banque perce toutes les couches jusqu'à la personne physique (ayant droit économique). Le formulaire A doit être signé à chaque niveau par une personne physique identifiable. Les structures BVI et Seychelles sans objectif économique reconnaissable sont considérées comme des structures à haut risque. Sans transparence complète : pas d'ouverture de compte.",
    },
    "3.10": {
      situation:
        "Un jeune homme, 24 ans, étudiant, ouvre un compte et effectue peu après un virement de CHF 500 à 12 destinataires différents dans 3 pays différents. Les montants sont faibles, mais l'un des pays destinataires figure sur la liste GAFI avec un risque de financement du terrorisme élevé. Sur les réseaux sociaux, la compliance trouve des indices de déclarations extrémistes.",
      question: "En quoi le financement du terrorisme diffère-t-il du blanchiment d'argent classique et que faites-vous ?",
      options: [
        { key: "A", text: "Rien – des montants inférieurs à CHF 1'000 sont beaucoup trop faibles pour le financement du terrorisme" },
        { key: "B", text: "Seulement une annonce au MROS – comme pour le blanchiment d'argent" },
        { key: "C", text: "Informer immédiatement le MROS (financement du terrorisme), bloquer le compte. Important : le financement du terrorisme ne connaît pas de montant minimum – de petits montants peuvent causer de grands dommages. Le Service de renseignement de la Confédération (SRC) peut également être informé." },
        { key: "D", text: "La recherche sur les réseaux sociaux n'est pas un indice KYC valide – aucune mesure" },
      ],
      feedback:
        "Le financement du terrorisme (FT) diffère fondamentalement du blanchiment d'argent : avec la LBA, il s'agit de l'origine (blanchir des fonds illégaux). Avec le FT, il s'agit de l'objectif (utiliser des fonds légaux ou illégaux à des fins terroristes). De petits montants peuvent suffire (p. ex. frais de voyage, équipement). L'art. 9 LBA s'applique au FT de la même manière qu'au blanchiment. En cas de soupçon concret : annonce immédiate au MROS, obligation de blocage, interdiction d'information. Le SRC peut être impliqué en plus. Les indications sur les réseaux sociaux sont des indicateurs valides.",
    },
  },
  it: {
    "1.1": {
      situation:
        "Un nuovo cliente si presenta in filiale e vuole aprire un conto. Non ha con sé un documento d'identità e dice che può portarlo la settimana prossima.",
      question: "Cosa fa?",
      options: [
        { key: "A", text: "Aprire il conto e fargli presentare il documento d'identità in seguito" },
        { key: "B", text: "Non aprire il conto – l'identificazione è tassativamente richiesta prima dell'apertura del conto" },
        { key: "C", text: "Aprire il conto ma bloccarlo fino alla ricezione del documento d'identità" },
        { key: "D", text: "Fissare un appuntamento per la settimana prossima e preparare provvisoriamente i documenti del conto – finché il conto non è attivo, l'obbligo di identificazione non si applica ancora." },
      ],
      feedback:
        "Secondo la CDB e la LRD, l'identificazione del contraente deve avvenire tassativamente PRIMA dell'apertura del conto. Un documento d'identità ufficiale (passaporto o carta d'identità) è obbligatorio. Senza identificazione non può essere instaurata alcuna relazione d'affari.",
    },
    "1.2": {
      situation:
        "Lei si trova allo sportello. Un uomo vuole conoscere il saldo del conto di sua moglie. Ha la sua carta bancaria, ma non conosce il PIN e non ha alcuna procura.",
      question: "Cosa fa?",
      options: [
        { key: "A", text: "Non fornire alcuna informazione – nessun accesso senza procura" },
        { key: "B", text: "Comunicare il saldo – è il marito" },
        { key: "C", text: "Indicare solo il saldo approssimativo" },
        { key: "D", text: "Chiamare la moglie e chiedere" },
      ],
      feedback:
        "Il segreto bancario protegge ogni cliente individualmente. Anche i coniugi non hanno diritto alle informazioni del conto senza procura. Lei non può fornire alcuna informazione – nemmeno confermare l'esistenza di un conto.",
    },
    "1.3": {
      situation:
        "Una conoscenza le chiede dopo il lavoro: «Ehi, ho visto il mio vicino da voi in banca oggi – ha forse un conto da voi?»",
      question: "Cosa risponde?",
      options: [
        { key: "A", text: "«Sì, è nostro cliente»" },
        { key: "B", text: "«Chiedilo direttamente a lui»" },
        { key: "C", text: "«Non l'ho visto oggi»" },
        { key: "D", text: "«Purtroppo non posso dirle questo»" },
      ],
      feedback:
        "Il segreto bancario vale anche al di fuori dell'orario di lavoro e nella vita privata. Lei non può né confermare né negare che qualcuno sia cliente della vostra banca. La riservatezza assoluta si applica anche nei confronti di amici e familiari.",
    },
    "1.4": {
      situation:
        "Una giovane cliente, 22 anni, vuole aprire il suo primo conto. Le chiede: «Di cosa ho bisogno per aprire un conto?»",
      question: "Cosa le spiega?",
      options: [
        { key: "A", text: "«Solo il Suo indirizzo e numero di telefono – il resto lo gestiamo internamente.»" },
        { key: "B", text: "«Un documento d'identità ufficiale (passaporto o carta d'identità) e una prova di domicilio. In caso di legami con gli Stati Uniti, anche una dichiarazione FATCA. Il resto lo compiliamo insieme.»" },
        { key: "C", text: "«Passaporto, buste paga degli ultimi 3 mesi, estratto del registro delle esecuzioni e permesso di soggiorno – dobbiamo verificare la solvibilità prima di aprire un conto.»" },
        { key: "D", text: "«Solo un documento d'identità ufficiale – tutto il resto è facoltativo. Il domicilio viene richiesto direttamente da noi al registro degli abitanti.»" },
      ],
      feedback:
        "Documenti obbligatori all'apertura del conto: 1) Documento d'identità ufficiale con fotografia (passaporto o carta d'identità nazionale) – obbligatorio secondo la CDB per l'identificazione. 2) Prova di domicilio (conferma della residenza in Svizzera). 3) Autodichiarazione FATCA se possibili legami con gli Stati Uniti. Non è necessario il certificato di salario o l'estratto del registro delle esecuzioni – quello riguarda le domande di credito, non l'apertura di conto.",
    },
    "1.5": {
      situation: "Un cliente chiede: «Cosa significa esattamente KYC? Lo sento ovunque.»",
      question: "Cosa spiega?",
      options: [
        { key: "A", text: "«KYC sta per 'Keep Your Cash' – una regola interna della banca che limita le transazioni in contanti.»" },
        { key: "B", text: "«KYC – 'Know Your Customer' – significa che la banca deve conoscere i propri clienti: chi sono, da dove proviene il loro denaro e se il modello commerciale è plausibile. Questo previene il riciclaggio di denaro e il finanziamento del terrorismo.»" },
        { key: "C", text: "«KYC è una direttiva UE per le grandi banche – le banche più piccole e i clienti privati non sono interessati.»" },
        { key: "D", text: "«KYC è rilevante solo al primo contatto – in seguito, lo stato del cliente non viene mai più verificato finché non ci sono accuse penali.»" },
      ],
      feedback:
        "Il KYC (Know Your Customer) è l'obbligo legale della banca di conoscere i propri clienti: identità, avente diritto economico, origine dei fondi e scopo della relazione d'affari. Basi giuridiche: LRD (Legge sul riciclaggio di denaro) e CDB (Convenzione relativa all'obbligo di diligenza delle banche). Il KYC non è un evento una tantum – il profilo del cliente deve essere mantenuto costantemente aggiornato.",
    },
    "2.1": {
      situation:
        "Una nuova cliente vuole aprire un conto. Dice che il denaro sul conto appartiene in realtà a suo fratello all'estero e che lei lo gestisce solo per lui.",
      question: "Cosa è tassativamente necessario in questa situazione?",
      options: [
        { key: "A", text: "Compilare il modulo A – l'avente diritto economico è il fratello" },
        { key: "B", text: "Identificare solo la cliente – lei è la parte contraente e porta la responsabilità giuridica. L'origine dei fondi e gli aventi diritto economici non devono essere documentati separatamente." },
        { key: "C", text: "Rifiutare il conto in linea di principio – i conti per terzi sono ammessi solo con un accordo fiduciario scritto e l'approvazione della compliance." },
        { key: "D", text: "Compilare il modulo K – è il modulo standard per le relazioni fiduciarie. Sostituisce il modulo A e viene trasmesso direttamente alla FINMA." },
      ],
      feedback:
        "Quando l'avente diritto economico non è identico al contraente, il modulo A deve essere compilato obbligatoriamente. In esso viene indicato chi è il vero proprietario economico dei valori patrimoniali. Questo è un obbligo fondamentale secondo la CDB e la LRD.",
    },
    "2.2": {
      situation:
        "Durante il colloquio annuale, un cliente privato di lunga data menziona casualmente: «I miei figli quasi non lo sanno – in realtà sono nato a Boston.» L'autodichiarazione FATCA nel suo dossier indica sistematicamente «Nessun legame con gli Stati Uniti».",
      question: "Cosa deve fare?",
      options: [
        { key: "A", text: "Niente – non ha menzionato la cittadinanza americana" },
        { key: "B", text: "Aggiornare immediatamente lo stato FATCA: un luogo di nascita americano giustifica un obbligo FATCA. Redigere una nuova autodichiarazione, informare la compliance, richiedere la prova del numero fiscale americano o della rinuncia alla cittadinanza americana." },
        { key: "C", text: "Annotare internamente – agire al prossimo colloquio annuale" },
        { key: "D", text: "Bloccare il conto fino a chiarimento" },
      ],
      feedback:
        "Un luogo di nascita americano stabilisce in linea di principio una cittadinanza americana – e quindi un obbligo FATCA. L'autodichiarazione deve essere aggiornata immediatamente. Il cliente deve fornire un numero di identificazione fiscale americano (TIN) oppure dimostrare la rinuncia alla cittadinanza americana (Certificate of Loss of Nationality, CLN). Il FATCA non è una routine di apertura una tantum – il dossier deve essere aggiornato ad ogni nuovo indizio pertinente.",
    },
    "2.3": {
      briefing:
        "Un nuovo cliente vuole depositare CHF 30'000 in contanti. Spiega che il denaro proviene dalla vendita della sua automobile.",
      question:
        "Secondo la CDB, l'origine dei fondi per i depositi in contanti superiori a CHF ___ deve essere documentata.",
      feedback:
        "Secondo la CDB, per le operazioni commerciali e i depositi superiori a CHF 25'000, l'identità deve essere verificata e l'origine dei fondi documentata. Il cliente deve essere in grado di dimostrare in modo credibile l'origine, ad esempio con un contratto di acquisto per l'automobile.",
    },
    "2.4": {
      situation:
        "Ha due clienti: il cliente A è un medico svizzero con reddito nazionale. Il cliente B è un imprenditore straniero che vuole depositare CHF 2 mio. – origine sconosciuta, sede della società in una giurisdizione offshore.",
      question: "Quale livello di diligenza si applica a chi?",
      options: [
        { key: "A", text: "Entrambi ricevono una CDD standard – il solo importo non giustifica ancora un esame approfondito finché non ci sono precedenti penali." },
        { key: "B", text: "Entrambi ricevono una EDD – ogni nuovo cliente con legami stranieri è considerato ad alto rischio." },
        { key: "C", text: "Cliente A: CDD standard sufficiente. Cliente B: EDD obbligatoria – origine dei fondi sconosciuta, giurisdizione offshore e volume sono fattori di rischio elevato secondo l'art. 6 LRD." },
        { key: "D", text: "Cliente A: nessun KYC necessario (cliente nazionale). Cliente B: CDD standard con firma aggiuntiva." },
      ],
      feedback:
        "La CDD (diligenza standard) si applica alle normali relazioni d'affari a basso rischio. La EDD (Enhanced Due Diligence / diligenza rafforzata) si applica in presenza di fattori ad alto rischio: origine dei fondi sconosciuta, giurisdizione offshore, importi elevati, stato PPE o transazioni insolite. Qui: il cliente B soddisfa diversi criteri di rischio elevato → EDD obbligatoria più approvazione della direzione (art. 6 LRD).",
    },
    "2.5": {
      situation:
        "In un corso di formazione bancaria le viene chiesto: «Spieghi il modello a tre fasi del riciclaggio di denaro.»",
      question: "Qual è la risposta corretta?",
      options: [
        { key: "A", text: "Guadagnare → Nascondere → Spendere: I proventi delittuosi vengono prima percepiti, poi nascosti su conti anonimi e infine utilizzati per acquisti legali." },
        { key: "B", text: "Placement → Layering → Integration: I fondi criminali vengono immessi, dissimulati attraverso molte transazioni e infine reimmessi nel circuito economico come fondi legali." },
        { key: "C", text: "Deposito → Trasferimento → Prelievo: Il contante viene depositato, trasferito all'estero e prelevato in modo pulito – ogni fase corrisponde a un istituto bancario separato." },
        { key: "D", text: "Conto → Transazione → Chiusura: Il denaro sporco transita attraverso tre conti bancari in diversi paesi ed è considerato riciclato dopo il terzo trasferimento." },
      ],
      feedback:
        "Il modello a tre fasi: 1) Placement (immissione): Il contante proveniente da reati viene introdotto nel sistema finanziario (es. depositi in contanti, società fittizie). 2) Layering (occultamento): Le tracce vengono coperte attraverso molte transazioni, bonifici all'estero, acquisti immobiliari. 3) Integration (integrazione): Il denaro appare come patrimonio pulito nel circuito economico legale. I collaboratori bancari devono riconoscere e segnalare soprattutto la fase 1.",
    },
    "3.1": {
      situation:
        "Segue da 5 anni un cliente con una piccola impresa artigianale. All'improvviso arrivano mensilmente CHF 50'000 sul suo conto – in precedenza il massimo era CHF 8'000. Alla domanda, dice di aver ricevuto un nuovo grande contratto.",
      question: "Quali obblighi ha secondo la LRD?",
      options: [
        { key: "A", text: "Registrare la spiegazione del cliente nel CRM come 'grande contratto confermato' e osservare il comportamento transazionale per 3 mesi. In assenza di ulteriori anomalie, non sono necessarie misure LRD." },
        { key: "B", text: "Aprire un ticket compliance e attendere – il collaboratore interno esamina i fatti e decide autonomamente se è necessaria una segnalazione al MROS. Come consulente, non sono necessarie ulteriori fasi." },
        { key: "C", text: "Bloccare preventivamente il conto e informare il cliente per iscritto dell'esame in corso. Solo dopo il riscontro del cliente con giustificativi la compliance decide sulla continuazione o sulla segnalazione al MROS." },
        { key: "D", text: "Nuova identificazione, chiarimento dell'origine, documentazione – in caso di sospetto, segnalazione al MROS" },
      ],
      feedback:
        "In caso di cambiamenti insoliti nel comportamento transazionale si applicano gli art. 5 e 6 LRD: nuova identificazione e accertamento dell'avente diritto economico nonché obbligo di chiarimento speciale. Se il sospetto si conferma: obbligo di segnalazione al MROS, obbligo di blocco dei valori patrimoniali e divieto di informazione nei confronti del cliente (art. 10a LRD).",
    },
    "3.2": {
      situation:
        "Una persona politicamente esposta (PPE) straniera vuole aprire un conto e depositare CHF 500'000. L'origine dei fondi è sconosciuta.",
      question: "Cosa si applica alle PPE e cosa deve fare?",
      options: [
        { key: "A", text: "Effettuare una verifica KYC normale – il solo stato PPE non è motivo di diligenza rafforzata finché il cliente non ha provate accuse di corruzione." },
        { key: "B", text: "Rifiutare la relazione d'affari in linea di principio – secondo l'art. 6 LRD, le PPE straniere senza cittadinanza UE sono automaticamente classificate come clienti non ammissibili per le banche svizzere." },
        { key: "C", text: "Applicare obblighi di diligenza rafforzata: approvazione della direzione, chiarimento dell'origine dei fondi, monitoraggio ravvicinato" },
        { key: "D", text: "Informare la compliance per e-mail e aprire il conto provvisoriamente – la compliance decide entro 5 giorni lavorativi se si applicano condizioni particolari." },
      ],
      feedback:
        "Le PPE sono soggette a obblighi di diligenza rafforzata secondo l'art. 6 LRD. L'avvio della relazione d'affari necessita tassativamente dell'approvazione della direzione. L'origine dei fondi deve essere documentata in modo esaustivo. La relazione d'affari viene monitorata da vicino. Una PPE non deve essere automaticamente rifiutata – ma lo sforzo è notevolmente maggiore.",
    },
    "3.3": {
      situation:
        "Il Suo collega di lunga data le chiede di dargli brevemente accesso a un conto cliente perché lui stesso non ha accesso in questo momento. Il cliente sarebbe d'accordo.",
      question: "Cosa fa?",
      options: [
        { key: "A", text: "Rifiutare l'accesso – ogni collaboratore può accedere solo ai conti per i quali è autorizzato" },
        { key: "B", text: "Concedere l'accesso – il collega è soggetto allo stesso segreto professionale suo. Uno scambio di accesso temporaneo tra collaboratori bancari è ammissibile nel quadro del diritto organizzativo interno." },
        { key: "C", text: "Concedere l'accesso e registrarlo nel sistema di ticket come 'scambio di accesso temporaneo per motivi operativi' – la documentazione protegge entrambe le parti." },
        { key: "D", text: "Concedere temporaneamente l'accesso e informare brevemente il superiore – se il collega si assume la responsabilità, è coperto dalla protezione dei dati." },
      ],
      feedback:
        "Il principio del need-to-know si applica in modo assoluto. Ogni collaboratore può accedere solo ai dati del cliente per i quali ha un'autorizzazione chiara. L'accesso non autorizzato viola il segreto bancario e la protezione dei dati – indipendentemente dal fatto che il collega sia affidabile o che il cliente fosse d'accordo. Ciò può avere conseguenze penali.",
    },
    "3.4": {
      situation:
        "Ha appena inviato una segnalazione di sospetto riciclaggio di denaro al MROS. Il Suo cliente chiama poco dopo e le chiede direttamente: «Ha segnalato qualcosa su di me?»",
      question: "Cosa fa?",
      options: [
        { key: "A", text: "Rispondere onestamente al cliente – la trasparenza è un valore fondamentale della banca. Come persona interessata, ha il diritto di conoscere una segnalazione." },
        { key: "B", text: "Rispondere in modo evasivo: «Non c'è nulla di particolare» – una bugia diretta è vietata, ma può aggirare la verità senza violare la legge." },
        { key: "C", text: "Non informare il cliente e aggirare la domanda – il divieto di informazione secondo l'art. 10a LRD vieta qualsiasi divulgazione della segnalazione o dell'indagine in corso." },
        { key: "D", text: "Notificare immediatamente la compliance e terminare la conversazione – la chiamata potrebbe essere un tentativo di influenzare l'indagine." },
      ],
      feedback:
        "Art. 10a LRD: divieto assoluto di informazione ('tipping-off'). Dopo una segnalazione al MROS, né la segnalazione né l'indagine in corso possono essere divulgate al cliente. Né direttamente né indirettamente, né oralmente né per iscritto. Scopo: impedire la fuga del sospettato o la distruzione delle prove. In caso di violazione, il collaboratore bancario rischia conseguenze penali.",
    },
    "3.5": {
      situation:
        "Una società con sede nelle Isole Cayman vuole aprire un conto. Il rappresentante autorizzato (avvocato di Zurigo) spiega che i veri proprietari sono due privati di cui non può facilmente rivelare i nomi.",
      question: "Cosa deve fare?",
      options: [
        { key: "A", text: "Aprire il conto con l'avvocato come contraente – in quanto rappresentante autorizzato, porta la piena responsabilità giuridica della società. I soggetti dietro non devono essere identificati." },
        { key: "B", text: "Il modulo K (società domiciliare) e il modulo A (aventi diritto economici) devono essere compilati obbligatoriamente. I veri aventi diritto economici devono essere identificati nominativamente – senza queste informazioni l'apertura di un conto non è possibile." },
        { key: "C", text: "Aprire il conto provvisoriamente e dare all'avvocato 30 giorni per nominare i proprietari. Nel frattempo sono consentiti solo i depositi, non i prelievi." },
        { key: "D", text: "Informare la compliance e aprire il conto senza modulo A – l'avvocato è soggetto al segreto professionale che lo esenta dalla divulgazione dei suoi mandanti." },
      ],
      feedback:
        "Società domiciliare (società cassetta delle lettere senza attività operativa nella sede): il modulo K è obbligatorio. Si aggiunge il modulo A per registrare nominativamente gli aventi diritto economici. Senza identificazione completa dei soggetti dietro, il conto non può essere aperto – indipendentemente dal fatto che il rappresentante sia un avvocato. Il segreto professionale dell'avvocato non esenta la banca dagli obblighi LRD.",
    },
    "3.6": {
      situation:
        "Il Suo cliente aziendale, un importatore-esportatore di tessili, effettua più volte al mese bonifici in EUR a controparti in paesi ad alto rischio LRD. Gli importi delle fatture variano fortemente (CHF 8'000–150'000), ma le quantità e qualità consegnate non corrispondono ai prezzi fatturati secondo i dati del settore.",
      question: "Cosa descrive questo schema e cosa deve fare?",
      options: [
        { key: "A", text: "Niente – le attività di import-export sono per loro natura legittime e le fluttuazioni dei prezzi sono normali sul mercato" },
        { key: "B", text: "Trade-Based Money Laundering (TBML): la sovra o sotto-fatturazione dissimula i flussi finanziari. Obbligo di chiarimento rafforzato, verifica di plausibilità delle fatture commerciali con i prezzi di mercato, informare la compliance." },
        { key: "C", text: "Verificare solo se un importo supera CHF 100'000 – al di sotto non è necessario alcun chiarimento particolare" },
        { key: "D", text: "Chiedere per iscritto al cliente di consegnare tutte le fatture degli ultimi 2 anni" },
      ],
      feedback:
        "Il Trade-Based Money Laundering (TBML) è uno dei metodi di riciclaggio più complessi: i criminali dissimulano i flussi finanziari attraverso la sovra o sotto-fatturazione nelle transazioni commerciali. Segnali d'allarme: i prezzi delle fatture si discostano fortemente dai prezzi di mercato, controparti in paesi ad alto rischio, frequenti fluttuazioni senza ragione di mercato riconoscibile. L'art. 6 LRD obbliga a un chiarimento speciale – indipendentemente dalla soglia. Coinvolgere la compliance e se del caso il MROS.",
    },
    "3.7": {
      situation:
        "Un cliente privato vuole depositare CHF 80'000. Spiega di aver venduto dei bitcoin. Presenta uno screenshot del suo exchange di criptovalute come prova dell'origine, ma non riesce a spiegare da dove provenissero i bitcoin acquistati originariamente.",
      question: "Cosa si applica ai virtual asset e come procede?",
      options: [
        { key: "A", text: "Rifiutare il deposito – le criptovalute non sono riconosciute in Svizzera come fonte legittima" },
        { key: "B", text: "Lo screenshot basta – l'exchange ha già effettuato il KYC, quindi il denaro è pulito" },
        { key: "C", text: "Diligenza rafforzata: chiarire l'origine dei bitcoin (acquisto? mining? donazione?), far verificare la cronologia delle transazioni sulla blockchain (compliance/strumenti esterni), dimostrare la fonte dei fondi fiat d'origine. Lo screenshot da solo non è sufficiente." },
        { key: "D", text: "Accettare al massimo CHF 15'000 – per importi superiori non esiste una base giuridica per le criptovalute" },
      ],
      feedback:
        "I virtual asset (VA) sono soggetti alla LRD dal 2020. Uno screenshot di un exchange di criptovalute dimostra solo la vendita, non l'origine dei bitcoin. Domande: i BTC sono stati acquistati originariamente con fondi fiat legali? Quando e dove? Ci sono state transazioni tramite indirizzi del darknet o mixer? La compliance può utilizzare strumenti di analisi blockchain (Chainalysis, Elliptic). La Circ. FINMA 2016/7 e gli standard GAFI sui virtual asset si applicano. In caso di origine sconosciuta: EDD, nessun deposito senza documentazione completa.",
    },
    "3.8": {
      situation:
        "Il cliente privato di lunga data Hanspeter Müller (53 anni, impiegato) viene eletto alle prossime elezioni del Consiglio comunale e assumerà la carica tra 3 mesi. Lei viene a saperlo tramite un articolo di giornale.",
      question: "Quali obblighi KYC nascono ora?",
      options: [
        { key: "A", text: "Niente – il cliente è svizzero, non una PPE straniera. I politici comunali nazionali non sono considerati PPE secondo la LRD." },
        { key: "B", text: "Bloccare il conto fino all'assunzione ufficiale della carica, poi rivalutare" },
        { key: "C", text: "Aggiornamento dello stato: un Consigliere comunale svizzero è una PPE nazionale (PPEi) secondo la LRD rivista. Verificare la classificazione dei rischi, in caso di patrimonio o transazioni elevati: avviare una EDD. Aggiornare il dossier." },
        { key: "D", text: "Inviare una lettera al cliente e chiedergli le sue future attività" },
      ],
      feedback:
        "Dalla revisione della LRD 2016 (in vigore 2020), la nozione di PPE si applica anche alle persone politicamente esposte nazionali (PPEi). I politici comunali di una certa importanza possono rientrarvit. Obbligo: aggiornare immediatamente il dossier al cambiamento di stato, verificare la classificazione dei rischi, se del caso EDD. La banca deve monitorare proattivamente i cambiamenti di stato PPE (monitoraggio dei media, controllo periodico). Il cliente deve essere informato delle nuove esigenze KYC.",
    },
    "3.9": {
      situation:
        "Tramite una holding SA in Svizzera (unico azionista: una società BVI, il cui proprietario è a sua volta una fondazione alle Seychelles), CHF 5 mio. devono essere trasferiti su un conto svizzero. Nessuno scopo economico riconoscibile della struttura.",
      question: "Qual è la sfida principale e come procede?",
      options: [
        { key: "A", text: "Aprire il conto – tutte le giurisdizioni menzionate sono legali e la holding svizzera è regolarmente registrata" },
        { key: "B", text: "Compilare il modulo K per la holding svizzera – è sufficiente" },
        { key: "C", text: "Identificare gli aventi diritto economici dell'intera struttura fino alla persona fisica (principio di trasparenza). Modulo A per ogni livello. Senza identificazione della persona avente diritto economico: nessun conto." },
        { key: "D", text: "La compliance contatta direttamente la fondazione delle Seychelles – è legalmente responsabile" },
      ],
      feedback:
        "Le strutture societarie nidificate sono un mezzo classico di dissimulazione dei valori patrimoniali. Il principio di trasparenza secondo la LRD e la CDB richiede che la banca penetri attraverso tutti i livelli fino alla persona fisica (avente diritto economico). Il modulo A deve essere firmato a ogni livello da una persona fisica identificabile. Le strutture BVI e Seychelles senza scopo economico riconoscibile sono considerate strutture ad alto rischio. Senza trasparenza completa: nessuna apertura di conto.",
    },
    "3.10": {
      situation:
        "Un giovane uomo, 24 anni, studente, apre un conto e poco dopo effettua un bonifico di CHF 500 a 12 destinatari diversi in 3 paesi diversi. Gli importi sono piccoli, ma uno dei paesi di destinazione figura nella lista GAFI con un rischio elevato di finanziamento del terrorismo. Sui social media, la compliance trova indizi di dichiarazioni estremiste.",
      question: "In cosa il finanziamento del terrorismo si differenzia dal classico riciclaggio di denaro e cosa fa?",
      options: [
        { key: "A", text: "Niente – importi inferiori a CHF 1'000 sono troppo piccoli per il finanziamento del terrorismo" },
        { key: "B", text: "Solo una segnalazione al MROS – come per il riciclaggio di denaro" },
        { key: "C", text: "Informare immediatamente il MROS (finanziamento del terrorismo), bloccare il conto. Importante: il finanziamento del terrorismo non conosce un importo minimo – piccoli importi possono causare grandi danni. Il Servizio delle attività informative della Confederazione (SIC) può essere informato anch'esso." },
        { key: "D", text: "La ricerca sui social media non è un indizio KYC valido – nessuna misura" },
      ],
      feedback:
        "Il finanziamento del terrorismo (FT) si differenzia fondamentalmente dal riciclaggio di denaro: con la LRD si tratta dell'origine (riciclare fondi illegali). Con il FT si tratta dello scopo (utilizzare fondi legali o illegali per scopi terroristici). Piccoli importi possono bastare (es. spese di viaggio, equipaggiamento). L'art. 9 LRD si applica al FT allo stesso modo che al riciclaggio. In caso di sospetto concreto: segnalazione immediata al MROS, obbligo di blocco, divieto di informazione. Il SIC può essere coinvolto in aggiunta. Gli indizi sui social media sono indicatori validi.",
    },
  },
};
