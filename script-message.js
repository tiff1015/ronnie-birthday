document.addEventListener("DOMContentLoaded", () => {
  const bigCake = document.getElementById("bigCake");
  const letter = document.getElementById("letter");
  const bgm = document.getElementById("bgm");
  const hint = document.querySelector(".hint-bounce");

  bigCake.addEventListener("click", () => {
    // 撒 emoji cake
    for (let i = 0; i < 70; i++) {
      const emoji = document.createElement("div");
      emoji.textContent = ["🎉", "🎂", "🎈", "💖", "🦁", "🌟"][Math.floor(Math.random() * 6)];
      emoji.style.position = "absolute";
      emoji.style.left = `${window.innerWidth / 2}px`;
      emoji.style.top = `${window.innerHeight / 2}px`;
      emoji.style.fontSize = `${Math.random() * 2 + 2}rem`; // size: 2–4rem 隨機
      emoji.style.opacity = "1";
      emoji.style.transition = "all 2.5s ease-out";
      document.body.appendChild(emoji);

      // trigger animation
      requestAnimationFrame(() => {
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.top = `${Math.random() * 100}vh`;
        emoji.style.opacity = "0";
      });

      // remove after animation
      setTimeout(() => {
        emoji.remove();
      }, 2000);
    }

    // 2. 延遲 0.5 秒先隱藏大蛋糕
    setTimeout(() => {
      bigCake.style.display = "none";
      hint.style.display = "none";
    }, 500);

    // 3. 顯示信 + pokeball 同 波波球 + 播歌（延遲）
    setTimeout(() => {
      // 顯示信
      letter.classList.remove("hidden");
      letter.classList.add("fade-in");

      // 💡 彈出 SideMe
      setTimeout(() => {
        showSideMeSlide();
      }, 15000); // 只播一次，15秒後

      // 顯示 pokeball 同 波波球 同 Peppa
      pokeball.classList.remove("hidden");
      purin.classList.remove("hidden");
      peppa.classList.remove("hidden");

      // 觸發 fade-in 動畫
      requestAnimationFrame(() => {
        pokeball.classList.add("fade-in-soft");
        purin.classList.add("fade-in-soft");
        peppa.classList.add("fade-in-soft");

        setTimeout(() => {
          pokeball.style.opacity = "1";
          pokeball.classList.add("bounce");
          pokeball.classList.remove("fade-in-soft");
        }, 1300); // // 等 fade-in 播完先至彈 1s動畫 + 0.3s delay

        setTimeout(() => {
          peppa.style.opacity = "1";
          peppa.classList.remove("fade-in-soft");
          shakePeppaRandomly(); // ✅ 開始間歇震
        }, 1000);
      });

      // 播放 BGM
      bgm.play().catch(() => {});
    }, 1000);
  });
});

function shakePeppaRandomly() {
  // 隨機間隔 2～5 秒
  const delay = Math.random() * 3000 + 2000;

  setTimeout(() => {
    peppa.classList.add("shake");

    // 震完就移除 class
    setTimeout(() => {
      peppa.classList.remove("shake");
    }, 400); // 同 CSS 動畫時間一致

    // 再次遞歸呼叫
    shakePeppaRandomly();
  }, delay);
}

// pokeball + 波波球
const pokeball = document.getElementById("pokeball");
const purin = document.getElementById("purin");
const bgm = document.getElementById("bgm");
const pokeballSound = document.getElementById("pokeballSound");
const peppa = document.getElementById("peppa");

let isOpen = false;
let shakeIntervalId; // 用嚟記住 setInterval ID

pokeball.addEventListener("click", () => {
  if (!isOpen) {
    // 收復
    pokeball.classList.remove("bounce", "shake");
    pokeball.src = "assets/pokeball-open.png";
    pokeballSound.play();

    purin.classList.remove("hidden");
    purin.classList.remove("fly-back");
    purin.classList.add("fly-left");

    bgm.pause();

    setTimeout(() => {
      pokeball.src = "assets/pokeball-close.png";
      purin.classList.add("hidden");
      startIntermittentShake(); // 🟡 開始間歇震
      isOpen = true;
    }, 2000);
  } else {
    // 放返出黎
    pokeball.classList.remove("shake");
    pokeball.src = "assets/pokeball-open.png";
    pokeballSound.play();

    purin.classList.remove("hidden");
    purin.classList.remove("fly-left");
    purin.classList.add("fly-back");

    bgm.play();

    setTimeout(() => {
      pokeball.src = "assets/pokeball-close.png";
      pokeball.classList.add("bounce");
      stopShake(); // 🔴 停止震
      isOpen = false;
    }, 2000);
  }
});

function startIntermittentShake() {
  shakeIntervalId = setInterval(() => {
    pokeball.classList.add("shake");
    setTimeout(() => {
      pokeball.classList.remove("shake");
    }, 600); // 每次 shake 動畫 0.6 秒
  }, 2000); // 每 2 秒震一次
}

function stopShake() {
  clearInterval(shakeIntervalId);
}

