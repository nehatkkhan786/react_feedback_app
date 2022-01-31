import {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from './components/AboutIconLink';

import { FeedbackProvider } from './context/FeedbackContext';

function App() {
  const[feedback, setfeedback] = useState(FeedbackData)
  return (
    
    <FeedbackProvider>
    <>
    <Router>
      <Header text='Feedback UI '/>
      <div className='container'>
        <Routes>
            <Route exact path='/' element={
              <>
              <FeedbackForm/>
              <FeedbackStats/>
              <FeedbackList feedback={feedback}/>
              </>
            } >
            </Route>
            <Route path='/about' element= {<AboutPage/>} />
            
        </Routes> 
      </div>
      <AboutIconLink/>
    </Router>
    </>
    </FeedbackProvider> 
    
  );
}

export default App;
