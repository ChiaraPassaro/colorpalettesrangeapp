<template>
  <Layout :id="id" :colors="colors">
    <template #header>
      <h2 class="app__content__header__title">{{ name }}</h2>
    </template>
    <template #main>
      <div class="wheel">
        <Chart v-bind:options="options" v-bind:chart-data="datacollection" />
      </div>
    </template>
  </Layout>
</template>

<script>
import Palette from "@/layouts/Palette";
import Chart from "@/components/Chart";

export default {
  name: "PaletteWheel.vue",
  components: { Layout: Palette, Chart },
  props: ["id"],
  data() {
    return {
      datacollection: {},
      options: {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          enabled: true,
        },
        legend: {
          display: false,
        },
      },
    };
  },
  computed: {
    palette() {
      return this.$store.state.pages[this.id];
    },
    colors() {
      return this.$store.state.pages[this.id].colors;
    },
    name() {
      return this.$store.state.schemas.find((element) => element.id === this.id)
        .name;
    },
  },
  methods: {
    fillChart() {
      const degrees = []; //gradi
      const colorsLabel = []; //label

      for (let i = 0; i < 360; i++) {
        //ad ogni grado inserisco un valore 1 per riuscire a mostrare i colori
        degrees.push(1);
        //per ogni grado inserisco una label
        if (this.page === "monochrome") {
          //la palette monochromo ha un comportamento diverso
          colorsLabel.push(
            "hsl(" + this.$store.state.baseColor.degree + ", 50%, 50%, 0.2)"
          );
        } else {
          colorsLabel.push("hsl(" + i + ", 50%, 50%, 0.2)");
        }
      }

      //vado a sostituire i gradi in cui ho generato il colore
      for (let i = 0; i < this.colors.length; i++) {
        let degree = this.colors[i].getHue(); //prendo il grado dal colore

        if (this.id === "monochrome") {
          degree = i * 2; // questa palette è diversa
        }

        let stepDegree = 30; //step base per palette senza form

        if (this.palette.form) {
          stepDegree = this.palette.form.data.stepDegree
            ? this.palette.form.data.stepDegree.value
            : this.palette.form.data.numColor.value / this.colors.length;
        }

        degrees[degree] = stepDegree; //inserisco la grandezza della fetta
        colorsLabel[degree] = this.colors[i].printHsl(); //inserisco la label completa
      }

      this.datacollection = {
        datasets: [
          {
            data: degrees,
            backgroundColor: colorsLabel,
            borderWidth: 0,
          },
        ],
        labels: colorsLabel,
      };
    },
  },
  created() {
    this.fillChart();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.$store.state.pages[vm.id].colors.length === 0) {
        next({ name: "Palette" });
      }
    });
  },
};
</script>
<style lang="scss"></style>
