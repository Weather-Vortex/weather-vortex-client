<template>
  <v-data-table
    :headers="headers"
    :items="stations"
    sort-by="name"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My stations</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="indigo"
              small
              fab
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ editFormTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Station name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.position.locality"
                        label="Position"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.authkey"
                        label="Auth Key"
                        :rules="validateAuthKey"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.url"
                        label="Station url"
                        :rules="validateUrl"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <small
                        >Your auth key will be unmodificable after save. You
                        will not be able to retrieve it.
                      </small>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogDelete"
          transition="dialog-bottom-transition"
          width="500"
        >
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to delete this station?
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <small
                      >You will not be able to retrieve it after confirm.
                    </small>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">
                No
              </v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                Yes
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
const server = process.env.VUE_APP_SERVER_URL;

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Station Name",
        align: "start",
        value: "name",
      },
      { text: "Position", value: "position.locality" },
      { text: "Url", value: "url" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    stations: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      position: { locality: "" },
      authkey: "",
      url: "",
    },
    defaultItem: {
      name: "",
      position: { locality: "" },
      authkey: "",
      url: "",
    },
    valid: null,
    validateUrl: [
      (v) => /^(ftp|http|https):\/\/[^ "]+$/.test(v) || "Url value not valid",
    ],
  }),
  computed: {
    editFormTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    validateAuthKey: function () {
      return this.editedIndex === -1
        ? [(v) => v?.length === 32 || "Authkey must have exactly 32 characters"]
        : [
            (v) =>
              !v ||
              v?.length === 0 ||
              v?.length === 32 ||
              "Authkey must have exactly 0 (don't modify) or 32 characters",
          ];
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    // Populate the table
    const user = this.$store.getters.getId;
    if (process.env.NODE_ENV === "production") {
      console.log("User: " + user);
    }
    const url = `${server}/users/${user}/stations`;
    this.$http
      .get(url)
      .then((response) => {
        //popola le stations
        this.stations = response.data.stations;

        this.nameS = this.stations.map((e) => e.name);

        this.id = this.stations.map((e) => e._id);

        this.stations = this.stations.map((mapped) => {
          const idSta = mapped._id;
          const name = mapped.name;
          const authkey = mapped.authKey;
          const position = mapped.position.locality;
          const url = mapped.url;
          mapped._id = idSta;
          mapped.name = name;
          mapped.authKey = authkey;
          mapped.position.locality = position;
          mapped.url = url;
          console.log("mapped is mapped " + mapped, idSta, authkey);
          return mapped;
        });
      })
      .catch((error) => {
        console.error(error.data);
      });
    this.initialize();
  },
  methods: {
    initialize() {
      this.stations = [];
    },
    editItem(item) {
      this.editedIndex = this.stations.indexOf(item);
      this.editedItem = JSON.parse(JSON.stringify(item)); // Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.stations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      let url = `${server}/stations/${this.editedItem._id}`;
      this.$http
        .delete(url, { withCredentials: true })
        .then((response) => {
          if (response.data) {
            // this.stations = response.data.stations;
            this.stations.splice(this.editedIndex, 1);
          }
        })
        .catch((error) => {
          console.error(error.data);
        });
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = JSON.parse(JSON.stringify(this.defaultItem)); // Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    updateStation() {
      // Update a station.
      console.log("Sto id?" + this.editedItem._id);
      let url = `${server}/stations/${this.editedItem._id}`;
      let content = {
        name: this.editedItem.name,
        position: this.editedItem.position,
        url: this.editedItem.url,
      };
      console.log("Contenuto: ", content);
      this.$http
        .put(url, content, { withCredentials: true })
        .then((response) => {
          if (response.data) {
            this.$alert("Data updated correctly.", "Edit", "success").then(
              () => {
                this.name = response.data.name;
              }
            );
          }
        })
        .catch((error) => {
          const title = "<strong>Update</strong>&nbsp;error";
          this.$alert("Update station error", title, "error");
          console.error("error, ", error);
        });

      Object.assign(this.stations[this.editedIndex], this.editedItem);
    },
    createStation() {
      let url = `${server}/stations`;
      console.log("Current edit item:", this.editedItem);
      let content = {
        authKey: this.editedItem.authkey,
        name: this.editedItem.name,
        // owner: this.editedItem.user,
        position: this.editedItem.position,
        url: this.editedItem.url,
      };
      this.$http
        .post(url, content, { withCredentials: true })
        .then((response) => {
          // Created successfully.
          if (response.data) {
            this.$alert(
              "Station added correctly, enjoy our service!",
              "Create Station",
              "success"
            ).then(() => {
              content._id = response.data.saved._id;
              this.stations.push(content);
            });
          }
          // TODO vedere come visualizzare bene posizione
        })
        .catch((error) => {
          console.error(error);
          const title = "<strong>Create</strong>&nbsp;error";
          const errorData = error.response.data;
          let message = "";
          if (
            errorData &&
            errorData.error &&
            errorData.error.internalError &&
            errorData.error.internalError.code
          ) {
            switch (errorData.error.internalError.code) {
              case 11000:
                message =
                  "Another station with the same name alreay exists in database. Choose another identifier for your station.";
                break;
              default:
                message = "Unknown server error.";
                break;
            }
          } else {
            message = "Unknown error.";
          }
          this.$alert(message, title, "error");
        });
    },
    save() {
      if (!this.$refs.form.validate()) {
        this.$alert("Invalid form, check fields", "Error", "error");
        return;
      }

      if (this.editedIndex > -1) {
        this.updateStation();
      } else {
        this.createStation();
      }
      this.close();
    },
  },
};
</script>

<style>
tbody tr:nth-of-type(even) {
  background-color: rgb(189, 230, 230);
}

tbody tr:nth-of-type(odd) {
  background-color: rgb(161, 225, 241);
}

.v-data-table-header {
  background-color: rgb(153, 166, 221);
  color: white;
}

.v-data-footer {
  background-color: rgb(250, 250, 250);
}

.theme--light.v-data-table thead tr th {
  color: white;
}
.v-data-table-header th {
  text-transform: uppercase;
  text-decoration: bold;
}
</style>
