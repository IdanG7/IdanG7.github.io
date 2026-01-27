#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBlobCount;
uniform float iCursorBlobSize;
uniform vec3 iMagneticBlobs[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;
const float PI = 3.14159265359;
 
float getMagneticBlobValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / dist2;
}
 
void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    float m1 = 0.0;
    for (int i = 0; i < 50; i++) {
        if (i >= iBlobCount) break;
        m1 += getMagneticBlobValue(iMagneticBlobs[i].xy, iMagneticBlobs[i].z, coord);
    }
    float m2 = getMagneticBlobValue(mouseW, iCursorBlobSize, coord);
    float total = m1 + m2;
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    vec3 cFinal = vec3(0.0);
    if (total > 0.0) {
        float alpha1 = m1 / total;
        float alpha2 = m2 / total;
        cFinal = iColor * alpha1 + iCursorColor * alpha2;
    }
    outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}

