import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

const SkillGlobe = () => {
  const globeEl = useRef<any>();
  const [mounted, setMounted] = useState(false);

  const skills = [
    { name: 'C++', lat: 37.7749, lng: -122.4194, size: 0.8, color: '#57D9D5' },
    { name: 'Python', lat: 51.5074, lng: -0.1278, size: 0.7, color: '#57D9D5' },
    { name: 'JavaScript', lat: 35.6762, lng: 139.6503, size: 0.7, color: '#82e2df' },
    { name: 'React', lat: 40.7128, lng: -74.0060, size: 0.6, color: '#57D9D5' },
    { name: 'Node.js', lat: 48.8566, lng: 2.3522, size: 0.6, color: '#82e2df' },
    { name: 'Docker', lat: -33.8688, lng: 151.2093, size: 0.5, color: '#57D9D5' },
    { name: 'AWS', lat: 47.6062, lng: -122.3321, size: 0.5, color: '#82e2df' },
    { name: 'MongoDB', lat: 1.3521, lng: 103.8198, size: 0.5, color: '#57D9D5' },
    { name: 'PostgreSQL', lat: 52.5200, lng: 13.4050, size: 0.5, color: '#82e2df' },
    { name: 'Git', lat: -23.5505, lng: -46.6333, size: 0.6, color: '#57D9D5' },
  ];

  const labelsData = skills.map(skill => ({
    lat: skill.lat,
    lng: skill.lng,
    text: skill.name,
    color: skill.color,
    size: skill.size,
  }));

  useEffect(() => {
    setMounted(true);
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = false;

      // Set initial point of view
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading Globe...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <Globe
        ref={globeEl}
        width={400}
        height={400}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        labelsData={labelsData}
        labelLat="lat"
        labelLng="lng"
        labelText="text"
        labelSize={(d: any) => d.size}
        labelDotRadius={0.4}
        labelColor={(d: any) => d.color}
        labelResolution={2}
        labelAltitude={0.01}
        atmosphereColor="#57D9D5"
        atmosphereAltitude={0.15}
      />
    </div>
  );
};

export default SkillGlobe;
