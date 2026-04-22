SUPSI 2026

Corso d’interaction design, CV429.01

Docenti: A. Gysin, G. Profeta

Progetto 1

# [**Eyes on earth**](https://carladegennaro.github.io/interaction_design/progetto_1.2/)

Autore: Carla De Gennaro

Eyes on earth

### **Introduzione al tema**

In occasione del settantesimo anniversario della NASA, fondata nel 1958 , questo progetto esplora gli archivi digitali dell’agenzia per divulgare l'importanza della tecnologia aerospaziale nel monitoraggio della salute del nostro pianeta. Attraverso la navigazione tra cinque satelliti chiave, scoprirai come la conquista dello spazio sia diventata lo strumento fondamentale per comprendere i cambiamenti globali. Inizia il tuo viaggio per vedere la Terra come non l'hai mai vista prima.

### **Riferimenti progettuali**
[https://www.anthropic.com/features/claude-on-mars](url)



### **Design dell’interfaccia e modalità di interazione**
Il progetto adotta un approccio minimalista e immersivo, ispirato ai terminali delle agenzie aerospaziali. Il layout è strutturato in tre livelli logici:

Landing Page. Una schermata di benvenuto sfocata che introduce il contesto storico (70° anniversario NASA). L'interazione è limitata al tasto "Esplora", che funge da trigger per attivare l'ambiente interattivo.

Navigazione Orbitale. Una rappresentazione 3D della Terra in un vuoto cosmico.
- Interazione spaziale: l'utente può ruotare il pianeta tramite drag del mouse e zoomare.
- Feedback visivo: passando sopra i nomi dei satelliti nel menu laterale, appaiono marker bianchi pulsanti sulla Terra e un'anteprima tecnica (HUD) con i loghi delle agenzie (NASA, ESA, NOAA).

Sistema di Dettaglio. Cliccando su un satellite, l'interfaccia si trasforma in un cruscotto analitico diviso in tre capitoli:
- Scheda Tecnica (visualizzazione di un modello 3D interattivo del satellite e dati strutturali), utilità (accesso diretto a dati reali tramite preview di mappe satellitari (link esterni)) e come funziona (approfondimento scientifico con schemi e immagini reali delle missioni).

[/Users/carladegennaro/Desktop/SUPSI (4)/429 M&I/interaction_design/video.mov](url)

### **Tecnologia usata**
- Dati locali e Loghi: le informazioni tecniche e i riferimenti alle agenzie sono archiviati in oggetti JavaScript locali (satellites, chapterData), permettendo un caricamento istantaneo senza dipendere da database esterni.
- Integrazione Iframe: visualizzazione dinamica di applicazioni NASA pre-esistenti per la consultazione dei "Vital Signs" del pianeta.


### **Target e contesto d’uso**
Il progetto si rivolge a un pubblico generalista, ovvero persone non necessariamente esperte di ingegneria aerospaziale, ma accomunate da un forte interesse per l’astronomia, le tecnologie NASA e le tematiche ambientali.

