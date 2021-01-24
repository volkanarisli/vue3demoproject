<template>
  <div class="user-profile">
    <div>
      <div class="user-profile__user-panel">
        <h1 class="user-profile__username">@{{ state.user.username }}</h1>
        <div class="user-profile__admin-badge" v-if="state.user.isAdmin">
          Admin
        </div>
        <div class="user-profile__follower-count">
          <strong>Followers: </strong> {{ state.followers }}
        </div>
      </div>
      <create-twoot-panel @add-twoot="createNewTwoot" />
    </div>
    <div class="user-profile__twoots-wrapper">
      <twoot-item
        v-for="twoot in state.user.twoots"
        :key="twoot.id"
        :twoot="twoot"
        :username="state.user.username"
      />
    </div>
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { users } from "@/assets/users";
import TwootItem from "@/components/TwootItem.vue";
import CreateTwootPanel from "@/components/CreateTwootPanel.vue";
export default {
  name: "App",
  components: {
    TwootItem,
    CreateTwootPanel,
  },
  setup() {
    const route = useRoute();
    const userId = computed(() => route.params.userId);

    const state = reactive({
      followers: 0,
      user: users[userId.value - 1] || users[0],
    });
    function createNewTwoot(newTwoot) {
      state.user.twoots.unshift({
        id: state.user.twoots.length + 1,
        content: newTwoot,
      });
    }

    return {
      state,
      createNewTwoot,
      userId,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 50px;
  padding: 50px 5%;
  .user-profile__user-panel {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #dfe3e8;
    margin-bottom: auto;
    h1 {
      margin: 0;
    }
    .user-profile__admin-badge {
      background: rebeccapurple;
      color: white;
      border-radius: 5px;
      margin-right: auto;
      padding: 0 10px;
      font-weight: bold;
    }
  }
  .user-profile__create-twoot {
    margin-top: 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    textarea {
      border: 1px solid #dfe3e8;
      border-radius: 5px;
    }
    .create-twoot-panel__submit {
      display: flex;
      justify-content: space-between;
      .create-twoot-type {
        padding: 10px 0;
      }
      button {
        padding: 5px 20px;
        margin: auto 0;
        border-radius: 5px;
        border: none;
        background-color: deeppink;
        color: white;
        font-weight: bold;
      }
    }
    &.--exceeded {
      color: red;
      border-color: red;
      .create-twoot-panel__submit {
        button {
          background-color: red;
          color: white;
        }
      }
    }
  }
  .user-profile__twoots-wrapper {
    display: grid;
    grid-gap: 10px;
    margin-bottom: auto;
  }
}
</style>
