import { Terminal, Code2, User, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TerminalQuickActionsProps {
  onTerminalStateChange: (isMaximized: boolean) => void;
  isTerminalOpen: boolean;
}

const TerminalQuickActions = ({ onTerminalStateChange, isTerminalOpen }: TerminalQuickActionsProps) => {
  const executeCommand = (command: string) => {
    // Trigger the command in the terminal
    const event = new CustomEvent('terminal-command', { detail: command });
    window.dispatchEvent(event);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 opacity-0 animate-fade-in animate-delay-300">
      {isTerminalOpen ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                size="lg" 
                className="rounded-full px-8 transition-all hover:scale-105 hover:shadow-[var(--shadow-glow)] bg-gradient-to-r from-primary to-accent"
              >
                <Terminal className="w-4 h-4 mr-2" />
                Quick Commands
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 bg-card border-primary/30 shadow-[var(--shadow-elegant)] z-50"
          align="center"
        >
          <DropdownMenuItem 
            onClick={() => executeCommand('nano about')}
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 font-mono"
          >
            <User className="w-4 h-4 mr-2 text-primary" />
            nano about
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => executeCommand('nano skills')}
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 font-mono"
          >
            <Code2 className="w-4 h-4 mr-2 text-primary" />
            nano skills
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => executeCommand('nano projects')}
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 font-mono"
          >
            <Terminal className="w-4 h-4 mr-2 text-primary" />
            nano projects
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => executeCommand('nano contact')}
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 font-mono"
          >
            <Mail className="w-4 h-4 mr-2 text-primary" />
            nano contact
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => executeCommand('neofetch')}
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 font-mono"
          >
            <span className="text-primary mr-2">$</span>
            neofetch
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => executeCommand('tree')}
            className="cursor-pointer hover:bg-primary/10 focus:bg-primary/10 font-mono"
          >
            <span className="text-primary mr-2">$</span>
            tree
          </DropdownMenuItem>
        </DropdownMenuContent>
          </DropdownMenu>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 transition-all hover:scale-105 border-primary/30 hover:border-primary hover:bg-primary/5 font-mono"
            onClick={() => executeCommand('nano contact')}
          >
            Professional Contact
          </Button>
        </>
      ) : (
        <>
          <Button 
            size="lg" 
            className="rounded-full px-8 transition-all hover:scale-105 hover:shadow-[var(--shadow-glow)] bg-gradient-to-r from-primary to-accent"
            onClick={() => scrollToSection('about')}
          >
            <User className="w-4 h-4 mr-2" />
            About Me
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 transition-all hover:scale-105 border-primary/30 hover:border-primary hover:bg-primary/5"
            onClick={() => scrollToSection('projects')}
          >
            <Code2 className="w-4 h-4 mr-2" />
            View Projects
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 transition-all hover:scale-105 border-primary/30 hover:border-primary hover:bg-primary/5"
            onClick={() => scrollToSection('contact')}
          >
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </Button>
        </>
      )}
    </div>
  );
};

export default TerminalQuickActions;
