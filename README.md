<!DOCTYPE html>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Healthcare Tec - Soluções Hospitalares</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <header>
        <div class="logo">
            <img=logo.png alt="Healthcare Tec" width="180">
        </div>
        <nav>
            <a href="#sobre">Sobre</a>
            <a href="Fluxo.html">Diagrama Interativo</a>
            <a href="#servicos">Serviços</a>
            <a href="#tecnologia">Tecnologia</a>
            <a href="#contato">Contato</a>
        </nav>
    </header>

    <section class="hero">
        <h1>Transformando Hospitais com Tecnologia e Inovação</h1>
        <p>Da ideação à operacão, oferecemos soluções para otimizar processos e reduzir custos.</p>
        <a href="#contato" class="btn">Fale Conosco</a>
    </section>

    <section id="sobre" class="container">
        <h2>Sobre Nós</h2>
        <p>Somos especialistas em consultoria hospitalar, aplicando tecnologia para otimizar fluxos, reduzir custos e garantir eficiência operacional.</p>
    </section>

    <section id="diagrama" class="container">
        <h2>Diagrama Interativo</h2>
        
        <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        #network {
            width: 90%;
            height: 33vh; /* 1/3 of screen height */
            margin: auto;
            border: 1px solid lightgray;
        }
        .controls {
            margin-top: 10px;
        }
        button {
            margin: 5px;
            padding: 10px;
            cursor: pointer;
        }
        input {
            width: 200px;
            padding: 5px;
        }
    </style>

    <h2>Diagrama Interativo - HealthCare Technologies</h2>
    <div id="network"></div>

    <div class="controls">
        <input type="text" id="nodeText" placeholder="Enter text for new rectangle">
        <button id="addNodeBtn">➕ Addicionar/ Retângulo  </button> 
        <button id="exportBtn">📤 Exportar CSV</button>
    </div>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            let nodeIdCounter = 3; // Start from 3 since two nodes exist
            let edgeIdCounter = 1;
            let nodes = new vis.DataSet([
                { id: 1, label: "Início", shape: "box" },
                { id: 2, label: "Fim", shape: "box" }
            ]);

            let edges = new vis.DataSet([
                { id: edgeIdCounter++, from: 1, to: 2, arrows: "to" }
            ]);

            let container = document.getElementById("network");
            let data = { nodes: nodes, edges: edges };
            let options = {
                physics: false,  
                interaction: { dragNodes: true }, 
                manipulation: {
                    enabled: true,  
                    addEdge: function (data, callback) {
                        if (data.from !== data.to) {
                            data.arrows = "to";
                            callback(data);
                        }
                    }
                }
            };

            let network = new vis.Network(container, data, options);

            document.getElementById("addNodeBtn").addEventListener("click", function() {
                let text = document.getElementById("nodeText").value || "New Node";
                nodes.add({ id: nodeIdCounter++, label: text, shape: "box" });
            });


            document.getElementById("exportBtn").addEventListener("click", function() {
                let csvContent = "id,label\n";
                nodes.forEach(node => csvContent += `${node.id},${node.label}\n`);

                csvContent += "\nfrom,to\n";
                edges.forEach(edge => csvContent += `${edge.from},${edge.to}\n`);

                let blob = new Blob([csvContent], { type: "text/csv" });
                let a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "diagrama_healthcare.tec.br_.csv";
                a.click();
            });
        });
    </script>        
    
    </section>

    <section id="servicos" class="container">
        <h2>Nossos Serviços</h2>
        <ul>
            <li>✔ Ideação e Viabilidade de Projetos Hospitalares</li>
            <li>✔ Planejamento e Organização da Operação</li>
            <li>✔ Otimização de Fluxos e Redução de Custos</li>
            <li>✔ Implementação de Soluções Tecnológicas</li>
        </ul>
    </section>

    <section id="tecnologia" class="container">
        <h2>Uso de Tecnologia</h2>
        <p>Utilizamos inteligência de dados, simulações e automação para melhorar a gestão hospitalar e a experiência do paciente.</p>
    </section>

    <section id="contato" class="container">
        <h2>Entre em Contato</h2>
        <p>Quer saber mais sobre nossas soluções? Entre em contato conosco.</p>
        <a href="mailto:cadastro@outlook.com" class="btn">Enviar E-mail</a>
    </section>

    <footer>
        <p>&copy; 2025 Healthcare Tec. Todos os direitos reservados.</p>
    </footer>

</body>
</html>
