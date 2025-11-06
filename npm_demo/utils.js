const getName = () => {
  return "Tom Maurer";
};

const square = (num) => {
  return num * num;
};

export const sayHello = (name) => {
  console.log(`Hello ${name}`);
};

const sayGoodbye = (name) => {
  console.log(`Goodbye ${name}`);
};

export default sayGoodbye;
export { getName, square };
