import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const LANGUAGES = {
  en_GB: {
    name: 'English (UK)',
    currency: '£',
    region: 'United Kingdom'
  },
  en_US: {
    name: 'English (US)',
    currency: '$',
    region: 'United States'
  },
  es: {
    name: 'Español',
    currency: '€',
    region: 'España'
  },
  fr: {
    name: 'Français',
    currency: '€',
    region: 'France'
  },
  de: {
    name: 'Deutsch',
    currency: '€',
    region: 'Deutschland'
  },
  it: {
    name: 'Italiano',
    currency: '€',
    region: 'Italia'
  },
  pt: {
    name: 'Português',
    currency: '€',
    region: 'Portugal'
  },
  nl: {
    name: 'Nederlands',
    currency: '€',
    region: 'Nederland'
  },
  ja: {
    name: '日本語',
    currency: '¥',
    region: '日本'
  },
  zh: {
    name: '中文',
    currency: '¥',
    region: '中国'
  }
};

const resources: {
  [key: string]: {
    translation: {
      [key: string]: string;
    };
  };
} = {
  en_GB: {
    translation: {
      // General
      dashboard: 'Dashboard',
      licenses: 'Licenses',
      expenses: 'Expenses',
      income: 'Income',
      settings: 'Settings',
      version: 'Version',
      applyChanges: 'Apply Changes',
      
      // Dashboard
      totalLicenses: 'Total Licenses',
      licenseCosts: 'License Costs',
      totalExpenses: 'Total Expenses',
      activeReminders: 'Active Reminders',
      expensesByCategory: 'Expenses by Category',
      financialOverview: 'Financial Overview',
      upcomingPayments: 'Upcoming Payments',
      noUpcomingPayments: 'No upcoming payments',
      noExpensesYet: 'No expenses yet',
      quickAccess: 'Quick Access',
      manageYourExpenses: 'Manage your recurring expenses and track payments',
      trackYourLicenses: 'Track software licenses and renewal dates',
      customizeYourExperience: 'Customize your application settings',
      viewAll: 'View All',
      configure: 'Configure',
      
      // Licenses
      addLicense: 'Add License',
      editLicense: 'Edit License',
      licenseName: 'License Name',
      enterLicenseName: 'Enter license name',
      startDate: 'Start Date',
      renewalFrequency: 'Renewal Frequency',
      renewalCost: 'Renewal Cost',
      nextDueDate: 'Next Due Date',
      notes: 'Notes',
      optionalNotes: 'Optional notes',
      cancel: 'Cancel',
      saveLicense: 'Save License',
      updateLicense: 'Update License',
      noLicensesFound: 'No licenses found',
      confirmDeleteLicense: 'Are you sure you want to delete this license?',
      
      // Expenses
      addExpense: 'Add Expense',
      editExpense: 'Edit Expense',
      expenseName: 'Expense Name',
      enterExpenseName: 'Enter expense name',
      category: 'Category',
      selectCategory: 'Select category',
      software: 'Software',
      hardware: 'Hardware',
      services: 'Services',
      utilities: 'Utilities',
      rent: 'Rent',
      salaries: 'Salaries',
      other: 'Other',
      frequency: 'Frequency',
      amount: 'Amount',
      dueDate: 'Due Date',
      saveExpense: 'Save Expense',
      updateExpense: 'Update Expense',
      noExpensesFound: 'No expenses found',
      confirmDeleteExpense: 'Are you sure you want to delete this expense?',
      
      // Income
      addIncome: 'Add Income',
      editIncome: 'Edit Income',
      incomeName: 'Income Name',
      enterIncomeName: 'Enter income name',
      incomeCategory: 'Category',
      salary: 'Salary',
      freelance: 'Freelance',
      investments: 'Investments',
      rental: 'Rental',
      royalties: 'Royalties',
      business: 'Business',
      incomeAmount: 'Amount',
      incomeFrequency: 'Frequency',
      incomeMonthly: 'Monthly',
      incomeYearly: 'Yearly',
      oneTime: 'One-time',
      nextReceiptDate: 'Next Receipt Date',
      nextReceipt: 'Next Receipt',
      saveIncome: 'Save Income',
      updateIncome: 'Update Income',
      noIncomeFound: 'No income found',
      confirmDeleteIncome: 'Are you sure you want to delete this income?',
      
      // Settings
      appearance: 'Appearance',
      darkMode: 'Dark Mode',
      darkModeDescription: 'Use dark theme for the application',
      language: 'Language',
      region: 'Region',
      currentRegion: 'Current Region',
      currency: 'Currency',
      notifications: 'Notifications',
      enableNotifications: 'Enable Notifications',
      notificationsDescription: 'Receive notifications for upcoming payments',
      emailNotifications: 'Email Notifications',
      emailNotificationsDescription: 'Receive notifications via email',
      emailAddress: 'Email Address',
      account: 'Account',
      profile: 'Profile',
      name: 'Name',
      yourName: 'Your Name',
      company: 'Company',
      yourCompany: 'Your Company',
      security: 'Security',
      changePassword: 'Change Password',
      dataManagement: 'Data Management',
      backup: 'Backup',
      autoBackup: 'Backup',
      autoBackupDescription: 'Automatically backup your data',
      backupFrequency: 'Backup Frequency',
      exportImport: 'Export / Import',
      dataExportFormat: 'Export Format',
      exportFormat: 'Export Format',
      exportData: 'Export Data',
      importData: 'Import Data',
      resetData: 'Reset Data',
      confirmResetData: 'Are you sure you want to reset all data? This action cannot be undone.',
      
      // Time periods
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      yearly: 'Yearly',
      daily: 'Daily',
      weekly: 'Weekly',
      
      // Status
      overdue: 'Overdue',
      soon: 'Soon',
      upcoming: 'Upcoming',
      active: 'Active',
      dueInDays: 'Due in {{days}} days',
      
      // Actions
      view: 'View',
      viewDetails: 'View Details',
      edit: 'Edit',
      delete: 'Delete',
      renew: 'Renew',
      processPayment: 'Process Payment',
      actions: 'Actions',
      
      // Validation
      fieldRequired: 'This field is required',
      mustBePositive: 'Value must be greater than zero',
      
      // Filters
      filters: 'Filters',
      searchLicenses: 'Search licenses...',
      searchExpenses: 'Search expenses...',
      filtersComingSoon: 'Advanced filters coming soon',
      
      // Misc
      nextRenewal: 'Next Renewal',
      cost: 'Cost',
      noLicenses: 'No licenses found',
      noExpenses: 'No expenses found',
      exportFunctionalityComingSoon: 'Export functionality coming soon',
      importFunctionalityComingSoon: 'Import functionality coming soon',
      resetFunctionalityComingSoon: 'Reset functionality coming soon'
    }
  }
};

