/**
 * AETHER ENGINE - Display
 * Verwaltet das HTML Canvas und den WebGL2 Kontext.
 * Kümmert sich um das Resizing und DPI-Scaling.
 */
export class Display {
    public canvas: HTMLCanvasElement;
    public context: WebGL2RenderingContext;

    constructor(canvasId: string) {
        const el = document.getElementById(canvasId);
        
        // Safety Check: Existiert das Element?
        if (!el || !(el instanceof HTMLCanvasElement)) {
            // Wir werfen einen harten Fehler, da ohne Canvas nichts geht.
            throw new Error(`AETHER CRITICAL: Canvas mit ID '${canvasId}' nicht gefunden.`);
        }
        
        this.canvas = el;

        // WebGL 2.0 Kontext holen
        const gl = this.canvas.getContext("webgl2");
        if (!gl) {
            alert("WebGL 2 wird von diesem Browser nicht unterstützt.");
            throw new Error("AETHER CRITICAL: WebGL 2 nicht verfügbar.");
        }

        this.context = gl;
        
        // Initiales Setup
        this.resize();
    }

    /**
     * Passt die interne Auflösung des Canvas an die CSS-Größe an.
     * Verhindert verpixelte Darstellung auf High-DPI Screens.
     */
    public resize(): void {
        const displayWidth = this.canvas.clientWidth;
        const displayHeight = this.canvas.clientHeight;

        // Prüfen ob sich die Größe geändert hat
        if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
            
            // Viewport update ist Aufgabe des Renderers, aber wir loggen es hier
            console.log(`[Display] Resize: ${displayWidth}x${displayHeight}`);
        }
    }

    get width(): number { return this.canvas.width; }
    get height(): number { return this.canvas.height; }
}