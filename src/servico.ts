interface ServicoType {
    nome: String,
    precoHora: number,
    categoria: String,
    minimoDesconto: number,
    percentagemDesconto: number,

}

let catalogoServicos: ServicoType[] = [
    {
        nome: "servicoTeste1",
        precoHora: 12.0,
        categoria: "categoriaTeste1",
        minimoDesconto: 4.0,
        percentagemDesconto: 5.3
    },
    {
        nome: "servicoTeste2",
        precoHora: 8.0,
        categoria: "categoriaTeste2",
        minimoDesconto: 12.0,
        percentagemDesconto: 8.0
    },

    {
        nome: "servicoTeste3",
        precoHora: 18.0,
        categoria: "categoriaTeste3",
        minimoDesconto: 2.0,
        percentagemDesconto: 3.3
    }
]


function adicionarServico(servico: ServicoType) {
    if (!servico.nome || servico.precoHora <= 0) {
        return "O nome do serviço precisa existir e o preço ser maior que 0";
    }

    for (const s of catalogoServicos) {
        if (s.nome === servico.nome) {
            return `O serviço com nome ${servico.nome} já existe`;
        }
    }

    catalogoServicos.push(servico);
    return `Serviço com nome: ${servico.nome} adicionado com sucesso`;
}