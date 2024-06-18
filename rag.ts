import { Ollama } from "@langchain/community/llms/ollama";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { CHROMA_COLLECTION } from "./ChromaClient";
import { getEmbedding } from "./Embeddings";

const main = async () => {
  
  const question = process.argv[2];
  const embeddings = await getEmbedding();
  const db = new Chroma(embeddings, { collectionName: CHROMA_COLLECTION});

  const docs = await db.similaritySearch(question, 4);

  const context = docs.reduce((acc, cuur) => {
    return acc
      ? acc + cuur.pageContent + "\n\n---\n\n"
      : cuur.pageContent + "\n\n---\n\n";
  }, "");

  const promptTemplate = `
    Answer the question based only on the following context:

      ${context}

    Answer the question based on the above context. Limitate your response to just the answer: 
      ${question}
  `;

  //console.log(promptTemplate)
  const ollamaLlm = new Ollama({ model: "llama3" });
  const response = await ollamaLlm.invoke(promptTemplate);
  
  console.log("Question: ", question)
  console.log("Answer: ", response);
};

main();
