import './App.css';
import { connect } from 'react-redux/es/exports';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import InAppBody from '../pages/InAppBody/InAppBody';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp.js/SignUp';

const App = (props) => {
  // console.log('PROPS', props);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<InAppBody />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
