<template>
  <v-list-item>
    <v-list-item-title>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ _title }}</span>
        </template>
        <span>{{ _title }}</span>
      </v-tooltip>
    </v-list-item-title>

    <v-list-item-icon>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">{{ _icon }}</v-icon>
        </template>
        <span>{{ _tooltip }}</span>
      </v-tooltip>
    </v-list-item-icon>

    <v-list-item-subtitle class="text-right">{{ _value }}</v-list-item-subtitle>
  </v-list-item>
</template>
<script>
export default {
  name: "WeatherCardItem",
  computed: {
    _title: function () {
      return this.type.title ?? "Title";
    },
    _icon: function () {
      return this.type.icon ?? "mdi-baby-face";
    },
    _tooltip: function () {
      return this.type.tooltip ?? this._title;
    },
    _value: function () {
      return this.type.value ?? "Value";
    },
  },
  props: {
    type: {
      title: String,
      icon: String,
      tooltip: String,
      value: String,
    },
  },
};
</script>