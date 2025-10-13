import { Mail, Linkedin, Github, FileText, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const socials = [
  { icon: Mail, label: "Email", href: "mailto:Idan.gurevich@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/idangurevich/" },
  { icon: Github, label: "GitHub", href: "https://github.com/IdanG7" },
  { icon: FileText, label: "Resume", href: "/resume.pdf" }
];

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30 relative scroll-mt-24" ref={ref}>
      {/* Hex address decoration */}
      <div className="absolute top-8 right-4 text-xs font-mono text-muted-foreground/30">
        [0x0004]
      </div>
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Terminal className="w-6 h-6 text-primary" />
          <h2 
            className={`text-4xl sm:text-5xl font-light tracking-tight font-mono transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="text-primary">./</span>contact
          </h2>
        </div>
        
        <div 
          className={`mb-12 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            I am available for professional opportunities and collaborations in backend engineering, firmware development, and DevOps architecture.
          </p>
          <div className="inline-block p-4 rounded-lg bg-card border border-primary/20 font-mono text-sm">
            <div className="flex items-center gap-2 text-primary">
              <span>$</span>
              <span className="text-muted-foreground">status</span>
              <span>"Available for professional engagements"</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {socials.map((social, index) => (
            <Button
              key={social.label}
              variant="outline"
              size="lg"
              className={`rounded-full transition-all duration-700 hover:scale-110 hover:shadow-[var(--shadow-glow)] border-primary/30 hover:border-primary font-mono ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              asChild
              style={{ 
                transitionDelay: isVisible ? `${(index + 2) * 100}ms` : '0ms'
              }}
            >
              <a href={social.href} aria-label={social.label}>
                <social.icon className="w-5 h-5 mr-2" />
                {social.label}
              </a>
            </Button>
          ))}
        </div>
        
        <div 
          className={`pt-8 border-t border-primary/20 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-sm text-muted-foreground font-mono mb-2">
            © {new Date().getFullYear()} Idan Gurevich. Built with precision.
          </p>
          <div className="flex justify-center gap-3 text-xs font-mono text-muted-foreground/50">
            <span>0xDEAD</span>
            <span className="text-primary">•</span>
            <span>0xBEEF</span>
            <span className="text-primary">•</span>
            <span>0xCAFE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
