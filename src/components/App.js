import './App.css';
import { connect } from 'react-redux/es/exports';

const App = (props) => {
  console.log('PROPS', props);
  return <div className="App">App</div>;
};

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    user: state.user,
  };
};

export default connect(mapStateToProps)(App);
