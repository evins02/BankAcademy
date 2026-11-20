import type { LangTranslations } from "./utils";

export const ANLAGE_FONDS_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      situation:
        "Elena, 32 ans, souhaite investir CHF 10'000 dans un fonds de placement. Elle compare : Fonds A (ETF passif, TER 0.20%) et Fonds B (fonds géré activement, TER 1.80%).",
      question: "Que signifie le TER et pourquoi la différence de coûts est-elle si grande après 20 ans ?",
      options: [
        { key: "A", text: "Le TER est le ratio de coûts annuels total. Grâce à l'effet des intérêts composés, une différence de 1.6% représente environ CHF 6'800 après 20 ans" },
        { key: "B", text: "Le TER est des frais d'achat uniques – ne joue un rôle qu'à l'achat" },
        { key: "C", text: "Le TER joue peu de rôle pour les placements à long terme" },
        { key: "D", text: "Un TER plus élevé signifie une gestion active et donc toujours un meilleur rendement" },
      ],
      feedback:
        "TER (Total Expense Ratio) = coûts annuels totaux en pourcentage du patrimoine du fonds. Une différence de 1.6% paraît faible – mais l'effet des intérêts composés sur 20 ans coûte à Elena environ CHF 6'800 de plus. Passif = bon marché, car pas d'équipe de gestion active à payer.",
    },
    "1.2": {
      situation:
        "Le nouveau client Ben, 26 ans, a entendu parler des fonds de placement pour la première fois. Il demande : «Comment ça fonctionne exactement – je verse de l'argent et ensuite ?»",
      question: "Quelle description décrit correctement le principe fondamental d'un fonds de placement ?",
      options: [
        { key: "A", text: "Un fonds est un compte d'épargne avec un rendement garanti, géré par la banque" },
        { key: "B", text: "De nombreux investisseurs mettent leur argent en commun, un gérant de fonds l'investit de manière diversifiée – chaque investisseur détient des parts proportionnelles à son investissement" },
        { key: "C", text: "Les fonds ne sont accessibles qu'aux investisseurs institutionnels avec au moins CHF 100'000" },
        { key: "D", text: "Un fonds achète uniquement des actions suisses et distribue le bénéfice annuellement" },
      ],
      feedback:
        "Fonds de placement = placement collectif. Principe : des milliers d'investisseurs regroupent leur capital. Un gérant de fonds professionnel l'investit dans un portefeuille diversifié (actions, obligations, immobilier, etc.). Chaque investisseur détient des parts – si le fonds croît, la valeur des parts augmente. Sur le plan juridique : fortune séparée, distincte de la banque – protégée en cas de faillite bancaire.",
    },
    "1.3": {
      situation:
        "Elena consulte dans le KID (Key Information Document) d'un fonds la classe de risque. Il est indiqué : SRRI 6 (sur une échelle de 1 à 7). Elena a 30 ans, profil de risque «équilibré», horizon de placement 5 ans.",
      question: "Que signifie SRRI 6 et ce fonds convient-il à Elena ?",
      options: [
        { key: "A", text: "SRRI 6 est risqué – volatilité élevée. Pour le profil équilibré d'Elena, c'est trop risqué" },
        { key: "B", text: "SRRI 6 est conservateur – le fonds investit principalement dans des obligations sûres" },
        { key: "C", text: "SRRI est uniquement un terme marketing sans signification réglementaire" },
        { key: "D", text: "SRRI 6 convient bien à Elena – un investisseur équilibré peut toujours choisir toutes les classes de risque" },
      ],
      feedback:
        "SRRI (Synthetic Risk and Reward Indicator) mesure la volatilité historique : échelle de 1 (très faible) à 7 (très élevée). SRRI 6 = volatilité élevée, probablement un fonds actions/marchés émergents. Pour Elena («équilibrée»), SRRI 3–5 conviendrait mieux. Recommander un fonds SRRI 6 à un investisseur équilibré serait une violation d'adéquation LEFIN.",
    },
    "2.1": {
      situation:
        "Monsieur Wagner, 58 ans, a CHF 100'000 dans le «Swiss Dividenden-Fonds» (distribuant). Chaque année il reçoit CHF 2'500, mais le cours du fonds progresse peu. Son ami a le même panier d'actions dans le «Swiss Wachstums-Fonds» (capitalisant) – dont le cours monte bien plus fort. Monsieur Wagner s'en étonne.",
      question: "Pourquoi le cours du fonds de Monsieur Wagner évolue-t-il différemment ?",
      options: [
        { key: "A", text: "Le fonds de Monsieur Wagner est moins bien géré – il devrait immédiatement changer" },
        { key: "B", text: "Le fonds capitalisant contient d'autres actions, meilleures" },
        { key: "C", text: "Les fonds distribuants versent les revenus → le cours monte moins. Les fonds capitalisants réinvestissent automatiquement → le cours monte plus fort (effet des intérêts composés)" },
        { key: "D", text: "Les fonds dividendes sont fondamentalement moins bons que les fonds de croissance" },
      ],
      feedback:
        "Distribuant : les dividendes et intérêts sont versés → le patrimoine du fonds diminue du montant de la distribution → le cours monte moins. Capitalisant : les revenus restent dans le fonds et sont réinvestis → effet des intérêts composés → le cours monte plus fort. Le rendement total est similaire – seule la forme diffère.",
    },
    "2.2": {
      situation:
        "Monsieur Leuthold investit CHF 20'000 dans le fonds X. Commission de souscription : 3%. Après 2 ans, le fonds a progressé de 8% et il veut vendre. Commission de rachat : 1%.",
      question: "Comment les commissions de souscription et de rachat réduisent-elles le rendement de Monsieur Leuthold ?",
      options: [
        { key: "A", text: "Pas du tout – les frais sont déjà inclus dans le TER" },
        { key: "B", text: "Ils divisent son rendement par deux – de 8% à environ 4%" },
        { key: "C", text: "Avec la commission de souscription et de rachat, il n'obtient que 3.7% au lieu de 8% – les coûts de transaction absorbent plus de la moitié du rendement" },
        { key: "D", text: "Les frais ne sont pertinents qu'en cas de courte durée de détention – sur 2 ans, ils n'ont aucune importance" },
      ],
      feedback:
        "Commission de souscription (3%) et commission de rachat (1%) sont des coûts de transaction, en plus du TER. Ils interviennent une fois à l'achat/vente. Pour une courte durée de détention (2 ans), ils peuvent fortement grever le rendement. Résultat : Monsieur Leuthold obtient seulement 3.7% sur son capital investi, bien que le fonds ait progressé de 8%.",
    },
    "2.3": {
      situation:
        "Un conseiller recommande à Madame Albrecht deux fonds : le Fonds A est conforme UCITS (domicilié au Luxembourg), le Fonds B est un fonds offshore non réglementé des îles Caïmans avec une stratégie similaire mais un rendement plus élevé.",
      question: "Quelle est la différence décisive entre un fonds UCITS et le fonds offshore ?",
      options: [
        { key: "A", text: "Les fonds UCITS ont toujours un rendement plus élevé – ils sont donc meilleurs" },
        { key: "B", text: "Pas de différence essentielle – les deux sont contrôlés par des régulateurs" },
        { key: "C", text: "Les fonds UCITS sont soumis à des réglementations strictes UE/EEE : diversification, liquidité, transparence, rachat quotidien. Le fonds offshore n'a pas ce cadre de protection" },
        { key: "D", text: "Les fonds offshore sont illégaux – Madame Albrecht ne peut pas acheter un tel fonds" },
      ],
      feedback:
        "UCITS (Undertakings for Collective Investment in Transferable Securities) = cadre réglementaire européen. Obligations : max. 10% chez un émetteur, rachat quotidien à la VNI, rapports semestriels, KIID. Les fonds offshore non réglementés n'ont pas ce niveau de protection : restrictions de rachat possibles, moins de transparence, règles fiscales différentes. En Suisse : la FINMA examine les fonds étrangers avant leur distribution.",
    },
    "3.1": {
      situation:
        "Elena vérifie après 3 ans ses fonds. Son fonds géré activement (TER 1.5%) a réalisé 4.2% p.a. L'indice de référence (MSCI World) a réalisé 6.8% p.a. Un ETF sur le même indice (TER 0.2%) aurait rapporté 6.6% p.a.",
      question: "Que dites-vous à Elena ?",
      options: [
        { key: "A", text: "3 ans, c'est trop court – un fonds actif montre sa valeur à long terme. Continuer à le détenir." },
        { key: "B", text: "L'actif est toujours moins bon – en principe, ne jamais recommander de fonds actifs" },
        { key: "C", text: "Le fonds actif a sous-performé l'indice de 2.4% p.a. Des études montrent : plus de 70% des fonds actifs ne battent pas leur indice après frais à long terme. L'ETF aurait été le choix plus économique et meilleur ici." },
        { key: "D", text: "Elena doit immédiatement changer – la performance passée est tout" },
      ],
      feedback:
        "Réalité : 70–80% des fonds actifs sous-performent leur indice de référence après frais à long terme (étude SPIVA). Ici : 4.2% vs. 6.6% = 2.4% p.a. de moins. Sur 20 ans avec CHF 10'000, cela représente environ CHF 12'000 de différence. Elena devrait systématiquement intégrer les coûts dans ses décisions de placement.",
    },
    "3.2": {
      situation:
        "L'analyste Vera compare deux ETFs sur le SMI : ETF Alpha (réplication physique, TER 0.10%, tracking error 0.05%) et ETF Beta (réplication synthétique via swap, TER 0.07%, tracking error 0.30%). Vera explique la différence à son client.",
      question: "Que signifie le tracking error plus élevé de l'ETF Beta et quel est le risque supplémentaire ?",
      options: [
        { key: "A", text: "Tracking error plus élevé = rendement plus élevé. L'ETF Beta est donc meilleur" },
        { key: "B", text: "Le tracking error mesure l'écart par rapport à l'indice. L'ETF Beta s'écarte davantage du SMI. Synthétique = risque de contrepartie swap (en cas de défaillance du partenaire swap, la couverture fait défaut)" },
        { key: "C", text: "Le tracking error n'est pertinent que pour les fonds actifs – pour les ETFs, il est toujours de 0%" },
        { key: "D", text: "L'ETF Beta est moins cher (TER 0.07%) et est donc toujours le meilleur choix" },
      ],
      feedback:
        "Tracking Error = écart-type de la différence de rendement entre l'ETF et l'indice. Un TE élevé signifie : l'ETF reproduit imprécisément l'indice. Les ETFs synthétiques utilisent des swaps – ils ne détiennent pas les actions de l'indice, mais des dérivés. Risque : défaillance de la contrepartie (le partenaire swap devient insolvable). Pour les investisseurs conservateurs : la réplication physique est plus transparente et plus sûre.",
    },
    "3.3": {
      situation:
        "Monsieur Zimmermann a un portefeuille : allocation cible 60% actions / 40% obligations. Actuellement après une forte année boursière : 75% actions / 25% obligations (valeur totale CHF 200'000).",
      question: "Qu'est-ce que le rééquilibrage et que doit concrètement faire Monsieur Zimmermann ?",
      options: [
        { key: "A", text: "Le rééquilibrage est inutile – si les actions ont monté, il devrait laisser la quote évoluer librement" },
        { key: "B", text: "Il doit vendre pour CHF 30'000 d'actions et investir en obligations – retour à l'allocation cible 60/40" },
        { key: "C", text: "Il doit acheter CHF 30'000 de nouvelles obligations, sans vendre d'actions" },
        { key: "D", text: "Le rééquilibrage signifie vendre toutes les positions et tout racheter" },
      ],
      feedback:
        "Rééquilibrage = retour à l'allocation cible. Monsieur Zimmermann détient 75% d'actions (CHF 150'000) au lieu de 60% (CHF 120'000). Différence : CHF 30'000. Vendre ces actions et acheter pour CHF 30'000 d'obligations → revenir à 60/40. Sans rééquilibrage, le portefeuille dérive de plus en plus vers un risque plus élevé.",
    },
  },
  it: {
    "1.1": {
      situation:
        "Elena, 32 anni, vuole investire CHF 10'000 in un fondo d'investimento. Confronta: Fondo A (ETF passivo, TER 0.20%) e Fondo B (fondo gestito attivamente, TER 1.80%).",
      question: "Cosa significa TER e perché la differenza di costi dopo 20 anni è così grande?",
      options: [
        { key: "A", text: "Il TER è il coefficiente di spesa totale annuale. Grazie all'effetto degli interessi composti, una differenza dell'1.6% rappresenta circa CHF 6'800 dopo 20 anni" },
        { key: "B", text: "Il TER è una commissione d'acquisto una tantum – conta solo al momento dell'acquisto" },
        { key: "C", text: "Il TER conta poco per gli investimenti a lungo termine" },
        { key: "D", text: "Un TER più alto significa gestione attiva e quindi sempre un rendimento migliore" },
      ],
      feedback:
        "TER (Total Expense Ratio) = costi annuali totali in percentuale del patrimonio del fondo. Una differenza dell'1.6% sembra piccola – ma l'effetto degli interessi composti su 20 anni costa a Elena circa CHF 6'800 in più. Passivo = economico, perché non occorre pagare un team di gestione attiva.",
    },
    "1.2": {
      situation:
        "Il nuovo cliente Ben, 26 anni, ha sentito parlare dei fondi d'investimento per la prima volta. Chiede: «Come funziona esattamente – verso dei soldi e poi?»",
      question: "Quale descrizione descrive correttamente il principio fondamentale di un fondo d'investimento?",
      options: [
        { key: "A", text: "Un fondo è un conto di risparmio con un rendimento garantito, gestito dalla banca" },
        { key: "B", text: "Molti investitori mettono in comune il loro denaro, un gestore del fondo lo investe in modo diversificato – ogni investitore detiene quote proporzionali al suo investimento" },
        { key: "C", text: "I fondi sono accessibili solo agli investitori istituzionali con almeno CHF 100'000" },
        { key: "D", text: "Un fondo acquista solo azioni svizzere e distribuisce il guadagno annualmente" },
      ],
      feedback:
        "Fondo d'investimento = investimento collettivo. Principio: migliaia di investitori raggruppano il loro capitale. Un gestore del fondo professionista lo investe in un portafoglio diversificato (azioni, obbligazioni, immobili, ecc.). Ogni investitore detiene quote – se il fondo cresce, il valore delle quote aumenta. Giuridicamente: patrimonio separato, distinto dalla banca – protetto in caso di fallimento bancario.",
    },
    "1.3": {
      situation:
        "Elena consulta nel KID (Key Information Document) di un fondo la classe di rischio. È indicato: SRRI 6 (su una scala da 1 a 7). Elena ha 30 anni, profilo di rischio «bilanciato», orizzonte d'investimento 5 anni.",
      question: "Cosa significa SRRI 6 e questo fondo è adatto a Elena?",
      options: [
        { key: "A", text: "SRRI 6 è rischioso – alta volatilità. Per il profilo bilanciato di Elena, è troppo rischioso" },
        { key: "B", text: "SRRI 6 è conservativo – il fondo investe principalmente in obbligazioni sicure" },
        { key: "C", text: "SRRI è solo un termine di marketing senza significato regolamentare" },
        { key: "D", text: "SRRI 6 si adatta bene a Elena – un investitore bilanciato può sempre scegliere tutte le classi di rischio" },
      ],
      feedback:
        "SRRI (Synthetic Risk and Reward Indicator) misura la volatilità storica: scala da 1 (molto bassa) a 7 (molto alta). SRRI 6 = alta volatilità, probabilmente un fondo azionario/mercati emergenti. Per Elena («bilanciata»), SRRI 3–5 sarebbe più adatto. Raccomandare un fondo SRRI 6 a un investitore bilanciato sarebbe una violazione dell'adeguatezza LSerFi.",
    },
    "2.1": {
      situation:
        "Il signor Wagner, 58 anni, ha CHF 100'000 nello «Swiss Dividenden-Fonds» (distribuzione). Ogni anno riceve CHF 2'500, ma il corso del fondo cresce poco. Il suo amico ha lo stesso paniere di azioni nello «Swiss Wachstums-Fonds» (capitalizzazione) – il cui corso sale molto più fortemente. Il signor Wagner se ne stupisce.",
      question: "Perché il corso del fondo del signor Wagner evolve diversamente?",
      options: [
        { key: "A", text: "Il fondo del signor Wagner è gestito peggio – dovrebbe cambiare immediatamente" },
        { key: "B", text: "Il fondo a capitalizzazione contiene altre azioni, migliori" },
        { key: "C", text: "I fondi a distribuzione pagano i proventi → il corso sale meno. I fondi a capitalizzazione reinvestono automaticamente → il corso sale più forte (effetto interessi composti)" },
        { key: "D", text: "I fondi dividendi sono fondamentalmente peggiori dei fondi di crescita" },
      ],
      feedback:
        "Distribuzione: dividendi e interessi vengono versati → il patrimonio del fondo scende dell'importo della distribuzione → il corso sale meno. Capitalizzazione: i proventi rimangono nel fondo e vengono reinvestiti → effetto interessi composti → il corso sale più forte. Il rendimento totale è simile – solo la forma è diversa.",
    },
    "2.2": {
      situation:
        "Il signor Leuthold investe CHF 20'000 nel fondo X. Commissione di sottoscrizione: 3%. Dopo 2 anni, il fondo è cresciuto dell'8% e vuole vendere. Commissione di rimborso: 1%.",
      question: "Come la commissione di sottoscrizione e di rimborso riducono il rendimento del signor Leuthold?",
      options: [
        { key: "A", text: "Per niente – le commissioni sono già incluse nel TER" },
        { key: "B", text: "Dimezzano il suo rendimento – dall'8% a circa il 4%" },
        { key: "C", text: "Con la commissione di sottoscrizione e di rimborso ottiene solo il 3.7% invece dell'8% – i costi di transazione assorbono più della metà del rendimento" },
        { key: "D", text: "Le commissioni sono rilevanti solo in caso di breve periodo di detenzione – su 2 anni non hanno alcuna importanza" },
      ],
      feedback:
        "Commissione di sottoscrizione (3%) e commissione di rimborso (1%) sono costi di transazione, in aggiunta al TER. Intervengono una volta all'acquisto/vendita. Per una breve durata di detenzione (2 anni), possono gravare fortemente sul rendimento. Risultato: il signor Leuthold ottiene solo il 3.7% sul suo capitale investito, benché il fondo sia cresciuto dell'8%.",
    },
    "2.3": {
      situation:
        "Un consulente raccomanda alla signora Albrecht due fondi: il Fondo A è conforme UCITS (domiciliato in Lussemburgo), il Fondo B è un fondo offshore non regolamentato dalle Isole Cayman con una strategia simile ma un rendimento più alto.",
      question: "Qual è la differenza decisiva tra un fondo UCITS e il fondo offshore?",
      options: [
        { key: "A", text: "I fondi UCITS hanno sempre un rendimento più alto – sono quindi migliori" },
        { key: "B", text: "Nessuna differenza essenziale – entrambi sono controllati da regolatori" },
        { key: "C", text: "I fondi UCITS sono soggetti a rigide normative UE/SEE: diversificazione, liquidità, trasparenza, rimborso giornaliero. Il fondo offshore non ha questo quadro protettivo" },
        { key: "D", text: "I fondi offshore sono illegali – la signora Albrecht non può acquistare un tale fondo" },
      ],
      feedback:
        "UCITS (Undertakings for Collective Investment in Transferable Securities) = quadro normativo europeo. Obblighi: max. 10% con un emittente, rimborso giornaliero al NAV, rapporti semestrali, KIID. I fondi offshore non regolamentati non hanno questo livello di protezione: possibili restrizioni di rimborso, meno trasparenza, regole fiscali diverse. In Svizzera: la FINMA esamina i fondi esteri prima della distribuzione.",
    },
    "3.1": {
      situation:
        "Elena verifica dopo 3 anni i suoi fondi. Il suo fondo gestito attivamente (TER 1.5%) ha realizzato il 4.2% p.a. L'indice di riferimento (MSCI World) ha realizzato il 6.8% p.a. Un ETF sullo stesso indice (TER 0.2%) avrebbe reso il 6.6% p.a.",
      question: "Cosa dici a Elena?",
      options: [
        { key: "A", text: "3 anni è troppo breve – un fondo attivo mostra il suo valore a lungo termine. Continuare a tenerlo." },
        { key: "B", text: "L'attivo è sempre peggio – in linea di principio, non raccomandare mai fondi attivi" },
        { key: "C", text: "Il fondo attivo ha sottoperformato l'indice del 2.4% p.a. Gli studi mostrano: oltre il 70% dei fondi attivi non batte il proprio indice dopo i costi a lungo termine. L'ETF sarebbe stata la scelta più economica e migliore qui." },
        { key: "D", text: "Elena deve cambiare immediatamente – la performance passata è tutto" },
      ],
      feedback:
        "Realtà: il 70–80% dei fondi attivi sottoperforma il proprio indice di riferimento dopo i costi a lungo termine (studio SPIVA). Qui: 4.2% vs. 6.6% = 2.4% p.a. in meno. Su 20 anni con CHF 10'000, questo rappresenta circa CHF 12'000 di differenza. Elena dovrebbe sistematicamente integrare i costi nelle sue decisioni di investimento.",
    },
    "3.2": {
      situation:
        "L'analista Vera confronta due ETF sullo SMI: ETF Alpha (replica fisica, TER 0.10%, tracking error 0.05%) e ETF Beta (replica sintetica tramite swap, TER 0.07%, tracking error 0.30%). Vera spiega la differenza al suo cliente.",
      question: "Cosa significa il tracking error più alto dell'ETF Beta e qual è il rischio aggiuntivo?",
      options: [
        { key: "A", text: "Tracking error più alto = rendimento più alto. L'ETF Beta è quindi migliore" },
        { key: "B", text: "Il tracking error misura lo scostamento dall'indice. L'ETF Beta si discosta maggiormente dallo SMI. Sintetico = rischio di controparte swap (in caso di insolvenza del partner swap, manca la copertura)" },
        { key: "C", text: "Il tracking error è rilevante solo per i fondi attivi – per gli ETF è sempre 0%" },
        { key: "D", text: "L'ETF Beta è più economico (TER 0.07%) ed è quindi sempre la scelta migliore" },
      ],
      feedback:
        "Tracking Error = deviazione standard della differenza di rendimento tra l'ETF e l'indice. Un TE elevato significa: l'ETF replica l'indice in modo impreciso. Gli ETF sintetici usano swap – non detengono le azioni dell'indice, ma derivati. Rischio: insolvenza della controparte (il partner swap diventa insolvente). Per gli investitori conservativi: la replica fisica è più trasparente e sicura.",
    },
    "3.3": {
      situation:
        "Il signor Zimmermann ha un portafoglio: allocazione target 60% azioni / 40% obbligazioni. Attualmente dopo un forte anno azionario: 75% azioni / 25% obbligazioni (valore totale CHF 200'000).",
      question: "Cos'è il ribilanciamento e cosa deve fare concretamente il signor Zimmermann?",
      options: [
        { key: "A", text: "Il ribilanciamento è inutile – se le azioni sono salite, dovrebbe lasciare evolvere liberamente la quota" },
        { key: "B", text: "Deve vendere azioni per CHF 30'000 e investire in obbligazioni – ritorno all'allocazione target 60/40" },
        { key: "C", text: "Deve acquistare CHF 30'000 di nuove obbligazioni, senza vendere azioni" },
        { key: "D", text: "Il ribilanciamento significa vendere tutte le posizioni e riacquistarle" },
      ],
      feedback:
        "Ribilanciamento = ritorno all'allocazione target. Il signor Zimmermann detiene il 75% di azioni (CHF 150'000) invece del 60% (CHF 120'000). Differenza: CHF 30'000. Vendere queste azioni e acquistare per CHF 30'000 obbligazioni → tornare a 60/40. Senza ribilanciamento, il portafoglio deriva sempre più verso un rischio più elevato.",
    },
  },
};
