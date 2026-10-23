// ===== Mobile menu (opens with a CSS checkbox; JS only adds extras) =====
const menuToggle = document.getElementById("menu-toggle");
if (menuToggle) {
	const closeMenu = () => {
		menuToggle.checked = false;
	};
	document
		.querySelectorAll("#menu a")
		.forEach((a) => a.addEventListener("click", closeMenu));
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeMenu();
	});
	document.addEventListener("click", (e) => {
		if (!e.target.closest("header")) closeMenu();
	});
	window.matchMedia("(min-width: 861px)").addEventListener("change", closeMenu);
}

const reduceMotion = window.matchMedia(
	"(prefers-reduced-motion: reduce)",
).matches;
const canHover = window.matchMedia("(hover: hover)").matches;
const introMs =
	document.documentElement.classList.contains("seen") || reduceMotion
		? 0
		: 1300;

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
	".head, .svc, .work-grid .card, .sub, .timeline li, .edu-grid .edu, .training h3, .cert-list li, .skills-grid > div, .contact-box",
);
revealTargets.forEach((el) => {
	el.classList.add("reveal");
	const index = Array.from(el.parentElement.children).indexOf(el);
	el.style.setProperty("--d", Math.min(index, 5) * 0.09 + "s");
});
if (reduceMotion || !("IntersectionObserver" in window)) {
	revealTargets.forEach((el) => el.classList.add("in"));
} else {
	const revealObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("in");
					revealObserver.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12 },
	);
	revealTargets.forEach((el) => revealObserver.observe(el));
}

// ===== Count-up stats (starts when the stats scroll into view) =====
(function () {
	const box = document.querySelector(".stats");
	if (!box) return;

	const items = Array.from(box.querySelectorAll("b"))
		.map((el) => {
			const text = el.textContent.trim();
			return {
				el,
				text,
				target: parseInt(text, 10),
				suffix: text.replace(/[0-9]/g, ""),
			};
		})
		.filter((s) => !isNaN(s.target));
	if (!items.length) return;

	// start every number at 0
	items.forEach((s) => {
		s.el.textContent = "0" + s.suffix;
	});

	const duration = reduceMotion ? 900 : 2000;
	let started = false;

	function run() {
		let begin = null;
		function tick(now) {
			// take the start time from the first animation frame itself
			if (begin === null) begin = now;
			const t = Math.min(Math.max((now - begin) / duration, 0), 1);
			const eased = 1 - Math.pow(1 - t, 3);
			items.forEach((s) => {
				s.el.textContent = Math.round(s.target * eased) + s.suffix;
			});
			if (t < 1) {
				requestAnimationFrame(tick);
			} else {
				items.forEach((s) => {
					s.el.textContent = s.text;
				});
			}
		}
		requestAnimationFrame(tick);
	}

	function start() {
		if (started) return;
		started = true;
		// if the stats are visible on first load, wait for the intro curtain and the pills fading in
		const wait = Math.max(0, introMs + 900 - performance.now());
		setTimeout(run, wait);
	}

	if ("IntersectionObserver" in window) {
		const statsObserver = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					statsObserver.disconnect();
					start();
				}
			},
			{ threshold: 0.6 },
		);
		statsObserver.observe(box);
	} else {
		start();
	}
})();

// ===== Scroll progress bar + header shadow =====
const progress = document.querySelector(".progress");
const header = document.querySelector("header");
const hero = document.querySelector(".hero");
function onScroll() {
	const max = document.documentElement.scrollHeight - window.innerHeight;
	progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
	header.classList.toggle("scrolled", window.scrollY > 10);
	if (hero) hero.style.setProperty("--sy", Math.min(window.scrollY, 900));
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Highlight the current section in the nav =====
if ("IntersectionObserver" in window) {
	const links = document.querySelectorAll('nav a[href^="#"]:not(.pill)');
	const sections = Array.from(links)
		.map((a) => document.querySelector(a.getAttribute("href")))
		.filter(Boolean);
	const navObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					links.forEach((a) =>
						a.classList.toggle(
							"active",
							a.getAttribute("href") === "#" + entry.target.id,
						),
					);
				}
			});
		},
		{ rootMargin: "-40% 0px -55% 0px" },
	);
	sections.forEach((s) => navObserver.observe(s));
}

// ===== Remember the intro curtain for this visit =====
try {
	sessionStorage.setItem("seen", "1");
} catch (e) {}

// ===== Headline: words slide up one by one =====
const h1 = document.querySelector(".hero h1");
if (h1 && !reduceMotion) {
	const makeWord = (content, i) => {
		const outer = document.createElement("span");
		outer.className = "w";
		const inner = document.createElement("span");
		inner.style.setProperty("--i", i);
		inner.appendChild(content);
		outer.appendChild(inner);
		return outer;
	};
	h1.setAttribute("aria-label", h1.textContent.trim().replace(/\s+/g, " "));
	const frag = document.createDocumentFragment();
	let n = 0;
	h1.childNodes.forEach((node) => {
		if (node.nodeType === Node.TEXT_NODE) {
			node.textContent
				.split(/\s+/)
				.filter(Boolean)
				.forEach((word) => {
					frag.appendChild(makeWord(document.createTextNode(word), n++));
					frag.appendChild(document.createTextNode(" "));
				});
		} else {
			frag.appendChild(makeWord(node.cloneNode(true), n++));
		}
	});
	h1.textContent = "";
	h1.appendChild(frag);
	h1.classList.add("split");
}

// ===== Floating blobs behind the hero =====
if (hero && !reduceMotion) {
	["b1", "b2", "b3"].forEach((cls) => {
		const blob = document.createElement("div");
		blob.className = "blob " + cls;
		blob.setAttribute("aria-hidden", "true");
		hero.prepend(blob);
	});
}

// ===== 3D tilt + shine on project cards =====
if (canHover && !reduceMotion) {
	document.querySelectorAll(".work-grid .card").forEach((card) => {
		card.classList.add("tilt");
		card.addEventListener("pointermove", (e) => {
			const r = card.getBoundingClientRect();
			const x = (e.clientX - r.left) / r.width;
			const y = (e.clientY - r.top) / r.height;
			card.style.setProperty("--ry", (x - 0.5) * 7 + "deg");
			card.style.setProperty("--rx", (0.5 - y) * 7 + "deg");
			card.style.setProperty("--mx", x * 100 + "%");
			card.style.setProperty("--my", y * 100 + "%");
		});
		card.addEventListener("pointerleave", () => {
			["--rx", "--ry", "--mx", "--my"].forEach((p) =>
				card.style.removeProperty(p),
			);
		});
	});
}

// ===== Cursor sparkle trail =====
if (canHover && !reduceMotion) {
	const colors = ["#E0709B", "#A93F86", "#F2B84B", "#B79AE8"];
	let last = 0;
	window.addEventListener("pointermove", (e) => {
		const now = performance.now();
		if (now - last < 70) return;
		last = now;
		const s = document.createElement("span");
		s.className = "trail";
		s.textContent = "✦";
		s.style.left = e.clientX + "px";
		s.style.top = e.clientY + "px";
		s.style.color = colors[Math.floor(Math.random() * colors.length)];
		s.style.fontSize = 10 + Math.random() * 12 + "px";
		s.style.setProperty("--dx", Math.random() * 40 - 20 + "px");
		document.body.appendChild(s);
		setTimeout(() => s.remove(), 900);
	});
}
