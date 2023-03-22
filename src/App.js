import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import WarehousesPage from './pages/WarehousesPage/WarehousesPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
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
    </Routes>
    <Footer />
    </BrowserRouter>
</div>



  );
}

export default App;
