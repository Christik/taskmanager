import { getRandomInteger } from '../utils.js';
import dayjs from 'dayjs';

const generateDescription = () => {
  const descriptions = [
    'Стратификация прочно стабилизирует креативный опрос',
    'Традиционный канал, согласно традиционным представлениям, оправдывает ускоряющийся стресс',
    'Тем не менее, селекция бренда интегрирует рыночный конформизм, оптимизируя бюджеты',
    'Воздействие на потребителя конструктивно',
    'Реферат по маркетингу и психологии',
    'Позиционирование на рынке не наблюдаемо',
    'Как было показано выше, репрезентативная система создает сегмент рынка',
    'Закон, в представлении Морено, спонтанно отталкивает автоматизм',
  ];
  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDate = () => {
  const isDateExist = Boolean(getRandomInteger(0, 1));

  if (!isDateExist) {
    return null;
  }

  const maxDayGap = 7;
  const dayGap = getRandomInteger(-maxDayGap, maxDayGap);

  return dayjs().add(dayGap, 'day').toDate();
};

const generateRepeatingDays = () => ({
  mo: false,
  tu: false,
  we: Boolean(getRandomInteger(0, 1)),
  th: false,
  fr: Boolean(getRandomInteger(0, 1)),
  sa: false,
  su: false,
});

const nonRepeatingDays = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

const generateTask = () => {
  const dueDate = generateDate();

  return {
    color: 'yellow',
    description: generateDescription(),
    dueDate,
    isArchived: false,
    isFavorite: false,
    repeatingDays: (dueDate === null) ? nonRepeatingDays : generateRepeatingDays(),
  };
};

export { generateTask };
