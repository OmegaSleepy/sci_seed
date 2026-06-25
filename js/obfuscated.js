document.addEventListener("DOMContentLoaded", () => {
 const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

 // Find every <obfuscated> element on the page
 const elements = document.querySelectorAll('obfuscated');

 elements.forEach(el => {
  const length = el.textContent.trim().length || 7;

  setInterval(() => {
   let junkText = "";
   for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    junkText += chars[randomIndex];
   }
   el.textContent = junkText;
  }, 80);
 });
});