export const CATEGORY = {
    eatingOut: {
      text: 'eating out', 
      IsExpense: true,
      uri: require('./assets/ice-cream.png')
    },
    food: {
      text: 'food', 
      IsExpense: true,
      uri: require('./assets/food.png')
    },
    bills: {
      text: 'bills', 
      IsExpense: true,
      uri: require('./assets/bills.png')
    },
    health: {
      text: 'health', 
      IsExpense: true,
      uri: require('./assets/health.png')
    },
    transport: {
      text: 'transport', 
      IsExpense: true,
      uri: require('./assets/transport.png')
    },
    taxi: {
      text: 'taxi', 
      IsExpense: true,
      uri: require('./assets/taxi.png')
    },
    pets: {
      text: 'pets', 
      IsExpense: true,
      uri: require('./assets/pets.png')
    },
    sports: {
      text: 'sports', 
      IsExpense: true,
      uri: require('./assets/sports.png')
    },
    house: {
      text: 'house', 
      IsExpense: true,
      uri: require('./assets/house.png')
    },
    salary: {
      text: 'salary', 
      IsExpense: false,
      uri: require('./assets/salary.png')
    },
    deposit: {
      text: 'deposit', 
      IsExpense: false,
      uri: require('./assets/deposits.png')
    },
    savings: {
      text: 'savings', 
      IsExpense: false,
      uri: require('./assets/savings.png')
    },
  };
  export const getCategoryByText = (text) => {
    const lowerCaseText = text.toLowerCase();
  
    // Iterate through each category in the CATEGORY object
    for (const key in CATEGORY) {
      if (CATEGORY.hasOwnProperty(key)) {
        const category = CATEGORY[key];
        
        // Check if the category text matches the provided text (case-insensitive)
        if (category.text.toLowerCase() === lowerCaseText) {
          return category; // Return the matching category object
        }
      }
    }
  
    // If no matching category is found, return null
    return null;
  };