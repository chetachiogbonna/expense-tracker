import React, { Dispatch, SetStateAction } from "react";
import { IExpense } from "../types";
import EditExpense from "./EditExpense";

type ExpenseProps = {
  expense: IExpense,
  setExpenses:  Dispatch<SetStateAction<IExpense[]>>,
  editExpense: string,
  setEditExpense: Dispatch<SetStateAction<string>>
}

function Expense({ expense, setExpenses, editExpense, setEditExpense }: ExpenseProps) {
  
    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newExpanseName = formData.get("edited-name") as string;
      const newExpanseCategory = formData.get("edited-category") as string;
      const newExpanseAmount = formData.get("edited-amount") as string;
      const newExpanseDate = formData.get("edited-date") as string;
      
      setExpenses(prevExpenses => prevExpenses.map(prevExpense => {
        return prevExpense.id === expense.id
        ? { 
          ...prevExpense,
          name: newExpanseName,
          category: newExpanseCategory,
          amount: Number(newExpanseAmount),
          date: newExpanseDate,
        }
        : prevExpense
      }));

      setEditExpense('');
    }

    const displayExpenseFunc = () => {
      return (
        <>
          <p className="truncate" title={expense.name}>{expense.name}</p>
          <p title={expense.category}>{expense.category}</p>
          <p className="text-center" title={`${expense.amount}`}>${expense.amount}</p>
          <p className="text-nowrap w-[125px]" title={expense.date}>{expense.date}</p>
          <div className="flex justify-between items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src="/img/edit.png" 
              title="edit" 
              alt="edit"
              onClick={() => {
              setEditExpense(expense.id)
            }}
            />
      
            <img title="delete" 
              src="/img/delete.png"
              alt="delete" 
              onClick={() => setExpenses(prevExpenses => prevExpenses.filter(prevExpense => prevExpense.id !== expense.id))
              } 
            />
          </div>
        </>
      )
    }
    
    return (
      <form
        className="flex gap-14"
        onSubmit={handleEdit}
      > 
        {editExpense === expense.id
          ? <EditExpense expense={expense} setEditExpense={setEditExpense} />
          : displayExpenseFunc()}
      </form>
    )
}

// Groceries
// Food
// Books
// Music
// Sports
// Provision
// Utensils
// Clothing
// Clothing
// Rent

export default Expense