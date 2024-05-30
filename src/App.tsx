import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { type IExpense } from "./types";

function App() {
  const [expenses, setExpenses] = useState<IExpense[]>(() => JSON.parse(localStorage.getItem('expenses') || '[]'));
  
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))

    const resetAll = () => setEditExpense('');
    window.addEventListener('click', resetAll)

    return () => {
      window.removeEventListener('click', resetAll)
    }
  }, [expenses]);
  
  const [editExpense, setEditExpense] = useState('')

  return (
    <main className="grid xl:grid-flow-col gap-[100px] max-w-[1366px] px-14 mx-auto justify-center items-center">
      <ExpenseForm setExpenses={setExpenses} />
      <div className="flex-1 mt-[5%] xl:mt-[30%] mb-[20%] max-w-[650px] mx-auto">
        <h2 className="text-center py-2 font-bold text-[18px] bg-emerald-500">Expense List</h2>
        <div className="pt-5">
          <ExpenseList 
            expenses={expenses} 
            setExpenses={setExpenses} 
            editExpense={editExpense}
            setEditExpense={setEditExpense}
          />
        </div>
      </div>
    </main> 
  )
}

export default App;
