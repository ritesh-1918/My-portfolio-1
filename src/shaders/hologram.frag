varying vec3 vPosition;
uniform float time;

void main() {
  float alpha = sin(vPosition.x * 10.0 + time) * 0.5 + 0.5;
  vec3 baseColor = vec3(0.0, 1.0, 0.8);
  gl_FragColor = vec4(baseColor, alpha * 0.7);
}