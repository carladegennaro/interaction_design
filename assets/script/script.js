let earthImg, models = [], textures = [], stars = [], satellites = [];
let isInteracting = false, isDetailPage = false, isSourcesPage = false, isAboutPage = false;
let rotX = 0, rotY = 180, camZ = 1000, targetCamZ = 1000;
let lookAt, targetLookAt, selectedSatIndex = -1, hoveredIndex = -1;
let currentDetailSubPage = "tech"; 

const labels = {
    agency: "Agency", launch: "Launch", mass: "Mass", orbit: "Orbit",
    status: "Mission Status", size: "Dimensions", cost: "Estimated Cost",
    life: "Operational Life", expand: "Open in new page ↗"
};

const chapterData = {
    0: { 
        nomeIntero: "Orbiting Carbon Observatory-2",
        testoMissione: "The Orbiting Carbon Observatory-2 (OCO-2) is NASA's premier mission for mapping global atmospheric carbon dioxide (CO₂). By tracking carbon concentrations over time, the satellite helps isolate structural greenhouse fluctuations and pinpoint exactly where carbon is released or absorbed worldwide.<br><br>The satellite relies on three high-resolution spectrometers that measure the absorption lines of sunlight reflected off the Earth. As light passes through the atmosphere, CO₂ and <br> oxygen molecules filter specific spectral frequencies. OCO-2 decodes these signals to evaluate carbon concentrations with a precision of 1 part per million (ppm).<br><br>Additionally, OCO-2 records Sun-Induced Fluorescence (SIF), a faint light emitted by plants during photosynthesis. This metric acts as a real-time health indicator for global vegetation, helping scientists observe how terrestrial carbon sinks react to climate stress and changing industrial emissions."
    },
    1: { 
        nomeIntero: "Sentinel-6                     Michael Freilich",
        testoMissione: "Sentinel-6 Michael Freilich stands as the global standard for long-term sea level measurements, expanding an uninterrupted oceanographic dataset initiated in <br> 1992. Monitoring ocean topography is critical because marine waters trap over 90% of the Earth's excess heat, resulting in global thermal expansion and accelerated glacial melting.<br><br>The spacecraft utilizes a advanced dual-frequency radar altimeter to bounce microwave pulses off the water's surface. By matching the signal's travel duration with precise orbital GPS metrics and laser positioning networks, the system maps sea surface height variations down to an accuracy of 3 centimeters.<br><br>Orbiting at an altitude of 1,336 kilometers, Sentinel-6 maps the ice-free global oceans every 10 days. Its cloud-penetrating radar instruments allow oceanographers to accurately trace marine currents, forecast climate phenomena like El Niño, and deliver data to safeguard coastal zones."
    },
    2: { 
        nomeIntero: "Aura EOS CH-1",
        testoMissione: "The Aura satellite is a core component of NASA's Earth Observing System, optimized to decode the chemical profiles of our atmosphere, track the stratospheric ozone layer, and monitor global air quality trends.<br><br>Operating in a sun-synchronous polar orbit, Aura maps how trace gases, industrial aerosols, and pollutants interact over multi-year scales. Its main payloads, the Ozone Monitoring Instrument (OMI) and the Microwave Limb Sounder (MLS), collect backscattered solar radiation and thermal emissions from the atmospheric boundary layer.<br><br>By processing specific ultra-violet and microwave absorption properties, Aura calculates global distributions of ozone, nitrogen dioxide, and sulfur dioxide. This inventory allows scientists to chart the seasonal evolution of polar ozone holes and verify if international emissions control acts, like the Montreal Protocol, are successfully reducing pollutant thresholds."
    },
    3: {
        nomeIntero: "Suomi National                Polar-orbiting Partnership",
        testoMissione: "The Suomi National Polar-orbiting Partnership (Suomi NPP) serves as a critical environmental bridge linking legacy Earth observations with next-generation weather networks, scanning the planet from pole to pole 14 times a day.<br><br>A joint initiative between NASA and NOAA, the mission monitors changes in global ozone layers, cloud structures, and aerosol patterns using the OMPS and VIIRS instrument packages. Its sensors use backscattering spectroscopy to evaluate reflected ultraviolet and infrared light against direct solar outputs, showing exactly how much ozone is active in the protective column.<br><br>Suomi NPP is highly recognized for its 'Day/Night Band' imaging system, a sensor capable of collecting low-light emissions across the dark side of the globe. This grants meteorologists an uninterrupted window to trace nighttime storms, locate active wildfires, chart volcanic ash clouds, and evaluate global energy grids through city lights."
    },
    4: {
        nomeIntero: "Aqua EOS PM-1",
        testoMissione: "The Aqua satellite maps the components of Earth's water cycle, logging variations across global oceans, seasonal sea ice sheets, continental soil moisture levels, and the upper atmosphere.<br><br>Aqua maintains a sun-synchronous orbit designed to cross the equator at 1:30 PM local time, capturing atmospheric parameters during peak daylight convective activity. The probe deploys a coordinated matrix of hyperspectral and microwave sensors to compile these multi-phase climate vectors.<br><br>The Atmospheric Infrared Sounder (AIRS) captures thermal outputs to generate 3D atmospheric temperature profiles, while the AMSR-E microwave system pierces thick clouds to assess rainfall rates and surface soil wetness. Tracking atmospheric water vapor allows Aqua to model how warming trends disrupt historical precipitation patterns, sparking regional droughts or flood conditions."
    }
};

