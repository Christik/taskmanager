import dayjs from 'dayjs';

const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');

const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

const isTaskRepeating = (repeats) => Object.values(repeats).some(Boolean);

export {
  humanizeTaskDueDate,
  isTaskExpired,
  isTaskRepeating,
};
