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
  wip?: boolean; // work in progress
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
    name: { en: "Brutal Studio", he: "Brutal Studio" },
    summary: {
      en: "A neo-brutalist design studio website featuring GSAP scroll animations, 3D flip cards, an interactive timeline slider with swipe and keyboard navigation, and a seamless logo carousel.",
      he: "אתר סטודיו לעיצוב בסגנון ניאו-ברוטליסטי עם אנימציות גלילה, כרטיסי 3D מתהפכים, סליידר טיימליין אינטראקטיבי וקרוסלת לוגואים.",
    },
    stack: ["React", "SCSS", "GSAP"],
    image: "/projects/brutal-studio.png",
    url: "https://brutal-studio-two.vercel.app",
  },
  {
    id: 4,
    order: 4,
    name: { en: "The Container", he: "The Container" },
    summary: {
      en: "A headless e-commerce storefront for an Israeli art and luxury fashion boutique. Features bilingual support (Hebrew/English) with full RTL, Shopify Storefront API integration, customer accounts, and a custom cart system.",
      he: "חנות אונליין headless לבוטיק ישראלי לאמנות ואופנה יוקרתית. כולל תמיכה דו-לשונית (עברית/אנגלית) עם RTL מלא, אינטגרציה עם Shopify Storefront API, חשבונות לקוחות ומערכת עגלת קניות מותאמת.",
    },
    stack: ["Next.js", "Shopify Storefront API", "SCSS", "Vercel"],
    image: "/projects/the-container.png",
    url: "https://thecontaineronline.com",
    wip: true,
  },
  {
    id: 5,
    order: 5,
    name: { en: "Kickz", he: "Kickz" },
    summary: {
      en: "A full-stack sneaker store with a 3D shoe configurator, scroll-driven GSAP animations, interactive store with filters, cart system with Zustand, and a checkout flow.",
      he: "חנות סניקרס עם קונפיגורטור נעליים תלת-ממדי, אנימציות GSAP מבוססות גלילה, חנות אינטראקטיבית עם פילטרים, מערכת עגלה עם Zustand, ותהליך תשלום.",
    },
    stack: [
      "Next.js",
      "TypeScript",
      "React Three Fiber",
      "Three.js",
      "GSAP",
      "SCSS",
      "Zustand",
    ],
    image: "/projects/kickz.png",
    url: "https://kickz-kappa.vercel.app",
    wip: true,
  },
];

/* ========================
   SORTED BY DISPLAY ORDER
======================== */
export function getProjectsSorted(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}
