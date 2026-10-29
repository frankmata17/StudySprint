export type Assignment = {
  id: string;
  course: string;
  title: string;
  due: string;
  estimatedTime: string;
};

export const assignments: Assignment[] = [
  {
    id: '1',
    course: 'BIO 101',
    title: 'Biology Lab Report',
    due: 'Due tomorrow',
    estimatedTime: '50 min',
  },
  {
    id: '2',
    course: 'HIST 210',
    title: 'Read Chapter 6',
    due: 'Due Friday',
    estimatedTime: '25 min',
  },
  {
    id: '3',
    course: 'MATH 115',
    title: 'Homework 4',
    due: 'Due Saturday',
    estimatedTime: '50 min',
  },
];