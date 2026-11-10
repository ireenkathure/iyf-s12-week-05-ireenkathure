// Lesson 9 - DOM Practice - Ireen Kathure
// RULES: querySelector, textContent, classList, const/let only

const check = (label, ok) => console.log(`${ok ? "✓" : "✗"} ${label}`);

// STEP 1 - Task 9.1: select TEN ways
const h1 = document.querySelector("h1");
const contentParas = document.querySelectorAll(".content");
const contactForm = document.getElementById("contact-form");
const emailInput = document.querySelector("#contact-form input[type='email']");
const navItems = document.querySelectorAll("nav li");
const firstNavLink = document.querySelector(".nav-link");
const lastParaInArticle = document.querySelector("article p:last-of-type");
const submitButton = document.querySelector("button[type='submit']");
const allH2InMain = document.querySelectorAll("main h2");
const footer = document.querySelector("footer");

console.log(h1, contentParas, contactForm, emailInput, navItems);
console.log(firstNavLink, lastParaInArticle, submitButton, allH2InMain, footer);

const missing = document.querySelector(".does-not-exist");
console.log(missing); // null
check("querySelector missing returns null", missing === null);

const navTexts = [...navItems].map((li) => li.textContent.trim());
console.log(navTexts);
check("Nav texts as array", navTexts.length === 3);

// STEP 2 - Task 9.2: traverse
const header = document.querySelector("header");
const navInsideHeader = header.querySelector("nav");
check("Header contains nav", !!navInsideHeader);

const parentLi = firstNavLink.parentElement;
check("First nav-link parent is li", parentLi.tagName === "LI");

const article = document.querySelector("article");
const nextAfterArticle = article.nextElementSibling;
check("Article next sibling is section", nextAfterArticle.tagName === "SECTION");

const ul = document.querySelector("ul");
const ulChildren = ul.children;
check("UL has 3 li children", ulChildren.length === 3);

const bodyFromFooter = footer.parentElement;
check("Footer parent is body", bodyFromFooter.tagName === "BODY");

const headerViaClosest = firstNavLink.closest("header");
check("closest() reaches header", headerViaClosest === header);

// STEP 3 - Task 9.3: change things
h1.textContent = "DOM Practice by Ireen Kathure";
check("H1 changed", h1.textContent.includes("Ireen"));

firstNavLink.href = "https://developer.mozilla.org";
firstNavLink.target = "_blank";
firstNavLink.rel = "noopener";
check("First nav-link points to MDN", firstNavLink.href.includes("developer.mozilla.org"));

console.log("data-id:", article.dataset.id);
console.log("data-category:", article.dataset.category);
article.dataset.status = "reviewed";
check("data-status added", article.dataset.status === "reviewed");

const firstContent = document.querySelector(".content");
firstContent.classList.add("highlight");
const allContent = document.querySelectorAll(".content");
allContent[1].classList.toggle("accent");
check("highlight added", firstContent.classList.contains("highlight"));

// Injection demo
const userInput = `<img src="x" onerror="alert('hacked!')">`;
document.getElementById("unsafe").innerHTML = userInput;
document.getElementById("safe").textContent = userInput;
// I would use textContent for a user's comment because innerHTML runs HTML/JS and lets attackers inject scripts, while textContent shows it as harmless text.

// STEP 4 - Task 9.4: create, remove, clone
function addNavItem(text, href) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.className = "nav-link";
  a.href = href;
  a.textContent = text;
  li.append(a);
  document.querySelector(".nav-list").append(li);
}
addNavItem("Blog", "#blog");
addNavItem("Portfolio", "#portfolio");
check("Nav items added", document.querySelectorAll(".nav-list li").length === 5);

const newPara = document.createElement("p");
newPara.textContent = "Inserted before the first paragraph.";
const firstPara = article.querySelector("p");
article.insertBefore(newPara, firstPara);

const firstLi = document.querySelector(".nav-list li");
const clonedLi = firstLi.cloneNode(true);
clonedLi.querySelector("a").textContent = "Cloned";
document.querySelector(".nav-list").prepend(clonedLi);

footer.remove();
check("Footer removed", !document.querySelector("footer"));
