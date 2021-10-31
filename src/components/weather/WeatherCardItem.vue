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

    <v-list-item-icon v-if="_icon !== null">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on">{{ _icon }}</v-icon>
        </template>
        <span>{{ _tooltip }}</span>
      </v-tooltip>
    </v-list-item-icon>

    <v-list-item-subtitle class="text-right">
      {{ _value }}

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on">{{ _unit }}</span>
        </template>
        <span>{{ _unit }}</span>
      </v-tooltip>
    </v-list-item-subtitle>
  </v-list-item>
</template>
<script>
export default {
  name: "WeatherCardItem",
  computed: {
    _title: function() {
      return this.type.title ?? "Title";
    },
    _icon: function() {
      return typeof this.type.icon !== "undefined" && this.type.icon !== ""
        ? this.type.icon
        : null;
    },
    _tooltip: function() {
      return this.type.tooltip ?? this._title;
    },
    _unit: function () {
      return this.type.unit ?? "";
    },
    _value: function () {
      return typeof this.type.value !== "undefined" && this.type.value !== ""
        ? this.type.value
        : "n.d.";
    },
  },
  props: {
    altro: String,
    type: {
      title: String,
      icon: String,
      tooltip: String,
      unit: String,
      value: String,
    },
  },
};
</script>
