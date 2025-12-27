import { Display } from './Display';
import { Time } from './Time';
import { Renderer } from './Renderer';

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
            this._display.resize();
        });
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
        // Debug Output alle 5 Sekunden (modulo check ist teuer, nur zum Testen hier)
        // console.log(`Delta: ${Time.delta.toFixed(4)}`);

        // 4. Nächsten Frame anfordern
        this._loopId = requestAnimationFrame(this.loop.bind(this));
    }
}