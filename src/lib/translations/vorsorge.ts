import type { LangTranslations } from "./utils";

export const VORSORGE_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      situation:
        "Un jeune client, 22 ans, demande : «J'entends toujours parler des 3 piliers – qu'est-ce que ça signifie ?»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«L'AVS et la caisse de pension couvrent ensemble 80–100% du dernier salaire. Le 3e pilier n'est vraiment nécessaire que pour les indépendants qui n'ont pas de caisse de pension.»" },
        { key: "B", text: "«Les 3 piliers constituent le système de prévoyance suisse. 1er pilier = AVS, étatique, pour tous. 2e pilier = caisse de pension, professionnel, via l'employeur. 3e pilier = privé, volontaire, fiscalement attractif.»" },
        { key: "C", text: "«Le 1er pilier (AVS) est obligatoire pour tous et couvre les besoins de base. Les 2e et 3e piliers sont des compléments volontaires – pas encore prioritaires à 22 ans.»" },
        { key: "D", text: "«Le 1er pilier est l'AVS, valable pour tous. Le 2e pilier est uniquement pour les collaborateurs de grandes entreprises. Le 3e pilier avec le compte 3a est votre instrument d'épargne le plus important.»" },
      ],
      feedback:
        "Les 3 piliers forment ensemble la prévoyance vieillesse suisse. Objectif : recevoir environ 60% du dernier salaire comme rente à la retraite. Les 1er et 2e piliers seuls ne suffisent souvent pas – c'est pourquoi le 3e pilier comme complément privé est particulièrement important.",
    },
    "1.2": {
      situation:
        "Une cliente, 28 ans, employée, dit : «Je souhaite épargner pour ma retraite tout en réduisant mes impôts. Que me conseillez-vous ?»",
      question: "Que conseillez-vous ?",
      options: [
        { key: "A", text: "Compte d'épargne – avec un maximum annuel de CHF 7'258, le 3a n'a pas d'effet réel. Le compte d'épargne est entièrement disponible, offre la même sécurité et est une meilleure base pour un objectif d'épargne simultané." },
        { key: "B", text: "Pilier 3b via une assurance-vie – il bénéficie également d'avantages fiscaux, offre plus de flexibilité que le compte 3a et est donc le meilleur choix pour les salariés avec caisse de pension." },
        { key: "C", text: "Actions via un dépôt – les gains en capital sont exonérés d'impôt en Suisse, et à long terme le rendement historique des actions d'environ 7% p.a. dépasse nettement l'avantage fiscal du 3a." },
        { key: "D", text: "Pilier 3a – déductible fiscalement, jusqu'à CHF 7'258 versables par an, l'argent est bloqué jusqu'à la retraite" },
      ],
      feedback:
        "Le pilier 3a est idéal pour l'optimisation fiscale et la prévoyance vieillesse. Les versements sont entièrement déductibles du revenu imposable. Maximum 2026 : CHF 7'258 par an. L'argent est bloqué jusqu'à 5 ans avant la retraite – des exceptions (p.ex. logement en propriété, émigration) sont possibles.",
    },
    "1.3": {
      situation: "Un client demande : «Quelle est la différence entre 3a et 3b ?»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«Le 3a est lié et déductible fiscalement – montant maximal de versement par an. Le 3b est libre – pas de limite, pas d'avantage fiscal, disponible à tout moment.»" },
        { key: "B", text: "«Le 3a et le 3b sont fiscalement identiques – les deux formes sont entièrement déductibles du revenu imposable. La différence réside uniquement dans le prestataire : 3a via la banque, 3b via l'assurance.»" },
        { key: "C", text: "«Le 3b est généralement le meilleur choix : depuis la réforme fiscale de 2019, les versements dans les polices 3b sont partiellement déductibles au niveau cantonal, et on n'est pas soumis à un délai de blocage jusqu'à la retraite.»" },
        { key: "D", text: "«Le 3a convient principalement aux indépendants sans caisse de pension, qui peuvent verser jusqu'à 20% de leur revenu. Pour les salariés avec caisse de pension, le compte 3b est fiscalement plus attractif car il n'y a pas de délai de blocage.»" },
      ],
      feedback:
        "3a = lié, avantage fiscal, maximum CHF 7'258 (salariés). 3b = libre, pas d'avantage fiscal, pas de maximum, disponible à tout moment. Recommandation : d'abord maximiser le 3a pour profiter de l'avantage fiscal, ensuite le 3b pour des économies complémentaires flexibles.",
    },
    "1.4": {
      situation:
        "La cliente Fatima, 32 ans, a passé 3 ans à l'étranger. Elle demande : «Pendant cette période, je n'ai pas payé de cotisations AVS. Qu'arrive-t-il à ma rente ?»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«Pas d'impact – les rentes AVS sont calculées uniquement en fonction du dernier salaire, pas de la durée de cotisation»" },
        { key: "B", text: "«Chaque année manquante de cotisation réduit la rente AVS d'environ 1/44 – 3 lacunes correspondent à environ 6.8% de réduction. Les lacunes peuvent être comblées jusqu'à 5 ans avant l'âge AVS»" },
        { key: "C", text: "«Les lacunes AVS entraînent automatiquement la perte de tous les droits – Fatima devrait demander une nouvelle affiliation AVS dès que possible»" },
        { key: "D", text: "«À l'étranger, on cotise souvent au système de retraite local – cela est déduit de l'AVS suisse, sans réduction»" },
      ],
      feedback:
        "La rente AVS complète requiert 44 années de cotisation (hommes et femmes). Chaque année manquante réduit la rente de 1/44 ≈ 2.27%. 3 années manquantes = environ 6.8% de rente en moins. Les lacunes peuvent être comblées volontairement – mais seulement jusqu'à 5 ans rétroactivement et seulement si encore soumis à l'AVS. Recommandation : demander un extrait AVS et identifier les lacunes.",
    },
    "1.5": {
      situation:
        "L'apprenti Tim, 16 ans, a un job d'été et gagne CHF 1'800 en 2 mois. Il demande : «Dois-je déjà payer l'AVS ?»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«Non, l'obligation de cotiser à l'AVS commence seulement à 18 ans»" },
        { key: "B", text: "«Oui à partir de 17 ans – mais seulement sur les revenus supérieurs à CHF 2'000»" },
        { key: "C", text: "«Oui à partir du 1er janvier suivant le 17e anniversaire, et pour les non-actifs à partir de 20 ans. En cas d'activité lucrative, une franchise de CHF 2'300 par an et par employeur s'applique»" },
        { key: "D", text: "«Non, les apprentis et les jobs de vacances sont toujours exempts de cotisations jusqu'à la fin de l'apprentissage»" },
      ],
      feedback:
        "Obligation de cotiser à l'AVS en cas d'activité lucrative : à partir du 1er janvier suivant le 17e anniversaire. Franchise pour les jeunes (jusqu'à la fin de l'année de leur 25e anniversaire) : CHF 2'300 par employeur et par an. Tim gagne CHF 1'800 – en dessous de la franchise, donc pas d'obligation AVS. Non-actifs (étudiants, femmes/hommes au foyer) à partir du 1er janvier suivant le 20e anniversaire.",
    },
    "2.1": {
      situation:
        "Un client avec un taux marginal d'imposition de 25% souhaite savoir combien il économise s'il verse CHF 7'258 dans le 3a.",
      question: "Que dites-vous au client ?",
      options: [
        { key: "A", text: "«Avec un taux marginal de 25%, l'avantage fiscal fédéral est d'environ CHF 500 – la majeure partie de l'économie fiscale n'intervient qu'au retrait à la retraite, car le taux d'imposition sur le retrait est alors nettement plus bas.»" },
        { key: "B", text: "«On ne peut pas le dire de manière générale – l'avantage fiscal réel dépend de votre canton, de votre commune et du revenu imposable exact. L'administration fiscale doit le calculer individuellement avant qu'une recommandation soit pertinente.»" },
        { key: "C", text: "«L'avantage s'applique exclusivement à l'impôt fédéral direct – les impôts cantonaux et communaux sur le revenu ne peuvent pas être réduits par des versements 3a, donc cela ne vaut la peine qu'avec un revenu très élevé.»" },
        { key: "D", text: "«Avec un taux marginal de 25%, vous économisez CHF 1'814.50 d'impôts – simplement grâce au versement 3a de CHF 7'258.»" },
      ],
      feedback:
        "Économie fiscale = versement × taux marginal. CHF 7'258 × 25% = CHF 1'814.50. C'est presque un mois de salaire économisé – chaque année ! Plus le revenu et le taux marginal sont élevés, plus l'avantage fiscal du versement 3a est grand.",
    },
    "2.2": {
      situation:
        "Un client, 45 ans, demande : «Puis-je retirer mon argent 3a de manière anticipée ? J'en ai besoin pour une rénovation.»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«Oui, c'est possible – vous devez justifier le projet de rénovation et déposer le formulaire de retrait anticipé. Nous virerons ensuite directement à l'entreprise artisanale.»" },
        { key: "B", text: "«Le retrait anticipé n'est possible que sous certaines conditions : achat de logement en propriété, rénovation EPL, démarrage d'une activité indépendante, émigration ou invalidité. Une rénovation pour un appartement loué ne suffit pas.»" },
        { key: "C", text: "«Le retrait anticipé n'est autorisé qu'en cas d'achat de logement en propriété – pas pour des rénovations. Pour votre cas, vous devrez malheureusement attendre la retraite.»" },
        { key: "D", text: "«Le retrait est possible si les coûts de rénovation sont d'au moins CHF 50'000. Veuillez apporter les devis pour que nous puissions soumettre la demande.»" },
      ],
      feedback:
        "Le retrait anticipé du 3a est possible, mais uniquement pour des objectifs spécifiques : EPL (encouragement à la propriété du logement – achat ou rénovation augmentant la valeur du logement en propriété), démarrage d'une activité indépendante, émigration, invalidité ou décès. La rénovation d'un appartement loué n'est pas eligible.",
    },
    "2.3": {
      situation:
        "Une cliente a CHF 65'000 sur un seul compte 3a. Elle demande si c'est correct.",
      question: "Que conseillez-vous ?",
      options: [
        { key: "A", text: "«À partir de CHF 50'000, je recommande d'ouvrir un deuxième compte 3a. Lors du retrait, les comptes 3a sont imposés séparément – des retraits échelonnés sur plusieurs années réduisent massivement la charge fiscale.»" },
        { key: "B", text: "«Tout va bien – la garantie des dépôts protège les comptes 3a jusqu'à CHF 100'000 par banque, et lors du retrait à la retraite, seul le montant total est fiscalement déterminant, pas le nombre de comptes.»" },
        { key: "C", text: "«Solder le compte existant et le transférer dans un dépôt-titres 3a – les fonds obtiennent un meilleur rendement à long terme que les avoirs en compte, et fiscalement rien ne change lors du retrait.»" },
        { key: "D", text: "«À partir de CHF 50'000, les comptes 3a bénéficient d'un taux d'intérêt réduit. La banque est obligée de diviser les avoirs à partir de ce montant pour que le taux d'intérêt plus élevé continue de s'appliquer.»" },
      ],
      feedback:
        "Les retraits 3a sont imposés séparément du revenu ordinaire – à un taux réduit. Avec plusieurs comptes, les retraits peuvent être échelonnés sur différentes années, ce qui donne à chaque fois un taux d'imposition plus bas. À partir de CHF 50'000, un deuxième compte est fortement recommandé !",
    },
    "2.4": {
      situation:
        "Monsieur Roth, 50 ans, taux marginal 35%, a selon son relevé de caisse de pension un potentiel de rachat de CHF 80'000. Il demande : «Vaut-il la peine de faire un rachat volontaire dans la caisse de pension ?»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«Non – les rachats dans la CP ne valent la peine que peu avant la retraite. À 50 ans, 15 ans, c'est trop long jusqu'au versement»" },
        { key: "B", text: "«Oui – un rachat de CHF 80'000 économise environ CHF 28'000 d'impôts immédiatement avec un taux marginal de 35%. Plus une rente CP plus élevée. Important : respecter le délai de blocage de 3 ans avant le retrait en capital»" },
        { key: "C", text: "«Seulement s'il opte pour le retrait en capital plutôt que la rente – sinon le rachat n'est pas fiscalement avantageux»" },
        { key: "D", text: "«Les rachats dans la CP ne sont pas déductibles fiscalement – seuls les versements 3a peuvent être déduits du revenu imposable»" },
      ],
      feedback:
        "Rachat CP = double avantage : 1) Économie fiscale immédiate du montant du rachat × taux marginal (CHF 80'000 × 35% = CHF 28'000). 2) Rente ou capital plus élevé à la retraite. Important : délai de blocage de 3 ans – qui retire le capital peu après devra rembourser l'avantage fiscal. À 50 ans, absolument pas un problème.",
    },
    "2.5": {
      situation:
        "Madame Schneider, 62 ans, souhaite prendre une retraite anticipée (âge AVS ordinaire 65). Son règlement de caisse de pension permet la retraite dès 60 ans. Elle demande : «Que se passe-t-il avec l'AVS pendant la période de transition jusqu'à 65 ans ?»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«Pas de lacune – la rente AVS peut être demandée dès 62 ans, avec simplement une réduction»" },
        { key: "B", text: "«De nombreuses CP versent jusqu'à l'âge AVS une rente transitoire qui compense l'AVS manquante. Celle-ci est automatiquement réduite après 65 ans quand la vraie AVS commence»" },
        { key: "C", text: "«L'AVS fonctionne automatiquement – elle doit seulement informer la caisse de pension»" },
        { key: "D", text: "«Dès la retraite anticipée, l'obligation AVS disparaît – pas de cotisations, pas de lacunes»" },
      ],
      feedback:
        "La retraite anticipée crée une lacune AVS : entre l'âge de retraite et l'âge AVS, on ne reçoit pas encore l'AVS. Solution de nombreuses CP : rente transitoire d'un montant équivalent à la rente AVS attendue (env. CHF 2'450/mois max.) jusqu'à l'âge AVS. Ensuite la rente CP diminue et l'AVS commence. Important : les non-actifs doivent continuer à payer des cotisations AVS en tant que non-actifs !",
    },
    "3.1": {
      situation:
        "Un client, 52 ans, souhaite une hypothèque de CHF 600'000. Revenu actuel CHF 120'000. Rente CP selon relevé CHF 24'000/an. Retraite dans 13 ans.",
      question: "Que dites-vous au client ?",
      options: [
        { key: "A", text: "«Tout va bien – la supportabilité actuelle est donnée. L'examen de la supportabilité à l'âge de la retraite ne s'applique qu'aux hypothèques à taux fixe avec une durée supérieure à 15 ans ; pour les hypothèques renouvelables, seule la situation actuelle est évaluée.»" },
        { key: "B", text: "«La supportabilité à l'âge de la retraite n'est pas donnée. 82.4% dépasse massivement la limite de 38%. L'hypothèque doit être davantage amortie avant la retraite ou le montant réduit.»" },
        { key: "C", text: "«Seule la supportabilité actuelle compte – la retraite dans 13 ans est encore loin»" },
        { key: "D", text: "«Recommander un rachat CP – grâce à un rachat de CHF 120'000 dans la caisse de pension, la rente CP annuelle augmente à plus de CHF 36'000, ce qui ramène automatiquement la supportabilité à la retraite sous 38%.»" },
      ],
      feedback:
        "La supportabilité doit être assurée AUJOURD'HUI et À L'ÂGE DE LA RETRAITE. Limite à l'âge de la retraite : 38%. 82.4% n'est pas acceptable. Solution : amortir davantage avant la retraite ou choisir un objet moins cher. Le rachat CP est possible, mais ne suffit pas seul.",
    },
    "3.2": {
      situation:
        "Un client, 40 ans, dit : «J'ai oublié de cotiser au 3a en 2025. Ces CHF 7'000 sont-ils perdus ?»",
      question: "Que répondez-vous ?",
      options: [
        { key: "A", text: "«Non ! À partir de 2026, les versements manqués à partir de 2025 peuvent être rattrapés. Condition : le montant maximal actuel de CHF 7'258 doit d'abord être entièrement versé. Les lacunes avant 2025 malheureusement non rattrapables.»" },
        { key: "B", text: "«Oui malheureusement – la possibilité de versement dans le pilier 3a est strictement limitée à l'exercice fiscal en cours. La loi fédérale exclut les paiements de rattrapage pour tous les contribuables, même rétroactivement pour 2025.»" },
        { key: "C", text: "«Il suffit de verser le double du montant maximal cette année – CHF 14'516 sont autorisés si l'on veut rattraper une année précédente. Les autorités fiscales l'acceptent directement dans la déclaration d'impôts comme paiement de rattrapage pour 2025.»" },
        { key: "D", text: "«Le paiement de rattrapage s'applique à partir de 2026 pour les indépendants : ils peuvent verser jusqu'à trois montants maximaux annuels en une fois. Pour les salariés avec caisse de pension, cela reste exclu.»" },
      ],
      feedback:
        "Nouvelle règle à partir de 2026 : les lacunes de cotisation à partir de l'année 2025 peuvent être rattrapées. Condition : le montant maximal de l'année en cours (CHF 7'258) doit d'abord être entièrement utilisé. Les lacunes avant 2025 ne sont pas rattrapables. Les paiements de rattrapage sont également fiscalement déductibles !",
    },
    "3.3": {
      briefing:
        "Nouveau client, travailleur indépendant, sans caisse de pension, revenu annuel CHF 180'000. Demande une stratégie 3a optimale.",
      question:
        "Les indépendants sans caisse de pension peuvent verser jusqu'à ___ % du revenu net dans le pilier 3a.",
      feedback:
        "Les indépendants sans caisse de pension ont un maximum 3a plus élevé : 20% du revenu net, au maximum CHF 36'288. Avec un revenu de CHF 180'000 : CHF 36'000 sont possibles. L'économie fiscale est énorme ! Plusieurs comptes pour des retraits échelonnés à la retraite sont très recommandés.",
    },
    "3.4": {
      situation:
        "Monsieur Müller, 45 ans, a retiré CHF 50'000 de sa caisse de pension il y a 10 ans pour l'achat d'un premier logement (retrait EPL). Il demande maintenant : «Que se passe-t-il avec ma rente CP si je ne rembourse pas le montant ?»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«Rien – le retrait anticipé d'il y a plus de 5 ans est complètement oublié, il n'a plus aucun effet sur la rente»" },
        { key: "B", text: "«Votre future rente CP est durablement réduite, car le capital retiré n'a plus généré de rendement. La réduction exacte est indiquée sur votre relevé de caisse de pension sous 'rente projetée'»" },
        { key: "C", text: "«Le retrait anticipé est comptabilisé comme une dette à la retraite – la CP déduit CHF 50'000 du capital, plus les intérêts»" },
        { key: "D", text: "«Ce n'est que s'il vend le bien immobilier qu'il doit rembourser – sinon le retrait anticipé n'a aucun effet»" },
      ],
      feedback:
        "Retrait EPL = réduction permanente de la rente, car le capital retiré ne génère plus d'intérêts ni de rendement. Exemple : CHF 50'000 à un taux d'intérêt moyen de 2% sur 20 ans ≈ CHF 74'000 de perte en capital à la retraite. Important : le remboursement est volontaire, possible jusqu'à 3 ans avant l'âge de retraite ordinaire.",
    },
    "3.5": {
      situation:
        "Un couple est en instance de divorce. La femme a un compte 3a avec CHF 85'000. L'homme n'a pas de compte 3a. Elle demande : «Dois-je partager mon avoir 3a ?»",
      question: "Que lui expliquez-vous ?",
      options: [
        { key: "A", text: "«Non – les avoirs 3a sont des économies personnelles et ne sont jamais partagés, même en cas de divorce»" },
        { key: "B", text: "«Oui – en principe, les avoirs 3a versés pendant le mariage sont partagés à moitié. Les versements avant le mariage restent siens. Ceci est réglé par le CC art. 122 ss (partage de la prévoyance)»" },
        { key: "C", text: "«Seulement si elle a économisé l'argent avant le mariage – les avoirs accumulés après le mariage sont des acquêts et appartiennent à la communauté»" },
        { key: "D", text: "«L'avoir n'est partagé que si les deux étaient mariés sous le régime de la participation aux acquêts – sinon non»" },
      ],
      feedback:
        "Partage de la prévoyance en cas de divorce (CC art. 122 ss) : les avoirs 3a et de caisse de pension versés pendant le mariage appartiennent à la «prévoyance matrimoniale» et sont partagés à moitié – indépendamment du régime matrimonial. Les versements avant le mariage en sont exclus. Important : les comptes 3a ne sont pas directement transférés – le montant est transféré sur le compte de libre passage de l'autre.",
    },
  },
  it: {
    "1.1": {
      situation:
        "Un giovane cliente, 22 anni, chiede: «Sento sempre parlare dei 3 pilastri – cosa significa esattamente?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«AVS e cassa pensioni coprono insieme l'80–100% dell'ultimo salario. Il 3° pilastro è necessario solo per i lavoratori indipendenti che non hanno una cassa pensioni.»" },
        { key: "B", text: "«I 3 pilastri costituiscono il sistema di previdenza svizzero. 1° pilastro = AVS, statale, per tutti. 2° pilastro = cassa pensioni, professionale, tramite il datore di lavoro. 3° pilastro = privato, volontario, fiscalmente attraente.»" },
        { key: "C", text: "«Il 1° pilastro (AVS) è obbligatorio per tutti e copre i bisogni di base. Il 2° e 3° pilastro sono integrazioni volontarie – a 22 anni non ancora prioritari.»" },
        { key: "D", text: "«Il 1° pilastro è l'AVS, valido per tutti. Il 2° pilastro è solo per i dipendenti di grandi aziende. Il 3° pilastro con il conto 3a è il vostro strumento di risparmio più importante.»" },
      ],
      feedback:
        "I 3 pilastri formano insieme la previdenza per la vecchiaia svizzera. Obiettivo: ricevere circa il 60% dell'ultimo salario come rendita alla pensione. Il 1° e 2° pilastro da soli spesso non bastano – per questo il 3° pilastro come integrazione privata è particolarmente importante.",
    },
    "1.2": {
      situation:
        "Una cliente, 28 anni, dipendente, dice: «Vorrei risparmiare per la pensione riducendo le imposte. Cosa mi consiglia?»",
      question: "Cosa consiglio?",
      options: [
        { key: "A", text: "Conto di risparmio – con un massimo annuale di CHF 7'258, il 3a non ha un effetto reale. Il conto di risparmio è completamente disponibile, offre la stessa sicurezza ed è una base migliore per un obiettivo di risparmio simultaneo." },
        { key: "B", text: "Pilastro 3b tramite assicurazione sulla vita – beneficia anche di agevolazioni fiscali, offre più flessibilità del conto 3a ed è quindi la scelta migliore per i dipendenti con cassa pensioni." },
        { key: "C", text: "Azioni tramite un deposito – le plusvalenze sono esenti da imposta in Svizzera, e a lungo termine il rendimento storico delle azioni di circa il 7% p.a. supera nettamente il vantaggio fiscale del 3a." },
        { key: "D", text: "Pilastro 3a – fiscalmente deducibile, fino a CHF 7'258 versabili per anno, il denaro è vincolato fino alla pensione" },
      ],
      feedback:
        "Il pilastro 3a è ideale per l'ottimizzazione fiscale e la previdenza per la vecchiaia. I versamenti sono interamente deducibili dal reddito imponibile. Massimo 2026: CHF 7'258 per anno. Il denaro è vincolato fino a 5 anni prima della pensione – eccezioni (es. proprietà d'abitazione, emigrazione) sono possibili.",
    },
    "1.3": {
      situation: "Un cliente chiede: «Qual è la differenza tra 3a e 3b?»",
      question: "Cosa spieghi?",
      options: [
        { key: "A", text: "«Il 3a è vincolato e fiscalmente deducibile – importo massimo di versamento per anno. Il 3b è libero – nessun limite, nessuna agevolazione fiscale, disponibile in qualsiasi momento.»" },
        { key: "B", text: "«Il 3a e il 3b sono fiscalmente identici – entrambe le forme sono interamente deducibili dal reddito imponibile. La differenza sta solo nel fornitore: 3a tramite banca, 3b tramite assicurazione.»" },
        { key: "C", text: "«Il 3b è generalmente la scelta migliore: dalla riforma fiscale del 2019, i versamenti nelle polizze 3b sono parzialmente deducibili a livello cantonale, e non si è vincolati a un termine di blocco fino alla pensione.»" },
        { key: "D", text: "«Il 3a è adatto principalmente ai lavoratori indipendenti senza cassa pensioni, che possono versare fino al 20% del loro reddito. Per i dipendenti con cassa pensioni, il conto 3b è fiscalmente più attraente perché non c'è termine di blocco.»" },
      ],
      feedback:
        "3a = vincolato, vantaggio fiscale, massimo CHF 7'258 (dipendenti). 3b = libero, nessun vantaggio fiscale, nessun massimo, disponibile in qualsiasi momento. Raccomandazione: prima massimizzare il 3a per sfruttare il vantaggio fiscale, poi il 3b per risparmi aggiuntivi flessibili.",
    },
    "1.4": {
      situation:
        "La cliente Fatima, 32 anni, ha trascorso 3 anni all'estero. Chiede: «Durante questo periodo non ho pagato contributi AVS. Cosa succede alla mia rendita?»",
      question: "Cosa le spieghi?",
      options: [
        { key: "A", text: "«Nessun impatto – le rendite AVS vengono calcolate solo in base all'ultimo salario, non alla durata di contribuzione»" },
        { key: "B", text: "«Ogni anno mancante di contribuzione riduce la rendita AVS di circa 1/44 – 3 lacune corrispondono a circa il 6.8% di riduzione. Le lacune possono essere colmate fino a 5 anni prima dell'età AVS»" },
        { key: "C", text: "«Le lacune AVS comportano automaticamente la perdita di tutti i diritti – Fatima dovrebbe richiedere una nuova affiliazione AVS il prima possibile»" },
        { key: "D", text: "«All'estero si contribuisce spesso al sistema pensionistico locale – questo viene compensato con l'AVS svizzera, senza riduzione»" },
      ],
      feedback:
        "La rendita AVS completa richiede 44 anni di contribuzione (uomini e donne). Ogni anno mancante riduce la rendita di 1/44 ≈ 2.27%. 3 anni mancanti = circa il 6.8% di rendita in meno. Le lacune possono essere colmate volontariamente – ma solo fino a 5 anni retroattivamente e solo se ancora soggetti all'AVS. Raccomandazione: richiedere un estratto AVS e identificare le lacune.",
    },
    "1.5": {
      situation:
        "L'apprendista Tim, 16 anni, ha un lavoro estivo e guadagna CHF 1'800 in 2 mesi. Chiede: «Devo già pagare l'AVS?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«No, l'obbligo contributivo AVS inizia solo a 18 anni»" },
        { key: "B", text: "«Sì a partire dai 17 anni – ma solo su redditi superiori a CHF 2'000»" },
        { key: "C", text: "«Sì a partire dal 1° gennaio successivo al 17° compleanno, e per i non attivi a partire da 20 anni. In caso di attività lucrativa si applica una franchigia di CHF 2'300 per anno e per datore di lavoro»" },
        { key: "D", text: "«No, apprendisti e job estivi sono sempre esenti da contributi fino al termine dell'apprendistato»" },
      ],
      feedback:
        "Obbligo contributivo AVS in caso di attività lucrativa: a partire dal 1° gennaio successivo al 17° compleanno. Franchigia per i giovani (fino alla fine dell'anno del 25° compleanno): CHF 2'300 per datore di lavoro e per anno. Tim guadagna CHF 1'800 – sotto la franchigia, quindi nessun obbligo AVS. Non attivi (studenti, casalinghe/-i) a partire dal 1° gennaio successivo al 20° compleanno.",
    },
    "2.1": {
      situation:
        "Un cliente con un'aliquota marginale del 25% vuole sapere quanto risparmia se versa CHF 7'258 nel 3a.",
      question: "Cosa dici al cliente?",
      options: [
        { key: "A", text: "«Con un'aliquota marginale del 25%, il vantaggio fiscale federale è di circa CHF 500 – la maggior parte del risparmio fiscale si ottiene solo al momento del prelievo alla pensione, perché l'aliquota fiscale sul prelievo è allora nettamente più bassa.»" },
        { key: "B", text: "«Non lo si può dire in modo generico – il vantaggio fiscale reale dipende dal vostro cantone, comune e dal reddito imponibile esatto. L'ufficio delle imposte deve calcolarlo individualmente prima che una raccomandazione abbia senso.»" },
        { key: "C", text: "«Il vantaggio si applica esclusivamente all'imposta federale diretta – le imposte cantonali e comunali sul reddito non possono essere ridotte con versamenti 3a, quindi vale la pena solo con un reddito molto elevato.»" },
        { key: "D", text: "«Con un'aliquota marginale del 25%, risparmia CHF 1'814.50 di imposte – semplicemente grazie al versamento 3a di CHF 7'258.»" },
      ],
      feedback:
        "Risparmio fiscale = versamento × aliquota marginale. CHF 7'258 × 25% = CHF 1'814.50. È quasi un mese di stipendio risparmiato – ogni anno! Più alto è il reddito e l'aliquota marginale, maggiore è il vantaggio fiscale del versamento 3a.",
    },
    "2.2": {
      situation:
        "Un cliente, 45 anni, chiede: «Posso prelevare anticipatamente il mio denaro 3a? Ne ho bisogno per una ristrutturazione.»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«Sì, è possibile – deve documentare il progetto di ristrutturazione e presentare il modulo per il prelievo anticipato. Trasferiremo poi direttamente all'impresa artigiana.»" },
        { key: "B", text: "«Il prelievo anticipato è possibile solo a determinate condizioni: acquisto di abitazione propria, ristrutturazione PPR, avvio di attività indipendente, emigrazione o invalidità. Una ristrutturazione di un appartamento in affitto non basta.»" },
        { key: "C", text: "«Il prelievo anticipato è consentito solo in caso di acquisto di abitazione propria – non per ristrutturazioni. Per il suo caso, purtroppo deve aspettare fino alla pensione.»" },
        { key: "D", text: "«Il prelievo è possibile se i costi di ristrutturazione sono di almeno CHF 50'000. Porti i preventivi in modo da poter presentare la domanda.»" },
      ],
      feedback:
        "Il prelievo anticipato del 3a è possibile, ma solo per scopi specifici: PPR (promozione proprietà d'abitazione – acquisto o ristrutturazione che aumenta il valore dell'abitazione propria), avvio di attività indipendente, emigrazione, invalidità o decesso. La ristrutturazione di un appartamento in affitto non è ammissibile.",
    },
    "2.3": {
      situation:
        "Una cliente ha CHF 65'000 su un unico conto 3a. Chiede se è corretto.",
      question: "Cosa consiglio?",
      options: [
        { key: "A", text: "«A partire da CHF 50'000, consiglio di aprire un secondo conto 3a. Al momento del prelievo, i conti 3a vengono tassati separatamente – prelievi scaglionati su più anni riducono massicciamente il carico fiscale.»" },
        { key: "B", text: "«Va bene – la garanzia dei depositi protegge i conti 3a fino a CHF 100'000 per banca, e al momento del prelievo alla pensione è solo l'importo totale a essere fiscalmente determinante, non il numero di conti.»" },
        { key: "C", text: "«Liquidare il conto esistente e trasferirlo in un deposito titoli 3a – i fondi ottengono un rendimento migliore a lungo termine rispetto ai saldi in conto, e fiscalmente nulla cambia al momento del prelievo.»" },
        { key: "D", text: "«A partire da CHF 50'000, i conti 3a beneficiano di un tasso d'interesse ridotto. La banca è obbligata a suddividere i saldi a partire da questo importo affinché continui ad applicarsi il tasso d'interesse più alto.»" },
      ],
      feedback:
        "I prelievi 3a vengono tassati separatamente dal reddito ordinario – a un'aliquota ridotta. Con più conti, i prelievi possono essere scaglionati su anni diversi, il che ogni volta porta a un'aliquota fiscale più bassa. A partire da CHF 50'000, un secondo conto è fortemente raccomandato!",
    },
    "2.4": {
      situation:
        "Il signor Roth, 50 anni, aliquota marginale 35%, ha secondo il suo estratto della cassa pensioni un potenziale di riscatto di CHF 80'000. Chiede: «Vale la pena fare un riscatto volontario nella cassa pensioni?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«No – i riscatti nella CP valgono la pena solo poco prima della pensione. A 50 anni, 15 anni è troppo lungo fino al versamento»" },
        { key: "B", text: "«Sì – un riscatto di CHF 80'000 risparmia circa CHF 28'000 di imposte immediatamente con un'aliquota marginale del 35%. Più una rendita CP più alta. Importante: rispettare il termine di blocco di 3 anni prima del prelievo in capitale»" },
        { key: "C", text: "«Solo se opta per il prelievo in capitale invece della rendita – altrimenti il riscatto non è fiscalmente vantaggioso»" },
        { key: "D", text: "«I riscatti nella CP non sono fiscalmente deducibili – solo i versamenti 3a possono essere dedotti dal reddito imponibile»" },
      ],
      feedback:
        "Riscatto CP = doppio vantaggio: 1) Risparmio fiscale immediato pari all'importo del riscatto × aliquota marginale (CHF 80'000 × 35% = CHF 28'000). 2) Rendita o capitale più alto alla pensione. Importante: termine di blocco di 3 anni – chi preleva il capitale poco dopo deve restituire il vantaggio fiscale. A 50 anni, assolutamente non un problema.",
    },
    "2.5": {
      situation:
        "La signora Schneider, 62 anni, desidera andare in pensione anticipata (età AVS ordinaria 65). Il regolamento della sua cassa pensioni consente il pensionamento a partire dai 60 anni. Chiede: «Cosa succede con l'AVS nel periodo di transizione fino ai 65 anni?»",
      question: "Cosa le spieghi?",
      options: [
        { key: "A", text: "«Nessuna lacuna – la rendita AVS può essere richiesta a partire dai 62 anni, semplicemente con una riduzione»" },
        { key: "B", text: "«Molte CP pagano fino all'età AVS una rendita transitoria che compensa l'AVS mancante. Questa viene automaticamente ridotta dopo i 65 anni quando inizia la vera AVS»" },
        { key: "C", text: "«L'AVS funziona automaticamente – deve solo informare la cassa pensioni»" },
        { key: "D", text: "«Dal pensionamento anticipato, l'obbligo AVS cessa – nessun contributo, nessuna lacuna»" },
      ],
      feedback:
        "Il pensionamento anticipato crea una lacuna AVS: tra l'età pensionabile e l'età AVS non si riceve ancora l'AVS. Soluzione di molte CP: rendita transitoria pari all'importo della rendita AVS attesa (ca. CHF 2'450/mese max.) fino all'età AVS. Poi la rendita CP si riduce e inizia l'AVS. Importante: i non attivi devono continuare a pagare contributi AVS come non attivi!",
    },
    "3.1": {
      situation:
        "Un cliente, 52 anni, desidera un'ipoteca di CHF 600'000. Reddito attuale CHF 120'000. Rendita CP secondo estratto CHF 24'000/anno. Pensionamento tra 13 anni.",
      question: "Cosa dici al cliente?",
      options: [
        { key: "A", text: "«Va tutto bene – la sostenibilità attuale è data. L'esame della sostenibilità all'età pensionabile si applica solo alle ipoteche a tasso fisso con durata superiore a 15 anni; per le ipoteche rinnovabili viene valutata solo la situazione attuale.»" },
        { key: "B", text: "«La sostenibilità all'età pensionabile non è data. L'82.4% supera massicciamente il limite del 38%. L'ipoteca deve essere ammortizzata maggiormente prima della pensione o l'importo deve essere ridotto.»" },
        { key: "C", text: "«Conta solo la sostenibilità attuale – la pensione tra 13 anni è ancora lontana»" },
        { key: "D", text: "«Raccomandare un riscatto CP – con un riscatto di CHF 120'000 nella cassa pensioni, la rendita CP annuale aumenta a oltre CHF 36'000, il che porta automaticamente la sostenibilità alla pensione sotto il 38%.»" },
      ],
      feedback:
        "La sostenibilità deve essere garantita OGGI e ALL'ETÀ PENSIONABILE. Limite all'età pensionabile: 38%. L'82.4% non è accettabile. Soluzione: ammortizzare di più prima della pensione o scegliere un oggetto meno costoso. Il riscatto CP è possibile, ma da solo non è sufficiente.",
    },
    "3.2": {
      situation:
        "Un cliente, 40 anni, dice: «Ho dimenticato di versare nel 3a nel 2025. Questi CHF 7'000 sono persi?»",
      question: "Cosa rispondi?",
      options: [
        { key: "A", text: "«No! A partire dal 2026, i versamenti mancati a partire dal 2025 possono essere recuperati. Condizione: l'importo massimo corrente di CHF 7'258 deve prima essere versato integralmente. Le lacune prima del 2025 purtroppo non recuperabili.»" },
        { key: "B", text: "«Sì purtroppo – la possibilità di versamento nel pilastro 3a è strettamente limitata all'anno fiscale corrente. La legge federale esclude i pagamenti integrativi per tutti i contribuenti, anche retroattivamente per il 2025.»" },
        { key: "C", text: "«Basta versare il doppio dell'importo massimo quest'anno – CHF 14'516 sono ammessi se si vuole recuperare un anno precedente. Le autorità fiscali lo accettano direttamente nella dichiarazione fiscale come pagamento integrativo per il 2025.»" },
        { key: "D", text: "«Il pagamento integrativo vale a partire dal 2026 per i lavoratori indipendenti: possono versare lacune degli anni precedenti fino a tre importi massimi annuali in una volta. Per i dipendenti con cassa pensioni, ciò rimane escluso.»" },
      ],
      feedback:
        "Nuova regola a partire dal 2026: le lacune di contribuzione a partire dall'anno 2025 possono essere recuperate. Condizione: l'importo massimo dell'anno corrente (CHF 7'258) deve prima essere utilizzato integralmente. Le lacune prima del 2025 non sono recuperabili. I pagamenti integrativi sono anch'essi fiscalmente deducibili!",
    },
    "3.3": {
      briefing:
        "Nuovo cliente, lavoratore indipendente, senza cassa pensioni, reddito annuale CHF 180'000. Chiede una strategia 3a ottimale.",
      question:
        "I lavoratori indipendenti senza cassa pensioni possono versare fino a ___ % del reddito netto nel pilastro 3a.",
      feedback:
        "I lavoratori indipendenti senza cassa pensioni hanno un massimo 3a più elevato: 20% del reddito netto, al massimo CHF 36'288. Con un reddito di CHF 180'000: CHF 36'000 sono possibili. Il risparmio fiscale è enorme! Più conti per prelievi scaglionati alla pensione sono molto raccomandati.",
    },
    "3.4": {
      situation:
        "Il signor Müller, 45 anni, ha prelevato CHF 50'000 dalla cassa pensioni 10 anni fa per l'acquisto della prima abitazione di proprietà (prelievo PPR). Ora chiede: «Cosa succede alla mia rendita CP se non restituisco l'importo?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«Nulla – il prelievo anticipato di oltre 5 anni fa è completamente dimenticato, non ha più alcun effetto sulla rendita»" },
        { key: "B", text: "«La sua futura rendita CP è permanentemente ridotta, perché il capitale prelevato non ha più generato rendimento. La riduzione esatta è indicata nel suo estratto della cassa pensioni sotto 'rendita proiettata'»" },
        { key: "C", text: "«Il prelievo anticipato viene contabilizzato come debito alla pensione – la CP deduce CHF 50'000 dal capitale, più gli interessi»" },
        { key: "D", text: "«Solo se vende l'immobile deve restituire – altrimenti il prelievo anticipato non ha alcun effetto»" },
      ],
      feedback:
        "Prelievo PPR = riduzione permanente della rendita, perché il capitale prelevato non genera più interessi né rendimento. Esempio: CHF 50'000 a un tasso d'interesse medio del 2% su 20 anni ≈ CHF 74'000 di perdita in capitale alla pensione. Importante: la restituzione è volontaria, possibile fino a 3 anni prima dell'età pensionabile ordinaria.",
    },
    "3.5": {
      situation:
        "Una coppia è in procinto di divorziare. La moglie ha un conto 3a con CHF 85'000. Il marito non ha un conto 3a. Chiede: «Devo dividere il mio avere 3a?»",
      question: "Cosa le spieghi?",
      options: [
        { key: "A", text: "«No – gli averi 3a sono risparmi personali e non vengono mai divisi, nemmeno in caso di divorzio»" },
        { key: "B", text: "«Sì – in linea di principio, gli averi 3a versati durante il matrimonio vengono divisi a metà. I versamenti prima del matrimonio rimangono suoi. Ciò è regolato dal CC art. 122 ss (compensazione previdenziale)»" },
        { key: "C", text: "«Solo se ha risparmiato il denaro prima del matrimonio – gli averi accumulati dopo il matrimonio sono acquisiti e appartengono alla comunità»" },
        { key: "D", text: "«L'avere viene diviso solo se entrambi erano sposati sotto il regime ordinario (partecipazione agli acquisti) – altrimenti no»" },
      ],
      feedback:
        "Compensazione previdenziale in caso di divorzio (CC art. 122 ss): gli averi 3a e della cassa pensioni versati durante il matrimonio appartengono alla «previdenza matrimoniale» e vengono divisi a metà – indipendentemente dal regime matrimoniale. I versamenti prima del matrimonio ne sono esclusi. Importante: i conti 3a non vengono trasferiti direttamente – l'importo viene trasferito sul conto di libero passaggio dell'altro.",
    },
  },
};
