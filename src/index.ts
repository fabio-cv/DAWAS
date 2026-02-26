import express, { type Request, type Response } from "express";
import { adicionarServico, apagarServico, listarServicos, obterServico } from "./servico.js";

const app = express()
app.use(express.json())

//rota para adicionar servico novo
app.post("/adicionar-servico", (req: Request, res: Response) => {
    const novoServico = req.body

    console.log(novoServico);

    const resposta = adicionarServico(novoServico)
    res.json(resposta)
})

//rota para listar toods os servicos
app.get("/listAll", (req: Request, res: Response) => {

    const listServicoResponse = listarServicos()

    res.json(listServicoResponse)

})

//rota para apagar servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const apagarServicoResponse = apagarServico(nome as string)

        res.json(apagarServicoResponse)
    } else {
        res.json({
            message: "Nome do serviço é obrigatório"
        })
    }
})

//rota para obter servico pelo nome
app.get("/obter-servico", (req: Request, res: Response) => {
    const { nome } = req.query

    if (nome) {
        const obterServicoResponse = obterServico(nome as string)
    } else {
        res.json({
            message: "Nome do serviço é obrigatório"
        })
    }
})


app.listen(8080, () => {
    console.log("server running on port 8080");
})