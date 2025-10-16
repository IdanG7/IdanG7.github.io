import { Cloud, renderSimpleIcon } from 'react-icon-cloud';
import {
  siPython,
  siCplusplus,
  siDotnet,
  siGnubash,
  siCmake,
  siGit,
  siGithub,
  siGitlab,
  siGithubactions,
  siJenkins,
  siDocker,
  siKubernetes,
  siPostgresql,
  siRedis,
  siLinux,
  siOpencv,
  siFastapi,
  siJira,
  siPytest,
  siOpenai,
  siAnthropic,
  siUbuntu,
  siDebian,
  siNginx,
  siApache,
  siGradle,
  siPycharm,
  siConfluence,
  siGrafana,
  siPrometheus,
  siElasticsearch,
  siKibana,
  siRabbitmq,
  siSwagger,
  siGnome,
} from 'simple-icons';

const cloudIcons = [
  siCplusplus,
  siDotnet,
  siPython,
  siGnubash,
  siCmake,
  siGradle,
  siGit,
  siGithub,
  siGitlab,
  siGithubactions,
  siJenkins,
  siDocker,
  siKubernetes,
  siPostgresql,
  siRedis,
  siRabbitmq,
  siElasticsearch,
  siKibana,
  siLinux,
  siUbuntu,
  siDebian,
  siGnome,
  siOpencv,
  siFastapi,
  siSwagger,
  siJira,
  siConfluence,
  siPytest,
  siPycharm,
  siOpenai,
  siAnthropic,
  siNginx,
  siApache,
  siGrafana,
  siPrometheus,
];

const IconCloud = () => {
  const icons = cloudIcons.map((icon) => {
    return renderSimpleIcon({
      icon,
      size: 72,
      aProps: {
        onClick: (e: Event) => e.preventDefault(),
      },
    });
  });

  return (
    <Cloud
      options={{
        clickToFront: 500,
        depth: 1,
        imageScale: 1,
        initial: [0.1, 0.1],
        minSpeed: 0.003,
        maxSpeed: 0.005,
        outlineMethod: 'none',
        reverse: true,
        wheelZoom: false,
      }}
      containerProps={{
        style: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        },
      }}
    >
      {icons}
    </Cloud>
  );
};

export default IconCloud;
