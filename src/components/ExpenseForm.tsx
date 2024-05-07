import { Dispatch, SetStateAction, useState } from "react";
import { type IExpense } from "../types";

function ExpenseForm({ setExpenses }: { setExpenses:  Dispatch<SetStateAction<IExpense[]>> }) {
  const [expanseName, setExpanseName] = useState('')
  const [expanseCategory, setExpanseCategory] = useState('Provision')
  const [expanseAmount, setExpanseAmount] = useState('')
  const [expanseDate, setExpanseDate] = useState('')

  const addExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allIsFilled = expanseName && expanseCategory && expanseAmount && expanseDate;
    if (allIsFilled) {
      setExpenses(prevExpense => {
        const newExpense =  {
          id: crypto.randomUUID(),
          name: expanseName,
          category: expanseCategory,
          amount: Number(expanseAmount) || 2,
          date: expanseDate,
          editExpense: false
        }
  
          return [...prevExpense, newExpense]
      });

      setExpanseName('')
      setExpanseCategory('Provision')
      setExpanseAmount('')
      setExpanseDate('')
    }
  }

  return (
    <form 
      className="w-[500px] h-[530px] flex flex-col gap-10 p-10 border border-black rounded-md"
      onSubmit={addExpense}  
    >
      <h2 className="text-center text-[18px] font-bold">Add Expense</h2>
      <div className="flex flex-col gap-5">
        <label>
          Description:
          <div>
            <input type="text"
              className="add-expense-input"
              value={expanseName} 
              onChange={(e) => setExpanseName(e.target.value)} 
              required
            />
          </div>
        </label>

        <label>
          Category:
          <div>
            <select
              className="add-expense-input"
              value={expanseCategory} 
              onChange={(e) => setExpanseCategory(e.target.value)} 
              required
            >
              <option value="Provision">Provision</option>
              <option value="Ingredients">Ingredients</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Utensils">Utensils</option>
              <option value="Spices">Spices</option>
            </select>
          </div>
        </label>

        <label>
          Amount:
          <div className="flex items-center">
            <span>$</span>
            <input type="number"
              className="add-expense-input"
              value={expanseAmount} 
              onChange={(e) => setExpanseAmount(e.target.value)} 
              required
            />
          </div>
        </label>

        <label>
          Date:
          <div>
            <input type="date"
              className="add-expense-input"
              value={expanseDate} 
              onChange={(e) => setExpanseDate(e.target.value)} 
              required
            />
          </div>
        </label>
      </div>

      <div className="text-left">
        <button 
          className="bg-emerald-500 px-6 py-2 text-white rounded-md">
          Add Expense
        </button>
      </div>
    </form>
  )
}

export default ExpenseForm;