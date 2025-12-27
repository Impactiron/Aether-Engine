# **Projekt Status: AETHER ENGINE 1.0**

## **Dateibaum**

* index.html  
* src/main.ts  
* src/shaders/
  * basic.vert (NEU)
  * basic.frag (NEU)
* src/core/  
  * Engine.ts (Updated)
  * Display.ts  
  * Time.ts  
  * Renderer.ts (MOVED -> renderer/Renderer.ts)
* src/renderer/ (NEU)
  * Renderer.ts (Updated)
  * Shader.ts (NEU)
  * GLBuffer.ts (NEU)
* src/math/  
  * Vector3.ts  
  * Matrix4.ts

## **Globale Variablen & State**

* Engine: Managed Loop und Resize.
* Renderer: Besitzt jetzt GL State Logic (Cull Face, Depth Test).

## **Letzte Änderung**

* **Phase B (Renderer Pipeline) begonnen.**
* Shader-Klasse implementiert (Compiler & Linker).
* GLBuffer-Klasse implementiert (VBO/EBO Wrapper).
* Renderer ausgelagert und erweitert.
* Basic GLSL Shader Files erstellt.

## **Nächster Schritt**

* **The Triangle**: Wir schreiben Code in `main.ts`, um manuell Daten in die Buffer zu laden, die Shader zu laden und das erste Dreieck zu zeichnen. Wir müssen beweisen, dass die Pipeline dicht ist.

## **Aktueller Code-Hash**

* src/shaders/basic.vert
* src/shaders/basic.frag
* src/renderer/Shader.ts
* src/renderer/GLBuffer.ts
* src/renderer/Renderer.ts
* src/core/Engine.ts
