const app = Vue.createApp({
  data() {
    return {
      lamparas: [],
      lamparasFiltradas: [],
      checkboxes: [],
      checkboxSelected: [],
      searchValue: "",
      contenedorLampara: [],
    }
  },
  created() {
    this.lamparas.push('Lamoaras')

    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        this.lamparas = data.Lamparas
        this.lamparasFiltradas = this.lamparas
        let arrayCard = data.Lamparas
        this.getCheckboxes()
        if (document.title == "Tienda de lámparas industriales") {
          this.lamparasFiltradas = this.lamparas.filter(
            (lampara) => lampara.tipo !== this.lamparas.tipo
          );
          this.lamparas = this.lamparasFiltradas;
          console.log(this.lamparas);
        }
        if (document.title == "Detalle de lampara") {
          let cardId = location.search.split('?id=').join('')
          this.contenedorCard = arrayCard.filter((card) => card._id == cardId)
        }
      })
      .catch((error) => console.log(error))
  },
  mounted() { },
  methods: {

    searchBarFilter(arrayDatos) {
      this.lamparasFiltradas = arrayDatos.filter((lampara) =>
        lampara.tipo.toLowerCase().includes(this.searchValue.toLowerCase())
      );
    },
    getCheckboxes() {
      this.checkboxes = this.lamparasFiltradas.map((lampara) => lampara.tipo);
      this.checkboxes = new Set(this.checkboxes);
      console.log(this.checkboxes);
    },

  },
  computed: {

    buscador() {
      if (this.checkboxSelected.length != 0) {
        this.lamparasFiltradas = this.lamparas.filter((lampara) => {
          return this.checkboxSelected.includes(lampara.tipo);
        });
      } else {
        this.lamparasFiltradas = this.lamparas;
      }

      if (this.searchValue != "") {
        this.searchBarFilter(this.lamparasFiltradas);
      }

    },

  },
}).mount('#app')

