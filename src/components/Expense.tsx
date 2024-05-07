import React, { Dispatch, SetStateAction, useState } from "react";
import { IExpense } from "../types";

type ExpenseProps = {
  expense: IExpense,
  setExpenses:  Dispatch<SetStateAction<IExpense[]>>,
  editExpense: string,
  setEditExpense: Dispatch<SetStateAction<string>>
}

function Expense({ expense, setExpenses, editExpense, setEditExpense }: ExpenseProps) {
  const [newExpanseName, setNewExpanseName] = useState(expense.name)
    const [newExpanseCategory, setNewExpanseCategory] = useState(expense.category)
    const [newExpanseAmount, setNewExpanseAmount] = useState(`${expense.amount || '2'}`)
    const [newExpanseDate, setNewExpanseDate] = useState(expense.date)

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
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

    const editExpenseFunc = () => {
      return (
        <>
          <input 
            className="edit-expense-input"
            required
            type="text" 
            value={newExpanseName} 
            onChange={(e) => setNewExpanseName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />

          <select
            className="edit-expense-input"
            value={newExpanseCategory} 
            onChange={(e) => setNewExpanseCategory(e.target.value)} 
            onClick={(e) => e.stopPropagation()}
            required
          >
            <option value="Provision">Provision</option>
            <option value="Ingredients">Ingredients</option>
            <option value="Cosmetics">Cosmetics</option>
            <option value="Utensils">Utensils</option>
            <option value="Spices">Spices</option>
          </select>

          <input
            className="edit-expense-input"
            required 
            type="number"
            value={newExpanseAmount} 
            onChange={(e) => setNewExpanseAmount(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          /> 

          <input 
            className="edit-expense-date-input"
            required
            type="date" 
            value={newExpanseDate} 
            onChange={(e) => setNewExpanseDate(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="flex justify-between items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button>ok</button>
            <img src="/img/delete.png" />
          </div>
        </>
      )
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
          ? editExpenseFunc()
          : displayExpenseFunc()}
      </form>
    )
}

export default Expense