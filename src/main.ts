import { Engine } from './core/Engine';

// Warten bis DOM geladen ist
window.addEventListener('DOMContentLoaded', () => {
    try {
        // Engine instanziieren
        const engine = new Engine('game-canvas');
        
        // Zündung
        engine.start();
        
        // Global verfügbar machen für Debugging in der Konsole
        (window as any).aether = engine;

    } catch (e) {
        console.error("AETHER ENGINE CRITICAL FAILURE:", e);
    }
});