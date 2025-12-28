project_memory.md
# Projekt Status: AETHER ENGINE 1.0

## Dateibaum

* index.html
* src/main.ts
* src/core/
  * Engine.ts (Updated: Scene Integration)
  * Display.ts
  * Time.ts
  * Renderer.ts
  * Transform.ts (Neu: TRS Logic)
* src/math/
  * Vector3.ts
  * Matrix4.ts (Updated: Invert & Perspective)
* src/scene/
  * Node.ts (Neu: Hierarchy)
  * Scene.ts (Neu: Container)
  * Camera.ts (Neu: Projection Logic)

## Globale Variablen & State

* Engine: Hält nun `scene` und `activeCamera`.
* Scene: Root-Node `SceneRoot`.
* Camera: Default Perspective 60°, Position (0,0,5).

## Letzte Änderung

* **Phase C (The World) gestartet.**
* Scene Graph Architektur implementiert (`Node`, `Scene`).
* `Transform` Klasse mit Dirty-Flag Pattern erstellt.
* `Camera` Klasse mit Projektions- und View-Matrix Logik erstellt.
* `Matrix4` um kritische Funktionen (`invert`, `perspective`) erweitert.

## Nächster Schritt

* **Phase B (Integration - The Triangle)**: Da die Engine-Pipeline in den Volumes gesprungen ist (Architektur zuerst), müssen wir nun Renderer und Scene Graph verbinden.
* Wir brauchen `Mesh` und `Shader` Klassen, um tatsächlich das erste Dreieck durch diesen neuen Scene Graph zu zeichnen.

## Aktueller Code-Hash

* src/math/Matrix4.ts
* src/core/Transform.ts
* src/scene/Node.ts
* src/scene/Camera.ts
* src/scene/Scene.ts
* src/core/Engine.ts
