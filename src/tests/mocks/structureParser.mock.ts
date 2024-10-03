import type { IStructureParserService } from "@/interfaces/IStructureParserService.ts";

export class MockStructureParserService implements IStructureParserService {
  getDepthValues(depth: number) {
    switch (depth) {
      case 0:
        return [
          {
            value: "root",
            children: [
              {
                value: "child1",
                children: [
                  {
                    value: "1grandchild1",
                    children: [],
                  },
                  {
                    value: "1grandchild2",
                    children: [],
                  },
                  {
                    value: "1grandchild3",
                    children: [],
                  },
                ],
              },
              {
                value: "child2",
                children: [
                  {
                    value: "2grandchild1",
                    children: [],
                  },
                  {
                    value: "2grandchild2",
                    children: [],
                  },
                  {
                    value: "2grandchild3",
                    children: [],
                  },
                ],
              },
            ],
          },
        ];

      case 1:
        return [
          {
            value: "child1",
            children: [
              {
                value: "1grandchild1",
                children: [],
              },
              {
                value: "1grandchild2",
                children: [],
              },
              {
                value: "1grandchild3",
                children: [],
              },
            ],
          },
          {
            value: "child2",
            children: [
              {
                value: "2grandchild1",
                children: [],
              },
              {
                value: "2grandchild2",
                children: [],
              },
              {
                value: "2grandchild3",
                children: [],
              },
            ],
          },
        ];

      case 2:
        return [
          {
            value: "1grandchild1",
            children: [],
          },
          {
            value: "1grandchild2",
            children: [],
          },
          {
            value: "1grandchild3",
            children: [],
          },
          {
            value: "2grandchild1",
            children: [],
          },
          {
            value: "2grandchild2",
            children: [],
          },
          {
            value: "2grandchild3",
            children: [],
          },
        ];

      default:
        return [];
    }
  }
}
