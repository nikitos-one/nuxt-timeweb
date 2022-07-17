export const state = () => ({
  users: [],
  serverTypes: []
})

export const mutations = {
  setUsers(state, users) {
    state.users = users
  },
  setServerTypes(state, serverTypes) {
    state.serverTypes = serverTypes
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.editedIndex], payload.editedItem)
  }
}

export const actions = {
  fetch({commit}) {
    const users = [
      {
        customer_id: 'user1',
        server_name: 'server7',
        server_type: 'vds'
      },
      {
        customer_id: 'user5',
        server_name: 'server2',
        server_type: 'dedicated'
      },
      {
        customer_id: 'user3',
        server_name: 'server4',
        server_type: 'hosting'
      },
    ]
    commit('setUsers', users)

    /* Заполняем список типов серверов для select'a */
    let server_types = [];
    users.map(item => {
      server_types.push(item['server_type']);
    })
    commit('setServerTypes', server_types)
  },
}

export const getters = {
  users: s => s.users,
  serverTypes: s => s.serverTypes
}
