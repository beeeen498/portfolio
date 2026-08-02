/* ========================
   PROJECT TYPE
======================== */
export type Project = {
  id: number;
  order: number;
  name: { en: string; he: string };
  summary: { en: string; he: string };
  stack: string[];
  color: string;
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
  name: { en: "Weather App", he: "אפליקציית מזג אוויר" },
  summary: {
    en: "A real-time weather dashboard with location search, 7-day forecast, and animated weather icons.",
    he: "לוח מזג אוויר בזמן אמת עם חיפוש מיקום, תחזית ל-7 ימים ואייקונים מונפשים."
  },
  stack: ["React", "TypeScript", "SCSS", "OpenWeather API"],
  color: "#4A90D9",
  image: "/projects/weather-app.png",
  url: "https://weather-app-ben.vercel.app",
},
  {
    id: 2,
    order: 2,
    name: { en: "Project Two", he: "פרויקט שניים" },
    summary: { en: "Short description goes here.", he: "תיאור קצר כאן." },
    stack: [],
    color: "#cccccc",
    image: "/projects/project-2.png",
    url: "https://project-two.vercel.app",
  },
  {
    id: 3,
    order: 3,
    name: { en: "Project Three", he: "פרויקט שלוש" },
    summary: { en: "Short description goes here.", he: "תיאור קצר כאן." },
    stack: [],
    color: "#cccccc",
    image: "/projects/project-3.png",
    url: "https://project-three.vercel.app",
  },
  {
    id: 4,
    order: 4,
    name: { en: "Project Four", he: "פרויקט ארבע" },
    summary: { en: "Short description goes here.", he: "תיאור קצר כאן." },
    stack: [],
    color: "#cccccc",
    image: "/projects/project-4.png",
    url: "https://project-four.vercel.app",
  },
  {
    id: 5,
    order: 5,
    name: { en: "Project Five", he: "פרויקט חמש" },
    summary: { en: "Short description goes here.", he: "תיאור קצר כאן." },
    stack: [],
    color: "#cccccc",
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