// Copy English translations for American English
resources.en_US = {
  translation: { ...resources.en_GB.translation }
};

// Add translations for other languages
// Spanish
resources.es = {
  translation: {
    ...resources.en_GB.translation,
    // General
    dashboard: 'Panel de control',
    licenses: 'Licencias',
    expenses: 'Gastos',
    income: 'Ingresos',
    settings: 'Configuración',
    version: 'Versión',
    applyChanges: 'Aplicar cambios',
    
    // Dashboard
    totalLicenses: 'Licencias totales',
    licenseCosts: 'Costos de licencias',
    totalExpenses: 'Gastos totales',
    activeReminders: 'Recordatorios activos',
    expensesByCategory: 'Gastos por categoría',
    financialOverview: 'Resumen financiero',
    upcomingPayments: 'Próximos pagos',
    noUpcomingPayments: 'No hay pagos próximos',
    noExpensesYet: 'Aún no hay gastos',
    quickAccess: 'Acceso rápido',
    manageYourExpenses: 'Gestiona tus gastos recurrentes y realiza un seguimiento de los pagos',
    trackYourLicenses: 'Realiza un seguimiento de las licencias de software y las fechas de renovación',
    customizeYourExperience: 'Personaliza la configuración de tu aplicación',
    viewAll: 'Ver todo',
    configure: 'Configurar',
    
    // Licenses
    addLicense: 'Añadir licencia',
    noLicensesFound: 'No se encontraron licencias',
    
    // Expenses
    addExpense: 'Añadir gasto',
    noExpensesFound: 'No se encontraron gastos',
    
    // Filters
    filters: 'Filtros',
    searchLicenses: 'Buscar licencias...',
    searchExpenses: 'Buscar gastos...',
    filtersComingSoon: 'Filtros avanzados próximamente',
    // Settings
    currentRegion: 'Región actual'
  }
};