const sideMe = document.getElementById("sideMe");

// Trigger SideMe動畫
function showSideMeSlide() {
  sideMe.classList.remove("animate"); // reset animation
  void sideMe.offsetWidth; // 強制 reflow，保證動畫會重播
  sideMe.classList.add("animate");
}

// peppa 動畫
const yanKiss = document.getElementById("yanKiss");
const yanHb = document.getElementById("yanHb");

peppa.addEventListener("click", () => {
  // if (yanKiss.classList.contains("show")) return;

  // 1. 計算 peppa 嘅位置
  const peppaRect = peppa.getBoundingClientRect();

  // 2. 擺 yan-kiss 起始位置（同 peppa 對齊）
  yanKiss.style.left = `${peppaRect.left + peppaRect.width / 2}px`;
  yanKiss.style.top = `${peppaRect.top + peppaRect.height / 2}px`;
  yanKiss.style.transform = `translate(-50%, -50%) scale(0.3)`;
  yanKiss.classList.remove("hidden");

  // *** 核心修復：重新載入 GIF ***
  // 為了確保 GIF 每次都重新播放，可以先將 src 設為空字串，再重新設回原來的 src。
  // 或者直接重新設定 src 到它自己，瀏覽器會強制重新載入。
  const originalGifSrc = yanKiss.src; // 儲存原始 src
  yanKiss.src = ""; // 清空 src
  yanKiss.src = originalGifSrc; // 重新設定 src，強制瀏覽器重新載入 GIF
  
  // 3. 播歌
  yanHb.currentTime = 0;
  yanHb.play();

  // 4. 小 delay 觸發飛出動畫
  //requestAnimationFrame(() => {
    yanKiss.classList.add("show");
    yanKiss.style.left = `50%`;
    yanKiss.style.top = `50%`;
    yanKiss.style.transform = `translate(-50%, -50%) scale(1)`;
  //});

  // 5. 播完退場
  yanHb.addEventListener("ended", () => {
    // 飛返入 peppa
    yanKiss.style.left = `${peppaRect.left + peppaRect.width / 2}px`;
    yanKiss.style.top = `${peppaRect.top + peppaRect.height / 2}px`;
    yanKiss.style.transform = `translate(-50%, -50%) scale(0.3)`;

    // 完成退場再 hide
    setTimeout(() => {
      yanKiss.classList.remove("show");
      yanKiss.classList.add("hidden");
    }, 600);
  }, { once: true });
});

// ig story
const seeHere = document.getElementById("seeHere");
const storyModal = document.getElementById("storyModal");
const storyImage = document.getElementById("storyImage");
const storyBarContainer = document.getElementById("storyBarContainer");

// 你張圖陣列
const storyImages = [
  "assets/story1.jpeg",
  "assets/story2.jpeg",
];

let currentStory = 0;
let autoAdvanceTimer = null;

seeHere.addEventListener("click", () => {
  openStoryModal();
});

function openStoryModal() {
  // storyModal.classList.remove("hidden");
  storyModal.classList.add("show"); // 添加 'show' class 來觸發動畫
  currentStory = 0;
  setupBars();
  showStory(currentStory);
}

function setupBars() {
  storyBarContainer.innerHTML = "";
  storyImages.forEach(() => {
    const bar = document.createElement("div");
    bar.className = "story-bar";

    const fill = document.createElement("div");
    fill.className = "story-bar-fill";

    bar.appendChild(fill);
    storyBarContainer.appendChild(bar);
  });
}

function showStory(index) {
  if (index >= storyImages.length) {
    closeStoryModal();
    return;
  }
  storyImage.src = storyImages[index];

  // reset previous fill
  const allFills = document.querySelectorAll(".story-bar-fill");
  allFills.forEach((f) => {
    f.style.transition = "none"; 
    f.style.width = "0%";
  });

  for (let i = 0; i < index; i++) {
    allFills[i].style.width = "100%";
  }

  // animate current fill bar
  setTimeout(() => {
    const currentFill = allFills[index];
    currentFill.style.transition = "width 2.5s linear";
    currentFill.style.width = "100%";
  }, 50); 

  // auto advance
  clearTimeout(autoAdvanceTimer);
  autoAdvanceTimer = setTimeout(() => {
    showStory(index + 1);
  }, 2500);
}

// click to go next
storyModal.addEventListener("click", () => {
  clearTimeout(autoAdvanceTimer);
  showStory(currentStory + 1);
  currentStory++;
});

function closeStoryModal() {
  storyModal.classList.remove("show"); // 移除 'show' class 來觸發動畫
  // 由於動畫需要時間，如果你希望在動畫結束後才徹底清除計時器，
  // 可以考慮在這裡加一個 setTimeout，或者在 CSS 過渡結束後再處理
  clearTimeout(autoAdvanceTimer); // 提前清除計時器，防止在關閉時繼續播放
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(reg => console.log("✅ Service Worker registered:", reg))
      .catch(err => console.error("❌ SW registration failed:", err));
  });
}
