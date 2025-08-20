document.addEventListener('DOMContentLoaded', () => {
    const currentDateEl = document.querySelector('.current-date .month-year');
    const prevButton = document.querySelector('.nav-arrows .icon:first-child');
    const nextButton = document.querySelector('.nav-arrows .icon:last-child');
    const todayButton = document.querySelector('.nav-button');
    const calendarGrid = document.querySelector('.calendar-grid');

    let date = new Date(); // This object holds the current month and year

    const renderCalendar = () => {
        date.setDate(1); // Set the day to the 1st to get the correct start day of the week
        const firstDayIndex = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

        // Array of month names
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // Update the header with the current month and year
        currentDateEl.textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;

        // Clear the calendar grid before re-rendering
        calendarGrid.innerHTML = '';
        
        // Add day headers (Sun, Mon, Tue, etc.)
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(header => {
            const dayHeaderDiv = document.createElement('div');
            dayHeaderDiv.classList.add('day-header');
            dayHeaderDiv.textContent = header;
            calendarGrid.appendChild(dayHeaderDiv);
        });

        // Previous month's days
        for (let x = firstDayIndex; x > 0; x--) {
            const prevDayCell = document.createElement('div');
            prevDayCell.classList.add('day-cell');
            prevDayCell.classList.add('prev-date');
            prevDayCell.textContent = prevLastDay - x + 1;
            calendarGrid.appendChild(prevDayCell);
        }

        // Current month's days
        for (let i = 1; i <= lastDay; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell');
            dayCell.textContent = i;

            // Check if it's the current date
            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                dayCell.classList.add('today-cell');
            }
            
            calendarGrid.appendChild(dayCell);
        }
    };

    // Event listeners for navigation
    prevButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    todayButton.addEventListener('click', () => {
        date = new Date();
        renderCalendar();
    });

    // Initial render
    renderCalendar();
});