<template>
  <div class="home">
    <div class="banner">
      <h1 class="banner-title">Steam Inventory Exchange</h1>
    </div>

    <div class="section-container">
      <header class="section-header">
        <span class="section-name">Popular Items</span>
      </header>
      <section class="item-section">
        <div class="row">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="col"
            @click="openModal(item)"
          >
            <div class="item-card">
              <div class="image-container">
                <img :src="item.image" :alt="item.name" class="item-image" />
              </div>
              <div class="item-info">
                <p class="item-name">{{ item.name }}</p>
                <div class="price-volume-container">
                  <p class="item-volume">Total Volume: {{ item.volume }}</p>
                  <p class="item-price">Lowest Price: ${{ item.item_price }}</p>
                </div>
                <button class="modal-button" @click.stop="openModal(item)">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- The Modal -->
    <div v-if="showModal" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <span class="close" @click="showModal = false">&times;</span>
        <div class="image-container">
          <img
            :src="selectedItem.image"
            :alt="selectedItem.name"
            class="modal-image"
          />
        </div>
        <h1>{{ selectedItem.name }}</h1>
        <p>${{ selectedItem.item_price }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [], // This should be populated with your items data
      showModal: false,
      selectedItem: null
    }
  },
  computed: {
    // groupedItems() {
    //   let grouped = []
    //   for (let i = 0; i < this.items.length; i += 5) {
    //     grouped.push(this.items.slice(i, i + 5))
    //   }
    //   return grouped
    // }
  },
  methods: {
    openModal(item) {
      console.log('Opening modal for item:', item)
      this.selectedItem = item
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    openMarket() {
      // Implement market opening logic
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
.price-volume-container {
  display: flex;
  justify-content: space-between; /* Space out price and volume */
  align-items: center;
  font-size: 0.9em; /* Adjust font size to fit the line */
}

.item-price {
  color: red; /* Make the price red */
  margin: 0; /* Remove default margins */
  flex: 1; /* Each takes up an equal amount of space */
  padding: 0 5px; /* Add horizontal padding for breathing room */
}

.item-volume {
  color: blue; /* Make the volume blue */
  margin: 0; /* Remove default margins */
  flex: 1; /* Each takes up an equal amount of space */
  padding: 0 5px; /* Add horizontal padding for breathing room */
}
.modal-button {
  padding: 8px 16px;
  background-color: #007bff; /* Bootstrap primary button color for example */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px; /* Space above the button */
  transition: background-color 0.2s;
}

.modal-button:hover {
  background-color: #0056b3; /* Darken button color on hover */
}

.row {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Creates 5 columns */
  gap: 10px; /* This sets space between grid items */
}

.col {
  display: flex;
  justify-content: center; /* Center col items horizontally */
}

.item-card {
  max-width: 100%; /* Ensure the card does not overflow its container */
  box-sizing: border-box; /* Include padding and border in the width and height */
  height: 300px; /* Set card height to 300px */
  padding: 15px; /* Add padding inside the card */
  border-radius: 10px; /* Rounded corners for the card */
  border: 1px solid #ddd;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column; /* Stack children vertically */
}
.item-card:hover {
  transform: translateY(-5px); /* Move the card up slightly on hover */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Larger shadow on hover */
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  /* Creates a responsive number of columns based on the card width */
  gap: 20px; /* Increase gap for space between grid items */
  justify-content: center; /* Center the items in the grid */
  justify-items: center; /* Center the individual items horizontally */
}

.image-container {
  height: 150px; /* Fixed height for the image container */
  width: 100%; /* Full width of the card */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}
.image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); /* semi-transparent black overlay */
  z-index: 1;
}
.item-image {
  width: auto; /* Adjust width automatically */
  height: 100%; /* Fixed height to fill the container */
  object-fit: cover; /* Cover the container fully */
  position: relative;
  z-index: 2;
}

.item-info {
  padding: 12px;
  background-color: white; /* Set a background to ensure readability over the shadow */
  flex-grow: 1; /* Allow the text container to fill the space */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Distribute space between children evenly */
}

.item-name {
  font-size: 1em; /* Adjust font size as necessary */
  font-weight: bold;
  text-align: center;
  margin: 5px 0; /* Add top and bottom margins to ensure spacing */
  white-space: normal; /* Allow the text to wrap */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add an ellipsis if the text overflows */
  line-height: 1.2; /* Adjust line height for better readability */
  height: 2.4em; /* Set height to show two lines of text */
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Show a maximum of two lines */
  -webkit-box-orient: vertical;
}
/* Modal styles remain the same */

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* Fixed position to cover the whole screen */
  z-index: 1000; /* High z-index to ensure it's on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
}
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 500px; /* Set a fixed width for the modal content */
  max-width: 95%; /* Ensure it doesn't exceed the viewport width */
  z-index: 1001; /* Should be above the modal background */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
