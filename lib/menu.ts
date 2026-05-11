export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: "Pizzas" | "Sides" | "Desserts" | "Drinks";
  description: string;
  ingredients?: string[];
  image?: string;
  sub?: string;
  roman?: string;
}

export const MENU: MenuItem[] = [
  // Pizzas
  {
    id: "p1",
    name: "Margherita",
    roman: "I",
    sub: "LA REGINA",
    price: 18,
    category: "Pizzas",
    description: "The queen of pies. Nothing added, nothing taken away.",
    ingredients: ["San Marzano", "Bufala", "Basil", "EVOO"],
    image: "/menu/margherita.jpg",
  },
  {
    id: "p2",
    name: "Diavola",
    roman: "II",
    sub: "IL DIAVOLO",
    price: 22,
    category: "Pizzas",
    description: "Heat that builds slow and lingers long after the last bite.",
    ingredients: ["Spicy Salami", "Calabrian", "Mozzarella", "Sugo"],
    image: "/menu/diavola.jpg",
  },
  {
    id: "p3",
    name: "Tartufo",
    roman: "III",
    sub: "IL TESORO",
    price: 26,
    category: "Pizzas",
    description: "Earth and luxury. The forest floor on fermented dough.",
    ingredients: ["Black Truffle", "Mushroom", "Fior di Latte", "Truffle Oil"],
    image: "/frames/frame_0144.webp",
  },
  
  // Sides
  {
    id: "s1",
    name: "Truffle Fries",
    price: 12,
    category: "Sides",
    description: "Hand-cut potatoes, black truffle oil, parmigiano reggiano.",
    ingredients: ["Potato", "Truffle", "Parmesan"],
    image: "/menu/truffle_fries.jpg",
  },
  {
    id: "s2",
    name: "Bruschetta Classica",
    price: 14,
    category: "Sides",
    description: "Toasted sourdough, heirloom tomatoes, garlic, aged balsamic.",
    ingredients: ["Tomato", "Basil", "Garlic", "Sourdough"],
    image: "/menu/bruschetta.jpg",
  },
  {
    id: "s3",
    name: "Burrata Pugliese",
    price: 19,
    category: "Sides",
    description: "Creamy burrata, roasted cherry tomatoes, basil pesto.",
    ingredients: ["Burrata", "Pesto", "Tomato"],
    image: "/menu/burrata.jpg",
  },

  // Mains (Pasta)
  {
    id: "m1",
    name: "Carbonara Autentica",
    price: 24,
    category: "Pizzas", // Categorizing as pizza for the main grid if needed, or just category
    description: "Guanciale, pecorino romano, egg yolk, black pepper.",
    ingredients: ["Guanciale", "Pecorino", "Egg"],
    image: "/menu/carbonara.jpg",
  },

  // Desserts
  {
    id: "d1",
    name: "Tiramisu",
    price: 10,
    category: "Desserts",
    description: "Mascarpone, espresso, ladyfingers, dark cocoa.",
    image: "/menu/tiramisu.jpg",
  },
  {
    id: "d2",
    name: "Cannoli Siciliani",
    price: 9,
    category: "Desserts",
    description: "Sweet ricotta, pistachio, chocolate chips.",
    image: "/menu/cannoli.jpg",
  },

  // Drinks
  {
    id: "dr1",
    name: "Aperol Spritz",
    price: 15,
    category: "Drinks",
    description: "Aperol, prosecco, soda, orange slice.",
    image: "/menu/aperol_spritz.jpg",
  },
  {
    id: "dr2",
    name: "Negroni",
    price: 16,
    category: "Drinks",
    description: "Gin, campari, sweet vermouth.",
    image: "/menu/negroni.jpg",
  },
];
