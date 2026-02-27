document.addEventListener('DOMContentLoaded', () => {
    const schedule = window.talkSchedule; // Data injected from the Node.js script
    const scheduleContainer = document.getElementById('schedule-container');
    const searchInput = document.getElementById('category-search');

    function renderSchedule(filterCategory = '') {
        scheduleContainer.innerHTML = ''; // Clear existing schedule

        const filteredSchedule = schedule.filter(item => {
            if (!filterCategory) return true; // Show all if no filter
            if (!item.category || item.category.length === 0) return false; // Breaks have no category
            return item.category.some(cat =>
                cat.toLowerCase().includes(filterCategory.toLowerCase())
            );
        });

        filteredSchedule.forEach(item => {
            const card = document.createElement('div');
            card.classList.add(item.id.includes('transition') || item.id.includes('lunch') ? 'break-card' : 'talk-card');
            
            let speakersHtml = '';
            if (item.speakers && item.speakers.length > 0) {
                speakersHtml = `<p class="speakers"><strong>Speaker(s):</strong> ${item.speakers.join(', ')}</p>`;
            }

            let categoryHtml = '';
            if (item.category && item.category.length > 0) {
                categoryHtml = `<p class="category"><strong>Category:</strong> ${item.category.map(cat => `<span>${cat}</span>`).join('')}</p>`;
            }

            card.innerHTML = `
                <h2>${item.time} - ${item.title}</h2>
                ${speakersHtml}
                ${categoryHtml}
                <p>${item.description}</p>
            `;
            scheduleContainer.appendChild(card);
        });
    }

    // Initial render
    renderSchedule();

    // Search functionality
    searchInput.addEventListener('input', (event) => {
        renderSchedule(event.target.value);
    });
});
