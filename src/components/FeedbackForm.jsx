import {useState, useContext, useEffect} from 'react';
import Button from "./shared/Button";
import RatingSelect from './RatingSelect';
import FeedbackContext from '../context/FeedbackContext';


function FeedbackForm () {
    const {addFeedback, feedbackEdit, UpdateFeedback} = useContext(FeedbackContext)

    const [text, setText] = useState('');
    const [rating, setRating] = useState(10)
    const [btnDisable, setBtnDisable] = useState(true)
    const [message, setMessage] = useState('')

    useEffect(()=>{
        if(feedbackEdit.edit === true){
            setBtnDisable(false)
            setText(feedbackEdit.item.text)
        }
    }, [feedbackEdit])

    function HandleTextChange (event){
        if(text === ''){
            setBtnDisable(true)
            setMessage(null)
        } else if (text !== '' && text.trim().length <= 10) {
            setBtnDisable(true)
            setMessage('Text must be at least 10 Characters')
        } else {
            setBtnDisable(false)
            setMessage(null)
        }
        setText(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim().length > 10) {
            const newFeedback = {
                text:text,
                rating:rating
            }
            if(feedbackEdit.edit === true) {
                UpdateFeedback(feedbackEdit.item.id, newFeedback)
            } else {
                addFeedback(newFeedback)
            }
            setText('')
        }
    }
    return (
        <div className='card'>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={(rating)=>{setRating(rating)} } />
                <div className="input-group">
                    <input onChange={HandleTextChange} type='text' value={text} placeholder="Write your review"/>
                    <Button type="submit" isDisabled={btnDisable} >Send</Button>
                </div>
                {message && <div className="message">{message}</div>}
            </form>
        </div>
    );
}

export default FeedbackForm;