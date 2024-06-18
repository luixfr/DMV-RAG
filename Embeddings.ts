import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";

export const getEmbedding = async () => {
    const embeddings = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
      });
    return embeddings;
  };
  