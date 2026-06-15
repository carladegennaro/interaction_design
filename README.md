¨SUPSI 2026  
Corso d’interaction design, CV429.01  
Docenti: A. Gysin, G. Profeta  

Progetto 1: La conquista dello spazio

# Eyes on Earth
Autore: Carla De Gennraro \
[Eyes on Earth](https://carladegennaro.github.io/interaction_design/progetto_1.2/)


## Introduzione e tema
In occasione del programma di celebrazioni per il settantesimo anniversario della NASA (1958-2028), questo progetto esplora come la conquista dello spazio sia diventata un motore tecnologico fondamentale per comprendere e monitorare la salute del nostro pianeta.
L’obiettivo è evidenziare come l'utilizzo di diversi satelliti permetta di osservare la Terra e i cambiamenti climatici.

## Riferimenti progettuali
[https://www.anthropic.com/features/claude-on-mars](url)


## Design dell’interfaccia e modalità di interazione
Il progetto adotta un approccio minimalista e immersivo, ispirato ai terminali delle agenzie aerospaziali. Il layout è strutturato in tre livelli logici:

Landing Page. Una schermata di benvenuto sfocata che introduce il contesto storico (70° anniversario NASA). L'interazione è limitata al tasto "Esplora", che funge da trigger per attivare l'ambiente interattivo.

Navigazione Orbitale. Una rappresentazione 3D della Terra in un vuoto cosmico.
- Interazione spaziale: l'utente può ruotare il pianeta tramite drag del mouse e zoomare.
- Feedback visivo: passando sopra i nomi dei satelliti nel menu laterale, appaiono marker bianchi pulsanti sulla Terra e un'anteprima tecnica (HUD) con i loghi delle agenzie (NASA, ESA, NOAA).

Sistema di Dettaglio. Cliccando su un satellite, l'interfaccia si trasforma in un cruscotto analitico diviso in tre capitoli:
- Scheda Tecnica (visualizzazione di un modello 3D interattivo del satellite e dati strutturali), utilità (accesso diretto a dati reali tramite preview di mappe satellitari (link esterni)) e come funziona (approfondimento scientifico con schemi e immagini reali delle missioni).

<img width="1236" height="1236" alt="carla1" src="earth-albedo.jpg" /> 
https://github.com/user-attachments/assets/d6f86ada-3f9a-4988-9ac8-b81028d84b1f


## Tecnologia usata
- Dati locali e Loghi: le informazioni tecniche e i riferimenti alle agenzie sono archiviati in oggetti JavaScript locali (satellites, chapterData), permettendo un caricamento istantaneo senza dipendere da database esterni.
- Integrazione Iframe: visualizzazione dinamica di applicazioni NASA pre-esistenti per la consultazione dei "Vital Signs" del pianeta.


```JavaScript
const image = new Image();
image.onload = () => {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(
		gl.TEXTURE_2D,
		level,
		internalFormat,
		srcFormat,
		srcType,
		image
	);
	if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
		gl.generateMipmap(gl.TEXTURE_2D);
	} else {
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	}
};
image.src = url;
```

## Target e contesto d’uso
Il progetto si rivolge a un pubblico generalista, ovvero persone non necessariamente esperte di ingegneria aerospaziale, ma accomunate da un forte interesse per l’astronomia, le tecnologie NASA e le tematiche ambientali.
