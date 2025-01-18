
    /**
 * Crée les étoiles aléatoires en arrière-plan
 */
    function createStars() {
        const background = document.getElementById("spaceBackground");
        const numberOfStars = 100;
    
        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement("div");
            star.className = "star";
            // Placement aléatoire
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            // Taille aléatoire
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            // Durée d'animation aléatoire
            star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
    
            background.appendChild(star);
        }
    }
    
    /**
     * Crée un effet de particules au clic
     * @param {number} x Position X en pixels
     * @param {number} y Position Y en pixels
     * @param {string} color Couleur des particules
     */
    function createParticles(x, y, color) {
        const container = document.querySelector(".spinner-container");
        const numberOfParticles = 10;
    
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement("div");
            particle.style.position = "absolute";
            particle.style.width = "4px";
            particle.style.height = "4px";
            particle.style.backgroundColor = color;
            particle.style.borderRadius = "50%";
            particle.style.pointerEvents = "none";
            particle.style.left = x + "px";
            particle.style.top = y + "px";
    
            // Calcul de la trajectoire
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
    
            container.appendChild(particle);
    
            let opacity = 1;
            let scale = 1;
    
            function animate() {
                if (opacity <= 0) {
                    particle.remove();
                    return;
                }
    
                const currentLeft = parseFloat(particle.style.left);
                const currentTop = parseFloat(particle.style.top);
    
                particle.style.left = currentLeft + vx + "px";
                particle.style.top = currentTop + vy + "px";
    
                opacity -= 0.02;
                scale += 0.02;
    
                particle.style.opacity = opacity;
                particle.style.transform = `scale(${scale})`;
    
                requestAnimationFrame(animate);
            }
    
            animate();
        }
    }
    
    /**
     * Crée un effet de comète
     */
    function createComet() {
        const background = document.getElementById("spaceBackground");
        const comet = document.createElement("div");
        comet.className = "comet";
    
        // Position aléatoire de départ (horizontal)
        const startPos = Math.random() * 100;
        comet.style.left = `${startPos}%`;
        comet.style.top = "0";
    
        background.appendChild(comet);
    
        // Nettoyage
        setTimeout(() => comet.remove(), 3000);
    }
    
    /**
     * Lance l'apparition de comètes à intervalles réguliers
     */
    function initComets() {
        setInterval(createComet, 4000);
    }
    
    /**
     * Initialisation des interactions sur les sphères (points .dot)
     * (Facultatif si tu as des .dot dans ton HTML)
     */
    function initSphereInteractions() {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot) => {
            dot.addEventListener("click", (e) => {
                const sphere = dot.querySelector(".sphere");
                // Inversion du sens de rotation
                sphere.style.animationDirection =
                    sphere.style.animationDirection === "reverse" ? "normal" : "reverse";
    
                // Effet de particules au clic
                const color = window.getComputedStyle(dot.querySelector(".sphere-surface"))
                    .background;
                createParticles(e.clientX, e.clientY, color);
            });
    
            dot.addEventListener("mouseenter", () => {
                const sphere = dot.querySelector(".sphere");
                // Ralentit la rotation
                sphere.style.animationDuration = "20s";
    
                // Effet sonore subtil
                const audio = new Audio(
                    "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"
                );
                audio.volume = 0.1;
                audio.play().catch(() => {
                    /* silence en cas de blocage auto du navigateur */
                });
            });
    
            dot.addEventListener("mouseleave", () => {
                const sphere = dot.querySelector(".sphere");
                sphere.style.animationDuration = "12s";
            });
        });
    }
    
    /**
     * Gère les interactions de rotation manuelle sur le container
     */
    function initContainerInteractions() {
        const container = document.querySelector(".spinner-container");
        let isRotating = false;
        let startX = 0;
        let startY = 0;
    
        container.addEventListener("mousedown", (e) => {
            isRotating = true;
            startX = e.clientX;
            startY = e.clientY;
            container.style.transition = "none";
        });
    
        document.addEventListener("mousemove", (e) => {
            if (!isRotating) return;
    
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
    
            const rotationY = deltaX * 0.5;
            const rotationX = -deltaY * 0.5;
    
            container.style.transform = `
          rotateX(${rotationX}deg)
          rotateY(${rotationY}deg)
        `;
        });
    
        document.addEventListener("mouseup", () => {
            if (!isRotating) return;
            isRotating = false;
    
            // Transition finale
            container.style.transition = "transform 1s cubic-bezier(0.4, 0, 0.2, 1)";
            container.style.transform = "rotateX(0deg) rotateY(0deg)";
    
            // Effet de rebond
            setTimeout(() => {
                container.style.transform = "rotateX(2deg) rotateY(2deg)";
                setTimeout(() => {
                    container.style.transform = "rotateX(0deg) rotateY(0deg)";
                }, 150);
            }, 1000);
        });
    }
    
    /* Initialisations */
    createStars();
    initComets();
    initSphereInteractions(); // Facultatif si tu as des .dot
    initContainerInteractions();
    