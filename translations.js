const translations = {
    es: {
        nav: {
            learn1: 'Armonía',
            learn2: 'Rítmica',
            learn3: 'Solfeo',
            learn4: 'Ejercicios'
        },
        user: {
            title: 'Estudiante',
            level: 'Nivel Básico'
        },
        header: {
            title: 'Conceptos Fundamentales',
            search: 'Buscar tema...'
        },
        learning: {
            harmony: {
                title: 'Armonía',
                intro: 'La armonía es el arte de combinar sonidos simultáneamente para crear acordes y progresiones armónicas que enriquecen la música.',
                whatIs: '¿Qué es la Armonía?',
                explanation: 'La armonía es la combinación de sonidos simultáneos que crean acordes. Es lo que da profundidad, riqueza y carácter emocional a la música. La armonía es el soporte sobre el cual descansa la melodía.',
                feature1: 'Crea acordes combinando notas simultáneamente',
                feature2: 'Define el carácter emocional de la música',
                feature3: 'Establece progresiones y estructuras armónicas',
                feature4: 'Proporciona soporte para la melodía',
                visualization: 'Visualización Armónica',
                chordExample: 'Acorde de Do Mayor (C - E - G)',
                chordTypes: 'Tipos de Acordes',
                chordTypesDesc: 'Los acordes se clasifican principalmente por su composición y sonoridad.',
                major: 'Acorde Mayor',
                majorIntervals: 'Tónica + 3M + 5J',
                majorDesc: 'Sonoridad brillante y positiva',
                majorChordDesc: 'Sonoridad brillante, alegre y positiva',
                majorDetail: 'Los acordes mayores tienen una sonoridad brillante, alegre y positiva. Están formados por la tónica, la tercera mayor y la quinta justa.',
                minor: 'Acorde Menor',
                minorIntervals: 'Tónica + 3m + 5J',
                minorDesc: 'Sonoridad oscura y melancólica',
                minorChordDesc: 'Sonoridad oscura, triste y melancólica',
                minorDetail: 'Los acordes menores tienen una sonoridad oscura, triste y melancólica. Están formados por la tónica, la tercera menor y la quinta justa.',
                augmented: 'Acorde Aumentado',
                augmentedIntervals: 'Tónica + 3M + 5A',
                augmentedDesc: 'Sonoridad tensa e inestable',
                diminished: 'Acorde Disminuido',
                diminishedIntervals: 'Tónica + 3m + 5D',
                diminishedDesc: 'Sonoridad tensa y exótica',
                progressions: 'Progresiones Armónicas Comunes',
                progressionsDesc: 'Las progresiones son secuencias de acordes que generan movimiento armónico.',
                classicProg: 'Progresión Clásica',
                classicProgDesc: 'Una de las más usadas en música popular. Crea movimiento claro hacia la resolución.',
                popProg: 'Progresión Pop',
                popProgDesc: 'Muy común en música pop moderna. Crea una sensación nostálgica y emotiva.',
                jazzProg: 'Progresión Jazz',
                jazzProgDesc: 'Fundamental en el jazz. Crea tensión y resolución elegante.',
                learnMoreTitle: 'Acordes Detallados',
                learnMoreDesc: 'Aprende más sobre la construcción de acordes, inversiones y cómo usarlos en tu música.',
                composition: 'Composición',
                comp1: 'Tónica (raíz del acorde)',
                comp2: 'Tercera Mayor (4 semitonos)',
                comp3: 'Quinta Justa (7 semitonos)',
                compMinor: 'Tercera Menor (3 semitonos)',
                examples: 'Ejemplos'
            },
            rhythm: {
                title: 'Rítmica',
                intro: 'La rítmica organiza los sonidos en el tiempo, creando patrones regulares que estructuran la música.',
                description: 'Descubre las diferentes duraciones de notas',
                figures: 'Figuras Rítmicas',
                figuresDesc: 'Cada figura tiene una duración específica que representa cuánto tiempo dura el sonido.',
                whatIs: '¿Qué es la Rítmica?',
                explanation: 'La rítmica es el elemento musical que organiza los sonidos en el tiempo. Es la distribución ordenada de notas y silencios que le da estructura y movimiento a la música. Sin ritmo, la música sería caótica y sin sentido.',
                feature1: 'Crea patrones predecibles y reconocibles',
                feature2: 'Organiza la duración de las notas',
                feature3: 'Define el compás y la métrica musical',
                feature4: 'Permite sincronización entre músicos',
                visualization: 'Visualización del Ritmo',
                rhythmPattern: 'Un patrón rítmico de 4 tiempos',
                whole: 'Redonda',
                wholeDuration: '4 tiempos',
                wholeDesc: 'La nota más larga en un compás de 4/4',
                half: 'Blanca',
                halfDuration: '2 tiempos',
                halfDesc: 'La mitad de una redonda',
                quarter: 'Negra',
                quarterDuration: '1 tiempo',
                quarterDesc: 'La unidad de tiempo estándar',
                eighth: 'Corchea',
                eighthDuration: '1/2 tiempo',
                eighthDesc: 'Dos corcheas = una negra',
                commonMeasures: 'Compases Comunes',
                measuresDesc: 'El compás define cuántos tiempos hay en cada grupo de notas.',
                fourFour: 'Cuatro cuartos',
                fourFourDesc: 'El más común en música moderna. 4 tiempos por compás.',
                threeQuarter: 'Tres cuartos',
                threeQuarterDesc: 'Típico del vals. 3 tiempos por compás.',
                twoQuarter: 'Dos cuartos',
                twoQuarterDesc: 'Ritmo ligero y ágil. 2 tiempos por compás.',
                learnMoreTitle: 'Figuras Rítmicas Detalladas',
                learnMoreDesc: 'Aprende más sobre las distintas duraciones de notas y cómo se representan en el pentagrama musical.'
            },
            solfege: {
                title: 'Solfeo',
                intro: 'El solfeo es el arte de leer, escribir e interpretar la música a través del sistema de notación musical.',
                whatIs: '¿Qué es el Solfeo?',
                explanation: 'El solfeo es la práctica de cantar o nombrar las notas musicales usando un sistema estándar. Es el lenguaje universal de la música que permite a los músicos comunicarse, compartir música escrita y desarrollar la precisión auditiva.',
                feature1: 'Desarrolla precisión auditiva y reconocimiento de tonos',
                feature2: 'Facilita la lectura de partituras musicales',
                feature3: 'Permite comunicación universal entre músicos',
                feature4: 'Mejora la memoria musical e intonación',
                visualization: 'Las 7 Notas Musicales',
                notesCaption: 'Escala diatónica natural',
                notes: 'Notas Musicales',
                notesDesc: 'Las 7 notas naturales más sus alteraciones forman el sistema cromático completo.',
                noteC: 'Do',
                noteCDesc: 'Nota tónica, fundamental',
                noteCPos: 'Primera nota de la escala',
                noteD: 'Re',
                noteDDesc: 'Segunda del grado',
                noteDPos: 'Un tono arriba de Do',
                noteE: 'Mi',
                noteEDesc: 'Tercera del grado',
                noteEPos: 'Un tono arriba de Re',
                noteF: 'Fa',
                noteFDesc: 'Cuarta del grado',
                noteFPos: 'Un semitono arriba de Mi',
                noteG: 'Sol',
                noteGDesc: 'Quinta del grado',
                noteGPos: 'Un tono arriba de Fa',
                noteA: 'La',
                noteADesc: 'Sexta del grado',
                noteAPos: 'Un tono arriba de Sol',
                noteB: 'Si',
                noteBDesc: 'Séptima del grado',
                noteBPos: 'Un tono arriba de La',
                alterations: 'Alteraciones',
                alterationsDesc: 'Sostenidos y bemoles',
                alterationsPos: 'Suben o bajan notas un semitono',
                interactivePiano: 'Piano Interactivo (88 Teclas)',
                interactivePianoDesc: 'Explora el rango completo del piano. Desplázate para ver más octavas.',
                point1: 'Las 7 notas: Do, Re, Mi, Fa, Sol, La, Si',
                staff: 'El Pentagrama y Claves',
                staffPoint1: '5 líneas y 4 espacios para escribir notas',
                staffDesc: 'El pentagrama es el sistema de 5 líneas donde se escriben las notas musicales.',
                staffDetail: 'El pentagrama es el sistema de notación musical con 5 líneas horizontales donde se escriben las notas.',
                structure: 'Estructura',
                staffPoint2: 'Las claves determinan qué notas representan las líneas y espacios',
                staffPoint3: 'La clave de sol es la más común para melodía',
                clefs: 'Tipos de Claves',
                treble: 'Clave de Sol',
                trebleDesc: 'Para voces agudas e instrumentos altos. La segunda línea es Sol.',
                trebleUse: 'Usada en: soprano, tenor, flauta, violín, trompeta',
                bass: 'Clave de Fa',
                bassDesc: 'Para voces graves e instrumentos bajos. La segunda línea es Fa.',
                bassUse: 'Usada en: bajo, cello, trombone, tuba',
                alto: 'Clave de Do',
                altoDec: 'Para voces medias. La tercera línea es Do central.',
                altoDu: 'Usada en: viola, saxo tenor, trompa',
                scales: 'Escalas Musicales',
                scalesDesc: 'Las escalas son secuencias ordenadas de notas que crean una base sonora.',
                scalesDetailText: 'Una escala es una secuencia de notas ordenadas ascendente o descendentemente.',
                majorScale: 'Escala Mayor',
                majorScaleDesc: 'Sonoridad brillante y alegre. Base fundamental de la música occidental.',
                majorScaleEx: 'Ejemplo: C Mayor (Do - Re - Mi - Fa - Sol - La - Si - Do)',
                minorScale: 'Escala Menor Natural',
                minorScaleDesc: 'Sonoridad oscura y melancólica. Muy usada en géneros contemporáneos.',
                minorScaleEx: 'Ejemplo: A Menor (La - Si - Do - Re - Mi - Fa - Sol - La)',
                pentatonicScale: 'Escala Pentatónica',
                pentatonicDesc: 'Escala de 5 notas. Muy presente en música asiática y folk.',
                pentatonicEx: 'Ejemplo: C Pentatónica (Do - Re - Mi - Sol - La - Do)',
                learnMoreTitle: 'Lecturas y Ejercicios',
                learnMoreDesc: 'Aprende a leer partituras, identifica las notas en el pentagrama y practica solfeo con ejercicios interactivos.'
            }
        },
        common: {
            language: 'Idioma',
            learnMore: 'Aprender Más',
            showNotes: 'Ver Notas'
        }
    },
    en: {
        nav: {
            learn1: 'Harmony',
            learn2: 'Rhythm',
            learn3: 'Solfege',
            learn4: 'Exercises'
        },
        user: {
            title: 'Student',
            level: 'Basic Level'
        },
        header: {
            title: 'Fundamental Concepts',
            search: 'Search topic...'
        },
        learning: {
            harmony: {
                title: 'Harmony',
                intro: 'Harmony is the art of combining sounds simultaneously to create chords and harmonic progressions that enrich music.',
                whatIs: 'What is Harmony?',
                explanation: 'Harmony is the combination of simultaneous sounds that create chords. It is what gives depth, richness and emotional character to music. Harmony is the support on which melody rests.',
                feature1: 'Creates chords by combining notes simultaneously',
                feature2: 'Defines the emotional character of music',
                feature3: 'Establishes harmonic progressions and structures',
                feature4: 'Provides support for the melody',
                visualization: 'Harmonic Visualization',
                chordExample: 'C Major Chord (C - E - G)',
                chordTypes: 'Types of Chords',
                chordTypesDesc: 'Chords are classified mainly by their composition and sound.',
                major: 'Major Chord',
                majorIntervals: 'Root + M3 + P5',
                majorDesc: 'Bright and positive sound',
                majorChordDesc: 'Bright, cheerful and positive sound',
                majorDetail: 'Major chords have a bright, cheerful and positive sound. They are formed by the tonic, the major third and the perfect fifth.',
                minor: 'Minor Chord',
                minorIntervals: 'Root + m3 + P5',
                minorDesc: 'Dark and melancholic sound',
                minorChordDesc: 'Dark, sad and melancholic sound',
                minorDetail: 'Minor chords have a dark, sad and melancholic sound. They are formed by the tonic, the minor third and the perfect fifth.',
                augmented: 'Augmented Chord',
                augmentedIntervals: 'Root + M3 + A5',
                augmentedDesc: 'Tense and unstable sound',
                diminished: 'Diminished Chord',
                diminishedIntervals: 'Root + m3 + D5',
                diminishedDesc: 'Tense and exotic sound',
                progressions: 'Common Harmonic Progressions',
                progressionsDesc: 'Progressions are sequences of chords that generate harmonic movement.',
                classicProg: 'Classic Progression',
                classicProgDesc: 'One of the most used in popular music. Creates clear movement towards resolution.',
                popProg: 'Pop Progression',
                popProgDesc: 'Very common in modern pop music. Creates a nostalgic and emotional feeling.',
                jazzProg: 'Jazz Progression',
                jazzProgDesc: 'Fundamental in jazz. Creates tension and elegant resolution.',
                learnMoreTitle: 'Detailed Chords',
                learnMoreDesc: 'Learn more about chord construction, inversions and how to use them in your music.',
                composition: 'Composition',
                comp1: 'Tonic (chord root)',
                comp2: 'Major Third (4 semitones)',
                comp3: 'Perfect Fifth (7 semitones)',
                compMinor: 'Minor Third (3 semitones)',
                examples: 'Examples'
            },
            rhythm: {
                title: 'Rhythm',
                intro: 'Rhythm is the fundamental element that organizes sounds in time, creating regular patterns that structure music.',
                description: 'Discover the different note durations',
                figures: 'Rhythmic Figures',
                figuresDesc: 'Each figure has a specific duration that represents how long the sound lasts.',
                whatIs: 'What is Rhythm?',
                explanation: 'Rhythm is the musical element that organizes sounds in time. It is the orderly distribution of notes and silences that gives structure and movement to music. Without rhythm, music would be chaotic and meaningless.',
                feature1: 'Creates predictable and recognizable patterns',
                feature2: 'Organizes the duration of notes',
                feature3: 'Defines the measure and musical meter',
                feature4: 'Allows synchronization between musicians',
                visualization: 'Rhythm Visualization',
                rhythmPattern: 'A rhythmic pattern of 4 beats',
                whole: 'Whole Note',
                wholeDuration: '4 beats',
                wholeDesc: 'The longest note in a 4/4 measure',
                half: 'Half Note',
                halfDuration: '2 beats',
                halfDesc: 'Half of a whole note',
                quarter: 'Quarter Note',
                quarterDuration: '1 beat',
                quarterDesc: 'The standard unit of time',
                eighth: 'Eighth Note',
                eighthDuration: '1/2 beat',
                eighthDesc: 'Two eighth notes = one quarter note',
                commonMeasures: 'Common Measures',
                measuresDesc: 'The measure defines how many beats are in each group of notes.',
                fourFour: 'Four Four',
                fourFourDesc: 'The most common in modern music. 4 beats per measure.',
                threeQuarter: 'Three Quarter',
                threeQuarterDesc: 'Typical of the waltz. 3 beats per measure.',
                twoQuarter: 'Two Quarter',
                twoQuarterDesc: 'Light and agile rhythm. 2 beats per measure.',
                learnMoreTitle: 'Detailed Rhythmic Figures',
                learnMoreDesc: 'Learn more about the different note durations and how they are represented on the musical staff.'
            },
            solfege: {
                title: 'Solfege',
                notes: 'Musical Notes',
                point1: 'The 7 notes: Do, Re, Mi, Fa, Sol, La, Si',
                staff: 'The Staff and Clefs',
                staffPoint1: '5 lines and 4 spaces for writing notes',
                staffDesc: 'The staff is a system of 5 lines where musical notes are written.',
                staffDetail: 'The staff is a musical notation system with 5 horizontal lines where notes are written.',
                structure: 'Structure',
                staffPoint2: 'Clefs determine which notes represent the lines and spaces',
                staffPoint3: 'The treble clef is the most common for melody',
                clefs: 'Types of Clefs',
                treble: 'Treble Clef',
                trebleDesc: 'For high voices and high-pitched instruments. The second line is Sol.',
                trebleUse: 'Used in: soprano, tenor, flute, violin, trumpet',
                bass: 'Bass Clef',
                bassDesc: 'For low voices and low-pitched instruments. The second line is Fa.',
                bassUse: 'Used in: bass, cello, trombone, tuba',
                alto: 'Alto Clef',
                altoDec: 'For middle voices. The third line is middle Do.',
                altoDu: 'Used in: viola, tenor saxophone, horn',
                scales: 'Musical Scales',
                scalesDesc: 'Scales are ordered sequences of notes that create a sound basis.',
                scalesDetailText: 'A scale is a sequence of notes arranged in ascending or descending order.',
                majorScale: 'Major Scale',
                majorScaleDesc: 'Bright and cheerful sound. Fundamental basis of Western music.',
                majorScaleEx: 'Example: C Major (Do - Re - Mi - Fa - Sol - La - Si - Do)',
                minorScale: 'Natural Minor Scale',
                minorScaleDesc: 'Dark and melancholic sound. Very used in contemporary genres.',
                minorScaleEx: 'Example: A Minor (La - Si - Do - Re - Mi - Fa - Sol - La)',
                pentatonicScale: 'Pentatonic Scale',
                pentatonicDesc: 'Scale of 5 notes. Very present in Asian and folk music.',
                pentatonicEx: 'Example: C Pentatonic (Do - Re - Mi - Sol - La - Do)',
                visualization: 'The 7 Musical Notes',
                notesCaption: 'Natural diatonic scale',
                notes: 'Musical Notes',
                notesDesc: 'The 7 natural notes plus their alterations form the complete chromatic system.',
                noteC: 'Do',
                noteCDesc: 'Tonic note, fundamental',
                noteCPos: 'First note of the scale',
                noteD: 'Re',
                noteDDesc: 'Second degree',
                noteDPos: 'A tone above Do',
                noteE: 'Mi',
                noteEDesc: 'Third degree',
                noteEPos: 'A tone above Re',
                noteF: 'Fa',
                noteFDesc: 'Fourth degree',
                noteFPos: 'A semitone above Mi',
                noteG: 'Sol',
                noteGDesc: 'Fifth degree',
                noteGPos: 'A tone above Fa',
                noteA: 'La',
                noteADesc: 'Sixth degree',
                noteAPos: 'A tone above Sol',
                noteB: 'Si',
                noteBDesc: 'Seventh degree',
                noteBPos: 'A tone above La',
                alterations: 'Alterations',
                alterationsDesc: 'Sharps and flats',
                alterationsPos: 'Raise or lower notes by a semitone',
                interactivePiano: 'Interactive Piano (88 Keys)',
                interactivePianoDesc: 'Explore the full range of the piano. Scroll to see more octaves.',
                intro: 'Solfège is the art of reading, writing and interpreting music through the system of musical notation.',
                whatIs: 'What is Solfège?',
                explanation: 'Solfège is the practice of singing or naming musical notes using a standard system. It is the universal language of music that allows musicians to communicate, share written music and develop aural precision.',
                feature1: 'Develops aural precision and tone recognition',
                feature2: 'Facilitates reading of musical scores',
                feature3: 'Enables universal communication between musicians',
                feature4: 'Improves musical memory and intonation',
                learnMoreTitle: 'Reading and Exercises',
                learnMoreDesc: 'Learn to read musical scores, identify notes on the staff and practice solfège with interactive exercises.',
                title: 'Solfège'
            }
        },
        common: {
            language: 'Language',
            learnMore: 'Learn More',
            showNotes: 'Show Notes'
        }
    }
};

let currentLanguage = localStorage.getItem('language') || 'es';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageLanguage();
}

function updatePageLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[currentLanguage];
        
        for (let k of keys) {
            value = value[k];
        }
        
        element.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        let value = translations[currentLanguage];
        
        for (let k of keys) {
            value = value[k];
        }
        
        element.placeholder = value;
    });

    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        const keys = key.split('.');
        let value = translations[currentLanguage];
        
        for (let k of keys) {
            value = value[k];
        }
        
        element.title = value;
    });

    document.documentElement.lang = currentLanguage;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
});
