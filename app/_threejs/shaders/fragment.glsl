precision mediump float;

uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    // textureColor.rgb *= 2.0, 0.0;
    gl_FragColor = textureColor;
}