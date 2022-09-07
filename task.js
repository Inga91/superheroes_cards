// function makeArmy() {
//     let shooters = [];
  
//     let i = 0;
//     while (i < 10) {
//       let shooter = function() { // функция shooter
//         alert( i ); // должна выводить порядковый номер
//       };
//       shooters.push(shooter);
//       i++;
//     }
  
//     return shooters;
//   }
  
//   let army = makeArmy();
  
//   army[0](); // у 0-го стрелка будет номер 10
//   army[5](); // и у 5-го стрелка тоже будет номер 10
  // ... у всех стрелков будет номер 10, вместо 0, 1, 2, 3...

const person1 = {name:'Михаил', age: 22, job: 'Frontend'}
const person2 = {name:'Елена', age: 28, job: 'SMM'}

function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job} `)
}

bind(person1, logPerson)()

function bind(context, fn){
    return function(...args) {
        fn.apply(context,args)
    }
}