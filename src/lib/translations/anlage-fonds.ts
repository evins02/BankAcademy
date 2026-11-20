import type { LangTranslations } from "./utils";

export const ANLAGE_FONDS_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.2": {
      situation:
        "Nouveau client Ben, 26 ans, a entendu parler des fonds de placement pour la première fois. Il demande : «Comment ça marche exactement – je verse de l'argent et ensuite ?»",
      question:
        "Qu'est-ce qui décrit correctement le principe de base d'un fonds de placement ?",
      options: [
        {
          key: "A",
          text: "Un fonds est un compte épargne avec un rendement garanti, géré par la banque",
        },
        {
          key: "B",
          text: "De nombreux investisseurs mettent de l'argent en commun, un gérant de fonds l'investit largement diversifié – chaque investisseur détient des parts proportionnelles à son apport",
        },
        {
          key: "C",
          text: "Les fonds ne sont accessibles qu'aux investisseurs institutionnels avec au moins CHF 100'000",
        },
        {
          key: "D",
          text: "Un fonds achète uniquement des actions suisses et distribue le bénéfice annuellement",
        },
      ],
      feedback:
        "Fonds de placement = placement collectif. Principe : des milliers d'investisseurs regroupent leur capital. Un gérant de fonds professionnel l'investit dans un portefeuille diversifié. Chaque investisseur détient des parts – si le fonds croît, la valeur des parts augmente. Juridiquement : fortune distincte, séparée de la banque – protégée en cas de faillite bancaire.",
      merksatz:
        "Fonds = placement collectif. Fortune distincte = protégée en cas de faillite bancaire.",
    },
    "1.3": {
      situation:
        "Elena examine dans le KID (Document d'informations clés) d'un fonds la classe de risque. Il est indiqué : SRRI 6 (sur une échelle de 1 à 7). Elena a 30 ans, type de risque «équilibré», horizon de placement 5 ans.",
      question: "Que signifie SRRI 6 et ce fonds convient-il à Elena ?",
      options: [
        {
          key: "A",
          text: "SRRI 6 est à risque élevé – forte volatilité. Pour le profil équilibré d'Elena, c'est trop risqué",
        },
        {
          key: "B",
          text: "SRRI 6 est conservateur – le fonds investit principalement dans des obligations sûres",
        },
        {
          key: "C",
          text: "SRRI est seulement un terme marketing sans signification réglementaire",
        },
        {
          key: "D",
          text: "SRRI 6 convient bien à Elena – un investisseur équilibré peut toujours choisir toutes les classes de risque",
        },
      ],
      feedback:
        "Le SRRI (Synthetic Risk and Reward Indicator) mesure la volatilité historique : échelle de 1 (très faible) à 7 (très élevé). SRRI 6 = forte volatilité, probablement un fonds d'actions/marchés émergents. Pour Elena («équilibrée»), SRRI 3–5 convient mieux. Recommander un fonds SRRI 6 à un investisseur équilibré serait une violation de l'adéquation LEFIN.",
      merksatz:
        "SRRI 1–7 : plus c'est élevé, plus c'est risqué. Toujours comparer avec le profil de risque du client.",
    },
    "1.1": {
      situation:
        "Elena, 32 ans, veut investir CHF 10'000 dans un fonds de placement. Elle compare : Fonds A (ETF passif, TER 0.20 %) et Fonds B (fonds à gestion active, TER 1.80 %).",
      question:
        "Qu'est-ce que le TER et pourquoi la différence de coûts est-elle si importante après 20 ans ?",
      options: [
        {
          key: "A",
          text: "Le TER est le ratio de coûts annuels total. Par l'effet des intérêts composés, 1.6 % de différence s'accumule à environ CHF 6'800 après 20 ans",
        },
        {
          key: "B",
          text: "Le TER est des frais d'achat uniques – n'a d'importance qu'à l'achat",
        },
        {
          key: "C",
          text: "Le TER joue peu de rôle pour les placements à long terme",
        },
        {
          key: "D",
          text: "Un TER plus élevé signifie une gestion active et donc toujours un meilleur rendement",
        },
      ],
      feedback:
        "TER (Total Expense Ratio) = coûts annuels totaux en pourcentage du patrimoine du fonds. 1.6 % de différence paraît faible – mais l'effet des intérêts composés sur 20 ans coûte à Elena environ CHF 6'800 de plus. Passif = bon marché, car pas d'équipe de gestion active à payer.",
      merksatz:
        "TER = coûts annuels totaux en %. Sur des décennies, chaque pourcentage coûte énormément.",
    },
    "2.2": {
      situation:
        "M. Leuthold investit CHF 20'000 dans le Fonds X. Droit d'entrée : 3 %. Après 2 ans, le fonds progresse de 8 % et il veut vendre. Commission de rachat : 1 %.",
      question:
        "Comment le droit d'entrée et la commission de rachat réduisent-ils le rendement de M. Leuthold ?",
      options: [
        {
          key: "A",
          text: "Pas du tout – les frais sont déjà inclus dans le TER",
        },
        {
          key: "B",
          text: "Ils divisent son rendement par deux – de 8 % à environ 4 %",
        },
        {
          key: "C",
          text: "Le droit d'entrée et la commission de rachat lui donnent seulement 3.7 % au lieu de 8 % – les coûts de transaction absorbent plus de la moitié du rendement",
        },
        {
          key: "D",
          text: "Les frais ne sont pertinents que pour les courtes périodes de détention – sur 2 ans ils ne jouent aucun rôle",
        },
      ],
      feedback:
        "Le droit d'entrée (3 %) et la commission de rachat (1 %) sont des coûts de transaction, en plus du TER. Ils interviennent une fois à l'achat/vente. Sur une courte période de détention (2 ans), ils peuvent fortement grever le rendement. Résultat : M. Leuthold obtient seulement 3.7 % sur son capital investi, bien que le fonds ait progressé de 8 %.",
      merksatz:
        "TER = coûts récurrents. Droit d'entrée / Commission de rachat = coûts de transaction uniques. Les deux réduisent le rendement.",
    },
    "2.3": {
      situation:
        "Un conseiller recommande à Mme Albrecht deux fonds : Fonds A est conforme UCITS (domicilié au Luxembourg), Fonds B est un fonds offshore non réglementé des Îles Caïmans avec une stratégie similaire mais un rendement plus élevé.",
      question:
        "Quelle est la différence décisive entre un fonds UCITS et le fonds offshore ?",
      options: [
        {
          key: "A",
          text: "Les fonds UCITS ont toujours un rendement plus élevé – c'est pourquoi ils sont meilleurs",
        },
        {
          key: "B",
          text: "Aucune différence substantielle – les deux sont contrôlés par des régulateurs",
        },
        {
          key: "C",
          text: "Les fonds UCITS sont soumis à des réglementations strictes UE/EEE : diversification, liquidité, transparence, rachat quotidien. Les fonds offshore ne bénéficient pas de ce cadre de protection",
        },
        {
          key: "D",
          text: "Les fonds offshore sont illégaux – Mme Albrecht ne peut pas acheter un tel fonds",
        },
      ],
      feedback:
        "UCITS (Undertakings for Collective Investment in Transferable Securities) = cadre réglementaire UE. Obligations : max. 10 % dans un émetteur, rachat quotidien au VNI, rapports semestriels, DICI. Les fonds offshore non réglementés n'ont pas de telle protection. En Suisse : la FINMA examine les fonds étrangers avant leur distribution.",
      merksatz:
        "UCITS = cadre de protection pour les investisseurs. Offshore = moins de réglementation, plus de risque.",
    },
    "2.1": {
      situation:
        "M. Wagner, 58 ans, a CHF 100'000 dans le «Swiss Dividenden-Fonds» (distribuant). Chaque année il reçoit CHF 2'500, mais le cours de son fonds progresse peu. Son ami a le même panier d'actions dans le «Swiss Wachstums-Fonds» (capitalisant) – dont le cours monte nettement plus fort. M. Wagner s'en étonne.",
      question: "Pourquoi le cours du fonds de M. Wagner évolue-t-il différemment ?",
      options: [
        {
          key: "A",
          text: "Le fonds de M. Wagner est moins bien géré – il devrait immédiatement changer",
        },
        {
          key: "B",
          text: "Le fonds capitalisant contient d'autres actions meilleures",
        },
        {
          key: "C",
          text: "Les fonds distribuants versent les revenus → le cours du fonds progresse moins. Les fonds capitalisants réinvestissent automatiquement → le cours monte plus fort (effet des intérêts composés)",
        },
        {
          key: "D",
          text: "Les fonds à dividendes sont fondamentalement moins bons que les fonds de croissance",
        },
      ],
      feedback:
        "Distribuant : les dividendes et intérêts sont versés → le patrimoine du fonds diminue du montant distribué → le cours progresse moins. Capitalisant : les revenus restent dans le fonds et sont réinvestis → effet des intérêts composés → le cours monte plus fort. Le rendement total est similaire – seule la forme diffère.",
      merksatz:
        "Distribuant = revenu versé. Capitalisant = revenu reste dans le fonds (intérêts composés). Même portefeuille, évolution du cours différente.",
    },
    "3.2": {
      situation:
        "L'analyste Vera compare deux ETFs sur le SMI : ETF Alpha (réplication physique, TER 0.10 %, Tracking Error 0.05 %) et ETF Beta (réplication synthétique via swap, TER 0.07 %, Tracking Error 0.30 %). Vera explique la différence à son client.",
      question:
        "Que signifie le tracking error plus élevé de l'ETF Beta et quel est le risque supplémentaire ?",
      options: [
        {
          key: "A",
          text: "Un tracking error plus élevé = rendement plus élevé. L'ETF Beta est donc meilleur",
        },
        {
          key: "B",
          text: "Le tracking error mesure l'écart par rapport à l'indice. L'ETF Beta s'écarte davantage du SMI. Synthétique = risque de contrepartie swap (en cas de défaut du partenaire swap, la couverture fait défaut)",
        },
        {
          key: "C",
          text: "Le tracking error n'est pertinent que pour les fonds actifs – pour les ETFs toujours 0 %",
        },
        {
          key: "D",
          text: "L'ETF Beta est moins cher (TER 0.07 %) et donc toujours le meilleur choix",
        },
      ],
      feedback:
        "Tracking error = écart-type de la différence de rendement entre l'ETF et l'indice. Un TE élevé signifie : l'ETF reproduit imprécisément l'indice. Les ETFs synthétiques utilisent des swaps. Risque : défaut de contrepartie. Pour les investisseurs conservateurs : la réplication physique est plus transparente et plus sûre.",
      merksatz:
        "Tracking Error = écart par rapport à l'indice. Synthétique = risque de contrepartie. Physique = propriété directe.",
    },
    "3.3": {
      situation:
        "M. Zimmermann a un portefeuille : allocation cible 60 % actions / 40 % obligations. Actuellement, après une forte année actions : 75 % actions / 25 % obligations (valeur totale CHF 200'000).",
      question:
        "Qu'est-ce que le rééquilibrage et que doit concrètement faire M. Zimmermann ?",
      options: [
        {
          key: "A",
          text: "Le rééquilibrage est inutile – si les actions ont progressé, il devrait laisser courir la quote-part",
        },
        {
          key: "B",
          text: "Il doit vendre CHF 30'000 d'actions et investir en obligations – retour à l'allocation cible 60/40",
        },
        {
          key: "C",
          text: "Il doit acheter CHF 30'000 de nouvelles obligations, sans vendre d'actions",
        },
        {
          key: "D",
          text: "Le rééquilibrage signifie vendre toutes les positions et tout racheter",
        },
      ],
      feedback:
        "Rééquilibrage = retour à l'allocation cible. M. Zimmermann détient 75 % d'actions (CHF 150'000) au lieu de 60 % (CHF 120'000). Différence : CHF 30'000. Vendre ces actions et acheter pour CHF 30'000 d'obligations → retour à 60/40. Sans rééquilibrage, le portefeuille dérive continuellement vers un risque plus élevé.",
      merksatz:
        "Rééquilibrage = rétablir l'allocation cible. Vendre ce qui a bien performé, acheter ce qui a pris du retard.",
    },
    "3.1": {
      situation:
        "Elena vérifie ses fonds après 3 ans. Son fonds à gestion active (TER 1.5 %) a réalisé 4.2 % p.a. L'indice de référence (MSCI World) a réalisé 6.8 % p.a. Un ETF sur le même indice (TER 0.2 %) aurait rapporté 6.6 % p.a.",
      question: "Que dis-tu à Elena ?",
      options: [
        {
          key: "A",
          text: "3 ans c'est trop court – un fonds actif montre sa valeur à long terme. Continuer à tenir.",
        },
        {
          key: "B",
          text: "Actif est toujours moins bon – fondamentalement ne jamais recommander de fonds actifs",
        },
        {
          key: "C",
          text: "Le fonds actif a sous-performé l'indice de 2.4 % p.a. Des études montrent : plus de 70 % des fonds actifs ne battent pas leur indice après frais à long terme. L'ETF aurait été le choix moins cher et meilleur ici.",
        },
        {
          key: "D",
          text: "Elena devrait immédiatement changer – la performance passée est tout",
        },
      ],
      feedback:
        "Réalité : 70 à 80 % des fonds actifs sous-performent leur indice de référence après frais à long terme (étude SPIVA). Ici : 4.2 % vs 6.6 % = 2.4 % p.a. de moins. Sur 20 ans pour CHF 10'000, cela fait environ CHF 12'000 de différence. Elena devrait systématiquement intégrer les coûts dans ses décisions de placement.",
      merksatz:
        "Les coûts sont certains, la surperformance ne l'est pas. Un TER bas améliore le rendement net de manière fiable.",
    },
  },
  it: {
    "1.2": {
      situation:
        "Nuovo cliente Ben, 26 anni, ha sentito parlare dei fondi d'investimento per la prima volta. Chiede: «Come funziona esattamente – verso dei soldi e poi?»",
      question:
        "Cosa descrive correttamente il principio di base di un fondo d'investimento?",
      options: [
        {
          key: "A",
          text: "Un fondo è un conto risparmio con rendimento garantito, gestito dalla banca",
        },
        {
          key: "B",
          text: "Molti investitori mettono insieme il denaro, un gestore di fondi lo investe ampiamente diversificato – ogni investitore detiene quote proporzionali al suo apporto",
        },
        {
          key: "C",
          text: "I fondi sono accessibili solo agli investitori istituzionali con almeno CHF 100'000",
        },
        {
          key: "D",
          text: "Un fondo acquista solo azioni svizzere e distribuisce il guadagno annualmente",
        },
      ],
      feedback:
        "Fondo d'investimento = investimento collettivo. Principio: migliaia di investitori raggruppano il loro capitale. Un gestore di fondi professionista lo investe in un portafoglio diversificato. Ogni investitore detiene quote – se il fondo cresce, aumenta il valore delle quote. Giuridicamente: patrimonio separato, distinto dalla banca – protetto in caso di fallimento bancario.",
      merksatz:
        "Fondo = investimento collettivo. Patrimonio separato = protetto in caso di fallimento bancario.",
    },
    "1.3": {
      situation:
        "Elena esamina nel KID (documento d'informazioni chiave) di un fondo la classe di rischio. Vi è indicato: SRRI 6 (su una scala da 1 a 7). Elena ha 30 anni, tipo di rischio «equilibrato», orizzonte d'investimento 5 anni.",
      question: "Cosa significa SRRI 6 e questo fondo è adatto a Elena?",
      options: [
        {
          key: "A",
          text: "SRRI 6 è ad alto rischio – elevata volatilità. Per il profilo equilibrato di Elena è troppo rischioso",
        },
        {
          key: "B",
          text: "SRRI 6 è conservativo – il fondo investe principalmente in obbligazioni sicure",
        },
        {
          key: "C",
          text: "SRRI è solo un termine di marketing senza significato regolamentare",
        },
        {
          key: "D",
          text: "SRRI 6 si adatta bene a Elena – un investitore equilibrato può sempre scegliere tutte le classi di rischio",
        },
      ],
      feedback:
        "Lo SRRI (Synthetic Risk and Reward Indicator) misura la volatilità storica: scala da 1 (molto bassa) a 7 (molto alta). SRRI 6 = alta volatilità, probabilmente un fondo azionario/mercati emergenti. Per Elena («equilibrata»), SRRI 3–5 si adatta meglio. Raccomandare un fondo SRRI 6 a un investitore equilibrato sarebbe una violazione dell'adeguatezza LEFIN.",
      merksatz:
        "SRRI 1–7: più è alto, più è rischioso. Confrontare sempre con il profilo di rischio del cliente.",
    },
    "1.1": {
      situation:
        "Elena, 32 anni, vuole investire CHF 10'000 in un fondo d'investimento. Confronta: Fondo A (ETF passivo, TER 0.20 %) e Fondo B (fondo a gestione attiva, TER 1.80 %).",
      question:
        "Cosa significa TER e perché la differenza di costi è così grande dopo 20 anni?",
      options: [
        {
          key: "A",
          text: "Il TER è il rapporto di costi annuali totale. Grazie all'effetto degli interessi composti, l'1.6 % di differenza si accumula a circa CHF 6'800 dopo 20 anni",
        },
        {
          key: "B",
          text: "Il TER è una commissione di acquisto una tantum – conta solo al momento dell'acquisto",
        },
        {
          key: "C",
          text: "Il TER gioca poco ruolo per gli investimenti a lungo termine",
        },
        {
          key: "D",
          text: "Un TER più alto significa gestione attiva e quindi sempre un rendimento migliore",
        },
      ],
      feedback:
        "TER (Total Expense Ratio) = costi annuali totali in percentuale del patrimonio del fondo. L'1.6 % di differenza sembra piccolo – ma l'effetto degli interessi composti su 20 anni costa a Elena circa CHF 6'800 in più. Passivo = economico, perché non c'è un team di gestione attiva da pagare.",
      merksatz:
        "TER = costi annuali totali in %. Nel corso dei decenni ogni punto percentuale costa enormemente.",
    },
    "2.2": {
      situation:
        "Il sig. Leuthold investe CHF 20'000 nel Fondo X. Commissione di sottoscrizione: 3 %. Dopo 2 anni il fondo cresce dell'8 % e vuole vendere. Commissione di rimborso: 1 %.",
      question:
        "In che modo la commissione di sottoscrizione e quella di rimborso riducono il rendimento del sig. Leuthold?",
      options: [
        {
          key: "A",
          text: "Per nulla – le commissioni sono già incluse nel TER",
        },
        {
          key: "B",
          text: "Dimezzano il suo rendimento – dall'8 % a circa il 4 %",
        },
        {
          key: "C",
          text: "La commissione di sottoscrizione e quella di rimborso gli danno solo il 3.7 % invece dell'8 % – i costi di transazione assorbono più della metà del rendimento",
        },
        {
          key: "D",
          text: "Le commissioni sono rilevanti solo per periodi di detenzione brevi – su 2 anni non hanno alcun ruolo",
        },
      ],
      feedback:
        "La commissione di sottoscrizione (3 %) e quella di rimborso (1 %) sono costi di transazione, in aggiunta al TER. Si applicano una volta all'acquisto/vendita. Su un breve periodo di detenzione (2 anni) possono pesare fortemente sul rendimento. Risultato: il sig. Leuthold ottiene solo il 3.7 % sul suo capitale investito, sebbene il fondo sia cresciuto dell'8 %.",
      merksatz:
        "TER = costi ricorrenti. Commissione di sottoscrizione/rimborso = costi di transazione una tantum. Entrambi riducono il rendimento.",
    },
    "2.3": {
      situation:
        "Un consulente raccomanda alla sig.ra Albrecht due fondi: il Fondo A è conforme UCITS (domiciliato in Lussemburgo), il Fondo B è un fondo offshore non regolamentato dalle Isole Cayman con una strategia simile ma un rendimento più elevato.",
      question:
        "Qual è la differenza decisiva tra un fondo UCITS e il fondo offshore?",
      options: [
        {
          key: "A",
          text: "I fondi UCITS hanno sempre un rendimento più elevato – ecco perché sono migliori",
        },
        {
          key: "B",
          text: "Nessuna differenza sostanziale – entrambi sono verificati da regolatori",
        },
        {
          key: "C",
          text: "I fondi UCITS sono soggetti a rigide normative UE/SEE: diversificazione, liquidità, trasparenza, rimborso giornaliero. I fondi offshore non hanno questo quadro di protezione",
        },
        {
          key: "D",
          text: "I fondi offshore sono illegali – la sig.ra Albrecht non può acquistare un tale fondo",
        },
      ],
      feedback:
        "UCITS (Undertakings for Collective Investment in Transferable Securities) = quadro normativo UE. Obblighi: max. 10 % in un emittente, rimborso giornaliero al NAV, relazioni semestrali, KIID. I fondi offshore non regolamentati non hanno tale protezione. In Svizzera: la FINMA esamina i fondi esteri prima della distribuzione.",
      merksatz:
        "UCITS = quadro di protezione per gli investitori. Offshore = meno regolamentazione, più rischio.",
    },
    "2.1": {
      situation:
        "Il sig. Wagner, 58 anni, ha CHF 100'000 nello «Swiss Dividenden-Fonds» (distribuzione). Ogni anno riceve CHF 2'500, ma il corso del suo fondo cresce poco. Il suo amico ha lo stesso paniere di azioni nello «Swiss Wachstums-Fonds» (capitalizzazione) – il cui corso sale nettamente di più. Il sig. Wagner se ne stupisce.",
      question: "Perché il corso del fondo del sig. Wagner si evolve diversamente?",
      options: [
        {
          key: "A",
          text: "Il fondo del sig. Wagner è gestito peggio – dovrebbe cambiare immediatamente",
        },
        {
          key: "B",
          text: "Il fondo a capitalizzazione contiene altre azioni migliori",
        },
        {
          key: "C",
          text: "I fondi a distribuzione pagano i proventi → il corso del fondo cresce meno. I fondi a capitalizzazione reinvestono automaticamente → il corso sale di più (effetto degli interessi composti)",
        },
        {
          key: "D",
          text: "I fondi a dividendi sono fondamentalmente peggiori dei fondi di crescita",
        },
      ],
      feedback:
        "Distribuzione: i dividendi e gli interessi vengono pagati → il patrimonio del fondo diminuisce dell'importo distribuito → il corso cresce meno. Capitalizzazione: i proventi rimangono nel fondo e vengono reinvestiti → effetto degli interessi composti → il corso sale di più. Il rendimento totale è simile – solo la forma è diversa.",
      merksatz:
        "Distribuzione = provento pagato. Capitalizzazione = provento rimane nel fondo (interessi composti). Stesso portafoglio, evoluzione del corso diversa.",
    },
    "3.2": {
      situation:
        "L'analista Vera confronta due ETF sull'SMI: ETF Alpha (replica fisica, TER 0.10 %, Tracking Error 0.05 %) e ETF Beta (replica sintetica tramite swap, TER 0.07 %, Tracking Error 0.30 %). Vera spiega la differenza al suo cliente.",
      question:
        "Cosa significa il tracking error più alto dell'ETF Beta e qual è il rischio aggiuntivo?",
      options: [
        {
          key: "A",
          text: "Tracking error più alto = rendimento più alto. L'ETF Beta è quindi migliore",
        },
        {
          key: "B",
          text: "Il tracking error misura lo scostamento dall'indice. L'ETF Beta si discosta di più dall'SMI. Sintetico = rischio di controparte swap (in caso di default del partner swap, manca la copertura)",
        },
        {
          key: "C",
          text: "Il tracking error è rilevante solo per i fondi attivi – per gli ETF sempre 0 %",
        },
        {
          key: "D",
          text: "L'ETF Beta è più economico (TER 0.07 %) e quindi sempre la scelta migliore",
        },
      ],
      feedback:
        "Tracking error = deviazione standard della differenza di rendimento tra ETF e indice. Un TE alto significa: l'ETF replica l'indice in modo impreciso. Gli ETF sintetici utilizzano swap. Rischio: default della controparte. Per gli investitori conservatori: la replica fisica è più trasparente e sicura.",
      merksatz:
        "Tracking Error = scostamento dall'indice. Sintetico = rischio di controparte. Fisico = proprietà diretta.",
    },
    "3.3": {
      situation:
        "Il sig. Zimmermann ha un portafoglio: allocazione target 60 % azioni / 40 % obbligazioni. Attualmente, dopo un forte anno azionario: 75 % azioni / 25 % obbligazioni (valore totale CHF 200'000).",
      question:
        "Cos'è il ribilanciamento e cosa deve fare concretamente il sig. Zimmermann?",
      options: [
        {
          key: "A",
          text: "Il ribilanciamento è inutile – se le azioni sono salite, dovrebbe lasciare correre la quota",
        },
        {
          key: "B",
          text: "Deve vendere CHF 30'000 di azioni e investire in obbligazioni – ritorno all'allocazione target 60/40",
        },
        {
          key: "C",
          text: "Deve acquistare CHF 30'000 di nuove obbligazioni, senza vendere azioni",
        },
        {
          key: "D",
          text: "Il ribilanciamento significa vendere tutte le posizioni e riacquistarle",
        },
      ],
      feedback:
        "Ribilanciamento = ritorno all'allocazione target. Il sig. Zimmermann detiene il 75 % di azioni (CHF 150'000) invece del 60 % (CHF 120'000). Differenza: CHF 30'000. Vendere queste azioni e acquistare per CHF 30'000 obbligazioni → ritorno al 60/40. Senza ribilanciamento il portafoglio deriva continuamente verso un rischio più elevato.",
      merksatz:
        "Ribilanciamento = ripristinare l'allocazione target. Vendere ciò che ha performato bene, acquistare ciò che è rimasto indietro.",
    },
    "3.1": {
      situation:
        "Elena verifica i suoi fondi dopo 3 anni. Il suo fondo a gestione attiva (TER 1.5 %) ha reso il 4.2 % p.a. L'indice di riferimento (MSCI World) ha reso il 6.8 % p.a. Un ETF sullo stesso indice (TER 0.2 %) avrebbe portato il 6.6 % p.a.",
      question: "Cosa dici a Elena?",
      options: [
        {
          key: "A",
          text: "3 anni sono troppo pochi – un fondo attivo mostra il suo valore a lungo termine. Continuare a tenerlo.",
        },
        {
          key: "B",
          text: "Attivo è sempre peggio – in linea di principio non raccomandare mai fondi attivi",
        },
        {
          key: "C",
          text: "Il fondo attivo ha sottoperformato l'indice del 2.4 % p.a. Studi mostrano: oltre il 70 % dei fondi attivi non batte il proprio indice al netto delle commissioni a lungo termine. L'ETF sarebbe stata la scelta più economica e migliore.",
        },
        {
          key: "D",
          text: "Elena dovrebbe cambiare immediatamente – le performance passate sono tutto",
        },
      ],
      feedback:
        "Realtà: il 70–80 % dei fondi attivi sottoperforma il proprio indice di riferimento al netto delle commissioni a lungo termine (studio SPIVA). Qui: 4.2 % vs 6.6 % = 2.4 % p.a. in meno. Su 20 anni per CHF 10'000, questo fa circa CHF 12'000 di differenza. Elena dovrebbe sistematicamente integrare i costi nelle sue decisioni d'investimento.",
      merksatz:
        "I costi sono certi, la sovraperformance no. Un TER basso migliora il rendimento netto in modo affidabile.",
    },
  },
};
