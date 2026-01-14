// Language Dropdown Handler
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langOptions = document.querySelectorAll('.lang-option');
const langLabel = document.getElementById('langLabel');

if (langBtn) {
    langBtn.addEventListener('click', () => {
        langDropdown.classList.toggle('active');
        langBtn.classList.toggle('active');
    });
}

langOptions.forEach(option => {
    option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        const langText = option.querySelector('span').textContent;
        
        // Update label
        langLabel.textContent = langText;
        
        // Mark as selected
        langOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        // Close dropdown
        langDropdown.classList.remove('active');
        langBtn.classList.remove('active');
        
        // Change language
        setLanguage(lang);
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-toggle')) {
        langDropdown.classList.remove('active');
        langBtn.classList.remove('active');
    }
});

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

// Audio Engine
const AudioEngine = {
    ctx: null,
    
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    getNoteFreq(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        
        // Parse note (e.g., "C#4", "A0")
        const match = note.match(/^([A-G]#?)(\d)$/);
        if (!match) return 261.63; // Default C4
        
        const noteName = match[1];
        const octave = parseInt(match[2]);
        const noteIndex = notes.indexOf(noteName);
        
        // Calculate frequency relative to A4 (440Hz)
        // A4 is index 9 in octave 4
        const semitones = (octave - 4) * 12 + (noteIndex - 9);
        return 440 * Math.pow(2, semitones / 12);
    },

    playTone(freq, type = 'sine', duration = 0.5) {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.value = freq;
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        const now = this.ctx.currentTime;
        osc.start(now);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + duration);
        osc.stop(now + duration);
    },

    playChord(type) {
        this.init();
        // Define chords frequencies (Root C)
        const chords = {
            'major': [261.63, 329.63, 392.00], // C Major (C-E-G)
            'minor': [261.63, 311.13, 392.00], // C Minor (C-Eb-G)
            'augmented': [261.63, 329.63, 415.30], // C Aug (C-E-G#)
            'diminished': [261.63, 311.13, 370.00] // C Dim (C-Eb-Gb)
        };
        
        const notes = chords[type];
        if (notes) {
            notes.forEach((freq, i) => {
                setTimeout(() => this.playTone(freq, 'triangle', 1.5), i * 50);
            });
        }
    },
    
    playRhythm(measure) {
        this.init();
        let beats = [];
        if (measure === '4/4') beats = [1, 0, 0, 0]; // 1 = strong, 0 = weak
        if (measure === '3/4') beats = [1, 0, 0];
        if (measure === '2/4') beats = [1, 0];
        
        const now = this.ctx.currentTime;
        const tempo = 0.5; // seconds per beat
        
        beats.forEach((beat, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            const time = now + i * tempo;
            
            if (beat === 1) {
                osc.frequency.value = 440; // Strong beat (A4)
                gain.gain.setValueAtTime(0.5, time);
            } else {
                osc.frequency.value = 330; // Weak beat (E4)
                gain.gain.setValueAtTime(0.2, time);
            }
            
            osc.start(time);
            osc.stop(time + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        });
    }
};

function renderPiano() {
    const pianoContainer = document.getElementById('piano');
    if (!pianoContainer) return;
    
    pianoContainer.innerHTML = '';
    
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let html = '';
    let whiteKeyIndex = 0;
    
    // Generate 88 keys (A0 to C8)
    for (let octave = 0; octave <= 8; octave++) {
        for (let i = 0; i < 12; i++) {
            // Skip notes below A0
            if (octave === 0 && i < 9) continue;
            // Skip notes above C8
            if (octave === 8 && i > 0) break;
            
            const noteName = notes[i];
            const note = `${noteName}${octave}`;
            const isBlack = noteName.includes('#');
            
            if (!isBlack) {
                html += `<div class="key white" data-note="${note}"><span>${noteName}</span></div>`;
                whiteKeyIndex++;
            } else {
                // Position black key relative to the previous white key
                // 22px is the width of a white key (20px) + gap (2px)
                // -8px centers the 14px black key on the 2px gap (22 - 14/2 - 2/2 = 14? No.)
                // Center of gap is at: whiteKeyIndex * 22 - 1.
                // Black key width 14. Half is 7.
                // Left = (whiteKeyIndex * 22 - 1) - 7 = whiteKeyIndex * 22 - 8.
                const left = whiteKeyIndex * 22 - 8;
                html += `<div class="key black" data-note="${note}" style="left: ${left}px"><span>${noteName}</span></div>`;
            }
        }
    }
    
    pianoContainer.innerHTML = html;
}

// Initialize interactive elements when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing interactive elements...');
    
    renderPiano();

    // Resume AudioContext on first interaction
    document.body.addEventListener('click', () => {
        if (AudioEngine.ctx && AudioEngine.ctx.state === 'suspended') {
            AudioEngine.ctx.resume();
        }
    }, { once: true });

    // Piano event delegation
    const pianoContainer = document.getElementById('piano');
    if (pianoContainer) {
        pianoContainer.addEventListener('click', (e) => {
            const key = e.target.closest('.key');
            if (key) {
                // Visual feedback
                key.classList.add('active');
                setTimeout(() => {
                    key.classList.remove('active');
                }, 100);
                
                // Audio feedback
                const note = key.getAttribute('data-note');
                if (note) {
                    console.log('Playing note:', note);
                    const freq = AudioEngine.getNoteFreq(note);
                    AudioEngine.playTone(freq, 'sine', 1.0);
                }
            }
        });
    }

    // Make chords clickable
    const chordCards = document.querySelectorAll('.chord-card');
    chordCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.getAttribute('data-chord-type');
            if (type) {
                console.log('Playing chord:', type);
                // Visual feedback
                card.style.transform = 'scale(0.95)';
                setTimeout(() => card.style.transform = '', 150);
                
                // Audio feedback
                AudioEngine.playChord(type);
            }
        });
    });

    // Make rhythm measures clickable
    const rhythmCards = document.querySelectorAll('.compas-card');
    rhythmCards.forEach(card => {
        card.addEventListener('click', () => {
            const measure = card.getAttribute('data-measure');
            if (measure) {
                console.log('Playing rhythm:', measure);
                // Visual feedback
                card.style.borderColor = '#00d4ff';
                setTimeout(() => card.style.borderColor = '', 1500); // Keep active during playback approx
                
                // Audio feedback
                AudioEngine.playRhythm(measure);
                
                // Animate beats
                const beats = card.querySelectorAll('.beats-demo span');
                beats.forEach((beat, i) => {
                    setTimeout(() => {
                        beat.style.backgroundColor = '#00d4ff';
                        beat.style.color = '#000';
                        setTimeout(() => {
                            beat.style.backgroundColor = '';
                            beat.style.color = '';
                        }, 200);
                    }, i * 500);
                });
            }
        });
    });
});

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
