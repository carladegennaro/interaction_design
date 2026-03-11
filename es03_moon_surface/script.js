let piastrella 


function preload(){  //ci assicura che l'immagine sia caricata prima di eseguire il resto del codice
    piastrella = loadImage("tiles/moon_small.png")

}


function setup(){
createCanvas(900, 900, WEBGL)
piastrella.loadPixels() //carica i pixel dell'immagine in modo da poter accedere ai loro valori
}

function draw(){
    background(0)
    stroke(255)
    
    rotateX(PI/3)
    
    if (mouseIsPressed) {
        rotateZ(mouseX*0.01)
    }
  
    
    const spaziatura = 5
    strokeWeight(0.9999)
    
    const numeroPuntiX = piastrella.width 
    const numeroPuntiY = piastrella.height 
    
    const margineX = -(numeroPuntiX -1) * spaziatura /2
    const margineY = -(numeroPuntiY -1) * spaziatura /2
    
    noFill()
    beginShape(POINTS)
    for (let j = 0; j < numeroPuntiY; j++)
        for(let i=0; i<numeroPuntiX; i++){
        const px = i * spaziatura + margineX
        const py = j * spaziatura + margineY
        const rosso = piastrella.pixels[(j*piastrella.width +i)*4] //ottiene il colore del pixel (i, j) dell'immagine
        const pz = rosso * 0.2 //la profondità è proporzionale al valore del rosso del pixel
        vertex(px, py, pz)
        }

    endShape()
}