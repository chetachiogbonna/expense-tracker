import { Dispatch, SetStateAction } from "react";
import { type IExpense } from "../types";
import Expense from "./Expense";
import { useSearchParams } from "react-router-dom";

type PropsType = { 
  expenses: IExpense[], 
  setExpenses:  Dispatch<SetStateAction<IExpense[]>>,
  editExpense: string,
  setEditExpense: Dispatch<SetStateAction<string>>
};

function ExpenseList({ expenses, setExpenses, editExpense, setEditExpense }: PropsType) {
  const [searchParams, setSearchParams] = useSearchParams()

  const filteredExpense = searchParams.get('category');

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

  return(
    <>
      <div className="flex gap-14 mb-1">
        <h2 className="w-[40px] md:w-[80px] font-semibold">Description</h2>
        <h2 className="w-[40px] md:w-[80px] font-semibold">Category</h2>
        <h2 className="w-[40px] md:w-[80px] font-semibold">Amount</h2>
        <h2 className="w-[40px] md:w-[80px] font-semibold">Date</h2>

        <select
          className="ring-0"
          value={filteredExpense || ''}
          onChange={(e) => {
            const { value } = e.target; 

            if (!value) {
              setSearchParams({})
            } else {
              setSearchParams({ category: value })
            }
          }}    
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
      {expenses.length > 0 
        ? <div>{expensesList}</div>
        : <h2 className="font-semibold text-center">Your list is empty</h2>
      }
    </>
  );
}


export default ExpenseList;