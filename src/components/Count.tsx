import { useState } from "react";

interface Props {
    name: string;
    age: number;
}

export default function Count({ name, age }: Props) {
    const [count, setCount] = useState<number>(0);
    return (
        <div>
            <h1>
                Hi {name}. You are now {age} years old.
            </h1>
            <h5>Count is: {count}</h5>
            <button onClick={() => setCount((preState) => preState + 1)}>
                add +
            </button>
            <button onClick={() => setCount((preState) => preState - 1)}>
                remove +
            </button>
        </div>
    );
}
