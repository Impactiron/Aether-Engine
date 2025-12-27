import { Display } from './Display';
import { Time } from './Time';
import { Renderer } from '../renderer/Renderer'; // Updated Import Path

/**
 * AETHER ENGINE - Core Class
 * Der Dirigent des Orchesters. Hält den Loop am Laufen.
 */
export class Engine {
    private _display: Display;
    private _renderer: Renderer;
    private _isRunning: boolean = false;
    private _loopId: number = 0;

    constructor(canvasId: string) {
        console.log("AETHER ENGINE: Initializing Core Systems...");
        
        this._display = new Display(canvasId);
        this._renderer = new Renderer(this._display.context);

        // Resize Listener hinzufügen
        window.addEventListener('resize', () => {
            this.resize();
        });
        
        // Initial einmal resizen, damit Viewport stimmt
        this.resize();
    }

    /**
     * Startet den Game Loop.
     */
    public start(): void {
        if (this._isRunning) return;
        
        this._isRunning = true;
        console.log("AETHER ENGINE: Systems Online. Loop Started.");
        
        this._loopId = requestAnimationFrame(this.loop.bind(this));
    }

    /**
     * Stoppt den Game Loop.
     */
    public stop(): void {
        this._isRunning = false;
        cancelAnimationFrame(this._loopId);
        console.log("AETHER ENGINE: Loop Stopped.");
    }

    /**
     * Der interne Loop Taktgeber.
     */
    private loop(timestamp: number): void {
        if (!this._isRunning) return;

        // 1. Zeit aktualisieren
        Time.update(timestamp);

        // 2. Render-Vorbereitung (Clear Screen)
        this._renderer.clear();

        // 3. Hier würde später die Game-Logik und Scene.render() kommen
        // Aktuell noch leer, da wir erst in Phase C Szenen rendern.

        // 4. Nächsten Frame anfordern
        this._loopId = requestAnimationFrame(this.loop.bind(this));
    }

    /**
     * Handled Window-Resizes und synchronisiert Display und Renderer.
     */
    private resize(): void {
        this._display.resize();
        // Viewport muss synchron zur Canvas-Größe sein
        this._renderer.setViewport(this._display.width, this._display.height);
    }
}