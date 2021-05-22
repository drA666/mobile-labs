const getRandomArray = (maxValue: number, size: number) =>
  new Array(size).fill(0).map(() => Math.floor(Math.random() * maxValue));

export class Student {
  constructor(public name: string, public group: string) {}
}

export const studentsParser = (studentsStr: string): Student[] => {
  const students = studentsStr.split('; ').map((studentStr) => {
    const [name, group] = studentStr.split(' - ');
    return new Student(name, group);
  });
  return students;
};

export const formGroups = (students: Student[]) => {
  const groups = new Map<string, string[]>();
  students.map((student) => {
    const {name, group: groupName} = student;
    const group = groups.get(groupName) ?? [];
    group.push(name);
    groups.set(groupName, group);
  });
  return groups;
};

export const putPoints = (maxPoint: number, groups: Map<string, string[]>) => {
  const groupsScore = new Map<string, {[key: string]: number[]}>();
  groups.forEach((students, group) => {
    const groupSum = Object.assign(
      {},
      ...students.map((student) => {
        const points = getRandomArray(maxPoint, maxPoint);
        return {[student]: points};
      }),
    );
    groupsScore.set(group, groupSum);
  });
  return groupsScore;
};

const sumStudentsPoint = (
  groupsScore: Map<string, {[key: string]: number[]}>,
) => {
  const studentsScores = new Map<string, {[key: string]: number}>();
  groupsScore.forEach((students, group) => {
    const studentsSum: {[key: string]: number} = {};
    Object.entries(students).forEach(([student, points]) => {
      const sumPoints = points.reduce((acc, point) => (acc += point), 0);
      studentsSum[student] = sumPoints;
    });
    studentsScores.set(group, studentsSum);
  });
  return studentsScores;
};

export const averageGroupScore = (
  studentsScores: Map<string, {[key: string]: number}>,
) => {
  const groupsScores = new Map<string, number>();
  studentsScores.forEach((students, group) => {
    const points = Object.values(students);
    const average =
      points.reduce((acc, point) => (acc += point), 0) / points.length;
    groupsScores.set(group, average);
  });
  return groupsScores;
};

export const filterStudentsByPoint = (
  minPoint: number,
  studentsScores: Map<string, {[key: string]: number}>,
) => {
  const groups = new Map<string, string[]>();
  studentsScores.forEach((students, group) => {
    const trueStudents: string[] = [];
    Object.entries(students).forEach(([student, point]) => {
      if (point >= minPoint) {
        trueStudents.push(student);
      }
    });
    groups.set(group, trueStudents);
  });
  return groups;
};

//Test

const studentsStr =
  'Дмитренко Олександр - ІП-84; Матвійчук Андрій - ІВ-83; Лесик Сергій - ІО-82; Ткаченко Ярослав - ІВ-83; Аверкова Анастасія - ІО-83; Соловйов Даніїл - ІО-83; Рахуба Вероніка - ІО-81; Кочерук Давид - ІВ-83; Лихацька Юлія - ІВ-82; Головенець Руслан - ІВ-83; Ющенко Андрій - ІО-82; Мінченко Володимир - ІП-83; Мартинюк Назар - ІО-82; Базова Лідія - ІВ-81; Снігурець Олег - ІВ-81; Роман Олександр - ІО-82; Дудка Максим - ІО-81; Кулініч Віталій - ІВ-81; Жуков Михайло - ІП-83; Грабко Михайло - ІВ-81; Іванов Володимир - ІО-81; Востриков Нікіта - ІО-82; Бондаренко Максим - ІВ-83; Скрипченко Володимир - ІВ-82; Кобук Назар - ІО-81; Дровнін Павло - ІВ-83; Тарасенко Юлія - ІО-82; Дрозд Світлана - ІВ-81; Фещенко Кирил - ІО-82; Крамар Віктор - ІО-83; Іванов Дмитро - ІВ-82';

//Parser
const students: Student[] = studentsParser(studentsStr);
console.dir(students);
//Task 1
const groups = formGroups(students);
console.dir(groups);
//Task 2
const groupsScore = putPoints(10, groups);
console.dir(groupsScore);
//Task 3
const sumPoints = sumStudentsPoint(groupsScore);
console.dir(sumPoints);
//Task 4
const averageGroupScores = averageGroupScore(sumPoints);
console.dir(averageGroupScores);
//Task 5
const filteredGroups = filterStudentsByPoint(60, sumPoints);
console.dir(filteredGroups);