const frameLinks = [
    "https://eyes.nasa.gov/apps/earth/#/vital-signs/carbon-dioxide/oco-2-carbon-observatory-16day",
    "https://eyes.nasa.gov/apps/earth/#/vital-signs/sea-level",
    "https://eyes.nasa.gov/apps/earth/#/vital-signs/nitrous-oxide/mls-stratosphere-n2o-7day",
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
        { name: "Sentinel-6", pos: createVector(-290, 60, -140), color: [100, 255, 200], specs: { agency: "ESA/NASA", launch: "21 Nov 2020", mass: "1192 kg", orbit: "1336 km", status: "Operational", size: "5.1m x 2.3m", cost: "$800M", life: "5.5 years" } },
        { name: "Aura", pos: createVector(120, -300, 80), color: [255, 215, 0], specs: { agency: "NASA", launch: "15 Jul 2004", mass: "2967 kg", orbit: "705 km", status: "Operational", size: "4.7m x 17.0m", cost: "$785M", life: "5 years" } },
        { name: "Suomi NPP", pos: createVector(-150, 250, 180), color: [255, 100, 255], specs: { agency: "NASA/NOAA", launch: "28 Oct 2011", mass: "2128 kg", orbit: "824 km", status: "Operational", size: "4.3m x 2.5m", cost: "$1.5B", life: "5 years" } },
        { name: "Aqua", pos: createVector(300, 100, -200), color: [100, 255, 100], specs: { agency: "NASA", launch: "04 May 2002", mass: "3117 kg", orbit: "705 km", status: "Operational", size: "4.8m x 16.7m", cost: "$952M", life: "6 years" } }
    ];
    generateNav();
}

function generateNav() {
    const container = document.getElementById('side-nav-container');
    container.innerHTML = "";
    satellites.forEach((sat, i) => {
        const item = document.createElement('div');
        item.className = 'nav-item';
        item.onmouseenter = () => { hoveredIndex = i; };
        item.onmouseleave = () => { hoveredIndex = -1; };
        item.innerHTML = `<button class="nav-btn" onclick="selectSatellite(${i})" id="btn-${i}">${sat.name}</button>
            <div class="tech-preview tech-info-block"><div class="data-row"><b>${labels.agency}</b><span>${sat.specs.agency}</span></div><div class="data-row"><b>${labels.launch}</b><span>${sat.specs.launch}</span></div><div class="data-row"><b>${labels.mass}</b><span>${sat.specs.mass}</span></div><div class="data-row"><b>${labels.orbit}</b><span>${sat.specs.orbit}</span></div></div>`;
        container.appendChild(item);
    });
}

