/* ==========================================================
   script.js - all the interactivity of the portfolio
   1. Edit your content in the top block (me, timeline, skills,
      projects, upcoming).
   2. The rest below makes the page work. You rarely need to
      change it.
   ========================================================== */

/* ===== EDIT YOUR CONTENT HERE ===== */
const roles = [
  "Full-Stack Developer",
  "Frontend Engineer",
  "Problem Solver",
  "JavaScript Enthusiast",
];
const me = { email: "aniketmenkudle94@gmail.com", github: "https://github.com/AniketMenkudle", linkedin: "https://www.linkedin.com/in/aniket-menkudle?utm_source=share_via&utm_content=profile&utm_medium=member_android", resume: "", photo: "./Profile.jpg.png" }; // paste your real links, e.g. github:"https://github.com/yourname"
const timeline = [
  {
    y: "2022 to 2026",
    t: "B.Tech in Computer Science Engineering",
    d: "Yashoda Technical Campus, Satara",
  },
  {
    y: "Add year",
    t: "Certificate name",
    d: "Issuer, for example Coursera, Udemy or NPTEL",
  },
  {
    y: "Add year",
    t: "Internship or hackathon",
    d: "What you built and what you learned",
  },
];
const skills = [
  { n: "HTML5", l: 90, c: "Frontend" },
  { n: "CSS3", l: 85, c: "Frontend" },
  { n: "JavaScript", l: 80, c: "Frontend" },
  { n: "React", l: 70, c: "Frontend" },
  { n: "Node.js", l: 65, c: "Backend" },
  { n: "Express", l: 60, c: "Backend" },
  { n: "REST APIs", l: 65, c: "Backend" },
  { n: "MongoDB", l: 60, c: "Database" },
  { n: "MySQL", l: 60, c: "Database" },
  { n: "Git & GitHub", l: 75, c: "Tools" },
  { n: "VS Code", l: 90, c: "Tools" },
  { n: "Responsive Design", l: 85, c: "Tools" },
];
const projects = [
   {
    t: "JD Mart: Farmer Marketplace",
    d: "A web app for Maharashtra farmers to check live mandi prices and weather alerts, and to sell their crops.",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    result:
      "Built a full-stack app that shows live mandi prices and weather alerts to farmers and lets them place crop sell requests, in English and Marathi.",
    pts: [
      "Live mandi prices pulled from the government Agmarknet API and refreshed every hour with node-cron",
      "Login with OTP or password, with separate farmer, buyer and logistics roles",
      "Weather forecast with alerts for heatwave, heavy rain, frost and storms",
      "Sell-crop requests with pickup address, plus pickup and delivery tasks for logistics partners",
      "Admin dashboard to manage users, crops and prices",
      "English and Marathi language switch using i18n",
    ],
    live: "https://farmer-1s6v.onrender.com",
    repo: "https://github.com/jdsolutions5049-cpu/farmer",
  },,
   {
    t: "Study Desk: AI Study Assistant",
    d: "An AI study assistant that turns a topic into explanations and practice quizzes, with downloadable PDFs.",
    tags: ["React", "Vite", "Node.js", "Express", "MongoDB", "Gemini API"],
    result:
      "Built a full-stack AI study app that generates clickable MCQ quizzes and detailed answers using the Gemini API, with PDF downloads.",
    pts: [
      "AI-generated study content using the Gemini API",
      "Clickable multiple-choice quiz with instant answer checking",
      "Download the quiz and detailed answers as PDFs",
      "React and Vite frontend with an Express and MongoDB backend",
    ],
    live: "",
    repo: "",
  },,
 
];
const upcoming = [
  {
    t: "Interview preparation guide",
    d: " The MERN stack.",
    tags: ["React", "Node.js", "MongoDB"],
    p: 25,
    when: "Planned",
  },
  
];
/* ================================== */
const $ = (s) => document.querySelector(s);
// typing effect
let ri = 0,
  ci = 0,
  del = false;
