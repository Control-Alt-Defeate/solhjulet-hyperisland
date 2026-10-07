const tabs = document.querySelectorAll('.news-tab');
const cards = document.querySelectorAll('.news-card');
const emptyMessage = document.querySelector('.news-empty');
const status = document.getElementById('news-status');

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;

        tabs.forEach((otherTab) => {
            const isActive = otherTab === tab;

            otherTab.classList.toggle('news-tab-active', isActive);
            otherTab.setAttribute('aria-pressed', String(isActive));
        });

        let visibleCount = 0;

        cards.forEach((card) => {
            const isVisible = filter === 'all' || card.dataset.category === filter;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        emptyMessage.hidden = visibleCount > 0;

        const label = tab.textContent.trim();
        const itemWord = visibleCount === 1 ? 'item' : 'items';

        status.textContent = `Showing ${visibleCount} news ${itemWord} in ${label}`;
    });
});
