export type Project = {
  _id: string;
  name: string;
  description: string;
  github_link: string;
  tools: string[];
  imageURL: string;
  live_link: string | null;
};
