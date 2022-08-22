
import './App.css';
import Header from './components/Header/Header';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Expense from './components/Expense/Expense';
import Sales from './components/Sales/Sales';
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/expense' element={<Expense/>}></Route>
        <Route path='/sales' element={<Sales/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
