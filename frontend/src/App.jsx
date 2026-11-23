import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import { sampleTransactions } from './data/sampleData'

import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import AddTransaction from './components/AddTransaction/AddTransaction.jsx'
import TransactionHistory from './components/TransactionHistory/TransactionHistory.jsx'
import Login from './Authorization/Login/Login.jsx'
import Signup from './Authorization/Signup/Signup.jsx'

function App() {
  // SHARED STATE: every page that needs transactions gets them from here
  const [transactions, setTransactions] = useState(sampleTransactions)

  // Frontend-only login demo (no backend yet): null means logged out
  const [user, setUser] = useState(null)

  // Add a new transaction at the top of the list
  const addTransaction = (newTransaction) => {
    const transactionWithId = { ...newTransaction, id: Date.now() }
    setTransactions([transactionWithId, ...transactions])
  }

  // Delete: keep every transaction except the one with this id
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id))
  }

  // Edit: replace the transaction that has the same id
  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    )
  }

  const handleLogin = (loggedInUser) => setUser(loggedInUser)
  const handleLogout = () => setUser(null)

  return (
    <div className="app-layout">
      <Header user={user} onLogout={handleLogout} />

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={<Dashboard transactions={transactions} user={user} />}
          />
          <Route
            path="/add-transaction"
            element={<AddTransaction onAdd={addTransaction} />}
          />
          <Route
            path="/transactions"
            element={
              <TransactionHistory
                transactions={transactions}
                onDelete={deleteTransaction}
                onUpdate={updateTransaction}
              />
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App