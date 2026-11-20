import type { LangTranslations } from "./utils";

export const VORSORGE_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      title: "Expliquer les 3 piliers",
      situation:
        "Jeune client, 22 ans, demande: 'J'entends toujours parler des 3 piliers – qu'est-ce que cela signifie exactement?'",
      question: "Que lui expliquez-vous?",
      options: [
        {
          key: "A",
          text: "«L'AVS et la caisse de pension couvrent ensemble 80 à 100% du dernier salaire. Un 3e pilier n'est vraiment nécessaire que pour les indépendants qui n'ont pas de caisse de pension.»",
        },
        {
          key: "B",
          text: "«Les 3 piliers constituent le système de prévoyance suisse. 1er pilier = AVS, étatique, pour tous. 2e pilier = caisse de pension, professionnel, via l'employeur. 3e pilier = privé, volontaire, fiscalement attractif.»",
        },
        {
          key: "C",
          text: "«Le 1er pilier (AVS) est obligatoire pour tous et couvre les besoins de base. Les 2e et 3e piliers sont des compléments volontaires – à 22 ans, pas encore prioritaires.»",
        },
        {
          key: "D",
          text: "«Le 1er pilier est l'AVS, valable pour tous. Le 2e pilier est uniquement pour les collaborateurs de grandes entreprises. Le compte 3a est votre instrument d'épargne le plus important.»",
        },
      ],
      feedback:
        "Les 3 piliers forment ensemble la prévoyance vieillesse suisse. Objectif: recevoir environ 60% du dernier salaire comme rente à la retraite. Les 1er et 2e piliers seuls ne suffisent souvent pas – c'est pourquoi le 3e pilier comme complément privé est particulièrement important.",
    },
    "1.2": {
      title: "Recommander le pilier 3a",
      situation:
        "Cliente, 28 ans, salariée, dit: 'Je souhaite épargner pour la retraite et économiser des impôts. Que me recommandez-vous?'",
      question: "Que recommandez-vous?",
      options: [
        {
          key: "A",
          text: "Compte d'épargne – avec un maximum annuel de CHF 7'258, le 3a n'a pas de réel impact. Le compte d'épargne est entièrement disponible, offre la même sécurité et est une meilleure base avec le même objectif d'épargne.",
        },
        {
          key: "B",
          text: "Pilier 3b via une assurance-vie – il bénéficie également d'avantages fiscaux, offre plus de flexibilité que le compte 3a et est donc le meilleur choix pour les salariés avec caisse de pension.",
        },
        {
          key: "C",
          text: "Actions via un dépôt – les gains en capital sont exonérés d'impôts en Suisse, et à long terme le rendement historique des actions d'environ 7% par an dépasse largement l'avantage fiscal du 3a.",
        },
        {
          key: "D",
          text: "Pilier 3a – fiscalement déductible, jusqu'à CHF 7'258 par an versable, l'argent est bloqué jusqu'à la retraite",
        },
      ],
      feedback:
        "Le pilier 3a est idéal pour l'optimisation fiscale et la prévoyance vieillesse. Les versements sont entièrement déductibles du revenu imposable. Maximum 2026: CHF 7'258 par an. L'argent est bloqué jusqu'à 5 ans avant la retraite – des exceptions (p.ex. résidence principale, émigration) sont possibles.",
    },
    "1.4": {
      title: "Lacunes AVS et réduction de rente",
      situation:
        "Cliente Fatima, 32 ans, a été 3 ans à l'étranger. Elle demande: «Je n'ai pas payé de cotisations AVS pendant cette période. Qu'arrive-t-il à ma rente?»",
      question: "Qu'expliquez-vous à Fatima?",
      options: [
        {
          key: "A",
          text: "«Aucun impact – les rentes AVS sont calculées uniquement sur le dernier salaire, pas sur la durée des cotisations»",
        },
        {
          key: "B",
          text: "«Chaque année manquante réduit la rente AVS d'environ 1/44 – 3 lacunes correspondent à environ 6,8% de réduction de rente. Les lacunes peuvent être comblées jusqu'à 5 ans avant l'âge AVS»",
        },
        {
          key: "C",
          text: "«Les lacunes AVS entraînent automatiquement la perte de tous les droits – Fatima devrait demander une nouvelle affiliation AVS dès que possible»",
        },
        {
          key: "D",
          text: "«À l'étranger, on cotise souvent au système de retraite local – cela est compensé avec l'AVS suisse, sans réduction»",
        },
      ],
      feedback:
        "La rente AVS complète requiert 44 années de cotisations (hommes et femmes). Chaque année manquante réduit la rente de 1/44 ≈ 2,27%. 3 années manquantes = environ 6,8% de rente en moins. Les lacunes peuvent être comblées volontairement – mais seulement jusqu'à 5 ans rétroactivement et uniquement si encore soumis à l'AVS. Recommandation: demander un relevé AVS et identifier les lacunes.",
    },
    "1.5": {
      title: "Quand commence l'obligation de cotiser à l'AVS?",
      situation:
        "Tim, apprenti de 16 ans, a un job d'été et gagne CHF 1'800 en 2 mois. Il demande: «Dois-je déjà payer l'AVS?»",
      question: "Qu'expliquez-vous à Tim?",
      options: [
        { key: "A", text: "«Non, l'obligation de cotiser à l'AVS commence seulement à 18 ans»" },
        {
          key: "B",
          text: "«Oui à partir de 17 ans – mais uniquement sur un revenu supérieur à CHF 2'000»",
        },
        {
          key: "C",
          text: "«Oui à partir du 1er janvier suivant le 17e anniversaire, et pour les non-actifs à partir de 20 ans. Pour les actifs, une franchise de CHF 2'300 par an et par employeur s'applique»",
        },
        {
          key: "D",
          text: "«Non, les apprentis et les jobs de vacances sont toujours exempts jusqu'à la fin de l'apprentissage»",
        },
      ],
      feedback:
        "Obligation de cotiser à l'AVS pour les actifs: à partir du 1er janvier suivant le 17e anniversaire. Franchise pour les jeunes (jusqu'à la fin de l'année de leur 25e anniversaire): CHF 2'300 par employeur et par an. Tim gagne CHF 1'800 – sous la franchise, donc pas d'obligation AVS. Non-actifs (étudiants, femmes/hommes au foyer) à partir du 1er janvier suivant le 20e anniversaire.",
    },
    "1.3": {
      title: "3a vs. 3b",
      situation: "Un client demande: 'Quelle est la différence entre 3a et 3b?'",
      question: "Qu'expliquez-vous?",
      options: [
        {
          key: "A",
          text: "«Le 3a est lié et fiscalement déductible – montant maximal annuel. Le 3b est libre – sans limite, sans avantage fiscal, disponible à tout moment.»",
        },
        {
          key: "B",
          text: "«3a et 3b sont fiscalement identiques – les deux formes sont entièrement déductibles du revenu imposable. La différence réside uniquement dans le prestataire: 3a via une banque, 3b via une assurance.»",
        },
        {
          key: "C",
          text: "«Le 3b est généralement le meilleur choix: depuis la réforme fiscale 2019, les versements dans les polices 3b sont partiellement déductibles au niveau cantonal, et il n'y a pas de période de blocage jusqu'à la retraite.»",
        },
        {
          key: "D",
          text: "«Le 3a convient principalement aux indépendants sans caisse de pension, qui peuvent verser jusqu'à 20% de leur revenu. Pour les salariés avec caisse de pension, le compte 3b est fiscalement plus attractif car sans période de blocage.»",
        },
      ],
      feedback:
        "3a = lié, avantage fiscal, maximum CHF 7'258 (salariés). 3b = libre, pas d'avantage fiscal, pas de maximum, disponible à tout moment. Recommandation: d'abord épuiser au maximum le 3a pour profiter de l'avantage fiscal, puis 3b pour l'épargne complémentaire flexible.",
    },
    "2.1": {
      title: "Calculer l'avantage fiscal",
      situation:
        "Un client avec un taux marginal d'imposition de 25% souhaite savoir combien il économise en versant CHF 7'258 dans le 3a.",
      question: "Que dites-vous au client?",
      options: [
        {
          key: "A",
          text: "«Avec un taux marginal de 25%, l'avantage fiscal fédéral est d'environ CHF 500 – la majeure partie de l'économie fiscale intervient lors du retrait à la retraite, car le taux d'imposition au retrait est alors nettement plus bas.»",
        },
        {
          key: "B",
          text: "«On ne peut pas le dire de manière forfaitaire – le véritable avantage fiscal dépend de votre canton, de votre commune et du revenu imposable exact. L'administration fiscale doit calculer cela individuellement.»",
        },
        {
          key: "C",
          text: "«L'avantage s'applique exclusivement à l'impôt fédéral direct – les impôts sur le revenu cantonaux et communaux ne peuvent pas être réduits par des versements 3a, donc cela ne vaut la peine qu'à revenu très élevé.»",
        },
        {
          key: "D",
          text: "«Avec un taux marginal de 25%, vous économisez CHF 1'814,50 d'impôts – simplement grâce au versement 3a de CHF 7'258.»",
        },
      ],
      feedback:
        "Économie fiscale = versement × taux marginal. CHF 7'258 × 25% = CHF 1'814,50. C'est presque un mois de salaire économisé – chaque année! Plus le revenu et le taux marginal sont élevés, plus l'avantage fiscal du versement 3a est important.",
    },
    "2.2": {
      title: "Retrait anticipé du 3a",
      situation:
        "Un client, 45 ans, demande: 'Puis-je retirer mon argent du 3a à l'avance? J'en ai besoin pour une rénovation.'",
      question: "Qu'expliquez-vous?",
      options: [
        {
          key: "A",
          text: "«Oui, possible – vous devez documenter le projet de rénovation et soumettre le formulaire de retrait anticipé. Nous virerons ensuite directement à l'entreprise artisanale.»",
        },
        {
          key: "B",
          text: "«Le retrait anticipé n'est possible que sous certaines conditions: achat de résidence principale, rénovation EPL, début d'activité indépendante, émigration ou invalidité. Une rénovation d'un appartement locatif ne suffit pas.»",
        },
        {
          key: "C",
          text: "«Le retrait anticipé n'est autorisé que lors de l'achat de propriété – pas pour les rénovations. Dans votre cas, vous devrez malheureusement attendre jusqu'à la retraite.»",
        },
        {
          key: "D",
          text: "«Le retrait est possible si les coûts de rénovation s'élèvent à au moins CHF 50'000. Veuillez apporter les devis pour que nous puissions soumettre la demande.»",
        },
      ],
      feedback:
        "Retrait anticipé du 3a possible, mais uniquement pour des objectifs spécifiques: EPL (encouragement à la propriété du logement – achat ou rénovation augmentant la valeur de la résidence principale), début d'activité indépendante, émigration, invalidité ou décès. La rénovation d'un appartement locatif n'est pas prise en compte.",
    },
    "2.4": {
      title: "Rachat dans la caisse de pension et avantage fiscal",
      situation:
        "M. Roth, 50 ans, taux marginal 35%, a selon son relevé de caisse de pension un potentiel de rachat de CHF 80'000. Il demande: «Vaut-il la peine d'effectuer un rachat volontaire dans la caisse de pension?»",
      question: "Qu'expliquez-vous à M. Roth?",
      options: [
        {
          key: "A",
          text: "«Non – les rachats dans la caisse de pension ne valent la peine que si l'on est proche de la retraite. À 50 ans, 15 ans c'est trop long jusqu'au versement»",
        },
        {
          key: "B",
          text: "«Oui – CHF 80'000 de rachat économise environ CHF 28'000 d'impôts immédiatement avec un taux marginal de 35%. Plus une rente de caisse de pension plus élevée. Important: respecter le délai de blocage de 3 ans avant le retrait en capital»",
        },
        {
          key: "C",
          text: "«Seulement s'il opte pour le retrait en capital plutôt que la rente – sinon le rachat ne vaut pas la peine fiscalement»",
        },
        {
          key: "D",
          text: "«Les rachats dans la caisse de pension ne sont pas déductibles fiscalement – seuls les versements 3a peuvent être déduits du revenu imposable»",
        },
      ],
      feedback:
        "Rachat LPP = double avantage: 1) Économie fiscale immédiate de rachat × taux marginal (CHF 80'000 × 35% = CHF 28'000). 2) Rente ou capital plus élevé à la retraite. Important: délai de blocage de 3 ans – qui retire le capital peu après doit rembourser l'avantage fiscal. À 50 ans, absolument pas un problème.",
    },
    "2.5": {
      title: "Rente transitoire jusqu'à l'âge AVS",
      situation:
        "Mme Schneider, 62 ans, souhaite prendre une retraite anticipée (âge AVS ordinaire 65). Son règlement de caisse de pension autorise la retraite à partir de 60 ans. Elle demande: «Qu'arrive-t-il à l'AVS dans la lacune jusqu'à 65 ans?»",
      question: "Qu'expliquez-vous à Mme Schneider?",
      options: [
        {
          key: "A",
          text: "«Pas de lacune – la rente AVS peut être demandée à partir de 62 ans, simplement avec une réduction»",
        },
        {
          key: "B",
          text: "«De nombreuses caisses de pension versent une rente transitoire jusqu'à l'âge AVS qui compense l'AVS manquante. Celle-ci est automatiquement réduite après 65 ans quand la vraie AVS commence»",
        },
        {
          key: "C",
          text: "«L'AVS fonctionne automatiquement – elle doit seulement informer la caisse de pension»",
        },
        {
          key: "D",
          text: "«Dès la retraite anticipée, l'obligation AVS disparaît – pas de cotisations, pas de lacunes»",
        },
      ],
      feedback:
        "La retraite anticipée crée une lacune AVS: entre l'âge de la retraite et l'âge AVS, on ne reçoit pas encore l'AVS. Solution de nombreuses caisses de pension: rente transitoire à hauteur de la rente AVS attendue (env. CHF 2'450/mois max.) jusqu'à l'âge AVS. Ensuite la rente LPP diminue et l'AVS commence. Important: les non-actifs doivent continuer à payer des cotisations AVS en tant que non-actifs!",
    },
    "2.3": {
      title: "Deuxième compte 3a",
      situation:
        "Une cliente a CHF 65'000 sur un seul compte 3a. Elle demande si c'est correct.",
      question: "Que recommandez-vous?",
      options: [
        {
          key: "A",
          text: "«À partir de CHF 50'000, je recommande d'ouvrir un deuxième compte 3a. Lors du retrait, les comptes 3a sont imposés séparément – des retraits échelonnés sur plusieurs années réduisent massivement la charge fiscale.»",
        },
        {
          key: "B",
          text: "«Tout va bien – la protection des dépôts protège les comptes 3a jusqu'à CHF 100'000 par banque, et lors du retrait à la retraite, seul le montant total est fiscalement déterminant, pas le nombre de comptes.»",
        },
        {
          key: "C",
          text: "«Solder le compte existant et le transférer dans un dépôt-titres 3a – les fonds obtiennent un meilleur rendement à long terme que les avoirs en compte, et fiscalement rien ne change lors du retrait.»",
        },
        {
          key: "D",
          text: "«À partir de CHF 50'000, un taux d'intérêt réduit s'applique aux comptes 3a. La banque est tenue de fractionner les dépôts à partir de ce montant pour que le taux d'intérêt plus élevé continue de s'appliquer.»",
        },
      ],
      feedback:
        "Les retraits 3a sont imposés séparément du revenu ordinaire – à un taux réduit. Avec plusieurs comptes, les retraits peuvent être échelonnés sur différentes années, ce qui donne à chaque fois un taux d'imposition plus bas. À partir de CHF 50'000, un deuxième compte est vivement recommandé!",
    },
    "3.1": {
      title: "Capacité financière à la retraite",
      situation:
        "Client, 52 ans, souhaite une hypothèque de CHF 600'000. Revenu aujourd'hui CHF 120'000. Rente LPP selon relevé CHF 24'000/an. Retraite dans 13 ans.",
      question: "Que dites-vous au client?",
      options: [
        {
          key: "A",
          text: "«Tout va bien – la capacité financière actuelle est donnée. La vérification de la capacité à la retraite ne s'applique qu'aux hypothèques à taux fixe avec une durée de plus de 15 ans.»",
        },
        {
          key: "B",
          text: "«Capacité financière à la retraite non donnée. 82,4% est massivement au-dessus de la limite de 38%. L'hypothèque doit être davantage amortie avant la retraite ou le montant réduit.»",
        },
        {
          key: "C",
          text: "«Seule la capacité financière actuelle compte – la retraite dans 13 ans est encore loin»",
        },
        {
          key: "D",
          text: "«Recommander un rachat LPP – grâce à un rachat de CHF 120'000 dans la caisse de pension, la rente annuelle monte au-dessus de CHF 36'000, ce qui ramène automatiquement la capacité à la retraite sous 38%.»",
        },
      ],
      feedback:
        "La capacité financière doit être donnée AUJOURD'HUI et À LA RETRAITE. Limite à la retraite: 38%. 82,4% n'est pas acceptable. Solution: amortir davantage avant la retraite ou choisir un objet moins cher. Le rachat LPP serait possible, mais ne suffit pas seul.",
    },
    "3.2": {
      title: "Rattrapage 3a à partir de 2026",
      situation:
        "Un client, 40 ans, dit: 'J'ai oublié de verser dans le 3a en 2025. Ces CHF 7'000 sont-ils perdus?'",
      question: "Que répondez-vous?",
      options: [
        {
          key: "A",
          text: "«Non! À partir de 2026, les versements manqués à partir de 2025 peuvent être rattrapés. Condition: le montant maximal actuel de CHF 7'258 doit d'abord être entièrement versé. Les lacunes avant 2025 malheureusement non rattrapables.»",
        },
        {
          key: "B",
          text: "«Oui malheureusement – la possibilité de versement dans le pilier 3a est strictement limitée à l'année fiscale en cours. La loi fédérale exclut tout versement rétroactif, même pour 2025.»",
        },
        {
          key: "C",
          text: "«Verser simplement le double du montant maximal cette année – CHF 14'516 sont admissibles pour rattraper une année précédente. Les autorités fiscales acceptent cela directement dans la déclaration d'impôts comme rattrapage pour 2025.»",
        },
        {
          key: "D",
          text: "«Le rattrapage s'applique à partir de 2026 pour les indépendants: ils peuvent verser les lacunes des années précédentes jusqu'à trois montants annuels maximaux en même temps. Pour les salariés avec caisse de pension, cela reste exclu.»",
        },
      ],
      feedback:
        "Nouvelle réglementation à partir de 2026: les lacunes de cotisation à partir de l'année 2025 peuvent être rattrapées. Condition: le montant maximal actuel (CHF 7'258) doit d'abord être entièrement utilisé dans l'année en cours. Les lacunes avant 2025 ne sont pas rattrapables. Les versements de rattrapage sont également fiscalement déductibles!",
    },
    "3.4": {
      title: "Impact du retrait anticipé LPP sur la rente",
      situation:
        "M. Müller, 45 ans, a retiré CHF 50'000 de sa caisse de pension il y a 10 ans pour l'achat de sa première résidence principale (retrait anticipé EPL). Il demande maintenant: «Qu'arrive-t-il à ma rente LPP si je ne rembourse pas le montant?»",
      question: "Qu'expliquez-vous à M. Müller?",
      options: [
        {
          key: "A",
          text: "«Rien – le retrait anticipé de plus de 5 ans est entièrement oublié, il n'a plus aucun effet sur la rente»",
        },
        {
          key: "B",
          text: "«Votre future rente LPP est durablement réduite car le capital prélevé n'a plus généré de rendement. La réduction exacte est indiquée dans votre relevé de caisse de pension sous 'rente projetée'»",
        },
        {
          key: "C",
          text: "«Le retrait anticipé est comptabilisé comme dette à la retraite – la caisse de pension déduit CHF 50'000 du capital, plus les intérêts»",
        },
        {
          key: "D",
          text: "«Seulement s'il vend le bien immobilier doit-il rembourser – sinon le retrait anticipé n'a aucun effet»",
        },
      ],
      feedback:
        "Retrait anticipé EPL = réduction durable de la rente, car le capital prélevé ne génère plus d'intérêts ni de rendement. Exemple: CHF 50'000 à 2% d'intérêt en moyenne sur 20 ans ≈ CHF 74'000 de perte en capital à la retraite. Le relevé LPP ne montre pas séparément la «rente de vieillesse projetée avec et sans retrait» — il montre uniquement l'état actuel. Important: le remboursement est volontaire, possible jusqu'à 3 ans avant l'âge ordinaire de la retraite.",
    },
    "3.5": {
      title: "Régime matrimonial et 3a en cas de divorce",
      situation:
        "Un couple est sur le point de divorcer. La femme a un compte 3a avec CHF 85'000. L'homme n'a pas de compte 3a. Elle demande: «Dois-je partager mes avoirs 3a?»",
      question: "Qu'expliquez-vous?",
      options: [
        {
          key: "A",
          text: "«Non – les avoirs 3a sont des économies personnelles et ne sont jamais partagés, même en cas de divorce»",
        },
        {
          key: "B",
          text: "«Oui – en principe, les avoirs 3a versés pendant le mariage sont partagés à moitié. Les versements avant le mariage restent siens. C'est régi par l'art. 122 CC (partage de la prévoyance)»",
        },
        {
          key: "C",
          text: "«Seulement si elle a épargné l'argent avant le mariage – les avoirs accumulés après le mariage sont des acquêts et appartiennent à la communauté»",
        },
        {
          key: "D",
          text: "«Les avoirs ne sont partagés que si les deux étaient mariés sous le régime ordinaire (participation aux acquêts) – sinon non»",
        },
      ],
      feedback:
        "Partage de la prévoyance en cas de divorce (art. 122 CC): les avoirs 3a et LPP versés pendant le mariage font partie de la «prévoyance conjugale» et sont partagés à moitié — indépendamment du régime matrimonial. Les versements avant le mariage en sont exclus. Important: les comptes 3a ne sont pas directement transférés — le montant est transféré sur le compte de libre passage de l'autre.",
    },
    "3.3": {
      briefing:
        "Nouveau client, indépendant, sans caisse de pension, revenu annuel CHF 180'000. Demande une stratégie 3a optimale.",
      question:
        "Les indépendants sans caisse de pension peuvent verser jusqu'à ___ % du revenu net dans le pilier 3a.",
      feedback:
        "Les indépendants sans caisse de pension ont un maximum 3a plus élevé: 20% du revenu net, au maximum CHF 36'288. Avec un revenu de CHF 180'000: CHF 36'000 possible. L'économie fiscale est énorme! Plusieurs comptes pour des retraits échelonnés à la retraite sont très recommandés.",
    },
  },

  it: {
    "1.1": {
      title: "Spiegare i 3 pilastri",
      situation:
        "Cliente giovane, 22 anni, chiede: 'Sento sempre parlare dei 3 pilastri – cosa significa esattamente?'",
      question: "Cosa le spiega?",
      options: [
        {
          key: "A",
          text: "«L'AVS e la cassa pensione coprono insieme l'80-100% dell'ultimo salario. Un 3° pilastro è necessario solo per gli indipendenti che non hanno una cassa pensione.»",
        },
        {
          key: "B",
          text: "«I 3 pilastri costituiscono il sistema previdenziale svizzero. 1° pilastro = AVS, statale, per tutti. 2° pilastro = cassa pensione, professionale, tramite il datore di lavoro. 3° pilastro = privato, volontario, fiscalmente attraente.»",
        },
        {
          key: "C",
          text: "«Il 1° pilastro (AVS) è obbligatorio per tutti e copre i bisogni fondamentali. Il 2° e il 3° pilastro sono integrazioni volontarie – a 22 anni non ancora prioritari.»",
        },
        {
          key: "D",
          text: "«Il 1° pilastro è l'AVS, valido per tutti. Il 2° pilastro è solo per i dipendenti di grandi aziende. Il conto 3a è il Suo strumento di risparmio più importante.»",
        },
      ],
      feedback:
        "I 3 pilastri formano insieme la previdenza per la vecchiaia svizzera. Obiettivo: ricevere circa il 60% dell'ultimo salario come rendita alla pensione. Il 1° e il 2° pilastro da soli spesso non bastano – per questo il 3° pilastro come integrazione privata è particolarmente importante.",
    },
    "1.2": {
      title: "Raccomandare il pilastro 3a",
      situation:
        "Cliente, 28 anni, dipendente, dice: 'Desidero risparmiare per la vecchiaia e risparmiare sulle tasse. Cosa mi raccomanda?'",
      question: "Cosa raccomanda?",
      options: [
        {
          key: "A",
          text: "Conto di risparmio – con il massimo annuo di CHF 7'258, il 3a non ha un vero effetto. Il conto di risparmio è completamente disponibile, offre la stessa sicurezza ed è una base migliore con lo stesso obiettivo di risparmio.",
        },
        {
          key: "B",
          text: "Pilastro 3b tramite un'assicurazione sulla vita – beneficia anch'esso di agevolazioni fiscali, offre più flessibilità del conto 3a ed è quindi la scelta migliore per i dipendenti con cassa pensione.",
        },
        {
          key: "C",
          text: "Azioni tramite un deposito – le plusvalenze sono esenti da imposta in Svizzera, e a lungo termine il rendimento storico delle azioni di circa il 7% annuo supera nettamente il vantaggio fiscale del 3a.",
        },
        {
          key: "D",
          text: "Pilastro 3a – fiscalmente deducibile, fino a CHF 7'258 all'anno versabili, il denaro è vincolato fino alla pensione",
        },
      ],
      feedback:
        "Il pilastro 3a è ideale per l'ottimizzazione fiscale e la previdenza per la vecchiaia. I versamenti sono interamente deducibili dal reddito imponibile. Massimo 2026: CHF 7'258 all'anno. Il denaro è vincolato fino a 5 anni prima della pensione – eccezioni (p.es. abitazione principale, emigrazione) sono possibili.",
    },
    "1.4": {
      title: "Lacune AVS e riduzione della rendita",
      situation:
        "Cliente Fatima, 32 anni, è stata 3 anni all'estero. Chiede: «Non ho pagato contributi AVS durante questo periodo. Cosa succede alla mia rendita?»",
      question: "Cosa spiega a Fatima?",
      options: [
        {
          key: "A",
          text: "«Nessun impatto – le rendite AVS vengono calcolate solo sull'ultimo salario, non sulla durata dei contributi»",
        },
        {
          key: "B",
          text: "«Ogni anno mancante riduce la rendita AVS di circa 1/44 – 3 lacune corrispondono a circa il 6,8% di riduzione della rendita. Le lacune possono essere colmate volontariamente fino a 5 anni prima dell'età AVS»",
        },
        {
          key: "C",
          text: "«Le lacune AVS comportano automaticamente la perdita di tutti i diritti – Fatima dovrebbe richiedere una nuova affiliazione AVS il prima possibile»",
        },
        {
          key: "D",
          text: "«All'estero si contribuisce spesso al sistema pensionistico locale – questo viene compensato con l'AVS svizzera, senza riduzione»",
        },
      ],
      feedback:
        "La rendita AVS completa richiede 44 anni di contributi (uomini e donne). Ogni anno mancante riduce la rendita di 1/44 ≈ 2,27%. 3 anni mancanti = circa il 6,8% di rendita in meno. Le lacune possono essere colmate volontariamente – ma solo fino a 5 anni retroattivamente e solo se ancora soggetti all'AVS. Raccomandazione: richiedere un estratto AVS e identificare le lacune.",
    },
    "1.5": {
      title: "Quando inizia l'obbligo contributivo AVS?",
      situation:
        "Tim, apprendista di 16 anni, ha un lavoro estivo e guadagna CHF 1'800 in 2 mesi. Chiede: «Devo già pagare l'AVS?»",
      question: "Cosa spiega a Tim?",
      options: [
        {
          key: "A",
          text: "«No, l'obbligo contributivo AVS inizia solo a 18 anni»",
        },
        {
          key: "B",
          text: "«Sì a partire dai 17 anni – ma solo su un reddito superiore a CHF 2'000»",
        },
        {
          key: "C",
          text: "«Sì a partire dal 1° gennaio successivo al 17° compleanno, e per i non attivi a partire dai 20 anni. Per i lavoratori si applica una franchigia di CHF 2'300 all'anno e per datore di lavoro»",
        },
        {
          key: "D",
          text: "«No, gli apprendisti e i lavori vacanzieri sono sempre esenti fino al termine dell'apprendistato»",
        },
      ],
      feedback:
        "Obbligo contributivo AVS per i lavoratori: a partire dal 1° gennaio successivo al 17° compleanno. Franchigia per i giovani (fino alla fine dell'anno del 25° compleanno): CHF 2'300 per datore di lavoro e anno. Tim guadagna CHF 1'800 – sotto la franchigia, quindi nessun obbligo AVS. Non attivi (studenti, casalinghe/-i) a partire dal 1° gennaio successivo al 20° compleanno.",
    },
    "1.3": {
      title: "3a vs. 3b",
      situation: "Un cliente chiede: 'Qual è la differenza tra 3a e 3b?'",
      question: "Cosa spiega?",
      options: [
        {
          key: "A",
          text: "«Il 3a è vincolato e fiscalmente deducibile – importo massimo annuale. Il 3b è libero – nessun limite, nessuna agevolazione fiscale, disponibile in qualsiasi momento.»",
        },
        {
          key: "B",
          text: "«3a e 3b sono fiscalmente identici – entrambe le forme sono interamente deducibili dal reddito imponibile. La differenza sta solo nel fornitore: 3a tramite una banca, 3b tramite un'assicurazione.»",
        },
        {
          key: "C",
          text: "«Il 3b è generalmente la scelta migliore: dalla riforma fiscale del 2019, i versamenti nelle polizze 3b sono parzialmente deducibili a livello cantonale, e non vi è alcun periodo di blocco fino alla pensione.»",
        },
        {
          key: "D",
          text: "«Il 3a è adatto principalmente agli indipendanti senza cassa pensione, che possono versare fino al 20% del loro reddito. Per i dipendenti con cassa pensione, il conto 3b è fiscalmente più attraente perché senza periodo di blocco.»",
        },
      ],
      feedback:
        "3a = vincolato, vantaggio fiscale, massimo CHF 7'258 (dipendenti). 3b = libero, nessun vantaggio fiscale, nessun massimo, disponibile in qualsiasi momento. Raccomandazione: sfruttare prima al massimo il 3a per beneficiare del vantaggio fiscale, poi 3b per risparmi supplementari flessibili.",
    },
    "2.1": {
      title: "Calcolare il vantaggio fiscale",
      situation:
        "Un cliente con aliquota marginale del 25% vuole sapere quanto risparmia versando CHF 7'258 nel 3a.",
      question: "Cosa dice al cliente?",
      options: [
        {
          key: "A",
          text: "«Con un'aliquota marginale del 25%, il vantaggio fiscale federale è di circa CHF 500 – la maggior parte del risparmio fiscale si realizza al momento del prelievo alla pensione, perché l'aliquota di prelievo è allora notevolmente inferiore.»",
        },
        {
          key: "B",
          text: "«Non è possibile dirlo in modo forfettario – il vantaggio fiscale effettivo dipende dal cantone, dal comune e dal reddito imponibile esatto. L'autorità fiscale deve calcolarlo individualmente.»",
        },
        {
          key: "C",
          text: "«Il vantaggio si applica esclusivamente all'imposta federale diretta – le imposte sul reddito cantonali e comunali non possono essere ridotte tramite versamenti 3a, quindi conviene solo a redditi molto elevati.»",
        },
        {
          key: "D",
          text: "«Con un'aliquota marginale del 25%, risparmia CHF 1'814,50 di imposte – semplicemente grazie al versamento 3a di CHF 7'258.»",
        },
      ],
      feedback:
        "Risparmio fiscale = versamento × aliquota marginale. CHF 7'258 × 25% = CHF 1'814,50. È quasi uno stipendio mensile risparmiato – ogni anno! Più alto è il reddito e l'aliquota marginale, maggiore è il vantaggio fiscale del versamento 3a.",
    },
    "2.2": {
      title: "Prelievo anticipato del 3a",
      situation:
        "Un cliente, 45 anni, chiede: 'Posso prelevare anticipatamente il mio denaro dal 3a? Ne ho bisogno per una ristrutturazione.'",
      question: "Cosa spiega?",
      options: [
        {
          key: "A",
          text: "«Sì, possibile – deve documentare il progetto di ristrutturazione e presentare il modulo di prelievo anticipato. Trasferiremo poi direttamente all'impresa artigianale.»",
        },
        {
          key: "B",
          text: "«Il prelievo anticipato è possibile solo a determinate condizioni: acquisto di abitazione principale, ristrutturazione PPP, inizio di attività indipendente, emigrazione o invalidità. Una ristrutturazione di un appartamento in affitto non è sufficiente.»",
        },
        {
          key: "C",
          text: "«Il prelievo anticipato è consentito solo all'acquisto di proprietà – non per ristrutturazioni. Nel suo caso, purtroppo deve aspettare fino alla pensione.»",
        },
        {
          key: "D",
          text: "«Il prelievo è possibile se i costi di ristrutturazione ammontano ad almeno CHF 50'000. Porti i preventivi in modo da poter presentare la richiesta.»",
        },
      ],
      feedback:
        "Prelievo anticipato 3a possibile, ma solo per scopi specifici: PPP (promozione della proprietà d'abitazione – acquisto o ristrutturazione che aumenta il valore dell'abitazione principale), inizio di attività indipendente, emigrazione, invalidità o decesso. La ristrutturazione di un appartamento in affitto non è computabile.",
    },
    "2.4": {
      title: "Riscatto nella cassa pensione e vantaggio fiscale",
      situation:
        "Il sig. Roth, 50 anni, aliquota marginale 35%, ha secondo il suo estratto della cassa pensione un potenziale di riscatto di CHF 80'000. Chiede: «Vale la pena effettuare un riscatto volontario nella cassa pensione?»",
      question: "Cosa spiega al sig. Roth?",
      options: [
        {
          key: "A",
          text: "«No – i riscatti nella cassa pensione convengono solo se si è vicini alla pensione. A 50 anni, 15 anni è troppo lungo fino al prelievo»",
        },
        {
          key: "B",
          text: "«Sì – CHF 80'000 di riscatto risparmia circa CHF 28'000 di imposte immediatamente con un'aliquota marginale del 35%. Più una rendita della cassa pensione più alta. Importante: rispettare il periodo di blocco di 3 anni prima del prelievo in capitale»",
        },
        {
          key: "C",
          text: "«Solo se opta per il prelievo in capitale invece della rendita – altrimenti il riscatto non conviene fiscalmente»",
        },
        {
          key: "D",
          text: "«I riscatti nella cassa pensione non sono fiscalmente deducibili – solo i versamenti 3a possono essere dedotti dal reddito imponibile»",
        },
      ],
      feedback:
        "Riscatto LPP = doppio vantaggio: 1) Risparmio fiscale immediato pari a riscatto × aliquota marginale (CHF 80'000 × 35% = CHF 28'000). 2) Rendita o capitale più alto alla pensione. Importante: periodo di blocco di 3 anni – chi preleva il capitale poco dopo deve restituire il vantaggio fiscale. A 50 anni, assolutamente non un problema.",
    },
    "2.5": {
      title: "Rendita transitoria fino all'età AVS",
      situation:
        "La sig.ra Schneider, 62 anni, desidera il pensionamento anticipato (età AVS ordinaria 65). Il regolamento della sua cassa pensione consente il pensionamento a partire dai 60 anni. Chiede: «Cosa succede all'AVS nella lacuna fino a 65 anni?»",
      question: "Cosa spiega alla sig.ra Schneider?",
      options: [
        {
          key: "A",
          text: "«Nessuna lacuna – la rendita AVS può essere richiesta a partire dai 62 anni, semplicemente con una riduzione»",
        },
        {
          key: "B",
          text: "«Molte casse pensione pagano fino all'età AVS una rendita transitoria che compensa l'AVS mancante. Questa viene automaticamente ridotta dopo i 65 anni quando inizia la vera AVS»",
        },
        {
          key: "C",
          text: "«L'AVS funziona automaticamente – deve solo informare la cassa pensione»",
        },
        {
          key: "D",
          text: "«Dal pensionamento anticipato, l'obbligo AVS cessa – nessun contributo, nessuna lacuna»",
        },
      ],
      feedback:
        "Il pensionamento anticipato crea una lacuna AVS: tra l'età pensionistica e l'età AVS non si riceve ancora l'AVS. Soluzione di molte casse pensione: rendita transitoria pari alla rendita AVS attesa (circa CHF 2'450/mese max.) fino all'età AVS. Dopo la rendita LPP diminuisce e l'AVS inizia. Importante: i non attivi devono continuare a pagare contributi AVS come non attivi!",
    },
    "2.3": {
      title: "Secondo conto 3a",
      situation: "Una cliente ha CHF 65'000 su un unico conto 3a. Chiede se è corretto.",
      question: "Cosa raccomanda?",
      options: [
        {
          key: "A",
          text: "«A partire da CHF 50'000 raccomando di aprire un secondo conto 3a. Al momento del prelievo, i conti 3a vengono tassati separatamente – prelievi scaglionati su più anni riducono massivamente il carico fiscale.»",
        },
        {
          key: "B",
          text: "«Va tutto bene – la protezione dei depositi protegge i conti 3a fino a CHF 100'000 per banca, e al momento del prelievo alla pensione è determinante solo l'importo totale, non il numero di conti.»",
        },
        {
          key: "C",
          text: "«Saldare il conto esistente e trasferirlo in un deposito titoli 3a – i fondi ottengono a lungo termine un rendimento migliore rispetto agli averi in conto, e fiscalmente nulla cambia al momento del prelievo.»",
        },
        {
          key: "D",
          text: "«A partire da CHF 50'000 si applica un tasso d'interesse ridotto per i conti 3a. La banca è tenuta a suddividere i depositi da questo importo affinché il tasso più alto continui ad applicarsi.»",
        },
      ],
      feedback:
        "I prelievi 3a vengono tassati separatamente dal reddito ordinario – a un'aliquota ridotta. Con più conti, i prelievi possono essere scaglionati su anni diversi, ottenendo ogni volta un'aliquota fiscale più bassa. A partire da CHF 50'000, un secondo conto è vivamente raccomandato!",
    },
    "3.1": {
      title: "Capacità finanziaria all'età pensionabile",
      situation:
        "Cliente, 52 anni, desidera un'ipoteca di CHF 600'000. Reddito attuale CHF 120'000. Rendita LPP secondo estratto CHF 24'000/anno. Pensionamento tra 13 anni.",
      question: "Cosa dice al cliente?",
      options: [
        {
          key: "A",
          text: "«Va tutto bene – la capacità finanziaria attuale è data. La verifica della capacità all'età pensionabile si applica solo alle ipoteche a tasso fisso con durata superiore a 15 anni.»",
        },
        {
          key: "B",
          text: "«Capacità finanziaria all'età pensionabile non data. L'82,4% è massicciamente sopra il limite del 38%. L'ipoteca deve essere ammortizzata maggiormente prima del pensionamento o l'importo ridotto.»",
        },
        {
          key: "C",
          text: "«Conta solo la capacità finanziaria attuale – il pensionamento tra 13 anni è ancora lontano»",
        },
        {
          key: "D",
          text: "«Raccomandare un riscatto LPP – tramite un riscatto di CHF 120'000 nella cassa pensione, la rendita annuale LPP sale oltre CHF 36'000, il che porta automaticamente la capacità all'età pensionabile sotto il 38%.»",
        },
      ],
      feedback:
        "La capacità finanziaria deve essere data OGGI e ALL'ETÀ PENSIONABILE. Limite all'età pensionabile: 38%. L'82,4% non è accettabile. Soluzione: ammortizzare di più prima del pensionamento o scegliere un oggetto meno costoso. Il riscatto LPP sarebbe possibile, ma da solo non è sufficiente.",
    },
    "3.2": {
      title: "Versamento recupero 3a a partire dal 2026",
      situation:
        "Un cliente, 40 anni, dice: 'Ho dimenticato di versare nel 3a nel 2025. Questi CHF 7'000 sono persi?'",
      question: "Cosa risponde?",
      options: [
        {
          key: "A",
          text: "«No! A partire dal 2026, i versamenti mancati a partire dal 2025 possono essere recuperati. Condizione: l'importo massimo attuale di CHF 7'258 deve prima essere versato completamente. Le lacune prima del 2025 purtroppo non recuperabili.»",
        },
        {
          key: "B",
          text: "«Sì purtroppo – la possibilità di versamento nel pilastro 3a è strettamente limitata all'anno fiscale corrente. La legge federale esclude qualsiasi versamento retroattivo, anche per il 2025.»",
        },
        {
          key: "C",
          text: "«Versare semplicemente il doppio dell'importo massimo quest'anno – CHF 14'516 sono ammissibili per recuperare un anno precedente. Le autorità fiscali accettano ciò direttamente nella dichiarazione fiscale come recupero per il 2025.»",
        },
        {
          key: "D",
          text: "«Il recupero vale dal 2026 per gli indipendenti: possono versare le lacune degli anni precedenti fino a tre importi massimi annuali in una volta. Per i dipendenti con cassa pensione rimane escluso.»",
        },
      ],
      feedback:
        "Nuova regolamentazione dal 2026: le lacune contributive a partire dall'anno 2025 possono essere recuperate. Condizione: l'importo massimo attuale (CHF 7'258) deve prima essere completamente sfruttato nell'anno corrente. Le lacune prima del 2025 non sono recuperabili. I versamenti di recupero sono anch'essi fiscalmente deducibili!",
    },
    "3.4": {
      title: "Impatto del prelievo anticipato LPP sulla rendita",
      situation:
        "Il sig. Müller, 45 anni, ha prelevato CHF 50'000 dalla cassa pensione 10 anni fa per l'acquisto della prima abitazione principale (prelievo anticipato PPP). Chiede ora: «Cosa succede alla mia rendita LPP se non restituisco l'importo?»",
      question: "Cosa spiega al sig. Müller?",
      options: [
        {
          key: "A",
          text: "«Niente – il prelievo anticipato di oltre 5 anni è completamente dimenticato, non ha più alcun effetto sulla rendita»",
        },
        {
          key: "B",
          text: "«La sua futura rendita LPP è durevolmente ridotta perché il capitale prelevato non ha più generato rendimento. La riduzione esatta è indicata nel suo estratto della cassa pensione sotto 'rendita proiettata'»",
        },
        {
          key: "C",
          text: "«Il prelievo anticipato viene contabilizzato come debito alla pensione – la cassa pensione deduce CHF 50'000 dal capitale, più gli interessi»",
        },
        {
          key: "D",
          text: "«Solo se vende l'immobile deve restituire – altrimenti il prelievo anticipato non ha alcun effetto»",
        },
      ],
      feedback:
        "Prelievo anticipato PPP = riduzione duratura della rendita, perché il capitale prelevato non genera più interessi né rendimento. Esempio: CHF 50'000 a un interesse medio del 2% su 20 anni ≈ CHF 74'000 di perdita in capitale alla pensione. L'estratto LPP non mostra separatamente la «rendita di vecchiaia proiettata con e senza prelievo» — mostra solo la situazione attuale. Importante: la restituzione è volontaria, possibile fino a 3 anni prima dell'età pensionabile ordinaria.",
    },
    "3.5": {
      title: "Regime matrimoniale e 3a in caso di divorzio",
      situation:
        "Una coppia è in procinto di divorziare. La moglie ha un conto 3a con CHF 85'000. Il marito non ha un conto 3a. Lei chiede: «Devo dividere i miei averi 3a?»",
      question: "Cosa spiega?",
      options: [
        {
          key: "A",
          text: "«No – gli averi 3a sono risparmi personali e non vengono mai divisi, nemmeno in caso di divorzio»",
        },
        {
          key: "B",
          text: "«Sì – in linea di principio, gli averi 3a versati durante il matrimonio vengono divisi a metà. I versamenti prima del matrimonio rimangono suoi. Ciò è regolato dall'art. 122 CC (ripartizione della previdenza)»",
        },
        {
          key: "C",
          text: "«Solo se ha risparmiato il denaro prima del matrimonio – gli averi accumulati dopo il matrimonio sono acquisti e appartengono alla comunione»",
        },
        {
          key: "D",
          text: "«Gli averi vengono divisi solo se entrambi erano sposati sotto il regime ordinario (partecipazione agli acquisti) – altrimenti no»",
        },
      ],
      feedback:
        "Ripartizione della previdenza in caso di divorzio (art. 122 CC): gli averi 3a e LPP versati durante il matrimonio fanno parte della «previdenza coniugale» e vengono divisi a metà — indipendentemente dal regime matrimoniale. I versamenti prima del matrimonio ne sono esclusi. Importante: i conti 3a non vengono trasferiti direttamente — l'importo viene trasferito sul conto di libero passaggio dell'altro.",
    },
    "3.3": {
      briefing:
        "Nuovo cliente, indipendente, senza cassa pensione, reddito annuo CHF 180'000. Chiede una strategia 3a ottimale.",
      question:
        "Gli indipendenti senza cassa pensione possono versare fino al ___ % del reddito netto nel pilastro 3a.",
      feedback:
        "Gli indipendenti senza cassa pensione hanno un massimo 3a più alto: 20% del reddito netto, massimo CHF 36'288. Con un reddito di CHF 180'000: CHF 36'000 possibile. Il risparmio fiscale è enorme! Più conti per prelievi scaglionati alla pensione sono molto raccomandati.",
    },
  },
};
