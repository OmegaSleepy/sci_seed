class TextObfuscator {
 constructor(selector = '.obfuscated', speed = 80) {
  this.selector = selector;
  this.speed = speed;
  this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  this.intervals = [];
  this.observedElements = new Set(); // Prevent double-binding elements

  if (document.readyState === "loading") {
   document.addEventListener("DOMContentLoaded", () => this.startObserving());
  } else {
   this.startObserving();
  }
 }

 // Watch the DOM for newly added elements
 startObserving() {
  // 1. Check if elements exist right away (for pages like index)
  this.scanAndApply();

  // 2. Watch for elements added later dynamically (for your markdown reader)
  const observer = new MutationObserver(() => {
   this.scanAndApply();
  });

  observer.observe(document.body, {
   childList: true,
   subtree: true
  });
 }

 scanAndApply() {
  const elements = document.querySelectorAll(this.selector);

  elements.forEach(el => {
   // If we've already attached an interval to this element, skip it
   if (this.observedElements.has(el)) return;
   this.observedElements.add(el);

   const length = el.textContent.trim().length || 7;
   const intervalId = setInterval(() => {
    el.textContent = this.generateJunkText(length);
   }, this.speed);

   this.intervals.push(intervalId);
  });
 }

 generateJunkText(length) {
  let junkText = "";
  for (let i = 0; i < length; i++) {
   const randomIndex = Math.floor(Math.random() * this.chars.length);
   junkText += this.chars[randomIndex];
  }
  return junkText;
 }

 destroy() {
  this.intervals.forEach(id => clearInterval(id));
  this.intervals = [];
  this.observedElements.clear();
 }
}

// Kick off the script
const obfuscator = new TextObfuscator('.obfuscated', 80);