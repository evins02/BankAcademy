import type { LangTranslations } from "./utils";

export const TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      title: "Comprendre le ratio cours/bénéfice (PER)",
      situation:
        "Le jeune client Luca Bernasconi, 24 ans, veut acheter des actions Tech AG. Cours : CHF 80, bénéfice par action (BPA) : CHF 4. Il demande : «Qu'est-ce que ce PER dont je lis partout ?»",
      question: "Quel est le PER et qu'indique-t-il ?",
      options: [
        { key: "A", text: "PER = 20. L'investisseur paie CHF 20 pour CHF 1 de bénéfice annuel – typique pour les valeurs de croissance" },
        { key: "B", text: "PER = 4 – cela correspond au bénéfice par action en francs" },
        { key: "C", text: "PER = 0,05 – calculé comme le bénéfice divisé par le cours" },
        { key: "D", text: "Le PER n'est pas significatif et peut être ignoré" },
      ],
      feedback:
        "PER (ratio cours/bénéfice) = cours / bénéfice par action = CHF 80 / CHF 4 = 20. Signification : tu paies CHF 20 pour CHF 1 de bénéfice annuel actuel. PER 20 est normal pour les actions technologiques – la croissance future est pricée. Les actions value ont souvent un PER de 8–12.",
    },
    "1.2": {
      title: "L'action comme participation au capital propre",
      situation:
        "Aziz, 22 ans, demande : «J'entends dire que les actionnaires sont copropriétaires d'une entreprise. Qu'est-ce que cela signifie exactement – quels droits ai-je en tant qu'actionnaire ?»",
      question: "Quels sont les droits d'un actionnaire en Suisse ?",
      options: [
        { key: "A", text: "Uniquement le droit au dividende – les actionnaires obtiennent une part du bénéfice, rien d'autre" },
        { key: "B", text: "Droit de vote en AG, droit au dividende, droit de souscription lors d'une augmentation de capital, droit à la part du produit de liquidation" },
        { key: "C", text: "Les actionnaires ont la garantie du remboursement du capital plus les intérêts comme pour une obligation" },
        { key: "D", text: "Droit de vote et dividende uniquement pour les actions avec une valeur de cours supérieure à CHF 1'000" },
      ],
      feedback:
        "En tant qu'actionnaire, tu es copropriétaire. Droits : 1) Droit de vote en Assemblée Générale (AG) – participer aux décisions sur le CA, la stratégie, le dividende. 2) Droit au dividende – part du bénéfice. 3) Droit de souscription – acheter de nouvelles actions en priorité lors d'une augmentation de capital. 4) Produit de liquidation – lors de la dissolution après règlement de toutes les dettes. Mais : aucune garantie de remboursement du capital !",
    },
    "1.3": {
      title: "Diversification — action individuelle vs. ETF",
      situation:
        "Sophie dispose de CHF 5'000 et hésite : tout investir dans une seule action ou dans un ETF sur le Swiss Market Index (SMI), qui comprend les 20 plus grandes entreprises suisses ?",
      question: "Quel est le principal avantage de l'ETF par rapport à l'action individuelle ?",
      options: [
        { key: "A", text: "Les ETF sont toujours moins chers en frais de transaction que les actions individuelles" },
        { key: "B", text: "Avec l'ETF, Sophie répartit le risque sur 20 entreprises – si l'une s'effondre, elle ne perd pas tout" },
        { key: "C", text: "Les ETF protègent entièrement contre les baisses de cours sur le marché global" },
        { key: "D", text: "Les actions individuelles rapportent toujours plus que les ETF sur le même marché" },
      ],
      feedback:
        "Diversification = répartition du risque. Avec un ETF sur 20 entreprises, la faillite d'une seule ne peut toucher que 5% du portefeuille. Avec une action individuelle, Sophie perd 100% de sa mise en cas de faillite totale. Le risque non systématique (spécifique à l'entreprise) peut être éliminé par la diversification ; le risque systématique de marché (ex. récession) ne peut pas l'être.",
    },
    "2.1": {
      title: "Calculer le rendement du dividende",
      situation:
        "Petra Koch détient 100 actions Nestlé. Cours actuel : CHF 95 par action. Nestlé verse un dividende annuel de CHF 2.85 par action.",
      question: "Quel est le rendement du dividende de la position Nestlé de Petra Koch ?",
      options: [
        { key: "A", text: "2,85 % – c'est le dividende par action en francs" },
        { key: "B", text: "0,3 % – dividende en pour mille du cours" },
        { key: "C", text: "5,7 % – dividende × 2 pour le calcul semestriel" },
        { key: "D", text: "3,0 % – dividende par action divisé par le cours" },
      ],
      feedback:
        "Rendement du dividende = dividende par action / cours de l'action × 100 = CHF 2.85 / CHF 95 = 3,0 %. Il indique le montant de distribution que tu obtiens par rapport au capital investi. Nestlé est connue pour ses dividendes stables et croissants – attrayant pour les investisseurs orientés revenus.",
    },
    "2.2": {
      title: "Comprendre le coefficient bêta",
      situation:
        "La cliente Miriam compare deux actions : Tech AG (bêta 1,8) et Pharma AG (bêta 0,6). Le marché global baisse de 10 %. Miriam demande ce que cela signifie pour ses positions.",
      question: "Combien perd chaque action si le marché baisse de 10 % ?",
      options: [
        { key: "A", text: "Les deux perdent 10 % – le bêta ne change rien à la perte" },
        { key: "B", text: "Tech AG env. −18 %, Pharma AG env. −6 % – le bêta mesure la sensibilité aux cours par rapport au marché" },
        { key: "C", text: "Tech AG −10 %, Pharma AG −10 % – un bêta supérieur à 1 signifie seulement une plus grande volatilité, pas des pertes plus importantes" },
        { key: "D", text: "Tech AG gagne +8 %, car bêta élevé = corrélation inverse au marché" },
      ],
      feedback:
        "Le bêta mesure la réaction d'une action aux mouvements du marché. Bêta 1,8 : Tech AG évolue 1,8× plus fort que le marché. Pour −10 % de marché : env. −18 %. Bêta 0,6 : Pharma AG évolue seulement 0,6× : pour −10 % de marché env. −6 %. Bêta > 1 = sensibilité supérieure à la moyenne (cyclique), bêta < 1 = défensif.",
    },
    "2.3": {
      title: "Plus-value latente vs. plus-value réalisée",
      situation:
        "Marco a acheté 50 actions Nestlé à CHF 80 (valeur d'achat CHF 4'000). Cours actuel : CHF 110 (valeur actuelle CHF 5'500). Il dit : «J'ai gagné CHF 1'500 !» Il envisage de vendre.",
      question: "Qu'est-ce qui est correct concernant le gain de Marco ?",
      options: [
        { key: "A", text: "Marco a réalisé CHF 1'500 – le gain est sûr tant qu'il détient les actions en dépôt" },
        { key: "B", text: "CHF 1'500 est une plus-value latente (non réalisée). Ce n'est un gain réalisé qu'après la vente – d'ici là, le cours peut baisser" },
        { key: "C", text: "Les plus-values latentes sont fiscalement traitées comme les gains réalisés" },
        { key: "D", text: "Marco devrait vendre immédiatement, car les gains en capital sur actions sont soumis à l'impôt sur le revenu en Suisse" },
      ],
      feedback:
        "Plus-value latente = gain non réalisé sur papier. Ce n'est qu'à la vente qu'il devient réel. D'ici là, le cours peut tomber à CHF 70 et transformer le gain en déception. En Suisse, les gains en capital privés sont exonérés d'impôt – mais seuls les gains réalisés sont effectivement versés. Plus-value latente ≠ argent en poche.",
    },
    "3.1": {
      title: "Action vs. obligation",
      situation:
        "Le couple Schmidt, tous deux 58 ans, retraite dans 7 ans. Capital disponible : CHF 200'000. Profil de risque : conservateur, perte maximale tolérée 10 %. Objectif : préservation du capital plus légère croissance. Ils demandent : «Faut-il encore acheter des actions maintenant ? Ou plutôt des obligations ?»",
      question: "Que recommandes-tu au couple Schmidt ?",
      options: [
        { key: "A", text: "100 % actions – 7 ans est suffisamment long pour le marché des actions" },
        { key: "B", text: "100 % obligations à court terme – correspond le mieux au profil conservateur" },
        { key: "C", text: "Mix env. 20–30 % actions / 70–80 % obligations – stratégie conservatrice avec une petite composante de croissance" },
        { key: "D", text: "50/50 actions/obligations – classiquement équilibré" },
      ],
      feedback:
        "Peu avant la retraite, la préservation du capital est prioritaire. 100 % actions est trop risqué : les actions peuvent baisser de 30–40 % à court terme, ce qui menace la retraite (risque de séquence des rendements). 100 % obligations ne protège pas contre l'inflation. Une petite part d'actions (20–30 %) apporte une légère croissance, tandis que les obligations stabilisent la base.",
    },
    "3.2": {
      title: "Actions cycliques vs. actions défensives",
      situation:
        "Perspectives économiques : les analystes prévoient une récession dans les 12 prochains mois. La cliente Mme Keller demande si elle doit adapter son portefeuille. Elle détient : 60 % actions technologiques (bêta 1,8), 20 % constructeurs automobiles (bêta 1,5), 20 % alimentation (bêta 0,5).",
      question: "Que recommandes-tu à Mme Keller face aux anticipations de récession ?",
      options: [
        { key: "A", text: "Maintenir le portefeuille – les prévisions sont incertaines, pas besoin d'agir" },
        { key: "B", text: "Tout en cash – les actions sont toujours mauvaises en récession" },
        { key: "C", text: "Augmenter les actions défensives : alimentation, santé, services publics (bêta faible) – réduire les positions cycliques (tech, auto)" },
        { key: "D", text: "Augmenter la pondération tech – les entreprises technologiques profitent des crises" },
      ],
      feedback:
        "Les actions cycliques (tech, auto, luxe) suivent fortement le cycle économique – en récession, elles chutent de manière disproportionnée. Les actions défensives (alimentation, pharma, services publics) – les gens mangent et prennent des médicaments même en crise. Préparation à la récession : augmenter les secteurs défensifs, réduire les cycliques. Le portefeuille de Mme Keller est particulièrement vulnérable avec 80 % de cycliques.",
    },
    "3.3": {
      title: "Augmentation de capital et droit de souscription",
      situation:
        "Swiss Tech AG procède à une augmentation de capital. Conditions : 1 droit de souscription par action existante. 5 droits de souscription donnent droit à l'achat d'1 nouvelle action (ratio 5:1). Prix d'émission nouvelle action : CHF 60. Cours actuel de l'action existante : CHF 85. Mme Meier détient 100 actions.",
      question: "Combien de nouvelles actions Mme Meier peut-elle souscrire au maximum ?",
      options: [
        { key: "A", text: "100 nouvelles actions – elle a 100 droits de souscription, un suffit pour une nouvelle action" },
        { key: "B", text: "20 nouvelles actions – 100 droits de souscription ÷ 5 = 20 nouvelles actions" },
        { key: "C", text: "5 nouvelles actions – le ratio de souscription est 1:5, pas 5:1" },
        { key: "D", text: "Elle ne peut pas souscrire de nouvelles actions – les droits de souscription sont réservés aux investisseurs institutionnels" },
      ],
      feedback:
        "Ratio 5:1 = 5 droits de souscription pour 1 nouvelle action. Mme Meier a 100 droits → 100 ÷ 5 = 20 nouvelles actions. Coût : 20 × CHF 60 = CHF 1'200. La décote (CHF 85 − CHF 60 = CHF 25 par action) n'est pas un vrai gain – après l'augmentation de capital, le cours baisse au cours théorique ex-droit. Les droits de souscription protègent les actionnaires existants contre la dilution.",
    },
  },
  it: {
    "1.1": {
      title: "Capire il rapporto prezzo/utile (P/E)",
      situation:
        "Il giovane cliente Luca Bernasconi, 24 anni, vuole comprare azioni Tech AG. Corso: CHF 80, utile per azione (EPS): CHF 4. Chiede: «Cosa significa questo P/E di cui leggo ovunque?»",
      question: "Quanto è il P/E e cosa indica?",
      options: [
        { key: "A", text: "P/E = 20. L'investitore paga CHF 20 per CHF 1 di utile annuo – tipico per i titoli di crescita" },
        { key: "B", text: "P/E = 4 – corrisponde all'utile per azione in franchi" },
        { key: "C", text: "P/E = 0,05 – calcolato come utile diviso per corso" },
        { key: "D", text: "Il P/E non è significativo e può essere ignorato" },
      ],
      feedback:
        "P/E (rapporto prezzo/utile) = corso / utile per azione = CHF 80 / CHF 4 = 20. Significato: paghi CHF 20 per CHF 1 di utile annuo attuale. P/E 20 è normale per le azioni tecnologiche – la crescita futura è già inclusa nel prezzo. Le azioni value hanno spesso P/E di 8–12.",
    },
    "1.2": {
      title: "L'azione come partecipazione al capitale proprio",
      situation:
        "Aziz, 22 anni, chiede: «Sento dire che gli azionisti sono comproprietari di un'impresa. Cosa significa esattamente – quali diritti ho come azionista?»",
      question: "Quali sono i diritti di un azionista in Svizzera?",
      options: [
        { key: "A", text: "Solo il diritto al dividendo – gli azionisti ottengono una quota dell'utile, nient'altro" },
        { key: "B", text: "Diritto di voto in AG, diritto al dividendo, diritto di opzione in caso di aumento di capitale, diritto alla quota del ricavato di liquidazione" },
        { key: "C", text: "Gli azionisti hanno la garanzia del rimborso del capitale più gli interessi come per un'obbligazione" },
        { key: "D", text: "Diritto di voto e dividendo solo per azioni con valore di corso superiore a CHF 1'000" },
      ],
      feedback:
        "Come azionista sei comproprietario. Diritti: 1) Diritto di voto in Assemblea Generale (AG) – partecipare alle decisioni su CDA, strategia, dividendo. 2) Diritto al dividendo – quota dell'utile. 3) Diritto di opzione – acquistare nuove azioni in priorità in caso di aumento di capitale. 4) Ricavato di liquidazione – in caso di scioglimento dopo il saldo di tutti i debiti. Ma: nessuna garanzia di rimborso del capitale!",
    },
    "1.3": {
      title: "Diversificazione — azione singola vs. ETF",
      situation:
        "Sophie ha CHF 5'000 e si chiede: investire tutto in un'unica azione o in un ETF sullo Swiss Market Index (SMI), che comprende le 20 maggiori imprese svizzere?",
      question: "Qual è il principale vantaggio dell'ETF rispetto all'azione singola?",
      options: [
        { key: "A", text: "Gli ETF hanno sempre costi di transazione inferiori rispetto alle azioni singole" },
        { key: "B", text: "Con l'ETF Sophie distribuisce il rischio su 20 imprese – se una crolla, non perde tutto" },
        { key: "C", text: "Gli ETF proteggono completamente dalle perdite di corso sul mercato globale" },
        { key: "D", text: "Le azioni singole rendono sempre di più degli ETF sullo stesso mercato" },
      ],
      feedback:
        "Diversificazione = ripartizione del rischio. Con un ETF su 20 imprese, il fallimento di una singola può colpire solo il 5% del portafoglio. Con un'azione singola Sophie perde il 100% dell'investimento in caso di fallimento totale. Il rischio non sistematico (specifico dell'impresa) può essere eliminato dalla diversificazione; il rischio sistematico di mercato (es. recessione) no.",
    },
    "2.1": {
      title: "Calcolare il rendimento da dividendo",
      situation:
        "Petra Koch detiene 100 azioni Nestlé. Corso attuale: CHF 95 per azione. Nestlé paga un dividendo annuo di CHF 2.85 per azione.",
      question: "Quanto è il rendimento da dividendo della posizione Nestlé di Petra Koch?",
      options: [
        { key: "A", text: "2,85% – questo è il dividendo per azione in franchi" },
        { key: "B", text: "0,3% – dividendo in per mille del corso" },
        { key: "C", text: "5,7% – dividendo × 2 per il calcolo semestrale" },
        { key: "D", text: "3,0% – dividendo per azione diviso per il corso" },
      ],
      feedback:
        "Rendimento da dividendo = dividendo per azione / corso dell'azione × 100 = CHF 2.85 / CHF 95 = 3,0%. Indica quanto incasso ricevi in rapporto al capitale investito. Nestlé è nota per dividendi stabili e crescenti – attraente per gli investitori orientati al reddito.",
    },
    "2.2": {
      title: "Capire il coefficiente beta",
      situation:
        "La cliente Miriam confronta due azioni: Tech AG (beta 1,8) e Pharma AG (beta 0,6). Il mercato globale scende del 10%. Miriam chiede cosa significa per le sue posizioni.",
      question: "Quanto perde ogni azione se il mercato scende del 10%?",
      options: [
        { key: "A", text: "Entrambe perdono il 10% – il beta non cambia nulla alla perdita" },
        { key: "B", text: "Tech AG circa −18%, Pharma AG circa −6% – il beta misura la sensibilità al corso rispetto al mercato" },
        { key: "C", text: "Tech AG −10%, Pharma AG −10% – beta superiore a 1 significa solo maggiore volatilità, non perdite maggiori" },
        { key: "D", text: "Tech AG guadagna +8%, perché beta elevato = correlazione inversa al mercato" },
      ],
      feedback:
        "Il beta misura quanto un'azione reagisce ai movimenti di mercato. Beta 1,8: Tech AG si muove 1,8× tanto quanto il mercato. Per −10% di mercato: circa −18%. Beta 0,6: Pharma AG si muove solo 0,6×: per −10% di mercato circa −6%. Beta > 1 = sensibilità superiore alla media (ciclico), beta < 1 = difensivo.",
    },
    "2.3": {
      title: "Plusvalenza latente vs. plusvalenza realizzata",
      situation:
        "Marco ha acquistato 50 azioni Nestlé a CHF 80 (valore d'acquisto CHF 4'000). Corso attuale: CHF 110 (valore attuale CHF 5'500). Dice: «Ho guadagnato CHF 1'500!» Sta considerando di vendere.",
      question: "Cosa è corretto riguardo al guadagno di Marco?",
      options: [
        { key: "A", text: "Marco ha realizzato CHF 1'500 – il guadagno è sicuro finché detiene le azioni in deposito" },
        { key: "B", text: "CHF 1'500 è una plusvalenza latente (non realizzata). Diventa un guadagno realizzato solo dopo la vendita – fino ad allora il corso può scendere" },
        { key: "C", text: "Le plusvalenze latenti sono trattate fiscalmente come i guadagni realizzati" },
        { key: "D", text: "Marco dovrebbe vendere immediatamente, perché i guadagni in conto capitale su azioni in Svizzera sono soggetti all'imposta sul reddito" },
      ],
      feedback:
        "Plusvalenza latente = guadagno non realizzato sulla carta. Solo alla vendita diventa reale. Nel frattempo il corso può scendere a CHF 70 e trasformare il guadagno in delusione. In Svizzera i guadagni in conto capitale privati sono esenti da imposta – ma solo i guadagni realizzati vengono effettivamente incassati. Plusvalenza latente ≠ soldi in tasca.",
    },
    "3.1": {
      title: "Azione vs. obbligazione",
      situation:
        "La coppia Schmidt, entrambi 58 anni, pensione tra 7 anni. Patrimonio disponibile: CHF 200'000. Profilo di rischio: conservativo, perdita massima tollerata 10%. Obiettivo: conservazione del capitale più leggera crescita. Chiedono: «Dobbiamo ancora comprare azioni ora? O meglio obbligazioni?»",
      question: "Cosa raccomandi alla coppia Schmidt?",
      options: [
        { key: "A", text: "100% azioni – 7 anni è sufficientemente lungo per il mercato azionario" },
        { key: "B", text: "100% obbligazioni a breve termine – si adatta meglio al profilo conservativo" },
        { key: "C", text: "Mix circa 20–30% azioni / 70–80% obbligazioni – strategia conservativa con una piccola componente di crescita" },
        { key: "D", text: "50/50 azioni/obbligazioni – classicamente bilanciato" },
      ],
      feedback:
        "Poco prima della pensione, la conservazione del capitale è prioritaria. 100% azioni è troppo rischioso: le azioni possono scendere del 30–40% a breve termine, mettendo a rischio la pensione (rischio di sequenza dei rendimenti). 100% obbligazioni non protegge dall'inflazione. Una piccola quota azionaria (20–30%) porta leggera crescita, mentre le obbligazioni stabilizzano la base.",
    },
    "3.2": {
      title: "Azioni cicliche vs. azioni difensive",
      situation:
        "Prospettive economiche: gli analisti prevedono una recessione nei prossimi 12 mesi. La cliente Sig.ra Keller chiede se deve adattare il suo portafoglio. Detiene: 60% azioni tecnologiche (beta 1,8), 20% costruttori automobilistici (beta 1,5), 20% alimentari (beta 0,5).",
      question: "Cosa raccomandi alla Sig.ra Keller in previsione di recessione?",
      options: [
        { key: "A", text: "Mantenere il portafoglio – le previsioni sono incerte, nessuna necessità di agire" },
        { key: "B", text: "Tutto in contanti – le azioni vanno sempre male in recessione" },
        { key: "C", text: "Aumentare le azioni difensive: alimentari, sanità, utilities (beta basso) – ridurre le posizioni cicliche (tech, auto)" },
        { key: "D", text: "Aumentare la ponderazione tech – le imprese tecnologiche beneficiano delle crisi" },
      ],
      feedback:
        "Le azioni cicliche (tech, auto, lusso) seguono fortemente il ciclo economico – in recessione scendono in modo sproporzionato. Le azioni difensive (alimentari, pharma, utilities) – le persone mangiano e prendono medicine anche nelle crisi. Preparazione alla recessione: aumentare i settori difensivi, ridurre i ciclici. Il portafoglio della Sig.ra Keller è particolarmente vulnerabile con l'80% di ciclici.",
    },
    "3.3": {
      title: "Aumento di capitale e diritto di opzione",
      situation:
        "Swiss Tech AG effettua un aumento di capitale. Condizioni: 1 diritto di opzione per azione esistente. 5 diritti di opzione danno diritto all'acquisto di 1 nuova azione (rapporto 5:1). Prezzo di emissione nuova azione: CHF 60. Corso attuale dell'azione esistente: CHF 85. La Sig.ra Meier detiene 100 azioni.",
      question: "Quante nuove azioni può sottoscrivere al massimo la Sig.ra Meier?",
      options: [
        { key: "A", text: "100 nuove azioni – ha 100 diritti di opzione, uno basta per una nuova azione" },
        { key: "B", text: "20 nuove azioni – 100 diritti di opzione ÷ 5 = 20 nuove azioni" },
        { key: "C", text: "5 nuove azioni – il rapporto di sottoscrizione è 1:5, non 5:1" },
        { key: "D", text: "Non può sottoscrivere nuove azioni – i diritti di opzione sono riservati agli investitori istituzionali" },
      ],
      feedback:
        "Rapporto 5:1 = 5 diritti di opzione per 1 nuova azione. La Sig.ra Meier ha 100 diritti → 100 ÷ 5 = 20 nuove azioni. Costo: 20 × CHF 60 = CHF 1'200. Lo sconto (CHF 85 − CHF 60 = CHF 25 per azione) non è un vero guadagno – dopo l'aumento di capitale il corso scende al corso teorico ex-diritto. I diritti di opzione proteggono gli azionisti esistenti dalla diluizione.",
    },
  },
};
