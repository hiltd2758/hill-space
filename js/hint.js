document.addEventListener("DOMContentLoaded", () => {
    const hint = document.querySelector(".glitch-hint");
    setTimeout(() => {
        hint.classList.add("active"); // Hiện sau 2s
    }, 2000);
});