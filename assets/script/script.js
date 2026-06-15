let earthImg, models = [], textures = [], stars = [], satellites = [];
let isInteracting = false, isDetailPage = false, isSourcesPage = false;
let rotX = 0, rotY = 180, camZ = 1000, targetCamZ = 1000;
let lookAt, targetLookAt, selectedSatIndex = -1, hoveredIndex = -1;
let detailP5 = null;

const labels = {
    agency: "Agency", launch: "Launch", mass: "Mass", orbit: "Orbit",
    status: "Mission Status", size: "Dimensions", cost: "Estimated Cost",
    life: "Operational Life", expand: "Open in new page ↗"
};

const chapterData = {
    0: { 
        storia: "The Orbiting Carbon Observatory-2 (OCO-2) is NASA's first mission dedicated to carbon dioxide.", 
        come: "Carbon dioxide (CO₂) is a critical component of the Earth system: although essential for life and for maintaining a habitable surface temperature, the anthropogenic increase in its concentrations is altering the planet's radiative balance. <br><br>The Earth system regulates CO₂ through the carbon cycle, divided into 'sources' (emissions from fossil fuels, decomposition, deforestation) and 'sinks' (oceanic and terrestrial). Currently, natural sinks absorb about 50% of the CO₂ emitted by human activities. <br><br>OCO-2 provides fundamental data by measuring Sun-Induced Fluorescence (SIF). Since SIF is directly proportional to photosynthetic activity, it acts as a real-time indicator of the gross primary productivity of ecosystems. This allows for monitoring seasonal growth cycles and detecting environmental stress before they become visible.", 
        perche: "The OCO-2 satellite uses three high-resolution grating spectrometers to determine the concentration of CO₂ in the atmosphere. These instruments do not directly measure the gas, but analyze the intensity of sunlight reflected from the Earth's surface after it has passed through the atmosphere. <br><br>The physical principle is based on molecular absorption: CO₂ and oxygen (O₂) molecules absorb specific wavelengths of light. The spectrometer breaks down the light into its color components, revealing dark absorption lines. The more CO₂ molecules present along the light path, the greater the energy absorbed in those specific frequencies. <br><br>OCO-2 observes three distinct spectral bands: the Oxygen A band (0.76 µm) to calculate atmospheric pressure and the distance traveled by the light, and two CO₂ bands (1.61 µm and 2.06 µm) to detect the concentration of the gas near the surface and the vertical structure of the atmosphere. This allows for calculating the average molar fraction of CO₂ (XCO₂) with a precision of better than 1 part per million (ppm)." 
    },
    1: { 
        storia: "Sentinel-6 Michael Freilich is the gold standard for sea level measurements, continuing an uninterrupted historical record of oceanographic data started in 1992.", 
        come: "Sentinel-6 represents the 'gold standard' for measuring ocean levels, extending an uninterrupted data record that began over 30 years ago. Ocean height is a fundamental climate indicator: as water expands as it warms, variations in sea level directly reflect the heat stored by the oceans, which absorb over 90% of the excess heat trapped by greenhouse gases. <br><br>The mission allows for monitoring global sea level rise — which has grown by more than 10 cm since the early 1990s — caused by both thermal expansion and the melting of glaciers. The data are essential for early warning systems for phenomena such as El Niño (ENSO) and for improving predictions on ocean circulation, providing vital information for the protection of global coastal infrastructures through 2030 and beyond. <br><br>Sentinel-6 Michael Freilich is a collaboration between NASA, ESA, EUMETSAT, NOAA, CNES and the European Commission.", 
        perche: "The measurement of sea level is done via a dual-frequency radar altimeter. The satellite sends microwave pulses toward the ocean surface and measures with extreme precision the time taken for the signal to bounce and return to the receiver. Conknowing the speed of light and the travel time, it is possible to calculate the exact distance between the satellite and the water surface. <br><br>To determine the height of the ocean relative to the center of the Earth, the satellite sends microwaves that bounce off the surface; by combining the return time with its precise orbital position (obtained via GPS and laser systems), scientists derive the local ocean height. Sentinel-6 is capable of measuring the sea surface with an accuracy of approximately 3 centimeters from an orbit at 1336 km altitude. Flying over the entire planet every 10 days, the satellite provides a complete map of ocean topography, identifying variations related to currents and temperature." 
    },
    2: { 
        storia: "ICESat-2 (Ice, Cloud, and land Elevation Satellite-2) maps the Earth's height with millimeter precision using laser pulses from space.", 
        come: "Quantifying the mass balance of ice sheets represents a crucial challenge identified by the IPCC, as it directly affects predictions of global sea level change. ICESat-2 addresses this uncertainty by establishing a precise baseline before global warming further alters the balance. <br><br>Unlike conventional radars that have difficulty on inclined and crevassed surfaces, ICESat-2's ATLAS LIDAR is capable of measuring ice thickness changes of less than 1 cm per year. This sensitivity is vital for determining whether ice sheets are growing or shrinking, providing early signs of instability in critical areas such as West Antarctica. <br><br>By monitoring glacial flows, grounding lines, and the volume of perennial ice, the mission fills fundamental gaps in our understanding of the climate system, transforming unique lidar data into reliable global predictions.", 
        perche: "ICESat-2 operates through the GLAS (Geoscience Laser Altimeter System) system, emitting ultra-short laser pulses capable of mapping the Earth with millimeter precision. The system uses LiDAR technology: it emits 40 pulses per second that strike the surface, creating 70-meter 'footprints.' By calculating the flight time of the photons that return to the satellite and cross-referencing the data with the orbital GPS position, the instrument measures elevation with an error of less than 15 cm. <br><br>In addition to ice, ICESat-2 penetrates vegetation to measure forest height and analyzes the vertical structure of clouds and aerosols, providing unique data on polar atmospheric dynamics even during long periods of winter darkness." 
    },
    3: {
        storia: "The Suomi NPP (National Polar-orbiting Partnership) satellite is the technological bridge between NASA's Earth Observing System missions and future weather satellites.",
        come: "Precisely knowing the amount of ozone in our atmosphere is a matter of planetary security. Stratospheric ozone acts as a shield for the Earth, absorbing most of the harmful ultraviolet (UV-B) radiation from the Sun. <br><br>The utility of these data is reflected in three areas: <br>• Protection of human health: avoids the increase in skin cancers and immune system damage by monitoring 'holes' in the protective layer. <br>• Safeguarding ecosystems: excessive UV radiation damages phytoplankton and reduces crop yields. <br>• Verification of international treaties: allows for confirming if the Montreal Protocol is working, observing the healing of the ozone layer.",
        perche: "Suomi NPP orbits the Earth 14 times a day from pole to pole using the OMPS (Ozone Mapping and Profiler Suite) instrument. <br><br>The operation is based on spectroscopy: the OMPS analyzes sunlight reflected from the Earth's surface and scattered by the atmosphere (backscattering). Since ozone absorbs ultraviolet light at specific wavelengths, the satellite measures how much of this light is 'missing' in the return signal."
    },
    4: {
        storia: "Aqua is a multinational NASA mission aimed at studying the Earth's water cycle, collecting data on oceans, atmosphere, soil, and ice.",
        come: "Aqua monitors the planet's water and energy balance by studying the atmosphere (humidity and clouds), the oceans (temperature and phytoplankton), sea ice, soil moisture, and precipitation. <br><br>The importance of this mission lies in improving weather forecasts and understanding global warming. Water vapor is the most abundant greenhouse gas; by monitoring it, Aqua helps to understand how temperatures influence the water cycle, causing droughts or floods. Furthermore, it detects the health of marine life and helps manage global water resources.",
        perche: "Aqua operates in a sun-synchronous orbit that scans every point of the Earth at the same local time (about 1:30 PM). <br><br>The satellite uses a suite of hyperspectral and microwave instruments: <br>• AIRS: creates 3D maps of temperature and humidity by measuring infrared radiation. <br>• AMSR-E: penetrates clouds with microwaves to measure rain and soil moisture."
    }
};

