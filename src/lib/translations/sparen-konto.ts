import type { LangTranslations } from "./utils";

export const SPAREN_KONTO_TRANSLATIONS: LangTranslations = {
  fr: {
    "1.1": {
      situation:
        "M. Müller, 26 ans, vient à l'agence. Depuis 3 ans, il a CHF 800 par mois sur son compte privé. Il dit : « Je n'en ai en fait pas besoin – l'argent dort là. »",
      question: "Que recommandes-tu à M. Müller ?",
      options: [
        { key: "A", text: "Ne rien changer – le compte privé est le plus flexible" },
        { key: "B", text: "Ouvrir un compte épargne – intérêt plus élevé pour l'argent inutilisé" },
        { key: "C", text: "Tout investir immédiatement en actions" },
        { key: "D", text: "Ouvrir un compte 3a" },
      ],
      feedback:
        "L'argent inutilisé à long terme doit aller sur un compte épargne. L'intérêt est plus élevé que sur le compte privé, car la banque peut planifier avec des conditions de retrait plus restrictives.",
    },
    "1.2": {
      situation:
        "Une cliente, 23 ans, a loué son premier appartement. Loyer mensuel CHF 1'200. Le bailleur exige une caution.",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "Ouvrir un compte de garantie de loyer pour 2–3 mois de loyer" },
        { key: "B", text: "Remettre l'argent en espèces au bailleur" },
        { key: "C", text: "Mettre l'argent sur un compte épargne" },
        { key: "D", text: "La caution est facultative" },
      ],
      feedback:
        "Caution locative max. 3 mois de loyer (CHF 3'600). Compte spécial au nom de la locataire, mis en gage au bailleur. Seules les deux parties peuvent en disposer conjointement.",
    },
    "1.3": {
      situation:
        "Un client demande : « Pourquoi mon compte épargne me rapporte 0,4 % mais mon compte privé seulement 0,1 % ? »",
      question: "Que réponds-tu ?",
      options: [
        { key: "A", text: "« Parce que la banque utilise les dépôts d'épargne pour les hypothèques et peut répercuter le surplus »" },
        { key: "B", text: "« C'est une obligation légale – les dépôts d'épargne doivent être rémunérés en priorité »" },
        { key: "C", text: "« Moins de transactions signifient des frais de gestion plus bas – tu en profites sous forme d'avantage de taux »" },
        { key: "D", text: "« Plus la banque peut disposer longtemps de ton argent, plus les intérêts sont élevés – le compte épargne a des limites de retrait plus strictes »" },
      ],
      feedback:
        "Les intérêts et les conditions de retrait sont directement liés. Compte épargne = intérêt plus élevé, limites plus strictes. Compte privé = intérêt plus bas, haute disponibilité.",
    },
    "1.4": {
      situation:
        "Mme Weber, 35 ans, souhaite ouvrir un compte pour sa fille Lena, 8 ans. Elle demande : « Quel compte est le plus judicieux pour les enfants ? »",
      question: "Que recommandes-tu ?",
      options: [
        { key: "A", text: "Compte privé au nom de la mère – ainsi elle garde le plein contrôle" },
        { key: "B", text: "Compte épargne jeunesse au nom de Lena – intérêt plus élevé, les parents ont les droits de disposition jusqu'à 18 ans" },
        { key: "C", text: "Compte épargne au nom de la mère, Lena désignée bénéficiaire" },
        { key: "D", text: "Plan d'épargne en fonds, car les intérêts sont trop bas pour les enfants" },
      ],
      feedback:
        "Compte épargne jeunesse au nom de l'enfant : De nombreuses banques proposent des comptes enfants/jeunes avec un taux d'intérêt préférentiel. Le compte appartient à l'enfant, les parents sont les représentants légaux jusqu'à la majorité. À partir de 18 ans, l'enfant prend automatiquement les droits de disposition.",
    },
    "1.5": {
      situation:
        "Le client Lars veut savoir : « Que se passe-t-il avec mes économies si la banque fait faillite ? »",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "« Les avoirs bancaires ne sont pas assurés – le risque est entièrement supporté par le client »" },
        { key: "B", text: "« La Banque nationale garantit tous les dépôts d'épargne sans limite »" },
        { key: "C", text: "« La garantie des dépôts (esisuisse) protège CHF 100'000 par client et par banque – au-delà, il y a un risque de perte »" },
        { key: "D", text: "« Seuls les comptes épargne sont protégés, pas les comptes privés »" },
      ],
      feedback:
        "Garantie des dépôts esisuisse : jusqu'à CHF 100'000 par client et par banque sont privilégiés. En cas de liquidation, ceux-ci sont servis en premier. Les montants supérieurs à CHF 100'000 ne sont pas garantis. Recommandation : Répartir au-delà de CHF 100'000 sur plusieurs banques.",
    },
    "2.1": {
      situation:
        "Mme Berger souhaite solder son compte épargne. Tu vois : solde CHF 4'200, facture de carte de crédit ouverte CHF 340, ordre permanent en attente CHF 150 demain.",
      question: "Que fais-tu ?",
      options: [
        { key: "A", text: "Vérifier et clarifier d'abord tous les postes en attente" },
        { key: "B", text: "Solder immédiatement" },
        { key: "C", text: "Verser uniquement le solde restant" },
        { key: "D", text: "Verser immédiatement CHF 4'200 – la facture de carte de crédit et l'ordre permanent seront traités automatiquement dans la prochaine période de traitement." },
      ],
      feedback:
        "Avant de solder : vérifier tous les ordres en attente, les factures de carte de crédit ouvertes et les ordres permanents. Puis dissoudre le compte. Créditer les intérêts, débiter les frais.",
    },
    "2.2": {
      situation:
        "Client : « J'ai reçu CHF 100 d'intérêts mais seulement CHF 65 ont été crédités. Que sont devenus CHF 35 ? »",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "« C'est un frais bancaire »" },
        { key: "B", text: "« Impôt anticipé 35 % – va à l'administration fiscale, récupérable via la déclaration d'impôts »" },
        { key: "C", text: "« C'est une erreur »" },
        { key: "D", text: "« Non récupérable »" },
      ],
      feedback:
        "Impôt anticipé = 35 % du taux brut, directement à l'administration fiscale. Le client reçoit l'intérêt net (65 %). Celui qui déclare correctement les intérêts récupère les 35 %.",
    },
    "2.3": {
      situation:
        "Un client a quitté son emploi : « Puis-je transférer l'argent LPP sur mon compte privé ? »",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "« Oui, directement sur le compte privé »" },
        { key: "B", text: "« Verser immédiatement dans le 3a »" },
        { key: "C", text: "« L'argent LPP est perdu en cas de démission »" },
        { key: "D", text: "« Non – doit aller sur un compte de libre passage jusqu'au nouvel employeur »" },
      ],
      feedback:
        "Avoir LPP → compte de libre passage → nouvelle caisse de pension. Le compte est bloqué. Retrait anticipé uniquement sous conditions spéciales (logement, émigration, indépendance).",
    },
    "2.4": {
      situation:
        "M. Keller, 72 ans, veut donner une procuration pour son compte épargne à sa fille (48 ans). Il demande : « Que peut-elle faire avec le compte ? »",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "« Avec la procuration, la fille peut retirer de l'argent, effectuer des virements et consulter les relevés – mais elle ne peut pas ouvrir de nouveaux comptes ni clôturer le compte »" },
        { key: "B", text: "« Une procuration donne à la fille les mêmes droits que le titulaire du compte – elle peut tout faire, y compris clôturer le compte »" },
        { key: "C", text: "« Les procurations pour comptes privés sont possibles, mais légalement interdites pour les comptes épargne »" },
        { key: "D", text: "« La procuration expire automatiquement si M. Keller tombe malade ou décède »" },
      ],
      feedback:
        "Procuration bancaire : La mandataire peut disposer dans le cadre des droits accordés (retraits, virements, renseignements). La clôture, l'ouverture et la modification du titulaire restent réservées au titulaire. La procuration prend fin au décès. En cas d'incapacité de discernement, elle reste en principe valable – sauf si le compte est placé sous curatelle.",
    },
    "2.5": {
      situation:
        "La jeune cliente Mia, 21 ans, a dépassé de CHF 230 son compte privé. La banque a débité CHF 12 d'intérêts de découvert. Mia est surprise : « Je pensais pouvoir brièvement passer en négatif ? »",
      question: "Que lui expliques-tu ?",
      options: [
        { key: "A", text: "« Les dépassements de compte sont toujours gratuits chez nous – les CHF 12 sont une erreur, nous corrigeons cela »" },
        { key: "B", text: "« Les comptes privés ne peuvent pas être dépassés – nous bloquons le compte immédiatement »" },
        { key: "C", text: "« Les découverts courts sont tolérés, mais facturés avec des intérêts élevés – c'est un crédit coûteux. Besoin durable → mieux vaut demander une limite de découvert »" },
        { key: "D", text: "« Seuls les comptes jeunesse sont facturés d'intérêts de découvert – pas les comptes adultes »" },
      ],
      feedback:
        "Dépassement de compte = crédit non planifié à taux élevé (souvent 10–15 % p.a.). CHF 12 sur CHF 230 semble peu, mais cela représente plus de 5 % pour quelques jours. Pour ceux qui sont régulièrement à court : la limite de découvert est moins chère. Encore mieux : constituer une réserve tampon sur un compte épargne.",
    },
    "3.1": {
      briefing:
        "La cliente Sabine, 32 ans, verse CHF 200 par mois dans le 3a. Elle a déjà CHF 52'000 sur un compte 3a.",
      question: "Le montant maximum 3a 2026 est CHF ___ par an.",
      feedback:
        "Montant maximum 3a 2026 : CHF 7'258/an (CHF 604.80/mois). Sabine ne verse que CHF 2'400 – elle perd CHF 4'858 d'économies d'impôts. À partir de CHF 50'000, recommander un deuxième compte pour des retraits échelonnés.",
    },
    "3.2": {
      situation:
        "Client : « J'ai oublié de cotiser à mon 3a en 2025. L'argent est perdu ? »",
      question: "Que réponds-tu ?",
      options: [
        { key: "A", text: "« À partir de 2026, les lacunes peuvent être comblées – mais seulement une fois le montant maximum actuel épuisé »" },
        { key: "B", text: "« Oui malheureusement – ce n'est plus possible »" },
        { key: "C", text: "« Il suffit de verser un montant supplémentaire »" },
        { key: "D", text: "« Seuls les indépendants peuvent effectuer des versements rétroactifs »" },
      ],
      feedback:
        "Nouveau à partir de 2026 : les lacunes de cotisation à partir de 2025 peuvent être comblées rétroactivement. Condition : le montant maximum actuel doit d'abord être épuisé. Les lacunes avant 2025 ne sont pas possibles.",
    },
    "3.3": {
      briefing:
        "Une cliente a CHF 180'000 sur un compte épargne. Elle demande nerveusement : « Mon argent est-il en sécurité ? »",
      question: "La garantie des dépôts protège CHF ___ par client et par banque.",
      feedback:
        "La garantie des dépôts protège CHF 100'000 par client et par banque. CHF 80'000 ne sont pas protégés. Recommandation : répartir les montants supérieurs à CHF 100'000 sur plusieurs banques.",
    },
    "3.4": {
      situation:
        "Cliente Petra, 58 ans, a CHF 420'000 sur un compte épargne à la Banque Cantonale. Elle demande : « Combien est protégé chez vous ? Et que dois-je faire avec le reste ? »",
      question: "Que recommandes-tu concrètement à Petra ?",
      options: [
        { key: "A", text: "« Tout est protégé – les banques cantonales ont une garantie de l'État, illimitée »" },
        { key: "B", text: "« CHF 100'000 sont garantis par esisuisse. Les CHF 320'000 restants ne sont pas garantis en cas de faillite. Recommandation : répartir les montants sur 2–3 banques différentes »" },
        { key: "C", text: "« Rien n'est garanti – les avoirs bancaires sont des créances sans priorité »" },
        { key: "D", text: "« CHF 100'000 sont garantis. Convertir immédiatement le reste en obligations – elles ne sont pas concernées par la faillite bancaire »" },
      ],
      feedback:
        "Banques cantonales : La plupart (pas toutes) ont une garantie de l'État – dans ce cas, les dépôts sont effectivement protégés au-delà de CHF 100'000. Mais toutes les banques cantonales n'ont pas de garantie d'État (p.ex. Banque Cantonale Bernoise, Banque Cantonale Genevoise). En cas de doute, la répartition est plus sûre. Important : esisuisse s'applique à toutes les banques, la garantie d'État uniquement à certaines banques cantonales.",
    },
    "3.5": {
      briefing:
        "La cliente Silvia, 45 ans, reçoit CHF 85'000 de prestation de libre passage de son ancienne caisse de pension suite à un changement d'emploi. Elle te demande : « Que se passe-t-il si je ne transfère pas l'argent à temps sur un compte de libre passage ? »",
      question: "Si la prestation de libre passage n'est pas annoncée, la caisse de pension transfère l'argent à l'___.",
      answer: "institution supplétive",
      feedback:
        "Si on ne communique pas à l'ancienne caisse de pension où envoyer l'argent, elle le transfère à l'Institution supplétive LPP (fondation nationale de recueil). L'argent n'est pas perdu, mais les frais de gestion sont plus élevés et les intérêts plus bas. Recommandation : ouvrir un compte de libre passage auprès d'une banque et communiquer le numéro à la caisse de pension – avant la sortie.",
    },
  },
  it: {
    "1.1": {
      situation:
        "Il sig. Müller, 26 anni, viene in filiale. Da 3 anni ha CHF 800 al mese sul conto privato. Dice: «In realtà non ho bisogno di quei soldi – sono lì fermi.»",
      question: "Cosa consigli al sig. Müller?",
      options: [
        { key: "A", text: "Non cambiare nulla – il conto privato è il più flessibile" },
        { key: "B", text: "Aprire un conto risparmio – interesse più alto per i soldi non utilizzati" },
        { key: "C", text: "Investire subito tutto in azioni" },
        { key: "D", text: "Aprire un conto 3a" },
      ],
      feedback:
        "I soldi non utilizzati a lungo termine vanno su un conto risparmio. L'interesse è più alto rispetto al conto privato, perché la banca può pianificare con condizioni di prelievo più restrittive.",
    },
    "1.2": {
      situation:
        "Una cliente, 23 anni, ha affittato il primo appartamento. Affitto mensile CHF 1'200. Il padrone di casa richiede una cauzione.",
      question: "Cosa le spieghi?",
      options: [
        { key: "A", text: "Aprire un conto deposito cauzione locativa per 2–3 mensilità" },
        { key: "B", text: "Consegnare i soldi in contanti al padrone di casa" },
        { key: "C", text: "Mettere i soldi su un conto risparmio" },
        { key: "D", text: "La cauzione è facoltativa" },
      ],
      feedback:
        "Cauzione locativa max. 3 mensilità (CHF 3'600). Conto speciale a nome dell'inquilina, pignorato al padrone di casa. Solo entrambe le parti possono disporne congiuntamente.",
    },
    "1.3": {
      situation:
        "Un cliente chiede: «Perché sul mio conto risparmio ricevo lo 0,4% di interessi ma sul conto privato solo lo 0,1%?»",
      question: "Cosa rispondi?",
      options: [
        { key: "A", text: "«Perché la banca utilizza i depositi di risparmio per i mutui e può trasferire il rendimento aggiuntivo»" },
        { key: "B", text: "«È una disposizione di legge – i depositi di risparmio devono essere remunerati in via preferenziale»" },
        { key: "C", text: "«Meno transazioni significa minori costi di gestione – ne benefici come vantaggio di interesse»" },
        { key: "D", text: "«Più a lungo la banca può disporre del tuo denaro, maggiori sono gli interessi – il conto risparmio ha limiti di prelievo più stretti»" },
      ],
      feedback:
        "Interessi e condizioni di prelievo sono direttamente collegati. Conto risparmio = interesse più alto, limiti più stretti. Conto privato = interesse più basso, alta disponibilità.",
    },
    "1.4": {
      situation:
        "La sig.ra Weber, 35 anni, vuole aprire un conto per sua figlia Lena, 8 anni. Chiede: «Quale conto è più adatto per i bambini?»",
      question: "Cosa consigli?",
      options: [
        { key: "A", text: "Conto privato a nome della madre – così mantiene il pieno controllo" },
        { key: "B", text: "Conto risparmio giovani a nome di Lena – interesse più alto, i genitori hanno i diritti di disposizione fino a 18 anni" },
        { key: "C", text: "Conto risparmio a nome della madre, Lena designata beneficiaria" },
        { key: "D", text: "Piano di risparmio in fondi, perché gli interessi sono troppo bassi per i bambini" },
      ],
      feedback:
        "Conto risparmio giovani a nome del bambino: Molte banche offrono conti bambini/giovani con un tasso d'interesse preferenziale. Il conto appartiene al bambino, i genitori sono i rappresentanti legali fino alla maggiore età. A partire dai 18 anni, il bambino assume automaticamente i diritti di disposizione.",
    },
    "1.5": {
      situation:
        "Il cliente Lars vuole sapere: «Cosa succede ai miei risparmi se la banca fallisce?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«I depositi bancari non sono assicurati – il rischio è interamente a carico del cliente»" },
        { key: "B", text: "«La Banca nazionale garantisce tutti i depositi di risparmio senza limite»" },
        { key: "C", text: "«La garanzia dei depositi (esisuisse) protegge CHF 100'000 per cliente e per banca – oltre tale importo sussiste un rischio di perdita»" },
        { key: "D", text: "«Solo i conti risparmio sono protetti, non i conti privati»" },
      ],
      feedback:
        "Garanzia dei depositi esisuisse: fino a CHF 100'000 per cliente e per banca sono privilegiati. In caso di liquidazione, questi vengono soddisfatti per primi. Gli importi superiori a CHF 100'000 non sono garantiti. Raccomandazione: Ripartire oltre CHF 100'000 su più banche.",
    },
    "2.1": {
      situation:
        "La sig.ra Berger vuole estinguere il suo conto risparmio. Vedi: saldo CHF 4'200, fattura carta di credito aperta CHF 340, ordine permanente in sospeso CHF 150 domani.",
      question: "Cosa fai?",
      options: [
        { key: "A", text: "Verificare e chiarire prima tutti i documenti in sospeso" },
        { key: "B", text: "Estinguere immediatamente" },
        { key: "C", text: "Versare solo il saldo residuo" },
        { key: "D", text: "Versare immediatamente CHF 4'200 – la fattura carta di credito e l'ordine permanente verranno elaborati automaticamente nel prossimo periodo di elaborazione." },
      ],
      feedback:
        "Prima di estinguere: verificare tutti gli ordini in sospeso, le fatture aperte della carta di credito e gli ordini permanenti. Poi sciogliere il conto. Accreditare gli interessi, addebitare le spese.",
    },
    "2.2": {
      situation:
        "Cliente: «Ho ricevuto CHF 100 di interessi ma ne sono stati accreditati solo CHF 65. Dove sono finiti CHF 35?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«È una commissione bancaria»" },
        { key: "B", text: "«Imposta preventiva 35% – va all'amministrazione fiscale, recuperabile tramite la dichiarazione fiscale»" },
        { key: "C", text: "«È un errore»" },
        { key: "D", text: "«Non recuperabile»" },
      ],
      feedback:
        "Imposta preventiva = 35% del tasso lordo, direttamente all'amministrazione fiscale. Il cliente riceve l'interesse netto (65%). Chi dichiara correttamente gli interessi recupera il 35%.",
    },
    "2.3": {
      situation:
        "Un cliente ha lasciato il lavoro: «Posso trasferire il denaro LPP sul mio conto privato?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«Sì, direttamente sul conto privato»" },
        { key: "B", text: "«Versare immediatamente nel 3a»" },
        { key: "C", text: "«Il denaro LPP viene perso in caso di dimissioni»" },
        { key: "D", text: "«No – deve andare su un conto di libero passaggio fino al nuovo datore di lavoro»" },
      ],
      feedback:
        "Avere LPP → conto di libero passaggio → nuova cassa pensioni. Il conto è bloccato. Prelievo anticipato solo in condizioni speciali (abitazione, emigrazione, indipendenza).",
    },
    "2.4": {
      situation:
        "Il sig. Keller, 72 anni, vuole dare una procura per il suo conto risparmio alla figlia (48 anni). Chiede: «Cosa può fare con il conto?»",
      question: "Cosa gli spieghi?",
      options: [
        { key: "A", text: "«Con la procura la figlia può prelevare denaro, effettuare bonifici e consultare gli estratti conto – ma non può aprire nuovi conti né chiudere il conto»" },
        { key: "B", text: "«Una procura dà alla figlia gli stessi diritti del titolare del conto – può fare tutto, inclusa la chiusura del conto»" },
        { key: "C", text: "«Le procure per i conti privati sono possibili, ma legalmente vietate per i conti risparmio»" },
        { key: "D", text: "«La procura scade automaticamente se il sig. Keller si ammala o muore»" },
      ],
      feedback:
        "Procura bancaria: La mandataria può disporre nell'ambito dei diritti concessi (prelievi, bonifici, informazioni). La chiusura, l'apertura e la modifica del titolare rimangono riservate al titolare. La procura cessa al decesso. In caso di incapacità di discernimento rimane in linea di principio valida – salvo che il conto sia posto sotto tutela.",
    },
    "2.5": {
      situation:
        "La giovane cliente Mia, 21 anni, ha sconfinato di CHF 230 sul suo conto privato. La banca ha addebitato CHF 12 di interessi di scoperto. Mia è sorpresa: «Pensavo di poter andare brevemente in negativo?»",
      question: "Cosa le spieghi?",
      options: [
        { key: "A", text: "«Gli sconfinamenti di conto sono sempre gratuiti da noi – i CHF 12 sono un errore, lo correggiamo»" },
        { key: "B", text: "«I conti privati non possono andare in scoperto – blocchiamo il conto immediatamente»" },
        { key: "C", text: "«I brevi scoperti sono tollerati, ma vengono addebitati con interessi elevati – è un credito costoso. Necessità duratura → meglio richiedere un limite di scoperto»" },
        { key: "D", text: "«Solo i conti giovani vengono addebitati di interessi di scoperto – non i conti adulti»" },
      ],
      feedback:
        "Sconfinamento di conto = credito non pianificato a tasso elevato (spesso 10–15% p.a.). CHF 12 su CHF 230 sembra poco, ma corrisponde a oltre il 5% per pochi giorni. Per chi è regolarmente a corto: il limite di scoperto è meno costoso. Ancora meglio: costituire una riserva cuscinetto su un conto risparmio.",
    },
    "3.1": {
      briefing:
        "La cliente Sabine, 32 anni, versa CHF 200 al mese nel 3a. Ha già CHF 52'000 su un conto 3a.",
      question: "L'importo massimo 3a 2026 è CHF ___ all'anno.",
      feedback:
        "Importo massimo 3a 2026: CHF 7'258/anno (CHF 604.80/mese). Sabine versa solo CHF 2'400 – perde CHF 4'858 di risparmio fiscale. A partire da CHF 50'000, consigliare un secondo conto per prelievi scaglionati.",
    },
    "3.2": {
      situation:
        "Cliente: «Nel 2025 ho dimenticato di versare nel mio 3a. L'argento è perduto?»",
      question: "Cosa rispondi?",
      options: [
        { key: "A", text: "«A partire dal 2026 le lacune possono essere colmate – ma solo una volta esaurito l'importo massimo attuale»" },
        { key: "B", text: "«Sì purtroppo – non è più possibile»" },
        { key: "C", text: "«Basta versare un importo aggiuntivo»" },
        { key: "D", text: "«Solo i lavoratori indipendenti possono effettuare versamenti retroattivi»" },
      ],
      feedback:
        "Nuovo dal 2026: le lacune contributive a partire dal 2025 possono essere colmate retroattivamente. Condizione: l'importo massimo attuale deve essere prima esaurito. Le lacune prima del 2025 non sono possibili.",
    },
    "3.3": {
      briefing:
        "Una cliente ha CHF 180'000 su un conto risparmio. Chiede nervosamente: «Il mio denaro è al sicuro?»",
      question: "La garanzia dei depositi protegge CHF ___ per cliente e per banca.",
      feedback:
        "La garanzia dei depositi protegge CHF 100'000 per cliente e per banca. CHF 80'000 non sono protetti. Raccomandazione: ripartire gli importi superiori a CHF 100'000 su più banche.",
    },
    "3.4": {
      situation:
        "La cliente Petra, 58 anni, ha CHF 420'000 su un conto risparmio presso la Banca Cantonale. Chiede: «Quanto è protetto presso la vostra banca? E cosa devo fare con il resto?»",
      question: "Cosa consigli concretamente a Petra?",
      options: [
        { key: "A", text: "«Tutto è protetto – le banche cantonali hanno una garanzia statale, illimitata»" },
        { key: "B", text: "«CHF 100'000 sono garantiti da esisuisse. I restanti CHF 320'000 non sono garantiti in caso di fallimento. Raccomandazione: ripartire gli importi su 2–3 banche diverse»" },
        { key: "C", text: "«Nulla è garantito – i depositi bancari sono crediti senza priorità»" },
        { key: "D", text: "«CHF 100'000 sono garantiti. Convertire immediatamente il resto in obbligazioni – non sono interessate dal fallimento bancario»" },
      ],
      feedback:
        "Banche cantonali: La maggior parte (non tutte) hanno una garanzia statale – in questo caso i depositi sono effettivamente protetti oltre CHF 100'000. Ma non tutte le banche cantonali hanno garanzia statale (es. Banca Cantonale Bernese, Banca Cantonale Ginevrima). In caso di dubbio, la ripartizione è più sicura. Importante: esisuisse si applica a tutte le banche, la garanzia statale solo ad alcune banche cantonali.",
    },
    "3.5": {
      briefing:
        "La cliente Silvia, 45 anni, riceve CHF 85'000 di prestazione di libero passaggio dalla sua vecchia cassa pensioni a seguito di un cambio di lavoro. Ti chiede: «Cosa succede se non trasferisco il denaro in tempo su un conto di libero passaggio?»",
      question: "Se la prestazione di libero passaggio non viene comunicata, la cassa pensioni trasferisce il denaro all'___.",
      answer: "istituto collettore",
      feedback:
        "Se non si comunica alla vecchia cassa pensioni dove inviare il denaro, questa lo trasferisce all'Istituto collettore LPP (fondazione nazionale di raccolta). Il denaro non è perso, ma le spese di gestione sono più alte e gli interessi più bassi. Raccomandazione: aprire un conto di libero passaggio presso una banca e comunicare il numero alla cassa pensioni – prima dell'uscita.",
    },
  },
};
