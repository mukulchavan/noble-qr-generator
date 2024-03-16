import logo from './logo.svg';
import './App.css';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LeftSection from './components/left-section/left-section'
import RightSection from "./components/right-section/right-section";
function App() {

    return (
        <div className="app">
            <LeftSection></LeftSection>
            <RightSection></RightSection>
            <ToastContainer />
        </div>
    );
}

export default App;
