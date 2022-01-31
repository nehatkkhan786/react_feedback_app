import {createContext, useState, useEffect } from "react"
import {v4 as uuidv4} from "uuid"


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [feedbackEdit, setFeedbackEdit] = useState({
        item:{},
        edit:false
    })

    useEffect(() => {
        FetchFeedback()
    }, [])

    // Get all the feedback from the backend
    const FetchFeedback = async ()=> {
        const response = await fetch(`feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data) 
        setIsLoading(false)
    }

    // Delete a Feedback
    const deleteFeedback = async (id) => {
        if (window.confirm('Are You sure! You want to delete this item!')){
            await fetch(`/feedback/${id}`, {method:"DELETE",} )
            setFeedback(feedback.filter((item)=> item.id !== id))
        }
    }

    //Add New Feedback Function
    const addFeedback = async (newFeedback) => {
        const response = await fetch('/feedback', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },

            body : JSON.stringify(newFeedback),
        })
        const data = await response.json()
        setFeedback([data, ...feedback])
    }

    //Edit Feedback
    const EditFeedback = (item) => {
        setFeedbackEdit({
            item:item,
            edit:true
        })

    }

    //Update The feedback
    const UpdateFeedback = async (id, updItem) =>{
        const response = await fetch(`/feedback/${id}`, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(updItem)
        })
        const data = await response.json()
        setFeedback(feedback.map((item)=>(item.id === id ? {...item, ...data} : item)))
    }

    return <FeedbackContext.Provider value={{
        feedback:feedback,
        deleteFeedback:deleteFeedback,
        addFeedback:addFeedback,
        EditFeedback:EditFeedback,
        feedbackEdit:feedbackEdit,
        UpdateFeedback:UpdateFeedback,
        isLoading:isLoading
          
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;