const typed = $("#typed");
(function type() {
  const w = roles[ri];
  typed.textContent = w.slice(0, ci);
  if (!del && ci === w.length) {
    del = true;
    return setTimeout(type, 1400);
  }
  if (del && ci === 0) {
    del = false;
    ri = (ri + 1) % roles.length;
  }
  ci += del ? -1 : 1;
  setTimeout(type, del ? 40 : 80);
})();
// glow follows cursor
addEventListener("pointermove", (e) => {
  const g = $("#glow");
  g.style.left = e.clientX + "px";
  g.style.top = e.clientY + "px";
});
// fixed photo (set in me.photo; visitors cannot change it)
if (me.photo) {
  $("#photoIn").innerHTML =
    '<img alt="Aniket Menkudle" src="' + me.photo + '">';
}
// toast + personal links
let tt;
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.style.display = "block";
  clearTimeout(tt);
  tt = setTimeout(() => (t.style.display = "none"), 3500);
}
document.querySelectorAll("[data-k]").forEach((a) => {
  const k = a.dataset.k,
    v = me[k];
  if (v) {
    a.href = k === "email" ? "mailto:" + v : v;
    if (k === "resume") a.setAttribute("download", "");
    else if (k !== "email") {
      a.target = "_blank";
      a.rel = "noopener";
    }
  } else
    a.addEventListener("click", (e) => {
      e.preventDefault();
      toast(
        "Add your " +
          k +
          ' link in the "me" settings at the top of the script.',
      );
    });
});
$("#cf").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!me.email) {
    toast('Add your email in the "me" settings first.');
    return;
  }
  const b =
    "From: " +
    $("#fn").value +
    " (" +
    $("#fe").value +
    ")\n\n" +
    $("#fm").value;
  location.href =
    "mailto:" +
    me.email +
    "?subject=" +
    encodeURIComponent("Portfolio message from " + $("#fn").value) +
    "&body=" +
    encodeURIComponent(b);
});
// timeline
$("#tl").innerHTML = timeline
  .map(
    (x) =>
      `<div class="tli"><small>${x.y}</small><h3>${x.t}</h3><p>${x.d}</p></div>`,
  )
  .join("");
// skills
const cats = ["All", ...new Set(skills.map((s) => s.c))];
const tabs = $("#tabs"),
  grid = $("#skills-grid");
function renderSkills(cat) {
  grid.innerHTML = skills
    .filter((s) => cat === "All" || s.c === cat)
    .map((s) => `<div class="sk">${s.n}</div>`)
    .join("");
}
tabs.innerHTML = cats
  .map(
    (c, i) =>
      `<button class="tab${i ? "" : " on"}" data-c="${c}">${c}</button>`,
  )
  .join("");
tabs.addEventListener("click", (e) => {
  const b = e.target.closest(".tab");
  if (!b) return;
  tabs
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.toggle("on", t === b));
  renderSkills(b.dataset.c);
});
renderSkills("All");
// projects
const lk = (u, t) =>
  u
    ? `<a class="lk" href="${u}" target="_blank" rel="noopener">${t}</a>`
    : `<span class="lk off">${t}: add link</span>`;
const tg = (a) =>
  '<div class="tags">' +
  a.map((t) => `<span class="tag">${t}</span>`).join("") +
  "</div>";
$("#projGrid").innerHTML = projects
  .map(
    (p, i) =>
      `<div class="box proj" data-i="${i}" tabindex="0" role="button"><h3>${p.t}</h3><p>${p.d}</p><p class="res">${p.result}</p>${tg(p.tags)}<div class="lks">${lk(p.live, "Live site")}${lk(p.repo, "GitHub")}</div><span class="hint">View details</span></div>`,
  )
  .join("");
$("#upGrid").innerHTML = upcoming
  .map(
    (p) =>
      `<div class="box up"><h3>${p.t}</h3><p>${p.d}</p>${tg(p.tags)}<div class="st"><span>${p.when}</span><span>${p.p}% done</span></div><div class="bar"><i data-w="${p.p}"></i></div></div>`,
  )
  .join("");
// modal
const modal = $("#modal"),
  card = $("#card");
function openP(b) {
  const p = projects[b.dataset.i];
  card.innerHTML = `<h3>${p.t}</h3><p style="color:var(--muted)">${p.d}</p><p class="res">${p.result}</p>${tg(p.tags)}<ul>${p.pts.map((x) => `<li>${x}</li>`).join("")}</ul><div class="btns" style="margin:0">${p.live ? `<a class="btn p" href="${p.live}" target="_blank" rel="noopener">Live site</a>` : ""}${p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">GitHub</a>` : ""}<button class="btn" id="close">Close</button></div>`;
  modal.classList.add("show");
  $("#close").focus();
}
$("#projGrid").addEventListener("click", (e) => {
  if (e.target.closest("a")) return;
  const b = e.target.closest(".proj");
  if (b) openP(b);
});
$("#projGrid").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.classList.contains("proj")) openP(e.target);
});
const closeM = () => modal.classList.remove("show");
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.id === "close") closeM();
});
addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeM();
});
// animate upcoming bars on view + nav highlight
const io = new IntersectionObserver(
  (es) =>
    es.forEach((en) => {
      if (en.isIntersecting) {
        en.target
          .querySelectorAll("#upGrid i")
          .forEach((i) => (i.style.width = i.dataset.w + "%"));
      }
    }),
  { threshold: 0.2 },
);
io.observe($("#upcoming"));
const links = [...document.querySelectorAll("nav a")];
const so = new IntersectionObserver(
  (es) =>
    es.forEach((en) => {
      if (en.isIntersecting)
        links.forEach((a) =>
          a.classList.toggle(
            "on",
            a.getAttribute("href") === "#" + en.target.id,
          ),
        );
    }),
  { rootMargin: "-45% 0px -50% 0px" },
);
document.querySelectorAll("section").forEach((s) => so.observe(s));
