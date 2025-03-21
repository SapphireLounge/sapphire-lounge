import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import CURRENCIES from './currencies';

// Re-export CURRENCIES
export { CURRENCIES };

// Define translations
const resources = {
  en: {
    translation: {
      // General
      dashboard: 'Dashboard',
      licenses: 'Licenses',
      expenses: 'Expenses',
      income: 'Income',
      settings: 'Settings',
      addLicense: 'Add License',
      addExpense: 'Add Expense',
      addIncome: 'Add Income',
      editLicense: 'Edit License',
      editExpense: 'Edit Expense',
      editIncome: 'Edit Income',
      noLicenses: 'No licenses added yet.',
      noExpenses: 'No expenses added yet.',
      noIncomeData: 'No income data added yet.',
      currency: 'Currency',
      notifications: 'Notifications',
      emailNotifications: 'Email Notifications',
      emailNotificationsDesc: 'Receive updates and reminders via email',
      browserNotifications: 'Browser Notifications',
      browserNotificationsDesc: 'Show desktop notifications',
      dataManagement: 'Data Management',
      exportData: 'Export Data',
      importData: 'Import Data',
      currencyAndRegion: 'Currency & Region',
      applyChanges: 'Apply Changes',
      settingsSaved: 'Settings saved successfully',
      
      // Income related translations
      category: 'Category',
      selectCategory: 'Select Category',
      amount: 'Amount',
      frequency: 'Frequency',
      nextReceiptDate: 'Next Receipt Date',
      incomeName: 'Name',
      notes: 'Notes',
      cancel: 'Cancel',
      save: 'Save',
      update: 'Update',
      delete: 'Delete',
      confirm: 'Confirm',
      salary: 'Salary',
      freelance: 'Freelance',
      investments: 'Investments',
      rental: 'Rental',
      royalties: 'Royalties',
      business: 'Business',
      other: 'Other',
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly',
      oneTime: 'One-time',
      incomeByCategory: 'Income by Category',
      totalIncome: 'Total Income',
      netBalance: 'Net Balance',
      searchIncome: 'Search income...',
      filtersComingSoon: 'Filters coming soon',
      confirmDeleteIncome: 'Are you sure you want to delete this income item?',
      noIncomeFound: 'No Income Found',
      
      // Additional translations for Settings page
      appearance: 'Appearance',
      darkMode: 'Dark Mode',
      darkModeDescription: 'Use dark theme for the application',
      profile: 'Profile',
      security: 'Security',
      name: 'Name',
      yourName: 'Your Name',
      company: 'Company',
      yourCompany: 'Your Company',
      email: 'Email',
      enterYourEmail: 'Enter your email',
      enableNotifications: 'Enable Notifications',
      notificationsDescription: 'Get notified about license and payment updates',
      autoBackup: 'Auto Backup',
      autoBackupDescription: 'Automatically backup your data',
      backupFrequency: 'Backup Frequency',
      dataExportFormat: 'Data Export Format',
      resetData: 'Reset Data',
      confirmResetData: 'Are you sure you want to reset all data? This cannot be undone.',
      exportFunctionalityComingSoon: 'Export functionality coming soon',
      importFunctionalityComingSoon: 'Import functionality coming soon',
      resetFunctionalityComingSoon: 'Reset functionality coming soon',
      account: 'Account',
      
      // License related translations
      licenseKey: 'License Key',
      expiryDate: 'Expiry Date',
      status: 'Status',
      active: 'Active',
      expired: 'Expired',
      expiringSoon: 'Expiring Soon',
      licenseType: 'License Type',
      personal: 'Personal',
      enterprise: 'Enterprise',
      cost: 'Cost',
      renewalDate: 'Renewal Date',
      purchaseDate: 'Purchase Date',
      licenseDetails: 'License Details',
      vendor: 'Vendor',
      vendorName: 'Vendor Name',
      confirmDeleteLicense: 'Are you sure you want to delete this license?',
      licensesByType: 'Licenses by Type',
      totalLicenses: 'Total Licenses',
      licenseCosts: 'License Costs',
      activeReminders: 'Active Reminders',
      upcomingPayments: 'Upcoming Payments',
      noUpcomingPayments: 'No upcoming payments',
      searchLicenses: 'Search licenses...',
      noLicensesFound: 'No licenses found matching your search criteria.',
      filters: 'Filters',
      
      // Expense related translations
      date: 'Date',
      expenseType: 'Expense Type',
      subscription: 'Subscription',
      recurring: 'Recurring',
      expenseCategory: 'Category',
      confirmDeleteExpense: 'Are you sure you want to delete this expense?',
      expensesByCategory: 'Expenses by Category',
      totalExpenses: 'Total Expenses',
      searchExpenses: 'Search expenses...',
      noExpensesFound: 'No expenses found matching your search criteria.',
      
      // Dashboard related translations
      financialOverview: 'Financial Overview',
      noExpensesYet: 'No expenses yet',
      loading: 'Loading...',
      
      // Form Fields
      expenseName: 'Expense Name',
      licenseName: 'License Name',
      startDate: 'Start Date',
      nextDueDate: 'Next Due Date',
      renewalFrequency: 'Renewal Frequency',
      autoCalculated: 'Auto-calculated based on start date and frequency',
      
      // Form validation
      fieldRequired: 'This field is required',
      mustBePositive: 'Must be a positive number',
      
      // Miscellaneous
      version: 'Version',
      enterExpenseName: 'Enter expense name',
      optionalNotes: 'Optional notes',
      saveExpense: 'Save Expense',
      updateExpense: 'Update Expense',
      custom: 'Custom',
      uncategorized: 'Uncategorized',
      saveLicense: 'Save License',
      updateLicense: 'Update License',
      enterLicenseName: 'Enter license name'
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;