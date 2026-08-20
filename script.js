 /* =========================================
   FASHIONHUB SHOPPING CART
========================================= */


/* =========================================
   VARIABLES
========================================= */

const cartButton =
    document.getElementById("cartButton");

const cartSidebar =
    document.getElementById("cartSidebar");

const closeCart =
    document.getElementById("closeCart");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const clearCart =
    document.getElementById("clearCart");

const checkoutBtn =
    document.getElementById("checkoutBtn");

const searchInput =
    document.getElementById("searchInput");

const productCards =
    document.querySelectorAll(".product-card");

const addCartButtons =
    document.querySelectorAll(".add-cart");



/* =========================================
   CART DATA
========================================= */

let cart =
    JSON.parse(
        localStorage.getItem("fashionHubCart")
    ) || [];



/* =========================================
   SAVE CART
========================================= */

function saveCart() {

    localStorage.setItem(
        "fashionHubCart",
        JSON.stringify(cart)
    );

}



/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML = "";

    let totalItems = 0;

    let totalPrice = 0;


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your bag is empty</h3>
                <p>Add some products to continue shopping.</p>
            </div>
        `;

        cartCount.textContent = "0";

        cartTotal.textContent = "₹0";

        return;
    }


    /* CART PRODUCTS */

    cart.forEach((item, index) => {

        totalItems += item.quantity;

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p class="cart-item-price">
                    ₹${item.price}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${index}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)">
                        +
                    </button>

                </div>

                <button
                    class="remove-item"
                    onclick="removeFromCart(${index})">

                    Remove

                </button>

            </div>
        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        totalItems;

    cartTotal.textContent =
        `₹${totalPrice.toLocaleString("en-IN")}`;

}



/* =========================================
   ADD TO CART
========================================= */

addCartButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);

            const image =
                button.dataset.image;


            const existingProduct =
                cart.find(
                    item => item.name === name
                );


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    image: image,

                    quantity: 1

                });

            }


            saveCart();

            updateCart();


            /* BUTTON FEEDBACK */

            const originalText =
                button.textContent;

            button.textContent =
                "✓ Added";

            button.style.background =
                "#28a745";


            setTimeout(() => {

                button.textContent =
                    originalText;

                button.style.background =
                    "";

            }, 1000);

        }
    );

});



/* =========================================
   CHANGE QUANTITY
========================================= */

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    updateCart();

}



/* =========================================
   REMOVE PRODUCT
========================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCart();

}



/* =========================================
   OPEN CART
========================================= */

cartButton.addEventListener(
    "click",
    () => {

        cartSidebar.classList.add("open");

        cartOverlay.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }
);



/* =========================================
   CLOSE CART
========================================= */

function closeCartSidebar() {

    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("active");

    document.body.style.overflow =
        "";

}


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);



/* =========================================
   CLEAR CART
========================================= */

clearCart.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            return;

        }


        const confirmation =
            confirm(
                "Are you sure you want to clear your bag?"
            );


        if (confirmation) {

            cart = [];

            saveCart();

            updateCart();

        }

    }
);



/* =========================================
   CHECKOUT
========================================= */

checkoutBtn.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Your shopping bag is empty."
            );

            return;

        }


        alert(
            "Order placed successfully! 🎉\n\nThank you for shopping with FashionHub."
        );


        cart = [];

        saveCart();

        updateCart();

        closeCartSidebar();

    }
);



/* =========================================
   SEARCH PRODUCTS
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        const searchValue =
            searchInput.value
                .toLowerCase()
                .trim();


        productCards.forEach(card => {

            const productName =
                card.dataset.name
                    .toLowerCase();


            if (
                productName.includes(
                    searchValue
                )
            ) {

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        });

    }
);



/* =========================================
   WISHLIST
========================================= */

const wishlistButtons =
    document.querySelectorAll(
        ".wishlist-product"
    );


wishlistButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            if (
                button.textContent.trim()
                === "♡"
            ) {

                button.textContent =
                    "♥";

                button.style.color =
                    "#ff3f6c";

            } else {

                button.textContent =
                    "♡";

                button.style.color =
                    "";

            }

        }
    );

});



/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar =
    document.getElementById("navbar");


window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 50) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }
);



/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navLinks.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );


            link.classList.add(
                "active"
            );

        }
    );

});



/* =========================================
   MOBILE MENU
========================================= */

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );


mobileMenuBtn.addEventListener(
    "click",
    () => {

        navMenu.classList.toggle(
            "active"
        );

    }
);


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            navMenu.classList.remove(
                "active"
            );

        }
    );

});



/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        alert(
            "Thank you! Your message has been sent successfully."
        );


        contactForm.reset();

    }
);



/* =========================================
   INITIALIZE
========================================= */

updateCart();