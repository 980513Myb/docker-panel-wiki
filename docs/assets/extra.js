document.addEventListener("DOMContentLoaded", () => {
  const decorate = () => {
    document.querySelectorAll("blockquote").forEach((el) => {
      const text = el.textContent.trim();
      if (!text.startsWith("截图：") || el.classList.contains("screenshot-slot")) return;

      const title = text.replace(/^截图：/, "");
      el.className = "screenshot-slot";
      el.innerHTML = `<strong>${title}</strong><small>截图位已预留。后续替换为真实产品截图时，请隐藏域名、密钥、Token 和个人隐私信息。</small>`;
    });

    const targets = document.querySelectorAll(".feature-card, .screenshot-slot, .admonition, .dp-metrics > div");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.12 });

    targets.forEach((el) => {
      el.classList.add("reveal-on-scroll");
      observer.observe(el);
    });
  };

  decorate();
  if (typeof document$ !== "undefined") document$.subscribe(decorate);
});
