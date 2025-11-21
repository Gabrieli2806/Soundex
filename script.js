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
    modal.addEventListener('click', function (e) {
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

// --- Interactive Lessons Logic ---

let currentLesson = null;
let audioContext = null;
let analyser = null;
let microphone = null;
let pitchInterval = null;
let rhythmInterval = null;
let currentTargetNote = 'C4';
let currentChordType = 'major';
let rhythmScore = 0;
let isRecording = false;

// Lesson Modal Management
window.openLesson = function (type) {
    const modal = document.getElementById('lesson-modal');
    const interfaces = document.querySelectorAll('.lesson-interface');

    // Hide all interfaces
    interfaces.forEach(i => i.classList.add('hidden'));

    // Show selected interface
    const selectedInterface = document.getElementById(`${type}-interface`);
    if (selectedInterface) {
        selectedInterface.classList.remove('hidden');
        modal.classList.add('active');
        currentLesson = type;

        // Reset states
        if (type === 'solfege') resetSolfege();
        if (type === 'rhythm') resetRhythm();
        if (type === 'harmony') resetHarmony();
    }
};

window.closeLesson = function () {
    const modal = document.getElementById('lesson-modal');
    modal.classList.remove('active');
    stopMicrophone();
    stopRhythmGame();
    currentLesson = null;
};

// --- Solfège (Pitch Detection) ---

function resetSolfege() {
    document.getElementById('pitch-feedback').textContent = "Presiona 'Activar Micrófono' para empezar";
    document.getElementById('mic-bar').style.width = '0%';
    generateNewTargetNote();
}

document.getElementById('btn-start-mic')?.addEventListener('click', startMicrophone);

async function startMicrophone() {
    if (isRecording) return;

    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        microphone = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        microphone.connect(analyser);

        isRecording = true;
        document.getElementById('btn-start-mic').textContent = "Escuchando...";
        document.getElementById('btn-start-mic').classList.add('active');

        detectPitch();
    } catch (err) {
        console.error('Error accessing microphone:', err);
        alert('No se pudo acceder al micrófono. Asegúrate de dar permisos.');
    }
}

function stopMicrophone() {
    if (pitchInterval) cancelAnimationFrame(pitchInterval);
    if (microphone) {
        microphone.mediaStream.getTracks().forEach(track => track.stop());
        microphone.disconnect();
    }
    isRecording = false;
    const btn = document.getElementById('btn-start-mic');
    if (btn) btn.textContent = "Activar Micrófono";
}

function detectPitch() {
    if (!isRecording) return;

    const bufferLength = analyser.fftSize;
    const buffer = new Float32Array(bufferLength);
    analyser.getFloatTimeDomainData(buffer);

    const frequency = autoCorrelate(buffer, audioContext.sampleRate);

    updatePitchVisualizer(frequency);

    if (frequency !== -1) {
        const note = getNoteFromFrequency(frequency);
        checkPitchMatch(note);
    }

    pitchInterval = requestAnimationFrame(detectPitch);
}

function autoCorrelate(buf, sampleRate) {
    // Simple autocorrelation
    const SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) {
        const val = buf[i];
        rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    if (rms < 0.01) return -1; // Too quiet

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++)
        if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    for (let i = 1; i < SIZE / 2; i++)
        if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

    const buf2 = buf.slice(r1, r2);
    const c = new Array(buf2.length).fill(0);

    for (let i = 0; i < buf2.length; i++) {
        for (let j = 0; j < buf2.length - i; j++) {
            c[i] = c[i] + buf2[j] * buf2[j + i];
        }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;

    for (let i = d; i < buf2.length; i++) {
        if (c[i] > maxval) {
            maxval = c[i];
            maxpos = i;
        }
    }

    let T0 = maxpos;
    return sampleRate / T0;
}

function getNoteFromFrequency(frequency) {
    const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const pitch = 12 * (Math.log(frequency / 440) / Math.log(2)) + 69;
    const noteIndex = Math.round(pitch) % 12;
    const octave = Math.floor(Math.round(pitch) / 12) - 1;
    return noteStrings[noteIndex] + octave;
}

function updatePitchVisualizer(frequency) {
    const bar = document.getElementById('mic-bar');
    if (frequency > 0) {
        // Map frequency to width (approx 100Hz to 1000Hz)
        let percentage = Math.min(100, Math.max(0, (frequency - 100) / 900 * 100));
        bar.style.width = percentage + '%';
    }
}

function checkPitchMatch(detectedNote) {
    const feedback = document.getElementById('pitch-feedback');

    if (detectedNote === currentTargetNote) {
        feedback.textContent = `¡Correcto! Cantaste ${detectedNote}`;
        feedback.style.color = '#00d4ff';
        setTimeout(generateNewTargetNote, 1500);
    } else {
        feedback.textContent = `Escuchando: ${detectedNote} (Objetivo: ${currentTargetNote})`;
        feedback.style.color = '#fff';
    }
}

function generateNewTargetNote() {
    const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4'];
    currentTargetNote = notes[Math.floor(Math.random() * notes.length)];
    document.getElementById('target-note').textContent = currentTargetNote;
    document.getElementById('pitch-feedback').textContent = "Canta la nota...";
    document.getElementById('pitch-feedback').style.color = '#fff';
}

// --- Rhythm Game ---

let rhythmBeats = [];
let currentBeatIndex = 0;
let lastBeatTime = 0;

function resetRhythm() {
    rhythmScore = 0;
    document.getElementById('rhythm-score').textContent = rhythmScore;
    document.getElementById('beat-indicator').classList.remove('active');
}

document.getElementById('btn-start-rhythm')?.addEventListener('click', startRhythmGame);
document.getElementById('btn-tap')?.addEventListener('click', handleTap);

function startRhythmGame() {
    if (rhythmInterval) clearInterval(rhythmInterval);

    const bpm = 80;
    const interval = 60000 / bpm;

    document.getElementById('btn-start-rhythm').textContent = "Reiniciar";

    rhythmInterval = setInterval(() => {
        playMetronomeClick();
        flashBeatIndicator();
        lastBeatTime = Date.now();
    }, interval);
}

function stopRhythmGame() {
    if (rhythmInterval) clearInterval(rhythmInterval);
}

function playMetronomeClick() {
    AudioEngine.playTone(880, 'square', 0.05);
}

function flashBeatIndicator() {
    const indicator = document.getElementById('beat-indicator');
    indicator.classList.add('active');
    setTimeout(() => indicator.classList.remove('active'), 100);
}

function handleTap() {
    const now = Date.now();
    const timeSinceBeat = now - lastBeatTime;
    const bpm = 80;
    const interval = 60000 / bpm;

    // Calculate offset from nearest beat (either previous or next)
    let offset = Math.min(timeSinceBeat, Math.abs(interval - timeSinceBeat));

    if (offset < 100) {
        rhythmScore += 10;
        showFeedback("¡Perfecto!", "#00d4ff");
    } else if (offset < 200) {
        rhythmScore += 5;
        showFeedback("Bien", "#ff007a");
    } else {
        showFeedback("Fallaste", "#b3b3b3");
    }

    document.getElementById('rhythm-score').textContent = rhythmScore;
}

function showFeedback(text, color) {
    const indicator = document.getElementById('beat-indicator');
    // Could add a floating text element here
    console.log(text);
}

// --- Harmony Game ---

function resetHarmony() {
    document.getElementById('harmony-feedback').textContent = "Escucha el acorde y adivina...";
    document.getElementById('harmony-feedback').style.color = '#fff';
    generateRandomChord();
}

document.getElementById('btn-play-chord')?.addEventListener('click', () => {
    AudioEngine.playChord(currentChordType);
});

window.checkHarmony = function (guess) {
    const feedback = document.getElementById('harmony-feedback');
    if (guess === currentChordType) {
        feedback.textContent = "¡Correcto! Era un acorde " + (currentChordType === 'major' ? "Mayor" : "Menor");
        feedback.style.color = '#00d4ff';
        setTimeout(generateRandomChord, 1500);
    } else {
        feedback.textContent = "Incorrecto. Intenta de nuevo.";
        feedback.style.color = '#ff007a';
    }
};

function generateRandomChord() {
    currentChordType = Math.random() > 0.5 ? 'major' : 'minor';
    document.getElementById('harmony-feedback').textContent = "Nuevo acorde generado. ¡Escúchalo!";
    document.getElementById('harmony-feedback').style.color = '#fff';
    setTimeout(() => AudioEngine.playChord(currentChordType), 500);
}

// --- METRÓNOMO AVANZADO ---

const Metronome = {
    isRunning: false,
    audioCtx: null,
    nextNoteTime: 0,
    scheduleAheadTime: 0.1,
    lookAhead: 25,
    currentNote: 0,
    bpm: 120,
    beatsPerMeasure: 4,
    volume: 0.5,
    soundType: 'beep',
    accentFirst: true,
    startTime: 0,
    totalBeats: 0,
    schedulerID: null,
    
    init() {
        if (!this.audioCtx) {
            this.audioCtx = AudioEngine.ctx;
        }
        this.setupEventListeners();
        this.setupMetronomeUI();
    },
    
    setupEventListeners() {
        // Play/Stop button
        const toggleBtn = document.getElementById('metronome-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.isRunning ? this.stop() : this.start();
            });
        }
        
        // Reset button
        const resetBtn = document.getElementById('metronome-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        }
        
        // BPM controls
        const bpmSlider = document.getElementById('bpm-input');
        const bpmNumber = document.getElementById('bpm-number');
        const bpmDecrease = document.getElementById('bpm-decrease');
        const bpmIncrease = document.getElementById('bpm-increase');
        
        const updateBPM = (value) => {
            this.bpm = parseInt(value);
            if (bpmSlider) bpmSlider.value = this.bpm;
            if (bpmNumber) bpmNumber.value = this.bpm;
            document.getElementById('metronome-bpm').textContent = this.bpm;
        };
        
        if (bpmSlider) bpmSlider.addEventListener('input', (e) => updateBPM(e.target.value));
        if (bpmNumber) bpmNumber.addEventListener('input', (e) => updateBPM(e.target.value));
        if (bpmDecrease) bpmDecrease.addEventListener('click', () => updateBPM(Math.max(40, this.bpm - 5)));
        if (bpmIncrease) bpmIncrease.addEventListener('click', () => updateBPM(Math.min(240, this.bpm + 5)));
        
        // Time signature buttons
        const timeSigBtns = document.querySelectorAll('.time-sig-btn');
        timeSigBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.isRunning) {
                    timeSigBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.beatsPerMeasure = parseInt(btn.getAttribute('data-beats'));
                    this.currentNote = 0;
                    document.getElementById('beat-counter').textContent = '1';
                }
            });
        });
        
        // Accent checkbox
        const accentToggle = document.getElementById('accent-toggle');
        if (accentToggle) {
            accentToggle.addEventListener('change', (e) => {
                this.accentFirst = e.target.checked;
            });
        }
        
        // Volume slider
        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.volume = parseInt(e.target.value) / 100;
                document.getElementById('volume-value').textContent = e.target.value + '%';
            });
        }
        
        // Sound type select
        const soundSelect = document.getElementById('sound-type');
        if (soundSelect) {
            soundSelect.addEventListener('change', (e) => {
                this.soundType = e.target.value;
            });
        }
    },
    
    setupMetronomeUI() {
        // Set initial values
        document.getElementById('metronome-bpm').textContent = this.bpm;
        document.getElementById('volume-value').textContent = '50%';
    },
    
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.startTime = Date.now();
        this.totalBeats = 0;
        this.currentNote = 0;
        
        const toggleBtn = document.getElementById('metronome-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = 'Detener';
            toggleBtn.classList.add('playing');
        }
        
        this.nextNoteTime = this.audioCtx.currentTime;
        this.scheduler();
    },
    
    stop() {
        if (!this.isRunning) return;
        this.isRunning = false;
        
        const toggleBtn = document.getElementById('metronome-toggle');
        if (toggleBtn) {
            toggleBtn.textContent = 'Iniciar';
            toggleBtn.classList.remove('playing');
        }
        
        // Clear beat light
        const beatLight = document.getElementById('beat-light');
        if (beatLight) beatLight.classList.remove('active');
    },
    
    reset() {
        if (this.isRunning) this.stop();
        this.currentNote = 0;
        this.totalBeats = 0;
        document.getElementById('beat-counter').textContent = '1';
        document.getElementById('elapsed-time').textContent = '00:00';
        document.getElementById('beats-count').textContent = '0';
        document.getElementById('measures-count').textContent = '0';
    },
    
    scheduler() {
        while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime) {
            this.scheduleNote(this.currentNote, this.nextNoteTime);
            this.advanceNote();
            this.nextNoteTime += 60 / this.bpm;
        }
        
        if (this.isRunning) {
            this.schedulerID = setTimeout(() => this.scheduler(), this.lookAhead);
        }
    },
    
    scheduleNote(noteNumber, time) {
        const isAccent = this.accentFirst && (noteNumber % this.beatsPerMeasure === 0);
        this.playMetronomeSound(isAccent, time);
        
        // Update UI on beat
        setTimeout(() => {
            document.getElementById('beat-counter').textContent = (noteNumber % this.beatsPerMeasure) + 1;
            
            const beatLight = document.getElementById('beat-light');
            if (beatLight) {
                beatLight.classList.remove('active');
                // Trigger reflow to restart animation
                void beatLight.offsetWidth;
                beatLight.classList.add('active');
            }
            
            // Update statistics
            this.totalBeats++;
            document.getElementById('beats-count').textContent = this.totalBeats;
            document.getElementById('measures-count').textContent = Math.floor(this.totalBeats / this.beatsPerMeasure);
            
            const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            document.getElementById('elapsed-time').textContent = 
                String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
        }, (time - this.audioCtx.currentTime) * 1000);
    },
    
    advanceNote() {
        this.currentNote++;
        if (this.currentNote >= this.beatsPerMeasure) {
            this.currentNote = 0;
        }
    },
    
    playMetronomeSound(isAccent, time) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        
        const now = this.audioCtx.currentTime;
        const volume = this.volume * (isAccent ? 1 : 0.6);
        gain.gain.setValueAtTime(volume, time);
        
        let frequency, duration;
        
        switch(this.soundType) {
            case 'click':
                frequency = isAccent ? 1000 : 800;
                duration = 0.05;
                break;
            case 'bell':
                frequency = isAccent ? 880 : 660;
                duration = 0.15;
                break;
            case 'wood':
                frequency = isAccent ? 150 : 120;
                osc.type = 'triangle';
                duration = 0.08;
                break;
            default: // beep
                frequency = isAccent ? 1000 : 800;
                duration = 0.1;
        }
        
        osc.frequency.value = frequency;
        osc.start(time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        osc.stop(time + duration);
    }
};

// Initialize metronome on page load
document.addEventListener('DOMContentLoaded', () => {
    Metronome.init();
});

