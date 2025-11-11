// script.js
const { createApp } = Vue

createApp({
  data() {
    return {
      novaTarefa: "",
      tarefas: []
    }
  },
  methods: {
    // Adicionar uma nova tarefa
    adicionarTarefa() {
      const texto = this.novaTarefa.trim()
      if (texto !== "") {
        this.tarefas.push({ texto, concluida: false })
        this.novaTarefa = ""
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
