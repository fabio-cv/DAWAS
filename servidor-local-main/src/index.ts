import express, { type Request, type Response } from "express";
import { router as servicoRouter } from "./routes/servico.route.js";
import { router as usersRouter } from "./routes/user.route.js";
import { router as prestadorRouter } from "./routes/prestador.route.js";
import { router as orcamentoRouter } from "./routes/orcamento.route.js";
import { router as propostaRouter } from "./routes/proposta.route.js";
import { router as prestacaoServicoRouter } from "./routes/prestacaoServico.route.js";
import { swaggerSpec } from "./docs/swagger.js";
import swaggerUi from "swagger-ui-express"

const app = express();
app.use(express.json());

app.use("/servicos", servicoRouter);
app.use("/users", usersRouter);
app.use("/prestadores", prestadorRouter);
app.use("/orcamentos", orcamentoRouter);
app.use("/propostas", propostaRouter);
app.use("/prestacoes-servico", prestacaoServicoRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
