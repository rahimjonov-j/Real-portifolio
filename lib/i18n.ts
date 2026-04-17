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
      title: string;
      description: string;
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
    title: "Jahon bozori",
    imageSrc: "/img/optimized/jahonbozori-960.webp",
    liveUrl: "https://www.jahonbozori.uz/",
    githubUrl: "https://github.com/rahimjonov-j/Hengtai-savdo",
    imagePosition: "center top",
    priority: true,
    techStack: ["Tailwind CSS", "React JS"]
  },
  kotiba: {
    title: "Kotiba Ai",
    imageSrc: "/img/optimized/kotiba-960.webp",
    liveUrl: "https://e-kotiba.vercel.app/",
    githubUrl: "https://github.com/rahimjonov-j/e-Kotiba",
    techStack: ["React JS", "Tailwind CSS", "Vite"]
  },
  girgiton: {
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
      description: "Bu sayt men haqimda qisqacha tasvirlab beradi."
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
      bio: "Bu sayt men haqimda qisqacha tasvirlab beradi.",
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
          imageAlt: "Jahonbozori loyiha rasmi"
        },
        {
          ...sharedProjects.kotiba,
          description:
            "Sizning online yordamchingiz, eslatmalar va uchrashuvlarni belgilab, eslatib turuvchi aqlli yordamchi.",
          imageAlt: "Kotiba loyiha rasmi"
        },
        {
          ...sharedProjects.girgiton,
          description:
            "Ofitsiantlar xizmat tezligini sezilarli darajada oshirishga yordam bergan loyiha.",
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
      description: "This site gives a brief overview of me."
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
      bio: "This site gives a brief overview of me.",
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
          imageAlt: "Jahon bozori project image"
        },
        {
          ...sharedProjects.kotiba,
          description:
            "Your online assistant: a smart helper that keeps notes and reminds you about meetings.",
          imageAlt: "Kotiba project image"
        },
        {
          ...sharedProjects.girgiton,
          description:
            "A project that helped significantly increase the service speed of waiters.",
          imageAlt: "Girgiton AI project image"
        }
      ]
    }
  }
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
