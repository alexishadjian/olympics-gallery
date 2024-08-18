uniform vec2 uFrequency;
uniform float uTime;

uniform float uProgress;
uniform vec2 uMeshScale;
uniform vec2 uMeshPosition;
uniform vec2 uOriginalPosition; // Position originale de l'image
uniform vec2 uTargetPosition;  
uniform bool uFullScreen;

varying vec2 vUv;

void main() {
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.y * uFrequency.x + uTime * 1.5) * 0.007;
    modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime * 1.5) * 0.007;

    // Linear interpolation for position between original and target (centered)
    // vec2 interpolatedPosition = mix(uOriginalPosition, uTargetPosition, uProgress);
    // modelPosition.xy += interpolatedPosition;

    // Apply scaling and translation for full screen effect
    // modelPosition.xy *= uMeshScale * uProgress;  // Scale based on uniform and progress
    // modelPosition.xy = uMeshPosition * uProgress; // Translate based on uniform and progress

    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
}