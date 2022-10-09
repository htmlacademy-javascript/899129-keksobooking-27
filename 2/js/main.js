function getRandomIntInclusive(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    return NaN;
  }

  if (min < 0 || max < 0) {
    return NaN;
  }

  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPositiveFloat (min, max, digits) {
  if (typeof min !== 'number' || typeof max !== 'number' || typeof digits !== 'number') {
    return NaN;
  }

  if (min < 0 || max < 0 || digits < 0) {
    return NaN;
  }

  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  const result = Math.random() * (max - min + 1) + min;
  return result.toFixed(digits);
}

getRandomIntInclusive(2, 5);
getRandomPositiveFloat(90, 78, 5);
