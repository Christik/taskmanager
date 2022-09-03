import { getRandomInteger } from '../utils/common.js';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { COLORS } from '../const.js';

const generateColor = (colors) => {
  const randomIndex = getRandomInteger(0, colors.length - 1);

  return colors[randomIndex];
};

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
    id: nanoid(),
    color: generateColor(COLORS),
    description: generateDescription(),
    dueDate,
    isArchived: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    repeatingDays: (dueDate === null) ? generateRepeatingDays() : nonRepeatingDays,
  };
};

export { generateTask };
