import type { LangTranslations } from "./utils";

export const OBLIGATIONEN_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      situation:
        "Thomas Huber, 55 ans, conservateur, souhaite placer CHF 50'000 en toute sécurité. Il voit deux obligations : Obligation A (Confédération suisse, rating AAA, coupon 1.5%) et Obligation B (émetteur de marché émergent, rating CCC, coupon 6.5%). Il demande : «Ne devrais-je pas prendre B – 6.5% ça semble bien meilleur ?»",
      question: "Qu'expliquez-vous à Thomas Huber ?",
      options: [
        { key: "A", text: "L'obligation B est clairement le meilleur choix – 6.5% de coupon donne CHF 3'250 d'intérêts par an au lieu de CHF 750. Pour une telle différence de rendement, le gain compense le risque théorique." },
        { key: "B", text: "Les agences de notation se sont complètement trompées lors de la crise financière de 2008. Pour des investisseurs expérimentés comme Thomas : le coupon et la durée décident, pas le rating d'une agence." },
        { key: "C", text: "Les deux obligations sont garanties par contrat et paient le coupon et le capital. Le rating est une évaluation externe sans valeur juridique contraignante et n'influence pas les obligations contractuelles." },
        { key: "D", text: "AAA signifie la meilleure qualité de crédit et un risque minimal de défaillance. CCC est proche du défaut. Le coupon plus élevé est la prime de risque – pour Thomas comme investisseur conservateur, l'obligation A est le bon choix." },
      ],
      feedback:
        "Les ratings montrent la solvabilité de l'émetteur. AAA = qualité la plus élevée, risque minimal de défaillance. CCC = risque de défaillance considérable – en cas de dégradation économique, le défaut est probable. Le coupon plus élevé pour CCC est la prime de risque. Pour Thomas (préservation du capital), l'obligation A est le seul choix justifiable.",
    },
    "1.2": {
      situation:
        "La jeune cliente Lara demande : «J'entends que les obligations sont plus sûres que les actions. Mais qu'est-ce que c'est exactement ?»",
      question: "Quelle description est correcte pour une obligation ?",
      options: [
        { key: "A", text: "Une obligation est un instrument de fonds propres – comme une action, mais avec un rendement plus bas" },
        { key: "B", text: "Une obligation est un prêt de l'investisseur à l'émetteur : l'émetteur paye régulièrement des intérêts (coupon) et rembourse la dette à la fin (remboursement de la valeur nominale)" },
        { key: "C", text: "Les obligations ne peuvent pas être négociées en bourse – on les détient jusqu'à l'échéance" },
        { key: "D", text: "Les obligations garantissent toujours un rendement positif, indépendamment de l'émetteur" },
      ],
      feedback:
        "Obligation = instrument de dette. L'investisseur prête de l'argent à l'émetteur (État, entreprise). L'émetteur s'engage à : 1) payer régulièrement le coupon (intérêts). 2) rembourser la valeur nominale à l'échéance. Risque : solvabilité de l'émetteur – plus la solvabilité est mauvaise, plus le risque de défaillance est élevé. Les obligations peuvent être négociées en bourse.",
    },
    "1.3": {
      situation:
        "Jonas compare : Obligation de la Confédération suisse (coupon 1.0%, AAA) et emprunt obligataire Swisscom SA (coupon 2.5%, rating A). Les deux ont une durée de 5 ans.",
      question: "Pourquoi l'emprunt Swisscom offre-t-il un coupon plus élevé que l'obligation de la Confédération ?",
      options: [
        { key: "A", text: "Parce que Swisscom est plus grande que la Suisse et peut payer plus d'intérêts" },
        { key: "B", text: "Le coupon plus élevé est la prime de risque – Swisscom présente un risque de défaillance plus élevé que la Confédération. Plus de risque = plus d'intérêts" },
        { key: "C", text: "Parce que Swisscom n'a pas de garantie étatique et doit donc légalement payer des intérêts plus élevés" },
        { key: "D", text: "Pas de raison – les coupons sont fixés aléatoirement par l'émetteur" },
      ],
      feedback:
        "La Confédération suisse est considérée comme l'émetteur le plus sûr au monde (AAA). La probabilité d'un défaut est pratiquement nulle. Swisscom est une entreprise : plus dépendante de la conjoncture économique, risque de défaillance plus élevé. Pour ce risque supplémentaire, le marché exige une prime de risque (credit spread) – ici 1.5% de plus. Principe fondamental : plus de risque = plus de rendement.",
    },
    "2.1": {
      situation:
        "La cliente Sandra Weber examine une obligation Migros Bank SA : valeur nominale CHF 1'000, cours actuel 97%, coupon 2.5% p.a., durée résiduelle 4 ans. Elle demande : «Qu'est-ce que ça me rapporte vraiment ?»",
      question: "Quel est le rendement approximatif p.a. de cette obligation ?",
      options: [
        { key: "A", text: "2.5% – c'est le coupon, donc le rendement" },
        { key: "B", text: "3.35% p.a. – coupon plus gain en capital au prorata, divisé par le prix d'achat" },
        { key: "C", text: "1.5% – le coupon moins la déduction de perte en capital" },
        { key: "D", text: "6.7% – coupon doublé à cause de l'achat à escompte" },
      ],
      feedback:
        "Rendement ≠ seulement coupon ! Qui achète sous la valeur nominale (cours < 100%) reçoit la valeur nominale à l'échéance – ce qui donne le gain en capital. Rendement approximatif = (coupon + gain en capital p.a.) / prix d'achat. CHF 25 + CHF 7.50 = CHF 32.50 / CHF 970 ≈ 3.35%.",
    },
    "2.2": {
      situation:
        "Madame Isler compare deux obligations avec un rating A identique : Obligation X (duration 2 ans, coupon 3.5%) et Obligation Y (duration 9 ans, coupon 2.0%). Elle anticipe une hausse des taux.",
      question: "Quelle obligation est moins sensible aux pertes de cours en cas de hausse des taux ?",
      options: [
        { key: "A", text: "Obligation Y – elle a le coupon plus bas et est donc moins chère" },
        { key: "B", text: "Les deux pareillement – la duration n'influence que les revenus d'intérêts, pas le cours" },
        { key: "C", text: "Obligation X – une duration faible (2 ans) signifie une faible sensibilité aux taux. Pour une hausse de +1%, l'obligation X perd environ 2%, l'obligation Y environ 9%" },
        { key: "D", text: "Obligation X, parce qu'un coupon plus élevé compense toujours le risque de cours" },
      ],
      feedback:
        "La duration mesure la sensibilité aux taux : pour une hausse des taux de +1%, le cours d'une obligation chute approximativement de la duration en pourcentage. Obligation X (duration 2) : environ -2% de perte de cours. Obligation Y (duration 9) : environ -9%. En cas d'anticipation de hausse des taux : préférer les obligations à court terme. Faible duration = faible risque de variation des taux.",
    },
    "2.3": {
      situation:
        "Monsieur Neuhaus détient un emprunt obligataire de Retail SA (actuellement BBB, Investment Grade). Un déclassement de rating à BB (Speculative Grade / Junk) est annoncé. Que se passe-t-il avec le cours ?",
      question: "Quel effet a le déclassement de BBB à BB sur le cours de l'emprunt ?",
      options: [
        { key: "A", text: "Le cours monte – les Junk Bonds paient des intérêts plus élevés, ce qui rend le placement plus attractif" },
        { key: "B", text: "Le cours reste stable – le rating n'est qu'une opinion externe sans pertinence pour le cours" },
        { key: "C", text: "Le cours chute nettement – les investisseurs institutionnels doivent détenir des emprunts Investment Grade et vendent de force ; le credit spread augmente, le prix de marché chute" },
        { key: "D", text: "Le cours chute légèrement – mais seulement si les taux augmentent en même temps" },
      ],
      feedback:
        "Déclassement BBB→BB = perte du statut Investment Grade. De nombreux investisseurs institutionnels (caisses de pension, assurances) n'autorisent que l'Investment Grade. Ils doivent vendre de force. Cette vague de ventes fait fortement chuter le cours. Le credit spread s'élargit – le marché exige une prime de risque plus élevée. Effet : perte de cours considérable pour les détenteurs comme Monsieur Neuhaus.",
    },
    "3.1": {
      situation:
        "Monsieur Müller a acheté il y a 2 ans une obligation de la Confédération à 10 ans au pair (100%) avec un coupon de 1%. Depuis lors, les taux du marché ont augmenté à 3%. Monsieur Müller envisage maintenant de vendre l'obligation.",
      question: "Qu'est-il arrivé au cours de l'obligation de Monsieur Müller ?",
      options: [
        { key: "A", text: "Le cours a monté – les obligations de la Confédération sont sûres et demandées" },
        { key: "B", text: "Le cours est inchangé – la solvabilité de l'émetteur n'a pas changé" },
        { key: "C", text: "Le cours a nettement chuté – quand les taux du marché augmentent, les cours des obligations baissent" },
        { key: "D", text: "Le cours monte, parce que des taux plus élevés créent plus de demande" },
      ],
      feedback:
        "Relation taux-cours : quand les taux du marché augmentent, les cours des obligations existantes chutent. Les nouvelles obligations offrent 3% – qui paierait encore 100% pour une obligation avec seulement 1% ? L'obligation de Monsieur Müller vaut considérablement moins de CHF 10'000. Avec 8 ans de durée résiduelle et une différence de taux de 2%, le cours pourrait être tombé à environ 85–87%.",
    },
    "3.2": {
      situation:
        "SoftFin SA émet une obligation convertible : valeur nominale CHF 1'000, coupon 1.5%, durée 5 ans. Droit de conversion : chaque obligation peut être convertie en 10 actions SoftFin SA (prix de conversion CHF 100). Cours actuel de l'action : CHF 80. Madame Gerber envisage d'investir.",
      question: "À partir de quel cours de l'action est-il intéressant de convertir l'obligation convertible en actions ?",
      options: [
        { key: "A", text: "Immédiatement – Madame Gerber doit convertir maintenant au cours CHF 80" },
        { key: "B", text: "À partir du cours de l'action CHF 100 – seulement alors la valeur de conversion (10 × CHF 100) est égale à la valeur nominale" },
        { key: "C", text: "Les obligations convertibles sont toujours converties automatiquement – l'investisseur n'a aucune influence" },
        { key: "D", text: "Seulement à partir de CHF 150 – prix de conversion plus renonciation au coupon sur 5 ans" },
      ],
      feedback:
        "Valeur de conversion = cours de l'action × ratio de conversion. À CHF 80 : 10 × CHF 80 = CHF 800 < CHF 1'000 (valeur nominale). La conversion n'est pas intéressante. À partir de CHF 100 : 10 × CHF 100 = CHF 1'000. Parité atteinte. Si l'action monte davantage (p.ex. CHF 130) : 10 × CHF 130 = CHF 1'300 > CHF 1'000. La conversion est alors avantageuse. Obligation convertible = combinaison : obligation (protection) + option d'achat (upside).",
    },
    "3.3": {
      situation:
        "L'environnement de marché actuel montre une courbe des taux inverse : les obligations d'État suisses à 2 ans rapportent 2.5%, les obligations à 10 ans seulement 1.8%. Monsieur Kaufmann veut placer CHF 100'000 en nouvelles obligations d'État suisses.",
      question: "Que signale une courbe des taux inverse et comment Monsieur Kaufmann devrait-il réagir ?",
      options: [
        { key: "A", text: "La courbe inverse est normale en Suisse – toujours investir dans des obligations à long terme pour un rendement maximal" },
        { key: "B", text: "Courbe inverse = les obligations à court terme rapportent plus que les obligations à long terme. Cela signale une anticipation de récession. Les obligations à court terme offrent aujourd'hui un meilleur rendement avec moins de risque de taux" },
        { key: "C", text: "La courbe inverse signifie inflation – donc passer immédiatement aux actions" },
        { key: "D", text: "Monsieur Kaufmann ne doit pas investir dans des obligations quand la courbe des taux est inverse" },
      ],
      feedback:
        "Courbe des taux normale : les obligations à long terme rapportent plus (en raison d'un risque plus long). Courbe inverse : les obligations à court terme rapportent plus. Signal : les acteurs du marché anticipent des taux plus bas à l'avenir. Pour Monsieur Kaufmann : les obligations à court terme (2 ans) offrent aujourd'hui 2.5% vs. 1.8% pour 10 ans – et avec beaucoup moins de risque de taux (duration ~2 vs. ~8). Choix clair dans cet environnement.",
    },
  },
  it: {
    "1.1": {
      situation:
        "Thomas Huber, 55 anni, conservativo, desidera investire CHF 50'000 in modo sicuro. Vede due obbligazioni: Obbligazione A (Confederazione svizzera, rating AAA, cedola 1.5%) e Obbligazione B (emittente mercato emergente, rating CCC, cedola 6.5%). Chiede: «Non dovrei prendere B – 6.5% sembra molto meglio?»",
      question: "Cosa spieghi a Thomas Huber?",
      options: [
        { key: "A", text: "L'obbligazione B è chiaramente la scelta migliore – una cedola del 6.5% dà CHF 3'250 di interessi all'anno invece di CHF 750. Per tale differenza di rendimento, il guadagno compensa il rischio teorico." },
        { key: "B", text: "Le agenzie di rating si sono completamente sbagliate durante la crisi finanziaria del 2008. Per investitori esperti come Thomas: la cedola e la durata decidono, non il rating di un'agenzia." },
        { key: "C", text: "Entrambe le obbligazioni sono garantite contrattualmente e pagano cedola e capitale. Il rating è una valutazione esterna senza valore giuridico vincolante e non influisce sugli obblighi contrattuali." },
        { key: "D", text: "AAA significa la migliore qualità creditizia e un rischio di insolvenza minimo. CCC è vicino all'insolvenza. La cedola più alta è il premio di rischio – per Thomas come investitore conservativo, l'obbligazione A è la scelta giusta." },
      ],
      feedback:
        "I rating mostrano l'affidabilità creditizia dell'emittente. AAA = qualità più alta, rischio di insolvenza minimo. CCC = rischio di insolvenza considerevole – in caso di deterioramento economico, l'insolvenza è probabile. La cedola più alta per CCC è il premio di rischio. Per Thomas (conservazione del capitale), l'obbligazione A è la sola scelta giustificabile.",
    },
    "1.2": {
      situation:
        "La giovane cliente Lara chiede: «Sento dire che le obbligazioni sono più sicure delle azioni. Ma cosa sono esattamente?»",
      question: "Quale descrizione descrive correttamente un'obbligazione?",
      options: [
        { key: "A", text: "Un'obbligazione è uno strumento di capitale proprio – come un'azione, ma con un rendimento più basso" },
        { key: "B", text: "Un'obbligazione è un prestito dell'investitore all'emittente: l'emittente paga regolarmente interessi (cedola) e rimborsa il debito alla fine (rimborso del valore nominale)" },
        { key: "C", text: "Le obbligazioni non possono essere negoziate in borsa – si detengono fino alla scadenza" },
        { key: "D", text: "Le obbligazioni garantiscono sempre un rendimento positivo, indipendentemente dall'emittente" },
      ],
      feedback:
        "Obbligazione = strumento di debito. L'investitore presta denaro all'emittente (Stato, azienda). L'emittente si impegna a: 1) pagare regolarmente la cedola (interessi). 2) rimborsare il valore nominale alla scadenza. Rischio: affidabilità creditizia dell'emittente – più bassa è l'affidabilità, maggiore è il rischio di insolvenza. Le obbligazioni possono essere negoziate in borsa.",
    },
    "1.3": {
      situation:
        "Jonas confronta: Obbligazione della Confederazione svizzera (cedola 1.0%, AAA) e obbligazione aziendale Swisscom SA (cedola 2.5%, rating A). Entrambe hanno una durata di 5 anni.",
      question: "Perché l'obbligazione Swisscom offre una cedola più alta dell'obbligazione della Confederazione?",
      options: [
        { key: "A", text: "Perché Swisscom è più grande della Svizzera e può pagare più interessi" },
        { key: "B", text: "La cedola più alta è il premio di rischio – Swisscom ha un rischio di insolvenza più alto della Confederazione. Più rischio = più interessi" },
        { key: "C", text: "Perché Swisscom non ha una garanzia statale e deve quindi pagare legalmente interessi più alti" },
        { key: "D", text: "Nessuna ragione – le cedole vengono fissate casualmente dall'emittente" },
      ],
      feedback:
        "La Confederazione svizzera è considerata l'emittente più sicuro al mondo (AAA). La probabilità di insolvenza è praticamente nulla. Swisscom è un'azienda: più dipendente dalla congiuntura economica, rischio di insolvenza più elevato. Per questo rischio aggiuntivo il mercato richiede un premio di rischio (credit spread) – qui 1.5% in più. Principio fondamentale: più rischio = più rendimento.",
    },
    "2.1": {
      situation:
        "La cliente Sandra Weber esamina un'obbligazione Migros Bank SA: valore nominale CHF 1'000, corso attuale 97%, cedola 2.5% p.a., durata residua 4 anni. Chiede: «Quanto mi rende davvero?»",
      question: "Qual è il rendimento approssimativo p.a. di questa obbligazione?",
      options: [
        { key: "A", text: "2.5% – questa è la cedola, quindi il rendimento" },
        { key: "B", text: "3.35% p.a. – cedola più guadagno in conto capitale proporzionale, diviso per il prezzo d'acquisto" },
        { key: "C", text: "1.5% – la cedola meno la deduzione di perdita in conto capitale" },
        { key: "D", text: "6.7% – cedola raddoppiata a causa dell'acquisto con sconto" },
      ],
      feedback:
        "Rendimento ≠ solo cedola! Chi acquista sotto il valore nominale (corso < 100%) riceve il valore nominale alla scadenza – questo genera il guadagno in conto capitale. Rendimento approssimativo = (cedola + guadagno in conto capitale p.a.) / prezzo d'acquisto. CHF 25 + CHF 7.50 = CHF 32.50 / CHF 970 ≈ 3.35%.",
    },
    "2.2": {
      situation:
        "La signora Isler confronta due obbligazioni con un rating A identico: Obbligazione X (duration 2 anni, cedola 3.5%) e Obbligazione Y (duration 9 anni, cedola 2.0%). Si aspetta un aumento dei tassi.",
      question: "Quale obbligazione è meno suscettibile a perdite di corso in caso di aumento dei tassi?",
      options: [
        { key: "A", text: "Obbligazione Y – ha la cedola più bassa ed è quindi meno costosa" },
        { key: "B", text: "Entrambe ugualmente – la duration influenza solo i proventi d'interesse, non il corso" },
        { key: "C", text: "Obbligazione X – una duration bassa (2 anni) significa una bassa sensibilità ai tassi. Per un aumento di +1%, l'obbligazione X perde circa il 2%, l'obbligazione Y circa il 9%" },
        { key: "D", text: "Obbligazione X, perché una cedola più alta compensa sempre il rischio di corso" },
      ],
      feedback:
        "La duration misura la sensibilità ai tassi: per un aumento dei tassi di +1%, il corso di un'obbligazione cade approssimativamente della duration in percentuale. Obbligazione X (duration 2): circa -2%. Obbligazione Y (duration 9): circa -9%. In caso di aspettativa di aumento dei tassi: preferire obbligazioni a breve termine. Duration bassa = basso rischio di variazione dei tassi.",
    },
    "2.3": {
      situation:
        "Il signor Neuhaus detiene un'obbligazione aziendale di Retail SA (attualmente BBB, Investment Grade). Viene annunciato un declassamento del rating a BB (Speculative Grade / Junk). Cosa succede al corso?",
      question: "Quale effetto ha il declassamento da BBB a BB sul corso dell'obbligazione?",
      options: [
        { key: "A", text: "Il corso sale – i Junk Bond pagano interessi più alti, il che rende l'investimento più attraente" },
        { key: "B", text: "Il corso rimane stabile – il rating è solo un'opinione esterna senza rilevanza per il corso" },
        { key: "C", text: "Il corso scende nettamente – gli investitori istituzionali devono detenere obbligazioni Investment Grade e vendono obbligatoriamente; il credit spread aumenta, il prezzo di mercato scende" },
        { key: "D", text: "Il corso scende leggermente – ma solo se allo stesso tempo aumentano anche i tassi" },
      ],
      feedback:
        "Declassamento BBB→BB = perdita dello status Investment Grade. Molti investitori istituzionali (casse pensioni, assicurazioni) consentono solo l'Investment Grade. Devono vendere obbligatoriamente. Questa ondata di vendite abbassa fortemente il corso. Il credit spread si allarga – il mercato richiede un premio di rischio più elevato. Effetto: perdita di corso considerevole per i detentori come il signor Neuhaus.",
    },
    "3.1": {
      situation:
        "Il signor Müller ha acquistato 2 anni fa un'obbligazione della Confederazione a 10 anni alla pari (100%) con una cedola dell'1%. Da allora i tassi di mercato sono saliti al 3%. Il signor Müller considera ora di vendere l'obbligazione.",
      question: "Cosa è successo al corso dell'obbligazione del signor Müller?",
      options: [
        { key: "A", text: "Il corso è salito – le obbligazioni della Confederazione sono sicure e ricercate" },
        { key: "B", text: "Il corso è invariato – l'affidabilità creditizia dell'emittente non è cambiata" },
        { key: "C", text: "Il corso è sceso nettamente – quando i tassi di mercato aumentano, i corsi delle obbligazioni scendono" },
        { key: "D", text: "Il corso sale, perché tassi più alti generano più domanda" },
      ],
      feedback:
        "Relazione tasso-corso: quando i tassi di mercato aumentano, i corsi delle obbligazioni esistenti scendono. Le nuove obbligazioni offrono il 3% – chi pagherebbe ancora il 100% per un'obbligazione con solo l'1%? L'obbligazione del signor Müller vale considerevolmente meno di CHF 10'000. Con 8 anni di durata residua e una differenza di tassi del 2%, il corso potrebbe essere sceso a circa 85–87%.",
    },
    "3.2": {
      situation:
        "SoftFin SA emette un'obbligazione convertibile: valore nominale CHF 1'000, cedola 1.5%, durata 5 anni. Diritto di conversione: ogni obbligazione può essere convertita in 10 azioni SoftFin SA (prezzo di conversione CHF 100). Corso attuale dell'azione: CHF 80. La signora Gerber considera di investire.",
      question: "A partire da quale corso dell'azione conviene convertire l'obbligazione convertibile in azioni?",
      options: [
        { key: "A", text: "Subito – la signora Gerber deve convertire ora al corso CHF 80" },
        { key: "B", text: "A partire dal corso dell'azione CHF 100 – solo allora il valore di conversione (10 × CHF 100) è uguale al valore nominale" },
        { key: "C", text: "Le obbligazioni convertibili vengono sempre convertite automaticamente – l'investitore non ha alcuna influenza" },
        { key: "D", text: "Solo a partire da CHF 150 – prezzo di conversione più rinuncia alla cedola su 5 anni" },
      ],
      feedback:
        "Valore di conversione = corso dell'azione × rapporto di conversione. A CHF 80: 10 × CHF 80 = CHF 800 < CHF 1'000 (valore nominale). La conversione non conviene. A partire da CHF 100: 10 × CHF 100 = CHF 1'000. Parità raggiunta. Se l'azione sale ulteriormente (es. CHF 130): 10 × CHF 130 = CHF 1'300 > CHF 1'000. Allora la conversione conviene. Obbligazione convertibile = combinazione: obbligazione (protezione) + opzione d'acquisto (upside).",
    },
    "3.3": {
      situation:
        "L'attuale contesto di mercato mostra una curva dei tassi inversa: i titoli di Stato svizzeri a 2 anni rendono il 2.5%, quelli a 10 anni solo l'1.8%. Il signor Kaufmann vuole investire CHF 100'000 in nuovi titoli di Stato svizzeri.",
      question: "Cosa segnala una curva dei tassi inversa e come dovrebbe reagire il signor Kaufmann?",
      options: [
        { key: "A", text: "La curva inversa è normale in Svizzera – investire sempre in obbligazioni a lungo termine per il rendimento massimo" },
        { key: "B", text: "Curva inversa = le obbligazioni a breve termine rendono più delle obbligazioni a lungo termine. Questo segnala un'aspettativa di recessione. Le obbligazioni a breve termine offrono oggi un rendimento migliore con meno rischio di tasso" },
        { key: "C", text: "La curva inversa significa inflazione – quindi passare subito alle azioni" },
        { key: "D", text: "Il signor Kaufmann non deve investire in obbligazioni quando la curva dei tassi è inversa" },
      ],
      feedback:
        "Curva dei tassi normale: le obbligazioni a lungo termine rendono di più (rischio più lungo). Curva inversa: le obbligazioni a breve termine rendono di più. Segnale: i partecipanti al mercato si aspettano tassi più bassi in futuro. Per il signor Kaufmann: le obbligazioni a breve termine (2 anni) offrono oggi il 2.5% vs. l'1.8% per 10 anni – e con molto meno rischio di tasso (duration ~2 vs. ~8). Scelta chiara in questo contesto.",
    },
  },
};
