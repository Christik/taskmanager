import dayjs from 'dayjs';

const getRandomInteger = (from, to) => {
  if (from > to) {
    throw new Error('Диапазон возможных значений должен начинаться с меньшего числа и заканчиваться большим');
  }

  return Math.floor(Math.random() * (to - from + 1) + from);
};

const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format('D MMMM');

const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

const isTaskRepeating = (repeats) => Object.values(repeats).some(Boolean);

const isEscKeydown = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export {
  getRandomInteger,
  humanizeTaskDueDate,
  isTaskExpired,
  isTaskRepeating,
  isEscKeydown,
};