const frameLinks = [
    "https://eyes.nasa.gov/apps/earth/#/vital-signs/carbon-dioxide/oco-2-carbon-observatory-16day",
    "https://eyes.nasa.gov/apps/earth/#/vital-signs/sea-level",
    "https://eyes.nasa.gov/apps/earth/#/vital-signs/ice/icesat2-arctic-ice-thickness",
    "https://eyes.nasa.gov/apps/earth/#/vital-signs/ozone",
    "https://eyes.nasa.gov/apps/earth/#/vital-signs/water-vapor"
];


function preload() { earthImg = loadImage('assets/imgs/earth albedo.jpg'); }

function setup() {
    let mainCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
    mainCanvas.style('display', 'block');
    lookAt = createVector(0, 0, 0); targetLookAt = createVector(0, 0, 0);
    for (let i = 0; i < 900; i++) stars.push(createVector(random(-2000, 2000), random(-2000, 2000), random(-2000, 2000)));
    satellites = [
        { name: "OCO-2", pos: createVector(260, -70, 120), color: [255, 120, 50], specs: { agency: "NASA", launch: "02 Jul 2014", mass: "447 kg", orbit: "705 km", status: "Operational", size: "2.1m x 2.1m", cost: "$467.7M", life: "2 years" } },
        { name: "SENTINEL-6", pos: createVector(-290, 60, -140), color: [100, 255, 200], specs: { agency: "ESA/NASA", launch: "21 Nov 2020", mass: "1192 kg", orbit: "1336 km", status: "Operational", size: "5.1m x 2.3m", cost: "$800M", life: "5.5 years" } },
        { name: "ICESAT-2", pos: createVector(120, -300, 80), color: [100, 200, 255], specs: { agency: "NASA", launch: "15 Sep 2018", mass: "1387 kg", orbit: "496 km", status: "Operational", size: "4.1m x 2.1m", cost: "$1.06B", life: "3 years" } },
        { name: "SUOMI NPP", pos: createVector(-150, 250, 180), color: [255, 100, 255], specs: { agency: "NASA/NOAA", launch: "28 Oct 2011", mass: "2128 kg", orbit: "824 km", status: "Operational", size: "4.3m x 2.5m", cost: "$1.5B", life: "5 years" } },
        { name: "AQUA", pos: createVector(300, 100, -200), color: [100, 255, 100], specs: { agency: "NASA", launch: "04 May 2002", mass: "3117 kg", orbit: "705 km", status: "Operational", size: "4.8m x 16.7m", cost: "$952M", life: "6 years" } }
    ];
    generateNav();
}

