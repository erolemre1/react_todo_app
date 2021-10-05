import { createContext, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [name, setName] = useState([])

    const values = {
        
        name,
        setName,
    }

    return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>
}
export default TodoContext;