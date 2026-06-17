SUPSI 2026  
Corso d’interaction design, CV429.01  
Docenti: A. Gysin, G. Profeta  

Progetto 1: La conquista dello spazio

# Eyes on Earth
Autore: Carla De Gennraro \
[Eyes on Earth](https://carladegennaro.github.io/interaction_design/index.html)


## Introduzione e tema
Sviluppato in occasione dei 70 anni dalla conquista dello spazio della NASA, questo progetto esamina l'impatto continuo del cambiamento climatico attraverso lo studio di cinque satelliti chiave per l'osservazione della Terra. L'iniziativa è progettata per illustrare come funzionano questi veicoli spaziali e perché i loro dati siano così importanti per la ricerca scientifica e per il monitoraggio della salute del nostro pianeta.

## Riferimenti progettuali
[https://www.anthropic.com/features/claude-on-mars](url)


## Design dell’interfaccia e modalità di interazione
Il sito è composto da tre pagine principali: una landing page, in cui si ritrova la descrizione del sito stesso e che introduce l'utente all'esperienza; una homepage, costituita dal menu laterale sulla sinistra e dal globo terrestre circondato dai cinque satelliti interattivi; e infine le pagine di dettaglio dei vari satelliti, all'interno delle quali si ritrovano i dati specifici e più scientifici legati alle singole missioni. L’interfaccia adotta un layout a schermata fissa strutturato su dodici colonne con da caselle geometriche per i bottoni.


https://github.com/user-attachments/assets/c9126743-8da4-469c-bf54-5e9317b5e102


<img width="464" height="454" alt="0_screen2" src="https://github.com/user-attachments/assets/31759482-243d-4d01-8974-1bd1ce2cfb44" />
<img width="777" height="640" alt="0_screen3" src="https://github.com/user-attachments/assets/88900021-96f4-474b-b939-864ded3a74ee" />
<img width="1512" height="855" alt="0_screen1" src="https://github.com/user-attachments/assets/c8eedfe4-4f4b-49f0-8c71-34582f4076cd" />




## Tecnologia usata
Il progetto è sviluppato interamente lato client sfruttando la combinazione di codice JavaScript nativo e la libreria p5.js in modalità WEBGL. Quest'ultima gestisce l'ambiente tridimensionale, calcolando la rotazione della sfera terrestre sul piano cartesiano e la posizione dei vettori dei cinque satelliti. I metadati e le descrizioni scientifiche sono salvati localmente in strutture matriciali all'interno dello script, eliminando la necessità di chiamate a database esterni e velocizzando i flussi di caricamento della pagina.
 

```JavaScript
// Rilevamento del mouse hover sui satelliti tridimensionali nel canvas
if (isInteracting && !mouseIsPressed) {
    let currentClosest = -1; 
    let clickRadius = 45; // Raggio geometrico di tolleranza in pixel
    
    for (let i = 0; i < satellites.length; i++) {
        let p = getProjectedPosition(satellites[i].pos);
        if (p.z > 0) { 
            let d = dist(mouseX, mouseY, p.x, p.y); 
            if (d < clickRadius) { 
                currentClosest = i; 
                break; 
            } 
        }
    }
    if (currentClosest !== -1) hoveredIndex = currentClosest;
}
```

## Target e contesto d’uso
Il progetto si rivolge a un pubblico generalista, ovvero persone non necessariamente esperte di ingegneria aerospaziale, ma accomunate da un forte interesse per l’astronomia, le tecnologie NASA e le tematiche ambientali. Per questo target, l'esperienza ideale si sviluppa attraverso una consultazione da postazione desktop, in cui muoversi liberamente e con i propri tempi. L'interfaccia a caselle permette all'utente di selezionare un satellite sia dal menu laterale sia dal canvas tridimensionale per consultare i dati descrittivi e, se necessario, approfondire il percorso di ricerca attraverso il link della visualizzazione della Terra che reindirizza direttamente all'applicazione ufficiale della NASA.
