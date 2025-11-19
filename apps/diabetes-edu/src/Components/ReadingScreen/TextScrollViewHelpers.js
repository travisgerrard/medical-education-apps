export function getSection(readingArray, sectionId) {
  const index = readingArray.findIndex((x) => x.id === sectionId);
  return readingArray[index];
}

export function getSectionFromSlugs(readingArray, sectionSlug) {
  const index = readingArray.findIndex((x) => x.slug === sectionSlug);
  return readingArray[index];
}

export function getSubsectionFromSlug(listOfSubSections, subSectionSlug) {
  const index = listOfSubSections.findIndex((x) => x.slug === subSectionSlug);
  return listOfSubSections[index];
}

export function getSubsection(listOfSubSections, subSectionId) {
  const index = listOfSubSections.findIndex((x) => x.id === subSectionId);
  return listOfSubSections[index];
}

export function getNextSubsectionTitle(listOfSubSections, subSectionId) {
  const index = listOfSubSections.findIndex((x) => x.id === subSectionId);

  if (index + 1 < listOfSubSections.length) {
    return listOfSubSections[index + 1].title;
  } else {
    return 'Close Section';
  }
}

export function getNextSubsectionSlug(listOfSubSections, subSectionId) {
  const index = listOfSubSections.findIndex((x) => x.id === subSectionId);

  if (index + 1 < listOfSubSections.length) {
    return listOfSubSections[index + 1].slug;
  } else {
    return 'Close Section';
  }
}

export function getNextSubsectionId(listOfSubSections, subSectionId) {
  const index = listOfSubSections.findIndex((x) => x.id === subSectionId);

  if (index + 1 < listOfSubSections.length) {
    return listOfSubSections[index + 1].id;
  } else {
    return 'Close Section';
  }
}

export function updateSubSectionsWith(
  listOfSubSections,
  newSubSection,
  subSectionId
) {
  const index = listOfSubSections.findIndex((x) => x.id === subSectionId);
  const updatedListOfSubSections = [
    ...listOfSubSections.slice(0, index),
    newSubSection,
    ...listOfSubSections.slice(index + 1),
  ];
  return updatedListOfSubSections;
}

export function updateSection(withUpdatedSubSection, readingArray, sectionId) {
  const index = readingArray.findIndex((x) => x.id === sectionId);
  const updatedSection = {
    ...getSection(readingArray, sectionId),
    sections: withUpdatedSubSection,
  };
  const updatedReadingArray = [
    ...readingArray.slice(0, index),
    updatedSection,
    ...readingArray.slice(index + 1),
  ];

  return updatedReadingArray;
}

export function nextSectionTitle(readingArray, sectionId, subSectionId) {
  const section = getSection(readingArray, sectionId);

  const subSections = section.sections;

  const nextSubSectionTitle = getNextSubsectionTitle(subSections, subSectionId);
  return nextSubSectionTitle;
}

export function nextSectionSlug(readingArray, sectionId, subSectionId) {
  const section = getSection(readingArray, sectionId);

  const subSections = section.sections;

  const nextSubSectionSlug = getNextSubsectionSlug(subSections, subSectionId);
  return nextSubSectionSlug;
}

export function nextSectionTitleId(readingArray, sectionId, subSectionId) {
  const section = getSection(readingArray, sectionId);
  const subSections = section.sections;

  const nextSubSectionId = getNextSubsectionId(subSections, subSectionId);

  return nextSubSectionId;
}

export function firstSubSection(readingArray, sectionId) {
  const section = getSection(readingArray, sectionId);
  const subSections = section.sections;
  const firstSubSection = subSections[0];
  return [section, firstSubSection];
}
