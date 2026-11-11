# Portfolio

React + TypeScript + Vite. No router library: pages use hash links (`#/work/clinicq`), so it deploys on any static host.

```bash
npm install
npm run dev      # local
npm run build    # output in dist/
```

## Edit content
All text lives in `src/data/projects.ts`: projects, links, profile, experience, skills.
To add screenshots to a case study, put images in `public/img/` and add
`shots: [{ src: "/img/clinicq-calendar.png", alt: "Staff day calendar" }]` to the project.

## Deploy
Import the repo into Vercel (framework: Vite). No extra config needed.
