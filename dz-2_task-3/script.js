class Ingredient {
    constructor(id, category, name, price, cal) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.price = price;
        this.cal = cal;
        }
    }

class Gamburger {
    constructor(gamburgerSize = null, insideIngredient = null) {
        this.gamburgerSize = gamburgerSize;
        this.insideIngredient = insideIngredient;
        this.outerIngredients = new Set();
    }

    get isReady() {
        return this.gamburgerSize != null && this.insideIngredient != null;
    }

    get moneySum() {
        if (!this.isReady) throw new Error("Is not ready.");
        let sum = this.gamburgerSize.price;
        sum += this.insideIngredient.price;
        for (let item of this.outerIngredients) {
            sum += item.price;
        }
        return sum;
    }

    get calSum() {
        if (!this.isReady) throw new Error("Is not ready.");
        let sum = this.gamburgerSize.cal;
        sum += this.insideIngredient.cal;
        for (let item of this.outerIngredients) {
            sum += item.cal;
        }
        return sum;
    }

    get name() {
        if (!this.isReady) throw new Error("Is not ready.");
        let name = this.gamburgerSize.name + " (";
        name += this.insideIngredient.name;
        for (let item of this.outerIngredients) {
            name += ", " + item.name;
        }
        return name + ")";
    }

    static get builder() { return new GamburgerBuilder(); }
}

class GamburgerBuilder {
    get isReady() { return this.gamburger.isReady; };

    constructor() {
        this.gamburger = new Gamburger();
    }

    withInside(ingredient) {
        if (!ingredient || ingredient.category != 1) throw new Error("WithInside");
        this.gamburger.insideIngredient = ingredient;
        return this;
    }

    withSize(ingredient) {
        if (!ingredient || ingredient.category != 0) throw new Error("WithSize");
        this.gamburger.gamburgerSize = ingredient;
        return this;
    }

    build() {
        if (!this.isReady) throw new Error("Is not ready.");
        return this.gamburger;
    }
}

class GamburgerDecorator {
    constructor(gamburger) {
        this.gamburger = gamburger;
        }

    get gamburgerSize() { return this.gamburger.gamburgerSize; }
    set gamburgerSize(value) { gamburger.gamburgerSize = value; }

    get insideIngredient() { return this.gamburger.insideIngredient; }
    set insideIngredient(value) { this.gamburger.insideIngredient = value; }

    get outerIngredients() { return this.gamburger.outerIngredients; }

    get moneySum() { return this.gamburger.moneySum; }

    get calSum() { return this.gamburger.calSum; }

    get name() { return this.gamburger.name; }
}

class SpeciesGamburger extends GamburgerDecorator {
    constructor(gamburger) {
        super(gamburger);
        this.gamburger.outerIngredients.add(ingredients[5]);
    }
}

class MaionezGamburger extends GamburgerDecorator {
    constructor(gamburger) {
        super(gamburger);
        this.gamburger.outerIngredients.add(ingredients[6]);
    }
}

let ingredients = [
    new Ingredient(1, 0, "Маленький гамбургер", 50, 20),
    new Ingredient(2, 0, "Большой гамбургер", 100, 40),
    new Ingredient(3, 1, "сыр", 10, 20),
    new Ingredient(4, 1, "салат", 20, 5),
    new Ingredient(5, 1, "картофель", 15, 10),
    new Ingredient(6, 2, "приправа", 15, 0),
    new Ingredient(7, 2, "майонез", 20, 5),
];
