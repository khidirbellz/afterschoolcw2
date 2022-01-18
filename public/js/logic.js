const app = new Vue({
  el: '#app',
  data() {
    return {
      search: "",
      person: {
        name: null,
        phone: null,
      },
      sitename: "After School Activities",
      filters: [
        {
          id: 1,
          name: "Subject",
          checked: true,
        },
        {
          id: 2,
          name: "Location",
          checked: false,
        },
        {
          id: 3,
          name: "Price",
          checked: false,
        },
        {
          id: 4,
          name: "Availability",
          checked: false,
        },
      ],
      secondary_filters: [
        {
          id: 1,
          name: "Ascending",
          sign: "",
          checked: true,
        },
        {
          id: 2,
          name: "Descending",
          checked: false,
          sign: "-",
        },
      ],
     courses:[],
      cart: [],
      total: 0,
    };
  },
  created: function () {
    console.log("getting lessons from the server...");
    fetch("https://kidocw2.herokuapp.com/lessons").then(
        function (res) {
            res.json().then(
                function (json) {
                    app.courses = json;
                }
            )
        }
    )
},

  methods: {
    addToCart(course) {
      // console.log(course.spaces)
      if(course.spaces > 0){
        this.cart.push(course);
        this.total += course.price;
        course.spaces--;
      }
    },
    showCheckout() {
      // let cart = document.getElementById("cart-items");
      // let checkout = document.getElementById("checkout");
      // if (checkout.style = "display:none") {
      //     checkout.classList.add("checkout");
      //     cart.classList.remove("col-lg-12");
      //     cart.classList.add("col-lg-8");
      //     checkout.classList.add("col-lg-4");
      //     checkout.classList.add("col-sm-12");
      //     checkout.style = "display:block";
      //     document.getElementById("checkout-btn").style = "display:none";
      // }
      },

    searching(event) {
      let value = event.target.value.toLowerCase();

      $(".single-lesson").each((i, ele) => {
        let filterableText = "";
        let hide = false;
        $(ele).addClass("d-none");

        $(ele)
          .find(".filterable-attribute")
          .each((i, ele2) => {
            filterableText +=
              " " + ele2.innerText.toLowerCase().replace(/\s\s+/g, " ");
          });

        show = filterableText.includes(value);

        if (show) {
          console.clear();
          $(ele).removeClass("d-none");
        }
      });
    },

    removeFromCart(course) {
      let index = this.cart.indexOf(course)
      this.cart.splice(index, 1)
      course.spaces++;
      this.total = this.total - course.price
    },

    resetVariable() {
      this.cart = [];
      this.total = 0;
    },

    checkout() {
      let msg = `Thanks ${this.person.name} your total price is .. (₦ ${this.total} naira only)`;
      alert(msg);
      this.resetVariable();
    },

    stopNumericInput(event) {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      if (keyCode > 47 && keyCode < 58) {
        event.preventDefault();
      }
    },

    stopAlphabetsInput(event) {
      let keyCode = event.keyCode ? event.keyCode : event.which;
      console.log(keyCode);
      if (keyCode >= 48 && keyCode <= 58) {
        // Allow
      } else {
        event.preventDefault();
      }
    },

    dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    },

    toggleMainFilter(filter) {
      this.filters.map((e) => {
        e.checked = false;
        if (e == filter) {
          // Change State
          e.checked = true;

          this.applyFilter();
        }
      });
    },

    toggleSecondaryFilter(sfilter) {
      this.secondary_filters.map((e) => {
        e.checked = false;
        if (e == sfilter) {
          // Change State
          e.checked = true;

          this.applyFilter();
        }
      });
    },

    applyFilter() {
      let sign = this.secondary_filters.filter((obj) => {
        return obj.checked;
      })[0].sign;

      let filter = this.filters
        .filter((obj) => {
          return obj.checked;
        })[0]
        .name.toLowerCase();

      if (filter == "availability") {
        filter = "spaces";
      }

      this.courses = this.courses.sort(this.dynamicSort(sign + filter));
    },
  },
})
// app.mount("#app");
