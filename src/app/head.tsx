const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://github.com/IdanG7#person",
  name: "Idan Gurevich",
  alternateName: "Idan",
  url: "https://github.com/IdanG7",
  image: "https://github.com/idang7.png",
  sameAs: [
    "https://github.com/IdanG7",
    "https://www.linkedin.com/in/idangurevich/",
  ],
  email: "mailto:Idan.gurevich@gmail.com",
  knowsLanguage: ["English"],
  jobTitle: "Backend Engineer & Firmware Whisperer",
  worksFor: {
    "@type": "Organization",
    name: "WDI Wise Device Inc.",
  },
  description:
    "Backend engineer specializing in C++ development, firmware engineering, and DevOps automation. Focused on reliable systems and real-time infrastructure.",
  knowsAbout: [
    "C++",
    "Firmware Engineering",
    "DevOps Automation",
    "CI/CD",
    "Computer Vision",
    "Distributed Systems",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://github.com/IdanG7",
  name: "Idan Gurevich",
  description:
    "Backend engineer specializing in C++ development, firmware engineering, and DevOps automation.",
  inLanguage: "en",
  publisher: {
    "@type": "Person",
    "@id": "https://github.com/IdanG7#person",
  },
};

export default function Head() {
  return (
    <>
      <link rel="author" href="https://github.com/IdanG7" />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
