export type MenuCategory = "coffee" | "mains" | "small-plates" | "desserts" | "beverages";

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  image?: string;
  isVegan: boolean;
  isBestseller: boolean;
  inStock: boolean;
  tags: string[];
}

export interface Workshop {
  title: string;
  date: string;
  price: number;
  includes: string;
  spotsLeft: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  tag: string;
  text: string;
  source: string;
}

export interface CafeInfo {
  name: string;
  tagline: string;
  address: string;
  landmarkNote: string;
  phone: string;
  whatsappNumber: string;
  hours: string;
  googleRating: number;
  reviewCount: string;
  googleMapsUrl: string;
}

// Maps real filenames inside public/images/interior/
export const INTERIOR_IMAGES = {
  activityArea: "/images/interior/activity area.png",
  board: "/images/interior/board.png",
  bookStand: "/images/interior/book stand.png",
  coupleSpecial: "/images/interior/couple special.png",
  drinks: "/images/interior/drinks.png",
  entrance: "/images/interior/entrance.png",
  frontDoor: "/images/interior/front door.png",
  middleArea: "/images/interior/middle are.png",
  radhaAndRani: "/images/interior/ragha and rani.png",
  reception: "/images/interior/reciption.png",
  sideWindowView: "/images/interior/side window view.png",
  singingArea: "/images/interior/singing area.png",
  windowView: "/images/interior/window view.png",
} as const;

export const CAFE_INFO: CafeInfo = {
  name: "The Basil Cafe & Restro",
  tagline: "100% Pure Vegetarian & Vegan-Friendly Botanical Cafe",
  address: "Plot K7/92, Ghatikia, Shankarpur, Kalinganagar, Bhubaneswar 751029",
  landmarkNote:
    "First-floor sunlit space above K7 main road. Two-wheeler & street car parking available right outside.",
  phone: "+91 80184 91379",
  whatsappNumber: "918018491379",
  hours: "Mon–Fri: 10:00 AM – 10:30 PM | Sat–Sun: 8:30 AM – 11:30 PM",
  googleRating: 4.6,
  reviewCount: "600+",
  googleMapsUrl: "https://maps.app.goo.gl/ZXQBdMExMKxirjed9",
};