function draw() {
    background(0);
    if (isDetailPage || isSourcesPage || isAboutPage) return;
    
    if (isInteracting && !mouseIsPressed) {
        let currentClosest = -1; let clickRadius = 45;
        for (let i = 0; i < satellites.length; i++) {
            let p = getProjectedPosition(satellites[i].pos);
            if (p.z > 0) { let d = dist(mouseX, mouseY, p.x, p.y); if (d < clickRadius) { currentClosest = i; break; } }
        }
        if (currentClosest !== -1) hoveredIndex = currentClosest;
    }

    document.querySelectorAll('.nav-btn').forEach((btn, idx) => {
        if (idx === hoveredIndex) btn.classList.add('active');
        else if (idx !== selectedSatIndex) btn.classList.remove('active');
    });

    if (isInteracting && mouseIsPressed && mouseX > 450) { rotY += (mouseX - pmouseX) * 0.005; rotX -= (mouseY - pmouseY) * 0.005; }
    camZ = lerp(camZ, targetCamZ, 0.08);
    lookAt.x = lerp(lookAt.x, targetLookAt.x, 0.08); lookAt.y = lerp(lookAt.y, targetLookAt.y, 0.08); lookAt.z = lerp(lookAt.z, targetLookAt.z, 0.08);
    camera(0, 0, camZ, lookAt.x, lookAt.y, lookAt.z, 0, 1, 0);
    ambientLight(200); pointLight(255, 255, 255, 0, 0, camZ);
    push(); stroke(255); strokeWeight(1.5); for (let s of stars) point(s.x, s.y, s.z); pop();
    
    push(); rotateX(rotX); rotateY(rotY);
    push(); noStroke(); texture(earthImg); sphere(200); pop();
    
    for (let i = 0; i < satellites.length; i++) {
        let s = satellites[i]; let isHovered = (hoveredIndex === i);
        if (isHovered) { 
            push(); 
            noFill(); 
            stroke(255); 
            strokeWeight(0.5); 
            let d = s.pos.mag(); 
            let v1 = createVector(1, 0, 0); 
            let v2 = s.pos.copy().normalize(); 
            let axis = v1.cross(v2); 
            let angle = acos(v1.dot(v2)); 
            rotate(angle, axis); 
            
            let orbitSegments = 128;
            beginShape();
            for (let j = 0; j <= orbitSegments; j++) {
                let theta = (TWO_PI / orbitSegments) * j;
                vertex(cos(theta) * d, sin(theta) * d);
            }
            endShape();
            pop(); 
        }
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

function startExperience() { 
    document.getElementById('page-0').classList.add('hidden'); 
    document.getElementById('ui-layer').classList.add('active'); 
    isInteracting = true; 
    const controlsBox = document.querySelector('.bottom-left-controls');
    if (controlsBox) controlsBox.style.setProperty('display', 'flex', 'important');
}

function selectSatellite(index) { 
    selectedSatIndex = index; currentDetailSubPage = "tech"; 
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active')); 
    const targetBtn = document.getElementById('btn-' + index);
    if (targetBtn) targetBtn.classList.add('active'); 
    if (isDetailPage) { updateDetailView(currentDetailSubPage); generateDetailButtons(); } else { setTimeout(openDetails, 500); }
}

function generateDetailButtons() {
    const tabContainer = document.querySelector('.detail-chapters');
    if (tabContainer) {
        tabContainer.innerHTML = "";
        satellites.forEach((sat, i) => {
            const item = document.createElement('div');
            item.className = 'chapter-item';
            item.innerHTML = `<button class="chapter-btn ${i === selectedSatIndex ? 'active' : ''}" onclick="selectSatellite(${i})">${sat.name}</button>`;
            tabContainer.appendChild(item);
        });
    }
}

function openDetails() { 
    isDetailPage = true; updateDetailView(currentDetailSubPage); 
    document.getElementById('detail-page').classList.add('active'); generateDetailButtons();
    const controlsBox = document.querySelector('.bottom-left-controls');
    if (controlsBox) controlsBox.style.setProperty('display', 'flex', 'important');
}

function closeDetails() { 
    isDetailPage = false; document.getElementById('detail-page').classList.remove('active'); resetView(); 
    const controlsBox = document.querySelector('.bottom-left-controls');
    if (controlsBox) controlsBox.style.setProperty('display', 'flex', 'important');
}

function resetView() { selectedSatIndex = -1; document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active')); }

function openAbout() { 
    isAboutPage = true; 
    document.getElementById('about-page').classList.add('active');
    const controlsBox = document.querySelector('.bottom-left-controls'); 
    if (controlsBox) controlsBox.style.display = 'none'; 
}

function closeAbout() { 
    isAboutPage = false; 
    document.getElementById('about-page').classList.remove('active');
    const controlsBox = document.querySelector('.bottom-left-controls'); 
    if (controlsBox) controlsBox.style.setProperty('display', 'flex', 'important'); 
}

function openSources() { isSourcesPage = true; document.getElementById('sources-page').classList.add('active'); const controlsBox = document.querySelector('.bottom-left-controls'); if (controlsBox) controlsBox.style.display = 'none'; }
function closeSources() { isSourcesPage = false; document.getElementById('sources-page').classList.remove('active'); const controlsBox = document.querySelector('.bottom-left-controls'); if (controlsBox) controlsBox.style.setProperty('display', 'flex', 'important'); }

function updateDetailView(subPage) {
    currentDetailSubPage = subPage; const sat = satellites[selectedSatIndex]; const container = document.getElementById('detail-content');
    const titleEl = document.getElementById('detail-title');
    if (titleEl) {
        titleEl.textContent = chapterData[selectedSatIndex].nomeIntero;
    }

    const tabToggleContainer = document.querySelector('.sub-page-tabs');
    if (tabToggleContainer) {
        tabToggleContainer.innerHTML = `
            <button id="tab-btn-tech" class="tab-toggle-btn ${subPage === 'tech' ? 'active' : ''}" onclick="updateDetailView('tech')">Data</button>
            <button id="tab-btn-about" class="tab-toggle-btn ${subPage === 'about' ? 'active' : ''}" onclick="updateDetailView('about')">Mission</button>
        `;
    }

    if (!container) return;

    if (subPage === 'about') {
        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start;">
                <div>
                    <p style="margin-top: 0; text-align: left;">${chapterData[selectedSatIndex].testoMissione}</p>
                </div>
                <div class="about-media-box" style="position: relative; width: 100%; height: 350px; cursor: pointer;" onclick="openExternalFrame()">
                    <div class="expand-hint">${labels.expand}</div>
                    <iframe src="${frameLinks[selectedSatIndex]}" style="width:100%; height:100%; border:none; pointer-events:none;"></iframe>
                </div>
            </div>`;
   } else if (subPage === 'tech') {
        let imgContent = "";
        if (selectedSatIndex === 0) imgContent = `assets/imgs/OCO2.png`;
        else if (selectedSatIndex === 1) imgContent = `assets/imgs/Sentinel6b.png`;
        else if (selectedSatIndex === 2) imgContent = `assets/imgs/Aura.png`;
        else if (selectedSatIndex === 3) imgContent = `assets/imgs/SuomiNPP.png`;
        else if (selectedSatIndex === 4) imgContent = `assets/imgs/Aqua.png`;

        container.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: start;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px;">
                    <div>
                        <div class="data-row"><b>${labels.agency}</b><span>${sat.specs.agency}</span></div>
                        <div class="data-row"><b>${labels.launch}</b><span>${sat.specs.launch}</span></div>
                        <div class="data-row"><b>${labels.mass}</b><span>${sat.specs.mass}</span></div>
                        <div class="data-row"><b>${labels.orbit}</b><span>${sat.specs.orbit}</span></div>
                    </div>
                    <div>
                        <div class="data-row"><b>${labels.status}</b><span>${sat.specs.status}</span></div>
                        <div class="data-row"><b>${labels.size}</b><span>${sat.specs.size}</span></div>
                        <div class="data-row"><b>${labels.cost}</b><span>${sat.specs.cost}</span></div>
                        <div class="data-row"><b>${labels.life}</b><span>${sat.specs.life}</span></div>
                    </div>
                </div>
                <div class="tech-media-box" style="width: 100%;">
                    <img src="${imgContent}" class="detail-side-img" style="width: 100%; height: 350px; object-fit: cover;">
                </div>
            </div>`;
    }
}

function openExternalFrame() { window.open(frameLinks[selectedSatIndex], '_blank'); }

function getProjectedPosition(pos) {
    let x = pos.x; let y = pos.y; let z = pos.z;
    let cosY = cos(rotY); let sinY = sin(rotY);
    let xRotY = x * cosY + z * sinY; let zRotY = -x * sinY + z * cosY;
    let cosX = cos(rotX); let sinX = sin(rotX);
    let yRotX = y * cosX - zRotY * sinX; let zRotX = y * sinX + zRotY * cosX;
    let distanceToCam = camZ - zRotX;
    let fovFactor = (height / 2.0) / tan(PI * 30.0 / 180.0);
    let scaleProject = fovFactor / distanceToCam;
    return { x: xRotY * scaleProject + width / 2, y: yRotX * scaleProject + height / 2, z: distanceToCam };
}

function mouseClicked() {
    if (isDetailPage || isSourcesPage || isAboutPage || !isInteracting) return;
    let closest = -1; let clickRadius = 45; 
    for (let i = 0; i < satellites.length; i++) {
        let p = getProjectedPosition(satellites[i].pos);
        if (p.z > 0) { let d = dist(mouseX, mouseY, p.x, p.y); if (d < clickRadius) { closest = i; break; } }
    }
    if (closest !== -1) selectSatellite(closest);
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }