const numero = 10000
const formiche = [] //formiche è un arrray che forniche 10000 oggetti

const rcolore = [0]

function setup() {
    createCanvas(400, 400);

    for (let i = 0; i < numero; i++) {
        formiche[i] = {
            x: width / 2,
            y: height / 2,
            colore: color(random(255), random(255), random(255)),
            
            dim: random(1, 4)
        }
        rcolore[i] = formiche[i].colore
        }
}
    


function draw() {
    background(225,0 ,0)
    
    for (let i = 0; i < numero; i++) {
        fill(formiche[i].colore)
        rect(formiche[i].x, formiche[i].y, formiche[i].dim, formiche[i].dim)
        noStroke()
        formiche[i].x += random(-2, 2) // è uaguale a rx = rx +randoma(-2, 2)
        formiche[i].y += random(-2, 2)
    }
   
    
}
