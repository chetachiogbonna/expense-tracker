import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { type IExpense } from "../types";
import Expense from "./Expense";

type PropsType = { 
  expenses: IExpense[], 
  setExpenses:  Dispatch<SetStateAction<IExpense[]>>,
  editExpense: string,
  setEditExpense: Dispatch<SetStateAction<string>>
};

function ExpenseList({ expenses, setExpenses, editExpense, setEditExpense }: PropsType) {
  const [filteredExpense, setFilteredExpense] = useState<string>();
  const [value, setValue] = useState<string>();

  const genNewSerachParams = (value: string | undefined) => {
    const searchParams = new URLSearchParams(window.location.href);

    if (!value) {
      searchParams.delete("category")
    } else {
      searchParams.set("category", value)
    }

    setFilteredExpense(searchParams.get("category") || undefined);
  }

  useEffect(() => {
    genNewSerachParams(value);
  }, [value, filteredExpense]);

  const displayExpense = filteredExpense 
    ? expenses.filter((expense) => expense.category === filteredExpense)
    : expenses;
  
  const expensesList = displayExpense.map((expense) => {
    return (
      <Expense 
        key={expense.id}
        expense={expense} 
        setExpenses={setExpenses}
        editExpense={editExpense}
        setEditExpense={setEditExpense}
      />
    )
  });

  return (
    <>
      <div className="flex gap-14 mb-1">
        <h2 className="w-[40px] md:w-[80px] font-semibold">Description</h2>
        <h2 className="w-[40px] md:w-[80px] font-semibold">Category</h2>
        <h2 className="w-[40px] md:w-[80px] font-semibold">Amount</h2>
        <h2 className="w-[40px] md:w-[80px] font-semibold">Date</h2>

        <select
          className="ring-0"
          value={filteredExpense || ''}
          onChange={(e) => setValue(e.target.value)}    
        >
          <option value="">All</option>
          <option value="Provision">provision</option>
          <option value="Ingredients">ingredients</option>
          <option value="Cosmetics">cosmetics</option>
          <option value="Utensils">utensils</option>
          <option value="Spices">spices</option>
        </select>
      </div>
      <hr className="bg-black h-[2px] mb-2" />
      {filteredExpense && expenses.length > 0 && displayExpense.length < 1
        ? <h2 className="font-semibold text-center">
            No expense with <span className="text-red-500">{filteredExpense.toLowerCase()}</span> category found
          </h2> 
        : expenses.length > 0
          ? <div>{expensesList}</div>
          : <h2 className="font-semibold text-center">Your list is empty</h2>
      }
    </>
  );
}


export default ExpenseList;