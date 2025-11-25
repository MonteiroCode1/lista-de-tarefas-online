// script.js
const { createApp } = Vue

createApp({
  data() {
  return {
    novaTarefa: "",
    novoHorario: "",
    tarefas: [],
    temaEscuro: false
    }
  },
  methods: {
    // Limpar todas as tarefas
  limparTudo() {
    if (confirm("Tem certeza que deseja apagar TODAS as tarefas?")) {
      this.tarefas = []
      this.salvarTarefas()
    }
  },

    trocarTema() {
      this.temaEscuro = !this.temaEscuro

      // aplica a classe no body
      document.body.classList.toggle("dark", this.temaEscuro)

      // salva no localStorage
      localStorage.setItem("temaEscuro", this.temaEscuro)
    },
    
    adicionarTarefa() {
    const texto = this.novaTarefa.trim()

    if (texto !== "" && this.novoHorario !== "") {

      this.tarefas.push({
      texto,
      concluida: false,
      horario: this.novoHorario.replace("T", " às ")
      })
      this.novaTarefa = ""
      this.novoHorario = ""
      this.salvarTarefas()
      }
    },

    // Remover uma tarefa pelo índice
    removerTarefa(index) {
      this.tarefas.splice(index, 1)
      this.salvarTarefas()
    },

    // Editar uma tarefa
    editarTarefa(index) {
      const novoTexto = prompt("Editar tarefa:", this.tarefas[index].texto)
      if (novoTexto !== null && novoTexto.trim() !== "") {
        this.tarefas[index].texto = novoTexto.trim()
        this.salvarTarefas()
      }
    },

    // Salvar no LocalStorage
    salvarTarefas() {
      localStorage.setItem("tarefas", JSON.stringify(this.tarefas))
    },

    // Carregar do LocalStorage ao iniciar
    carregarTarefas() {
      const dados = localStorage.getItem("tarefas")
      if (dados) {
        this.tarefas = JSON.parse(dados)
      }
    }
  },
  mounted() {
    this.carregarTarefas()
  }
}).mount("#app")
