export interface ITreeNode<T> {
  value: T;
  children: ITreeNode<T>[];
}

export class TreeNode<T> implements ITreeNode<T> {
  value: T;
  children: TreeNode<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  addChild(child: TreeNode<T>) {
    this.children.push(child);
  }

  find(value: T): TreeNode<T> | undefined {
    if (this.value === value) {
      return this;
    }

    for (const child of this.children) {
      const found = child.find(value);

      if (found) {
        return found;
      }
    }
  }

  findParent(value: T): TreeNode<T> | undefined {
    if (this.value === value) {
      return this;
    }

    for (const child of this.children) {
      const found = child.findParent(value);

      if (found) {
        return found;
      }
    }
  }

  print(prefix = "") {
    console.log(prefix + this.value);

    for (const child of this.children) {
      child.print(`${prefix}  `);
    }
  }
}
