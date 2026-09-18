const byuiCourse = {
  code: 'WDD231',
  name: 'Web Frontend Development I',
  sections: [
    { sectionNum: 1, enrolled: 25, instructor: 'Dr. Richardson' },
    { sectionNum: 2, enrolled: 30, instructor: 'Dr. Richardson' },
    { sectionNum: 3, enrolled: 28, instructor: 'Dr. Richardson' }
  ],

  changeEnrollment(sectionNum, add = true) {
    const section = this.sections.find((item) => item.sectionNum === sectionNum);

    if (!section) {
      return;
    }

    section.enrolled += add ? 1 : -1;
  }
};

export default byuiCourse;
