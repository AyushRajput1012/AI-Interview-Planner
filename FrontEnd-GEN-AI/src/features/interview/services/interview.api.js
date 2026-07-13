import axios from "axios";


const api = axios.create({
    baseURL: "https://ai-interview-backend-69rs.onrender.com",
    withCredentials: true,
})

/**
 * 
 * @description Generate an interview report based on the candidate's resume, self-description, and job description.
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resumeFile }) => {

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

/**
 * 
 * @description Get an interview report by interviewId. 
 */
export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}


/**
 * 
 * @description Get all interview reports of logged in user. 
 */
export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/")

    return response.data
}

/**
 * @description Generate a resume PDF based on the candidate's self-description, resume content, and job description.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportId}`, null, {
        responseType: "blob"
    })
    return response.data
}
/**
* @description Delete an interview report by interviewId.
*/
    export const deleteInterviewReport = async (interviewId) => {

        const response = await api.delete(`/api/interview/${interviewId}`);

        return response.data;
    }



    
