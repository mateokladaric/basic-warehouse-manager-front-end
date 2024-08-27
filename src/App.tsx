import Home from './pages/Home';
import Editor from './pages/Editor';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export type item = {
  id: string,
  count: number,
  price: number,
  name: string
}

function App() {
  const [items, setItems] = useState<item[]>([]);
  const addItem = (newItem: item) => {
    setItems([...items, newItem]);
  };
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  }
  const changeItem = (id:string, changeitem:item) => {
    setItems(items.map(item => item.id === id ? changeitem : item));
  }
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/editor">Editor</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home displayItems={items} />} />
          <Route path="/editor" element={<Editor addItemFunc={(item) => addItem(item)} displayItems={items} removeItemById={(itemID) => removeItem(itemID)} changeItem={(id, changeitem) => changeItem(id, changeitem)} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;