<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="search-bar">
    <div class="search">
      <div class="input-wrapper">
        <input
          id="suggest"
          v-model="search"
          type="text"
          @change="searchInput"
        />
        <div class="geo-ip" @click="searchMe">
          <svg
            width="30px"
            height="30px"
            viewBox="0 0 20 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g
                transform="translate(-745.000000, -308.000000)"
                fill="#3b404b"
                fill-rule="nonzero"
              >
                <g transform="translate(128.000000, 126.000000)">
                  <g transform="translate(0.000000, 168.000000)">
                    <g transform="translate(327.000000, 0.000000)">
                      <path
                        d="M300,20.6666667 C298.158333,20.6666667 296.666667,22.1583333 296.666667,24 C296.666667,25.8416667 298.158333,27.3333333 300,27.3333333 C301.841667,27.3333333 303.333333,25.8416667 303.333333,24 C303.333333,22.1583333 301.841667,20.6666667 300,20.6666667 Z M307.45,23.1666667 C307.066667,19.6916667 304.308333,16.9333333 300.833333,16.55 L300.833333,14.8333333 L299.166667,14.8333333 L299.166667,16.55 C295.691667,16.9333333 292.933333,19.6916667 292.55,23.1666667 L290.833333,23.1666667 L290.833333,24.8333333 L292.55,24.8333333 C292.933333,28.3083333 295.691667,31.0666667 299.166667,31.45 L299.166667,33.1666667 L300.833333,33.1666667 L300.833333,31.45 C304.308333,31.0666667 307.066667,28.3083333 307.45,24.8333333 L309.166667,24.8333333 L309.166667,23.1666667 L307.45,23.1666667 Z M300,29.8333333 C296.775,29.8333333 294.166667,27.225 294.166667,24 C294.166667,20.775 296.775,18.1666667 300,18.1666667 C303.225,18.1666667 305.833333,20.775 305.833333,24 C305.833333,27.225 303.225,29.8333333 300,29.8333333 Z"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div class="btn search-btn btn-primary" @click="searchInput">Найти</div>
    </div>

    <div class="filter">Фильтрация</div>
  </div>
  <div class="template-list-wrap">
    <div class="list-items">
      <div class="list-item" v-for="item in items" :key="item">
        <div class="list-item__head">
          {{ item.practiceGroupList }}
          <div class="list-item__name">
            {{ item.name }}
          </div>
          <div class="list-item__distance">{{ item.distance }}</div>
        </div>
        <div class="list-item__main">
          {{ item.address1 }}
          {{ item.city }}
          {{ item.region }}
        </div>
        <div class="list-item__number">
          <div
            class="list-item__number-show"
            v-if="!item.show"
            @click="item.show = true"
          >
            Показать номер телефона
          </div>
          <div class="list-item__number-content" v-if="item.show">
            {{ item.phone }}
          </div>
        </div>
        <router-link :to="'/list/' + item.identifier" class="list-item__more"
          >подробнее</router-link
        >
        <a :href="'tel:' + item.phone" class="list-item__call btn btn-secondary"
          >Позвонить сейчас</a
        >
      </div>
    </div>
    <div class="map" id="map" style="width: 1000px; height: 700px">
      <yandex-map v-model:coords="coords" :zoom="13">
        <ymap-marker
          v-for="(item, idx) in items"
          :key="item"
          :coords="[item.position.lat, item.position.lng]"
          :marker-id="idx"
          :hint-content="'<h3>' + item.name + '</h3>' + item.address1"
        />
      </yandex-map>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { loadYmap, yandexMap, ymapMarker } from "vue-yandex-maps";
