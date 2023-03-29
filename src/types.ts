export const TRENDING_TAGS = [
  "javascript",
  "python",
  "java",
  "c#",
  "php",
  "android",
  "html",
  "jquery",
  "c++",
  "css",
] as const;

export interface TagType {
  items: Tag[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export interface Tag {
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  count: number;
  name: string;
}

export interface Trending {
  items: Item[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}

export interface Item {
  tags: string[];
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  unique_question_id?: string;
  content_license?: string;
  link: string;
  title: string;
  accepted_answer_id?: number;
  last_edit_date?: number;
  bounty_amount?: number;
  bounty_closes_date?: number;
  closed_date?: number;
  closed_reason?: string;
  protected_date?: number;
}

export interface Owner {
  account_id: number;
  reputation: number;
  user_id: number;
  user_type: string;
  profile_image: string;
  display_name: string;
  link: string;
  accept_rate?: number;
}
