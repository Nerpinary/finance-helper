 export function getCountString(number, variants) {
    const tens = Math.floor(number / 10) % 10;
    const units = number % 10;
    let variantIndex = 2;

    if (tens !== 1) {
        if (units === 1) {
            variantIndex = 0;
        } else if ((units >= 2) && (units <= 4)) {
            variantIndex = 1;
        }
    }

    return number + ' ' + variants[variantIndex];
}