export const particlesConfig = (isDark: boolean) => ({
  autoPlay: true,
  fullScreen: false,
  detectRetina: true,
  fpsLimit: 120,
  particles: {
    number: {
      value: 240,
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
    },
    color: {
      value: isDark ? '#fff' : '#000',
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: {
        min: 0.1,
        max: 1,
      },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
    move: {
      enable: true,
      speed: {
        min: 0.1,
        max: 1,
      },
      direction: 'none' as const,
      outModes: {
        default: 'out' as const,
      },
      random: false,
      straight: false,
      smooth: true,
    },
  },
  interactivity: {
    detectsOn: 'window' as const,
    events: {
      onClick: {
        enable: true,
        mode: 'repulse',
      },
      onHover: {
        enable: true,
        mode: 'bubble',
      },
    },
    modes: {
      repulse: {
        distance: 400,
        duration: 1.2,
        easing: 'ease-out-quad',
        speed: 2,
      },
      bubble: {
        distance: 250,
        size: 8,
        duration: 2,
      },
    },
  },
});
