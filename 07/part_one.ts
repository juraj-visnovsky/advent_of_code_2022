class Directory {
  name: string;
  parentDirectory: Directory | null;
  private childrenDirectories: Directory[] = [];
  private files: { [k: string]: number } = {};

  constructor(name: string, parentDirectory: Directory | null) {
    this.name = name;
    this.parentDirectory = parentDirectory;
  }

  findOrCreateChildDirectory(directoryName: string): Directory {
    let childDirectory = this.findChildDirectory(directoryName);

    if (childDirectory) return childDirectory;

    childDirectory = new Directory(directoryName, this);
    this.childrenDirectories.push(childDirectory);

    return childDirectory;
  }

  addFile(fileName: string, fileSize: number) {
    this.files[fileName] = fileSize;
  }

  get totalSize() {
    const filesSize = Object.values(this.files).reduce((sum, fileSize) => sum + fileSize, 0);
    const childrenTotalSize: number = this.childrenDirectories.reduce((sum, directory) => sum + directory.totalSize, 0);

    return filesSize + childrenTotalSize;
  }

  sumDirectorySizes(ignoreSizesAboveThreshold: number) {
    let totalSize = 0;
    const currentDirectorySize = this.totalSize;

    if (currentDirectorySize < ignoreSizesAboveThreshold) {
      totalSize = currentDirectorySize;
    }

    this.childrenDirectories.forEach((childDirectory) => {
      totalSize += childDirectory.sumDirectorySizes(ignoreSizesAboveThreshold);
    });

    return totalSize;
  }

  private findChildDirectory(directoryName: string): Directory | undefined {
    return this.childrenDirectories.find((childDirectory) => childDirectory.name === directoryName);
  }
}

export const totalDirectorySize = (input: string) => {
  const terminalOutputs = input.split(/\r?\n/);
  const fileSystemRoot = new Directory("/", null);
  let currentDirectory = fileSystemRoot;
  let currentCommand = "";

  terminalOutputs.forEach((output) => {
    if (isCommand(output, "cd")) {
      currentCommand = "cd";
      currentDirectory = processChangeDirectoryCommand(output, currentDirectory);
    } else if (isCommand(output, "ls")) {
      currentCommand = "ls";
    } else if (currentCommand === "ls") {
      processListItem(output, currentDirectory);
    }
  });

  return fileSystemRoot.sumDirectorySizes(100_000);
};

const isCommand = (command: string, commandName: string) => {
  return command.startsWith(`$ ${commandName}`);
};

const processChangeDirectoryCommand = (command: string, currentDirectory: Directory): Directory => {
  const targetDirectory = command.split(" ").pop();

  if (targetDirectory === undefined) return currentDirectory;

  if (targetDirectory === ".." && currentDirectory.parentDirectory) {
    return currentDirectory.parentDirectory;
  }

  return currentDirectory.findOrCreateChildDirectory(targetDirectory);
};

const processListItem = (listItem: string, currentDirectory: Directory) => {
  if (listItem.startsWith("dir")) {
    const childDirectoryName = listItem.split(" ").pop();
    childDirectoryName && currentDirectory.findOrCreateChildDirectory(childDirectoryName);
  } else if (/^\d+/.test(listItem)) {
    const [fileSizeString, fileName] = listItem.split(" ");
    currentDirectory.addFile(fileName, Number(fileSizeString));
  }
};
