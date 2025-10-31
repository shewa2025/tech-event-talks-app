document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule-container');
  const categorySearchInput = document.getElementById('categorySearchInput');
  const speakerSearchInput = document.getElementById('speakerSearchInput');
  let talks = [];

  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  function filterTalks() {
    const categoryTerm = categorySearchInput.value.toLowerCase();
    const speakerTerm = speakerSearchInput.value.toLowerCase();

    const filteredTalks = talks.filter(talk => {
      const categoryMatch = categoryTerm === '' || talk.categories.some(category => category.toLowerCase().includes(categoryTerm));
      const speakerMatch = speakerTerm === '' || talk.speakers.some(speaker => speaker.toLowerCase().includes(speakerTerm));
      return categoryMatch && speakerMatch;
    });

    renderSchedule(filteredTalks);
  }

  categorySearchInput.addEventListener('input', filterTalks);
  speakerSearchInput.addEventListener('input', filterTalks);

  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

    talksToRender.forEach((talk, index) => {
      const startTime = new Date(currentTime);
      const endTime = new Date(startTime.getTime() + talk.duration * 60000);

      const scheduleItem = document.createElement('div');
      scheduleItem.classList.add('schedule-item');

      scheduleItem.innerHTML = `
        <div class="schedule-time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
        <h2 class="talk-title">${talk.title}</h2>
        <div class="talk-speakers">By: ${talk.speakers.join(', ')}</div>
        <p>${talk.description}</p>
        <div class="talk-categories">
          ${talk.categories.map(cat => `<span>${cat}</span>`).join('')}
        </div>
      `;
      scheduleContainer.appendChild(scheduleItem);

      currentTime = new Date(endTime.getTime());

      // Add breaks
      if (index === 2) { // Lunch break after the 3rd talk
        const breakEndTime = new Date(currentTime.getTime() + 60 * 60000);
        addBreak('Lunch Break', currentTime, breakEndTime);
        currentTime = breakEndTime;
      } else if (index < talksToRender.length - 1) {
        const breakEndTime = new Date(currentTime.getTime() + 10 * 60000);
        addBreak('Transition', currentTime, breakEndTime);
        currentTime = breakEndTime;
      }
    });
  }

  function addBreak(title, startTime, endTime) {
    const breakItem = document.createElement('div');
    breakItem.classList.add('schedule-item', 'break');
    breakItem.innerHTML = `
      <div class="schedule-time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
      <div>${title}</div>
    `;
    scheduleContainer.appendChild(breakItem);
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});
