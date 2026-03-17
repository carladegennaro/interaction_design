
const formiche = [] //formiche è un arrray che fornisce 10000 oggetti
let mappa


function preload() {
    mappa = loadImage('mappa.jpg')
}

function setup() {
    createCanvas(400, 400);

    for (let j = 0; j < mappa.height; j++) {
        for (let i = 0; i < mappa.width; i++) {
            const col = mappa.get(i, j)
        formiche.push ({
            x : i,
            y : j,
            colore: mappa.get(i, j),
            
            dim: 1
        })
        }
}
    


function draw() {
    background(225,0 ,0)
    
    for (let i = 0; i < formiche.length; i++) {
        fill(formiche[i].colore)
        rect(formiche[i].x, formiche[i].y, formiche[i].dim, formiche[i].dim)
        noStroke()
        formiche[i].x += random(-2, 2) // è uaguale a rx = rx +randoma(-2, 2)
        formiche[i].y += random(-2, 2)
    }
   
    
}}
