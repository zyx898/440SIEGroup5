<template>
  <div class="home">
    <div class="banner">
      <h1 class="banner-title">Steam Inventory Exchange</h1>
    </div>

    <div class="sections">
      <div class="section">
        <h2 class="section-name">Popular</h2>
        <router-link to="/Gadget/Market" class="detail-link"
          >Enter Market</router-link
        >
        <div class="item-container">
          <!-- Two rows of five items each go here -->
          <!-- Example item structure for one item -->
          <div class="item">
            <img src="item1.jpg" alt="Item 1" class="item-image" />
            <p class="item-description">Description of Item 1</p>
          </div>
          <!-- Repeat the above structure for other items -->
        </div>
      </div>
      <!-- Repeat the above section structure for other sections -->
    </div>
  </div>
</template>

<script setup></script>

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
}

.banner-title {
  font-size: 36px;
  margin: 0;
}

.sections {
  /* Add styles for the sections container */
  display: flex;
  flex-wrap: wrap;
}

.section {
  /* Add styles for each section */
  width: calc(100% - 20px); /* Two sections per row with some spacing */
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  position: relative;
}

.section-header {
  position: absolute;
  top: 10px; /* Adjust the top distance as needed */
  left: 10px; /* Adjust the left distance as needed */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-name {
  /* Add styles for section names in the top left corner */
}

.detail-link {
  /* Add styles for detail page links in the top right corner */
  color: #007bff; /* Example link color */
}

.item-container {
  /* Add styles for the container of items within a section */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  /* Add styles for each item */
  width: calc(20% - 10px); /* Five items per row with some spacing */
  margin: 10px 0;
  text-align: center;
}

.item-image {
  /* Add styles for item images */
  max-width: 100%;
  height: auto;
}

.item-description {
  /* Add styles for item descriptions */
  margin-top: 5px;
}
</style>
