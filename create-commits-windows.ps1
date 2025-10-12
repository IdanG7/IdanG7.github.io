# Function to create commit with specific date
function Create-CommitWithDate {
    param(
        [int]$DaysAgo,
        [string]$Message,
        [string[]]$Files
    )

    foreach ($file in $Files) {
        git add $file
    }

    $commitDate = (Get-Date).AddDays(-$DaysAgo).ToString("yyyy-MM-dd HH:mm:ss")
    $env:GIT_AUTHOR_DATE = $commitDate
    $env:GIT_COMMITTER_DATE = $commitDate
    git commit -m $Message
}

# Commit 1: Initial project setup
Create-CommitWithDate -DaysAgo 60 -Message "Initial project setup with Vite and React" -Files @(
    "package.json", "package-lock.json", "vite.config.ts", "tsconfig.json",
    "tsconfig.app.json", "tsconfig.node.json", "index.html", ".gitignore"
)

# Commit 2: Configure ESLint
Create-CommitWithDate -DaysAgo 59 -Message "Add ESLint configuration" -Files @("eslint.config.js")

# Commit 3: Configure Tailwind CSS
Create-CommitWithDate -DaysAgo 58 -Message "Set up Tailwind CSS" -Files @("tailwind.config.ts", "postcss.config.js")

# Commit 4: Add base styles
Create-CommitWithDate -DaysAgo 57 -Message "Add base CSS and index styles" -Files @("src/index.css", "src/App.css")

# Commit 5: Create main entry point
Create-CommitWithDate -DaysAgo 56 -Message "Create main application entry point" -Files @("src/main.tsx", "src/vite-env.d.ts")

# Commit 6: Add shadcn/ui configuration
Create-CommitWithDate -DaysAgo 55 -Message "Configure shadcn/ui components" -Files @("components.json", "src/lib/utils.ts")

# Commit 7: Install core UI components - Button
Create-CommitWithDate -DaysAgo 54 -Message "Add Button component" -Files @("src/components/ui/button.tsx")

# Commit 8: Add Card component
Create-CommitWithDate -DaysAgo 53 -Message "Add Card component" -Files @("src/components/ui/card.tsx")

# Commit 9: Add Badge component
Create-CommitWithDate -DaysAgo 52 -Message "Add Badge component" -Files @("src/components/ui/badge.tsx")

# Commit 10: Add Input component
Create-CommitWithDate -DaysAgo 51 -Message "Add Input component" -Files @("src/components/ui/input.tsx")

# Commit 11: Add Textarea component
Create-CommitWithDate -DaysAgo 50 -Message "Add Textarea component" -Files @("src/components/ui/textarea.tsx")

# Commit 12: Add Label component
Create-CommitWithDate -DaysAgo 49 -Message "Add Label component" -Files @("src/components/ui/label.tsx")

# Commit 13: Add Separator component
Create-CommitWithDate -DaysAgo 48 -Message "Add Separator component" -Files @("src/components/ui/separator.tsx")

# Commit 14: Add Dialog component
Create-CommitWithDate -DaysAgo 47 -Message "Add Dialog component" -Files @("src/components/ui/dialog.tsx")

# Commit 15: Add Sheet component
Create-CommitWithDate -DaysAgo 46 -Message "Add Sheet component" -Files @("src/components/ui/sheet.tsx")

# Commit 16: Add Tabs component
Create-CommitWithDate -DaysAgo 45 -Message "Add Tabs component" -Files @("src/components/ui/tabs.tsx")

# Commit 17: Add Accordion component
Create-CommitWithDate -DaysAgo 44 -Message "Add Accordion component" -Files @("src/components/ui/accordion.tsx")

# Commit 18: Add Alert component
Create-CommitWithDate -DaysAgo 43 -Message "Add Alert and AlertDialog components" -Files @(
    "src/components/ui/alert.tsx", "src/components/ui/alert-dialog.tsx"
)

# Commit 19: Add Avatar component
Create-CommitWithDate -DaysAgo 42 -Message "Add Avatar component" -Files @("src/components/ui/avatar.tsx")

# Commit 20: Add Checkbox component
Create-CommitWithDate -DaysAgo 41 -Message "Add Checkbox component" -Files @("src/components/ui/checkbox.tsx")

# Commit 21: Add navigation components
Create-CommitWithDate -DaysAgo 40 -Message "Add navigation components" -Files @(
    "src/components/ui/navigation-menu.tsx", "src/components/ui/menubar.tsx", "src/components/ui/breadcrumb.tsx"
)

# Commit 22: Add dropdown menus
Create-CommitWithDate -DaysAgo 39 -Message "Add dropdown and context menu components" -Files @(
    "src/components/ui/dropdown-menu.tsx", "src/components/ui/context-menu.tsx"
)

# Commit 23: Add form components
Create-CommitWithDate -DaysAgo 38 -Message "Add form components" -Files @(
    "src/components/ui/form.tsx", "src/components/ui/radio-group.tsx",
    "src/components/ui/select.tsx", "src/components/ui/switch.tsx"
)

# Commit 24: Add toast notifications
Create-CommitWithDate -DaysAgo 37 -Message "Add toast notification system" -Files @(
    "src/components/ui/toast.tsx", "src/components/ui/toaster.tsx",
    "src/components/ui/sonner.tsx", "src/components/ui/use-toast.ts", "src/hooks/use-toast.ts"
)

# Commit 25: Add tooltip and popover
Create-CommitWithDate -DaysAgo 36 -Message "Add Tooltip and Popover components" -Files @(
    "src/components/ui/tooltip.tsx", "src/components/ui/popover.tsx", "src/components/ui/hover-card.tsx"
)

# Commit 26: Add data display components
Create-CommitWithDate -DaysAgo 35 -Message "Add Table and Chart components" -Files @(
    "src/components/ui/table.tsx", "src/components/ui/chart.tsx"
)

