import React from 'react'
import Footer from './Components/Footer';
import Header from './Components/Header'
import { Container } from 'react-bootstrap'

const App = () => {
  return (
    <>
      <Header></Header>
      
      <main className='py-3'>
        <Container>
        <h1>Hello this is welcome page</h1>
        </Container>
      
      </main>
      <Footer></Footer>
    </>
  );
};
export default App;
