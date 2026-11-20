import type { LangTranslations } from "./utils";

export const FONDS_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      situation:
        "Anna, cliente de 35 ans, employée, souhaite placer CHF 10'000. Elle dit : «Je voudrais un rendement un peu plus élevé que sur un compte épargne, mais sans grand risque. J'aurai besoin de cet argent dans environ 8 ans.»",
      question: "Quelle stratégie recommandez-vous ?",
      options: [
        { key: "A", text: "Agressive – rendement maximal pour un gain maximum" },
        { key: "B", text: "Compte épargne – aucun risque, sécurité garantie" },
        {
          key: "C",
          text: "Revenu ou Équilibré – rendement modéré, risque maîtrisé, horizon de 8 ans approprié",
        },
        { key: "D", text: "Croissance – bon compromis entre rendement et risque" },
      ],
      feedback:
        "Revenu ou Équilibré convient le mieux : plus de rendement qu'un compte épargne avec un risque maîtrisé. Un horizon de placement de 8 ans est bien adapté à une quote-part d'actions allant jusqu'à 50 %. Agressif serait trop risqué pour cet horizon et ce souhait de «pas de grand risque».",
      merksatz:
        "Stratégie = Horizon + Capacité de risque + Tolérance au risque. Les trois doivent correspondre.",
    },
    "1.2": {
      situation:
        "Un client demande : «C'est quoi exactement un fonds ? J'entends toujours ce mot mais je ne comprends pas.»",
      question: "Qu'expliquez-vous ?",
      options: [
        {
          key: "A",
          text: "«C'est trop compliqué à expliquer – lisez la documentation»",
        },
        {
          key: "B",
          text: "«Un fonds regroupe l'argent de nombreux investisseurs. Avec cela, on achète de nombreux titres différents – actions, obligations, etc. Cela réduit le risque car on ne mise pas tout sur une seule carte.»",
        },
        {
          key: "C",
          text: "«Un fonds c'est comme un compte épargne, mais avec plus d'intérêts»",
        },
        { key: "D", text: "«C'est une sorte d'assurance pour votre argent»" },
      ],
      feedback:
        "Fonds = diversification. Nombreux investisseurs, nombreux placements, moins de risque individuel. Une bonne image pour les clients : «Au lieu d'acheter une action, vous achetez un panier de cent actions différentes.» Cela rend les pertes sur des titres individuels moins douloureuses.",
      merksatz:
        "Un fonds = de nombreux investisseurs, de nombreux placements, moins de risque individuel. Pas un compte épargne, pas une assurance.",
    },
    "1.3": {
      situation:
        "Un client de 40 ans a CHF 20'000 sur un compte épargne depuis 5 ans. Il demande si c'est judicieux.",
      question: "Que lui dites-vous ?",
      options: [
        {
          key: "A",
          text: "«Le compte épargne est sûr, mais l'intérêt est bas. Avec un horizon de 10+ ans, un fonds pourrait rapporter nettement plus. Important : n'investir que l'argent dont vous n'avez pas besoin à court terme.»",
        },
        {
          key: "B",
          text: "«Le compte épargne est le bon choix – à 40 ans, il reste 25 ans avant la retraite, mais le capital ne devrait pas être bloqué avant le départ en retraite.»",
        },
        {
          key: "C",
          text: "«Investir immédiatement dans un ETF actions mondial – historiquement le MSCI World n'a jamais enregistré de perte après 10 ans, le risque statistique est nul sur cet horizon.»",
        },
        {
          key: "D",
          text: "«Liquider le compte épargne et investir dans le pilier 3a – l'avantage fiscal du 3a surpasse à long terme tout rendement de fonds.»",
        },
      ],
      feedback:
        "Compte épargne = sécurité mais faible rendement. Fonds = rendement plus élevé mais avec fluctuations. Règle : toujours garder la réserve d'urgence (3–6 salaires mensuels) sur le compte épargne. Tout le reste peut être investi si l'horizon est suffisamment long.",
      merksatz:
        "Réserve d'urgence sur compte épargne, le reste placé si l'horizon est suffisamment long. La sécurité a son prix : perte de pouvoir d'achat rampante.",
    },
    "2.1": {
      situation:
        "Nouveau client, 50 ans, souhaite placer CHF 50'000. Il dit : «Je veux un bon rendement, mais si le marché baisse, je vends immédiatement tout.»",
      question: "Qu'observez-vous ?",
      options: [
        { key: "A", text: "Pas de problème – recommander Croissance comme souhaité" },
        {
          key: "B",
          text: "Contradiction identifiée : un rendement élevé nécessite un long horizon et de la patience en cas de baisse. Qui vend à la baisse réalise des pertes. Le profil d'investisseur correspond plutôt à une stratégie Revenu.",
        },
        { key: "C", text: "Agressif – le rendement maximal est toujours le mieux" },
        { key: "D", text: "Recommander un compte épargne – aucun risque" },
      ],
      feedback:
        "La tolérance au risque et la capacité de risque doivent correspondre. Qui vend immédiatement à −20 % n'a pas de véritable tolérance au risque pour Croissance ou Agressif. Revenu convient mieux ici – moins de fluctuations, sommeil plus tranquille et pas de ventes précipitées.",
      merksatz:
        "Qui réagit en panique aux fluctuations a une trop forte proportion d'actions. Profil de risque = ce que le client supporte vraiment, pas ce qu'il désire.",
    },
    "2.2": {
      situation:
        "Une cliente de 62 ans prend sa retraite dans 3 ans. Elle a CHF 80'000 et demande si elle devrait encore investir dans des fonds.",
      question: "Que recommandez-vous ?",
      options: [
        {
          key: "A",
          text: "Avec un horizon de 3 ans et une retraite proche, je recommande au maximum une stratégie Revenu ou un compte épargne. Les actions ont besoin d'au moins 5 ans – une chute des cours juste avant la retraite serait fatale.",
        },
        {
          key: "B",
          text: "Oui – Croissance pour un rendement maximal dans les dernières années",
        },
        { key: "C", text: "Équilibré est toujours un bon choix pour tout le monde" },
        { key: "D", text: "Tout verser dans le pilier 3a pour les avantages fiscaux" },
      ],
      feedback:
        "L'horizon de placement est décisif ! 3 ans = trop court pour une forte quote-part d'actions. Le risque d'une chute des cours peu avant la retraite est inacceptable – le capital sera nécessaire à ce moment. Revenu ou compte épargne comme choix sûr dans ce cas.",
      merksatz:
        "Plus l'horizon est court, plus la préservation du capital prime, moins d'actions. Règle : en dessous de 5 ans, pas de quote-part d'actions significative.",
    },
    "2.3": {
      situation:
        "Un client compare deux fonds : Fonds A avec TER 0.3 %, Fonds B avec TER 1.8 %. Il demande si c'est important.",
      question: "Qu'expliquez-vous ?",
      options: [
        {
          key: "A",
          text: "«L'historique de rendement est plus déterminant que le TER. Fonds B a réalisé 7.8 % par an sur 5 ans, Fonds A seulement 6.1 % – le surcoût est plus que compensé par le rendement supplémentaire.»",
        },
        {
          key: "B",
          text: "«Un TER jusqu'à 1.8 % est habituel dans le secteur pour les fonds actifs et autorisé par la FINMA. Ce qui compte, c'est si Fonds B bat son indice de référence à long terme.»",
        },
        {
          key: "C",
          text: "«Les fonds à gestion active ont un TER plus élevé car le gérant analyse et optimise quotidiennement. Cela en vaut la peine : les fonds actifs surpassent à long terme les ETF passifs.»",
        },
        {
          key: "D",
          text: "«Le TER est très important ! Pour CHF 50'000 : Fonds A coûte CHF 150/an, Fonds B CHF 900/an. Sur 10 ans : CHF 7'500 de différence – uniquement à cause des coûts.»",
        },
      ],
      feedback:
        "Le TER (Total Expense Ratio) est le ratio de coûts totaux annuels d'un fonds. Coûts plus bas = plus de rendement pour le client. Les ETFs ont souvent un TER nettement plus bas que les fonds à gestion active. Toujours comparer les coûts – ils font une grande différence sur de longues périodes.",
      merksatz:
        "1 % de frais en plus = jusqu'à 20 % de patrimoine final en moins sur 20 ans (intérêts composés). Le TER est le frein le plus équitable au rendement.",
    },
    "3.1": {
      situation:
        "Couple, tous deux 45 ans : le mari veut investir prudemment, sans risque. L'épouse veut un rendement maximal, à long terme. Dépôt commun, CHF 100'000, horizon 15 ans.",
      question: "Que recommandez-vous ?",
      options: [
        { key: "A", text: "Agressif – l'épouse a raison, 15 ans suffisent" },
        { key: "B", text: "Compte épargne – le mari a raison, la sécurité prime" },
        {
          key: "C",
          text: "Équilibré comme compromis pour le dépôt commun – les deux besoins pris en compte, horizon de 15 ans adapté. Ou : deux dépôts séparés avec chacun leur propre stratégie.",
        },
        { key: "D", text: "Revenu – sûr pour les deux, sans compromis" },
      ],
      feedback:
        "Face à des profils de risque différents, il y a deux bonnes solutions : 1. Stratégie de compromis (Équilibré) pour le dépôt commun. 2. Dépôts séparés avec chacun leur stratégie personnalisée. L'option 2 est souvent préférable – chacun a son profil adapté sans concessions.",
      merksatz:
        "Profils de risque différents = dépôts séparés ou vrai compromis. Ne jamais imposer le profil le plus élevé.",
    },
    "3.2": {
      situation:
        "Un client téléphone agité : «Mon fonds a chuté de 15 % ! Je veux tout vendre immédiatement !»",
      question: "Que lui dites-vous ?",
      options: [
        { key: "A", text: "«Oui, vendre immédiatement – arrêter les pertes maintenant avant que ça empire»" },
        { key: "B", text: "«Passer à d'autres fonds – ça résout le problème»" },
        { key: "C", text: "«Attendez jusqu'à demain et décidez alors»" },
        {
          key: "D",
          text: "«Je comprends votre inquiétude. Mais vendre au plus bas réalise la perte. Votre horizon est encore de 10 ans – les marchés se sont toujours redressés historiquement. Garder son calme et ne pas changer de stratégie.»",
        },
      ],
      feedback:
        "Erreur classique : vendre au plus bas, acheter au plus haut – exactement l'inverse de ce qu'il faut faire. Horizon à long terme = supporter les fluctuations à court terme. Historiquement, les marchés boursiers se redressent après chaque recul. Ne changer de stratégie que si la situation de vie change – pas à cause des mouvements du marché.",
      merksatz:
        "Changer de stratégie par panique est la plus grande erreur. Changez de stratégie quand votre situation de vie change – pas quand le marché baisse.",
    },
    "3.3": {
      situation:
        "Client, 38 ans, souhaite placer CHF 30'000. Profil d'investisseur : Croissance. Horizon selon profil : 7 ans. Il dit cependant : «J'aurai besoin de cet argent dans 3 ans au plus tard pour l'achat d'une maison.»",
      question: "Que faites-vous ?",
      options: [
        {
          key: "A",
          text: "Maintenir la stratégie Croissance – le profil a été créé et signé ensemble. Les ajustements de profil ne sont nécessaires que lorsque le client définit un nouvel objectif de placement.",
        },
        {
          key: "B",
          text: "Rééquilibrer le portefeuille sur Équilibré (50/50) – le risque est ainsi réduit de moitié et l'achat immobilier dans 3 ans est suffisamment sécurisé.",
        },
        {
          key: "C",
          text: "Croissance sur 3 ans est encore acceptable – les marchés boursiers se redressent généralement en 12 à 18 mois après des corrections.",
        },
        {
          key: "D",
          text: "Le profil d'investisseur doit être ajusté ! L'horizon effectif est de 3 ans, pas de 7. Avec Croissance, il risque une chute lors de l'achat immobilier. Recommandation : compte épargne ou Revenu pour ce montant.",
        },
      ],
      feedback:
        "L'horizon de placement effectif est le plus court ! Pas ce que le client a signé, mais quand il aura vraiment besoin de l'argent. Le profil d'investisseur doit correspondre à la réalité – le conseiller a un devoir de conseil. Un profil erroné est un risque de responsabilité.",
      merksatz:
        "Horizon effectif = premier moment où l'argent sera nécessaire. Pas ce qui a été signé.",
    },
  },
  it: {
    "1.1": {
      situation:
        "La cliente Anna, 35 anni, impiegata, vuole investire CHF 10'000. Dice: «Vorrei un rendimento un po' più alto di quello di un conto risparmio, ma senza grossi rischi. Avrò bisogno dei soldi tra circa 8 anni.»",
      question: "Quale strategia consigli?",
      options: [
        { key: "A", text: "Aggressiva – rendimento massimo per il massimo guadagno" },
        { key: "B", text: "Conto risparmio – nessun rischio, sicurezza garantita" },
        {
          key: "C",
          text: "Rendimento o Equilibrata – rendimento moderato, rischio gestibile, orizzonte di 8 anni adeguato",
        },
        { key: "D", text: "Crescita – buon compromesso tra rendimento e rischio" },
      ],
      feedback:
        "Rendimento o Equilibrata si adatta meglio: più rendimento del conto risparmio con un rischio gestibile. Un orizzonte d'investimento di 8 anni è adatto per una quota azionaria fino al 50%. Aggressiva sarebbe troppo rischiosa per questo orizzonte e il desiderio di «nessun grande rischio».",
      merksatz:
        "Strategia = Orizzonte + Capacità di rischio + Propensione al rischio. Tutti e tre devono corrispondere.",
    },
    "1.2": {
      situation:
        "Un cliente chiede: «Cos'è esattamente un fondo? Lo sento sempre dire ma non lo capisco.»",
      question: "Cosa spieghi?",
      options: [
        {
          key: "A",
          text: "«È troppo complicato da spiegare – legga la documentazione»",
        },
        {
          key: "B",
          text: "«Un fondo raggruppa il denaro di molti investitori. Con esso si acquistano molti titoli diversi – azioni, obbligazioni, ecc. Ciò riduce il rischio perché non si punta tutto su una sola carta.»",
        },
        {
          key: "C",
          text: "«Un fondo è come un conto risparmio, solo con più interessi»",
        },
        { key: "D", text: "«È una specie di assicurazione per il suo denaro»" },
      ],
      feedback:
        "Fondo = diversificazione. Molti investitori, molti investimenti, meno rischio individuale. Un buon esempio per i clienti: «Invece di comprare un'azione, compri un paniere di cento azioni diverse.» Questo rende le perdite su singoli titoli meno dolorose.",
      merksatz:
        "Un fondo = molti investitori, molti investimenti, meno rischio individuale. Non un conto risparmio, non un'assicurazione.",
    },
    "1.3": {
      situation:
        "Un cliente di 40 anni ha CHF 20'000 su un conto risparmio da 5 anni. Chiede se questo è saggio.",
      question: "Cosa gli dici?",
      options: [
        {
          key: "A",
          text: "«Il conto risparmio è sicuro, ma l'interesse è basso. Con un orizzonte di 10+ anni, un fondo potrebbe portare un rendimento nettamente migliore. Importante: investire solo denaro di cui non si ha bisogno a breve termine.»",
        },
        {
          key: "B",
          text: "«Il conto risparmio è la scelta giusta – a 40 anni mancano ancora 25 anni alla pensione, ma il capitale non dovrebbe essere vincolato prima del pensionamento.»",
        },
        {
          key: "C",
          text: "«Investire subito in un ETF azionario globale – storicamente il MSCI World non ha mai registrato perdite dopo 10 anni, il rischio statistico è zero su questo orizzonte.»",
        },
        {
          key: "D",
          text: "«Liquidare il conto risparmio e investire nel pilastro 3a – il vantaggio fiscale del 3a supera a lungo termine qualsiasi rendimento fondi.»",
        },
      ],
      feedback:
        "Conto risparmio = sicurezza ma basso rendimento. Fondo = rendimento più elevato ma con fluttuazioni. Regola empirica: mantenere sempre la riserva d'emergenza (3–6 mensilità) sul conto risparmio. Tutto il resto può essere investito se l'orizzonte è sufficientemente lungo.",
      merksatz:
        "Riserva d'emergenza sul conto risparmio, il resto investito se l'orizzonte è sufficientemente lungo. La sicurezza ha un prezzo: perdita strisciante del potere d'acquisto.",
    },
    "2.1": {
      situation:
        "Nuovo cliente, 50 anni, vuole investire CHF 50'000. Dice: «Voglio un buon rendimento, ma se il mercato scende, vendo subito tutto.»",
      question: "Cosa noti?",
      options: [
        { key: "A", text: "Nessun problema – raccomandare Crescita come desiderato" },
        {
          key: "B",
          text: "Contraddizione rilevata: un rendimento elevato richiede un lungo orizzonte e pazienza nelle flessioni. Chi vende alla prima discesa realizza perdite. Il profilo d'investitore mostra piuttosto una strategia Rendimento.",
        },
        { key: "C", text: "Aggressivo – il rendimento massimo è sempre il migliore" },
        { key: "D", text: "Raccomandare un conto risparmio – nessun rischio" },
      ],
      feedback:
        "La propensione al rischio e la capacità di rischio devono corrispondere. Chi vende immediatamente a −20 % non ha una vera propensione al rischio per Crescita o Aggressivo. Rendimento si adatta meglio – meno fluttuazioni, sonno più tranquillo e nessuna vendita affrettata.",
      merksatz:
        "Chi reagisce in preda al panico alle fluttuazioni ha una quota azionaria troppo alta. Profilo di rischio = ciò che il cliente sopporta davvero, non ciò che desidera.",
    },
    "2.2": {
      situation:
        "Una cliente di 62 anni va in pensione tra 3 anni. Ha CHF 80'000 e chiede se dovrebbe ancora investire in fondi.",
      question: "Cosa consigli?",
      options: [
        {
          key: "A",
          text: "Con un orizzonte di 3 anni e la pensione vicina, raccomando al massimo una strategia Rendimento o un conto risparmio. Le azioni hanno bisogno di almeno 5 anni – un crollo dei corsi poco prima della pensione sarebbe fatale.",
        },
        { key: "B", text: "Sì – Crescita per il massimo rendimento negli ultimi anni" },
        { key: "C", text: "Equilibrata è sempre una buona scelta per tutti" },
        { key: "D", text: "Versare tutto nel pilastro 3a per i vantaggi fiscali" },
      ],
      feedback:
        "L'orizzonte d'investimento è decisivo! 3 anni = troppo breve per un'alta quota azionaria. Il rischio di un calo dei corsi poco prima della pensione è insostenibile – il capitale sarà necessario in quel momento. Rendimento o conto risparmio come scelta sicura in questo caso.",
      merksatz:
        "Più breve è l'orizzonte, più la conservazione del capitale prevale, meno azioni. Regola: sotto i 5 anni nessuna quota azionaria significativa.",
    },
    "2.3": {
      situation:
        "Un cliente confronta due fondi: Fondo A con TER 0.3 %, Fondo B con TER 1.8 %. Chiede se è importante.",
      question: "Cosa spieghi?",
      options: [
        {
          key: "A",
          text: "«La storia dei rendimenti è più determinante del TER. Il Fondo B ha realizzato il 7.8 % all'anno negli ultimi 5 anni, il Fondo A solo il 6.1 % – il costo aggiuntivo è ampiamente compensato dal rendimento superiore.»",
        },
        {
          key: "B",
          text: "«Un TER fino all'1.8 % è normale nel settore per i fondi attivi ed è ammesso dalla FINMA. L'importante è se il Fondo B batte il suo indice di riferimento a lungo termine.»",
        },
        {
          key: "C",
          text: "«I fondi a gestione attiva hanno un TER più alto perché il gestore analizza e ottimizza quotidianamente. Ne vale la pena: i fondi attivi superano a lungo termine gli ETF passivi.»",
        },
        {
          key: "D",
          text: "«Il TER è molto importante! Per CHF 50'000: il Fondo A costa CHF 150/anno, il Fondo B CHF 900/anno. Su 10 anni: CHF 7'500 di differenza – solo a causa dei costi.»",
        },
      ],
      feedback:
        "Il TER (Total Expense Ratio) è il rapporto di costi totali annui di un fondo. Costi più bassi = più rendimento per il cliente. Gli ETF hanno spesso un TER nettamente più basso dei fondi a gestione attiva. Confrontare sempre i costi – fanno una grande differenza su lunghi periodi.",
      merksatz:
        "1 % di costi in più = fino al 20 % di patrimonio finale in meno su 20 anni (interessi composti). Il TER è il freno più equo al rendimento.",
    },
    "3.1": {
      situation:
        "Coppia, entrambi 45 anni: il marito vuole investire in modo sicuro, senza rischi. La moglie vuole il massimo rendimento, a lungo termine. Deposito comune, CHF 100'000, orizzonte 15 anni.",
      question: "Cosa consigli?",
      options: [
        { key: "A", text: "Aggressivo – la moglie ha ragione, 15 anni bastano" },
        { key: "B", text: "Conto risparmio – il marito ha ragione, la sicurezza prima di tutto" },
        {
          key: "C",
          text: "Equilibrata come compromesso per il deposito comune – entrambe le esigenze considerate, orizzonte di 15 anni adeguato. O: due depositi separati con la propria strategia.",
        },
        { key: "D", text: "Rendimento – sicuro per entrambi, senza compromessi" },
      ],
      feedback:
        "Con profili di rischio diversi ci sono due buone soluzioni: 1. Strategia di compromesso (Equilibrata) per il deposito comune. 2. Depositi separati con la propria strategia personalizzata. L'opzione 2 è spesso migliore – ognuno ha il suo profilo adeguato senza rinunce.",
      merksatz:
        "Profili di rischio diversi = depositi separati o vero compromesso. Non imporre mai il profilo più alto.",
    },
    "3.2": {
      situation:
        "Un cliente chiama agitato: «Il mio fondo è sceso del 15 %! Voglio vendere subito tutto!»",
      question: "Cosa gli dici?",
      options: [
        { key: "A", text: "«Sì, vendere subito – fermare le perdite ora prima che peggiori»" },
        { key: "B", text: "«Passare ad altri fondi – questo risolve il problema»" },
        { key: "C", text: "«Aspetti fino a domani e decida allora»" },
        {
          key: "D",
          text: "«Capisco la sua preoccupazione. Ma vendere al minimo realizza la perdita. Il suo orizzonte è ancora di 10 anni – i mercati si sono sempre ripresi storicamente. Mantenere la calma e non cambiare strategia.»",
        },
      ],
      feedback:
        "Errore classico: vendere al minimo, comprare al massimo – esattamente il contrario del corretto. Orizzonte a lungo termine = sopportare le fluttuazioni a breve termine. Storicamente i mercati azionari si riprendono dopo ogni calo. Cambiare strategia solo se la situazione di vita cambia – non a causa dei movimenti del mercato.",
      merksatz:
        "Cambiare strategia per panico di mercato è il maggiore errore. Cambia strategia quando la situazione di vita cambia – non quando il mercato scende.",
    },
    "3.3": {
      situation:
        "Cliente, 38 anni, vuole investire CHF 30'000. Profilo d'investitore: Crescita. Orizzonte secondo profilo: 7 anni. Tuttavia dice: «Avrò bisogno di questi soldi al più tardi tra 3 anni per l'acquisto di una casa.»",
      question: "Cosa fai?",
      options: [
        {
          key: "A",
          text: "Mantenere la strategia Crescita – il profilo è stato creato e firmato insieme. Gli aggiustamenti del profilo sono necessari solo quando il cliente definisce un nuovo obiettivo d'investimento.",
        },
        {
          key: "B",
          text: "Ribilanciare il portafoglio su Equilibrata (50/50) – il rischio è così dimezzato e l'acquisto immobiliare tra 3 anni è sufficientemente garantito.",
        },
        {
          key: "C",
          text: "Crescita su 3 anni è ancora accettabile – i mercati azionari si riprendono generalmente entro 12-18 mesi dalle correzioni.",
        },
        {
          key: "D",
          text: "Il profilo d'investitore deve essere adeguato! L'orizzonte effettivo è di 3 anni, non 7. Con Crescita rischia un calo al momento dell'acquisto immobiliare. Raccomandazione: conto risparmio o Rendimento per questo importo.",
        },
      ],
      feedback:
        "L'orizzonte d'investimento effettivo è il più breve! Non quello che il cliente ha firmato, ma quando avrà davvero bisogno del denaro. Il profilo d'investitore deve corrispondere alla realtà – il consulente ha un dovere di consulenza. Un profilo errato è un rischio di responsabilità.",
      merksatz:
        "Orizzonte effettivo = primo momento in cui il denaro sarà necessario. Non quello che è stato firmato.",
    },
  },
};
