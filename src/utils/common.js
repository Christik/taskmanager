const getRandomInteger = (from, to) => {
  if (from > to) {
    throw new Error('Диапазон возможных значений должен начинаться с меньшего числа и заканчиваться большим');
  }

  return Math.floor(Math.random() * (to - from + 1) + from);
};

const isEscKeydown = (evt) => (evt.key === 'Escape' || evt.key === 'Esc');

export { getRandomInteger, isEscKeydown };
