uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;

void main() {
    
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += sin(modelPosition.y * uFrequency.x + uTime * 1.5) * 0.007;
    modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime * 1.5) * 0.007;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
}