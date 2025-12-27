/**
 * AETHER ENGINE - Time
 * Verwaltet DeltaTime (Zeit zwischen Frames) und TotalTime.
 * Wichtig für framerate-unabhängige Bewegungen.
 */
export class Time {
    private static _lastTime: number = 0;
    private static _deltaTime: number = 0;
    private static _totalTime: number = 0;

    /**
     * Wird einmal pro Frame vom Engine Loop aufgerufen.
     * @param currentTime Timestamp in Millisekunden
     */
    static update(currentTime: number): void {
        const now = currentTime * 0.001; // Konvertierung zu Sekunden
        
        // Verhindert riesige Sprünge im ersten Frame
        if (this._lastTime === 0) {
            this._lastTime = now;
        }

        this._deltaTime = now - this._lastTime;
        this._lastTime = now;
        this._totalTime = now;
    }

    /** Zeit in Sekunden seit dem letzten Frame */
    static get delta(): number { return this._deltaTime; }

    /** Zeit in Sekunden seit Start der Engine */
    static get total(): number { return this._totalTime; }
}