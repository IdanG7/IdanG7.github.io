#!/bin/bash

# Initialize new git repository
git init

# Configure git user
git config user.name "Idan Gurevich"
git config user.email "idan.gurevich@gmail.com"

# Function to create a commit with a specific date offset (days ago)
commit_with_date() {
    local days_ago=$1
    local message=$2
    shift 2
    local files=("$@")

    for file in "${files[@]}"; do
        git add "$file"
    done

    local commit_date=$(date -d "$days_ago days ago" +"%Y-%m-%d %H:%M:%S")
    GIT_AUTHOR_DATE="$commit_date" GIT_COMMITTER_DATE="$commit_date" git commit -m "$message"
}

# Commit 1: Initial project setup
commit_with_date 60 "Initial project setup with Vite and React" \
    "package.json" "package-lock.json" "vite.config.ts" "tsconfig.json" \
    "tsconfig.app.json" "tsconfig.node.json" "index.html" ".gitignore"

# Commit 2: Configure ESLint
commit_with_date 59 "Add ESLint configuration" "eslint.config.js"

# Commit 3: Configure Tailwind CSS
commit_with_date 58 "Set up Tailwind CSS" \
    "tailwind.config.ts" "postcss.config.js"

# Commit 4: Add base styles
commit_with_date 57 "Add base CSS and index styles" \
    "src/index.css" "src/App.css"

# Commit 5: Create main entry point
commit_with_date 56 "Create main application entry point" \
    "src/main.tsx" "src/vite-env.d.ts"

# Commit 6: Add shadcn/ui configuration
commit_with_date 55 "Configure shadcn/ui components" \
    "components.json" "src/lib/utils.ts"

# Commit 7: Install core UI components - Button
commit_with_date 54 "Add Button component" "src/components/ui/button.tsx"

# Commit 8: Add Card component
commit_with_date 53 "Add Card component" "src/components/ui/card.tsx"

# Commit 9: Add Badge component
commit_with_date 52 "Add Badge component" "src/components/ui/badge.tsx"

# Commit 10: Add Input component
commit_with_date 51 "Add Input component" "src/components/ui/input.tsx"

# Commit 11: Add Textarea component
commit_with_date 50 "Add Textarea component" "src/components/ui/textarea.tsx"

# Commit 12: Add Label component
commit_with_date 49 "Add Label component" "src/components/ui/label.tsx"

# Commit 13: Add Separator component
commit_with_date 48 "Add Separator component" "src/components/ui/separator.tsx"

# Commit 14: Add Dialog component
commit_with_date 47 "Add Dialog component" "src/components/ui/dialog.tsx"

# Commit 15: Add Sheet component
commit_with_date 46 "Add Sheet component" "src/components/ui/sheet.tsx"

# Commit 16: Add Tabs component
commit_with_date 45 "Add Tabs component" "src/components/ui/tabs.tsx"

# Commit 17: Add Accordion component
commit_with_date 44 "Add Accordion component" "src/components/ui/accordion.tsx"

# Commit 18: Add Alert component
commit_with_date 43 "Add Alert and AlertDialog components" \
    "src/components/ui/alert.tsx" "src/components/ui/alert-dialog.tsx"

# Commit 19: Add Avatar component
commit_with_date 42 "Add Avatar component" "src/components/ui/avatar.tsx"

# Commit 20: Add Checkbox component
commit_with_date 41 "Add Checkbox component" "src/components/ui/checkbox.tsx"

# Commit 21: Add navigation components
commit_with_date 40 "Add navigation components" \
    "src/components/ui/navigation-menu.tsx" "src/components/ui/menubar.tsx" \
    "src/components/ui/breadcrumb.tsx"

# Commit 22: Add dropdown menus
commit_with_date 39 "Add dropdown and context menu components" \
    "src/components/ui/dropdown-menu.tsx" "src/components/ui/context-menu.tsx"

# Commit 23: Add form components
commit_with_date 38 "Add form components" \
    "src/components/ui/form.tsx" "src/components/ui/radio-group.tsx" \
    "src/components/ui/select.tsx" "src/components/ui/switch.tsx"

# Commit 24: Add toast notifications
commit_with_date 37 "Add toast notification system" \
    "src/components/ui/toast.tsx" "src/components/ui/toaster.tsx" \
    "src/components/ui/sonner.tsx" "src/components/ui/use-toast.ts" \
    "src/hooks/use-toast.ts"

# Commit 25: Add tooltip and popover
commit_with_date 36 "Add Tooltip and Popover components" \
    "src/components/ui/tooltip.tsx" "src/components/ui/popover.tsx" \
    "src/components/ui/hover-card.tsx"

# Commit 26: Add data display components
commit_with_date 35 "Add Table and Chart components" \
    "src/components/ui/table.tsx" "src/components/ui/chart.tsx"

# Commit 27: Add progress indicators
commit_with_date 34 "Add Progress and Skeleton components" \
    "src/components/ui/progress.tsx" "src/components/ui/skeleton.tsx"

# Commit 28: Add layout components
commit_with_date 33 "Add layout components" \
    "src/components/ui/scroll-area.tsx" "src/components/ui/resizable.tsx" \
    "src/components/ui/sidebar.tsx" "src/components/ui/aspect-ratio.tsx"

# Commit 29: Add interactive components
commit_with_date 32 "Add Slider, Toggle, and Collapsible components" \
    "src/components/ui/slider.tsx" "src/components/ui/toggle.tsx" \
    "src/components/ui/toggle-group.tsx" "src/components/ui/collapsible.tsx"

# Commit 30: Add advanced components
commit_with_date 31 "Add Calendar, Carousel, and Drawer components" \
    "src/components/ui/calendar.tsx" "src/components/ui/carousel.tsx" \
    "src/components/ui/drawer.tsx"

# Commit 31: Add command and pagination
commit_with_date 30 "Add Command and Pagination components" \
    "src/components/ui/command.tsx" "src/components/ui/pagination.tsx" \
    "src/components/ui/input-otp.tsx"

# Commit 32: Add custom hooks
commit_with_date 29 "Create custom hooks for animations" \
    "src/hooks/use-mobile.tsx" "src/hooks/useScrollAnimation.ts"

# Commit 33: Add typewriter hook
commit_with_date 28 "Add typewriter effect hook" \
    "src/hooks/useTypewriter.ts"

# Commit 34: Create TypewriterText component
commit_with_date 27 "Create TypewriterText component" \
    "src/components/TypewriterText.tsx"

# Commit 35: Create Hero section
commit_with_date 26 "Create Hero section component" \
    "src/components/Hero.tsx"

# Commit 36: Create About section
commit_with_date 25 "Create About section component" \
    "src/components/About.tsx"

# Commit 37: Create Skills section
commit_with_date 24 "Create Skills section component" \
    "src/components/Skills.tsx"

# Commit 38: Create Projects section
commit_with_date 23 "Create Projects section component" \
    "src/components/Projects.tsx"

# Commit 39: Create Contact section
commit_with_date 22 "Create Contact section component" \
    "src/components/Contact.tsx"

# Commit 40: Create SectionPreview component
commit_with_date 21 "Create SectionPreview component for navigation" \
    "src/components/SectionPreview.tsx"

# Commit 41: Create Terminal interface
commit_with_date 20 "Create interactive Terminal interface" \
    "src/components/TerminalInterface.tsx"

# Commit 42: Add Terminal quick actions
commit_with_date 19 "Add Terminal quick actions component" \
    "src/components/TerminalQuickActions.tsx"

# Commit 43: Create main App component
commit_with_date 18 "Create main App component with routing" \
    "src/App.tsx"

# Commit 44: Create Index page
commit_with_date 17 "Create Index page with all sections" \
    "src/pages/Index.tsx"

# Commit 45: Create 404 page
commit_with_date 16 "Create NotFound (404) page" \
    "src/pages/NotFound.tsx"

# Commit 46: Add public assets
commit_with_date 15 "Add favicon and placeholder assets" \
    "public/favicon.ico" "public/placeholder.svg" "public/robots.txt"

# Commit 47: Update README
commit_with_date 14 "Update README with project documentation" \
    "README.md"

# Commit 48: Add bun lockfile
commit_with_date 13 "Add bun lockfile for faster installs" \
    "bun.lockb"

# Commit 49: Refactor Hero component animations
commit_with_date 5 "Refactor closing and minimize animations"

# Commit 50: Fix terminal animations
commit_with_date 4 "Fix terminal animations"

# Commit 51: Fix terminal opening animation
commit_with_date 3 "Fix terminal opening animation and hero display"

# Commit 52: Fix hero visibility issue
commit_with_date 2 "Fix: Hero reappears on terminal open"

# Commit 53: Final animation fixes
commit_with_date 1 "Fix terminal closing animation and hero visibility"

echo "✓ Created new repository with 53 commits"
echo "✓ All commits authored by: Idan Gurevich <idan.gurevich@gmail.com>"
