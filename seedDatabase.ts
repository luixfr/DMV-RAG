import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import "pdf-parse"; // Peer dep

import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CHROMA_COLLECTION } from "./ChromaClient.ts";
import { getEmbedding } from "./Embeddings.ts";

const loadPdf = async () => {
  const loader = new PDFLoader("./data/CA-Drivers-Handbook.pdf");

  const docs = await loader.load();

  return docs;
};

const chunkDocument = async (documents: Document[]) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 800,
    chunkOverlap: 80,
  });
  return splitter.splitDocuments(documents);
};

export const storeInVector = async (
  chunks: Document[],
  embeddings: HuggingFaceTransformersEmbeddings
) => {
  const vector = await Chroma.fromDocuments(chunks, embeddings, {
    collectionName: CHROMA_COLLECTION,
  });

  return vector;
};

export const seed = async () => {

  console.log("PopulateDatabase")
  const embeddings = await getEmbedding();
  console.log("embeddings ready");

  const doc = await loadPdf();
  console.log("docs", doc.length);
  const chunks = await chunkDocument(doc);
  console.log("chunks", chunks.length);
  
  const vector = await storeInVector(chunks, embeddings);
 console.log("Data has been saved in database")
};

seed();
