import axios from "axios";
import { create } from "zustand";
export const useTaskStore = create((set) => ({
    tasks: [],
    setTasks: (tasks) => set({tasks}),

    createTask: async (newTask) => {
        if(!newTask.title || !newTask.content || !newTask.category || !newTask.priority || !newTask.dueDate ){
            return {success: false, message: "All fields are required!!"}
        }
        const res = await axios.post('/api/tasks/', {
            newTask
        })
        const data = await res.json()
        if(!res.ok || !data.success){
            return {success: false, message: "Failed to create Task"}
        }
        else{
            set((state) => ({tasks: [...state.tasks, data.data]}))
            return {
                success: true,
                message: "New Task created successfully"
            }
        }
    },
    

}) )
 