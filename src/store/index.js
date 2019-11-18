import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
      {
        id: '0',
        email: 'imthere@gmail.com',
        name: 'Cherniy Chelovek',
        company: 'Tlen',
        designation: 'Software Developer',
        avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=d5849d81af587a09dbcf3f11f6fa122f',
      },
      {
        id: '1',
        email: 'paveltiguntsev@gmail.com',
        name: 'Pavel Tiguntsev',
        company: 'Xbay',
        designation: 'Software Developer',
        avatar: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t1.0-1/p240x240/36034635_1834959593466519_8735260836299276288_o.jpg?_nc_cat=105&cachebreaker=hd&_nc_oc=AQlAX0soEjlSpRkhT9sgPHzZmV32HDVfwDH39ruWD_w-hpDdTPK12E1wuwt3CDjLdvA&_nc_ht=scontent-sjc3-1.xx&oh=5547136e6f0d07fcf15b362aaa10bd77&oe=5E58C93F',
      },
      {
        id: '2',
        email: 'manager@gmail.com',
        name: 'Jeremy Lastname',
        company: 'Xbay',
        designation: 'Manager',
        avatar: 'https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80',
      },
      {
        id: '3',
        email: 'shruti.jogi@infrrd.ai',
        name: 'Shruti Jogi',
        company: 'Infrrd',
        designation: 'HR Specialist',
        avatar: 'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=3759e09a5b9fbe53088b23c615b6312e',
      },
    ],
  },
  mutations: {
    ADD_USER: (state, data) => {
      state.users.push(data);
    },
    WRITE_USER: (state, newData) => {
      state.users = state.users.map((user) => {
        if (user.id === newData.id) {
          return newData;
        }
        return user;
      });
    },
    DELETE_USER: (state, id) => {
      const index = state.users.findIndex(user => user.id === id);
      state.users.splice(index, 1);
    },
  },
  actions: {
    addUser({ commit }, user) {
      commit('ADD_USER', user);
    },
    deleteById({ commit }, id) {
      commit('DELETE_USER', id);
    },
    updateUser({ commit }, newData) {
      commit('WRITE_USER', newData);
    },
  },
});
