<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <div class="container">
    <div class="item-page">
      <div class="item-page__row">
        <div class="item-page__left">
          <router-link to="../list">К списку</router-link>
          <div class="item-page__title">
            <h2>
              {{ practice.name }}
            </h2>
          </div>

          <div class="item-page__list">
            <div class="item-page__list-item">
              <svg
                width="14px"
                height="20px"
                viewBox="0 0 14 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <path
                    d="M7,4 C3.13,4 0,7.13 0,11 C0,16.25 7,24 7,24 C7,24 14,16.25 14,11 C14,7.13 10.87,4 7,4 L7,4 Z M7,13.5 C5.62,13.5 4.5,12.38 4.5,11 C4.5,9.62 5.62,8.5 7,8.5 C8.38,8.5 9.5,9.62 9.5,11 C9.5,12.38 8.38,13.5 7,13.5 L7,13.5 Z"
                    id="path-pin"
                  ></path>
                </defs>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g transform="translate(-131.000000, -586.000000)">
                    <g transform="translate(128.000000, 516.000000)">
                      <g transform="translate(3.000000, 66.000000)">
                        <g>
                          <mask id="mask-pin" fill="white">
                            <use xlink:href="#path-pin"></use>
                          </mask>
                          <use fill="#3b404b" xlink:href="#path-pin"></use>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <div class="item-page__list-content">
                {{ practice.address1 }}
                {{ practice.city }}
                {{ practice.region }}
              </div>
            </div>
            <div class="item-page__list-item">
              <svg
                width="18px"
                height="18px"
                viewBox="0 0 18 18"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <path
                    d="M3.62,7.79 C5.06,10.62 7.38,12.93 10.21,14.38 L12.41,12.18 C12.68,11.91 13.08,11.82 13.43,11.94 C14.55,12.31 15.76,12.51 17,12.51 C17.55,12.51 18,12.96 18,13.51 L18,17 C18,17.55 17.55,18 17,18 C7.61,18 0,10.39 0,1 C0,0.45 0.45,0 1,0 L4.5,0 C5.05,0 5.5,0.45 5.5,1 C5.5,2.25 5.7,3.45 6.07,4.57 C6.18,4.92 6.1,5.31 5.82,5.59 L3.62,7.79 L3.62,7.79 Z"
                    id="path-phone"
                  ></path>
                </defs>
                <g
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g transform="translate(-129.000000, -746.000000)">
                    <g transform="translate(128.000000, 516.000000)">
                      <g transform="translate(1.000000, 226.000000)">
                        <g transform="translate(0.000000, 4.000000)">
                          <mask id="mask-phone" fill="white">
                            <use xlink:href="#path-phone"></use>
                          </mask>
                          <use fill="#3b404b" xlink:href="#path-phone"></use>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>

              <div class="item-page__list-content">
                <div
                  class="item-page__phone"
                  v-if="!showPhone"
                  @click="showPhone = true"
                >
                  Показать телефон
                </div>
                <div class="item-page__phone" v-if="showPhone">
                  {{ practice.phone }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="item-page__right">
          <a
            :href="'tel:' + practice.phone"
            class="list-item__call btn btn-secondary"
            >Позвонить сейчас</a
          >
        </div>
      </div>

      <div class="item-page__map" v-if="practice.position">
        <div class="map-title">Посмотреть на карте</div>
        <yandex-map
          :coords="[practice.position.lat, practice.position.lng]"
          :zoom="14"
        >
          <ymap-marker
            :coords="[practice.position.lat, practice.position.lng]"
            marker-id="123"
            :hint-content="practice.address1"
          />
        </yandex-map>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  components: { yandexMap, ymapMarker },
  props: {
    id: String,
  },

  mounted: function () {
    axios({
      method: "get",
      url:
        "https://locator-api.ecplocator-v2.net/api/practice/essilor_ru/" +
        this.id,
    }).then((msg) => {
      console.log(msg);
      this.practice = msg.data.practice;
    });
  },
  data: function () {
    return {
      practice: {},
      showPhone: false,
    };
  },
};
</script>
