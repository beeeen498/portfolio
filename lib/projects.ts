/* ========================
   PROJECT TYPE
======================== */
export type Project = {
  id: number;
  order: number;
  name: { en: string; he: string };
  summary: { en: string; he: string };
  stack: string[];
  image: string;
  url: string;
};

/* ========================
   PROJECT DATA
======================== */
export const projects: Project[] = [
  {
    id: 1,
    order: 1,
    name: { en: "Smash'd", he: "Smash'd" },
    summary: {
      en: "A full-stack burger restaurant app with a 3D burger builder, secret menu discovery flow, and admin dashboard.",
      he: "אפליקציית מסעדת המבורגרים פול-סטאק עם בונה המבורגר תלת-ממדי, תפריט סודי ולוח ניהול.",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "SCSS",
      "Supabase",
      "React Three Fiber",
      "Zustand",
      "GSAP",
    ],
    image: "/projects/smashd.png",
    url: "https://smashd-beta.vercel.app/",
  },
  {
    id: 2,
    order: 2,
    name: { en: "Veni, Vidi, Vici", he: "Veni, Vidi, Vici" },
    summary: {
      en: "A modern Italian restaurant website featuring a scroll-scrubbing video hero, GSAP-animated sections, and a reservation flow with inline validation.",
      he: "אתר מסעדה איטלקית מודרנית עם וידאו נגלל בהירו, אנימציות GSAP וטופס הזמנת שולחן עם ולידציה.",
    },
    stack: ["Next.js", "TypeScript", "SCSS", "GSAP", "Playwright"],
    image: "/projects/veni-vidi-vici.png",
    url: "https://vini-vidi-vici.vercel.app/",
  },
  {
    id: 3,
    order: 3,
    name: { en: "Project Three", he: "פרויקט שלוש" },
    summary: { en: "Short description goes here.", he: "תיאור קצר כאן." },
    stack: [],
    image: "/projects/project-3.png",
    url: "https://project-three.vercel.app",
  },
  {
    id: 4,
    order: 4,
    name: { en: "Project Four", he: "פרויקט ארבע" },
    summary: { en: "Short description goes here.", he: "תיאור קצר כאן." },
    stack: [],
    image: "/projects/project-4.png",
    url: "https://project-four.vercel.app",
  },
  {
    id: 5,
    order: 5,
    name: { en: "Project Five", he: "פרויקט חמש" },
    summary: { en: "Short description goes here.", he: "תיאור קצר כאן." },
    stack: [],
    image: "/projects/project-5.png",
    url: "https://project-five.vercel.app",
  },
];

/* ========================
   SORTED BY DISPLAY ORDER
======================== */
export function getProjectsSorted(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}
