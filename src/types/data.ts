export type TSampleBanners = {
  id: number;
  title: string;
  description: string;
};

export type TSearchBanner = {
  id: number;
  title: string;
  description: string;
  image: string;
  image_alt: string
};

export type TJournalCard = {
  id: number;
  type: "special_project" | "experience";
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export type TNews = {
  id: number;
  createdAt: string;
  image: string;
  image_alt: string;
  tag: string | null;
  title: string;
};

export type TSpecialProject = {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  image: string;
};

export type TMaterials = {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  image_alt: string;
};
