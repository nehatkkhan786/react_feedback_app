import {createContext, useState } from "react"
import {v4 as uuidv4} from "uuid"


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([
        {
            id:1,
            text:"This item is from context",
            rating:8
        }
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit:false
    })

    // Delete a Feedback
    const deleteFeedback = (id) => {
        if (window.confirm('Are You sure! You want to delete this item!')){
            setFeedback(feedback.filter((item)=> item.id !== id))
        }
    }

    //Add New Feedback Function
    const addFeedback = (newFeedback) => {
        newFeedback.id= uuidv4()
        setFeedback([newFeedback, ...feedback])
    }

    //Edit Feedback
    const EditFeedback = (item) => {
        setFeedbackEdit({
            item:item,
            edit:true
        })

    }
    //Update The feedback

    const UpdateFeedback = (id, updItem) =>{
        setFeedback(feedback.map((item)=>(item.id === id ? {...item, ...updItem} : item)))
    }

    return <FeedbackContext.Provider value={{
        feedback:feedback,
        deleteFeedback:deleteFeedback,
        addFeedback:addFeedback,
        EditFeedback:EditFeedback,
        feedbackEdit:feedbackEdit,
        UpdateFeedback:UpdateFeedback
          
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;