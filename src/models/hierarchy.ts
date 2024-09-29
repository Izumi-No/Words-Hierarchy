export type ItemType = string | string[];

export interface Hierarchy {
  [key: string]: ItemType | Hierarchy; // Pode ser um array de strings ou uma sub-hierarquia
}
