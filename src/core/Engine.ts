// src/core/Engine.ts
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

    // Hook für externen Render-Code (für Phase B Test)
    public onRender: (() => void) | null = null;

    constructor(canvasId: string) {
        console.log("AETHER ENGINE: Initializing Core Systems...");
        
        this._display = new Display(canvasId);
        this._renderer = new Renderer(this._display.context);

        // Resize Listener hinzufügen
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    public start(): void {
        if (this._isRunning) return;
        this._isRunning = true;
        console.log("AETHER ENGINE: Systems Online. Loop Started.");
        this._loopId = requestAnimationFrame(this.loop.bind(this));
    }

    public stop(): void {
        this._isRunning = false;
        cancelAnimationFrame(this._loopId);
        console.log("AETHER ENGINE: Loop Stopped.");
    }

    private loop(timestamp: number): void {
        if (!this._isRunning) return;

        // 1. Zeit aktualisieren
        Time.update(timestamp);

        // 2. Render-Vorbereitung
        this._renderer.clear();

        // 3. Render Hook aufrufen (Hier zeichnen wir das Dreieck)
        if (this.onRender) {
            this.onRender();
        }

        // 4. Nächsten Frame anfordern
        this._loopId = requestAnimationFrame(this.loop.bind(this));
    }

    private resize(): void {
        this._display.resize();
        this._renderer.setViewport(this._display.width, this._display.height);
    }

    get renderer(): Renderer { return this._renderer; }
}