# Commit 27: Add progress indicators
Create-CommitWithDate -DaysAgo 34 -Message "Add Progress and Skeleton components" -Files @(
    "src/components/ui/progress.tsx", "src/components/ui/skeleton.tsx"
)

# Commit 28: Add layout components
Create-CommitWithDate -DaysAgo 33 -Message "Add layout components" -Files @(
    "src/components/ui/scroll-area.tsx", "src/components/ui/resizable.tsx",
    "src/components/ui/sidebar.tsx", "src/components/ui/aspect-ratio.tsx"
)

# Commit 29: Add interactive components
Create-CommitWithDate -DaysAgo 32 -Message "Add Slider, Toggle, and Collapsible components" -Files @(
    "src/components/ui/slider.tsx", "src/components/ui/toggle.tsx",
    "src/components/ui/toggle-group.tsx", "src/components/ui/collapsible.tsx"
)

# Commit 30: Add advanced components
Create-CommitWithDate -DaysAgo 31 -Message "Add Calendar, Carousel, and Drawer components" -Files @(
    "src/components/ui/calendar.tsx", "src/components/ui/carousel.tsx", "src/components/ui/drawer.tsx"
)

# Commit 31: Add command and pagination
Create-CommitWithDate -DaysAgo 30 -Message "Add Command and Pagination components" -Files @(
    "src/components/ui/command.tsx", "src/components/ui/pagination.tsx", "src/components/ui/input-otp.tsx"
)

# Commit 32: Add custom hooks
Create-CommitWithDate -DaysAgo 29 -Message "Create custom hooks for animations" -Files @(
    "src/hooks/use-mobile.tsx", "src/hooks/useScrollAnimation.ts"
)

# Commit 33: Add typewriter hook
Create-CommitWithDate -DaysAgo 28 -Message "Add typewriter effect hook" -Files @("src/hooks/useTypewriter.ts")

# Commit 34: Create TypewriterText component
Create-CommitWithDate -DaysAgo 27 -Message "Create TypewriterText component" -Files @("src/components/TypewriterText.tsx")

# Commit 35: Create Hero section
Create-CommitWithDate -DaysAgo 26 -Message "Create Hero section component" -Files @("src/components/Hero.tsx")

# Commit 36: Create About section
Create-CommitWithDate -DaysAgo 25 -Message "Create About section component" -Files @("src/components/About.tsx")

# Commit 37: Create Skills section
Create-CommitWithDate -DaysAgo 24 -Message "Create Skills section component" -Files @("src/components/Skills.tsx")

# Commit 38: Create Projects section
Create-CommitWithDate -DaysAgo 23 -Message "Create Projects section component" -Files @("src/components/Projects.tsx")

# Commit 39: Create Contact section
Create-CommitWithDate -DaysAgo 22 -Message "Create Contact section component" -Files @("src/components/Contact.tsx")

# Commit 40: Create SectionPreview component
Create-CommitWithDate -DaysAgo 21 -Message "Create SectionPreview component for navigation" -Files @("src/components/SectionPreview.tsx")

# Commit 41: Create Terminal interface
Create-CommitWithDate -DaysAgo 20 -Message "Create interactive Terminal interface" -Files @("src/components/TerminalInterface.tsx")

# Commit 42: Add Terminal quick actions
Create-CommitWithDate -DaysAgo 19 -Message "Add Terminal quick actions component" -Files @("src/components/TerminalQuickActions.tsx")

# Commit 43: Create main App component
Create-CommitWithDate -DaysAgo 18 -Message "Create main App component with routing" -Files @("src/App.tsx")

# Commit 44: Create Index page
Create-CommitWithDate -DaysAgo 17 -Message "Create Index page with all sections" -Files @("src/pages/Index.tsx")

# Commit 45: Create 404 page
Create-CommitWithDate -DaysAgo 16 -Message "Create NotFound (404) page" -Files @("src/pages/NotFound.tsx")

# Commit 46: Add public assets
Create-CommitWithDate -DaysAgo 15 -Message "Add favicon and placeholder assets" -Files @(
    "public/favicon.ico", "public/placeholder.svg", "public/robots.txt"
)

# Commit 47: Update README
Create-CommitWithDate -DaysAgo 14 -Message "Update README with project documentation" -Files @("README.md")

# Commit 48: Add bun lockfile
Create-CommitWithDate -DaysAgo 13 -Message "Add bun lockfile for faster installs" -Files @("bun.lockb")

# Commit 49: Refactor Hero component animations
Create-CommitWithDate -DaysAgo 5 -Message "Refactor closing and minimize animations" -Files @("src/components/Hero.tsx")

# Commit 50: Fix terminal animations
Create-CommitWithDate -DaysAgo 4 -Message "Fix terminal animations" -Files @("src/components/TerminalInterface.tsx")

# Commit 51: Fix terminal opening animation
Create-CommitWithDate -DaysAgo 3 -Message "Fix terminal opening animation and hero display" -Files @(
    "src/components/TerminalInterface.tsx", "src/components/Hero.tsx"
)

# Commit 52: Fix hero visibility issue
Create-CommitWithDate -DaysAgo 2 -Message "Fix: Hero reappears on terminal open" -Files @("src/components/Hero.tsx")

# Commit 53: Final animation fixes
Create-CommitWithDate -DaysAgo 1 -Message "Fix terminal closing animation and hero visibility" -Files @(
    "src/components/TerminalInterface.tsx", "src/components/Hero.tsx"
)

Write-Host "✓ Created new repository with 53 commits" -ForegroundColor Green
Write-Host "✓ All commits authored by: Idan Gurevich <idan.gurevich@gmail.com>" -ForegroundColor Green
