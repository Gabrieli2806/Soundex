// Modal Functions
function openModal(modalType) {
    const modalId = modalType + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalType) {
    const modalId = modalType + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            const modalId = this.id;
            const modalType = modalId.replace('Modal', '');
            closeModal(modalType);
        }
    });
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            const modalId = modal.id;
            const modalType = modalId.replace('Modal', '');
            closeModal(modalType);
        });
    }
});

// Piano functionality
const piano = document.getElementById('piano');
const btnToggleNotes = document.getElementById('btn-toggle-notes');

if (btnToggleNotes) {
    btnToggleNotes.addEventListener('click', () => {
        piano.classList.toggle('show-notes');
        btnToggleNotes.textContent = piano.classList.contains('show-notes') ? 'Ocultar Notas' : 'Ver Notas';
    });
}

// Make piano keys clickable
if (piano) {
    piano.querySelectorAll('.key').forEach(key => {
        key.addEventListener('click', () => {
            key.classList.add('active');
            setTimeout(() => {
                key.classList.remove('active');
            }, 100);
        });
    });
}

// Category switching functionality
const navItems = document.querySelectorAll('.nav-item');
const categoryContents = document.querySelectorAll('.category-content');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the category data attribute
        const categoryId = item.getAttribute('data-category');
        
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Hide all category contents
        categoryContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show the selected category
        const selectedCategory = document.getElementById('category-' + categoryId);
        if (selectedCategory) {
            selectedCategory.classList.add('active');
        }
    });
});

// Search functionality
const searchInput = document.querySelector('.search-bar input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
    });
}

console.log('Soundex - Modern Music Education Platform Loaded');