// French
resources.fr = {
  translation: {
    ...resources.en_GB.translation,
    // General
    dashboard: 'Tableau de bord',
    licenses: 'Licences',
    expenses: 'Dépenses',
    income: 'Revenus',
    settings: 'Paramètres',
    version: 'Version',
    applyChanges: 'Appliquer les modifications',
    
    // Dashboard
    totalLicenses: 'Licences totales',
    licenseCosts: 'Coûts des licences',
    totalExpenses: 'Dépenses totales',
    activeReminders: 'Rappels actifs',
    expensesByCategory: 'Dépenses par catégorie',
    upcomingPayments: 'Paiements à venir',
    noUpcomingPayments: 'Aucun paiement à venir',
    noExpensesYet: 'Pas encore de dépenses',
    quickAccess: 'Accès rapide',
    
    // Licenses
    addLicense: 'Ajouter une licence',
    noLicensesFound: 'Aucune licence trouvée',
    
    // Expenses
    addExpense: 'Ajouter une dépense',
    noExpensesFound: 'Aucune dépense trouvée',
    
    // Filters
    filters: 'Filtres',
    searchLicenses: 'Rechercher des licences...',
    searchExpenses: 'Rechercher des dépenses...',
    filtersComingSoon: 'Filtres avancés bientôt disponibles',
    // Settings
    currentRegion: 'Région actuelle'
  }
};

// German
resources.de = {
  translation: {
    ...resources.en_GB.translation,
    // General
    dashboard: 'Dashboard',
    licenses: 'Lizenzen',
    expenses: 'Ausgaben',
    income: 'Einkommen',
    settings: 'Einstellungen',
    version: 'Version',
    applyChanges: 'Änderungen anwenden',
    
    // Dashboard
    totalLicenses: 'Gesamtlizenzen',
    licenseCosts: 'Lizenzkosten',
    totalExpenses: 'Gesamtausgaben',
    activeReminders: 'Aktive Erinnerungen',
    expensesByCategory: 'Ausgaben nach Kategorie',
    upcomingPayments: 'Anstehende Zahlungen',
    noUpcomingPayments: 'Keine anstehenden Zahlungen',
    noExpensesYet: 'Noch keine Ausgaben',
    quickAccess: 'Schnellzugriff',
    manageYourExpenses: 'Verwalten Sie Ihre wiederkehrenden Ausgaben und verfolgen Sie Zahlungen',
    trackYourLicenses: 'Verfolgen Sie Softwarelizenzen und Verlängerungsdaten',
    customizeYourExperience: 'Passen Sie Ihre Anwendungseinstellungen an',
    viewAll: 'Alle anzeigen',
    configure: 'Konfigurieren',
    // Settings
    currentRegion: 'Aktuelle Region'
  }
};

// Italian
resources.it = {
  translation: {
    ...resources.en_GB.translation,
    // General
    dashboard: 'Dashboard',
    licenses: 'Licenze',
    expenses: 'Spese',
    income: 'Entrate',
    settings: 'Impostazioni',
    version: 'Versione',
    applyChanges: 'Applica modifiche',
    
    // Dashboard
    totalLicenses: 'Licenze totali',
    licenseCosts: 'Costi delle licenze',
    totalExpenses: 'Spese totali',
    activeReminders: 'Promemoria attivi',
    expensesByCategory: 'Spese per categoria',
    upcomingPayments: 'Pagamenti imminenti',
    noUpcomingPayments: 'Nessun pagamento imminente',
    noExpensesYet: 'Ancora nessuna spesa',
    quickAccess: 'Accesso rapido',
    manageYourExpenses: 'Gestisci le tue spese ricorrenti e tieni traccia dei pagamenti',
    trackYourLicenses: 'Tieni traccia delle licenze software e delle date di rinnovo',
    customizeYourExperience: 'Personalizza le impostazioni dell\'applicazione',
    viewAll: 'Vedi tutto',
    configure: 'Configura',
    // Settings
    currentRegion: 'Regione attuale'
  }
};

// Add basic translations for other languages
resources.pt = {
  translation: { 
    ...resources.en_GB.translation,
    currentRegion: 'Região atual'
  }
};

resources.nl = {
  translation: { 
    ...resources.en_GB.translation,
    currentRegion: 'Huidige regio'
  }
};

resources.ja = {
  translation: { 
    ...resources.en_GB.translation,
    currentRegion: '現在の地域'
  }
};

resources.zh = {
  translation: { 
    ...resources.en_GB.translation,
    currentRegion: '当前地区'
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en_GB',
    fallbackLng: 'en_GB',
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
