const projects = {
  savings: { kicker: "01 / WEB APP", title: "小卡攒钱记", description: "一个把预算、消费、周期结算和小卡收藏连在一起的攒钱挑战 App。它有 15 个页面、完整的本地持久化和领域测试，也保留了韩系薄荷灰的视觉方向。", stack: "uni-app · Vue 3 · Local storage", year: "2026", image: "./assets/savings.jpg" },
  meal: { kicker: "02 / WEB TOOL", title: "今天吃什么", description: "一个从生活纠结出发的菜单推荐工具。输入预算、做饭时间、现有食材和口味偏好，页面会按可行性推荐一餐，并给出补齐食材和步骤。", stack: "HTML · CSS · JavaScript", year: "2026", image: "" },
  terminus: { kicker: "03 / GODOT GAME", title: "终点站不存在", description: "第一人称 3D 列车密室逃脱原型。玩家要在出发之夜、停电时刻和多年以后之间切换，找齐广播零件，调查事故，并选择自己的终点。", stack: "Godot 4 · GDScript · Procedural 3D", year: "2026", image: "./assets/terminus-horror.png" },
  idol: { kicker: "04 / HTML", title: "本命偶像匹配测试", description: "一个把星座、MBTI、喜欢的颜色和舞台定位变成匹配结果的互动网页。结果页会给出最接近的成员和几个备选结果。", stack: "HTML · CSS · JavaScript", year: "2026", image: "" },
  dinner: { kicker: "05 / GODOT GAME", title: "晚饭之前", description: "一个雨夜老宅里的短逃生原型。玩家需要拿碗、摆桌、打开电视引开奶奶，再从厨房拿到铁盒里的钥匙。", stack: "Godot 4 · GDScript · Shaders", year: "2026", image: "./assets/terminus-horror.png" },
  motion: { kicker: "06 / REMOTION", title: "舞台动作实验", description: "用 Remotion 做的竖屏女团舞蹈视频预览，练习人物节奏、镜头切换和可编辑时间线。工程里也包含 ASMR 与二维角色动画实验。", stack: "Remotion · React · TypeScript", year: "2026", image: "./assets/girl-group.png" }
};

const modal = document.querySelector("#project-modal");
const modalImage = document.querySelector("#modal-image");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let previousFocus;

function openModal(id) {
  const project = projects[id];
  if (!project) return;
  previousFocus = document.activeElement;
  document.querySelector("#modal-kicker").textContent = project.kicker;
  document.querySelector("#modal-title").textContent = project.title;
  document.querySelector("#modal-description").textContent = project.description;
  document.querySelector("#modal-stack").textContent = project.stack;
  document.querySelector("#modal-year").textContent = project.year;
  modalImage.innerHTML = project.image ? `<img src="${project.image}" alt="${project.title} 项目画面" />` : `<div class="modal-placeholder"><span>${project.title}</span><strong>正在整理更多画面</strong></div>`;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  previousFocus?.focus();
}

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => openModal(button.closest(".project").dataset.project));
});
document.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeModal));
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal(); });

document.querySelectorAll(".filter").forEach((filter) => {
  filter.setAttribute("aria-pressed", String(filter.classList.contains("is-active")));
  filter.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((item) => {
      item.classList.remove("is-active");
      item.setAttribute("aria-pressed", "false");
    });
    filter.classList.add("is-active");
    filter.setAttribute("aria-pressed", "true");
    const selected = filter.dataset.filter;
    document.querySelectorAll(".project").forEach((project) => {
      const visible = selected === "all" || project.dataset.category === selected;
      project.classList.toggle("is-filtered", !visible);
      if (visible) project.classList.add("is-visible");
    });
  });
});

if (prefersReducedMotion) document.documentElement.classList.add("reduce-motion");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
