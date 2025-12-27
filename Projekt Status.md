project_memory.md
# Projekt Status: AETHER ENGINE 1.0

## Dateibaum
* index.html
* src/main.ts (Updated: Proof of Concept Triangle)
* src/core/
  * Engine.ts (Updated: Added onRender hook)
  * Display.ts
  * Time.ts
  * Renderer.ts (Updated: Full draw logic)
* src/math/
  * Vector3.ts
  * Matrix4.ts
* src/renderer/ (Neu)
  * Shader.ts (Neu)
  * GLBuffer.ts (Neu)

## Globale Variablen & State
* Engine: Hauptinstanz.
* Renderer: Verwaltet jetzt WebGL States (Depth, Cull).
* Shader: Kapselt Programme und Uniforms.

## Letzte Änderung
* **Phase B (Renderer)** gestartet.
* Low-Level `Renderer`, `Shader` und `GLBuffer` Klassen implementiert.
* `main.ts` rendert jetzt ein buntes Dreieck mittels direkter API Calls.

## Nächster Schritt
* **Phase C (Scene Graph)**: Das manuelle VAO/Buffer Management in `main.ts` ist unsauber. Wir brauchen `Mesh`, `Node` und `Camera` Klassen, um echte 3D-Objekte zu verwalten.

## Aktueller Code-Hash
* src/renderer/Shader.ts
* src/renderer/GLBuffer.ts
* src/core/Renderer.ts
* src/core/Engine.ts
* src/main.ts
