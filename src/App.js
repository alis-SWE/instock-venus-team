import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import AddWarehousePage from './pages/AddWarehousePage/AddWarehousePage';
import AddInventoryPage from './pages/AddInventoryPage/AddInventoryPage';
import EditWarehousePage from './pages/EditWarehousePage/EditWarehousePage';
import WarehouseDetailPage from './pages/WarehouseDetailPage/WarehouseDetailPage';
import EditInventoryItem from './pages/EditInventoryItem/EditInventoryItem';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import InventoryItemPage from './pages/InventoryItemPage/InventoryItemPage';
import { ToastContainer, toast } from 'react-toastify';
import './App.scss'


function App() {
  return (
  <div className="App">
  <BrowserRouter>
    <Header/>
    <Routes>
        <Route path='/' element={<WarehousesPage/>}></Route>
          <Route path='/inventory' element={<InventoryPage/>}></Route>
          <Route path='/inventory/:id' element={<InventoryItemPage/>}></Route>
          <Route path='/inventory/add' element={<AddInventoryPage/>}></Route>
          <Route path='*' element={<NotFoundPage/>}></Route>
          <Route path='/warehouse/add' element={<AddWarehousePage/>}></Route>
          <Route path='/warehouse/:id' element={<WarehouseDetailPage/>}></Route>
          <Route path='/warehouse/edit/:id' element={<EditWarehousePage/>}></Route>
          <Route path='/inventory/edit/:id' element={<EditInventoryItem/>}></Route>
      </Routes>
      <ToastContainer />
      <Footer />
      </BrowserRouter>
  </div>

  );
}

export default App;
