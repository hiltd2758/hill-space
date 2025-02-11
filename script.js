document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        document.querySelectorAll('.resource-category').forEach(category => {
            category.style.display = (filter === 'all' || category.dataset.category === filter) ? 'block' : 'none';
        });
    });
});
document.querySelectorAll(".cta-button").forEach(button => {
button.addEventListener("click", function (e) {
    let ripple = document.createElement("span");
    ripple.classList.add("ripple");

    let rect = this.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    this.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
});
});
