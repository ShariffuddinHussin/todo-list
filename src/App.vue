<template>
  <div id="vueGoalApp">
    <nav class="navbar is-white topNav">
      <div class="container">
        <div class="navbar-brand">
          <h1>{{ watchedAppName }}</h1>
        </div>
      </div>
    </nav>
    <!-- navbar is here -->
    <TheNavbar></TheNavbar>
    <section class="container">
      <div class="columns">
        <div class="column is-3">
          <ActivityCreate
            @activityCreated="addActivity"
            :categories="categories"
          />
        </div>
        <div class="column is-9">
          <div
            class="box content"
            :class="{ fetching: isFetching, 'has-error': error }"
          >
            <div v-if="error">
              {{ error }}
            </div>
            <div v-else>
              <div v-if="isFetching">
                loading... <i class="fas fa-spinner fa-spin"></i>
              </div>
              <activity-item
                v-for="activity in activities"
                :activity="activity"
                :key="activity.id"
                :categories="categories"
              />
            </div>
            <div v-if="isFetching">
              <div class="activity-length">
                Currently {{ activityLength }} activities
              </div>
              <div class="activity-motivation">{{ activityMotivation }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import ActivityItem from "@/components/ActivityItem";
import ActivityCreate from "@/components/ActivityCreate";
import TheNavbar from "@/components/TheNavbar";
import {
  fetchActivities,
  fetchCategories,
  fetchItems,
  fetchUser,
} from "./api/index";

export default {
  name: "App",
  data() {
    return {
      creator: "hahaha",
      appName: "Activity Planner",
      watchedAppName: "Activity Planner by hahaha",
      isFetching: false,
      error: null,
      items: {},
      user: {},
      activities: {},
      categories: {},
    };
  },
  methods: {
    addActivity(newActivity) {
      // this.activities[newActivity.id] = newActivity;
      console.log(newActivity);
      Vue.set(this.activities, newActivity.id, newActivity);
    },
  },
  components: { ActivityItem, ActivityCreate, TheNavbar },
  computed: {
    fullAppName() {
      return this.appName + " by " + this.creator;
    },
    activityLength() {
      return Object.keys(this.activities).length;
    },
    activityMotivation() {
      if (this.activityLength && this.activityLength < 5) {
        return "Naisu.. there are some goals";
      } else if (this.activityLength >= 5) {
        return "Wow .. so many activity";
      } else {
        return "pfftt ... no activity";
      }
    },
  },
  watch: {
    creator(val) {
      this.watchedAppName = this.appName + " by " + val;
    },
    appName(val) {
      this.watchedAppName = val + " by " + this.creator;
    },
  },
  created() {
    this.isFetching = true;
    fetchActivities()
      .then((activities) => {
        this.activities = activities;
        this.isFetching = false;
      })
      .catch((err) => {
        // console.log(err);
        this.error = err;
        this.isFetching = false;
      });

    this.user = fetchUser();
    this.categories = fetchCategories();
    this.items = fetchItems();
  },
};
</script>

<style>
#activityApp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
  font-family: "Open Sans", serif;
  background: #f2f6fa;
}
footer {
  background: #f2f6fa;
}
.fetching {
  border: 2px solid orange;
}
.has-error {
  border: 2px solid red;
}
.activity-motivation {
  float: right;
}
.activity-length {
  display: inline-block;
}
.example-wrapper {
  margin-left: 30px;
}
.topNav {
  border-top: 5px solid #3498db;
}
.topNav .container {
  border-bottom: 1px solid #e6eaee;
}
.container .columns {
  margin: 3rem 0;
}
.navbar-menu .navbar-item {
  padding: 0 2rem;
}
aside.menu {
  padding-top: 3rem;
}
aside.menu .menu-list {
  line-height: 1.5;
}
aside.menu .menu-label {
  padding-left: 10px;
  font-weight: 700;
}
.button.is-primary.is-alt {
  background: #00c6ff;
  background: -webkit-linear-gradient(to bottom, #0072ff, #00c6ff);
  background: linear-gradient(to bottom, #0072ff, #00c6ff);
  font-weight: 700;
  font-size: 14px;
  height: 3rem;
  line-height: 2.8;
}
.media-left img {
  border-radius: 50%;
}
.media-content p {
  font-size: 14px;
  line-height: 2.3;
  font-weight: 700;
  color: #8f99a3;
}
article.post {
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e6eaee;
}

article.post:last-child {
  padding-bottom: 0;
  border-bottom: none;
}
.menu-list li {
  padding: 5px;
}
.navbar-brand > h1 {
  font-size: 31px;
  padding: 20px;
}
</style>