function generateNav() {
    const container = document.getElementById('side-nav-container');
    container.innerHTML = "";
    satellites.forEach((sat, i) => {
        const item = document.createElement('div');
        item.className = 'nav-item';
        // MODIFICA: Agganciato l'hover del menu alla variabile globale hoveredIndex
        item.onmouseenter = () => { hoveredIndex = i; };
        item.onmouseleave = () => { hoveredIndex = -1; };
        item.innerHTML = `<button class="nav-btn" onclick="selectSatellite(${i})" id="btn-${i}">${sat.name}</button>
            <div class="tech-preview tech-info-block"><b>${labels.agency}</b><span>${sat.specs.agency}</span><b>${labels.launch}</b><span>${sat.specs.launch}</span><b>${labels.mass}</b><span>${sat.specs.mass}</span><b>${labels.orbit}</b><span>${sat.specs.orbit}</span></div>`;
        container.appendChild(item);
    });
}

function draw() {
    if (isDetailPage || isSourcesPage) return; background(0);
    
    // Gestione dell'hovering calcolato dinamicamente sui cerchi basandosi sulla rotazione corrente
    if (isInteracting && !mouseIsPressed) {
        let currentClosest = -1;
        let clickRadius = 45;
        for (let i = 0; i < satellites.length; i++) {
            let p = getProjectedPosition(satellites[i].pos);
            if (p.z > 0) { 
                let d = dist(mouseX, mouseY, p.x, p.y);
                if (d < clickRadius) { currentClosest = i; break; }
            }
        }
        if (currentClosest !== -1) hoveredIndex = currentClosest;
    }

    // MODIFICA: Sincronizzazione visiva delle classi CSS dei bottoni nell'HTML in base all'hoveredIndex
    document.querySelectorAll('.nav-btn').forEach((btn, idx) => {
        if (idx === hoveredIndex) {
            btn.classList.add('active');
        } else if (idx !== selectedSatIndex) {
            btn.classList.remove('active');
        }
    });

    if (isInteracting && mouseIsPressed && mouseX > 450) { rotY += (mouseX - pmouseX) * 0.005; rotX -= (mouseY - pmouseY) * 0.005; }
    camZ = lerp(camZ, targetCamZ, 0.08);
    lookAt.x = lerp(lookAt.x, targetLookAt.x, 0.08); lookAt.y = lerp(lookAt.y, targetLookAt.y, 0.08); lookAt.z = lerp(lookAt.z, targetLookAt.z, 0.08);
    camera(0, 0, camZ, lookAt.x, lookAt.y, lookAt.z, 0, 1, 0);
    ambientLight(150); pointLight(255, 255, 255, 0, 0, camZ);
    push(); stroke(255); strokeWeight(1.5); for (let s of stars) point(s.x, s.y, s.z); pop();
    
    push(); 
    rotateX(rotX); 
    rotateY(rotY); 
    push(); noStroke(); texture(earthImg); sphere(200); pop();
    
    for (let i = 0; i < satellites.length; i++) {
        let s = satellites[i]; let isHovered = (hoveredIndex === i);
        if (isHovered) { push(); noFill(); stroke(255, 50); let d = s.pos.mag(); let v1 = createVector(1, 0, 0); let v2 = s.pos.copy().normalize(); let axis = v1.cross(v2); let angle = acos(v1.dot(v2)); rotate(angle, axis); ellipse(0, 0, d * 2, d * 2); pop(); }
        drawOrbitMarker(s.pos, isHovered);
        push(); translate(s.pos.x, s.pos.y, s.pos.z); rotateY(-rotY); rotateX(-rotX); noStroke(); fill(s.color);
        let shapeSize = isHovered ? 25 : 12; rectMode(CENTER); rect(0, 0, shapeSize, shapeSize * 0.6); fill(255, 200); rect(0, 0, shapeSize * 0.2, shapeSize * 1.2); pop();
    }
    pop();
}

