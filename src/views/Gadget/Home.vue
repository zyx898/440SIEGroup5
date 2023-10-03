<template>
  <div class="home">
    <div class="banner">
      <h1 class="banner-title">Steam Inventory Exchange</h1>
    </div>

    <div>
      <div
        class="section-container"
        v-for="(section, index) in groupedItems"
        :key="index"
      >
        <section class="item-section">
          <header class="section-header">
            <span class="section-name">{{ 'Popular Items' }}</span>
            <a class="market-link" href="/market" target="_blank">Market</a>
          </header>
          <div class="row">
            <div v-for="(item, itemId) in section" :key="itemId" class="col">
              <div class="item-card">
                <img :src="item.image" :alt="item.name" />
                <p>{{ item.name }}</p>
                <p>{{ item.price }}</p>
                <a :href="item.link" target="_blank">View on Steam</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: null
    }
  },
  computed: {
    groupedItems() {
      if (!this.items) return []

      // Convert the object into an array of items
      const itemsArray = Object.values(this.items)

      // Split the items into groups of 5
      const grouped = []
      for (let i = 0; i < itemsArray.length; i += 5) {
        grouped.push(itemsArray.slice(i, i + 5))
      }

      // Limit to 5 sections
      return grouped.slice(0, 5)
    }
  },
  methods: {
    sectionName(index) {
      // Generate section name based on the index (customize as needed)
      return `Section ${index + 1}`
    }
  },
  mounted() {
    // Fetch data from the API
    fetch('http://66.11.119.83:8423/getItems')
      .then((response) => response.json())
      .then((data) => {
        this.items = data
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }
}
</script>

<style scoped>
.home {
  /* Add styles for the overall home container */
}

.banner {
  height: 350px;
  width: 100%;
  background-color: pink;
  background-image: url('#'); /* Replace background image URL */
  background-size: cover;
  background-position: center;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.banner-title {
  font-size: 36px;
  margin: 0;
}

.section-container {
  display: flex;
  justify-content: center;
}

.item-section {
  width: 80%;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 10px;
  position: relative;
}

.section-header {
  display: flex;
  justify-content: space-between;
}

.section-name {
  font-weight: bold;
}

.market-link {
  text-decoration: none;
  color: blue;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.col {
  flex: 1;
}

.item-card {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.item-card img {
  max-width: 100%;
  height: auto;
}
</style>
