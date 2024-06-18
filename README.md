# CA DMV RAG 

This app uses RAG to answer question related to the [DMV California Driver’s Handbook](https://www.dmv.ca.gov/portal/driver-handbooks/)

## Dependencies
* [Node](https://nodejs.org/en)
* [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
* [Docker](https://www.docker.com/)
* [Ollama](https://ollama.com/)

The project uses Lancghain, `llama3` model running in Ollama, and Hugging Face with model Xenova/all-MiniLM-L6-v2 for embeddings.

## Run the project

Install yarn dependencies
```bash
yarn
```

Launch a [Chroma](https://www.trychroma.com/) database. These command will run chroma in a docker contariner in the prot 8000
```bash
yarn db:chroma
```

Make sure ollama is running in port 11434

```bash 
ollama serve
```

Seed the vector database with chunks of data from the [Drivers Handbook PDF](data/CA-Drivers-Handbook.pdf). This might take a minute
```bash
yarn db:seed
```

Prompt the model using RAG. You can ask questions related to the drivers license knowlegde test and the script will query the db to enhance the prompt with the needed context to answer. 

```bash
yarn generate
```

Happy coding :)

