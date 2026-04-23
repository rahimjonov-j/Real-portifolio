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
    liveUrl: "#",
    githubUrl: "https://github.com/rahimjonov-j/Girgiton-ui",
    techStack: ["React JS", "Vite", "Tailwind CSS", "Lucide"]
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
      heading: "Projects",
      back: "Orqaga",
      techLabel: "Texnologiyalar",
      live: "Live",
      github: "GitHub",
      items: [
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
        }
      ]
    }
  }
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
