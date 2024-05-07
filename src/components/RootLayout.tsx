import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { type IExpense } from "../types";

function RootLayout() {
  const [expenses, setExpenses] = useState<IExpense[]>(() => JSON.parse(localStorage.getItem('expenses')!) || []);
  
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
    <main className="flex flex-col md:flex-row gap-[100px] max-w-[1366px] px-14 mx-auto">
      <ExpenseForm setExpenses={setExpenses} />
      <div className="flex-1 mt-[100px]">
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

export default RootLayout;