function drawOrbitMarker(position, isHovered) {
    let baseSize = 80; let markerSize = isHovered ? baseSize * 1.5 : baseSize;
    push(); translate(position.x, position.y, position.z); rotateY(-rotY); rotateX(-rotX); stroke(255); strokeWeight(2);
    let segments = 32; for (let i = 0; i < segments; i++) { let theta = (TWO_PI / segments) * i; point(cos(theta) * markerSize * 0.5, sin(theta) * markerSize * 0.5); }
    pop();
}

function createDetailModel(satIndex) {
    if (detailP5) detailP5.remove();
    const sketch = (p) => {
        let modelObj = null; let texObj = null;
        p.preload = () => {
            modelObj = p.loadModel(modelPaths[satIndex], true);
            if (satIndex === 3) texObj = p.loadImage('assets/imgs/tex_Suomi.png');
            if (satIndex === 4) texObj = p.loadImage('assets/imgs/tex_Aqua.png');
        };
        p.setup = () => { let container = document.getElementById('detail-3d-container'); let canvas = p.createCanvas(container.offsetWidth, container.offsetHeight, p.WEBGL); canvas.parent(container); };
        p.draw = () => { 
            p.background(0); p.orbitControl(); p.ambientLight(200); p.pointLight(255, 255, 255, 0, 0, 400); 
            p.push(); p.rotateX(p.PI); p.scale(1.2); p.noStroke();
            if (texObj) p.texture(texObj); else p.emissiveMaterial(satellites[satIndex].color);
            if (modelObj) p.model(modelObj); p.pop(); 
        };
    };
    detailP5 = new p5(sketch);
}

function startExperience() { document.getElementById('page-0').classList.add('hidden'); document.getElementById('ui-layer').classList.add('active'); isInteracting = true; }

function selectSatellite(index) { 
    selectedSatIndex = index; 
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active')); 
    document.getElementById('btn-' + index).classList.add('active'); 
    setTimeout(openDetails, 500); 
}

function openDetails() { 
    isDetailPage = true; 
    updateDetailView('storia'); 
    document.getElementById('detail-page').classList.add('active'); 
    createDetailModel(selectedSatIndex);
    let nextIdx = (selectedSatIndex + 1) % satellites.length;
    document.getElementById('btn-successivo').innerText = satellites[nextIdx].name + " →";
}

function nextSatellite() {
    let nextIdx = (selectedSatIndex + 1) % satellites.length;
    document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.chapter-btn')[0].classList.add('active');
    selectSatellite(nextIdx);
}

function closeDetails() { isDetailPage = false; if (detailP5) { detailP5.remove(); detailP5 = null; } document.getElementById('detail-page').classList.remove('active'); resetView(); }

function resetView() { 
    selectedSatIndex = -1; 
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active')); 
}

