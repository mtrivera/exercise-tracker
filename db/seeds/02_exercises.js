
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('exercises').del()
    .then(function() {
      // Inserts seed entries
      return knex('exercises').insert([
        { 
          id: 1, 
          userId: "7oet_d9Z",  
          description: "Dumbbell Bench Press",
          duration: 67,
          date: 2019-12-31
        },
        { 
          id: 2, 
          userId: "dogPzIz8",  
          description: "Barbell Bench Press",
          duration: 67,
          date: 2019-12-31
        },
        { 
          id: 3, 
          userId: "nYrnfYEv",  
          description: "Running",
          duration: 67,
          date: 2019-12-31
        },
        { 
          id: 4, 
          userId: "a4vhAoFG",  
          description: "Curl",
          duration: 67,
          date: 2019-12-31
        },
        { 
          id: 5, 
          userId: "hwX6aOr7",  
          description: "Push Up",
          duration: 67,
          date: 2019-12-31
        },
        { 
          id: 6, 
          userId: "nYrnfYEv",  
          description: "Crunch",
          duration: 67,
          date: 2019-12-31
        },
        { 
          id: 7, 
          userId: "dogPzIz8",  
          description: "Deadlift",
          duration: 67,
          date: 2019-12-31
        }
      ]);
    });
};