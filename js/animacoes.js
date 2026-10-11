(function () {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const semToque = window.matchMedia("(pointer: fine)").matches;

    function barraRolagem() {
        const barra = document.querySelector(".scroll-progresso");
        if (!barra) return;

        const atualizar = () => {
            const topo = window.scrollY;
            const altura = document.documentElement.scrollHeight - window.innerHeight;
            barra.style.width = altura > 0 ? `${(topo / altura) * 100}%` : "0%";
        };

        window.addEventListener("scroll", atualizar, { passive: true });
        atualizar();
    }

    function revelarAoRolar() {
        const alvos = document.querySelectorAll("[data-reveal], [data-reveal-fade]");
        if (!alvos.length) return;

        if (semMovimento || !("IntersectionObserver" in window)) {
            alvos.forEach(el => el.classList.add("visivel"));
            return;
        }

        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (!entrada.isIntersecting) return;
                const el = entrada.target;
                const atraso = Number(el.dataset.reveal || el.dataset.revealFade) || 0;
                setTimeout(() => el.classList.add("visivel"), atraso);
                observador.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        alvos.forEach(el => observador.observe(el));
    }

    function cardsInterativos() {
        if (semMovimento || !semToque) return;

        document.querySelectorAll(".card--link").forEach(card => {
            card.addEventListener("pointermove", (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width;
                const py = (e.clientY - r.top) / r.height;

                card.style.setProperty("--mx", `${e.clientX - r.left}px`);
                card.style.setProperty("--my", `${e.clientY - r.top}px`);
                card.style.setProperty("--rx", `${(px - 0.5) * 10}deg`);
                card.style.setProperty("--ry", `${(0.5 - py) * 10}deg`);
            });

            card.addEventListener("pointerleave", () => {
                card.style.setProperty("--rx", "0deg");
                card.style.setProperty("--ry", "0deg");
            });
        });
    }

    function luzCursor() {
        if (semMovimento || !semToque) return;

        const glow = document.createElement("div");
        glow.className = "cursor-glow";
        document.body.appendChild(glow);

        let alvoX = window.innerWidth / 2;
        let alvoY = window.innerHeight / 2;
        let x = alvoX;
        let y = alvoY;

        window.addEventListener("pointermove", (e) => {
            alvoX = e.clientX;
            alvoY = e.clientY;
            glow.style.opacity = "1";
        });

        const animar = () => {
            x += (alvoX - x) * 0.12;
            y += (alvoY - y) * 0.12;
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            requestAnimationFrame(animar);
        };

        requestAnimationFrame(animar);
    }

    function particulasHero() {
        const canvas = document.querySelector(".hero__particulas");
        if (!canvas || semMovimento) return;

        const ctx = canvas.getContext("2d");
        let largura = 0;
        let altura = 0;
        let particulas = [];

        const redimensionar = () => {
            const r = canvas.parentElement.getBoundingClientRect();
            largura = canvas.width = r.width;
            altura = canvas.height = r.height;

            const quantidade = Math.min(70, Math.floor(largura / 18));
            particulas = Array.from({ length: quantidade }, () => ({
                x: Math.random() * largura,
                y: Math.random() * altura,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.8 + 0.6
            }));
        };

        const desenhar = () => {
            ctx.clearRect(0, 0, largura, altura);

            particulas.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > largura) p.vx *= -1;
                if (p.y < 0 || p.y > altura) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                ctx.fill();
            });

            for (let i = 0; i < particulas.length; i++) {
                for (let j = i + 1; j < particulas.length; j++) {
                    const dx = particulas[i].x - particulas[j].x;
                    const dy = particulas[i].y - particulas[j].y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particulas[i].x, particulas[i].y);
                        ctx.lineTo(particulas[j].x, particulas[j].y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 * (1 - dist / 120)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(desenhar);
        };

        redimensionar();
        window.addEventListener("resize", redimensionar);
        requestAnimationFrame(desenhar);
    }

    function animarContadores() {
        const alvos = document.querySelectorAll("[data-contador]");
        if (!alvos.length) return;

        alvos.forEach(el => {
            const destino = Number(el.dataset.contador) || 0;
            const sufixo = el.dataset.sufixo || "";

            if (semMovimento || destino === 0) {
                el.textContent = destino + sufixo;
                return;
            }

            const duracao = 1000;
            const inicio = performance.now();

            const passo = (agora) => {
                const avanco = Math.min((agora - inicio) / duracao, 1);
                const suave = 1 - Math.pow(1 - avanco, 3);
                el.textContent = Math.round(destino * suave) + sufixo;
                if (avanco < 1) requestAnimationFrame(passo);
            };

            requestAnimationFrame(passo);
        });
    }

    function dispararConfete() {
        if (semMovimento) return;

        const canvas = document.createElement("canvas");
        canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:70;";
        document.body.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const cores = ["#6366f1", "#a855f7", "#22d3ee", "#f472b6", "#4ade80", "#fbbf24"];
        const pecas = Array.from({ length: 140 }, () => ({
            x: canvas.width / 2 + (Math.random() - 0.5) * 120,
            y: canvas.height / 3,
            vx: (Math.random() - 0.5) * 12,
            vy: Math.random() * -14 - 4,
            tam: Math.random() * 8 + 4,
            cor: cores[Math.floor(Math.random() * cores.length)],
            giro: Math.random() * Math.PI,
            vgiro: (Math.random() - 0.5) * 0.3
        }));

        let inicio = null;

        const animar = (agora) => {
            if (!inicio) inicio = agora;
            const t = agora - inicio;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            pecas.forEach(p => {
                p.vy += 0.3;
                p.x += p.vx;
                p.y += p.vy;
                p.giro += p.vgiro;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.giro);
                ctx.fillStyle = p.cor;
                ctx.fillRect(-p.tam / 2, -p.tam / 2, p.tam, p.tam * 0.6);
                ctx.restore();
            });

            if (t < 2600) {
                requestAnimationFrame(animar);
            } else {
                canvas.remove();
            }
        };

        requestAnimationFrame(animar);
    }

    document.addEventListener("DOMContentLoaded", () => {
        barraRolagem();
        revelarAoRolar();
        cardsInterativos();
        luzCursor();
        particulasHero();
        window.animarContadores = animarContadores;
        window.dispararConfete = dispararConfete;
    });
})();
