import type { LangTranslations } from "./utils";

export const OBLIGATIONEN_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      title: "Comprendre la notation",
      situation:
        "Thomas Huber, 55 ans, profil conservateur, veut placer CHF 50'000 en sécurité. Il voit deux obligations : Obligation A (Confédération suisse, rating AAA, coupon 1,5 %) et Obligation B (émetteur pays émergent, rating CCC, coupon 6,5 %). Il demande : «Ne devrais-je pas prendre B – 6,5 % semble bien meilleur ?»",
      question: "Que expliques-tu à Thomas Huber ?",
      options: [
        { key: "A", text: "L'obligation B est clairement le meilleur choix – 6,5 % de coupon donne CHF 3'250 d'intérêts annuels au lieu de CHF 750. Pour un différentiel de rendement aussi important, le rendement l'emporte sur le risque théorique." },
        { key: "B", text: "Les agences de notation se sont complètement trompées lors de la crise financière de 2008. Pour les investisseurs expérimentés comme Thomas : le coupon et la durée décident, pas la notation d'une agence." },
        { key: "C", text: "Les deux obligations sont contractuellement garanties et remboursent coupon et capital. La notation est une évaluation externe sans valeur contraignante et n'affecte pas les obligations contractuelles." },
        { key: "D", text: "AAA signifie la meilleure solvabilité et un risque de défaut minimal. CCC est proche du défaut. Le coupon plus élevé est la prime de risque – pour Thomas comme investisseur conservateur, l'obligation A est le bon choix." },
      ],
      feedback:
        "Les notations indiquent la solvabilité de l'émetteur. AAA = qualité maximale, risque de défaut minimal. CCC = risque de défaut considérable – en cas de dégradation économique, le défaut est probable. Le coupon plus élevé sur CCC est la prime de risque. Pour Thomas (préservation du capital), l'obligation A est le seul choix justifiable.",
    },
    "1.2": {
      title: "Qu'est-ce qu'une obligation ?",
      situation:
        "La jeune cliente Lara demande : «J'entends dire que les obligations sont plus sûres que les actions. Mais qu'est-ce que c'est exactement ?»",
      question: "Quelle description d'une obligation est correcte ?",
      options: [
        { key: "A", text: "Une obligation est un instrument de capital propre – comme une action, mais avec un rendement plus faible" },
        { key: "B", text: "Une obligation est un prêt de l'investisseur à l'émetteur : l'émetteur verse régulièrement des intérêts (coupon) et rembourse la dette à l'échéance (remboursement du nominal)" },
        { key: "C", text: "Les obligations ne peuvent pas être négociées en bourse – on les détient jusqu'à l'échéance" },
        { key: "D", text: "Les obligations garantissent toujours un rendement positif, indépendamment de l'émetteur" },
      ],
      feedback:
        "Obligation = instrument de capital étranger. L'investisseur prête de l'argent à l'émetteur (État, entreprise). L'émetteur s'engage : 1) Payer le coupon (intérêts) régulièrement. 2) Rembourser le nominal à l'échéance. Risque : solvabilité de l'émetteur – plus la solvabilité est faible, plus le risque de défaut est élevé. Les obligations peuvent être négociées en bourse.",
    },
    "1.3": {
      title: "Obligations d'État vs. obligations d'entreprises",
      situation:
        "Jonas compare : obligation de la Confédération suisse (coupon 1,0 %, AAA) et obligation Swisscom SA (coupon 2,5 %, rating A). Les deux ont une durée de 5 ans.",
      question: "Pourquoi l'obligation Swisscom offre-t-elle un coupon plus élevé que l'obligation de la Confédération ?",
      options: [
        { key: "A", text: "Parce que Swisscom est plus grande que la Suisse et peut payer plus d'intérêts" },
        { key: "B", text: "Le coupon plus élevé est la prime de risque – Swisscom présente un risque de défaut plus élevé que la Confédération. Plus de risque = plus d'intérêts" },
        { key: "C", text: "Parce que Swisscom n'a pas de garantie d'État et doit donc légalement payer des intérêts plus élevés" },
        { key: "D", text: "Pas de raison – les coupons sont fixés aléatoirement par l'émetteur" },
      ],
      feedback:
        "La Confédération suisse est considérée comme l'émetteur le plus sûr au monde (AAA). La probabilité de défaut est pratiquement nulle. Swisscom est une entreprise : plus dépendante de la conjoncture, risque de défaut plus élevé. Pour ce risque supplémentaire, le marché exige une prime de risque (credit spread) – ici 1,5 % d'intérêts supplémentaires. Principe fondamental : plus de risque = plus de rendement.",
    },
    "2.1": {
      title: "Calculer le rendement",
      situation:
        "La cliente Sandra Weber examine une obligation Migros Bank SA : nominal CHF 1'000, cours actuel 97 %, coupon 2,5 % p.a., durée résiduelle 4 ans. Elle demande : «Qu'est-ce que je vais vraiment obtenir ?»",
      question: "Quel est le rendement approximatif p.a. de cette obligation ?",
      options: [
        { key: "A", text: "2,5 % – c'est le coupon, donc le rendement" },
        { key: "B", text: "3,35 % p.a. – coupon plus gain en capital au prorata, divisé par le cours d'achat" },
        { key: "C", text: "1,5 % – le coupon moins la déduction pour perte en cours" },
        { key: "D", text: "6,7 % – coupon doublé en raison de l'achat à escompte" },
      ],
      feedback:
        "Rendement ≠ seulement coupon ! Celui qui achète sous le nominal (cours < 100 %) reçoit le nominal à l'échéance – ce qui donne le gain en capital. Rendement approximatif = (Coupon + gain en capital p.a.) / cours d'achat. CHF 25 + CHF 7,50 = CHF 32,50 / CHF 970 ≈ 3,35 %.",
    },
    "2.2": {
      title: "La duration comme indicateur de risque",
      situation:
        "Mme Isler compare deux obligations avec un rating A identique : Obligation X (duration 2 ans, coupon 3,5 %) et Obligation Y (duration 9 ans, coupon 2,0 %). Elle anticipe une hausse des taux.",
      question: "Quelle obligation est moins sensible aux pertes en cours en cas de hausse des taux ?",
      options: [
        { key: "A", text: "Obligation Y – elle a le coupon le plus bas et est donc moins chère" },
        { key: "B", text: "Les deux pareil – la duration n'influence que les revenus d'intérêts, pas le cours" },
        { key: "C", text: "Obligation X – faible duration (2 ans) signifie faible sensibilité aux taux. Pour +1 % de hausse des taux, Obligation X perd env. 2 %, Obligation Y env. 9 %" },
        { key: "D", text: "Obligation X, parce qu'un coupon plus élevé compense toujours le risque de cours" },
      ],
      feedback:
        "La duration mesure la sensibilité aux taux : pour +1 % de hausse des taux, le cours d'une obligation baisse approximativement de sa duration en pourcentage. Obligation X (duration 2) : env. −2 % de perte en cours. Obligation Y (duration 9) : env. −9 % de perte en cours. En cas d'anticipation de hausse des taux : préférer les obligations à court terme. Faible duration = faible risque de variation des taux.",
    },
    "2.3": {
      title: "Dégradation de la solvabilité — impact sur le cours",
      situation:
        "M. Neuhaus détient une obligation d'entreprise Retail AG (actuellement BBB, Investment Grade). Un déclassement en BB (Speculative Grade / Junk) est annoncé. Que se passe-t-il avec le cours ?",
      question: "Quel effet a le déclassement de BBB à BB sur le cours de l'obligation ?",
      options: [
        { key: "A", text: "Le cours monte – les Junk Bonds paient des intérêts plus élevés, ce qui rend le placement plus attractif" },
        { key: "B", text: "Le cours reste stable – la notation n'est qu'une opinion externe sans pertinence sur le cours" },
        { key: "C", text: "Le cours baisse fortement – les investisseurs institutionnels doivent détenir des obligations Investment Grade et vendent de force ; le credit spread augmente, le prix de marché baisse" },
        { key: "D", text: "Le cours baisse légèrement – mais seulement si les taux augmentent en même temps" },
      ],
      feedback:
        "Déclassement BBB→BB = perte du statut Investment Grade. De nombreux investisseurs institutionnels (caisses de pension, assurances) ont des mandats n'autorisant que l'Investment Grade. Ils doivent vendre de force. Cette vague de ventes fait chuter le cours fortement. Le credit spread s'élargit – le marché exige une prime de risque plus élevée. Effet : perte en cours considérable pour les détenteurs comme M. Neuhaus.",
    },
    "3.1": {
      title: "Relation taux-cours",
      situation:
        "M. Müller a acheté il y a 2 ans une obligation de la Confédération à 10 ans au pair (100 %) avec un coupon de 1 %. Depuis lors, les taux du marché sont montés à 3 %. M. Müller envisage maintenant de vendre l'obligation.",
      question: "Qu'est-il arrivé au cours de l'obligation de M. Müller ?",
      options: [
        { key: "A", text: "Le cours a monté – les obligations de la Confédération sont sûres et demandées" },
        { key: "B", text: "Le cours est inchangé – la solvabilité de l'émetteur n'a pas changé" },
        { key: "C", text: "Le cours a nettement baissé – en cas de hausse des taux du marché, les cours des obligations baissent" },
        { key: "D", text: "Le cours monte, car les taux plus élevés génèrent plus de demande" },
      ],
      feedback:
        "Relation taux-cours : quand les taux du marché montent, les cours des obligations existantes baissent. Les nouvelles obligations offrent 3 % – qui paierait encore 100 % pour une obligation à seulement 1 % ? L'obligation de M. Müller vaut bien moins que CHF 10'000. Avec 8 ans de durée résiduelle et 2 % de différentiel de taux, le cours pourrait être tombé à env. 85–87 %.",
    },
    "3.2": {
      title: "Obligation convertible",
      situation:
        "SoftFin AG émet une obligation convertible : nominal CHF 1'000, coupon 1,5 %, durée 5 ans. Droit de conversion : chaque obligation peut être convertie en 10 actions SoftFin AG (prix de conversion CHF 100). Cours actuel de l'action : CHF 80. Mme Gerber envisage d'investir.",
      question: "À partir de quel cours de l'action est-il intéressant de convertir l'obligation convertible en actions ?",
      options: [
        { key: "A", text: "Immédiatement – Mme Gerber devrait convertir maintenant au cours CHF 80" },
        { key: "B", text: "À partir d'un cours de CHF 100 – c'est alors seulement que la valeur de conversion (10 × CHF 100) est égale au nominal" },
        { key: "C", text: "Les obligations convertibles sont toujours converties automatiquement – l'investisseur n'a aucune influence" },
        { key: "D", text: "Seulement à partir de CHF 150 – prix de conversion plus renonciation au coupon sur 5 ans" },
      ],
      feedback:
        "Valeur de conversion = cours de l'action × ratio de conversion. À CHF 80 : 10 × CHF 80 = CHF 800 < CHF 1'000 (nominal). La conversion ne vaut pas la peine. À partir de CHF 100 : 10 × CHF 100 = CHF 1'000. Parité atteinte. Si l'action monte davantage (p.ex. CHF 130) : 10 × CHF 130 = CHF 1'300 > CHF 1'000. La conversion est alors intéressante. Obligation convertible = combinaison : obligation (protection) + option d'achat (upside).",
    },
    "3.3": {
      title: "Interpréter la courbe des taux",
      situation:
        "L'environnement de marché actuel montre une courbe des taux inverse : les obligations d'État suisses à 2 ans rapportent 2,5 %, les obligations à 10 ans seulement 1,8 %. M. Kaufmann veut investir CHF 100'000 dans des obligations d'État suisses.",
      question: "Que signale une courbe des taux inverse et comment M. Kaufmann devrait-il réagir ?",
      options: [
        { key: "A", text: "Une courbe inverse est normale en Suisse – toujours investir dans des longues maturités pour le rendement maximum" },
        { key: "B", text: "Courbe inverse = les obligations à court terme rapportent plus que les longues. Cela signale une anticipation de récession. Les obligations à court terme offrent aujourd'hui un meilleur rendement avec moins de risque de taux" },
        { key: "C", text: "Une courbe inverse signifie inflation – basculer immédiatement en actions" },
        { key: "D", text: "M. Kaufmann ne devrait pas investir en obligations quand la courbe des taux est inverse" },
      ],
      feedback:
        "Courbe normale : les longues maturités rapportent plus (en raison d'un risque plus long). Courbe inverse : les courtes maturités rapportent plus. Signal : les acteurs de marché anticipent des taux plus bas à l'avenir (p.ex. en cas de récession, les taux sont abaissés). Pour M. Kaufmann : les obligations à 2 ans offrent aujourd'hui 2,5 % vs. 1,8 % pour 10 ans – et avec beaucoup moins de risque de taux (duration ~2 vs. ~8). Choix clair dans cet environnement.",
    },
  },
  it: {
    "1.1": {
      title: "Capire il rating",
      situation:
        "Thomas Huber, 55 anni, profilo conservativo, vuole investire CHF 50'000 in sicurezza. Vede due obbligazioni: Obbligazione A (Confederazione svizzera, rating AAA, cedola 1,5%) e Obbligazione B (emittente paese emergente, rating CCC, cedola 6,5%). Chiede: «Non dovrei prendere B – 6,5% sembra molto meglio?»",
      question: "Cosa spieghi a Thomas Huber?",
      options: [
        { key: "A", text: "L'obbligazione B è chiaramente la scelta migliore – il 6,5% di cedola dà CHF 3'250 di interessi annui invece di CHF 750. Per un differenziale di rendimento così grande, il rendimento supera il rischio teorico." },
        { key: "B", text: "Le agenzie di rating si sono completamente sbagliate durante la crisi finanziaria del 2008. Per investitori esperti come Thomas: cedola e durata decidono, non il rating di un'agenzia." },
        { key: "C", text: "Entrambe le obbligazioni sono garantite contrattualmente e rimborsano cedola e capitale. Il rating è una valutazione esterna senza valore vincolante e non influisce sugli obblighi contrattuali." },
        { key: "D", text: "AAA significa massima solvibilità e rischio di default minimo. CCC è vicino al default. La cedola più alta è il premio di rischio – per Thomas come investitore conservativo, l'obbligazione A è la scelta giusta." },
      ],
      feedback:
        "I rating indicano la solvibilità dell'emittente. AAA = qualità massima, rischio di default minimo. CCC = rischio di default considerevole – in caso di deterioramento economico, il default è probabile. La cedola più alta su CCC è il premio di rischio. Per Thomas (conservazione del capitale), l'obbligazione A è l'unica scelta giustificabile.",
    },
    "1.2": {
      title: "Cos'è un'obbligazione?",
      situation:
        "La giovane cliente Lara chiede: «Sento dire che le obbligazioni sono più sicure delle azioni. Ma cosa sono esattamente?»",
      question: "Quale descrizione di un'obbligazione è corretta?",
      options: [
        { key: "A", text: "Un'obbligazione è uno strumento di capitale proprio – come un'azione, ma con rendimento più basso" },
        { key: "B", text: "Un'obbligazione è un prestito dell'investitore all'emittente: l'emittente paga regolarmente interessi (cedola) e rimborsa il debito alla scadenza (rimborso del valore nominale)" },
        { key: "C", text: "Le obbligazioni non possono essere negoziate in borsa – si detengono fino alla scadenza" },
        { key: "D", text: "Le obbligazioni garantiscono sempre un rendimento positivo, indipendentemente dall'emittente" },
      ],
      feedback:
        "Obbligazione = strumento di capitale di terzi. L'investitore presta denaro all'emittente (Stato, impresa). L'emittente si impegna: 1) Pagare la cedola (interessi) regolarmente. 2) Rimborsare il valore nominale alla scadenza. Rischio: solvibilità dell'emittente – più bassa è la solvibilità, più alto è il rischio di default. Le obbligazioni possono essere negoziate in borsa.",
    },
    "1.3": {
      title: "Obbligazioni di Stato vs. obbligazioni societarie",
      situation:
        "Jonas confronta: obbligazione della Confederazione svizzera (cedola 1,0%, AAA) e obbligazione Swisscom SA (cedola 2,5%, rating A). Entrambe hanno durata 5 anni.",
      question: "Perché l'obbligazione Swisscom offre una cedola più alta rispetto all'obbligazione della Confederazione?",
      options: [
        { key: "A", text: "Perché Swisscom è più grande della Svizzera e può pagare più interessi" },
        { key: "B", text: "La cedola più alta è il premio di rischio – Swisscom ha un rischio di default più alto della Confederazione. Più rischio = più interessi" },
        { key: "C", text: "Perché Swisscom non ha garanzia statale e deve quindi legalmente pagare interessi più alti" },
        { key: "D", text: "Nessun motivo – le cedole sono fissate casualmente dall'emittente" },
      ],
      feedback:
        "La Confederazione svizzera è considerata l'emittente più sicuro al mondo (AAA). La probabilità di default è praticamente nulla. Swisscom è un'impresa: più dipendente dalla congiuntura, rischio di default più alto. Per questo rischio aggiuntivo, il mercato esige un premio di rischio (credit spread) – qui 1,5% di interessi aggiuntivi. Principio fondamentale: più rischio = più rendimento.",
    },
    "2.1": {
      title: "Calcolare il rendimento",
      situation:
        "La cliente Sandra Weber esamina un'obbligazione Migros Bank SA: valore nominale CHF 1'000, corso attuale 97%, cedola 2,5% p.a., durata residua 4 anni. Chiede: «Cosa otterrò davvero?»",
      question: "Qual è il rendimento approssimativo p.a. di questa obbligazione?",
      options: [
        { key: "A", text: "2,5% – questa è la cedola, quindi il rendimento" },
        { key: "B", text: "3,35% p.a. – cedola più guadagno in conto capitale proporzionale, diviso per il corso di acquisto" },
        { key: "C", text: "1,5% – la cedola meno la deduzione per perdita in corso" },
        { key: "D", text: "6,7% – cedola raddoppiata per l'acquisto con sconto" },
      ],
      feedback:
        "Rendimento ≠ solo cedola! Chi acquista sotto il nominale (corso < 100%) riceve il nominale alla scadenza – questo genera il guadagno in conto capitale. Rendimento approssimativo = (Cedola + guadagno in conto capitale p.a.) / corso di acquisto. CHF 25 + CHF 7,50 = CHF 32,50 / CHF 970 ≈ 3,35%.",
    },
    "2.2": {
      title: "La duration come indicatore di rischio",
      situation:
        "La Sig.ra Isler confronta due obbligazioni con rating A identico: Obbligazione X (duration 2 anni, cedola 3,5%) e Obbligazione Y (duration 9 anni, cedola 2,0%). Si aspetta un rialzo dei tassi.",
      question: "Quale obbligazione è meno vulnerabile alle perdite in corso in caso di rialzo dei tassi?",
      options: [
        { key: "A", text: "Obbligazione Y – ha la cedola più bassa ed è quindi meno costosa" },
        { key: "B", text: "Entrambe uguale – la duration influenza solo i proventi da interessi, non il corso" },
        { key: "C", text: "Obbligazione X – bassa duration (2 anni) significa bassa sensibilità ai tassi. Per +1% di rialzo dei tassi, Obbligazione X perde circa il 2%, Obbligazione Y circa il 9%" },
        { key: "D", text: "Obbligazione X, perché una cedola più alta compensa sempre il rischio di corso" },
      ],
      feedback:
        "La duration misura la sensibilità ai tassi: per +1% di rialzo dei tassi, il corso di un'obbligazione scende approssimativamente della sua duration in percentuale. Obbligazione X (duration 2): circa −2% di perdita in corso. Obbligazione Y (duration 9): circa −9% di perdita in corso. In caso di aspettativa di rialzo dei tassi: preferire obbligazioni a breve termine. Bassa duration = basso rischio di variazione dei tassi.",
    },
    "2.3": {
      title: "Deterioramento della solvibilità — impatto sul corso",
      situation:
        "Il Sig. Neuhaus detiene un'obbligazione societaria Retail AG (attualmente BBB, Investment Grade). Viene annunciato un declassamento a BB (Speculative Grade / Junk). Cosa succede al corso?",
      question: "Quale effetto ha il declassamento da BBB a BB sul corso dell'obbligazione?",
      options: [
        { key: "A", text: "Il corso sale – i Junk Bond pagano interessi più alti, il che rende il placement più attraente" },
        { key: "B", text: "Il corso rimane stabile – il rating è solo un'opinione esterna senza rilevanza sul corso" },
        { key: "C", text: "Il corso scende nettamente – gli investitori istituzionali devono detenere obbligazioni Investment Grade e vendono forzatamente; il credit spread aumenta, il prezzo di mercato scende" },
        { key: "D", text: "Il corso scende leggermente – ma solo se contemporaneamente anche i tassi salgono" },
      ],
      feedback:
        "Declassamento BBB→BB = perdita dello status Investment Grade. Molti investitori istituzionali (casse pensioni, assicurazioni) hanno mandati che consentono solo l'Investment Grade. Devono vendere forzatamente. Questa ondata di vendite fa crollare il corso. Il credit spread si allarga – il mercato esige un premio di rischio più elevato. Effetto: perdita in corso considerevole per i detentori come il Sig. Neuhaus.",
    },
    "3.1": {
      title: "Relazione tasso-corso",
      situation:
        "Il Sig. Müller ha acquistato 2 anni fa un'obbligazione della Confederazione a 10 anni alla pari (100%) con cedola 1%. Da allora i tassi di mercato sono saliti al 3%. Il Sig. Müller ora considera di vendere l'obbligazione.",
      question: "Cosa è successo al corso dell'obbligazione del Sig. Müller?",
      options: [
        { key: "A", text: "Il corso è salito – le obbligazioni della Confederazione sono sicure e richieste" },
        { key: "B", text: "Il corso è invariato – la solvibilità dell'emittente non è cambiata" },
        { key: "C", text: "Il corso è sceso nettamente – quando i tassi di mercato salgono, i corsi delle obbligazioni scendono" },
        { key: "D", text: "Il corso sale, perché tassi più alti generano più domanda" },
      ],
      feedback:
        "Relazione tasso-corso: quando i tassi di mercato salgono, i corsi delle obbligazioni esistenti scendono. Le nuove obbligazioni offrono il 3% – chi pagherebbe ancora il 100% per un'obbligazione all'1%? L'obbligazione del Sig. Müller vale molto meno di CHF 10'000. Con 8 anni di durata residua e 2% di differenziale di tasso, il corso potrebbe essere sceso a circa 85–87%.",
    },
    "3.2": {
      title: "Obbligazione convertibile",
      situation:
        "SoftFin AG emette un'obbligazione convertibile: valore nominale CHF 1'000, cedola 1,5%, durata 5 anni. Diritto di conversione: ogni obbligazione può essere convertita in 10 azioni SoftFin AG (prezzo di conversione CHF 100). Corso attuale dell'azione: CHF 80. La Sig.ra Gerber considera di investire.",
      question: "A partire da quale corso dell'azione conviene convertire l'obbligazione convertibile in azioni?",
      options: [
        { key: "A", text: "Subito – la Sig.ra Gerber dovrebbe convertire ora al corso CHF 80" },
        { key: "B", text: "A partire da corso CHF 100 – solo allora il valore di conversione (10 × CHF 100) è uguale al valore nominale" },
        { key: "C", text: "Le obbligazioni convertibili vengono sempre convertite automaticamente – l'investitore non ha alcuna influenza" },
        { key: "D", text: "Solo a partire da CHF 150 – prezzo di conversione più rinuncia alla cedola su 5 anni" },
      ],
      feedback:
        "Valore di conversione = corso dell'azione × rapporto di conversione. A CHF 80: 10 × CHF 80 = CHF 800 < CHF 1'000 (nominale). La conversione non conviene. A partire da CHF 100: 10 × CHF 100 = CHF 1'000. Parità raggiunta. Se l'azione sale ulteriormente (p.es. CHF 130): 10 × CHF 130 = CHF 1'300 > CHF 1'000. Allora la conversione conviene. Obbligazione convertibile = combinazione: obbligazione (protezione) + opzione d'acquisto (upside).",
    },
    "3.3": {
      title: "Interpretare la curva dei tassi",
      situation:
        "L'attuale contesto di mercato mostra una curva dei tassi inversa: le obbligazioni di Stato svizzere a 2 anni rendono il 2,5%, quelle a 10 anni solo l'1,8%. Il Sig. Kaufmann vuole investire CHF 100'000 in obbligazioni di Stato svizzere.",
      question: "Cosa segnala una curva dei tassi inversa e come dovrebbe reagire il Sig. Kaufmann?",
      options: [
        { key: "A", text: "La curva inversa è normale in Svizzera – investire sempre nelle scadenze lunghe per il rendimento massimo" },
        { key: "B", text: "Curva inversa = le scadenze brevi rendono più delle lunghe. Questo segnala un'aspettativa di recessione. Le scadenze brevi offrono oggi un rendimento migliore con meno rischio di tasso" },
        { key: "C", text: "La curva inversa significa inflazione – passare subito alle azioni" },
        { key: "D", text: "Il Sig. Kaufmann non dovrebbe investire in obbligazioni quando la curva dei tassi è inversa" },
      ],
      feedback:
        "Curva normale: le scadenze lunghe rendono di più (a causa del rischio più lungo). Curva inversa: le scadenze brevi rendono di più. Segnale: i partecipanti al mercato si aspettano tassi più bassi in futuro (p.es. in caso di recessione i tassi vengono abbassati). Per il Sig. Kaufmann: le obbligazioni a 2 anni offrono oggi il 2,5% vs. l'1,8% per 10 anni – e con molto meno rischio di tasso (duration ~2 vs. ~8). Scelta chiara in questo contesto.",
    },
  },
};
