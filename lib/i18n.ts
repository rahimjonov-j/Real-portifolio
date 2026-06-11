export const locales = ["uz", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocalizedPath(locale: Locale, path = "") {
  return path ? `/${locale}/${path}` : `/${locale}`;
}

type Dictionary = {
  metadata: {
    homeTitle: string;
    aboutTitle: string;
    projectsTitle: string;
    description: string;
  };
  navigation: {
    projects: string;
    languageLabel: string;
    homeAriaLabel: string;
  };
  languages: Record<Locale, string>;
  home: {
    role: string;
    imageAlt: string;
    bio: string;
    aboutButton: string;
    resumeButton: string;
    resumeHref: string;
    footer: string;
  };
  about: {
    heading: string;
    body: string;
    telegram: string;
    backHome: string;
  };
  projects: {
    heading: string;
    back: string;
    techLabel: string;
    live: string;
    github: string;
    items: Array<{
      slug: string;
      title: string;
      description: string;
      details: string;
      imageAlt: string;
      liveUrl: string;
      githubUrl: string;
      imageSrc: string;
      imagePosition?: string;
      priority?: boolean;
      techStack: string[];
    }>;
  };
};

const sharedProjects = {
  prohome: {
    slug: "prohome",
    title: "ProHome",
    imageSrc: "/img/optimized/prohome-960.webp",
    liveUrl: "https://prohome.uz/",
    githubUrl: "https://github.com/zamonagency/prohome-your-trusted-hub",
    imagePosition: "center top",
    priority: true,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"]
  },
  jahonbozori: {
    slug: "jahon-bozori",
    title: "Jahon bozori",
    imageSrc: "/img/optimized/jahonbozori-960.webp",
    liveUrl: "https://www.jahonbozori.uz/",
    githubUrl: "https://github.com/rahimjonov-j/Hengtai-savdo",
    imagePosition: "center top",
    priority: true,
    techStack: ["Tailwind CSS", "React JS"]
  },
  kotiba: {
    slug: "kotiba-ai",
    title: "Kotiba Ai",
    imageSrc: "/img/optimized/kotiba-960.webp",
    liveUrl: "https://e-kotiba.vercel.app/",
    githubUrl: "https://github.com/rahimjonov-j/e-Kotiba",
    techStack: ["React JS", "Tailwind CSS", "Vite"]
  },
  girgiton: {
    slug: "girgiton-ai",
    title: "Girgiton Ai",
    imageSrc: "/img/optimized/girgiton-960.webp",
    liveUrl: "https://girgiton-ai.vercel.app/",
    githubUrl: "https://github.com/rahimjonov-j/Girgiton-ui",
    techStack: ["React JS", "Vite", "Tailwind CSS", "Lucide"]
  },
  moshn: {
    slug: "moshn",
    title: "Moshn",
    imageSrc: "/img/optimized/moshn-960.webp",
    liveUrl: "https://www.moshn.uz/",
    githubUrl: "https://github.com/rahimjonov-j/temirxotinhackathon",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"]
  },
  teacherAssistant: {
    slug: "teacher-assistant",
    title: "Teacher Assistant",
    imageSrc: "/img/optimized/teacher-assistant-960.webp",
    liveUrl: "https://teacher-assistantt.vercel.app/",
    githubUrl: "https://github.com/rahimjonov-j/Teacher-assistant",
    techStack: ["React 19", "TypeScript", "Tailwind CSS", "Node.js", "Express"]
  }
};

const dictionaries: Record<Locale, Dictionary> = {
  uz: {
    metadata: {
      homeTitle: "Javohir Rahimjonov's blog",
      aboutTitle: "Axiycoder haqida",
      projectsTitle: "Projects",
      description:
        "Mahsulotni ishlatishni osonlashtiradigan tez va puxta web interfeyslar yarataman."
    },
    navigation: {
      projects: "Projects",
      languageLabel: "Til",
      homeAriaLabel: "Bosh sahifa"
    },
    languages: {
      uz: "UZ",
      en: "EN"
    },
    home: {
      role: "Frontend Dasturchisi",
      imageAlt: "Javohir Rahimjonov rasmi",
      bio:
        "Mahsulotni ishlatishni osonlashtiradigan tez va puxta web interfeyslar yarataman.",
      aboutButton: "Men haqimda",
      resumeButton: "Resume",
      resumeHref: "/JavohirbekRahimjonovUz.pdf",
      footer: "Javohirdev.uz"
    },
    about: {
      heading: "Men haqimda qisqacha",
      body:
        "Salom, mening ismim Javohir. Men frontend dasturchisiman. O'zim haqimda aytadigan bo'lsam, men ko'plab narsalarga qiziquvchan va xatolar qilishdan qo'rqmaydigan insonman. Agar siz ham dasturlashga qiziqsangiz yoki dasturchi bo'lsangiz, men bilan fikr almashishingiz yoki shunchaki samimiy suhbat qurishingiz mumkin.",
      telegram: "Telegram",
      backHome: "Bosh sahifaga qaytish"
    },
    projects: {
      heading: "Loyihalar",
      back: "Orqaga",
      techLabel: "Texnologiyalar",
      live: "Live",
      github: "GitHub",
      items: [
        {
          ...sharedProjects.prohome,
          description:
            "Ko'chmas mulk bozori uchun qulay va zamonaviy veb-platforma.",
          details:
            "ProHome loyihasi ko'chmas mulk bozorida xonadon, uy va tijorat maydonlarini qidirib topishni osonlashtirish maqsadida ishlab chiqilgan. Toza interfeys, tez qidiruv va qulay filtrlash tizimi orqali foydalanuvchilar o'zlariga mos ob'ektni minimal vaqt ichida topadi.",
          imageAlt: "ProHome loyiha rasmi"
        },
        {
          ...sharedProjects.jahonbozori,
          description:
            "Farg'onadagi yirik savdo markazi uchun minimal va qulay sotuv platformasi.",
          details:
            "Jahon bozori loyihasida savdo markazi mahsulot va xizmatlarini internetda sodda, tez va tushunarli ko'rsatish maqsad qilingan. Interfeys minimal uslubda qurilgan, asosiy e'tibor foydalanuvchini kerakli bo'limga tez olib borish, mobil qurilmalarda qulay ko'rinish va sotuv jarayonini ortiqcha murakkabliksiz tashkil qilishga qaratilgan.",
          imageAlt: "Jahonbozori loyiha rasmi"
        },
        {
          ...sharedProjects.kotiba,
          description:
            "Sizning online yordamchingiz, eslatmalar va uchrashuvlarni belgilab, eslatib turuvchi aqlli yordamchi.",
          details:
            "Kotiba AI foydalanuvchining kundalik ishlarini tartiblashga yordam beradigan yordamchi sifatida ishlab chiqilgan. Loyiha eslatmalar, uchrashuvlar va vazifalarni qulay boshqarishga urg'u beradi. Frontend qismida toza struktura, tez yuklanish va foydalanuvchi ko'p o'ylamasdan harakat qila oladigan oqim yaratishga e'tibor berilgan.",
          imageAlt: "Kotiba loyiha rasmi"
        },
        {
          ...sharedProjects.girgiton,
          description:
            "Ofitsiantlar xizmat tezligini sezilarli darajada oshirishga yordam bergan loyiha.",
          details:
            "Girgiton AI restoran va xizmat ko'rsatish jarayonlarida tezlikni oshirishga qaratilgan loyiha. Interfeys ofitsiantlar uchun buyurtma va xizmat jarayonini soddalashtirish, vaqtni tejash va xatolarni kamaytirish g'oyasi atrofida qurilgan. Dizaynda tez anglash, yirik bosiladigan elementlar va real ish jarayoniga mos foydalanish qulayligi muhim bo'lgan.",
          imageAlt: "Girgiton AI loyiha rasmi"
        },
        {
          ...sharedProjects.moshn,
          description:
            "O'zbekiston bo'ylab mashina egalari va ustalar uchun VIN-asosida servis tarixini yurituvchi platforma.",
          details:
            "Moshn — avtomobillar servis tarixini VIN raqami orqali yuritish va kuzatish uchun mo'ljallangan platforma. Mashina egasi va usta o'rtasida shaffof aloqa o'rnatib, har bir texnik xizmatni hujjatlashtirishga yordam beradi. Loyiha O'zbekistondagi avtomobil xizmat ko'rsatish sohasini raqamlashtirish maqsadida hackathonda ishlab chiqilgan.",
          imageAlt: "Moshn loyiha rasmi"
        },
        {
          ...sharedProjects.teacherAssistant,
          description:
            "O'qituvchilar uchun AI yordamchisi — dars rejalari, testlar va o'quv materiallarini sun'iy intellekt yordamida tez yaratish platformasi.",
          details:
            "Teacher Assistant — o'qituvchilarning kundalik ish yukini kamaytirishga qaratilgan AI-platforma. Foydalanuvchi mavzu va sinf darajasini ko'rsatsa, tizim dars rejasi, topshiriqlar va testlarni avtomatik tayyorlaydi. React 19 va Node.js/Express asosida qurilgan, Tailwind CSS orqali qulay va toza interfeys yaratilgan.",
          imageAlt: "Teacher Assistant loyiha rasmi"
        }
      ]
    }
  },
  en: {
    metadata: {
      homeTitle: "Javohir Rahimjonov's blog",
      aboutTitle: "About Axiycoder",
      projectsTitle: "Projects",
      description:
        "I build fast, polished web interfaces that make products easier to use."
    },
    navigation: {
      projects: "Projects",
      languageLabel: "Language",
      homeAriaLabel: "Home page"
    },
    languages: {
      uz: "UZ",
      en: "EN"
    },
    home: {
      role: "Frontend Developer",
      imageAlt: "Photo of Javohir Rahimjonov",
      bio:
        "I build fast, polished web interfaces that make products easier to use.",
      aboutButton: "About Me",
      resumeButton: "Resume",
      resumeHref: "/JavohirbekRahimjonovEn.pdf",
      footer: "Javohirdev.uz"
    },
    about: {
      heading: "A brief introduction about me",
      body:
        "Hello, my name is Javohir. I am a frontend developer. If I were to describe myself, I would say that I am a curious person who is not afraid of making mistakes. If you are also interested in programming or already work as a developer, we can exchange ideas or simply have a friendly conversation.",
      telegram: "Telegram",
      backHome: "Back to Home"
    },
    projects: {
      heading: "Projects",
      back: "Back",
      techLabel: "Technologies",
      live: "Live",
      github: "GitHub",
      items: [
        {
          ...sharedProjects.prohome,
          description:
            "A modern real estate platform for browsing and discovering properties.",
          details:
            "ProHome was built to simplify property discovery in the real estate market. With a clean interface, fast search, and convenient filtering, users can find the right property with minimal effort.",
          imageAlt: "ProHome project image"
        },
        {
          ...sharedProjects.jahonbozori,
          description:
            "A minimal and user-friendly sales platform for a major shopping center in Fergana.",
          details:
            "Jahon bozori was built to present a shopping center's products and services online in a simple, fast, and clear way. The interface keeps the experience minimal while helping visitors reach the right section quickly, browse comfortably on mobile, and move through the sales flow without unnecessary complexity.",
          imageAlt: "Jahon bozori project image"
        },
        {
          ...sharedProjects.kotiba,
          description:
            "Your online assistant: a smart helper that keeps notes and reminds you about meetings.",
          details:
            "Kotiba AI is designed as a practical assistant for organizing daily work. It focuses on managing notes, meetings, and reminders through a clean and understandable interface. The frontend prioritizes structure, fast loading, and a flow that lets users complete tasks without overthinking.",
          imageAlt: "Kotiba project image"
        },
        {
          ...sharedProjects.girgiton,
          description:
            "A project that helped significantly increase the service speed of waiters.",
          details:
            "Girgiton AI focuses on improving speed in restaurant and service workflows. The interface is shaped around helping waiters simplify orders and service steps, save time, and reduce mistakes. The design emphasizes quick understanding, large actionable controls, and usability that fits real operational work.",
          imageAlt: "Girgiton AI project image"
        },
        {
          ...sharedProjects.moshn,
          description:
            "A platform for car owners and mechanics across Uzbekistan to track vehicle service history by VIN.",
          details:
            "Moshn is a platform designed to document and track vehicle service history using VIN numbers. It establishes transparent communication between car owners and mechanics, with each service visit fully recorded. The project was built during a hackathon with the goal of digitizing the auto-service industry in Uzbekistan.",
          imageAlt: "Moshn project image"
        },
        {
          ...sharedProjects.teacherAssistant,
          description:
            "An AI assistant for teachers — a platform to quickly generate lesson plans, assignments, and educational materials with the help of artificial intelligence.",
          details:
            "Teacher Assistant is an AI-powered platform built to reduce the daily workload of teachers. The user provides a topic and grade level, and the system automatically generates lesson plans, assignments, and tests. Built with React 19 and Node.js/Express on the backend, styled with Tailwind CSS for a clean and accessible interface.",
          imageAlt: "Teacher Assistant project image"
        }
      ]
    }
  }
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
