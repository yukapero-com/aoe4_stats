<template>
  <v-app dark>
    <!--    <v-navigation-drawer-->
    <!--      v-model="drawer"-->
    <!--      :mini-variant="miniVariant"-->
    <!--      :clipped="clipped"-->
    <!--      fixed-->
    <!--      app-->
    <!--    >-->
    <!--      <v-list>-->
    <!--        <v-list-item-->
    <!--          v-for="(item, i) in items"-->
    <!--          :key="i"-->
    <!--          :to="item.to"-->
    <!--          router-->
    <!--          exact-->
    <!--        >-->
    <!--          <v-list-item-action>-->
    <!--            <v-icon>{{ item.icon }}</v-icon>-->
    <!--          </v-list-item-action>-->
    <!--          <v-list-item-content>-->
    <!--            <v-list-item-title v-text="item.title" />-->
    <!--          </v-list-item-content>-->
    <!--        </v-list-item>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      src="/img/medieval_clipped.jpg"
      color="black"
      dark
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->
      <v-toolbar-title
        class="pr-6"
        v-text="title"
        style="text-overflow: initial;"
      />
      <v-spacer/>
      <v-tabs
        v-model="tab"
        align-with-title
      >
        <v-tabs-slider color="yellow"></v-tabs-slider>

        <v-tab
          v-for="item in tabItems"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt/>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>
        &copy; {{ new Date().getFullYear() }}
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-line',
          title: 'ELO Chart',
          to: '/'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'AoE4 Stats',

      tab: null,
      tabItems: [
        'ELO Log',
      ],
    }
  }
}
</script>
