<template>
  <div>
    <v-container class="mt-6">
      <v-row>
        <v-col cols="12"
               md="6"
               sm="12">
          <v-data-table v-if="users.length"
                        :headers="headers"
                        :items="users"
                        show-select
                        :single-select="true"
                        item-key="customer_id"
                        hide-default-footer
                        class="elevation-1"
                        :mobile-breakpoint="0"
                        @click:row="rowClick"
                        v-model="selectedRows"
          ></v-data-table>
        </v-col>
        <v-col cols="12"
               md="6"
               sm="12">
          <v-card
            class="mx-auto"
            max-width="500"
          >
            <v-card-text class="text-center">
              <div class="mb-6">{{ editedItem['customer_id'] || 'Выберите клиента из списка для редактирования' }}</div>

              <v-select
                :disabled="!editedItem['customer_id'] || editedItem['customer_id'] === ''"
                v-model="editedItem['server_type']"
                :items="serverTypes"
                label="Тип сервера"
                outlined
              ></v-select>

              <v-text-field
                :disabled="!editedItem['customer_id'] || editedItem['customer_id'] === ''"
                v-model="editedItem['server_name']"
                label="Имя сервера"
                hide-details="auto"
                outlined
              ></v-text-field>

              <v-btn
                depressed
                color="primary"
                class="mt-6"
                @click="saveUser"
              >
                Сохранить
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  /* Отправляем запрос в store для получения информации о клиентах */
  async fetch({store}) {
    if (store.getters['users/users'].length === 0) {
      await store.dispatch('users/fetch')
    }
  },
  data: () => ({
    /* Информация о выбранном клиенте */
    selectedRows: [],
    /* Пустые значения для первичного заполнения формы редактирования */
    editedItem: {
      customer_id: '',
      server_name: '',
      server_type: ''
    },
    /* Заголовки таблицы клиентов */
    headers: [
      {text: 'Клиент', value: 'customer_id'},
      {text: 'Имя сервера', value: 'server_name'},
      {text: 'Тип сервера', value: 'server_type'},
    ],
  }),
  computed: {
    /* Вычисляем данные о клиентах */
    users() {
      return this.$store.getters['users/users']
    },
    /* Вычисляем список типов серверов для select'a */
    serverTypes() {
      return this.$store.getters['users/serverTypes']
    },
  },
  watch: {
    /* Обновляем данные для выбранного клиента */
    selectedRows(val) {
      this.editedIndex = this.users.indexOf(val[0])
      this.editedItem = Object.assign({}, val[0])
    }
  },
  methods: {
    /* Событие нажатия на строку текущего клиента */
    rowClick(item, row) {
      row.select(true);
    },
    /* Сохраняем отредактированные данные о клиенте */
    saveUser() {
      if (this.editedIndex > -1) {
        this.$store.commit('users/updateUser', {
          editedIndex: this.editedIndex,
          editedItem: this.editedItem
        });
      }
    }
  }
}
</script>

<style lang="sass">
// Подсвечиваем выбранную строку таблицы
tr
  &.v-data-table__selected
    background: #1976d2 !important

  &:hover
    cursor: pointer
</style>
