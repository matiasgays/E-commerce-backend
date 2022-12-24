const randomNumbers = () => {
    return Math.round(Math.random() * (20 - 1) + 1);
}

const numbers = {};
for (let i = 0; i < 20; i++ ) {
    const num = randomNumbers();
    (numbers.hasOwnProperty(num)) 
        ?   numbers[num]++
        :   numbers[num] = 1 
}
console.log(numbers);