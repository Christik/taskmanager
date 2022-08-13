import { getRandomInteger } from '../utils.js';

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

const generateTask = () => ({
  color: 'yellow',
  description: generateDescription(),
  dueDate: null,
  isArchived: false,
  isFavorite: false,
  repeatingDays: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false,
  }
});

export { generateTask };
