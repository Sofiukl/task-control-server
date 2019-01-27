let exec = require('child_process').exec;
let fs = require('fs');

async function createCSV() {

    let json = [{
        "name": "Sofikul Mallick",
        "age": 28,
        "designation": "Senior Software Engg",
    },
    {
        "name": "Ranita Bej",
        "age": 26,
        "designation": "Software Engg"
    },
    {
      "name": "Biswanath",
      "age": 20,
      "designation": "Admin"
    }
    ];

    fs.writeFileSync('./employee.json', JSON.stringify(json));
    var result = '';
    var child = exec('CSVConverter.exe');

    child.stdout.on('data', function(data) {
      result += data;
    });
  
    child.on('close', function() {
      console.log('done');
      console.log(result);
      if(fs.existsSync('./employee.json')) {
        fs.unlinkSync('./employee.json')
      }
    });
  
  }

createCSV();