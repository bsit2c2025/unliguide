// simple reviewer notes using localStorage

function getSubjectName() {
    // assume filename without extension is subject
    const path = window.location.pathname;
    const parts = path.split('/');
    const file = parts[parts.length - 1];
    return file.replace('.html', '');
}

function loadNotes() {
    const subject = getSubjectName();
    const notes = JSON.parse(localStorage.getItem('notes_' + subject) || '[]');
    const list = document.getElementById('notesList');
    list.innerHTML = '';
    if (notes.length === 0) {
        list.innerHTML = '<p>No reviewers yet.</p>';
    } else {
        const ul = document.createElement('ul');
        notes.forEach(note => {
            const li = document.createElement('li');
            li.textContent = note;
            ul.appendChild(li);
        });
        list.appendChild(ul);
    }
}

function addNote() {
    const input = document.getElementById('noteInput');
    const text = input.value.trim();
    if (!text) return;
    const subject = getSubjectName();
    const notes = JSON.parse(localStorage.getItem('notes_' + subject) || '[]');
    notes.push(text);
    localStorage.setItem('notes_' + subject, JSON.stringify(notes));
    input.value = '';
    loadNotes();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('notesArea')) {
        loadNotes();
        document.getElementById('addBtn').addEventListener('click', addNote);
    }
});