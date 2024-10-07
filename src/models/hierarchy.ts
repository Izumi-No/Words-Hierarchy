export type ItemType = string | string[];

export interface Hierarchy {
  [key: string]: ItemType | Hierarchy; 
}
