
export interface ICategory{
  id: number;
  title: string;
}

export interface IPost {
  id: number;
  title: string;
  status: "published" | "draft" | "rejected";
  category: { id: number };
  createdAt: string;
}

export interface ITags{
  id: number;
  title: string;
}

export interface ILoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export interface ILanguage {
  id: number;
  title: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  avatar: { name: string, url: string };
}