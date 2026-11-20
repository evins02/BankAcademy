import type { LangTranslations } from "./utils";

export const TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      title: "Recommander la bonne stratégie",
      situation:
        "La cliente Anna, 35 ans, employée, veut placer CHF 10'000. Elle dit : «Je veux un rendement légèrement supérieur à celui du compte épargne mais sans grand risque. J'ai besoin de cet argent dans environ 8 ans.»",
      question: "Quelle stratégie recommandes-tu ?",
      options: [
        { key: "A", text: "Agressive – rendement maximum pour un gain maximum" },
        { key: "B", text: "Compte épargne – aucun risque, sûr" },
        { key: "C", text: "Revenu ou équilibré – rendement modéré, risque maîtrisable, l'horizon de 8 ans convient bien" },
        { key: "D", text: "Croissance – bon compromis entre rendement et risque" },
      ],
      feedback:
        "Revenu ou équilibré correspond le mieux : plus de rendement qu'un compte épargne avec un risque maîtrisable. Un horizon de placement de 8 ans convient bien pour une quote-part d'actions allant jusqu'à 50 %. Agressive serait trop risquée pour cet horizon et le souhait d'«aucun grand risque».",
    },
    "1.2": {
      title: "Expliquer simplement un fonds",
      situation:
        "Un client demande : «Qu'est-ce qu'un fonds exactement ? J'entends ça tout le temps, mais je ne comprends pas.»",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "«C'est trop complexe à expliquer – lisez la documentation»" },
        { key: "B", text: "«Un fonds regroupe l'argent de nombreux investisseurs. Avec ça, on achète de nombreux titres différents – actions, obligations, etc. Cela réduit le risque, parce qu'on ne mise pas tout sur une seule carte.»" },
        { key: "C", text: "«Un fonds c'est comme un compte épargne, mais avec plus d'intérêts»" },
        { key: "D", text: "«C'est une sorte d'assurance pour votre argent»" },
      ],
      feedback:
        "Fonds = diversification. Nombreux investisseurs, nombreux placements, moins de risque individuel. Une bonne image pour les clients : «Au lieu d'acheter une action, vous achetez un panier avec cent actions différentes.» Cela rend les pertes sur des titres individuels moins douloureuses.",
    },
    "1.3": {
      title: "Compte épargne vs. fonds",
      situation:
        "Un client, 40 ans, a CHF 20'000 sur son compte épargne depuis 5 ans. Il demande si c'est judicieux.",
      question: "Que lui dis-tu ?",
      options: [
        { key: "A", text: "«Le compte épargne est sûr, mais le taux est faible. Avec un horizon de 10 ans et plus, un fonds pourrait rapporter nettement plus. Important : ne placer que l'argent dont vous n'avez pas besoin à court terme.»" },
        { key: "B", text: "«Le compte épargne est le bon choix – à 40 ans, il reste 25 ans avant la retraite, mais le capital ne devrait pas être bloqué. Pas de stratégie avec risque de perte avant la retraite.»" },
        { key: "C", text: "«Investir immédiatement dans un ETF actions mondial – historiquement le MSCI World n'a jamais enregistré de perte après 10 ans, le risque est statistiquement nul sur cet horizon.»" },
        { key: "D", text: "«Liquider le compte épargne et investir dans le pilier 3a – l'avantage fiscal du 3a surpasse à long terme tout rendement de fonds. Avec CHF 20'000, on peut répartir les versements de manière optimale sur plusieurs années.»" },
      ],
      feedback:
        "Compte épargne = sécurité mais faible rendement. Fonds = rendement plus élevé mais avec des fluctuations. Règle de base : réserve d'urgence (3–6 salaires mensuels) toujours sur le compte épargne. Tout ce qui dépasse peut être placé si l'horizon est suffisamment long.",
    },
    "2.1": {
      title: "Contradiction dans le profil investisseur",
      situation:
        "Nouveau client, 50 ans, veut placer CHF 50'000. Il dit : «Je veux un bon rendement, mais si le marché baisse, je vends immédiatement tout.»",
      question: "Qu'est-ce que tu remarques ?",
      options: [
        { key: "A", text: "Pas de problème – recommander croissance comme souhaité" },
        { key: "B", text: "Contradiction identifiée : un rendement élevé nécessite un long horizon et de la patience en cas de baisses. Celui qui vend immédiatement en cas de recul réalise des pertes. Le profil investisseur correspond plutôt à une stratégie revenu." },
        { key: "C", text: "Agressive – le rendement maximum est toujours le meilleur" },
        { key: "D", text: "Recommander le compte épargne – aucun risque" },
      ],
      feedback:
        "La tolérance au risque et la capacité de risque doivent correspondre. Celui qui vend immédiatement à –20 % n'a pas de vraie tolérance au risque pour croissance ou agressive. Revenu convient mieux ici – moins de fluctuations, plus de sérénité et pas de ventes prématurées.",
    },
    "2.2": {
      title: "L'horizon décide",
      situation:
        "Cliente, 62 ans, part à la retraite dans 3 ans. Elle a CHF 80'000 et demande si elle doit encore investir dans des fonds.",
      question: "Que recommandes-tu ?",
      options: [
        { key: "A", text: "Avec 3 ans d'horizon et une retraite proche, je recommande au maximum une stratégie revenu ou un compte épargne. Les actions ont besoin d'au moins 5 ans – une baisse des cours juste avant la retraite serait fatale." },
        { key: "B", text: "Oui – croissance pour un rendement maximum dans les dernières années" },
        { key: "C", text: "Équilibré est toujours un bon choix pour tout le monde" },
        { key: "D", text: "Tout verser dans le pilier 3a pour les avantages fiscaux" },
      ],
      feedback:
        "L'horizon de placement est décisif ! 3 ans = trop court pour une forte quote-part d'actions. Le risque d'une baisse des cours juste avant la retraite n'est pas supportable – le capital sera alors nécessaire. Revenu ou compte épargne comme choix sûr dans ce cas.",
    },
    "2.3": {
      title: "Comparaison des coûts TER",
      situation:
        "Un client compare deux fonds : Fonds A avec TER 0,3 %, Fonds B avec TER 1,8 %. Il demande si c'est important.",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "«L'historique de rendement est plus décisif que le TER. Le Fonds B a réalisé 7,8 % par an ces 5 dernières années, le Fonds A seulement 6,1 % – les coûts supplémentaires sont plus que compensés par le rendement supplémentaire.»" },
        { key: "B", text: "«Un TER jusqu'à 1,8 % est normal pour les fonds actifs et autorisé par la FINMA. L'essentiel est de savoir si le Fonds B bat son indice de référence à long terme – ce qu'il fait de manière prouvée.»" },
        { key: "C", text: "«Les fonds gérés activement ont un TER plus élevé, car le gestionnaire analyse et optimise quotidiennement. Ça en vaut la peine : les fonds actifs battent les ETF passifs à long terme car ils peuvent réagir aux crises.»" },
        { key: "D", text: "«Le TER est très important ! Pour CHF 50'000 investis : le Fonds A coûte CHF 150/an, le Fonds B CHF 900/an. Sur 10 ans : CHF 7'500 de différence – uniquement à cause des coûts.»" },
      ],
      feedback:
        "Le TER (Total Expense Ratio) est le ratio de coûts annuel total d'un fonds. Coûts plus faibles = rendement plus élevé pour le client. Les ETF ont souvent un TER bien plus bas que les fonds gérés activement. Toujours comparer les coûts – ils font une grande différence sur de longues périodes.",
    },
    "3.1": {
      title: "Profil investisseur complexe – couple marié",
      situation:
        "Un couple, tous deux 45 ans : le mari veut investir en sécurité, sans risque. La femme veut le rendement maximum, à long terme. Dépôt commun, CHF 100'000, horizon 15 ans.",
      question: "Que recommandes-tu ?",
      options: [
        { key: "A", text: "Agressive – la femme a raison, 15 ans suffisent" },
        { key: "B", text: "Compte épargne – le mari a raison, la sécurité prime" },
        { key: "C", text: "Équilibré comme compromis pour le dépôt commun – les deux besoins pris en compte, l'horizon de 15 ans convient. Ou : deux dépôts séparés avec chacun leur propre stratégie." },
        { key: "D", text: "Revenu – sûr pour les deux, sans compromis" },
      ],
      feedback:
        "Pour des profils de risque différents, il y a deux bonnes solutions : 1. Stratégie de compromis (équilibré) pour le dépôt commun. 2. Dépôts séparés avec chacun leur propre stratégie adaptée. L'option 2 est souvent meilleure – chacun a son profil adapté sans concessions.",
    },
    "3.2": {
      title: "Chute des marchés – client en panique",
      situation:
        "Un client appelle excité : «Mon fonds a chuté de 15 % ! Je veux tout vendre immédiatement !»",
      question: "Que lui dis-tu ?",
      options: [
        { key: "A", text: "«Oui, vendre immédiatement – arrêter les pertes maintenant avant que ça empire»" },
        { key: "B", text: "«Passer dans d'autres fonds – ça résout le problème»" },
        { key: "C", text: "«Attendez jusqu'à demain et décidez alors»" },
        { key: "D", text: "«Je comprends votre inquiétude. Mais vendre au plus bas réalise la perte. Votre horizon est encore de 10 ans – les marchés se sont toujours redressés historiquement. Gardez votre calme et ne changez pas de stratégie.»" },
      ],
      feedback:
        "Erreur classique : vendre au plus bas, acheter au plus haut – exactement l'inverse de ce qu'il faut faire. Horizon à long terme = supporter les fluctuations à court terme. Historiquement, les marchés boursiers se redressent après chaque recul. Changer de stratégie uniquement si la situation de vie change – pas à cause des mouvements du marché.",
    },
    "3.3": {
      title: "Cas piège challenge : horizon effectif",
      situation:
        "Client, 38 ans, veut placer CHF 30'000. Profil investisseur : croissance. Horizon selon le profil : 7 ans. Mais il dit : «J'ai besoin de cet argent au plus tard dans 3 ans pour un achat immobilier.»",
      question: "Que fais-tu ?",
      options: [
        { key: "A", text: "Maintenir la stratégie croissance – le profil a été établi et signé ensemble. Des ajustements de profil ne sont nécessaires que si le client définit un nouvel objectif de placement." },
        { key: "B", text: "Réorienter le portefeuille vers équilibré (50/50) – ainsi le risque est divisé par deux et l'achat immobilier dans 3 ans est suffisamment sécurisé." },
        { key: "C", text: "Croissance avec 3 ans d'horizon est encore acceptable – les marchés boursiers se redressent généralement après les corrections en 12–18 mois." },
        { key: "D", text: "Le profil investisseur doit être adapté ! L'horizon effectif est de 3 ans, pas 7. Avec croissance, il risque une baisse des cours lors de l'achat immobilier. Recommandation : compte épargne ou revenu pour ce montant." },
      ],
      feedback:
        "L'horizon de placement effectif est le plus court ! Pas ce que le client a signé, mais quand il a réellement besoin de l'argent. Le profil investisseur doit correspondre à la réalité – le conseiller a un devoir de conseil. Un profil erroné est un risque de responsabilité.",
    },
  },
  it: {
    "1.1": {
      title: "Raccomandare la giusta strategia",
      situation:
        "La cliente Anna, 35 anni, impiegata, vuole investire CHF 10'000. Dice: «Voglio un rendimento leggermente superiore a quello del conto risparmio ma senza grandi rischi. Avrò bisogno di questi soldi tra circa 8 anni.»",
      question: "Quale strategia raccomandi?",
      options: [
        { key: "A", text: "Aggressiva – rendimento massimo per il massimo guadagno" },
        { key: "B", text: "Conto risparmio – nessun rischio, sicuro" },
        { key: "C", text: "Reddito o bilanciata – rendimento moderato, rischio gestibile, l'orizzonte di 8 anni si adatta bene" },
        { key: "D", text: "Crescita – buon compromesso tra rendimento e rischio" },
      ],
      feedback:
        "Reddito o bilanciata si adatta meglio: più rendimento di un conto risparmio con un rischio gestibile. Un orizzonte di investimento di 8 anni è adatto per una quota azionaria fino al 50%. Aggressiva sarebbe troppo rischiosa per questo orizzonte e il desiderio di «nessun grande rischio».",
    },
    "1.2": {
      title: "Spiegare semplicemente un fondo",
      situation:
        "Un cliente chiede: «Cos'è esattamente un fondo? Lo sento continuamente, ma non capisco.»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«È troppo complicato da spiegare – legga la documentazione»" },
        { key: "B", text: "«Un fondo raggruppa il denaro di molti investitori. Con questo si acquistano molti titoli diversi – azioni, obbligazioni, ecc. Ciò riduce il rischio perché non si punta tutto su una carta sola.»" },
        { key: "C", text: "«Un fondo è come un conto risparmio, solo con più interessi»" },
        { key: "D", text: "«È una sorta di assicurazione per il suo denaro»" },
      ],
      feedback:
        "Fondo = diversificazione. Molti investitori, molti investimenti, meno rischio individuale. Un buon esempio per i clienti: «Invece di comprare un'azione, acquista un cesto con cento azioni diverse.» Questo rende le perdite su singoli titoli meno dolorose.",
    },
    "1.3": {
      title: "Conto risparmio vs. fondo",
      situation:
        "Un cliente, 40 anni, ha CHF 20'000 sul conto risparmio da 5 anni. Chiede se è saggio.",
      question: "Cosa gli dici?",
      options: [
        { key: "A", text: "«Il conto risparmio è sicuro, ma il tasso è basso. Con un orizzonte di 10+ anni un fondo potrebbe rendere molto di più. Importante: investire solo il denaro di cui non si ha bisogno a breve termine.»" },
        { key: "B", text: "«Il conto risparmio è la scelta giusta – a 40 anni mancano ancora 25 anni alla pensione, ma il capitale non dovrebbe essere vincolato. Nessuna strategia con rischio di perdita prima della pensione.»" },
        { key: "C", text: "«Investire subito in un ETF azionario globale – storicamente l'MSCI World non ha mai registrato perdite dopo 10 anni, il rischio è statisticamente nullo su questo orizzonte.»" },
        { key: "D", text: "«Estinguere il conto risparmio e investire nel pilastro 3a – il vantaggio fiscale del 3a supera a lungo termine qualsiasi rendimento da fondo. Con CHF 20'000 si possono distribuire i versamenti in modo ottimale su più anni.»" },
      ],
      feedback:
        "Conto risparmio = sicurezza ma basso rendimento. Fondo = rendimento più elevato ma con fluttuazioni. Regola empirica: riserva di emergenza (3–6 mensilità) sempre sul conto risparmio. Tutto ciò che eccede può essere investito se l'orizzonte è sufficientemente lungo.",
    },
    "2.1": {
      title: "Contraddizione nel profilo dell'investitore",
      situation:
        "Nuovo cliente, 50 anni, vuole investire CHF 50'000. Dice: «Voglio un buon rendimento, ma se il mercato scende vendo subito tutto.»",
      question: "Cosa noti?",
      options: [
        { key: "A", text: "Nessun problema – raccomandare crescita come desiderato" },
        { key: "B", text: "Contraddizione rilevata: alto rendimento richiede un lungo orizzonte e pazienza nelle flessioni. Chi vende immediatamente in caso di ribasso realizza perdite. Il profilo dell'investitore indica piuttosto una strategia reddito." },
        { key: "C", text: "Aggressiva – il rendimento massimo è sempre il migliore" },
        { key: "D", text: "Raccomandare il conto risparmio – nessun rischio" },
      ],
      feedback:
        "La tolleranza al rischio e la capacità di rischio devono corrispondersi. Chi vende immediatamente al −20% non ha una vera tolleranza al rischio per crescita o aggressiva. Reddito si adatta meglio qui – meno fluttuazioni, più tranquillità e nessuna vendita affrettata.",
    },
    "2.2": {
      title: "L'orizzonte decide",
      situation:
        "Cliente, 62 anni, va in pensione tra 3 anni. Ha CHF 80'000 e chiede se investire ancora in fondi.",
      question: "Cosa raccomandi?",
      options: [
        { key: "A", text: "Con 3 anni di orizzonte e pensione imminente, raccomando al massimo una strategia reddito o conto risparmio. Le azioni necessitano di almeno 5 anni – una flessione dei corsi poco prima della pensione sarebbe fatale." },
        { key: "B", text: "Sì – crescita per il rendimento massimo negli ultimi anni" },
        { key: "C", text: "Bilanciata è sempre una buona scelta per tutti" },
        { key: "D", text: "Versare tutto nel pilastro 3a per i vantaggi fiscali" },
      ],
      feedback:
        "L'orizzonte di investimento è decisivo! 3 anni = troppo breve per un'elevata quota azionaria. Il rischio di una flessione dei corsi poco prima della pensione non è sostenibile – il capitale sarà necessario in quel momento. Reddito o conto risparmio come scelta sicura in questo caso.",
    },
    "2.3": {
      title: "Confronto costi TER",
      situation:
        "Un cliente confronta due fondi: Fondo A con TER 0,3%, Fondo B con TER 1,8%. Chiede se è importante.",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«La storia dei rendimenti è più decisiva del TER. Il Fondo B ha realizzato il 7,8% all'anno negli ultimi 5 anni, il Fondo A solo il 6,1% – i costi aggiuntivi sono più che compensati dal rendimento aggiuntivo.»" },
        { key: "B", text: "«TER fino all'1,8% è normale per i fondi attivi e consentito dalla FINMA. L'essenziale è sapere se il Fondo B batte il suo indice di riferimento a lungo termine – il che fa dimostrabilmente.»" },
        { key: "C", text: "«I fondi gestiti attivamente hanno un TER più alto perché il gestore analizza e ottimizza quotidianamente. Ne vale la pena: i fondi attivi battono gli ETF passivi a lungo termine perché possono reagire alle crisi.»" },
        { key: "D", text: "«Il TER è molto importante! Per CHF 50'000 investiti: il Fondo A costa CHF 150/anno, il Fondo B CHF 900/anno. Su 10 anni: CHF 7'500 di differenza – solo a causa dei costi.»" },
      ],
      feedback:
        "Il TER (Total Expense Ratio) è il rapporto di costo totale annuale di un fondo. Costi più bassi = rendimento più elevato per il cliente. Gli ETF hanno spesso un TER molto più basso dei fondi gestiti attivamente. Confrontare sempre i costi – fanno una grande differenza su lunghi periodi.",
    },
    "3.1": {
      title: "Profilo investitore complesso – coppia",
      situation:
        "Una coppia, entrambi 45 anni: il marito vuole investire in sicurezza, senza rischi. La moglie vuole il rendimento massimo, a lungo termine. Deposito comune, CHF 100'000, orizzonte 15 anni.",
      question: "Cosa raccomandi?",
      options: [
        { key: "A", text: "Aggressiva – la moglie ha ragione, 15 anni bastano" },
        { key: "B", text: "Conto risparmio – il marito ha ragione, la sicurezza prima di tutto" },
        { key: "C", text: "Bilanciata come compromesso per il deposito comune – entrambe le esigenze considerate, l'orizzonte di 15 anni si adatta. Oppure: due depositi separati con la propria strategia." },
        { key: "D", text: "Reddito – sicuro per entrambi, senza compromessi" },
      ],
      feedback:
        "Per profili di rischio diversi ci sono due buone soluzioni: 1. Strategia di compromesso (bilanciata) per il deposito comune. 2. Depositi separati con ciascuno la propria strategia adeguata. L'opzione 2 è spesso migliore – ognuno ha il suo profilo adeguato senza rinunce.",
    },
    "3.2": {
      title: "Crollo del mercato – cliente in preda al panico",
      situation:
        "Un cliente chiama agitato: «Il mio fondo è sceso del 15%! Voglio vendere subito tutto!»",
      question: "Cosa gli dici?",
      options: [
        { key: "A", text: "«Sì, vendere subito – fermare le perdite ora prima che peggiori»" },
        { key: "B", text: "«Passare ad altri fondi – questo risolve il problema»" },
        { key: "C", text: "«Aspetti fino a domani e decida allora»" },
        { key: "D", text: "«Capisco la sua preoccupazione. Ma vendere al minimo realizza la perdita. Il suo orizzonte è ancora di 10 anni – i mercati si sono sempre ripresi storicamente. Mantenga la calma e non cambi strategia.»" },
      ],
      feedback:
        "Errore classico: vendere al minimo, comprare al massimo – esattamente il contrario di quello giusto. Orizzonte a lungo termine = sopportare le fluttuazioni a breve termine. Storicamente i mercati azionari si riprendono dopo ogni ribasso. Cambiare strategia solo se la situazione di vita cambia – non a causa dei movimenti di mercato.",
    },
    "3.3": {
      title: "Caso trappola challenge: orizzonte effettivo",
      situation:
        "Cliente, 38 anni, vuole investire CHF 30'000. Profilo investitore: crescita. Orizzonte secondo il profilo: 7 anni. Ma dice: «Avrò bisogno di questi soldi al più tardi tra 3 anni per un acquisto immobiliare.»",
      question: "Cosa fai?",
      options: [
        { key: "A", text: "Mantenere la strategia crescita – il profilo è stato elaborato e firmato insieme. Gli adeguamenti del profilo sono necessari solo se il cliente definisce un nuovo obiettivo di investimento." },
        { key: "B", text: "Riorientare il portafoglio verso bilanciata (50/50) – così il rischio è dimezzato e l'acquisto immobiliare tra 3 anni è sufficientemente garantito." },
        { key: "C", text: "Crescita con 3 anni di orizzonte è ancora accettabile – i mercati azionari si riprendono generalmente dopo le correzioni in 12–18 mesi." },
        { key: "D", text: "Il profilo investitore deve essere adeguato! L'orizzonte effettivo è di 3 anni, non 7. Con crescita rischia una flessione dei corsi all'acquisto immobiliare. Raccomandazione: conto risparmio o reddito per questo importo." },
      ],
      feedback:
        "L'orizzonte di investimento effettivo è il più breve! Non quello che il cliente ha firmato, ma quando ha realmente bisogno del denaro. Il profilo investitore deve corrispondere alla realtà – il consulente ha un obbligo di consulenza. Un profilo errato è un rischio di responsabilità.",
    },
  },
};