function openSources() { isSourcesPage = true; document.getElementById('sources-page').classList.add('active'); }
function closeSources() { isSourcesPage = false; document.getElementById('sources-page').classList.remove('active'); }

function updateDetailView(key) {
    const sat = satellites[selectedSatIndex]; 
    const container = document.getElementById('detail-content');
    document.getElementById('detail-title').innerText = sat.name;
    if (key === 'storia') {
        container.innerHTML = `<p>${chapterData[selectedSatIndex].storia}</p><div style="margin-top:40px; display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px;"><div><b>${labels.agency}</b><span>${sat.specs.agency}</span><b>${labels.launch}</b><span>${sat.specs.launch}</span><b>${labels.mass}</b><span>${sat.specs.mass}</span><b>${labels.orbit}</b><span>${sat.specs.orbit}</span></div><div><b>${labels.status}</b><span>${sat.specs.status}</span><b>${labels.size}</b><span>${sat.specs.size}</span><b>${labels.cost}</b><span>${sat.specs.cost}</span><b>${labels.life}</b><span>${sat.specs.life}</span></div></div>`;
    } else {
        container.innerHTML = `<p>${chapterData[selectedSatIndex][key]}</p>`;
    }
}

function openExternalFrame() { window.open(frameLinks[selectedSatIndex], '_blank'); }

function changeChapter(key, btn) {
    document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); updateDetailView(key);
    const container3d = document.getElementById('detail-3d-container');
    if (detailP5) { detailP5.remove(); detailP5 = null; }
    container3d.innerHTML = ""; container3d.style.visibility = "visible";
    
    if (key === 'come') {
        container3d.innerHTML = `
            <div class="expand-hint">${labels.expand}</div>
            <div style="position:absolute; top:0; left:0; width:100%; height:100%; cursor:pointer; z-index:15;" onclick="openExternalFrame()"></div>
            <iframe src="${frameLinks[selectedSatIndex]}" style="width:100%; height:100%; border:none; pointer-events:none;"></iframe>
        `;
    } else if (key === 'perche') {
        let imgContent = "";
        if (selectedSatIndex === 0) imgContent = `<img src="assets/imgs/measure_approach-br.original.jpg" class="detail-side-img"><img src="assets/imgs/oco_bands_larger.original.png" class="detail-side-img">`;
        else if (selectedSatIndex === 1) imgContent = `<img src="assets/imgs/ssha-map-2025-1201.jpg" class="detail-side-img">`;
        else if (selectedSatIndex === 2) imgContent = `<img src="assets/imgs/plrcloud.gif" class="detail-side-img">`;
        else if (selectedSatIndex === 3) imgContent = `<img src="assets/imgs/ozone_omp_2012027_lrg.jpg" class="detail-side-img">`;
        else if (selectedSatIndex === 4) imgContent = `<img src="assets/imgs/eos1.webp" class="detail-side-img">`;
        container3d.innerHTML = imgContent;
    } else if (key === 'storia') { createDetailModel(selectedSatIndex); }
}

function getProjectedPosition(pos) {
    let x = pos.x;
    let y = pos.y;
    let z = pos.z;

    let cosY = cos(rotY);
    let sinY = sin(rotY);
    let xRotY = x * cosY + z * sinY;
    let zRotY = -x * sinY + z * cosY;

    let cosX = cos(rotX);
    let sinX = sin(rotX);
    let yRotX = y * cosX - zRotY * sinX;
    let zRotX = y * sinX + zRotY * cosX;

    let distanceToCam = camZ - zRotX;
    let fovFactor = (height / 2.0) / tan(PI * 30.0 / 180.0);
    let scaleProject = fovFactor / distanceToCam;

    return {
        x: xRotY * scaleProject + width / 2,
        y: yRotX * scaleProject + height / 2,
        z: distanceToCam
    };
}

function mouseClicked() {
    if (isDetailPage || isSourcesPage || !isInteracting) return;
    let closest = -1;
    let clickRadius = 45; 
    
    for (let i = 0; i < satellites.length; i++) {
        let p = getProjectedPosition(satellites[i].pos);
        if (p.z > 0) { 
            let d = dist(mouseX, mouseY, p.x, p.y);
            if (d < clickRadius) {
                closest = i;
                break;
            }
        }
    }
    if (closest !== -1) selectSatellite(closest);
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }