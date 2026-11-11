export type Link = { label: string; href: string };
export type Shot = { src: string; alt: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  kind: "Product" | "Library" | "Research";
  status: string;
  stack: string[];
  summary: string;
  highlights: string[];
  problem: string;
  design: string[];
  engineering: string[];
  limits?: string[];
  links: Link[];
  shots?: Shot[];
};

export const projects: Project[] = [
  {
    slug: "clinicq",
    title: "ClinicQ",
    tagline: "Scheduling for small clinics, designed in Figma and live on AWS.",
    kind: "Product",
    status: "Live",
    stack: ["Figma", "React", "TypeScript", "Storybook", "Playwright", "Java 21", "Spring Boot", "PostgreSQL", "Docker", "AWS"],
    summary:
      "Patients book appointments, staff run the day, and when someone cancels the freed slot is offered to the next person on the waitlist. I designed it in Figma first, then built the interface and the API.",
    highlights: [
      "Designed first in Figma: 9 screens, 3 flows, design tokens",
      "Four roles, each with its own view: patient, receptionist, doctor, admin",
      "0 double-booked slots across 1,000 simultaneous requests on 50 slots",
      "48 component tests, 11 Playwright tests (6 user journeys, 5 axe accessibility scans)",
      "Lighthouse 100 / 100 / 100 / 100 on the live sign-in page",
    ],
    problem:
      "Small clinics lose time to manual rescheduling and lose revenue to empty slots. Two people must also never end up holding the same slot.",
    design: [
      "Staff see the day as a time grid, one column per doctor, with each appointment sized by its length. A list view is one toggle away and is the default on phones.",
      "Patients pick a day from a strip that shows how many times are open, then pick a time.",
      "A held waitlist slot is shown as a ticket with a countdown ring for the 15 minutes.",
      "Accessible by default: skip link, labelled controls, keyboard-operable calendar, focus moves to confirmations, colour is never the only signal.",
    ],
    engineering: [
      "The interface is a small typed component library with every component in Storybook.",
      "Changes appear instantly and roll back with a clear message if the server refuses (optimistic updates).",
      "Double-booking is prevented by a row lock plus a partial unique index. My first version, with neither, double-booked 4 to 6 slots in the same test.",
      "Booking is idempotent: a retried request returns the original appointment.",
      "Waitlist offers expire after 15 minutes through a background job that is safe to run on several instances.",
      "Phone, date of birth and notes are encrypted per field; logs contain no personal data.",
    ],
    limits: [
      "Live updates are polling every few seconds, not websockets.",
      "The demo runs on a single small instance and reminder emails go to a mail catcher, not real inboxes.",
    ],
    links: [
      { label: "Live demo", href: "https://clinicq.duckdns.org" },
      { label: "Figma file", href: "https://www.figma.com/design/KNP4jZajTe388H3QhKR2BP/ClinicQ-Design" },
      { label: "GitHub", href: "https://github.com/kalyanmantha-ui/CLINICQ" },
    ],
    shots: [
      { src: "shots/clinicq-signin.jpg", alt: "The sign-in page, with one-click demo accounts for each role" },
      { src: "shots/clinicq-schedule.jpg", alt: "The receptionist's schedule, a time grid with open slots and a current-time line" },
    ],
  },
  {
    slug: "paper-ui",
    title: "paper-ui",
    tagline: "A small React design system with tokens, theming and hand-built accessibility.",
    kind: "Library",
    status: "Design system",
    stack: ["React", "TypeScript", "CSS Modules", "Vite"],
    summary:
      "A design system with a token layer, light and dark themes, and four components: Button, Input, Modal and Dropdown. Each one is built to handle the hard parts of its job properly.",
    highlights: [
      "Raw and semantic design tokens, with a dark theme",
      "Modal with a hand-written focus trap and scroll lock",
      "Dropdown with its own keyboard navigation logic",
      "Input with validation and a show/hide toggle for passwords",
      "Consumed by a separate app (CollabBoard) as a linked package",
    ],
    problem:
      "Many component libraries look right and fail on a keyboard or a screen reader. I wanted components where I could explain every line.",
    design: [
      "Components read from semantic tokens, so switching to dark mode changes the tokens and not the components.",
      "Keyboard and focus behaviour is treated as part of the design, not an afterthought.",
    ],
    engineering: [
      "Focus trap, scroll lock and dropdown keyboard handling are written as plain TypeScript modules, with React as a thin layer on top.",
      "Built as a package with typed exports and a separate stylesheet entry.",
      "Using it in CollabBoard exposed missing pieces (button variants, textarea, avatar, menu), which became my to-do list for the next version.",
    ],
    limits: ["Four components. Button variants, textarea, avatar and menu live in the app that uses it and are next to move in."],
    links: [{ label: "GitHub", href: "https://github.com/kalyanmantha-ui/paper-ui" }],
    shots: [
      { src: "shots/paper-ui-keyboard.gif", alt: "Typing in an input, then choosing from the dropdown with arrow keys and Enter" },
      { src: "shots/paperui-dropdown.jpg", alt: "The dropdown, with the highlighted option shown by a focus ring" },
      { src: "shots/paperui-modal.jpg", alt: "The modal, with focus kept inside" },
      { src: "shots/paperui-dark.jpg", alt: "The same components in the dark theme" },
    ],
  },
  {
    slug: "collabboard",
    title: "CollabBoard",
    tagline: "A Kanban app built on paper-ui, frontend only.",
    kind: "Product",
    status: "Frontend project",
    stack: ["React", "TypeScript", "CSS Modules", "paper-ui"],
    summary:
      "A task board with workspaces, boards, drag and drop and task detail. There is no backend: a mock API keeps the data in memory and in localStorage, with artificial latency so loading states are real.",
    highlights: [
      "Drag and drop on desktop; touch and keyboard users move cards from a menu",
      "Optimistic updates with rollback",
      "Loading, empty and error states you can trigger from the URL",
      "Seeded with 5 users, 3 workspaces, 8 boards and about 50 tasks",
    ],
    problem:
      "I needed a real consumer for paper-ui, one with enough UI variety to show where the library falls short.",
    design: [
      "Drag and drop is not the only way to move a card, so keyboard and touch users are not left out.",
      "Every screen has designed loading, empty and error states.",
    ],
    engineering: [
      "The whole backend is one file, so swapping in real fetch calls later means replacing that file.",
      "Board state lives in one hook that handles optimistic updates and rollback.",
    ],
    limits: ["The backend is mocked on purpose so the work stays on the interface. Sign-in is a mock too."],
    links: [{ label: "GitHub", href: "https://github.com/kalyanmantha-ui/collabboard" }],
    shots: [
      { src: "shots/collabboard-paperui.gif", alt: "CollabBoard with the paper-ui parts outlined in blue: Dropdown, Button, Modal, Input. Its own Card, Tag, Avatar and Menu stay local." },
      { src: "shots/collabboard-drag.gif", alt: "Dragging a card to another column" },
      { src: "shots/collabboard-board.jpg", alt: "A board with filters, assignees and due dates" },
      { src: "shots/collabboard-error.jpg", alt: "The error state, with a Retry button in every column" },
      { src: "shots/collabboard-loading.jpg", alt: "The loading state, with placeholder cards" },
    ],
  },
  {
    slug: "react-resource-ui",
    title: "react-resource-ui",
    tagline: "A headless hook for pagination and list state, on npm.",
    kind: "Library",
    status: "Published",
    stack: ["React", "TypeScript", "npm"],
    summary:
      "One hook for page-by-page, load-more and infinite-scroll lists. You describe your data source once and switch the behaviour with configuration.",
    highlights: [
      "Published on npm",
      "Headless: no markup or styles imposed",
      "Page, load-more and infinite scroll from the same data source",
      "Built-in virtualization for long lists",
      "Optional DataTable component",
    ],
    problem:
      "Pagination logic gets rewritten whenever a list changes from pages to infinite scroll, and it is easy to get stale requests and merged data wrong.",
    design: ["Headless by design, so it works with plain markup, Tailwind or Material UI."],
    engineering: [
      "One source function returns data and a total; the hook decides whether to replace or append.",
      "Handles stale requests so an old response cannot overwrite a newer one.",
      "Virtualization renders only the visible rows.",
    ],
    limits: ["Early release. Sorting, filtering and caching are on the roadmap."],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/react-resource-ui" },
      { label: "GitHub", href: "https://github.com/kalyanmantha-ui/react-resource" },
    ],
  },
  {
    slug: "hvac-estimate",
    title: "HVAC Field Estimate Tool",
    tagline: "A tablet-first estimating tool for field technicians.",
    kind: "Product",
    status: "Live",
    stack: ["React", "TypeScript", "Vite", "fuse.js", "GitHub Pages"],
    summary:
      "An estimating tool I built for HVAC technicians working on tablets. It copes with messy data, searches by typo, prices as a range and prints a signable estimate.",
    highlights: [
      "Quick mode for 15-minute diagnostic visits, Detailed mode for full system replacements",
      "Totals shown as a low to high range, not a single price",
      "Normalization layer for inconsistent field names in the equipment and customer data",
      "Fuzzy search, so \"carier\" still finds Carrier",
      "Custom line items, including negative amounts for discounts",
      "Estimate is saved in the browser and prints to a PDF with a signature line",
      "Deployed on GitHub Pages",
    ],
    problem:
      "The data used different names for the same fields, such as baseCost and base_cost, and field work often turns up surprises that change the price. Technicians also work one-handed on a tablet, so typing exact model names is a poor fit.",
    design: [
      "Missing data degrades gracefully, for example showing \"Not on file\" instead of breaking the layout.",
      "A price range sets honest expectations with the customer.",
      "Quantity buttons stop at 1, and a discount shows in green so it is never mistaken for a charge.",
    ],
    engineering: [
      "A utility layer standardizes the data before it reaches any component, so the UI never sees the inconsistencies.",
      "Two workflows share one data model.",
      "Fuse.js searches name, brand, model number and category, so small typos still match.",
      "The estimate state is written to localStorage, so a page refresh in the field loses nothing.",
      "A print stylesheet turns the same screen into a clean PDF estimate.",
    ],
    links: [
      { label: "Live demo", href: "https://kalyanmantha-ui.github.io/Full-Stack-Dev-Test/" },
      { label: "GitHub", href: "https://github.com/kalyanmantha-ui/Full-Stack-Dev-Test" },
    ],
    shots: [
      { src: "shots/hvac-equipment.jpg", alt: "Equipment cards with category filters, in the tablet layout" },
      { src: "shots/hvac-search.jpg", alt: "Searching \"furnce\" still finds the furnaces" },
      { src: "shots/hvac-range.jpg", alt: "The live total shown as a low to high range, with Export to PDF" },
    ],
  },
  {
    slug: "nextplay",
    title: "NextPlay",
    tagline: "A Kanban board with real auth and a database, live on Vercel.",
    kind: "Product",
    status: "Live",
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "dnd-kit", "Vercel"],
    summary:
      "A full-stack task board I built with Next.js and Supabase. Each guest gets an anonymous session and sees only their own tasks.",
    highlights: [
      "Anonymous guest sessions through Supabase auth",
      "Row-level security so users can only read their own data",
      "Drag and drop between To Do, In Progress, In Review and Done",
      "Priority, due dates with overdue highlighting, loading and error states",
    ],
    problem: "I wanted one project that goes all the way down: a real database, real access rules and a live deployment, without asking visitors to create an account first.",
    design: [
      "Overdue tasks are highlighted, and every request has a visible loading or error state.",
    ],
    engineering: [
      "Access rules live in the database as row-level security policies, not only in the UI.",
      "Status changes are saved when a card is dropped in a new column.",
      "Dragging uses dnd-kit with a 5 pixel activation distance, so a plain click still opens the task.",
      "The tasks table stores title, description, status, priority, due date, labels and an owner id.",
    ],
    links: [
      { label: "Live demo", href: "https://next-play-alpha.vercel.app" },
      { label: "GitHub", href: "https://github.com/kalyanmantha-ui/next-play" },
    ],
    shots: [
      { src: "shots/nextplay-board.jpg", alt: "The board with one card in each column after dragging cards between them" },
      { src: "shots/nextplay-create.jpg", alt: "The new task form: title, description, priority and due date" },
    ],
  },
  {
    slug: "complexity-analyzer",
    title: "Neuro-Symbolic Code Complexity Analyzer",
    tagline: "Estimates Big-O complexity with a fine-tuned model plus syntax-tree rules.",
    kind: "Research",
    status: "Capstone, runs locally",
    stack: ["Python", "PyTorch", "GraphCodeBERT", "FastAPI", "React", "Chrome Extension"],
    summary:
      "My MS capstone. A Chrome extension grabs code from an online editor, and a local server estimates its time and space complexity using a fine-tuned model checked by rules on the syntax tree.",
    highlights: [
      "Fine-tuned GraphCodeBERT on 2,365 snippets from the CodeComplex dataset",
      "87.5% accuracy on 263 snippets the model never saw",
      "Chrome extension that works with virtualized editors such as Monaco",
      "Four parts built solo: model, FastAPI server, React interface, extension",
    ],
    problem:
      "A model alone can be wrong on patterns like two-pointer windows or monotonic stacks, where the structure settles the answer.",
    design: [
      "The extension popup shows the estimate with reasoning, so users see why it answered that way.",
    ],
    engineering: [
      "Source is cleaned, a syntax-tree pass measures loop depth, the model predicts, and safety rules override known failure patterns.",
      "Virtualized editors hide off-screen lines, so the extension reads the code the user selects.",
    ],
    limits: ["Runs locally. It is not deployed."],
    links: [{ label: "GitHub", href: "https://github.com/kalyanmantha-ui/Major-Project-GSU" }],
  },
];