import VueGeolocation from "vue-browser-geolocation";
// import ymaps from "ymaps";
export default {
  components: { yandexMap, ymapMarker },

  data: function () {
    return {
      coords: localStorage.getItem("coords").split(",") ?? [50, 50],
      items: [],
      suggestView: {},
      search: "",
    };
  },
  async mounted() {
    // console.log(yandexMap);
    const settings = {
      apiKey: "bb72a44c-30ae-4a0b-8fc6-5681233e185b",
      apikey: "bb72a44c-30ae-4a0b-8fc6-5681233e185b",
      lang: "ru_RU",
      coordorder: "latlong",
      enterprise: true,
      version: "2.1",
    };

    // let ymaps = await loadYmap({ settings, debug: true });
    await loadYmap({ ...settings, debug: true }); //.then(function () {
    // console.log(ymaps);
    console.log(window.ymaps.SuggestView);
    this.suggestView = new window.ymaps.SuggestView("suggest");
    console.log(this.suggestView);
    this.suggestView.events.add("select", (e) => {
      this.search = e.get("item").value;
      console.log(this.search);
      this.searchInput();
    });
    this.searchF();
    // });

    // console.log(ymapMarker)s;
  },

  methods: {
    test() {
      console.log("test");
    },

    showMore() {
      axios({
        method: "post",
        url: "https://locator-api.ecplocator-v2.net/api/practice/search",
        data: {
          apptDateTime: "2022-04-20T12:56",
          searchType: "EXAM",
          locatorKey: "essilor_ru",
          sessionId: "session8713.783009734934",
          distance: 200,
          latitude: this.coords[0],
          longitude: this.coords[1],
          insurance: "Private Pay Only",
          filters: [
            {
              isMultiSelect: false,
              key: "brands",
              values: "varilux",
            },
            { brands: "varilux" },
            { practiceGroupList: "varilux" },
            { practice: "varilux" },
          ],
          skip: 0,
          limit: 10,
          zipCode: this.search,
          unitOfMeasurement: "KM",
          tenantFilters: {},
        },
      }).then((msg) => {
        console.log(msg);
        this.items = msg.data.practices;
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].show = false;
        }
      });
    },

    searchF() {
      console.log("searchf");
      axios({
        method: "post",
        url: "https://locator-api.ecplocator-v2.net/api/practice/search",
        data: {
          apptDateTime: "2022-04-20T12:56",
          searchType: "EXAM",
          locatorKey: "essilor_ru",
          sessionId: "session8713.783009734934",
          distance: 200,
          latitude: this.coords[0],
          longitude: this.coords[1],
          insurance: "Private Pay Only",
          filters: [],
          skip: 0,
          limit: 10,
          zipCode: this.search,
          unitOfMeasurement: "KM",
          tenantFilters: {},
        },
      }).then((msg) => {
        console.log(msg);
        this.items = msg.data.practices;
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].show = false;
        }
      });
    },

    searchMe: function () {
      VueGeolocation.getLocation().then((c) => {
        this.coords = [c.lat, c.lng];
        localStorage.setItem("coords", this.coords);
        this.searchF();
      });
    },

    searchInput: function () {
      // let myGeocoder = window.ymaps.geocode(this.search);
      console.log("searchInput");
      console.log(
        "https://geocode-maps.yandex.ru/1.x/?apikey=bb72a44c-30ae-4a0b-8fc6-5681233e185b&format=json&geocode=" +
          this.search
      );
      axios({
        method: "get",
        url:
          "https://geocode-maps.yandex.ru/1.x/?apikey=bb72a44c-30ae-4a0b-8fc6-5681233e185b&format=json&geocode=" +
          this.search,
      }).then(
        (res) => {
          console.log("geo res");
          console.log(this.coords);
          console.log(res);
          try {
            console.log(
              res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
                " "
              )
            );
            this.coords =
              res.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
                " "
              );
            this.coords.reverse();
            localStorage.setItem("coords", this.coords);

            console.log(this.coords);
            this.searchF();
          } catch (error) {
            console.log(error);
          }
        },
        function (err) {
          console.log(err);
        }
      );
    },
  },
};
</script>
