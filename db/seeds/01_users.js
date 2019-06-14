
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { id: "7oet_d9Z", username: "fitguy99" },
        { id: "dogPzIz8", username: "fitgal88" },
        { id: "nYrnfYEv", username: "heman77" },
        { id: "a4vhAoFG", username: "wonderwoman84" },
        { id: "hwX6aOr7", username: "thehulk32" }
      ]);
    });
};

