#ifdef GL_ES
precision mediump float;
#endif

uniform iTime;
uniform iResolution;

float generateNoise(vec2 position) {
    return fract(sin(dot(position, vec2(12.9898, 78.233))) * 43758.5453);
}

float interpolateNoise(vec2 position) {
    vec2 integerPosition = floor(position);
    vec2 fractionalPosition = fract(position);

    float noiseA = generateNoise(integerPosition);
    float noiseB = generateNoise(integerPosition + vec2(1.0, 0.0));
    float noiseC = generateNoise(integerPosition + vec2(0.0, 1.0));
    float noiseD = generateNoise(integerPosition + vec2(1.0, 1.0));

    vec2 smoothFraction = fractionalPosition * fractionalPosition * (3.0 - 2.0 * fractionalPosition);

    float blendedAB = mix(noiseA, noiseB, smoothFraction.x);
    float blendedCD = mix(noiseC, noiseD, smoothFraction.x);

    return mix(blendedAB, blendedCD, smoothFraction.y);
}

float generateFractalNoise(vec2 position) {
    float totalNoise = 0.0;
    float currentAmplitude = 1.0;
    float currentFrequency = 1.0;

    for(int octaveIndex = 0; octaveIndex < 5; octaveIndex++) {
        totalNoise += interpolateNoise(position * currentFrequency) * currentAmplitude;
        currentFrequency *= 2.0;
        currentAmplitude *= 0.5;
    }
    return totalNoise;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 normalizedCoord = fragCoord.xy / iResolution.xy;
    vec2 noiseSpace = normalizedCoord * 2.5;
    float slowTime = iTime * 0.05;

    float baseNoise = generateFractalNoise(noiseSpace + vec2(0.0, slowTime));
    float flowNoise = generateFractalNoise(noiseSpace * 1.5 + vec2(slowTime * 0.3, slowTime * 0.1));
    float magmaFlow = baseNoise * 0.7 + flowNoise * 0.3;

    vec2 distortedPos = noiseSpace + vec2(baseNoise * 0.2, flowNoise * 0.15);
    float bubble1 = sin(length(distortedPos - vec2(1.0, 0.8)) * 8.0 - slowTime * 12.0);
    float bubble2 = sin(length(distortedPos - vec2(1.8, 1.5)) * 6.0 - slowTime * 10.0);
    float bubble3 = sin(length(distortedPos - vec2(0.5, 1.2)) * 10.0 - slowTime * 8.0);

    bubble1 = smoothstep(-0.3, 0.8, bubble1) * exp(-length(distortedPos - vec2(1.0, 0.8)) * 1.5);
    bubble2 = smoothstep(-0.2, 0.7, bubble2) * exp(-length(distortedPos - vec2(1.8, 1.5)) * 2.0);
    bubble3 = smoothstep(-0.4, 0.6, bubble3) * exp(-length(distortedPos - vec2(0.5, 1.2)) * 1.8);

    float finalIntensity = magmaFlow + bubble1 * 0.4 + bubble2 * 0.3 + bubble3 * 0.35;

    vec3 blackLava = vec3(0.0, 0.0, 0.0);
    vec3 darkRed = vec3(0.4, 0.0, 0.0);
    vec3 red = vec3(0.8, 0.0, 0.0);
    vec3 brightRed = vec3(1.0, 0.1, 0.0);
    vec3 redOrange = vec3(1.0, 0.3, 0.0);

    vec3 finalColor = blackLava;

    finalColor = mix(finalColor, darkRed, smoothstep(0.0, 0.4, finalIntensity));
    finalColor = mix(finalColor, red, smoothstep(0.2, 0.6, finalIntensity));
    finalColor = mix(finalColor, brightRed, smoothstep(0.4, 0.8, finalIntensity));
    finalColor = mix(finalColor, redOrange, smoothstep(0.7, 1.0, finalIntensity));

    fragColor = vec4(finalColor, 1.0);
}