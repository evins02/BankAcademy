import type { LangTranslations } from "./utils";

export const KOE_L3_TRANSLATIONS: LangTranslations = {
  fr: {
    "l3-gemeinschaftskonto": {
      title: "Compte joint – Couple Berger",
      briefing:
        "Le couple Stefan et Maria Berger (tous deux citoyens suisses, tous deux présents) souhaite ouvrir un compte privé commun. Ils souhaitent que chacun puisse disposer du compte seul, sans que l'autre ait à cosigner.",
      generalFeedback:
        "Pour un compte joint : contrat de base + identification INDIVIDUELLE des DEUX titulaires (carte d'identité + déclaration personnelle FATCA pour chacun). En plus : formulaire A une fois par compte (VSB 20). La réglementation de signature suit le souhait du client – ici signature individuelle. La signature collective serait incorrecte, car le couple souhaite expressément pouvoir disposer du compte individuellement.",
      documents: [
        { id: "basisvertrag", label: "Contrat de base", feedbackSelected: "Correct – le contrat de base régit la relation d'affaires et est obligatoire à chaque ouverture de compte.", feedbackNotSelected: "Erreur : le contrat de base est le document fondamental de toute ouverture de compte et ne doit pas manquer." },
        { id: "ausweis-stefan", label: "Carte d'identité / passeport de Stefan Berger", feedbackSelected: "Correct – les deux titulaires du compte doivent être identifiés individuellement.", feedbackNotSelected: "Erreur : Stefan Berger doit être identifié." },
        { id: "ausweis-maria", label: "Carte d'identité / passeport de Maria Berger", feedbackSelected: "Correct – les deux titulaires du compte doivent être identifiés individuellement.", feedbackNotSelected: "Erreur : Maria Berger doit être identifiée." },
        { id: "eigenerklarung-stefan", label: "Déclaration personnelle FATCA (personne physique) – Stefan Berger", feedbackSelected: "Correct – la clarification FATCA est requise séparément pour chaque titulaire de compte.", feedbackNotSelected: "Erreur : la clarification FATCA pour Stefan Berger est manquante." },
        { id: "eigenerklarung-maria", label: "Déclaration personnelle FATCA (personne physique) – Maria Berger", feedbackSelected: "Correct – la clarification FATCA est requise séparément pour chaque titulaire de compte.", feedbackNotSelected: "Erreur : la clarification FATCA pour Maria Berger est manquante." },
        { id: "formular-a", label: "Formulaire A (ayant droit économique, VSB 20)", feedbackSelected: "Correct – le formulaire A est établi une fois par compte et documente les deux ayants droit économiques.", feedbackNotSelected: "Erreur : le formulaire A (VSB 20) est également obligatoire pour le compte joint – un formulaire pour les deux titulaires." },
        { id: "einzel-vereinbarung", label: "Convention de signature individuelle (chacun dispose seul)", feedbackSelected: "Correct – correspond au souhait du couple : les deux peuvent disposer seuls.", feedbackNotSelected: "Erreur : le couple souhaite la signature individuelle – cette convention est obligatoire." },
        { id: "kollektiv-vereinbarung", label: "Convention de signature collective (les deux doivent cosigner)", feedbackSelected: "Erreur : le couple souhaite expressément la signature individuelle. La signature collective est contraire au souhait du client.", feedbackNotSelected: "Correct – la signature collective ne correspond pas au souhait du client." },
        { id: "wohnsitzbestatigung", label: "Attestation de domicile", feedbackSelected: "Bien – la preuve du domicile est recommandée.", feedbackNotSelected: "Acceptable – pas obligatoire pour une clientèle connue." },
        { id: "heiratszeugnis", label: "Acte de mariage", feedbackSelected: "Utile – confirme la relation entre les titulaires.", feedbackNotSelected: "Acceptable – pas obligatoire pour l'ouverture de compte." },
        { id: "nur-ein-ausweis", label: "Copier un seul document d'identité (p. ex. uniquement Stefan)", feedbackSelected: "Erreur : pour le compte joint, les DEUX titulaires doivent être identifiés.", feedbackNotSelected: "Correct – les deux doivent être identifiés." },
        { id: "nur-eine-eigenerklarung", label: "Remplir une seule déclaration personnelle (pour les deux)", feedbackSelected: "Erreur : la LBA exige une déclaration personnelle par ayant droit économique.", feedbackNotSelected: "Correct – chaque personne a besoin d'une déclaration personnelle séparée." },
      ],
    },
    "l3-ausweis-trickfall-mcq": {
      title: "Cas piège : carte d'identité expirée depuis 5 jours",
      briefing:
        "Nous sommes le 20.06.2026. M. Novak présente sa carte d'identité. Vous vérifiez la date d'expiration : 15.06.2026 – soit exactement 5 jours d'expiration. M. Novak argumente : «C'est presque encore valide, seulement 5 jours ! La photo est toujours la même.»",
      today: "20.06.2026",
      question: "Qu'est-ce qui est correct sur le plan juridique et selon la LBA ?",
      options: [
        { key: "A", text: "La carte d'identité est encore valable 30 jours après la date d'expiration – donc acceptable." },
        { key: "B", text: "La carte d'identité est invalide. Le compte ne peut pas être ouvert. Inviter M. Novak à renouveler sa pièce d'identité." },
        { key: "C", text: "Si moins de 3 mois se sont écoulés depuis l'expiration, la banque peut accorder une exception à sa discrétion." },
        { key: "D", text: "Avec une copie de la date d'expiration et une autorisation écrite de la compliance, la carte d'identité est encore utilisable." },
      ],
      feedback:
        "La LBA ne prévoit aucun délai de tolérance pour les documents d'identification expirés. 1 jour ou 1 an ne fait aucune différence : une pièce d'identité expirée n'est pas un moyen d'identification valable. M. Novak doit renouveler sa pièce d'identité auprès de l'office de la population / du bureau des passeports, puis revenir.",
      feedbackPerOption: {
        A: "Incorrect – il n'existe pas de délai de tolérance de 30 jours en droit suisse ou dans la LBA.",
        B: "Correct – la LBA ne connaît pas de délais de tolérance. Une pièce d'identité expirée est invalide, quelle que soit la durée d'expiration.",
        C: "Incorrect – il n'existe aucune réglementation d'exception interne ou externe pour les pièces «presque expirées».",
        D: "Incorrect – ni une copie ni une autorisation de la compliance ne peut rendre valide un document invalide.",
      },
    },
    "l3-hochrisiko-pep": {
      title: "Haut risque : PPE étranger",
      briefing:
        "M. Okeke (55 ans) du Nigeria souhaite ouvrir un compte privé. Il se décrit comme un «homme d'affaires entretenant des liens étroits avec le gouvernement nigérian». Il souhaite déposer USD 480'000 provenant d'un «accord commercial» et devient impatient face aux questions.",
      generalFeedback:
        "Le Nigeria est un pays à risque selon le GAFI. Des liens avec le gouvernement = vérification PPE obligatoire. Pour USD 480'000 provenant d'un «accord» inconnu : formulaire EDD + preuve complète de l'origine des fonds + approbation de la hiérarchie. Le compte ne peut être ouvert qu'après une vérification positive complète.",
      documents: [
        { id: "basisvertrag", label: "Contrat de base", feedbackSelected: "Correct – le contrat de base régit la relation d'affaires et est obligatoire à chaque ouverture de compte.", feedbackNotSelected: "Erreur : le contrat de base est le document fondamental de toute ouverture de compte et ne doit pas manquer." },
        { id: "reisepass-international", label: "Passeport (valable à l'international)", feedbackSelected: "Correct – document d'identification principal.", feedbackNotSelected: "Erreur : l'identification est obligatoire." },
        { id: "eigenerklarung-np", label: "Déclaration personnelle FATCA (personne physique)", feedbackSelected: "Correct – la clarification FATCA est obligatoire à chaque ouverture de compte.", feedbackNotSelected: "Erreur : ne pas oublier la clarification FATCA." },
        { id: "formular-a", label: "Formulaire A (ayant droit économique, VSB 20)", feedbackSelected: "Correct – le formulaire A est obligatoire, particulièrement critique en cas de suspicion de PPE.", feedbackNotSelected: "Erreur : le formulaire A (VSB 20) est toujours obligatoire – particulièrement important en cas de suspicion de PPE." },
        { id: "wohnsitzbestatigung", label: "Justificatif d'adresse / attestation de domicile", feedbackSelected: "Correct.", feedbackNotSelected: "Erreur : un justificatif d'adresse est nécessaire." },
        { id: "pep-pruefung", label: "Effectuer la vérification PPE (Personne Politiquement Exposée)", feedbackSelected: "Correct – les liens mentionnés avec le gouvernement = suspicion de PPE, la vérification est obligatoire.", feedbackNotSelected: "Erreur grave : les liens avec le gouvernement déclenchent l'obligation de vérification PPE." },
        { id: "herkunft-gelder", label: "Preuve de l'origine des fonds (par écrit, documentée)", feedbackSelected: "Correct – USD 480'000 nécessite une documentation complète de l'origine des fonds.", feedbackNotSelected: "Erreur grave : pour des dépôts importants en provenance de pays à risque, la preuve d'origine est obligatoire." },
        { id: "edd-formular", label: "Remplir le formulaire de diligence renforcée (EDD)", feedbackSelected: "Correct – le Nigeria est un pays à risque GAFI + statut PPE = EDD obligatoire.", feedbackNotSelected: "Erreur : l'EDD est obligatoire pour les PPE et les pays à haut risque (Nigeria / GAFI)." },
        { id: "genehmigung-vorgesetzte", label: "Obtenir l'approbation d'un supérieur hiérarchique", feedbackSelected: "Correct – les comptes PPE doivent être approuvés par une instance supérieure (direction générale).", feedbackNotSelected: "Erreur : les comptes PPE nécessitent l'approbation d'un supérieur, pas seulement du conseiller clientèle." },
        { id: "konto-normal-eroeffnen", label: "Ouvrir le compte avec le processus standard", feedbackSelected: "Erreur grave : le processus standard pour PPE + pays à haut risque + USD 480k constitue une violation de la LBA.", feedbackNotSelected: "Correct – le processus standard est totalement insuffisant ici." },
        { id: "sofort-ablehnen", label: "Refuser le compte immédiatement et sans examen", feedbackSelected: "Erreur : un refus global n'est pas correct. Procéder d'abord à une vérification complète, puis décider.", feedbackNotSelected: "Correct – un refus sans examen n'est pas la bonne réaction." },
        { id: "pass-allein-reicht", label: "Le passeport seul suffit – l'identification standard est suffisante", feedbackSelected: "Erreur : pour un PPE dans un pays à haut risque, le passeport seul ne suffit pas. EDD, preuve d'origine et approbation de la hiérarchie sont en plus obligatoires.", feedbackNotSelected: "Correct – le passeport seul est loin d'être suffisant dans ce cas." },
      ],
    },
    "l3-us-staatsbuerger-mcq": {
      title: "Cas piège : double nationalité CH / USA",
      briefing:
        "M. Thompson (42 ans) souhaite ouvrir un compte privé. Il présente son passeport suisse ainsi que son passeport américain. À la question FATCA, il répond : «Je vis et paie mes impôts exclusivement en Suisse. Je suis Suisse – le sujet FATCA ne me concerne pas.»",
      question: "Qu'est-ce qui est correct du point de vue FATCA ?",
      options: [
        { key: "A", text: "M. Thompson a raison : comme il est assujetti à l'impôt en Suisse et n'a pas de domicile aux États-Unis, il n'est pas une personne américaine au sens de FATCA." },
        { key: "B", text: "Il reçoit la déclaration personnelle FATCA standard pour personnes physiques – comme tout autre client suisse." },
        { key: "C", text: "M. Thompson est une personne américaine (US Citizen) selon FATCA. La banque doit enregistrer son numéro d'identification fiscale américain (TIN) et déclarer le compte à l'IRS – indépendamment du lieu de domicile ou de l'obligation fiscale en Suisse." },
        { key: "D", text: "FATCA s'applique uniquement aux titulaires de carte verte (Resident Aliens), pas aux citoyens américains possédant en plus un passeport suisse." },
      ],
      feedback:
        "FATCA (Foreign Account Tax Compliance Act) définit les «US Persons» selon la nationalité – et non selon le domicile ou l'obligation fiscale. Tout citoyen américain est une US Person dans le monde entier. La banque suisse doit déclarer le compte à l'IRS, et M. Thompson doit indiquer son US-TIN. La déclaration personnelle FATCA standard ne suffit pas – les US Citizens font l'objet d'un processus séparé.",
      feedbackPerOption: {
        A: "Incorrect – FATCA se base sur la nationalité, non sur le domicile ou l'obligation fiscale. Un citoyen américain reste une US Person, où qu'il vive.",
        B: "Incorrect – la déclaration personnelle standard pour personnes physiques ne suffit pas pour une US Person. Une US Person doit être déclarée comme telle (TIN américain requis, obligation de déclaration à l'IRS).",
        C: "Correct – citoyenneté américaine = US Person = obligation totale de déclaration FATCA, indépendamment du passeport suisse.",
        D: "Incorrect – les US Persons comprennent : les citoyens américains (nationalité, indépendamment du domicile), les titulaires de carte verte (Resident Aliens) et les personnes remplissant le Substantial Presence Test.",
      },
    },
    "l3-selbstaendiger-privatkonto": {
      title: "Indépendant – ouverture d'un compte privé",
      briefing:
        "M. Bauer (38 ans) est freelance en informatique (entreprise individuelle, pas d'inscription au RC). Il souhaite ouvrir un compte privé pour ses dépenses personnelles – loyer, courses, loisirs. Il possède déjà un compte professionnel dans une autre banque. Il est citoyen suisse et présente son passeport suisse. Ses revenus sont plausibles et stables. Pas de caractéristiques de risque particulières.",
      generalFeedback:
        "Le point d'apprentissage central : un indépendant (entreprise individuelle) est toujours une personne physique – sur le plan fiscal et au sens de la LBA. Pour son compte privé, les mêmes règles s'appliquent que pour tout autre client privé suisse. Pas d'extrait du RC, pas de bilan, et surtout : déclaration personnelle FATCA pour «personne physique» – pas pour «personne morale». C'est le piège classique.",
      documents: [
        { id: "basisvertrag", label: "Contrat de base", feedbackSelected: "Correct – document de base de toute ouverture de compte.", feedbackNotSelected: "Erreur : le contrat de base est toujours requis." },
        { id: "ausweis-ch", label: "Carte d'identité / passeport suisse valable", feedbackSelected: "Correct – l'identification est obligatoire.", feedbackNotSelected: "Erreur : l'identification du titulaire du compte est obligatoire." },
        { id: "eigenerklarung-np", label: "Déclaration personnelle FATCA (personne physique)", feedbackSelected: "Correct – M. Bauer est une personne physique en tant qu'entrepreneur individuel. La déclaration personnelle pour personnes physiques est correcte.", feedbackNotSelected: "Erreur : la clarification FATCA est obligatoire – même pour les indépendants en tant que personnes physiques." },
        { id: "formular-a", label: "Formulaire A (ayant droit économique, VSB 20)", feedbackSelected: "Correct – le formulaire A est également obligatoire pour l'indépendant.", feedbackNotSelected: "Erreur : le formulaire A (VSB 20) est obligatoire à chaque ouverture de compte." },
        { id: "eigenerklarung-jur-fatca", label: "Déclaration personnelle FATCA (personne morale)", feedbackSelected: "Erreur grave : M. Bauer est entrepreneur individuel = personne physique. La déclaration FATCA pour personnes morales ne s'applique qu'aux Sàrl, SA, coopératives, etc. – pas aux entreprises individuelles.", feedbackNotSelected: "Correct – les entrepreneurs individuels sont des personnes physiques, la déclaration pour personnes morales est incorrecte." },
        { id: "hr-auszug", label: "Extrait du registre du commerce", feedbackSelected: "Erreur : aucun extrait du RC n'est nécessaire pour un compte privé. De plus, les entreprises individuelles avec un chiffre d'affaires inférieur à CHF 100'000 ne sont pas tenues de s'inscrire.", feedbackNotSelected: "Correct – aucun extrait du RC requis pour un compte privé." },
        { id: "jahresabschluss", label: "Exiger les comptes annuels / bilan", feedbackSelected: "Erreur : aucun bilan n'est requis pour un compte privé sans demande de crédit – même pour les indépendants.", feedbackNotSelected: "Correct – aucun bilan nécessaire pour un simple compte privé." },
        { id: "herkunft-vermoegen", label: "Preuve de l'origine de la fortune (EDD)", feedbackSelected: "Erreur : aucune caractéristique de risque détectable – freelance informatique ordinaire sans dépôts suspects. Aucun EDD requis.", feedbackNotSelected: "Correct – pas de risque accru, pas d'EDD." },
      ],
    },
    "l3-wirtschaftlich-berechtigter-dritter": {
      title: "Cas piège : l'ayant droit économique est un tiers",
      briefing:
        "M. Meier souhaite ouvrir un compte privé. À la question standard «Agissez-vous pour votre propre compte ?», il répond : «Non – le compte est pour mon frère Bruno. Bruno vit à Dubaï et ne peut pas venir en personne. Je gère le compte pour lui.»",
      question: "Quelle est la procédure correcte selon VSB 20 / LBA ?",
      options: [
        { key: "A", text: "M. Meier signe tout en tant que titulaire du compte – le formulaire A est établi à son nom. Bruno n'a pas à être enregistré." },
        { key: "B", text: "Le compte ne peut pas être ouvert : Bruno doit se présenter en personne et s'identifier." },
        { key: "C", text: "M. Meier ouvre le compte en tant que cocontractant, mais la banque enregistre Bruno via le formulaire A comme ayant droit économique (nom, date de naissance, nationalité, adresse). Comme Bruno vit à Dubaï, une vigilance accrue est de rigueur." },
        { key: "D", text: "Le compte est ouvert directement au nom de Bruno – M. Meier reçoit une procuration." },
      ],
      feedback:
        "VSB 20 art. 4 : si le cocontractant déclare ne pas agir pour son propre compte, la banque doit enregistrer l'ayant droit économique via le formulaire A. Bruno n'a pas à se présenter en personne, mais il est entièrement documenté. Dubaï / EAU est considéré comme une place financière à risque – une vérification de diligence complémentaire selon l'art. 6 LBA est appropriée.",
      feedbackPerOption: {
        A: "Incorrect – si le cocontractant déclare agir pour le compte d'un tiers, le formulaire A ne peut pas être établi au nom du cocontractant. Ce serait une déclaration incorrecte de l'ayant droit économique.",
        B: "Incorrect – l'ayant droit économique n'a pas à se présenter en personne. Ses informations sont déclarées par le cocontractant via le formulaire A et documentées par la banque.",
        C: "Correct – M. Meier est le cocontractant (titulaire du compte), Bruno est l'ayant droit économique selon le formulaire A. L'adresse aux EAU augmente le profil de risque et nécessite une vérification complémentaire.",
        D: "Incorrect – le compte est ouvert au nom du cocontractant (M. Meier), pas de l'ayant droit économique. Bruno peut recevoir séparément une procuration, mais n'est pas titulaire du compte.",
      },
    },
    "l3-doppelbuerger-fatca": {
      title: "Double nationalité CH/USA – documentation complémentaire FATCA",
      briefing:
        "Mme Wagner (29 ans) souhaite ouvrir un compte privé. Elle présente son passeport suisse. Lors de la clarification FATCA, elle indique ouvertement qu'elle est née à Boston (USA) et qu'elle a déménagé en Suisse avec ses parents étant enfant. Elle possède toujours la nationalité américaine, mais vit exclusivement en Suisse depuis plus de 25 ans.",
      generalFeedback:
        "FATCA définit la «US Person» par la nationalité ou le lieu de naissance, pas par le domicile. Même quelqu'un qui vit exclusivement en Suisse depuis des décennies et ne présente que son passeport suisse reste soumis à FATCA s'il est né aux USA : le formulaire W-9 avec le TIN américain et la désignation interne pour le reporting IRS sont obligatoires en plus de la déclaration personnelle standard. Un refus global n'est pas la bonne approche.",
      documents: [
        { id: "basisvertrag", label: "Contrat de base", feedbackSelected: "Correct – le contrat de base régit la relation d'affaires et est obligatoire à chaque ouverture de compte.", feedbackNotSelected: "Erreur : le contrat de base est le document fondamental de toute ouverture de compte et ne doit pas manquer." },
        { id: "ausweis-ch", label: "Carte d'identité / passeport suisse valable", feedbackSelected: "Correct – document d'identification principal selon la LBA.", feedbackNotSelected: "Erreur : une identification avec une pièce d'identité valable est obligatoire." },
        { id: "eigenerklarung-np", label: "Déclaration personnelle FATCA (personne physique)", feedbackSelected: "Correct – la déclaration FATCA de base est toujours la première étape ; elle révèle ici que Mme Wagner, née aux USA, est une US Person.", feedbackNotSelected: "Erreur : sans la déclaration FATCA de base, le statut de US Person ne serait pas détecté." },
        { id: "formular-a", label: "Formulaire A (ayant droit économique, VSB 20)", feedbackSelected: "Correct – le formulaire A est obligatoire indépendamment du statut FATCA à chaque ouverture de compte.", feedbackNotSelected: "Erreur : le formulaire A (VSB 20) est obligatoire à chaque ouverture de compte." },
        { id: "w9-formular", label: "Formulaire W-9 / enregistrement du numéro d'identification fiscale américain (TIN)", feedbackSelected: "Correct – en tant que US Person (née aux USA), Mme Wagner doit indiquer son TIN américain indépendamment de son lieu de domicile ; le formulaire W-9 le documente.", feedbackNotSelected: "Erreur grave : la nationalité américaine déclenche l'obligation d'enregistrement du TIN américain indépendamment du domicile." },
        { id: "us-person-kennzeichnung", label: "Désigner le compte en interne comme US Person (préparer le reporting FATCA à l'IRS)", feedbackSelected: "Correct – les comptes de US Persons doivent être déclarés à l'IRS (obligation de reporting FATCA de la banque suisse).", feedbackNotSelected: "Erreur : sans désignation interne en tant que US Person, l'obligation de déclaration annuelle à l'IRS est violée." },
        { id: "geburtsort-ignorieren", label: "Ne pas mentionner le lieu de naissance aux USA dans le système, car la cliente ne présente que son passeport suisse", feedbackSelected: "Violation grave de FATCA : le lieu de naissance aux USA fait de Mme Wagner une US Person indépendamment du passeport présenté – le dissimuler viole l'obligation de diligence FATCA de la banque.", feedbackNotSelected: "Correct – le lieu de naissance doit toujours être enregistré et évalué." },
        { id: "konto-ablehnen-us-person", label: "Refuser l'ouverture du compte parce que la cliente est citoyenne américaine", feedbackSelected: "Erreur : une nationalité américaine n'est pas un motif de refus automatique. La documentation FATCA complète est correcte, pas le refus global.", feedbackNotSelected: "Correct – pas de refus global, mais une documentation correcte." },
        { id: "eigenerklarung-jur-fatca", label: "Déclaration personnelle FATCA (personne morale)", feedbackSelected: "Erreur : Mme Wagner est une personne physique – la déclaration pour personnes morales est incorrecte ici.", feedbackNotSelected: "Correctement non sélectionné – non applicable à une personne physique." },
        { id: "handelsregister", label: "Extrait du registre du commerce", feedbackSelected: "Erreur : les extraits du RC ne sont pertinents que pour les clients professionnels.", feedbackNotSelected: "Correct – sans pertinence pour les particuliers." },
        { id: "jahresabschluss", label: "Comptes annuels / bilan", feedbackSelected: "Erreur : applicable uniquement aux comptes professionnels et commerciaux.", feedbackNotSelected: "Correct – non applicable pour un compte privé." },
        { id: "pep-formular", label: "Formulaire de vérification PPE", feedbackSelected: "Erreur : aucune indication de statut politiquement exposé.", feedbackNotSelected: "Correct – aucun statut PPE détectable." },
        { id: "herkunft-vermoegen", label: "Preuve de l'origine de la fortune", feedbackSelected: "Erreur : pas de risque LBA accru détectable – l'obligation FATCA est indépendante d'un risque lié à la fortune.", feedbackNotSelected: "Correct – cas standard sans caractéristiques de risque LBA, pas d'EDD nécessaire." },
      ],
    },
    "l3-vorsorgeauftrag": {
      title: "Mandat pour cause d'inaptitude – agir pour une personne incapable de discernement",
      briefing:
        "Mme Bucher présente un mandat pour cause d'inaptitude par lequel son oncle, M. Wyss (79 ans), l'a désignée comme mandataire. M. Wyss est incapable de discernement depuis un AVC il y a quatre mois. Mme Bucher présente également une confirmation de l'Autorité de protection de l'enfant et de l'adulte (APEA) concernant l'entrée en vigueur du mandat et souhaite ouvrir un nouveau compte d'épargne pour M. Wyss.",
      generalFeedback:
        "Un mandat pour cause d'inaptitude (art. 360 ss CC) est une disposition privée préventive pour le cas d'incapacité de discernement. Il n'entre cependant en vigueur que lorsque l'APEA constate l'incapacité de discernement et confirme la validité du mandat – la banque ne peut alors reconnaître la mandataire comme représentante qu'à partir de ce moment. Le titulaire du compte incapable de discernement reste partie contractante, mais ne signe plus lui-même ; la mandataire agit en son nom.",
      documents: [
        { id: "vorsorgeauftrag", label: "Mandat pour cause d'inaptitude (original ou copie certifiée conforme)", feedbackSelected: "Correct – le mandat pour cause d'inaptitude définit qui peut agir en cas d'incapacité de discernement.", feedbackNotSelected: "Erreur : sans le mandat pour cause d'inaptitude lui-même, l'étendue des pouvoirs de représentation ne peut pas être vérifiée." },
        { id: "kesb-wirksamkeitsbestaetigung", label: "Confirmation de l'APEA concernant l'entrée en vigueur du mandat pour cause d'inaptitude", feedbackSelected: "Correct – un mandat pour cause d'inaptitude n'entre en vigueur que lorsque l'APEA le confirme formellement (art. 360 ss CC). Sans cette confirmation, la banque ne peut pas reconnaître Mme Bucher comme représentante.", feedbackNotSelected: "Erreur grave : le mandat pour cause d'inaptitude seul ne suffit pas – l'APEA doit confirmer formellement son entrée en vigueur avant que la banque puisse le reconnaître." },
        { id: "ausweis-bucher", label: "Carte d'identité / passeport de Mme Bucher (mandataire)", feedbackSelected: "Correct – l'identité de la mandataire agissante doit être vérifiée.", feedbackNotSelected: "Erreur : Mme Bucher doit être identifiée en tant que représentante agissante." },
        { id: "ausweis-wyss", label: "Carte d'identité / passeport de M. Wyss (titulaire du compte)", feedbackSelected: "Correct – M. Wyss reste titulaire du compte et doit être identifié, même s'il ne peut pas agir lui-même.", feedbackNotSelected: "Erreur : même en cas de représentation, le titulaire du compte doit être identifié." },
        { id: "basisvertrag", label: "Contrat de base (signé par Mme Bucher en tant que mandataire)", feedbackSelected: "Correct – le contrat de base est obligatoire à chaque ouverture de compte.", feedbackNotSelected: "Erreur : le contrat de base est le document fondamental de toute ouverture de compte et ne doit pas manquer." },
        { id: "formular-a", label: "Formulaire A (ayant droit économique, VSB 20)", feedbackSelected: "Correct – le formulaire A est également obligatoire en cas de représentation par une mandataire.", feedbackNotSelected: "Erreur : le formulaire A (VSB 20) est obligatoire à chaque ouverture de compte." },
        { id: "eigenerklarung-np", label: "Déclaration personnelle FATCA (personne physique) – pour M. Wyss, signée par la mandataire", feedbackSelected: "Correct – la clarification FATCA est obligatoire ; la mandataire signe à la place de M. Wyss.", feedbackNotSelected: "Erreur : ne pas oublier la clarification FATCA – elle s'applique également en cas de représentation." },
        { id: "konto-ohne-kesb-bestaetigung", label: "Ouvrir le compte en se fondant uniquement sur le mandat pour cause d'inaptitude, sans confirmation de l'APEA", feedbackSelected: "Erreur grave : sans la confirmation formelle de l'APEA, le mandat pour cause d'inaptitude n'est pas encore juridiquement valable.", feedbackNotSelected: "Correct – sans confirmation de l'APEA, le compte ne peut pas être ouvert." },
        { id: "wyss-muss-unterschreiben", label: "M. Wyss doit cosigner personnellement l'ouverture du compte", feedbackSelected: "Erreur : M. Wyss est incapable de discernement et ne peut plus apposer de signature juridiquement valable – c'est précisément pour cela que le mandat pour cause d'inaptitude est entré en vigueur.", feedbackNotSelected: "Correct – M. Wyss, incapable de discernement, ne peut plus signer lui-même." },
        { id: "bucher-als-kontoinhaberin", label: "Enregistrer Mme Bucher comme titulaire du compte", feedbackSelected: "Erreur grave : le compte appartient à M. Wyss – Mme Bucher n'agit qu'en tant que représentante, pas comme titulaire du compte.", feedbackNotSelected: "Correct – M. Wyss est le titulaire du compte." },
        { id: "beistandsurkunde", label: "Exiger une attestation de curatelle", feedbackSelected: "Erreur : il ne s'agit pas ici d'une curatelle ordonnée par les autorités, mais d'un mandat pour cause d'inaptitude privé – la confirmation de l'APEA remplace l'attestation de curatelle.", feedbackNotSelected: "Correct – dans ce cas, ce n'est pas l'attestation de curatelle qui est pertinente, mais la confirmation de l'APEA." },
        { id: "pep-formular", label: "Formulaire de vérification PPE", feedbackSelected: "Erreur : aucune indication de personnes politiquement exposées dans ce cas.", feedbackNotSelected: "Correct – aucun statut PPE détectable." },
        { id: "herkunft-vermoegen", label: "Preuve de l'origine de la fortune", feedbackSelected: "Erreur : l'incapacité de discernement seule n'est pas un indicateur de risque LBA – pas d'EDD requis.", feedbackNotSelected: "Correct – pas de risque accru, pas d'EDD nécessaire." },
      ],
    },
  },
  it: {
    "l3-gemeinschaftskonto": {
      title: "Conto cointestato – Coniugi Berger",
      briefing:
        "I coniugi Stefan e Maria Berger (entrambi cittadini svizzeri, entrambi presenti) desiderano aprire un conto privato comune. Vogliono che ognuno possa disporre del conto autonomamente, senza che l'altro debba cofirmare.",
      generalFeedback:
        "Per il conto cointestato: contratto di base + identificazione INDIVIDUALE di ENTRAMBI i titolari (documento d'identità + dichiarazione personale FATCA per ciascuno). Inoltre: formulario A una volta per conto (VSB 20). La regolamentazione della firma segue il desiderio del cliente – qui firma individuale. La firma collettiva sarebbe errata, in quanto i coniugi desiderano espressamente poter disporre del conto individualmente.",
      documents: [
        { id: "basisvertrag", label: "Contratto di base", feedbackSelected: "Corretto – il contratto di base disciplina il rapporto d'affari ed è obbligatorio per ogni apertura di conto.", feedbackNotSelected: "Errore: il contratto di base è il documento fondamentale di ogni apertura di conto e non deve mancare." },
        { id: "ausweis-stefan", label: "Documento d'identità / passaporto di Stefan Berger", feedbackSelected: "Corretto – entrambi i titolari del conto devono essere identificati individualmente.", feedbackNotSelected: "Errore: Stefan Berger deve essere identificato." },
        { id: "ausweis-maria", label: "Documento d'identità / passaporto di Maria Berger", feedbackSelected: "Corretto – entrambi i titolari del conto devono essere identificati individualmente.", feedbackNotSelected: "Errore: Maria Berger deve essere identificata." },
        { id: "eigenerklarung-stefan", label: "Dichiarazione personale FATCA (persona fisica) – Stefan Berger", feedbackSelected: "Corretto – la verifica FATCA è richiesta separatamente per ogni titolare del conto.", feedbackNotSelected: "Errore: manca la verifica FATCA per Stefan Berger." },
        { id: "eigenerklarung-maria", label: "Dichiarazione personale FATCA (persona fisica) – Maria Berger", feedbackSelected: "Corretto – la verifica FATCA è richiesta separatamente per ogni titolare del conto.", feedbackNotSelected: "Errore: manca la verifica FATCA per Maria Berger." },
        { id: "formular-a", label: "Formulario A (avente diritto economico, VSB 20)", feedbackSelected: "Corretto – il formulario A viene emesso una volta per conto e documenta entrambi gli aventi diritto economici.", feedbackNotSelected: "Errore: il formulario A (VSB 20) è obbligatorio anche per il conto cointestato – un formulario per entrambi i titolari." },
        { id: "einzel-vereinbarung", label: "Accordo per firma individuale (ognuno dispone autonomamente)", feedbackSelected: "Corretto – corrisponde al desiderio dei coniugi: entrambi possono disporre autonomamente.", feedbackNotSelected: "Errore: i coniugi desiderano la firma individuale – questo accordo è obbligatorio." },
        { id: "kollektiv-vereinbarung", label: "Accordo per firma collettiva (entrambi devono cofirmare)", feedbackSelected: "Errore: i coniugi desiderano espressamente la firma individuale. La firma collettiva è contraria al desiderio del cliente.", feedbackNotSelected: "Corretto – la firma collettiva non corrisponde al desiderio del cliente." },
        { id: "wohnsitzbestatigung", label: "Attestazione di domicilio", feedbackSelected: "Bene – la prova del domicilio è raccomandata.", feedbackNotSelected: "Accettabile – non obbligatoria per la clientela conosciuta." },
        { id: "heiratszeugnis", label: "Atto di matrimonio", feedbackSelected: "Utile – conferma il rapporto tra i titolari.", feedbackNotSelected: "Accettabile – non obbligatorio per l'apertura del conto." },
        { id: "nur-ein-ausweis", label: "Copiare un solo documento d'identità (es. solo Stefan)", feedbackSelected: "Errore: per il conto cointestato ENTRAMBI i titolari devono essere identificati.", feedbackNotSelected: "Corretto – entrambi devono essere identificati." },
        { id: "nur-eine-eigenerklarung", label: "Compilare una sola dichiarazione personale (per entrambi)", feedbackSelected: "Errore: la LRD richiede una dichiarazione personale per ogni avente diritto economico.", feedbackNotSelected: "Corretto – ogni persona ha bisogno di una dichiarazione personale separata." },
      ],
    },
    "l3-ausweis-trickfall-mcq": {
      title: "Caso trabocchetto: documento d'identità scaduto da 5 giorni",
      briefing:
        "Oggi è il 20.06.2026. Il Sig. Novak presenta il suo documento d'identità. Verifica la data di scadenza: 15.06.2026 – quindi esattamente 5 giorni di scadenza. Il Sig. Novak argomenta: «È quasi ancora valido, solo 5 giorni! La foto è ancora attuale.»",
      today: "20.06.2026",
      question: "Cosa è corretto dal punto di vista legale e secondo la LRD?",
      options: [
        { key: "A", text: "Il documento d'identità è ancora valido per 30 giorni dopo la data di scadenza – quindi accettabile." },
        { key: "B", text: "Il documento d'identità non è valido. Il conto non può essere aperto. Invitare il Sig. Novak a rinnovare il documento d'identità." },
        { key: "C", text: "Se sono trascorsi meno di 3 mesi dalla scadenza, la banca può concedere un'eccezione a sua discrezione." },
        { key: "D", text: "Con una copia della data di scadenza e un'autorizzazione scritta della compliance, il documento d'identità è ancora utilizzabile." },
      ],
      feedback:
        "La LRD non prevede alcun termine di tolleranza per i documenti di identificazione scaduti. 1 giorno o 1 anno non fa differenza: un documento d'identità scaduto non è un mezzo di identificazione valido. Il Sig. Novak deve rinnovare il suo documento d'identità presso l'ufficio della popolazione / ufficio passaporti e poi tornare.",
      feedbackPerOption: {
        A: "Errato – non esiste alcun termine di tolleranza di 30 giorni nel diritto svizzero o nella LRD.",
        B: "Corretto – la LRD non conosce termini di tolleranza. Un documento d'identità scaduto è invalido, indipendentemente da quanto sia scaduto.",
        C: "Errato – non esiste alcuna regolamentazione di eccezione interna o esterna per documenti «quasi scaduti».",
        D: "Errato – né una copia né un'autorizzazione della compliance può rendere valido un documento non valido.",
      },
    },
    "l3-hochrisiko-pep": {
      title: "Alto rischio: PPE straniero",
      briefing:
        "Il Sig. Okeke (55 anni) dalla Nigeria desidera aprire un conto privato. Si descrive come un «uomo d'affari con stretti legami con il governo nigeriano». Vuole depositare USD 480'000 da un «affare commerciale» e diventa impaziente con le domande.",
      generalFeedback:
        "La Nigeria è un paese a rischio GAFI. Legami con il governo = verifica PPE obbligatoria. Per USD 480'000 da un «affare» sconosciuto: formulario EDD + documentazione completa dell'origine dei fondi + approvazione della gerarchia. Il conto può essere aperto solo dopo una verifica positiva completa.",
      documents: [
        { id: "basisvertrag", label: "Contratto di base", feedbackSelected: "Corretto – il contratto di base disciplina il rapporto d'affari ed è obbligatorio per ogni apertura di conto.", feedbackNotSelected: "Errore: il contratto di base è il documento fondamentale di ogni apertura di conto e non deve mancare." },
        { id: "reisepass-international", label: "Passaporto (valido a livello internazionale)", feedbackSelected: "Corretto – documento di identificazione principale.", feedbackNotSelected: "Errore: l'identificazione è obbligatoria." },
        { id: "eigenerklarung-np", label: "Dichiarazione personale FATCA (persona fisica)", feedbackSelected: "Corretto – la verifica FATCA è obbligatoria per ogni apertura di conto.", feedbackNotSelected: "Errore: non dimenticare la verifica FATCA." },
        { id: "formular-a", label: "Formulario A (avente diritto economico, VSB 20)", feedbackSelected: "Corretto – il formulario A è obbligatorio, particolarmente critico in caso di sospetto PPE.", feedbackNotSelected: "Errore: il formulario A (VSB 20) è sempre obbligatorio – particolarmente importante in caso di sospetto PPE." },
        { id: "wohnsitzbestatigung", label: "Prova di indirizzo / attestazione di domicilio", feedbackSelected: "Corretto.", feedbackNotSelected: "Errore: è necessaria una prova di indirizzo." },
        { id: "pep-pruefung", label: "Effettuare la verifica PPE (Persona Politicamente Esposta)", feedbackSelected: "Corretto – i legami citati con il governo = sospetto PPE, la verifica è obbligatoria.", feedbackNotSelected: "Errore grave: i legami con il governo attivano l'obbligo di verifica PPE." },
        { id: "herkunft-gelder", label: "Prova dell'origine dei fondi (per iscritto, documentata)", feedbackSelected: "Corretto – USD 480'000 richiede documentazione completa dell'origine dei fondi.", feedbackNotSelected: "Errore grave: per depositi ingenti provenienti da paesi a rischio, la prova dell'origine è obbligatoria." },
        { id: "edd-formular", label: "Compilare il formulario di dovuta diligenza rafforzata (EDD)", feedbackSelected: "Corretto – la Nigeria è un paese a rischio GAFI + status PPE = EDD obbligatorio.", feedbackNotSelected: "Errore: l'EDD è obbligatorio per PPE e paesi ad alto rischio (Nigeria / GAFI)." },
        { id: "genehmigung-vorgesetzte", label: "Ottenere l'approvazione di un superiore", feedbackSelected: "Corretto – i conti PPE devono essere approvati da un'istanza superiore (direzione generale).", feedbackNotSelected: "Errore: i conti PPE richiedono l'approvazione di un superiore, non solo del consulente clientela." },
        { id: "konto-normal-eroeffnen", label: "Aprire il conto con il processo standard", feedbackSelected: "Errore grave: il processo standard per PPE + paese ad alto rischio + USD 480k costituisce una violazione della LRD.", feedbackNotSelected: "Corretto – il processo standard è del tutto insufficiente in questo caso." },
        { id: "sofort-ablehnen", label: "Rifiutare il conto immediatamente e senza esame", feedbackSelected: "Errore: un rifiuto generalizzato non è corretto. Prima effettuare una verifica completa, poi decidere.", feedbackNotSelected: "Corretto – un rifiuto senza esame non è la reazione corretta." },
        { id: "pass-allein-reicht", label: "Solo il passaporto è sufficiente – l'identificazione standard è sufficiente", feedbackSelected: "Errore: per un PPE in un paese ad alto rischio, il passaporto da solo non è sufficiente. EDD, prova dell'origine e approvazione della gerarchia sono obbligatori in aggiunta.", feedbackNotSelected: "Corretto – il passaporto da solo è tutt'altro che sufficiente in questo caso." },
      ],
    },
    "l3-us-staatsbuerger-mcq": {
      title: "Caso trabocchetto: doppia nazionalità CH / USA",
      briefing:
        "Il Sig. Thompson (42 anni) desidera aprire un conto privato. Presenta sia il passaporto svizzero che quello americano. Alla domanda FATCA risponde: «Vivo e pago le mie tasse esclusivamente in Svizzera. Sono svizzero – il tema FATCA non mi riguarda.»",
      question: "Cosa è corretto dal punto di vista FATCA?",
      options: [
        { key: "A", text: "Il Sig. Thompson ha ragione: poiché è fiscalmente domiciliato in Svizzera e non ha residenza negli Stati Uniti, non è una US Person ai sensi di FATCA." },
        { key: "B", text: "Riceve la dichiarazione personale FATCA standard per persone fisiche – come qualsiasi altro cliente svizzero." },
        { key: "C", text: "Il Sig. Thompson è una US Person (US Citizen) ai sensi di FATCA. La banca deve registrare il suo numero di identificazione fiscale americano (TIN) e dichiarare il conto all'IRS – indipendentemente dal luogo di domicilio o dall'obbligo fiscale in Svizzera." },
        { key: "D", text: "FATCA si applica solo ai titolari di green card (Resident Aliens), non ai cittadini americani con passaporto svizzero aggiuntivo." },
      ],
      feedback:
        "FATCA (Foreign Account Tax Compliance Act) definisce le «US Persons» in base alla cittadinanza – non al domicilio o all'obbligo fiscale. Ogni cittadino americano è una US Person in tutto il mondo. La banca svizzera deve dichiarare il conto all'IRS, e il Sig. Thompson deve indicare il suo US-TIN. La dichiarazione personale FATCA standard non è sufficiente – per i cittadini americani si applica un processo separato.",
      feedbackPerOption: {
        A: "Errato – FATCA si basa sulla cittadinanza, non sul domicilio o sull'obbligo fiscale. Un cittadino americano rimane una US Person, indipendentemente da dove viva.",
        B: "Errato – la dichiarazione personale standard per persone fisiche non è sufficiente per una US Person. Una US Person deve essere dichiarata come tale (TIN americano richiesto, obbligo di dichiarazione all'IRS).",
        C: "Corretto – cittadinanza americana = US Person = pieno obbligo di dichiarazione FATCA, indipendentemente dal passaporto svizzero.",
        D: "Errato – le US Persons comprendono: cittadini americani (cittadinanza, indipendentemente dal domicilio), titolari di green card (Resident Aliens) e persone che soddisfano il Substantial Presence Test.",
      },
    },
    "l3-selbstaendiger-privatkonto": {
      title: "Lavoratore autonomo – apertura di un conto privato",
      briefing:
        "Il Sig. Bauer (38 anni) è un freelance informatico (ditta individuale, nessuna iscrizione al registro di commercio). Desidera aprire un conto privato per le spese personali – affitto, spesa, tempo libero. Ha già un conto professionale in un'altra banca. È cittadino svizzero e presenta il suo passaporto svizzero. Il reddito è plausibile e stabile. Nessuna caratteristica di rischio particolare.",
      generalFeedback:
        "Il punto di apprendimento centrale: un lavoratore autonomo (ditta individuale) è sempre una persona fisica – sul piano fiscale e ai sensi della LRD. Per il suo conto privato si applicano esattamente le stesse regole di qualsiasi altro cliente privato svizzero. Nessun estratto del registro di commercio, nessun bilancio, e soprattutto: dichiarazione personale FATCA per «persona fisica» – non per «persona giuridica». Questo è il classico errore trabocchetto.",
      documents: [
        { id: "basisvertrag", label: "Contratto di base", feedbackSelected: "Corretto – documento di base per ogni apertura di conto.", feedbackNotSelected: "Errore: il contratto di base è sempre richiesto." },
        { id: "ausweis-ch", label: "Documento d'identità / passaporto svizzero valido", feedbackSelected: "Corretto – l'identificazione è obbligatoria.", feedbackNotSelected: "Errore: l'identificazione del titolare del conto è obbligatoria." },
        { id: "eigenerklarung-np", label: "Dichiarazione personale FATCA (persona fisica)", feedbackSelected: "Corretto – il Sig. Bauer è una persona fisica come imprenditore individuale. La dichiarazione personale per persone fisiche è corretta.", feedbackNotSelected: "Errore: la verifica FATCA è obbligatoria – anche per i lavoratori autonomi come persone fisiche." },
        { id: "formular-a", label: "Formulario A (avente diritto economico, VSB 20)", feedbackSelected: "Corretto – il formulario A è obbligatorio anche per il lavoratore autonomo.", feedbackNotSelected: "Errore: il formulario A (VSB 20) è obbligatorio per ogni apertura di conto." },
        { id: "eigenerklarung-jur-fatca", label: "Dichiarazione personale FATCA (persona giuridica)", feedbackSelected: "Errore grave: il Sig. Bauer è un imprenditore individuale = persona fisica. La dichiarazione FATCA per persone giuridiche si applica solo a Sagl, SA, cooperative ecc. – non alle ditte individuali.", feedbackNotSelected: "Corretto – i titolari di ditta individuale sono persone fisiche, la dichiarazione per persone giuridiche è errata." },
        { id: "hr-auszug", label: "Estratto del registro di commercio", feedbackSelected: "Errore: non è necessario alcun estratto del RC per un conto privato. Inoltre, le ditte individuali con un fatturato annuo inferiore a CHF 100'000 non sono obbligate a registrarsi.", feedbackNotSelected: "Corretto – nessun estratto del RC richiesto per un conto privato." },
        { id: "jahresabschluss", label: "Richiedere i conti annuali / bilancio", feedbackSelected: "Errore: non è richiesto alcun bilancio per un conto privato senza richiesta di credito – nemmeno per i lavoratori autonomi.", feedbackNotSelected: "Corretto – nessun bilancio necessario per un semplice conto privato." },
        { id: "herkunft-vermoegen", label: "Prova dell'origine del patrimonio (EDD)", feedbackSelected: "Errore: nessuna caratteristica di rischio rilevabile – normale freelance informatico senza depositi sospetti. Nessun EDD richiesto.", feedbackNotSelected: "Corretto – nessun rischio elevato, nessun EDD." },
      ],
    },
    "l3-wirtschaftlich-berechtigter-dritter": {
      title: "Caso trabocchetto: l'avente diritto economico è un terzo",
      briefing:
        "Il Sig. Meier desidera aprire un conto privato. Alla domanda standard «Agisce per conto proprio?», risponde: «No – il conto è per mio fratello Bruno. Bruno vive a Dubai e non può venire di persona. Gestisco il conto per lui.»",
      question: "Qual è la procedura corretta secondo VSB 20 / LRD?",
      options: [
        { key: "A", text: "Il Sig. Meier firma tutto come titolare del conto – il formulario A viene emesso a suo nome. Bruno non deve essere registrato." },
        { key: "B", text: "Il conto non può essere aperto: Bruno deve presentarsi di persona e identificarsi." },
        { key: "C", text: "Il Sig. Meier apre il conto come controparte contrattuale, ma la banca registra Bruno tramite il formulario A come avente diritto economico (nome, data di nascita, nazionalità, indirizzo). Poiché Bruno vive a Dubai, è necessaria una maggiore diligenza." },
        { key: "D", text: "Il conto viene aperto direttamente a nome di Bruno – il Sig. Meier riceve una procura." },
      ],
      feedback:
        "VSB 20 art. 4: se la controparte contrattuale dichiara di non agire per conto proprio, la banca deve registrare l'avente diritto economico tramite il formulario A. Bruno non deve presentarsi di persona, ma viene completamente documentato. Dubai / EAU è considerata una piazza finanziaria a rischio – un'ulteriore verifica di diligenza secondo l'art. 6 LRD è opportuna.",
      feedbackPerOption: {
        A: "Errato – se la controparte contrattuale dichiara di agire per conto di un terzo, il formulario A non può essere emesso a nome della controparte. Ciò costituirebbe una dichiarazione errata dell'avente diritto economico.",
        B: "Errato – l'avente diritto economico non deve presentarsi di persona. Le sue informazioni vengono dichiarate dalla controparte contrattuale tramite il formulario A e documentate dalla banca.",
        C: "Corretto – il Sig. Meier è la controparte contrattuale (titolare del conto), Bruno è l'avente diritto economico secondo il formulario A. L'indirizzo negli EAU aumenta il profilo di rischio e richiede una verifica supplementare.",
        D: "Errato – il conto viene aperto a nome della controparte contrattuale (Sig. Meier), non dell'avente diritto economico. Bruno può ricevere separatamente una procura, ma non è titolare del conto.",
      },
    },
    "l3-doppelbuerger-fatca": {
      title: "Doppia nazionalità CH/USA – documentazione supplementare FATCA",
      briefing:
        "La Sig.ra Wagner (29 anni) desidera aprire un conto privato. Presenta il suo passaporto svizzero. Durante la verifica FATCA, dichiara apertamente di essere nata a Boston (USA) e di essersi trasferita in Svizzera con i genitori da bambina. Possiede ancora la cittadinanza americana, ma vive esclusivamente in Svizzera da oltre 25 anni.",
      generalFeedback:
        "FATCA definisce la «US Person» tramite la cittadinanza o il luogo di nascita, non tramite il domicilio. Anche chi vive esclusivamente in Svizzera da decenni e presenta solo il passaporto svizzero rimane soggetto a FATCA se nato negli USA: il formulario W-9 con il TIN americano e la designazione interna per il reporting IRS sono obbligatori in aggiunta alla dichiarazione personale standard. Un rifiuto generalizzato non è la risposta corretta.",
      documents: [
        { id: "basisvertrag", label: "Contratto di base", feedbackSelected: "Corretto – il contratto di base disciplina il rapporto d'affari ed è obbligatorio per ogni apertura di conto.", feedbackNotSelected: "Errore: il contratto di base è il documento fondamentale di ogni apertura di conto e non deve mancare." },
        { id: "ausweis-ch", label: "Documento d'identità / passaporto svizzero valido", feedbackSelected: "Corretto – documento di identificazione principale ai sensi della LRD.", feedbackNotSelected: "Errore: l'identificazione con un documento d'identità valido è obbligatoria." },
        { id: "eigenerklarung-np", label: "Dichiarazione personale FATCA (persona fisica)", feedbackSelected: "Corretto – la dichiarazione FATCA di base è sempre il primo passo; rivela qui che la Sig.ra Wagner, nata negli USA, è una US Person.", feedbackNotSelected: "Errore: senza la dichiarazione FATCA di base, lo status di US Person non verrebbe rilevato." },
        { id: "formular-a", label: "Formulario A (avente diritto economico, VSB 20)", feedbackSelected: "Corretto – il formulario A è obbligatorio indipendentemente dallo status FATCA per ogni apertura di conto.", feedbackNotSelected: "Errore: il formulario A (VSB 20) è obbligatorio per ogni apertura di conto." },
        { id: "w9-formular", label: "Formulario W-9 / registrazione del numero di identificazione fiscale americano (TIN)", feedbackSelected: "Corretto – come US Person (nata negli USA), la Sig.ra Wagner deve indicare il suo TIN americano indipendentemente dal luogo di domicilio; il formulario W-9 lo documenta.", feedbackNotSelected: "Errore grave: la cittadinanza americana attiva l'obbligo di registrazione del TIN americano indipendentemente dal domicilio." },
        { id: "us-person-kennzeichnung", label: "Designare internamente il conto come US Person (preparare il reporting FATCA all'IRS)", feedbackSelected: "Corretto – i conti di US Persons devono essere dichiarati all'IRS (obbligo di reporting FATCA della banca svizzera).", feedbackNotSelected: "Errore: senza designazione interna come US Person, viene violato l'obbligo di dichiarazione annuale all'IRS." },
        { id: "geburtsort-ignorieren", label: "Non registrare nel sistema il luogo di nascita negli USA, poiché la cliente presenta solo il passaporto svizzero", feedbackSelected: "Grave violazione FATCA: il luogo di nascita negli USA rende la Sig.ra Wagner una US Person indipendentemente dal passaporto presentato – non registrarlo viola l'obbligo di diligenza FATCA della banca.", feedbackNotSelected: "Corretto – il luogo di nascita deve sempre essere registrato e valutato." },
        { id: "konto-ablehnen-us-person", label: "Rifiutare l'apertura del conto perché la cliente è cittadina americana", feedbackSelected: "Errore: la cittadinanza americana non è un motivo di rifiuto automatico. La documentazione FATCA completa è corretta, non il rifiuto generalizzato.", feedbackNotSelected: "Corretto – nessun rifiuto generalizzato, ma documentazione corretta." },
        { id: "eigenerklarung-jur-fatca", label: "Dichiarazione personale FATCA (persona giuridica)", feedbackSelected: "Errore: la Sig.ra Wagner è una persona fisica – la dichiarazione per persone giuridiche è errata in questo caso.", feedbackNotSelected: "Correttamente non selezionato – non applicabile a una persona fisica." },
        { id: "handelsregister", label: "Estratto del registro di commercio", feedbackSelected: "Errore: gli estratti del RC sono rilevanti solo per i clienti aziendali.", feedbackNotSelected: "Corretto – irrilevante per i privati." },
        { id: "jahresabschluss", label: "Conti annuali / bilancio", feedbackSelected: "Errore: applicabile solo ai conti professionali e aziendali.", feedbackNotSelected: "Corretto – non applicabile per un conto privato." },
        { id: "pep-formular", label: "Formulario di verifica PPE", feedbackSelected: "Errore: nessuna indicazione di status politicamente esposto.", feedbackNotSelected: "Corretto – nessuno status PPE rilevabile." },
        { id: "herkunft-vermoegen", label: "Prova dell'origine del patrimonio", feedbackSelected: "Errore: nessun rischio LRD elevato rilevabile – l'obbligo FATCA è indipendente da un rischio patrimoniale.", feedbackNotSelected: "Corretto – caso standard senza caratteristiche di rischio LRD, nessun EDD necessario." },
      ],
    },
    "l3-vorsorgeauftrag": {
      title: "Mandato precauzionale – agire per una persona incapace di discernimento",
      briefing:
        "La Sig.ra Bucher presenta un mandato precauzionale con cui suo zio, il Sig. Wyss (79 anni), l'ha designata come mandataria precauzionale. Il Sig. Wyss è incapace di discernimento dall'ictus avuto quattro mesi fa. La Sig.ra Bucher presenta inoltre una conferma dell'Autorità di protezione dei minori e degli adulti (APMA) sull'entrata in vigore del mandato precauzionale e desidera aprire un nuovo conto di risparmio per il Sig. Wyss.",
      generalFeedback:
        "Un mandato precauzionale (art. 360 segg. CC) è una disposizione privata preventiva per il caso di incapacità di discernimento. Entra tuttavia in vigore solo quando l'APMA accerta l'incapacità di discernimento e conferma la validità del mandato – solo allora la banca può riconoscere la mandataria come rappresentante. Il titolare del conto incapace di discernimento rimane parte contrattuale, ma non firma più personalmente; la mandataria agisce in suo nome.",
      documents: [
        { id: "vorsorgeauftrag", label: "Mandato precauzionale (originale o copia autenticata)", feedbackSelected: "Corretto – il mandato precauzionale stabilisce chi può agire in caso di incapacità di discernimento.", feedbackNotSelected: "Errore: senza il mandato precauzionale stesso non è possibile verificare l'estensione dei poteri di rappresentanza." },
        { id: "kesb-wirksamkeitsbestaetigung", label: "Conferma dell'APMA sull'entrata in vigore del mandato precauzionale", feedbackSelected: "Corretto – un mandato precauzionale entra in vigore solo quando l'APMA lo conferma formalmente (art. 360 segg. CC). Senza questa conferma, la banca non può riconoscere la Sig.ra Bucher come rappresentante.", feedbackNotSelected: "Errore grave: il mandato precauzionale da solo non è sufficiente – l'APMA deve confermare formalmente la sua entrata in vigore prima che la banca possa riconoscerlo." },
        { id: "ausweis-bucher", label: "Documento d'identità / passaporto della Sig.ra Bucher (mandataria)", feedbackSelected: "Corretto – l'identità della mandataria agente deve essere verificata.", feedbackNotSelected: "Errore: la Sig.ra Bucher deve essere identificata come rappresentante agente." },
        { id: "ausweis-wyss", label: "Documento d'identità / passaporto del Sig. Wyss (titolare del conto)", feedbackSelected: "Corretto – il Sig. Wyss rimane titolare del conto e deve essere identificato, anche se non può agire personalmente.", feedbackNotSelected: "Errore: anche in caso di rappresentanza, il titolare del conto deve essere identificato." },
        { id: "basisvertrag", label: "Contratto di base (firmato dalla Sig.ra Bucher come mandataria)", feedbackSelected: "Corretto – il contratto di base è obbligatorio per ogni apertura di conto.", feedbackNotSelected: "Errore: il contratto di base è il documento fondamentale di ogni apertura di conto e non deve mancare." },
        { id: "formular-a", label: "Formulario A (avente diritto economico, VSB 20)", feedbackSelected: "Corretto – il formulario A è obbligatorio anche in caso di rappresentanza da parte di una mandataria.", feedbackNotSelected: "Errore: il formulario A (VSB 20) è obbligatorio per ogni apertura di conto." },
        { id: "eigenerklarung-np", label: "Dichiarazione personale FATCA (persona fisica) – per il Sig. Wyss, firmata dalla mandataria", feedbackSelected: "Corretto – la verifica FATCA è obbligatoria; la mandataria firma al posto del Sig. Wyss.", feedbackNotSelected: "Errore: non dimenticare la verifica FATCA – si applica anche in caso di rappresentanza." },
        { id: "konto-ohne-kesb-bestaetigung", label: "Aprire il conto basandosi solo sul mandato precauzionale, senza conferma dell'APMA", feedbackSelected: "Errore grave: senza la conferma formale dell'APMA, il mandato precauzionale non è ancora giuridicamente valido.", feedbackNotSelected: "Corretto – senza conferma dell'APMA il conto non può essere aperto." },
        { id: "wyss-muss-unterschreiben", label: "Il Sig. Wyss deve cofirmare personalmente l'apertura del conto", feedbackSelected: "Errore: il Sig. Wyss è incapace di discernimento e non può più apporre una firma giuridicamente valida – è esattamente per questo che il mandato precauzionale è entrato in vigore.", feedbackNotSelected: "Corretto – il Sig. Wyss, incapace di discernimento, non può più firmare personalmente." },
        { id: "bucher-als-kontoinhaberin", label: "Registrare la Sig.ra Bucher come titolare del conto", feedbackSelected: "Errore grave: il conto appartiene al Sig. Wyss – la Sig.ra Bucher agisce solo come rappresentante, non come titolare del conto.", feedbackNotSelected: "Corretto – il Sig. Wyss è il titolare del conto." },
        { id: "beistandsurkunde", label: "Richiedere un attestato di curatela", feedbackSelected: "Errore: qui non si tratta di un rapporto di curatela ordinato dalle autorità, ma di un mandato precauzionale privato – la conferma dell'APMA sostituisce l'attestato di curatela.", feedbackNotSelected: "Corretto – in questo caso non è rilevante l'attestato di curatela, ma la conferma dell'APMA." },
        { id: "pep-formular", label: "Formulario di verifica PPE", feedbackSelected: "Errore: nessuna indicazione di persone politicamente esposte in questo caso.", feedbackNotSelected: "Corretto – nessuno status PPE rilevabile." },
        { id: "herkunft-vermoegen", label: "Prova dell'origine del patrimonio", feedbackSelected: "Errore: l'incapacità di discernimento da sola non è un indicatore di rischio LRD – nessun EDD richiesto.", feedbackNotSelected: "Corretto – nessun rischio elevato, nessun EDD necessario." },
      ],
    },
  },
};
