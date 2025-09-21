import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface SectionPreviewProps {
  section: 'about' | 'skills' | 'projects' | 'contact';
  onClose: () => void;
}

const SectionPreview = ({ section, onClose }: SectionPreviewProps) => {
  const renderSection = () => {
    switch (section) {
      case 'about':
        return <About />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="text-primary">$</span>
          <span className="text-muted-foreground">Viewing:</span>
          <span className="text-foreground">./{section}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Section Content */}
      <div className="flex-1 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default SectionPreview;
