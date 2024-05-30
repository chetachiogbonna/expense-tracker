import { Dispatch, SetStateAction, useState } from "react";
import { IExpense } from "../types";

type EditExpenseProps = {
  expense: IExpense,
  setEditExpense: Dispatch<SetStateAction<string>>
}

function EditExpense({ expense, setEditExpense }: EditExpenseProps) {
  const [newExpanseName, setNewExpanseName] = useState(expense.name)
  const [newExpanseCategory, setNewExpanseCategory] = useState(expense.category)
  const [newExpanseAmount, setNewExpanseAmount] = useState(`${expense.amount || '2'}`)
  const [newExpanseDate, setNewExpanseDate] = useState(expense.date)

  return (
    <>
      <input 
        className="edit-expense-input"
        required
        type="text" 
        value={newExpanseName}
        name="edited-name" 
        onChange={(e) => setNewExpanseName(e.target.value)}
        onClick={(e) => e.stopPropagation()}
      />

      <select
        className="edit-expense-input"
        value={newExpanseCategory} 
        onChange={(e) => setNewExpanseCategory(e.target.value)} 
        onClick={(e) => e.stopPropagation()}
        name="edited-category"
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
        name="edited-amount"
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
        name="edited-date"
      />

      <div className="flex justify-between items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button"
          className="w-[40px] h-[40px]"
          onClick={() => setEditExpense("")}
        >
          <img src="/img/cancel.webp" alt="cancel" />
        </button>

        <button>
          <img src="/img/done.svg" alt="done" />
        </button>
      </div>
    </>
  )
}

export default EditExpense