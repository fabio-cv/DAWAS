import "dotenv/config"
import express, { type Request, type Response } from "express"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@as-integrations/express5"
import { router as serviceRouter }    from "./routes/servico.route.js"
import { router as orcamentoRouter }  from "./routes/orcamento.route.js"
import { router as prestadorRouter }  from "./routes/prestador.route.js"
import { router as userRouter }       from "./routes/user.route.js"
import { router as propostaRouter }   from "./routes/proposta.route.js"
import { router as prestacaoRouter }  from "./routes/prestacaoServico.route.js"
import { swaggerSpec }                from "./docs/swagger.js"
import swaggerUi                      from "swagger-ui-express"
import { typeDefs, resolvers }        from "./graphql/index.js"

const app = express()
app.use(express.json())

// API routes
app.use("/service",   serviceRouter)
app.use("/orcamento", orcamentoRouter)
app.use("/prestador", prestadorRouter)
app.use("/user",      userRouter)
app.use("/proposta",  propostaRouter)
app.use("/prestacao", prestacaoRouter)

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
})

async function startServer() {
    try {
        await server.start()
        
        app.use("/graphql", expressMiddleware(server))
        
        app.get("/", (_req: Request, res: Response) => {
            res.json({ status: "ok", message: "Marketplace API a funcionar", docs: "/docs", graphql: "/graphql" })
        })

        const PORT = process.env.PORT ?? 8080
        app.listen(PORT, () => {
            console.log(`✅ Servidor a correr em http://localhost:${PORT}`)
            console.log(`📚 Documentação Swagger em http://localhost:${PORT}/docs`)
            console.log(`🚀 GraphQL em http://localhost:${PORT}/graphql`)
        })
    } catch (error) {
        console.error("❌ Erro ao iniciar o servidor:", error)
        process.exit(1)
    }
}

startServer()