import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

app.post('/comment', async (req, res) => {

    const { code } = req.body;

    const commentTemplate = `
    Input code:
        ${code}
    write comments for the code lines where necessary. don't explain, return only the code and don't comment on the entire code 
    `

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: commentTemplate }],
        model: "gpt-3.5-turbo",
    });

    if (chatCompletion?.choices[0]?.message?.content) {
        res.send(chatCompletion.choices[0].message.content);
    } else {
        res.send("Sorry, I don't know that.");
    }
});

app.post('/analyze', async (req, res) => {

    const { code } = req.body;

    const analyzeTemplate = `
    Input code:

    ${code}
    
    analyze code using clean code principles and also make it optimized if it is possible and return the output in JSON format:
    {
       "imporvedCode":  "your better code here.....",
      "instructions": "
    1) ......
    2)......
    "
    }
    `

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: analyzeTemplate }],
        model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion)

    if (chatCompletion?.choices[0]?.message?.content) {
        res.send(chatCompletion.choices[0].message.content);
    } else {
        res.send("Sorry, I don't know that.");
    }
});

app.post('/document', async (req, res) => {

    const { code } = req.body;

    const documentTemplate = `
        Input code:
    
        ${code}
        
        write documentation for the code in HTML and use inline CSS make sure code snippets have #1E1E1E background white text and also give classes to elements and design don't target by tag name in CSS also don't style the body also add #documentation with every css style, return just the code 
        `

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: documentTemplate }],
        model: "gpt-3.5-turbo",
    });

    if (chatCompletion?.choices[0]?.message?.content) {
        res.send(chatCompletion.choices[0].message.content);
    } else {
        res.send("Sorry, I don't know that.");
    }
});

app.listen(port, () => {
    console.log(`App listening at Port ${port}`);
});