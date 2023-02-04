class Math {
    constructor() {
        this.operations = ['addition','substraction','multiplication','division'];
    }
    static addition = (a, b) => {
        return new Promise((res, rej) => {
            if(!!!a || !!!b ) rej(`Arguments can't be null`);
            return (a+b)>0 
                ? res(a+b)
                : rej(`The addition can't be negative`); 
        })
    }

    static substraction = (a,b) => {
        return new Promise((res, rej) => {
            if(!!!a || !!!b ) rej(`Arguments can't be null`);
            return (a-b)>0 
                ? res(a-b)
                : rej(`The substraction can't be negative`); 
        })
    }

    static multiplication = (a,b) => {
        return new Promise((res, rej) => {
            if(!!!a || !!!b ) rej(`Arguments can't be null`);
            return (a*b)>0 
                ? res(a*b)
                : rej(`The multiplication can't be negative`); 
        })
    }

    static division = (a,b) => {
        return new Promise((res, rej) => {
            if(!!!a || !!!b ) rej(`Arguments can't be null`);
            return res(a/b)
        })
    }

    static asyncFunction = async (operation) => {
        try {
            console.log(await operation(3,2));
        }
        catch (err)  {
            console.log(err);
        }
    }
}


Math.asyncFunction(Math.addition);
console.log('Async console.log');