export const more = [
  {
    title: "UI component gallery",
    text: "Twelve interactive components (accordion, tabs, modal, tooltip, toast, form validation and more) with preview videos, plus a food-ordering dashboard page.",
    href: "https://github.com/kalyanmantha-ui/Components-UI",
  },
  {
    title: "SHOP.CO",
    text: "A multi-page e-commerce front end in HTML, CSS and vanilla JavaScript.",
    href: "https://github.com/kalyanmantha-ui/shop.co",
  },
];

export const profile = {
  name: "Kalyan Mantha",
  role: "Frontend engineer and UI designer",
  location: "San Jose, CA",
  intro:
    "I design interfaces in Figma and build them in React and TypeScript. I care about the parts people feel: clear flows, keyboard and screen reader support, and states that behave when things go wrong.",
  email: "kalyanmantha1410@gmail.com",
  github: "https://github.com/kalyanmantha-ui",
  linkedin: "https://linkedin.com/in/kalyan-mantha",
  skills: [
    { group: "Design", items: ["Figma", "Design tokens", "Design systems", "Accessibility (WCAG)"] },
    { group: "Frontend", items: ["React", "TypeScript", "JavaScript", "Next.js", "Angular", "Storybook"] },
    { group: "Backend and delivery", items: ["Java", "Spring Boot", "PostgreSQL", "Supabase", "Docker", "AWS"] },
    { group: "Testing", items: ["Vitest", "Playwright", "axe-core"] },
  ],
  work: [
    { role: "Software Engineer", org: "GENX IT Solutions", when: "Oct 2026 – Present", text: "React and TypeScript interfaces for customer service agents, on a Java Spring Boot backend running on AWS." },
    { role: "Graduate Assistant", org: "Georgia State University", when: "Aug 2024 – Dec 2025", text: "Built React analytics dashboards and React and React Native interfaces from Figma designs. Also taught two classes of about 45 students each semester." },
    { role: "Intern", org: "DRDO", when: "May – Jul 2023", text: "Internal tools with Angular and a Java backend, SQL optimization and Python data scripts." },
  ],
  education: "M.S. Computer Science, Georgia State University, May 2026",
};
