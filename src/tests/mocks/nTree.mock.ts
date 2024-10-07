import type { ITreeNode } from "@/utils/nTree.ts";

export const TreeMock: ITreeNode<string> = {
  value: "Animais",
  children: [
    {
      value: "Mamíferos",
      children: [
        {
          value: "Carnívoros",
          children: [
            {
              value: "Felinos",
              children: [
                {
                  value: "Leões",
                  children: [],
                },
                {
                  value: "Tigres",
                  children: [],
                },
                {
                  value: "Jaguars",
                  children: [],
                },
                {
                  value: "Leopardos",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          value: "Herbívoros",
          children: [
            {
              value: "Equídeos",
              children: [
                {
                  value: "Cavalos",
                  children: [],
                },
                {
                  value: "Zebras",
                  children: [],
                },
                {
                  value: "Asnos",
                  children: [],
                },
              ],
            },
            {
              value: "Bovídeos",
              children: [
                {
                  value: "Bois",
                  children: [],
                },
                {
                  value: "Búfalos",
                  children: [],
                },
                {
                  value: "Antílopes",
                  children: [],
                },
                {
                  value: "Cabras",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          value: "Primatas",
          children: [
            {
              value: "Gorilas",
              children: [],
            },
            {
              value: "Chimpanzés",
              children: [],
            },
            {
              value: "Orangotangos",
              children: [],
            },
          ],
        },
      ],
    },
    {
      value: "Aves",
      children: [
        {
          value: "Rapinas",
          children: [
            {
              value: "Águias",
              children: [],
            },
            {
              value: "Falcões",
              children: [],
            },
            {
              value: "Corujas",
              children: [],
            },
            {
              value: "Milhafres",
              children: [],
            },
          ],
        },
        {
          value: "Pássaros",
          children: [
            {
              value: "Canários",
              children: [],
            },
            {
              value: "Papagaios",
              children: [],
            },
            {
              value: "Pardais",
              children: [],
            },
            {
              value: "Rouxinóis",
              children: [],
            },
          ],
        },
      ],
    },
  ],
};
