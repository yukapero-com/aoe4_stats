<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-text>
          <v-text-field
            solo
            label="AoE4のユーザー名で検索"
            prepend-inner-icon="mdi-account-search"
            hide-details
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({

  }),
  created() {
    console.log("hello");
  }
}
</script>
