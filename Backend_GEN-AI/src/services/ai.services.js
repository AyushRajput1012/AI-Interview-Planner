const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const puppeteer = require("puppeteer")


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})


const interviewReportSchema = z.object({
  matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's resume matches the job description."),
  technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical question asked during the interview."),
    intention: z.string().describe("The intention of interviewer behind asking the question."),
    answer: z.string().describe("How to answer this question, what point to cover, what approach to take, what to avoid, etc.")
  })).min(5).max(8).describe("A list of technical questions asked during the interview, along with their intentions and answers,Generate at least 5 and at most 8 technical interview questions."),
  behavioralQuestions: z.array(z.object({
    question: z.string().describe("The behavioral question asked during the interview."),
    intention: z.string().describe("The intention of interviewer behind asking the question."),
    answer: z.string().describe("How to answer this question, what point to cover, what approach to take, what to avoid, etc.")
  })).min(5).max(8).describe("A list of behavioral questions asked during the interview, along with their intentions and answers,Generate at least 5 behavioral interview questions."),
  skillGaps: z.array(z.object({
    skill: z.string().describe("The skill that the candidate is lacking."),
    severity: z.enum(['low', 'medium', 'high']).describe("The severity of the skill gap.")
  })).min(4).max(6).describe("A list of skills that the candidate is lacking, along with their severity, Generate between 4 and 6 skill gaps."),
  preparationPlan: z.array(z.object({
    day: z.number().describe("The day number in the preparation plan, starting from 1."),
    focus: z.string().describe("The main focus of this day in the preparation plan."),
    tasks: z.array(z.string()).describe("List of tasks to be completed on this day in the preparation plan.")
  })).min(7).max(14).describe("A day-wise preparation plan for the candidate to improve their skills and prepare for future interviews, Generate at least 7 days of preparation."),
  title: z.string().describe("The title of the job for which the interview report is generated."),

})



async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

  const prompt = `
You are an expert technical interviewer.

Analyze the candidate's resume against the job description.

Return ONLY valid JSON.

The JSON MUST EXACTLY follow this schema.

{
  "title": "Backend Developer",

  "matchScore": 85,

  "technicalQuestions": [
    {
      "question": "What is JWT?",
      "intention": "To test authentication knowledge.",
      "answer": "Explain JWT structure, signing, verification and security."
    }
  ],

  "behavioralQuestions": [
    {
      "question": "Tell me about yourself.",
      "intention": "Understand communication skills.",
      "answer": "Talk about education, projects and experience."
    }
  ],

  "skillGaps": [
    {
      "skill": "Redis",
      "severity": "medium"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focus": "Redis",
      "tasks": [
        "Learn Redis basics",
        "Build one Redis project"
      ]
    }
  ]
}


Rules:

1.Return ONLY valid JSON.

2. Do NOT wrap JSON in markdown.

3. Do NOT explain anything.

4. title must be a short professional job title.

5. matchScore must be a number between 0 and 100.

6. Generate AT LEAST 5 technical interview questions.

7. Generate AT LEAST 5 behavioral interview questions.

8. Generate BETWEEN 4 and 6 skill gaps.

9. Generate a preparation plan of AT LEAST 7 days.

10. Every preparation day must contain:
- one focus
- at least 3 tasks

11. Technical questions should become progressively harder.

12. Behavioral questions should cover:
- teamwork
- leadership
- communication
- conflict resolution
- problem solving

13. Never repeat questions.

14. Never repeat skill gaps.

15. technicalQuestions must be an ARRAY OF OBJECTS.

16. behavioralQuestions must be an ARRAY OF OBJECTS.

17. skillGaps must be an ARRAY OF OBJECTS.

18. preparationPlan must be an ARRAY OF OBJECTS.

19. Never flatten objects into arrays.

20. Never return:
   ["question","What is JWT?","answer","..."]

21. Always return:

"technicalQuestions":[
 {
   "question":"...",
   "intention":"...",
   "answer":"..."
 }

]

22. Return ONLY JSON.

Generate a COMPLETE interview preparation report.

Never generate fewer than the required number of items.

The interview report must be comprehensive.

Do not shorten the response.

Use the maximum allowed number of items whenever possible.

Generate exactly:

• 5 technical interview questions
• 5 behavioral interview questions
• 5 skill gaps
• 7 preparation days

Only generate more if the candidate's resume and the job description require additional coverage.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;




  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      maxOutputTokens: 8192
    }
  });

  const aiResponse = JSON.parse(response.text);

  // Validate using Zod
  const validatedResponse = interviewReportSchema.parse(aiResponse);

  return validatedResponse;

}


async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" })

  const pdfBuffer = await page.pdf({
    format: "A4", margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm"
    }
  })

  await browser.close()

  return pdfBuffer
}


async function generateResumePdf({ resume, selfDescription, jobDescription }) {

  const resumePdfSchema = z.object({
    html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
  })

  const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    }
  })


  const jsonContent = JSON.parse(response.text)

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

  return pdfBuffer
}


module.exports = { generateInterviewReport, generateResumePdf }

