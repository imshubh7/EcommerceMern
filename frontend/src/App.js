import React from 'react'
import Footer from './components/Footer';
import Header from './components/Header'
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';


const App = () => {
  return (
    <Router>

      <Header></Header>
      
      <main className='py-3'>
        <Container>
        <Routes>
          <Route path='/' element={<HomeScreen/>}/>
          <Route path='/product/:id' element={<ProductScreen/>} />
        </Routes>
        </Container>
      
      </main>
      <Footer></Footer>

      
    </Router>
  );
};
export default App;
