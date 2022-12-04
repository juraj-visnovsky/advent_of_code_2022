class Assignment {
  startSectionId: number;
  endSectionId: number;

  constructor(assignmentSections: string) {
    const [startSectionIdString, endSectionIDString] = assignmentSections.split("-");
    this.startSectionId = Number(startSectionIdString);
    this.endSectionId = Number(endSectionIDString);
  }

  isOverlapping(otherAssignment: Assignment) {
    return (
      (this.startSectionId >= otherAssignment.startSectionId && this.startSectionId <= otherAssignment.endSectionId) ||
      (this.startSectionId <= otherAssignment.startSectionId && this.endSectionId >= otherAssignment.startSectionId)
    );
  }
}

export const countOverlappingSections = (input: string): number => {
  let overlappingSectionsCount = 0;
  const pairs = input.split(/\r?\n/);

  pairs.forEach((pairAssigments) => {
    const [firstElfSections, secondElfSections] = pairAssigments.split(",");
    const firstElfAssignment = new Assignment(firstElfSections);
    const secondElfAssignment = new Assignment(secondElfSections);

    if (
      firstElfAssignment.isOverlapping(secondElfAssignment) ||
      secondElfAssignment.isOverlapping(firstElfAssignment)
    ) {
      overlappingSectionsCount += 1;
    }
  });

  return overlappingSectionsCount;
};
