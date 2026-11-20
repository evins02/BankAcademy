import type { LangTranslations } from "./utils";

export const AKTIEN_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.2": {
      situation:
        "Aziz, 22 ans, demande : «J'entends dire que les actionnaires sont copropriétaires d'une entreprise. Qu'est-ce que cela signifie exactement – quels droits ai-je comme actionnaire ?»",
      question: "Quels droits appartiennent à un actionnaire en Suisse ?",
      options: [
        {
          key: "A",
          text: "Seulement le droit au dividende – les actionnaires obtiennent une part du bénéfice, rien d'autre",
        },
        {
          key: "B",
          text: "Droit de vote à l'AG, droit au dividende, droit de souscription lors d'augmentations de capital, droit à une part du produit de liquidation",
        },
        {
          key: "C",
          text: "Les actionnaires ont la garantie de récupérer leur capital plus les intérêts comme pour une obligation",
        },
        {
          key: "D",
          text: "Droit de vote et dividende uniquement pour les actions d'une valeur boursière de plus de CHF 1'000",
        },
      ],
      feedback:
        "En tant qu'actionnaire, vous êtes copropriétaire. Droits : 1) Droit de vote à l'assemblée générale (AG). 2) Droit au dividende – part du bénéfice. 3) Droit de souscription – lors d'une augmentation de capital, acheter des nouvelles actions en priorité. 4) Produit de liquidation – lors de la dissolution après règlement de toutes les dettes. Mais : aucune garantie de remboursement du capital !",
      merksatz:
        "Actionnaire = copropriétaire. Il participe aux chances et aux risques de l'entreprise.",
    },
    "1.3": {
      situation:
        "Sophie a CHF 5'000 et réfléchit : tout investir dans une seule action ou dans un ETF sur le Swiss Market Index (SMI), qui comprend les 20 plus grandes entreprises suisses ?",
      question:
        "Quel est l'avantage principal de l'ETF par rapport à l'action individuelle ?",
      options: [
        {
          key: "A",
          text: "Les ETFs sont toujours moins chers en frais de transaction que les actions individuelles",
        },
        {
          key: "B",
          text: "Avec l'ETF, Sophie répartit le risque sur 20 entreprises – si l'une s'effondre, elle ne perd pas tout",
        },
        {
          key: "C",
          text: "Les ETFs protègent complètement contre les pertes de cours sur l'ensemble du marché",
        },
        {
          key: "D",
          text: "Les actions individuelles rapportent toujours de meilleurs rendements que les ETFs sur le même marché",
        },
      ],
      feedback:
        "Diversification = répartition des risques. Avec un ETF sur 20 entreprises, la faillite d'une seule entreprise ne peut toucher que 5 % du portefeuille. Avec une action individuelle, Sophie perd 100 % de sa mise en cas de défaut total. Le risque non systématique (spécifique à l'entreprise) peut être éliminé par la diversification ; le risque systématique de marché (p.ex. récession) ne peut pas l'être.",
      merksatz:
        "Ne pas mettre tous ses œufs dans le même panier. ETF = diversification la plus simple.",
    },
    "1.1": {
      situation:
        "Jeune client Luca Bernasconi, 24 ans, veut acheter des actions de Tech AG. Cours de l'action : CHF 80, bénéfice par action (BPA) : CHF 4. Il demande : «C'est quoi ce PER que je lis partout ?»",
      question: "Quel est le PER et qu'est-ce qu'il indique ?",
      options: [
        {
          key: "A",
          text: "PER = 20. Les investisseurs paient CHF 20 pour CHF 1 de bénéfice annuel – typique pour les valeurs de croissance",
        },
        { key: "B", text: "PER = 4 – c'est le bénéfice par action en francs" },
        { key: "C", text: "PER = 0.05 – calculé comme le bénéfice divisé par le cours" },
        { key: "D", text: "Le PER n'est pas pertinent et peut être ignoré" },
      ],
      feedback:
        "PER (Price Earnings Ratio) = Cours / Bénéfice par action = CHF 80 / CHF 4 = 20. Signification : vous payez CHF 20 pour CHF 1 de bénéfice annuel actuel. PER 20 est normal pour les actions technologiques – la croissance future est prise en compte dans le prix. Les actions value ont souvent un PER de 8–12.",
      merksatz:
        "PER = Cours ÷ Bénéfice par action. Plus c'est bas, plus c'est bon marché par rapport au bénéfice actuel.",
    },
    "2.2": {
      situation:
        "La cliente Miriam compare deux actions : Tech AG (Bêta 1.8) et Pharma AG (Bêta 0.6). Le marché global baisse de 10 %. Miriam demande ce que cela signifie pour ses positions.",
      question:
        "De combien perd chaque action environ si le marché baisse de 10 % ?",
      options: [
        {
          key: "A",
          text: "Toutes les deux perdent 10 % – le bêta ne change rien à la perte",
        },
        {
          key: "B",
          text: "Tech AG environ −18 %, Pharma AG environ −6 % – le bêta mesure la sensibilité du cours par rapport au marché",
        },
        {
          key: "C",
          text: "Tech AG −10 %, Pharma AG −10 % – un bêta supérieur à 1 signifie seulement une volatilité plus élevée, pas de plus grandes pertes",
        },
        {
          key: "D",
          text: "Tech AG gagne +8 %, car bêta élevé = corrélation inverse avec le marché",
        },
      ],
      feedback:
        "Le bêta mesure à quel point une action réagit aux mouvements du marché. Bêta 1.8 : Tech AG se déplace 1.8 fois plus fort que le marché. Pour −10 % marché : environ −18 %. Bêta 0.6 : Pharma AG se déplace seulement 0.6 fois : pour −10 % marché environ −6 %. Bêta > 1 = sensibilité supérieure à la moyenne (cyclique), Bêta < 1 = défensif.",
      merksatz:
        "Bêta > 1 = amplifie le marché. Bêta < 1 = amortit le marché. Bêta = risque de marché d'une action.",
    },
    "2.3": {
      situation:
        "Marco a acheté 50 actions Nestlé à CHF 80 (valeur d'achat CHF 4'000). Cours actuel : CHF 110 (valeur actuelle CHF 5'500). Il dit : «J'ai gagné CHF 1'500 !» Il envisage de vendre.",
      question: "Qu'est-ce qui est correct concernant le gain de Marco ?",
      options: [
        {
          key: "A",
          text: "Marco a réalisé CHF 1'500 – le gain est sûr tant qu'il détient les actions en dépôt",
        },
        {
          key: "B",
          text: "CHF 1'500 est un gain sur le papier (non réalisé). Ce n'est un gain réalisé qu'après la vente – jusqu'alors le cours peut baisser",
        },
        {
          key: "C",
          text: "Les gains sur le papier sont à traiter fiscalement comme les gains réalisés",
        },
        {
          key: "D",
          text: "Marco devrait vendre immédiatement, car les gains sur actions en Suisse sont soumis à l'impôt sur le revenu",
        },
      ],
      feedback:
        "Gain sur le papier = gain non réalisé sur papier. Ce n'est qu'à la vente qu'il devient réel. D'ici là, le cours peut tomber à CHF 70 et le gain se transformer en déception. En Suisse, les gains en capital privés sont exonérés d'impôt – mais seuls les gains réalisés sont effectivement versés. Gain sur le papier ≠ argent en poche.",
      merksatz:
        "Gain sur le papier = non réalisé = sur papier. Réalisé = après vente = effectivement sûr.",
    },
    "2.1": {
      situation:
        "Petra Koch détient 100 actions Nestlé. Cours actuel : CHF 95 par action. Nestlé verse un dividende annuel de CHF 2.85 par action.",
      question:
        "Quel est le rendement du dividende de la position Nestlé de Petra Koch ?",
      options: [
        { key: "A", text: "2.85 % – c'est le dividende par action en francs" },
        { key: "B", text: "0.3 % – dividende en pour-mille du cours" },
        { key: "C", text: "5.7 % – dividende × 2 pour le calcul semestriel" },
        { key: "D", text: "3.0 % – dividende par action divisé par le cours" },
      ],
      feedback:
        "Rendement du dividende = Dividende par action / Cours × 100 = CHF 2.85 / CHF 95 = 3.0 %. Il montre combien de distribution vous obtenez par rapport au capital investi. Nestlé est connue pour des dividendes stables et croissants – attrayant pour les investisseurs orientés vers les revenus.",
      merksatz:
        "Rendement du dividende = Dividende ÷ Cours × 100. Si le cours monte → le rendement baisse.",
    },
    "3.2": {
      situation:
        "Perspectives économiques : les analystes prévoient une récession dans les 12 prochains mois. La cliente Mme Keller demande si elle doit adapter son portefeuille. Elle détient : 60 % actions technologiques (Bêta 1.8), 20 % constructeurs automobiles (Bêta 1.5), 20 % alimentation (Bêta 0.5).",
      question:
        "Que recommandez-vous à Mme Keller face aux anticipations de récession ?",
      options: [
        {
          key: "A",
          text: "Maintenir le portefeuille – les prévisions sont incertaines, pas besoin d'agir",
        },
        {
          key: "B",
          text: "Tout en cash – les actions sont toujours mauvaises en récession",
        },
        {
          key: "C",
          text: "Augmenter les actions défensives : alimentation, santé, services publics (faible bêta) – réduire les positions cycliques (tech, auto)",
        },
        {
          key: "D",
          text: "Augmenter la pondération tech – les entreprises technologiques sont les gagnantes des crises",
        },
      ],
      feedback:
        "Les actions cycliques (tech, auto, luxe) suivent fortement le cycle économique – en récession elles chutent de manière disproportionnée. Les actions défensives (alimentation, pharma, services publics) – les gens mangent et prennent des médicaments même en crise. Préparation à la récession : augmenter les secteurs défensifs, réduire les cycliques. Le portefeuille de Mme Keller avec 80 % cyclique est particulièrement vulnérable.",
      merksatz:
        "Cyclique = suit la conjoncture. Défensif = stable en crise. Récession ? → plus défensif.",
    },
    "3.3": {
      situation:
        "Swiss Tech AG procède à une augmentation de capital. Conditions : 1 droit de souscription par action existante. 5 droits donnent droit à l'achat d'une nouvelle action (ratio 5:1). Prix d'émission : CHF 60. Cours actuel : CHF 85. Mme Meier détient 100 actions.",
      question:
        "Combien de nouvelles actions Mme Meier peut-elle souscrire au maximum ?",
      options: [
        {
          key: "A",
          text: "100 nouvelles actions – elle a 100 droits de souscription, un seul suffit pour une nouvelle action",
        },
        {
          key: "B",
          text: "20 nouvelles actions – 100 droits de souscription ÷ 5 = 20 nouvelles actions",
        },
        {
          key: "C",
          text: "5 nouvelles actions – le ratio de souscription est de 1:5, pas de 5:1",
        },
        {
          key: "D",
          text: "Elle ne peut pas souscrire de nouvelles actions – les droits de souscription sont réservés aux investisseurs institutionnels",
        },
      ],
      feedback:
        "Ratio de souscription 5:1 = 5 droits pour 1 nouvelle action. Mme Meier a 100 droits → 100 ÷ 5 = 20 nouvelles actions. Coûts : 20 × CHF 60 = CHF 1'200. La décote (CHF 85 − CHF 60 = CHF 25 par action) n'est pas un vrai gain – après l'augmentation, le cours baisse au cours théorique ex-droit. Les droits protègent les actionnaires existants contre la dilution.",
      merksatz:
        "Exercer ou vendre les droits de souscription – les laisser expirer coûte de l'argent.",
    },
    "3.1": {
      situation:
        "Couple Schmidt, tous deux 58 ans, retraite dans 7 ans. Capital disponible : CHF 200'000. Profil de risque : conservateur, tolérance maximale aux pertes 10 %. Objectif : préservation du capital plus légère croissance. Ils demandent : «Devrions-nous encore acheter des actions ? Ou plutôt des obligations ?»",
      question: "Que recommandez-vous au couple Schmidt ?",
      options: [
        {
          key: "A",
          text: "100 % actions – 7 ans c'est suffisamment long pour le marché actions",
        },
        {
          key: "B",
          text: "100 % obligations à court terme – correspond au mieux au profil conservateur",
        },
        {
          key: "C",
          text: "Mix environ 20–30 % actions / 70–80 % obligations – stratégie conservative avec une petite composante de croissance",
        },
        { key: "D", text: "50/50 actions/obligations – classiquement équilibré" },
      ],
      feedback:
        "Peu avant la retraite, la préservation du capital est prioritaire. 100 % actions est trop risqué : les actions peuvent chuter de 30–40 % à court terme, ce qui met la retraite en danger. 100 % obligations ne protège pas contre l'inflation. Une petite quote-part d'actions (20–30 %) apporte une légère croissance, tandis que les obligations stabilisent la base.",
      merksatz:
        "Plus la retraite approche, plus on est conservateur. La préservation du capital prime sur l'optimisation du rendement.",
    },
  },
  it: {
    "1.2": {
      situation:
        "Aziz, 22 anni, chiede: «Sento dire che gli azionisti sono comproprietari di un'azienda. Cosa significa esattamente – quali diritti ho come azionista?»",
      question: "Cosa appartiene ai diritti di un azionista in Svizzera?",
      options: [
        {
          key: "A",
          text: "Solo il diritto al dividendo – gli azionisti ottengono una parte dell'utile, nient'altro",
        },
        {
          key: "B",
          text: "Diritto di voto all'AG, diritto al dividendo, diritto di opzione in caso di aumento di capitale, diritto a una quota del ricavato di liquidazione",
        },
        {
          key: "C",
          text: "Gli azionisti hanno la garanzia di recuperare il capitale più gli interessi come per un'obbligazione",
        },
        {
          key: "D",
          text: "Diritto di voto e dividendo solo per azioni con valore di borsa superiore a CHF 1'000",
        },
      ],
      feedback:
        "Come azionista sei comproprietario. Diritti: 1) Diritto di voto all'assemblea generale (AG). 2) Diritto al dividendo – quota dell'utile. 3) Diritto di opzione – in caso di aumento di capitale, acquistare nuove azioni in via preferenziale. 4) Ricavato di liquidazione – in caso di scioglimento dopo saldo di tutti i debiti. Ma: nessuna garanzia di rimborso del capitale!",
      merksatz:
        "Azionista = comproprietario. Ne condivide le opportunità e i rischi aziendali.",
    },
    "1.3": {
      situation:
        "Sophie ha CHF 5'000 e si chiede: investire tutto in una sola azione oppure in un ETF sullo Swiss Market Index (SMI), che comprende le 20 maggiori aziende svizzere?",
      question:
        "Qual è il principale vantaggio dell'ETF rispetto all'azione singola?",
      options: [
        {
          key: "A",
          text: "Gli ETF sono sempre più economici in termini di costi di transazione rispetto alle azioni singole",
        },
        {
          key: "B",
          text: "Con l'ETF Sophie distribuisce il rischio su 20 aziende – se una crolla, non perde tutto",
        },
        {
          key: "C",
          text: "Gli ETF proteggono completamente dalle perdite di corso sull'intero mercato",
        },
        {
          key: "D",
          text: "Le azioni singole portano sempre rendimenti più alti degli ETF sullo stesso mercato",
        },
      ],
      feedback:
        "Diversificazione = ripartizione del rischio. Con un ETF su 20 aziende, il fallimento di una singola azienda può colpire solo il 5 % del portafoglio. Con un'azione singola Sophie perde il 100 % dell'investimento in caso di default totale. Il rischio non sistematico (specifico dell'azienda) può essere eliminato con la diversificazione; il rischio sistematico di mercato (p.es. recessione) non può esserlo.",
      merksatz:
        "Non mettere tutte le uova nello stesso cestino. ETF = diversificazione più semplice.",
    },
    "1.1": {
      situation:
        "Giovane cliente Luca Bernasconi, 24 anni, vuole acquistare azioni di Tech AG. Corso dell'azione: CHF 80, utile per azione (EPS): CHF 4. Chiede: «Cos'è questo P/E che leggo dappertutto?»",
      question: "Qual è il P/E e cosa indica?",
      options: [
        {
          key: "A",
          text: "P/E = 20. Gli investitori pagano CHF 20 per CHF 1 di utile annuo – tipico per i valori di crescita",
        },
        { key: "B", text: "P/E = 4 – corrisponde all'utile per azione in franchi" },
        {
          key: "C",
          text: "P/E = 0.05 – calcolato come utile diviso per corso",
        },
        { key: "D", text: "Il P/E non è significativo e può essere ignorato" },
      ],
      feedback:
        "P/E (Price Earnings Ratio) = Corso / Utile per azione = CHF 80 / CHF 4 = 20. Significato: paghi CHF 20 per CHF 1 di utile annuo attuale. P/E 20 è normale per le azioni tecnologiche – la crescita futura è già inclusa nel prezzo. Le azioni value hanno spesso un P/E di 8–12.",
      merksatz:
        "P/E = Corso ÷ Utile per azione. Più è basso, più è economico rispetto all'utile attuale.",
    },
    "2.2": {
      situation:
        "La cliente Miriam confronta due azioni: Tech AG (Beta 1.8) e Pharma AG (Beta 0.6). Il mercato complessivo scende del 10 %. Miriam chiede cosa questo significa per le sue posizioni.",
      question:
        "Di quanto perde ogni azione approssimativamente se il mercato scende del 10 %?",
      options: [
        {
          key: "A",
          text: "Entrambe perdono il 10 % – il Beta non cambia nulla sulla perdita",
        },
        {
          key: "B",
          text: "Tech AG circa −18 %, Pharma AG circa −6 % – il Beta misura la sensibilità del corso rispetto al mercato",
        },
        {
          key: "C",
          text: "Tech AG −10 %, Pharma AG −10 % – Beta superiore a 1 significa solo maggiore volatilità, non perdite maggiori",
        },
        {
          key: "D",
          text: "Tech AG guadagna +8 %, perché Beta elevato = correlazione inversa con il mercato",
        },
      ],
      feedback:
        "Il Beta misura quanto fortemente un'azione reagisce ai movimenti del mercato. Beta 1.8: Tech AG si muove 1.8 volte più fortemente del mercato. Per −10 % mercato: circa −18 %. Beta 0.6: Pharma AG si muove solo 0.6 volte: per −10 % mercato circa −6 %. Beta > 1 = sovrasensibile (ciclico), Beta < 1 = difensivo.",
      merksatz:
        "Beta > 1 = amplifica il mercato. Beta < 1 = attenua il mercato. Beta = rischio di mercato di un'azione.",
    },
    "2.3": {
      situation:
        "Marco ha acquistato 50 azioni Nestlé a CHF 80 (valore d'acquisto CHF 4'000). Corso attuale: CHF 110 (valore attuale CHF 5'500). Dice: «Ho guadagnato CHF 1'500!» Sta pensando di vendere.",
      question: "Cosa è corretto riguardo al guadagno di Marco?",
      options: [
        {
          key: "A",
          text: "Marco ha realizzato CHF 1'500 – il guadagno è certo finché detiene le azioni in deposito",
        },
        {
          key: "B",
          text: "CHF 1'500 è un guadagno latente (non realizzato). Solo dopo la vendita diventa un guadagno realizzato – fino ad allora il corso può scendere",
        },
        {
          key: "C",
          text: "I guadagni latenti sono da trattare fiscalmente come i guadagni realizzati",
        },
        {
          key: "D",
          text: "Marco dovrebbe vendere subito, perché i guadagni azionari in Svizzera sono soggetti all'imposta sul reddito",
        },
      ],
      feedback:
        "Guadagno latente = guadagno non realizzato sulla carta. Solo alla vendita diventa reale. Nel frattempo il corso può scendere a CHF 70 e il guadagno trasformarsi in delusione. In Svizzera i guadagni in conto capitale privati sono esenti da imposta – ma solo i guadagni realizzati vengono effettivamente versati. Guadagno latente ≠ denaro in tasca.",
      merksatz:
        "Guadagno latente = non realizzato = sulla carta. Realizzato = dopo la vendita = effettivamente certo.",
    },
    "2.1": {
      situation:
        "Petra Koch detiene 100 azioni Nestlé. Corso attuale: CHF 95 per azione. Nestlé paga un dividendo annuo di CHF 2.85 per azione.",
      question:
        "Qual è il rendimento del dividendo della posizione Nestlé di Petra Koch?",
      options: [
        { key: "A", text: "2.85 % – è il dividendo per azione in franchi" },
        { key: "B", text: "0.3 % – dividendo in per mille del corso" },
        { key: "C", text: "5.7 % – dividendo × 2 per il calcolo semestrale" },
        { key: "D", text: "3.0 % – dividendo per azione diviso per il corso" },
      ],
      feedback:
        "Rendimento del dividendo = Dividendo per azione / Corso × 100 = CHF 2.85 / CHF 95 = 3.0 %. Mostra quanto incasso ottieni in rapporto al capitale investito. Nestlé è nota per dividendi stabili e crescenti – attraente per gli investitori orientati al reddito.",
      merksatz:
        "Rendimento del dividendo = Dividendo ÷ Corso × 100. Se il corso sale → il rendimento scende.",
    },
    "3.2": {
      situation:
        "Prospettive economiche: gli analisti prevedono una recessione nei prossimi 12 mesi. La cliente sig.ra Keller chiede se dovrebbe adattare il suo portafoglio. Detiene: 60 % azioni tecnologiche (Beta 1.8), 20 % costruttori di automobili (Beta 1.5), 20 % alimentare (Beta 0.5).",
      question:
        "Cosa consigli alla sig.ra Keller in vista delle aspettative di recessione?",
      options: [
        {
          key: "A",
          text: "Mantenere il portafoglio – le previsioni sono incerte, nessuna necessità di agire",
        },
        {
          key: "B",
          text: "Tutto in contanti – le azioni sono sempre negative nelle recessioni",
        },
        {
          key: "C",
          text: "Aumentare le azioni difensive: alimentare, sanità, utility (basso Beta) – ridurre le posizioni cicliche (tech, auto)",
        },
        {
          key: "D",
          text: "Aumentare la ponderazione tech – le aziende tecnologiche sono le vincitrici delle crisi",
        },
      ],
      feedback:
        "Le azioni cicliche (tech, auto, lusso) seguono fortemente il ciclo economico – nelle recessioni scendono in modo sproporzionato. Le azioni difensive (alimentare, pharma, utility) – le persone mangiano e prendono medicine anche durante le crisi. Preparazione alla recessione: aumentare i settori difensivi, ridurre i ciclici. Il portafoglio della sig.ra Keller con l'80 % ciclico è particolarmente vulnerabile.",
      merksatz:
        "Ciclico = segue la congiuntura. Difensivo = stabile nelle crisi. Recessione? → più difensivo.",
    },
    "3.3": {
      situation:
        "Swiss Tech AG effettua un aumento di capitale. Condizioni: 1 diritto di opzione per azione esistente. 5 diritti di opzione danno diritto all'acquisto di 1 nuova azione (rapporto 5:1). Prezzo di emissione: CHF 60. Corso attuale: CHF 85. La sig.ra Meier detiene 100 azioni.",
      question:
        "Quante nuove azioni può sottoscrivere al massimo la sig.ra Meier?",
      options: [
        {
          key: "A",
          text: "100 nuove azioni – ha 100 diritti di opzione, uno basta per una nuova azione",
        },
        {
          key: "B",
          text: "20 nuove azioni – 100 diritti di opzione ÷ 5 = 20 nuove azioni",
        },
        {
          key: "C",
          text: "5 nuove azioni – il rapporto di sottoscrizione è 1:5, non 5:1",
        },
        {
          key: "D",
          text: "Non può sottoscrivere nuove azioni – i diritti di opzione sono riservati agli investitori istituzionali",
        },
      ],
      feedback:
        "Rapporto di sottoscrizione 5:1 = 5 diritti di opzione per 1 nuova azione. La sig.ra Meier ha 100 diritti → 100 ÷ 5 = 20 nuove azioni. Costi: 20 × CHF 60 = CHF 1'200. Lo sconto (CHF 85 − CHF 60 = CHF 25 per azione) non è però un vero guadagno – dopo l'aumento di capitale il corso scende al corso teorico ex-diritto. I diritti proteggono gli azionisti esistenti dalla diluizione.",
      merksatz:
        "Esercitare o vendere i diritti di opzione – lasciarli scadere costa denaro.",
    },
    "3.1": {
      situation:
        "Coppia Schmidt, entrambi 58 anni, pensionamento tra 7 anni. Patrimonio disponibile: CHF 200'000. Profilo di rischio: conservativo, tolleranza massima alle perdite 10 %. Obiettivo: conservazione del capitale più leggera crescita. Chiedono: «Dovremmo ancora comprare azioni? O meglio obbligazioni?»",
      question: "Cosa consigli alla coppia Schmidt?",
      options: [
        {
          key: "A",
          text: "100 % azioni – 7 anni sono sufficientemente lunghi per il mercato azionario",
        },
        {
          key: "B",
          text: "100 % obbligazioni a breve termine – si adatta meglio al profilo conservativo",
        },
        {
          key: "C",
          text: "Mix circa 20–30 % azioni / 70–80 % obbligazioni – strategia conservativa con una piccola componente di crescita",
        },
        { key: "D", text: "50/50 azioni/obbligazioni – classicamente equilibrato" },
      ],
      feedback:
        "Poco prima della pensione, la conservazione del capitale ha la priorità. 100 % azioni è troppo rischioso: le azioni possono scendere del 30–40 % a breve termine, mettendo a rischio la pensione. 100 % obbligazioni non protegge dall'inflazione. Una piccola quota azionaria (20–30 %) porta leggera crescita, mentre le obbligazioni stabilizzano la base.",
      merksatz:
        "Più si avvicina la pensione, più si è conservativi. La conservazione del capitale ha la precedenza sull'ottimizzazione del rendimento.",
    },
  },
};
