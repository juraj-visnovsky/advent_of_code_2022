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

  get directorySizes(): number[] {
    const childrenDirectorySizes = this.childrenDirectories
      .map((childDirectory) => childDirectory.directorySizes)
      .flat();

    return [this.totalSize, ...childrenDirectorySizes];
  }

  get totalSize() {
    const filesSize = Object.values(this.files).reduce((sum, fileSize) => sum + fileSize, 0);
    const childrenTotalSize: number = this.childrenDirectories.reduce((sum, directory) => sum + directory.totalSize, 0);

    return filesSize + childrenTotalSize;
  }

  private findChildDirectory(directoryName: string): Directory | undefined {
    return this.childrenDirectories.find((childDirectory) => childDirectory.name === directoryName);
  }
}

export const getSizeOfDirectoryToDelete = (input: string) => {
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

  const fileSystemSize = 70_000_000;
  const sizeNeededForUpdate = 30_000_000;
  const sizeToFreeUp = sizeNeededForUpdate - (fileSystemSize - fileSystemRoot.totalSize);
  const directorySizes = fileSystemRoot.directorySizes;
  const sortedDirectorySizes = directorySizes.sort((a, b) => a - b);
  const sizeOfDirectoryToDelete = sortedDirectorySizes.find((directorySize) => directorySize > sizeToFreeUp);

  return sizeOfDirectoryToDelete;
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
