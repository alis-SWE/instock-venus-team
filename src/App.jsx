import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import NotFound from './components/NotFoundPage/NotFound';
import Warehouses from './pages/WarehousesPage/Warehouses';
import Inventory from './pages/InventoryPage/Inventory';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Routes>
           <Route path='/' element={<HomePage />}></Route>
           <Route path='/warehouses' element={<WarehousesPage/>}></Route>
            <Route path='/inventory' element={<InventoryPage/>}></Route>
            <Route path='*' element={<NotFoundPage/>}></Route>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;