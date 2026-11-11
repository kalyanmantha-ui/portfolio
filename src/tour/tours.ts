export type ArtKey =
  | "clinicDay" | "race" | "lock" | "waitlist" | "roles" | "proof"
  | "blocks" | "tokens" | "theme" | "modal" | "dropdown" | "kanban"
  | "list" | "modes" | "stale" | "window" | "skins"
  | "capture" | "loops" | "model" | "override" | "result"
  | "quick" | "mockfile" | "messy" | "range" | "fuzzy" | "print" | "guest" | "rls" | "drop" | "optimistic" | "menumove" | "states";

export type Station = {
  art: ArtKey;
  title: string;
  simple: string;
  detailed: string;
  tech?: string[];
};

export type TourData = { name: string; stations: Station[] };

export const tours: Record<string, TourData> = {
  clinicq: {
    name: "ClinicQ",
    stations: [
      {
        art: "clinicDay",
        title: "A clinic's day",
        simple:
          "A clinic only has so many appointment times. ClinicQ lets patients book them online and lets staff see the whole day at a glance.",
        detailed:
          "Patients book, receptionists and doctors see the day as a time grid with one column per doctor, and admins manage the setup. I designed it in Figma first (9 screens, 3 flows), then built the interface in React and TypeScript on a Java API.",
        tech: ["Figma", "React", "TypeScript", "Spring Boot", "PostgreSQL"],
      },
      {
        art: "race",
        title: "Two people, one slot",
        simple:
          "Sometimes two people try to grab the same time at the very same moment. If nothing stops them, both think they got it.",
        detailed:
          "My first version checked whether the slot was free and then saved the booking. Under a test of 1,000 simultaneous requests on 50 slots, that double-booked 4 to 6 slots, because two requests could both pass the check before either saved.",
        tech: ["k6 load test", "1,000 requests", "50 slots"],
      },
      {
        art: "lock",
        title: "The database says no",
        simple:
          "Now the database lets only one person through at a time. The other person is told, politely, that the time was just taken.",
        detailed:
          "A row lock (SELECT ... FOR UPDATE) makes racing requests take turns, and a unique index on booked slots is the safety net that holds even if my code is wrong. Same test: 50 accepted, 950 turned away, 0 double-booked, on my laptop and on the live server.",
        tech: ["Row lock", "Partial unique index", "Idempotency key"],
      },
      {
        art: "waitlist",
        title: "Cancellations get filled",
        simple:
          "If someone cancels, the next person waiting is offered the time and has 15 minutes to say yes. If they don't, it moves on.",
        detailed:
          "Cancelling offers the slot to the first matching person in the same transaction, so a cancel can never succeed without its offer. A background job expires offers and is safe to run on many servers. Ten simultaneous accepts produce exactly one booking.",
        tech: ["Background job", "SKIP LOCKED", "15-minute offers"],
      },
      {
        art: "roles",
        title: "Everyone sees their own view",
        simple:
          "Patients, receptionists, doctors and admins each see only what they need. Private details stay private.",
        detailed:
          "Roles are enforced on the server, not just hidden in the interface. Phone, date of birth and notes are encrypted per field, logs contain no personal data, and every time a doctor opens a record it is written to an audit log.",
        tech: ["JWT", "@PreAuthorize", "AES-256-GCM", "Audit log"],
      },
      {
        art: "proof",
        title: "Proof it works",
        simple:
          "Automated checks run the app like a real user, including with only a keyboard. The live site scores a perfect 100 in Google's Lighthouse checks.",
        detailed:
          "48 component tests, 11 Playwright browser tests (6 user journeys and 5 axe accessibility scans), over 80 API checks against a real database, and Lighthouse 100 for performance, accessibility, best practices and SEO on the live sign-in page.",
        tech: ["Vitest", "Playwright", "axe-core", "Storybook"],
      },
    ],
  },
  "paper-ui": {
    name: "paper-ui",
    stations: [
      {
        art: "blocks",
        title: "A box of matching parts",
        simple:
          "A design system is a set of building blocks, like buttons, text fields, pop-ups and menus, that look and behave the same everywhere.",
        detailed:
          "paper-ui has four components (Button, Input, Modal, Dropdown) written in React and TypeScript with CSS Modules, shipped as a package with typed exports and a single stylesheet.",
        tech: ["React", "TypeScript", "CSS Modules", "Vite"],
      },
      {
        art: "tokens",
        title: "Colours with names",
        simple:
          "Instead of saying \"use this exact orange\", every part asks for \"the accent colour\". Change what that means once and everything follows.",
        detailed:
          "Tokens come in two tiers. Raw tokens hold the palette. Semantic tokens name a job, such as --color-accent-default. Components only ever read semantic tokens, never a raw colour.",
        tech: ["Raw tokens", "Semantic tokens", "CSS variables"],
      },
      {
        art: "theme",
        title: "Light to dark with one switch",
        simple: "Flip one setting and the whole kit changes from light to dark.",
        detailed:
          "Dark mode is a second set of semantic values under [data-theme=\"dark\"]. The components don't change at all. Control borders are tuned to keep 3:1 contrast against their backgrounds.",
        tech: ["data-theme", "Contrast 3:1"],
      },
      {
        art: "modal",
        title: "Pop-ups that don't trap you",
        simple:
          "When a pop-up opens, someone using a keyboard can't wander off behind it. Escape closes it and puts them back where they were.",
        detailed:
          "A hand-written focus trap keeps Tab inside the dialog, scroll is locked while it's open, and focus returns to the button that opened it. The dialog uses role=\"dialog\" and aria-modal. The trap is plain TypeScript with no React in it.",
        tech: ["Focus trap", "Scroll lock", "role=dialog"],
      },
      {
        art: "dropdown",
        title: "Menus without a mouse",
        simple:
          "Arrow keys move through the options, Enter picks one, and Escape closes the menu. A screen reader announces each option as you go.",
        detailed:
          "The list is exposed as a listbox. The highlighted option is announced through aria-activedescendant, and the keyboard rules live in their own module so they can be tested without a browser.",
        tech: ["listbox", "aria-activedescendant", "Keyboard handling"],
      },
      {
        art: "kanban",
        title: "Used for real",
        simple:
          "I built a Kanban task board, CollabBoard, entirely on these parts. Using it showed me what the kit was still missing.",
        detailed:
          "CollabBoard (drag and drop, optimistic updates, loading and error states) consumes paper-ui as a linked package. It needed button variants, a textarea, an avatar and a menu, which are the next things to move into the library.",
        tech: ["CollabBoard", "npm link", "Optimistic updates"],
      },
    ],
  },
  "react-resource-ui": {
    name: "react-resource-ui",
    stations: [
      {
        art: "list",
        title: "Long lists",
        simple:
          "Apps are full of long lists: products, messages, search results. Somebody has to decide how to load them.",
        detailed:
          "Fetching, paging, appending, loading and error states, and keeping the screen consistent add up to a lot of code that gets rewritten in every project.",
      },
      {
        art: "modes",
        title: "Three ways to browse",
        simple:
          "Numbered pages, a \"load more\" button, or endless scrolling. Normally switching between them means rewriting code. Here it's one setting.",
        detailed:
          "You describe your data source once and set pagination.type to page, loadmore or infinite. Page replaces the data, load more appends it, and infinite fetches as you scroll.",
        tech: ["useResource", "pagination.type"],
      },
      {
        art: "stale",
        title: "Keeping answers in order",
        simple:
          "If you click quickly, an old answer can arrive late. The library ignores it, so the screen never shows the wrong page.",
        detailed:
          "Responses to out-of-date requests are discarded, so a slow earlier response can't overwrite a newer one.",
        tech: ["Stale requests", "Race conditions"],
      },
      {
        art: "window",
        title: "Only draw what you see",
        simple:
          "A list with 10,000 rows doesn't need 10,000 rows on screen. It draws only the few you can see, which keeps things fast.",
        detailed:
          "Virtualization takes an item height and container height and returns the offset and total height, so only the visible rows are rendered.",
        tech: ["Virtualization", "itemHeight", "offsetY"],
      },
      {
        art: "skins",
        title: "Bring your own look",
        simple:
          "The library handles the logic. You decide how everything looks, so it fits any design.",
        detailed:
          "It's headless, so it works with plain markup, Tailwind or Material UI. It's published on npm; install it with npm install react-resource-ui.",
        tech: ["Headless", "npm", "TypeScript"],
      },
    ],
  },
  "complexity-analyzer": {
    name: "the Complexity Analyzer",
    stations: [
      {
        art: "capture",
        title: "Code goes in",
        simple:
          "A browser extension reads the code you're looking at on a coding site and sends it to a small program on my computer.",
        detailed:
          "Online editors hide lines that are off-screen, so the extension reads the code you select. A background script relays it to a local FastAPI server.",
        tech: ["Chrome extension", "Monaco editor", "FastAPI"],
      },
      {
        art: "loops",
        title: "Clean it up, count the loops",
        simple:
          "First the code is tidied. Then the program counts how deeply loops are stacked inside each other, because that strongly hints at how slow it will be.",
        detailed:
          "Hidden characters that break parsers are stripped, then a syntax tree pass measures loop depth and produces a marker like [DEPTH_2] that goes to the model.",
        tech: ["AST", "Loop depth"],
      },
      {
        art: "model",
        title: "The model makes a guess",
        simple:
          "A trained AI model predicts how the running time grows as the input gets bigger: barely at all, a little, steadily, or sharply.",
        detailed:
          "GraphCodeBERT, fine-tuned on 2,365 code snippets from the CodeComplex dataset, chooses between four classes: O(1), O(log N), O(N) and O(N^2).",
        tech: ["GraphCodeBERT", "PyTorch", "CodeComplex"],
      },
      {
        art: "override",
        title: "Rules double-check it",
        simple:
          "Some clever coding tricks fool the model, so simple rules step in and correct it when the structure makes the answer clear.",
        detailed:
          "Patterns such as two-pointer windows and monotonic stacks look quadratic but run in linear time. When one is detected next to a quadratic prediction, the rule overrides it to linear.",
        tech: ["Symbolic rules", "Two pointers", "Monotonic stack"],
      },
      {
        art: "result",
        title: "The answer",
        simple:
          "You get the time and space complexity back, with the reasoning behind it, right in the extension.",
        detailed:
          "On 263 snippets the model had never seen, the whole pipeline (parsing, model and rules) was right 87.5% of the time. It runs locally; the interface is a React popup.",
        tech: ["87.5% accuracy", "263 unseen snippets", "React"],
      },
    ],
  },
  "hvac-estimate": {
    name: "the HVAC estimate tool",
    stations: [
      {
        art: "range",
        title: "A quote on a tablet",
        simple:
          "An HVAC technician visits a home and needs to tell the owner roughly what a repair or a new system will cost, right there on a tablet.",
        detailed:
          "I built the tool for field work: big touch targets, tablet-first layout, and a live total that updates as the technician adds equipment, labor and custom items.",
        tech: ["React", "TypeScript", "Vite"],
      },
      {
        art: "messy",
        title: "Messy data, cleaned once",
        simple:
          "The same fact is written in different ways in different places. The tool tidies it up before anything reaches the screen.",
        detailed:
          "Fields arrive as baseCost in one record and base_cost in another, or squareFootage and sqft. A normalization utility maps them to one shape, and anything missing shows as \"Not on file\" instead of breaking the layout.",
        tech: ["normalize.ts", "baseCost / base_cost", "Not on file"],
      },
      {
        art: "quick",
        title: "Quick and Detailed",
        simple:
          "A fifteen minute check-up and a whole new system are very different jobs, so the tool has two modes.",
        detailed:
          "Quick mode is for 15-minute diagnostics: picking a new labor or equipment item replaces the previous one. Detailed mode is for full replacements and keeps an unlimited itemized list. Both use the same data model.",
        tech: ["Quick mode", "Detailed mode", "Shared data model"],
      },
      {
        art: "fuzzy",
        title: "Search that forgives typos",
        simple:
          "Even if you spell a brand wrong, the tool still finds it.",
        detailed:
          "Fuse.js searches name, brand, model number and category together. Typing \"carier\" or \"furnce\" still returns the right equipment.",
        tech: ["fuse.js", "Fuzzy matching"],
      },
      {
        art: "range",
        title: "Prices as a range",
        simple:
          "Repairs hold surprises, so the tool shows a low price and a high price instead of one number that might be wrong.",
        detailed:
          "Totals are computed from the minimum and maximum labor hours, so the customer sees an honest range. Custom items can be negative, which makes discounts easy, and they show in green. Quantity buttons stop at 1.",
        tech: ["Min and max hours", "Custom items", "Discounts"],
      },
      {
        art: "print",
        title: "Save it and print it",
        simple:
          "The estimate is kept safe if the page reloads, and it prints as a clean page the customer can sign.",
        detailed:
          "State is persisted to localStorage. A print stylesheet (@media print) turns the screen into a PDF-ready estimate with a signature line. It is live on GitHub Pages.",
        tech: ["localStorage", "@media print", "GitHub Pages"],
      },
    ],
  },
  nextplay: {
    name: "NextPlay",
    stations: [
      {
        art: "kanban",
        title: "A board for tasks",
        simple:
          "NextPlay is a board with four columns: To Do, In Progress, In Review and Done. Each task is a card.",
        detailed:
          "It is a full-stack app: Next.js and TypeScript on the front, Supabase and PostgreSQL behind it, deployed on Vercel. Cards have a title, description, priority and due date.",
        tech: ["Next.js", "TypeScript", "Supabase", "Vercel"],
      },
      {
        art: "guest",
        title: "No sign-up needed",
        simple:
          "You can open the app and start using it straight away. It quietly gives you a private guest account.",
        detailed:
          "Supabase anonymous auth creates a session on first visit, so every task is tied to a real user id without a sign-up form. The board waits for that session before loading tasks.",
        tech: ["Anonymous auth", "AuthContext", "Session"],
      },
      {
        art: "rls",
        title: "Your tasks stay yours",
        simple:
          "Other visitors use the same app at the same time, but you only ever see your own cards.",
        detailed:
          "The rule lives in the database as row-level security, not just in the interface. Even if someone called the API directly, PostgreSQL would only return rows that belong to their user id.",
        tech: ["Row-level security", "PostgreSQL", "user_id"],
      },
      {
        art: "drop",
        title: "Drag a card, it saves",
        simple:
          "Move a card to another column and it stays there, even after you close the page.",
        detailed:
          "Dragging uses dnd-kit with a small activation distance, so a plain click still opens the task. Dropping a card in a new column writes the new status to the database.",
        tech: ["dnd-kit", "Status update"],
      },
      {
        art: "states",
        title: "When things go wrong",
        simple:
          "If something is loading or fails, the app tells you instead of showing a blank screen.",
        detailed:
          "Loading and error states are visible, overdue tasks are highlighted, and a detail modal lets you read or delete a task. It is live at next-play-alpha.vercel.app.",
        tech: ["Loading state", "Error state", "Overdue highlight"],
      },
    ],
  },
  collabboard: {
    name: "CollabBoard",
    stations: [
      {
        art: "kanban",
        title: "A team board",
        simple:
          "CollabBoard is a Kanban app for teams: workspaces hold boards, boards hold tasks.",
        detailed:
          "It is built on my own paper-ui components. It comes seeded with 5 users, 3 workspaces, 8 boards and about 50 tasks, so every screen has real-looking content.",
        tech: ["React", "TypeScript", "paper-ui"],
      },
      {
        art: "optimistic",
        title: "Instant, and honest",
        simple:
          "When you move a card, it moves right away. If the save fails, it jumps back and tells you.",
        detailed:
          "The board hook applies the change to local state first (an optimistic update), calls the API, and on failure reloads the board and shows \"Couldn't move that task. It was put back.\" Stale loads are ignored by request id.",
        tech: ["useBoard hook", "Optimistic update", "Rollback"],
      },
      {
        art: "menumove",
        title: "Not just drag and drop",
        simple:
          "Not everyone can drag. Every card also has a menu to move it, so touch and keyboard users can do the same thing.",
        detailed:
          "Desktop uses native HTML5 drag and drop. Each card has an overflow menu with \"Move to ...\" and the task form has a Status field. Reordering pauses while filters are active, because positions would be misleading.",
        tech: ["HTML5 drag and drop", "Menu", "Keyboard"],
      },
      {
        art: "states",
        title: "Every state designed",
        simple:
          "Loading, empty and error screens are all designed, and you can trigger them on purpose to see them.",
        detailed:
          "The mock API adds artificial latency, and adding ?simulate=error, empty or slow to the URL forces each state. Filters cover search, assignee, label and date.",
        tech: ["?simulate=error", "?simulate=empty", "?simulate=slow"],
      },
      {
        art: "mockfile",
        title: "One file to swap",
        simple:
          "There is no real server yet. A single file pretends to be one, so a real one can be plugged in later.",
        detailed:
          "The mock API keeps data in memory and localStorage. Because every screen goes through that one file, swapping in real fetch calls means replacing it, not touching the interface.",
        tech: ["mockApi.ts", "localStorage"],
      },
    ],
  },
};
