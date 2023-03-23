import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage';
import EditWarehousePage from './pages/EditWarehousePage/EditWarehousePage';
import EditInventoryItem from './pages/EditInventoryItem/EditInventoryItem';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.scss'

function App() {
  return (
 
<div className="App">
<BrowserRouter>
<Header/>
   <Routes>
       <Route path='/' element={<WarehousesPage/>}></Route>
        <Route path='/inventory' element={<InventoryPage/>}></Route>
        <Route path='*' element={<NotFoundPage/>}></Route>
        <Route path='/warehouse/add' element={<AddWarehousePage/>}></Route>
        <Route path='/warehouse/edit/:id' element={<EditWarehousePage/>}></Route>
        <Route path='/inventory/edit/:id' element={<EditInventoryItem/>}></Route>

    </Routes>
    <Footer />
    </BrowserRouter>
</div>



  );
}

export default App;
