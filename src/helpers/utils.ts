export default class Utils {
  static zeroFill = (number, width) => {
    const zeroFields = width - number.toString().length;
    if (width > 0) {
      return (
        new Array(zeroFields + (/\./.test(number) ? 2 : 1)).join('0') + number
      );
    }
    return String(number); // always return a string
  };
}
