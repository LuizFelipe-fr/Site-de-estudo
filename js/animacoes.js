(function () {
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        const alvos = document.querySelectorAll("[data-reveal]");
        if (!alvos.length) return;

        if (semMovimento || !("IntersectionObserver" in window)) {
            alvos.forEach(el => el.classList.add("visivel"));
            return;
        }

        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (!entrada.isIntersecting) return;
                const el = entrada.target;
                const atraso = Number(el.dataset.reveal) || 0;
                setTimeout(() => el.classList.add("visivel"), atraso);
                observador.unobserve(el);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        alvos.forEach(el => observador.observe(el));
    }

    function spotlightCards() {
        if (semMovimento) return;

        document.querySelectorAll(".card--link").forEach(card => {
            card.addEventListener("pointermove", (e) => {
                const r = card.getBoundingClientRect();
                card.style.setProperty("--mx", `${e.clientX - r.left}px`);
                card.style.setProperty("--my", `${e.clientY - r.top}px`);
            });
        });
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

            const duracao = 900;
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

    document.addEventListener("DOMContentLoaded", () => {
        barraRolagem();
        revelarAoRolar();
        spotlightCards();
        window.animarContadores = animarContadores;
    });
})();
