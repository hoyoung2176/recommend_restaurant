<template>
  <v-container>
    <p>crolling TEST</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      };
  },
  methods: {
    placeJson: function() {
      const request = require("request");
      const cheerio = require("cheerio");
      const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
      const placeURI ="https://www.google.com/search?q=갈마동+맛집&npsic=0&rflfq=1&rlha=0&rllag=36350016,127371409,330&tbm=lcl&ved=2";
      const URL = PROXY_URL + placeURI;

        let krDay = '';

      request(URL, (error, response, body) => {
        if (error) throw error;
        let $ = cheerio.load(body); //cheerio를 이용해 $ 변수에 담는 부분.
         try {
          $('div').find('div').each(function (index, elem) {
              krDay = $(this).find('div').find('span').text().trim();
              console.log(`${krDay}`);
          });
        } catch (error) {
          console.error(error);
        }
      });
    }
  },
  components: {
  },
  mounted: function() {
    this.placeJson();
  }
};
</script>