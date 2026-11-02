import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/Categories.css'


    
    const categories = [

  { name: 'Transport', icon: '🚗' },
  { name: 'Food', icon: '🍽️' },
  { name: 'Groceries', icon: '🛒' },
  { name: 'Health', icon: '🏥' },
  { name: 'Housing', icon: '🏠' },
  { name: 'Personal Care', icon: '🧴' },
  { name: 'Phone & Internet', icon: '📶' },
  { name: 'Utilities', icon: '💡' },
  { name: 'Savings', icon: '🐷' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Education', icon: '📚' },
  { name: 'Gift(s)', icon: '🎁' },
  { name: 'Investment', icon: '📈' },
  { name: 'Miscellaneous', icon: '📦' },
 
]

 export default function Categories() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState([])

  function toggle(name) {
    if (selected.includes(name)) {
      setSelected(selected.filter((item) => item !== name))
    } else {
      setSelected([...selected, name])
    }
  }

  function handleContinue() {
    console.log('Selected categories:', selected)
    navigate('/')
  }

  return (
    <main className="categories-page">
      <section className="categories-card">
        <h1 className="categories-title">Choose Category</h1>
        <p className="categories-subtitle">Pick the expenses you want to track.</p>

        <div className="categories-list">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className={
                selected.includes(category.name)
                  ? 'category-chip selected'
                  : 'category-chip'
              }
              onClick={() => toggle(category.name)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        <p className="categories-count">{selected.length} selected</p>

        <button
          type="button"
          className="categories-button"
          disabled={selected.length === 0}
          onClick={handleContinue}
        >
          Continue
        </button>
      </section>
    </main>
  )
}