export const INITIAL_MENU: MenuItem[] = [
  {
    id: "cappuccino",
    name: "Classic Cappuccino Coffee",
    category: "coffee",
    price: 180,
    description:
      "Double shot of espresso, steamed whole milk, and dense micro-foam dusted with unsweetened cocoa powder.",
    image: "/images/foodings/cappuccino coffee.jpg",
    isVegan: false,
    isBestseller: false,
    inStock: true,
    tags: ["Bestseller", "Barista Choice"],
  },
  {
    id: "creamy-mushroom-pasta",
    name: "Creamy Mushroom Pasta",
    category: "mains",
    price: 290,
    description:
      "Penne tossed in slow-simmered button mushroom cream sauce, cracked black pepper, garlic, and fresh basil leaves.",
    image: "/images/foodings/mushroom creamy pasta.jpg",
    isVegan: false,
    isBestseller: true,
    inStock: true,
    tags: ["Bestseller", "Most Liked"],
  },
  {
    id: "margherita-pizza",
    name: "Wood-Fired Margherita Pizza",
    category: "mains",
    price: 310,
    description:
      "Hand-stretched sourdough crust, crushed San Marzano tomato sauce, fresh buffalo mozzarella, extra virgin olive oil, and torn basil.",
    image: "/images/foodings/margherita pizza.jpg",
    isVegan: false,
    isBestseller: true,
    inStock: true,
    tags: ["Bestseller", "Wood-Fired"],
  },
  {
    id: "crispy-french-fries",
    name: "Crispy French Fries",
    category: "small-plates",
    price: 160,
    description:
      "Double-fried skin-on potato batons tossed in sea salt and crushed rosemary, served with house garlic mayonnaise.",
    image: "/images/foodings/french fries.jpg",
    isVegan: true,
    isBestseller: false,
    inStock: true,
    tags: ["Vegan", "Quick Bite"],
  },
  {
    id: "mushroom-stroganoff",
    name: "Mushroom Stroganoff with Herb Rice",
    category: "mains",
    price: 340,
    description:
      "Sautéed button mushrooms and caramelized onions in a rich sour cream and paprika reduction, served alongside warm parsley butter rice.",
    image: "/images/foodings/Mushroom Stroganoff.jpg",
    isVegan: false,
    isBestseller: true,
    inStock: true,
    tags: ["Bestseller", "Chef's Special"],
  },
  {
    id: "grilled-veg-sandwich",
    name: "Grilled Veg Sandwich",
    category: "small-plates",
    price: 220,
    description:
      "Layered cucumber, ripe tomato slices, bell peppers, mint coriander chutney, and mild cheddar grilled crisp on multi-grain bread.",
    image: "/images/foodings/sandwich.jpg",
    isVegan: false,
    isBestseller: false,
    inStock: true,
    tags: ["Most Liked", "Comfort Food"],
  },
  {
    id: "tofu-veg-maki",
    name: "Tofu Veg Roll / Maki",
    category: "small-plates",
    price: 280,
    description:
      "Seasoned sushi rice wrapped in toasted nori, stuffed with pan-seared sesame tofu, cucumber strips, avocado, and drizzled with sweet soy glaze.",
    image: "/images/foodings/tofu tanuki umaki.jpg",
    isVegan: true,
    isBestseller: false,
    inStock: true,
    tags: ["Vegan", "Chef's Special"],
  },
  {
    id: "hot-chocolate",
    name: "Belgian Hot Chocolate",
    category: "beverages",
    price: 210,
    description:
      "Single-origin 54% dark chocolate melted into warm whole milk, topped with toasted house marshmallow fluff.",
    image: "/images/foodings/meal.png",
    isVegan: false,
    isBestseller: false,
    inStock: true,
    tags: ["Most Liked", "Sweet Tooth"],
  },
  {
    id: "cold-brew",
    name: "18-Hour Cold Brew",
    category: "coffee",
    price: 190,
    description:
      "Coarsely ground Chikmagalur Arabica beans steeped in chilled filtered water for 18 hours, poured over clear ice.",
    image: "/images/foodings/coffee.png",
    isVegan: true,
    isBestseller: true,
    inStock: true,
    tags: ["Bestseller", "Vegan", "18-Hour Steep"],
  },
  {
    id: "garlic-bread",
    name: "Pull-Apart Garlic Bread",
    category: "small-plates",
    price: 190,
    description:
      "Toasted sourdough baguette slices brushed with roasted garlic butter, fresh parsley, and melted whole-milk mozzarella.",
    isVegan: false,
    isBestseller: false,
    inStock: true,
    tags: ["Most Liked", "Starter"],
  },
  {
    id: "pesto-pasta",
    name: "Genovese Basil Pesto Pasta",
    category: "mains",
    price: 320,
    description:
      "Fusilli tossed in fresh Genovese basil pesto, roasted pine nuts, extra virgin olive oil, and shaved parmesan.",
    isVegan: false,
    isBestseller: false,
    inStock: true,
    tags: ["Chef's Special", "Herb Garden"],
  },
  {
    id: "veg-burger",
    name: "Crispy Herb Veg Burger",
    category: "mains",
    price: 260,
    description:
      "House spiced potato, pea, and carrot patty on a toasted brioche bun with pickled gherkins, shredded lettuce, and tangy tomato relish.",
    isVegan: false,
    isBestseller: false,
    inStock: true,
    tags: ["Most Liked"],
  },
  {
    id: "walnut-brownie",
    name: "Sizzling Walnut Brownie",
    category: "desserts",
    price: 220,
    description:
      "Dense Belgian dark chocolate fudge brownie with roasted walnuts, served warm with Madagascar vanilla bean gelato.",
    image: "/images/foodings/meal.png",
    isVegan: false,
    isBestseller: true,
    inStock: true,
    tags: ["Bestseller", "Hot Dessert"],
  },
  {
    id: "herbal-tea",
    name: "Chamomile Mint Herbal Tea",
    category: "beverages",
    price: 150,
    description:
      "Whole Egyptian chamomile flowers blended with dried spearmint and lemongrass, served hot in an infusion pot with wild raw honey on the side.",
    image: "/images/foodings/coffee.png",
    isVegan: true,
    isBestseller: false,
    inStock: true,
    tags: ["Vegan", "Caffeine-Free"],
  },
];

export const INITIAL_WORKSHOP: Workshop = {
  title: "Weekend Mandala & Lippan Art Workshop",
  date: "This Saturday, 3:00 PM – 5:30 PM",
  price: 499,
  includes: "All canvas & clay materials provided + 1 Signature Coffee or Hot Chocolate",
  spotsLeft: 6,
  isActive: true,
};

export const REAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Aniket Mohapatra",
    rating: 5,
    date: "2 weeks ago",
    tag: "Non-Veg Convert",
    text: "I usually avoid pure-veg cafes, but the Mushroom Stroganoff here changed my mind completely. The sauce is properly reduced and seasoned without feeling heavy. My friend ordered the creamy mushroom pasta and both plates arrived steaming hot.",
    source: "Google Review",
  },
  {
    id: "rev-2",
    author: "Sneha Pattnaik",
    rating: 5,
    date: "1 month ago",
    tag: "Study & Work",
    text: "Spent three hours here working on college assignments. The Wi-Fi is consistently fast, there are wall charging points next to the window tables, and nobody rushes you. Great cold brew and a peaceful book corner.",
    source: "Google Review",
  },
  {
    id: "rev-3",
    author: "Debasish Rout",
    rating: 5,
    date: "3 weeks ago",
    tag: "Dog Lovers",
    text: "Came primarily to meet Radha and Rani. They are the gentlest, sweetest cafe dogs. The space is spotless and smells like fresh espresso and basil rather than animals. Huge windows with plenty of morning sunlight.",
    source: "Google Review",
  },
  {
    id: "rev-4",
    author: "Priyadarshini Mishra",
    rating: 5,
    date: "2 months ago",
    tag: "Family Celebration",
    text: "Celebrated my sister's 25th birthday with 8 family members in the private dining nook. The team arranged our table seamlessly and timed the starters well. The Margherita pizza and hot chocolate were table favorites.",
    source: "Google Review",
  },
];
