import {FaTimes, FaEdit} from 'react-icons/fa'
import {useContext} from "react";
import FeedbackContext from '../context/FeedbackContext';

function FeedbackItem ({item}) {
    const {deleteFeedback,EditFeedback}=useContext(FeedbackContext)
   
    return (
        <div className='card'>
            <div className='num-display'>{item.rating}</div>
            <button onClick={()=> deleteFeedback(item.id)} className='close'><FaTimes color='purple'/></button>
            <button onClick={()=> EditFeedback(item)} className="edit"><FaEdit color="purple"/></button>
            <div className='text-display'>{item.text}</div>
        </div>
    );
}

export default FeedbackItem;