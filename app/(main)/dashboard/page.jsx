import React from "react";
import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import CreateAccountDrawer from "@/components/create-account-drawer";
import { getDashboardData, getUserAccounts } from "@/actions/dashboard";
import { AccountCard } from "./_components/account-card";
import  BudgetProgress  from "./_components/budget-progress";
import { getCurrentBudget } from "@/actions/budget";
import { DashboardOverview } from "./_components/transaction-overview";
async function DashboardPage() {
  const accounts = await getUserAccounts()
  const defaultAccount = accounts?.find((account) => account.isDefault);
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }
  const transactions = await getDashboardData();
  return (
    <div className="space-y-8">
      {defaultAccount && (
         <BudgetProgress
         initialBudget={budgetData?.budget}
         currentExpenses={budgetData?.currentExpenses || 0}
       />
      )}
      <Suspense fallback={"Loading Overview..."}>
        <DashboardOverview
        accounts={accounts}
        transactions={transactions || []}
        />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="flex flex-col items-center justify-center text-gray-700 dark:text-gray-200 h-full pt-5">
              <Plus className="h-10 w-10 mb-2 text-gray-600 dark:text-gray-300" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts.length > 0 &&
          accounts?.map((account) => {
            return <AccountCard key={account.id} account={account} />
})}
      </div>
    </div>
  );
}

export default DashboardPage;
