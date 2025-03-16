"use client"; // Ensures this runs on the client side

import React, { useEffect, useState } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getTransaction } from "@/actions/transaction";
import AddTransactionForm from "../_components/transaction-form";
import { defaultCategories } from "@/data/categories";

const AddTransactionPage = ({ searchParams }) => {
  const [accounts, setAccounts] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const editId = searchParams?.edit;

  useEffect(() => {
    async function fetchData() {
      try {
        const userAccounts = await getUserAccounts();
        setAccounts(userAccounts);

        if (editId) {
          const transaction = await getTransaction(editId);
          setInitialData(transaction);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [editId]); // Re-fetch if `editId` changes

  return (
    <div className="max-w-3xl mx-auto px-5">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title">
          {editId ? "Edit " : "Add "}Transaction
        </h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
};

export default AddTransactionPage;
