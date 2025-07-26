document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const bgMusic = document.getElementById("bg-music");
  const lionRoar = document.getElementById("lion-roar");
  const lionWrapper = document.getElementById("lionWrapper");
  const nextBtn = document.getElementById("nextBtn");

  // 初始暫停動畫
  pauseAll();

  popup.addEventListener("click", () => {
    popup.classList.add("fade-out");
    bgMusic.play().catch(() => {});
    setTimeout(() => {
      popup.style.display = "none";
      playAll();
      launchConfetti();

      // 出人頭
      document.querySelectorAll(".falling-head").forEach(head => {
        head.style.display = "block";
      });

      // 出button
      setTimeout(() => {
        nextBtn.style.display = "inline-block";
        void nextBtn.offsetWidth;
        nextBtn.classList.add("fade-in");
      }, 15000);
    }, 1000);
  });

  lionWrapper.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
    } else {
      bgMusic.pause();
      lionRoar.currentTime = 0;
      lionRoar.play();
      lionRoar.onended = () => bgMusic.play().catch(() => {});
    }
  });

  function pauseAll() {
    ["name", "lion", "hat", "birthday-text", "hint-wrapper"].forEach(cls => {
      const el = document.querySelector(`.${cls}`);
      if (el) el.style.animationPlayState = "paused";
    });
    document.querySelectorAll(".balloon").forEach(b => b.style.animationPlayState = "paused");
  }

  function playAll() {
    ["name", "lion", "hat", "birthday-text", "hint-wrapper"].forEach(cls => {
      const el = document.querySelector(`.${cls}`);
      if (el) el.style.animationPlayState = "running";
    });
    document.querySelectorAll(".balloon").forEach(b => b.style.animationPlayState = "running");
  }

  function launchConfetti() {
    const duration = 5000;
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const interval = setInterval(() => {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({ ...defaults, particleCount: 5, origin: { x: Math.random(), y: Math.random() * 0.6 } });
    }, 100);
  }

  nextBtn.addEventListener("click", () => {
    window.location.href = "message.html";
  });
});