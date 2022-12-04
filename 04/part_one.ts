class Assignment {
  startSectionId: number;
  endSectionId: number;

  constructor(assignmentSections: string) {
    const [startSectionIdString, endSectionIDString] = assignmentSections.split("-");
    this.startSectionId = Number(startSectionIdString);
    this.endSectionId = Number(endSectionIDString);
  }

  isFullyContaining(otherAssignment: Assignment) {
    return this.startSectionId <= otherAssignment.startSectionId && this.endSectionId >= otherAssignment.endSectionId;
  }
}

export const countFullyContainedSections = (input: string): number => {
  let fullyContainedSectionsCount = 0;
  const pairs = input.split(/\r?\n/);

  pairs.forEach((pairAssigments) => {
    const [firstElfSections, secondElfSections] = pairAssigments.split(",");
    const firstElfAssignment = new Assignment(firstElfSections);
    const secondElfAssignment = new Assignment(secondElfSections);

    if (
      firstElfAssignment.isFullyContaining(secondElfAssignment) ||
      secondElfAssignment.isFullyContaining(firstElfAssignment)
    ) {
      fullyContainedSectionsCount += 1;
    }
  });

  return fullyContainedSectionsCount;
};
