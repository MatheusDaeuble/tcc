function shuffleArray(array: Array<string>) {
  let i: number;
  for (i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const arrayAux = [];
    const temp = array[i];
    arrayAux[i] = array[j];
    arrayAux[j] = temp;
  }
  return array;
}

export function generatePassword(passwordLength = 8): string {
  const length = passwordLength < 8 ? 8 : passwordLength;

  const numberChars = '0123456789';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
  const specialChars = '@$!%*#?&';
  const allChars = numberChars + upperChars + lowerChars + specialChars;
  let randPasswordArray = Array(length);
  randPasswordArray[0] = numberChars;
  randPasswordArray[1] = upperChars;
  randPasswordArray[2] = lowerChars;
  randPasswordArray[3] = specialChars;
  randPasswordArray = randPasswordArray.fill(allChars, 4);

  return shuffleArray(
    randPasswordArray.map(function a(x) {
      return x[Math.floor(Math.random() * x.length)];
    })
  ).join('');
}
