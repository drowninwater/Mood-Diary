document.addEventListener('DOMContentLoaded', () => {
    const moodForm = document.getElementById('moodForm');
    const entriesContainer = document.getElementById('entries');

    moodForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get user input
        const selectedMood = moodForm.mood.value;
        const text = moodForm.text.value;
        const image = moodForm.image.files[0];
        const music = moodForm.music.files[0];
        const entryDate = moodForm.entryDate.value;

        // Create an object to store the entry
        const entryData = {
            mood: selectedMood,
            date: entryDate,
            text: text,
            imageURL: URL.createObjectURL(image),
            audioURL: URL.createObjectURL(music),
        };

        // Save the entry in local storage
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        entries.push(entryData);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));

        // Display the entry on the page
        displayEntry(entryData);

        // Clear the form
        moodForm.reset();
    });

    // Function to display the entry on the page
    function displayEntry(entryData) {
        // Create an entry element as before
        const entry = document.createElement('div');
        entry.classList.add('entry');
        entry.innerHTML = `
            <h2>${entryData.mood} Mood</h2>
            <p>Date: ${entryData.date}</p>
            <p>${entryData.text}</p>
            <img src="${entryData.imageURL}" alt="Image">
            <audio controls>
                <source src="${entryData.audioURL}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;

        // Append the entry to the entries container
        entriesContainer.appendChild(entry);
    }
});
