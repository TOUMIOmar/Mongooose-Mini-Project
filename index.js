const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

//Create a Model
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

//Create and Save a Record of a Model
var createAndSavePerson = (done) => {
    var janeFonda = new Person({
      name: "Jane Fonda",
      age: 84,
      favoriteFoods: ["vodka", "air"]
    });
   
    janeFonda.save((err, data) => {
      if (err) return console.error(err);
      done(null, data)
    });
  };

  

  

  //Create Many Records with model.create()
  var arrayOfPeople = [
    {name: "Omar", age: 55, favoriteFoods: ["makrona"]},
    {name: "Yassine", age: 22, favoriteFoods: ["3ija"]},
    {name: "Hamza", age: 14, favoriteFoods: ["makloub"]},
    {name: "Ayoub", age: 22, favoriteFoods: ["moli5iya"]},
    {name: "Ahmed", age: 14, favoriteFoods: ["patata"]}
  ];
   
  var createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.log(err);
      done(null, people);
    });
  };


  //Use model.find() to Search Your Database
  var findPeopleByName = (personName, done) {
    Person.find({name: personName}, (err, personFound) => {
      if (err) return console.log(err);
      done(null, personFound);
    });
  };


  //Use model.findOne() to Return a Single Matching Document from Your Database
  var findOneByFood = (food, done) {
    Person.findOne({favoriteFoods: food}, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  };

  //Use model.findById() to Search Your Database By _id
  var findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
      if (err) return console.log(err);
      done(null, data);
    });
  };

  //Perform Classic Updates by Running Find, Edit, then Save
  const findEditThenSave = (personId, done) => {
    const foodToAdd = 'chakchoka';
   
    // .findById() method to find a person by _id with the parameter personId as search key. 
    Person.findById(personId, (err, person) => {
      if(err) return console.log(err); 
     
      // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
      person.favoriteFoods.push(foodToAdd);
   
      // and inside the find callback - save() the updated Person.
      person.save((err, updatedPerson) => {
        if(err) return console.log(err);
        done(null, updatedPerson)
      });
    })
  };


//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
   
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
      if(err) return console.log(err);
      done(null, updatedDoc);
    });
  };


  //Delete One Document Using model.findByIdAndRemove
  const removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    });
 
    Person.findOneAndRemove({_id: personId}, (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    });
  
  };


 



//Delete Many Documents with model.remove()

  const removeManyPeople = (done) => {
    const nameToRemove = "Hamza";
   
    Person.remove({name: nameToRemove}, (err, response) => {
      if(err) return console.log(err);
      done(null, response);
    });
  };


  //Chain Search Query Helpers to Narrow Search Results
  const queryChain = (done) => {
    var foodToSearch = "3ija";
   
    Person
    .find({favoriteFoods: foodToSearch})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, people) => {
      if (err) return console.log(err);
      done(null, people);
    });
  };






  


