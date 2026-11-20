import type { LangTranslations } from "./utils";

export const ANLAGEKUNDE_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      situation:
        "La cliente Rita Müller, 62 ans, prend sa retraite dans 3 ans. Elle a économisé CHF 150'000 et souhaite placer cette somme. Elle dit : «J'ai besoin de cet argent pour ma retraite – je ne peux pas me permettre de perdre.»",
      question: "Quelle classe de risque convient à Rita ?",
      options: [
        { key: "A", text: "Très petit / Petit – horizon court, préservation du capital prioritaire, aucune perte tolérable." },
        { key: "B", text: "Élevé – elle a suffisamment de temps" },
        { key: "C", text: "Moyen – compromis" },
        { key: "D", text: "Élevé – meilleur rendement possible" },
      ],
      feedback:
        "Horizon de placement court (3 ans) + préservation du capital comme objectif + aucune tolérance aux pertes = profil conservateur. Les actions ou placements risqués seraient inappropriés ici.",
    },
    "1.2": {
      situation:
        "Le client demande : «Je voudrais que vous gériez mon argent – je ne veux pas m'en occuper.»",
      question: "Qu'est-ce que la banque propose ?",
      options: [
        { key: "A", text: "Conseil en placement – la banque conseille, le client décide" },
        { key: "B", text: "Ouvrir un dépôt et trader soi-même" },
        { key: "C", text: "Compte d'épargne – plus sûr" },
        { key: "D", text: "Gestion de fortune – la banque agit pour le compte du client, le client n'a pas à prendre chaque décision lui-même." },
      ],
      feedback:
        "Gestion de fortune = la banque agit de façon autonome dans le cadre de la stratégie de placement convenue. Conseil en placement = la banque recommande, le client décide lui-même.",
    },
    "1.3": {
      situation:
        "Un nouveau client souhaite acheter des actions immédiatement. Vous ne lui avez pas encore expliqué les risques.",
      question: "Que faites-vous en premier ?",
      options: [
        { key: "A", text: "Acheter les actions directement – le client a signé le formulaire de mandat et confirme ainsi qu'il a été informé des risques." },
        { key: "B", text: "D'abord remettre la brochure «Risques particuliers dans le commerce de titres» et faire confirmer la réception. Ensuite établir le profil de l'investisseur." },
        { key: "C", text: "Expliquer les risques oralement et les documenter dans le CRM comme discutés – cela satisfait l'obligation de transparence de la LEFIN sans effort inutile." },
        { key: "D", text: "Consigner l'information sur les risques par écrit dans le procès-verbal de conseil – une brochure séparée n'est obligatoire que pour les dérivés complexes et les produits structurés." },
      ],
      feedback:
        "L'information sur les risques est l'obligation principale de la banque – avant toute recommandation de placement ! Remettre la brochure, faire confirmer la réception. En cas de violation de cette obligation, la banque est responsable.",
    },
    "1.4": {
      situation:
        "Le client appelle : «J'ai reçu des frais de dépôt de CHF 350. Je n'ai jamais accepté cela !» Dans le système, vous voyez : ouverture du dépôt il y a 6 mois, liste des prix remise et signée à l'ouverture.",
      question: "Comment procédez-vous ?",
      options: [
        { key: "A", text: "Vérifier le dossier, expliquer la structure des frais, examiner une solution à titre gracieux, proposer un modèle de compte moins coûteux si nécessaire." },
        { key: "B", text: "Créditer les frais immédiatement – le client est roi" },
        { key: "C", text: "Rejeter la réclamation – un contrat est un contrat" },
        { key: "D", text: "Escalader la réclamation au service interne des plaintes – pour les litiges sur les frais supérieurs à CHF 100, le protocole d'escalade est obligatoire." },
      ],
      feedback:
        "Traitement des réclamations : d'abord vérifier (la liste des prix a-t-elle été remise et signée ?), puis expliquer (quelles prestations les frais couvrent-ils ?), examiner une solution à titre gracieux et proposer une alternative. Un crédit immédiat sans vérification est tout aussi incorrect qu'un refus immédiat.",
    },
    "2.1": {
      situation:
        "Client, 35 ans, dit : «Je veux un rendement maximum mais si le cours baisse, je veux vendre immédiatement.»",
      question: "Qu'est-ce qui vous frappe ?",
      options: [
        { key: "A", text: "Contradiction : un rendement élevé exige un risque élevé et un horizon long. Vendre immédiatement en cas de perte ne correspond pas à une stratégie agressive." },
        { key: "B", text: "Tout est correct – rendement élevé et vente rapide est possible" },
        { key: "C", text: "Le client a raison – le timing est tout" },
        { key: "D", text: "Simplement recommander des obligations" },
      ],
      feedback:
        "La volonté de prendre des risques et la capacité à en prendre doivent correspondre. Qui vend immédiatement lors d'une baisse de cours n'a pas de réelle volonté de risque pour les actions. Le profil doit être adapté.",
    },
    "2.2": {
      situation: "Le profil de l'investisseur établi montre les valeurs suivantes :",
      question: "Quelle stratégie convient ?",
      options: [
        { key: "A", text: "100% actions – horizon long" },
        { key: "B", text: "100% obligations – sûr" },
        { key: "C", text: "Équilibré – mix d'actions et d'obligations adapté au profil de risque moyen." },
        { key: "D", text: "Tout en dépôt à terme" },
      ],
      feedback:
        "Profil de risque moyen = stratégie équilibrée. Mix d'actions (croissance) et d'obligations (stabilité). 100% actions serait trop agressif pour un profil moyen.",
    },
    "2.3": {
      situation: "Le client souhaite ouvrir un dépôt. Qu'est-ce qui est impérativement nécessaire avant le premier achat ?",
      question: "Qu'est-ce qui est impérativement nécessaire avant l'ouverture du dépôt ?",
      options: [
        { key: "A", text: "Seulement une pièce d'identité" },
        { key: "B", text: "Identification, profil de l'investisseur complété, directives de placement signées, brochure sur les risques remise." },
        { key: "C", text: "Seulement une signature" },
        { key: "D", text: "Rien – le dépôt peut être ouvert immédiatement" },
      ],
      feedback:
        "Avant l'ouverture du dépôt, indispensable : identification, profil de l'investisseur, directives de placement signées, brochure sur les risques remise. Seulement ensuite les titres peuvent être négociés.",
    },
    "2.4": {
      situation:
        "Un nouveau client (45 ans) vient pour un premier entretien de conseil en placement. Il dit : «J'ai CHF 200'000 – que dois-je acheter ?» Vous ne savez rien encore de sa situation personnelle.",
      question: "Que faites-vous en premier ?",
      options: [
        { key: "A", text: "Recommander des actions – avec CHF 200'000 et un horizon typiquement supérieur à 10 ans, un portefeuille de croissance avec 70% d'actions est l'option la plus rentable. Le profil peut être rempli en même temps que l'ordre d'achat." },
        { key: "B", text: "Ouvrir le dépôt immédiatement et constituer un portefeuille de départ équilibré – avec CHF 200'000 et un horizon manifestement à long terme, le profil 'moyen' est plausible. Le profil formel peut être complété au prochain rendez-vous." },
        { key: "C", text: "Recommander un compte 3a – fiscalement optimal et idéal pour cette somme. Avec CHF 200'000, le montant maximal de CHF 7'258 peut être réparti sur plusieurs comptes." },
        { key: "D", text: "Analyse de la situation : revenus, dépenses, engagements, horizon de placement, appétit pour le risque et prévoyance existante – ensuite seulement établir le profil de l'investisseur." },
      ],
      feedback:
        "Obligation LEFIN : Know Your Customer avant toute recommandation. Sans analyse complète de la situation, aucune stratégie adéquate ne peut être recommandée. Une recommandation de produit sans connaissance de la situation du client est une violation du devoir de diligence – indépendamment de la qualité des produits.",
    },
    "2.5": {
      situation:
        "La cliente demande : «Je pars la semaine prochaine en France – dois-je acheter des EUR maintenant ou attendre que le cours soit meilleur ?»",
      question: "Que répondez-vous ?",
      options: [
        { key: "A", text: "Acheter maintenant – l'EUR va sûrement monter" },
        { key: "B", text: "Attendre – le cours baisse toujours avant les jours fériés" },
        { key: "C", text: "Aucune prévision de cours possible – l'évolution des cours est imprévisible. Expliquer le cours acheteur/vendeur, montrer le cours actuel, laisser la décision au client." },
        { key: "D", text: "Conclure une opération à terme pour le montant du voyage" },
      ],
      feedback:
        "Les prévisions de cours sont à éviter (risque de responsabilité, aucune garantie). Le conseiller explique : cours vendeur = le client achète des devises, cours acheteur = le client vend des devises, spread = marge de la banque. L'opération à terme est disproportionnée pour de petits montants de voyage. La décision appartient au client.",
    },
    "3.1": {
      situation:
        "La cliente avait le profil «Conservateur». Son mari est décédé, elle hérite de CHF 800'000. Elle dit : «Maintenant je veux plus de rendement – j'ai plus d'argent.»",
      question: "Que faites-vous ?",
      options: [
        { key: "A", text: "Modifier immédiatement le profil en Agressif" },
        { key: "B", text: "Créer un nouveau profil de l'investisseur – la situation de vie a changé. Mais attention : plus de patrimoine augmente la capacité à prendre des risques, mais pas automatiquement la volonté. Discuter soigneusement." },
        { key: "C", text: "Tout investir en actions" },
        { key: "D", text: "Le profil reste le même" },
      ],
      feedback:
        "Les changements de vie nécessitent un nouveau profil de l'investisseur. Plus de patrimoine = capacité de risque objectivement plus élevée. Mais la volonté de prendre des risques est subjective – doit être discutée soigneusement. Ne jamais modifier automatiquement sans entretien.",
    },
    "3.2": {
      situation:
        "Le client se plaint : «Mon portefeuille a perdu 30%. Vous ne m'avez jamais expliqué ça !» Vous trouvez : la brochure sur les risques a été remise mais le profil de l'investisseur n'a jamais été établi.",
      question: "Quel est le problème ?",
      options: [
        { key: "A", text: "Pas de problème immédiat – la brochure a été remise et les risques ont été expliqués oralement. Cela suffit pour une documentation conforme à la LEFIN." },
        { key: "B", text: "Une perte de 30% est habituelle pour une stratégie de croissance. Sans preuve d'un comportement fautif, il n'y a pas de cas de responsabilité." },
        { key: "C", text: "Le client est responsable – il a lui-même choisi la stratégie et signé le document d'information. La banque a agi de bonne foi." },
        { key: "D", text: "Le profil de l'investisseur est manquant – la banque a violé son devoir de diligence. Le client peut réclamer des dommages-intérêts. Sans profil, il est impossible de prouver que la stratégie convenait au client." },
      ],
      feedback:
        "La brochure seule ne suffit pas ! Le profil de l'investisseur est obligatoire. Sans profil, la banque ne peut pas prouver que la stratégie était appropriée. En cas de violation d'une obligation, la banque est responsable des pertes.",
    },
    "3.3": {
      situation:
        "Lors du conseil en placement, le conseiller recommande l'action X. Le client achète et perd CHF 50'000. Lors de la gestion de fortune, la banque achète l'action X sans consultation. Les deux perdent autant.",
      question: "Où la banque est-elle plus responsable ?",
      options: [
        { key: "A", text: "Les deux pareillement" },
        { key: "B", text: "Conseil en placement – la banque a recommandé, donc elle est plus responsable" },
        { key: "C", text: "Gestion de fortune – la banque a agi de façon autonome sans consultation. Devoir de diligence plus élevé." },
        { key: "D", text: "Aucune responsabilité dans les deux cas" },
      ],
      feedback:
        "Dans la gestion de fortune, la banque agit de façon autonome – devoir de diligence plus élevé et risque de responsabilité plus grand. Dans le conseil en placement, c'est finalement le client qui décide lui-même.",
    },
  },
  it: {
    "1.1": {
      situation:
        "La cliente Rita Müller, 62 anni, andrà in pensione tra 3 anni. Ha risparmiato CHF 150'000 e desidera investire il denaro. Dice: «Ho bisogno di questi soldi per la mia pensione – non posso permettermi di perderli.»",
      question: "Quale classe di rischio è adatta a Rita?",
      options: [
        { key: "A", text: "Molto piccolo / Piccolo – orizzonte breve, conservazione del capitale prioritaria, nessuna perdita tollerabile." },
        { key: "B", text: "Alto – ha tempo a sufficienza" },
        { key: "C", text: "Medio – compromesso" },
        { key: "D", text: "Elevato – rendimento migliore possibile" },
      ],
      feedback:
        "Orizzonte di investimento breve (3 anni) + conservazione del capitale come obiettivo + nessuna tolleranza alle perdite = profilo conservativo. Azioni o investimenti rischiosi sarebbero inappropriati qui.",
    },
    "1.2": {
      situation:
        "Il cliente chiede: «Vorrei che lei gestisse i miei soldi – non voglio occuparmene.»",
      question: "Cosa offre la banca?",
      options: [
        { key: "A", text: "Consulenza d'investimento – la banca consiglia, il cliente decide" },
        { key: "B", text: "Aprire un deposito e fare trading autonomamente" },
        { key: "C", text: "Conto di risparmio – più sicuro" },
        { key: "D", text: "Gestione patrimoniale – la banca agisce per conto del cliente, il cliente non deve prendere ogni decisione da solo." },
      ],
      feedback:
        "Gestione patrimoniale = la banca agisce autonomamente nel quadro della strategia d'investimento concordata. Consulenza d'investimento = la banca raccomanda, il cliente decide autonomamente.",
    },
    "1.3": {
      situation:
        "Un nuovo cliente vuole acquistare azioni immediatamente. Non gli hai ancora spiegato i rischi.",
      question: "Cosa fai prima?",
      options: [
        { key: "A", text: "Acquistare le azioni direttamente – il cliente ha firmato il modulo d'ordine e conferma così di essere stato informato sui rischi." },
        { key: "B", text: "Prima consegnare la brochure «Rischi particolari nel commercio di titoli» e far confermare la ricezione. Poi creare il profilo dell'investitore." },
        { key: "C", text: "Spiegare i rischi verbalmente e documentarli nel CRM come discussi – questo soddisfa l'obbligo di trasparenza della LSerFi senza sforzo inutile." },
        { key: "D", text: "Annotare le informazioni sui rischi per iscritto nel verbale di consulenza – una brochure separata è obbligatoria solo per derivati complessi e prodotti strutturati." },
      ],
      feedback:
        "L'informazione sui rischi è l'obbligo principale della banca – prima di qualsiasi raccomandazione d'investimento! Consegnare la brochure, far confermare la ricezione. In caso di violazione di questo obbligo, la banca è responsabile.",
    },
    "1.4": {
      situation:
        "Il cliente chiama: «Ho ricevuto una commissione di deposito di CHF 350. Non l'ho mai concordato!» Nel sistema vedi: apertura del deposito 6 mesi fa, listino prezzi consegnato e firmato all'apertura.",
      question: "Come procedi?",
      options: [
        { key: "A", text: "Verificare il caso, spiegare la struttura delle commissioni, esaminare una soluzione a titolo di cortesia, mostrare un modello di conto meno costoso se necessario." },
        { key: "B", text: "Accreditare immediatamente la commissione – il cliente è re" },
        { key: "C", text: "Rifiutare il reclamo – un contratto è un contratto" },
        { key: "D", text: "Escalare il reclamo alla gestione interna dei reclami – per controversie sulle commissioni superiori a CHF 100 è prescritto il protocollo di escalation." },
      ],
      feedback:
        "Gestione dei reclami: prima verificare (il listino prezzi è stato consegnato e firmato?), poi spiegare (quali prestazioni coprono le commissioni?), esaminare una soluzione a titolo di cortesia e mostrare un'alternativa. Un accredito immediato senza verifica è altrettanto sbagliato quanto un rifiuto immediato.",
    },
    "2.1": {
      situation:
        "Cliente, 35 anni, dice: «Voglio il rendimento massimo ma se il corso scende, voglio vendere immediatamente.»",
      question: "Cosa noti?",
      options: [
        { key: "A", text: "Contraddizione: un rendimento elevato richiede un rischio elevato e un orizzonte lungo. Vendere immediatamente in caso di perdita non è compatibile con una strategia aggressiva." },
        { key: "B", text: "Tutto corretto – rendimento elevato e vendita rapida è possibile" },
        { key: "C", text: "Il cliente ha ragione – il timing è tutto" },
        { key: "D", text: "Semplicemente raccomandare obbligazioni" },
      ],
      feedback:
        "La propensione al rischio e la capacità di rischio devono corrispondere. Chi vende immediatamente in caso di ribasso non ha una reale propensione al rischio per le azioni. Il profilo deve essere adattato.",
    },
    "2.2": {
      situation: "Il profilo dell'investitore creato mostra i seguenti valori:",
      question: "Quale strategia è adatta?",
      options: [
        { key: "A", text: "100% azioni – orizzonte lungo" },
        { key: "B", text: "100% obbligazioni – sicuro" },
        { key: "C", text: "Bilanciato – mix di azioni e obbligazioni adatto al profilo di rischio medio." },
        { key: "D", text: "Tutto in deposito a termine" },
      ],
      feedback:
        "Profilo di rischio medio = strategia bilanciata. Mix di azioni (crescita) e obbligazioni (stabilità). 100% azioni sarebbe troppo aggressivo per un profilo medio.",
    },
    "2.3": {
      situation: "Il cliente vuole aprire un deposito. Cosa è indispensabile prima del primo acquisto?",
      question: "Cosa è indispensabile prima dell'apertura del deposito?",
      options: [
        { key: "A", text: "Solo documento d'identità" },
        { key: "B", text: "Identificazione, profilo dell'investitore compilato, direttive d'investimento firmate, brochure sui rischi consegnata." },
        { key: "C", text: "Solo firma" },
        { key: "D", text: "Niente – il deposito può essere aperto immediatamente" },
      ],
      feedback:
        "Prima dell'apertura del deposito, indispensabile: identificazione, profilo dell'investitore, direttive d'investimento firmate, brochure sui rischi consegnata. Solo allora possono essere negoziati titoli.",
    },
    "2.4": {
      situation:
        "Un nuovo cliente (45 anni) viene per un primo colloquio di consulenza d'investimento. Dice: «Ho CHF 200'000 – cosa devo comprare?» Non sai ancora nulla della sua situazione personale.",
      question: "Cosa fai prima?",
      options: [
        { key: "A", text: "Raccomandare azioni – con CHF 200'000 e un orizzonte tipicamente superiore a 10 anni, un portafoglio di crescita con 70% di azioni è l'opzione con il rendimento più alto. Il profilo può essere compilato insieme all'ordine d'acquisto." },
        { key: "B", text: "Aprire subito il deposito e costituire un portafoglio iniziale bilanciato – con CHF 200'000 e un orizzonte chiaramente a lungo termine, il profilo 'medio' è plausibile. Il profilo formale può essere recuperato al prossimo appuntamento." },
        { key: "C", text: "Raccomandare un conto 3a – fiscalmente ottimale e ideale per questa somma. Con CHF 200'000, l'importo massimo di CHF 7'258 può essere distribuito su più conti." },
        { key: "D", text: "Analisi della situazione: entrate, uscite, impegni, orizzonte d'investimento, propensione al rischio e previdenza esistente – solo allora creare il profilo dell'investitore." },
      ],
      feedback:
        "Obbligo LSerFi: Know Your Customer prima di qualsiasi raccomandazione. Senza un'analisi completa della situazione, non può essere raccomandata alcuna strategia adeguata. Una raccomandazione di prodotto senza conoscenza della situazione del cliente è una violazione del dovere di diligenza.",
    },
    "2.5": {
      situation:
        "La cliente chiede: «La settimana prossima vado in Francia – devo comprare EUR adesso o aspettare che il corso sia migliore?»",
      question: "Cosa rispondi?",
      options: [
        { key: "A", text: "Comprare adesso – l'EUR salirà certamente" },
        { key: "B", text: "Aspettare – il corso scende sempre prima dei giorni festivi" },
        { key: "C", text: "Nessuna previsione di corso possibile – l'andamento del corso è imprevedibile. Spiegare il corso lettera/denaro, mostrare il corso attuale, lasciare la decisione al cliente." },
        { key: "D", text: "Concludere un'operazione a termine per l'importo del viaggio" },
      ],
      feedback:
        "Le previsioni di corso sono da evitare (rischio di responsabilità, nessuna garanzia). Il consulente spiega: corso lettera = il cliente acquista valute, corso denaro = il cliente vende valute, spread = margine della banca. L'operazione a termine è sproporzionata per piccoli importi di viaggio. La decisione spetta al cliente.",
    },
    "3.1": {
      situation:
        "La cliente aveva il profilo «Conservativo». Il marito è deceduto, eredita CHF 800'000. Dice: «Ora voglio più rendimento – ho più soldi.»",
      question: "Cosa fai?",
      options: [
        { key: "A", text: "Modificare immediatamente il profilo in Aggressivo" },
        { key: "B", text: "Creare un nuovo profilo dell'investitore – la situazione di vita è cambiata. Ma attenzione: più patrimonio aumenta la capacità di rischio, ma non automaticamente la propensione. Discutere attentamente." },
        { key: "C", text: "Investire tutto in azioni" },
        { key: "D", text: "Il profilo rimane lo stesso" },
      ],
      feedback:
        "I cambiamenti di vita richiedono un nuovo profilo dell'investitore. Più patrimonio = capacità di rischio oggettivamente maggiore. Ma la propensione al rischio è soggettiva – deve essere discussa attentamente. Non modificare mai automaticamente senza colloquio.",
    },
    "3.2": {
      situation:
        "Il cliente si lamenta: «Il mio portafoglio ha perso il 30%. Non me l'ha mai spiegato così!» Trovi: la brochure sui rischi è stata consegnata ma il profilo dell'investitore non è mai stato compilato.",
      question: "Qual è il problema?",
      options: [
        { key: "A", text: "Nessun problema immediato – la brochure è stata consegnata e i rischi sono stati spiegati verbalmente. Questo è sufficiente per una documentazione conforme alla LSerFi." },
        { key: "B", text: "Una perdita del 30% è normale per una strategia di crescita. Senza prova di comportamento scorretto, non vi è un caso di responsabilità." },
        { key: "C", text: "Il cliente è responsabile – ha scelto lui stesso la strategia e ha firmato il documento informativo. La banca ha agito in buona fede." },
        { key: "D", text: "Il profilo dell'investitore è mancante – la banca ha violato il dovere di diligenza. Il cliente può richiedere un risarcimento danni. Senza profilo, non è possibile dimostrare che la strategia era adatta al cliente." },
      ],
      feedback:
        "La sola brochure non è sufficiente! Il profilo dell'investitore è obbligatorio. Senza profilo, la banca non può dimostrare che la strategia era appropriata. In caso di violazione di un obbligo, la banca è responsabile delle perdite.",
    },
    "3.3": {
      situation:
        "Nella consulenza d'investimento, il consulente raccomanda l'azione X. Il cliente acquista e perde CHF 50'000. Nella gestione patrimoniale, la banca acquista l'azione X senza consultazione. Entrambi perdono uguale.",
      question: "Dove la banca è più responsabile?",
      options: [
        { key: "A", text: "Entrambi ugualmente" },
        { key: "B", text: "Consulenza d'investimento – la banca ha raccomandato, quindi è più responsabile" },
        { key: "C", text: "Gestione patrimoniale – la banca ha agito autonomamente senza consultazione. Dovere di diligenza più elevato." },
        { key: "D", text: "Nessuna responsabilità in entrambi i casi" },
      ],
      feedback:
        "Nella gestione patrimoniale, la banca agisce autonomamente – dovere di diligenza più elevato e rischio di responsabilità maggiore. Nella consulenza d'investimento, alla fine è il cliente stesso a decidere.",
    },
  },
};
