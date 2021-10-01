import { createContext, useState } from "react";

const TodoContext = createContext();
const initialStateName = [
    { id: 0, names: "Google" ,links:"https://www.google.com/", vote:0},
  
];

export const TodoProvider = ({ children }) => {
    const [name, setName] = useState(initialStateName)

    const values = {
        
        name,
        setName,
    }

    return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>
}
export default TodoContext;