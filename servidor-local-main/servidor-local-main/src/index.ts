import express, { type Request, type Response } from "express"
import { adicionarServico, apagarServico, listarServicos, obterServico } from "./servico.js"
import { calcularOrcamento, criarPrestadoresDeServico, editarPrestadorDeServico, selecionarPrestador, selecionarServicos } from "./orcamento.js"
import { createUser, getUserById, getUsers } from "./users.js"
import { error } from "node:console"
import type { PrestadorType, UserType } from "./utils/types.js"

const app = express()
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})


// rota para adicionar um serviço novo
app.post("/adicionar-servico", async (req: Request, res: Response) => {
  const novoServico = req.body

  if (!novoServico) {
    res.status(400).json(
      {
        status: "error",
        message: "Dados do prestador inválidos",
        data: null
      }
    )
  }

  const addServicoResponse = await adicionarServico(novoServico)

  res.json(addServicoResponse)
})


// rota para listar todos os servicos
app.get("/listar-servicos", (req: Request, res: Response) => {
  const listServicoResponse = listarServicos()

  res.json(listServicoResponse)
})


// rota para apagar um servico
app.delete("/apagar-servico", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const apagarServicoResponse = apagarServico(nome as string)

    res.json(apagarServicoResponse)
  } else {
    res.json({
      message: "Nome do servico eh obrigatorio"
    })
  }
})


// rota para obter servico pelo nome 
app.get("/obter-servico", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const obterServicoResponse = obterServico(nome as string)

    res.json(obterServicoResponse)
  } else {
    res.json({
      message: "Nome do servico eh obrigatorio"
    })
  }
})


// rota para selecionar servicos
app.post("/selecionar-servico", (req: Request, res: Response) => {
  const { nome } = req.body

  const selecinarServicoResponse = selecionarServicos(nome as string)

  res.json(selecinarServicoResponse)
})


// rota para calcular orcamento
app.post("/calcular-orcamento", (req: Request, res: Response) => {
  const { pedido } = req.body

  const calcularOrcamentoresponse = calcularOrcamento(pedido)

  res.json({
    message: "Orcamento calculado com sucesso",
    orcamentoTotal: calcularOrcamentoresponse
  })
})


//rota para criar prestador
app.post("/criar-prestador", async (req: Request, res: Response) => {
  const novoPrestador: PrestadorType = req.body

  if (!novoPrestador) {
    res.status(400).json(
      {
        status: "error",
        message: "Dados do prestador inválidos",
        data: null
      })
  }

  const novoPrestadorResponse = await criarPrestadoresDeServico(novoPrestador)

  res.json(novoPrestadorResponse)
})


//rota para selecionar prestadores
app.post("/selecionar-prestador", (req: Request, res: Response) => {
  const { nome } = req.query

  if (nome) {
    const selecionarPrestadorResponse = selecionarPrestador(nome as string)
    res.json(selecionarPrestadorResponse)
  } else {
    res.json({
      message: "Nome do prestador é obrigatório"
    })
  }

})


//rota para editar prestador
app.put("/editar-prestador", (req: Request, res: Response) => {
  const { nomeDoPrestador, novosDadosDoPrestador } = req.body

  const editarPrestadorResponse = editarPrestadorDeServico(nomeDoPrestador as string, novosDadosDoPrestador)
  res.json(editarPrestadorResponse)
})



//selecionar todos os utilizadores na base de dados 
app.get("/get-users", async (req: Request, res: Response) => {
  const getUsersResponse = await getUsers()

  res.json(getUsersResponse)
})


//selecionar utilizador pelo id
app.get("/get-user-by-id", async (req: Request, res: Response) => {
  const { id } = req.query

  if (id) {
    const getUsersByIdResponse = await getUserById(id as string)

    if (!getUsersByIdResponse) {
      res.status(404).json({
        status: "error",
        message: "Utilizador não encontrado",
        data: null
      })
    }

    res.status(200).json({
      status: "sucess",
      message: "Utilizador encontrado",
      data: getUsersByIdResponse
    })

    // res.json(getUsersByIdResponse)
  } else {
    res.status(400).json({
      status: "error",
      message: "Id é obrigatório",
      data: null
    })
  }
})



//criar utilizador
app.post("/create-user", async (req: Request, res: Response) => {
  const user: UserType = req.body

  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Dados do utilizador inválidos",
      data: null
    })
  }

  console.log(user);
  const createUserResponse = await createUser(user)
  res.json(createUserResponse)
})

app.listen(8080, () => {
  console.log("Server running on port 8080")
})
